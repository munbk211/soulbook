# 소울북 인증 & DB 설계 (AUTH_DB)

> Supabase를 기반으로 이메일 인증 + RLS(Row Level Security)를 적용한 설계입니다.  
> 아래 스키마를 바탕으로 실제 페이지와 API를 순차적으로 구현합니다.

---

## 1. 인증 방식 (Authentication)

- **방식**: 이메일 + 비밀번호 회원가입
- **확인 절차**: 가입 후 Supabase가 발송하는 이메일의 Confirm 링크 클릭 시 계정 활성화
- **Provider**: Supabase Auth (`supabase.auth.signUp` / `signInWithPassword`)
- **세션 관리**: Supabase의 JWT 토큰 기반, 클라이언트는 `@supabase/ssr` 패키지로 쿠키 세션 유지

---

## 2. 사용자 테이블 (`profiles`)

> `auth.users`와 1:1로 연결되는 공개 프로필 테이블입니다.

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | `UUID` | `auth.users.id` 참조 (PK) |
| `email` | `text` | 사용자 이메일 |
| `nickname` | `text` | 화면에 표시될 옛친구 닉네임 |
| `avatar_url` | `text` | 프로필 이미지 URL (Storage) |
| `created_at` | `timestamptz` | 가입일시 (기본값: `now()`) |

```sql
create table profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text not null,
  nickname    text,
  avatar_url  text,
  created_at  timestamptz default now()
);

-- 가입 시 자동으로 profiles 행 생성하는 트리거
create function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
```

---

## 3. 소울북 테이블 (`books`)

> 옛친구가 건네주기로 등록한 소울북 정보입니다.

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | `bigserial` | PK |
| `title` | `text` | 소울북 제목 |
| `author` | `text` | 저자명 |
| `price` | `integer` | 친구비 (원) |
| `description` | `text` | 소울북 소개 (내 소울북을 소개합니다) |
| `image_url` | `text` | 책 표지 이미지 URL (Storage) |
| `seller_id` | `UUID` | `profiles.id` 참조 (건네주는 옛친구) |
| `status` | `text` | `available` / `reserved` / `completed` |
| `created_at` | `timestamptz` | 등록일시 |

```sql
create table books (
  id          bigserial primary key,
  title       text not null,
  author      text,
  price       integer not null default 0,
  description text,
  image_url   text,
  seller_id   uuid references profiles(id) on delete cascade,
  status      text not null default 'available',
  created_at  timestamptz default now()
);
```

---

## 4. 채팅 시스템 (`chat_rooms` / `messages`)

### 4-1. 채팅방 (`chat_rooms`)

> 소울북 1권당 새친구-옛친구 간 1:1 채팅방이 생성됩니다.

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | `bigserial` | PK |
| `book_id` | `bigint` | `books.id` 참조 |
| `buyer_id` | `UUID` | 건네받으려는 새친구 |
| `seller_id` | `UUID` | 건네주는 옛친구 |
| `created_at` | `timestamptz` | 채팅방 개설일시 |

```sql
create table chat_rooms (
  id          bigserial primary key,
  book_id     bigint references books(id) on delete cascade,
  buyer_id    uuid references profiles(id) on delete cascade,
  seller_id   uuid references profiles(id) on delete cascade,
  created_at  timestamptz default now(),
  unique (book_id, buyer_id)
);
```

### 4-2. 메시지 (`messages`)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | `bigserial` | PK |
| `room_id` | `bigint` | `chat_rooms.id` 참조 |
| `sender_id` | `UUID` | 메시지를 보낸 사용자 |
| `content` | `text` | 메시지 내용 |
| `created_at` | `timestamptz` | 전송 시각 |

```sql
create table messages (
  id          bigserial primary key,
  room_id     bigint references chat_rooms(id) on delete cascade,
  sender_id   uuid references profiles(id) on delete cascade,
  content     text not null,
  created_at  timestamptz default now()
);
```

---

## 5. Row Level Security (RLS) 방침

```sql
-- profiles: 본인만 수정 가능, 조회는 모두 허용
alter table profiles enable row level security;
create policy "public read" on profiles for select using (true);
create policy "own update" on profiles for update using (auth.uid() = id);

-- books: 누구나 조회, 본인만 등록·수정·삭제
alter table books enable row level security;
create policy "public read" on books for select using (true);
create policy "seller insert" on books for insert with check (auth.uid() = seller_id);
create policy "seller update" on books for update using (auth.uid() = seller_id);
create policy "seller delete" on books for delete using (auth.uid() = seller_id);

-- chat_rooms: 참여자만 조회·생성
alter table chat_rooms enable row level security;
create policy "participant read" on chat_rooms for select
  using (auth.uid() = buyer_id or auth.uid() = seller_id);
create policy "buyer insert" on chat_rooms for insert
  with check (auth.uid() = buyer_id);

-- messages: 채팅방 참여자만 조회·전송
alter table messages enable row level security;
create policy "participant read" on messages for select
  using (exists (
    select 1 from chat_rooms r
    where r.id = room_id
      and (r.buyer_id = auth.uid() or r.seller_id = auth.uid())
  ));
create policy "participant insert" on messages for insert
  with check (auth.uid() = sender_id);
```

---

## 6. 다음 구현 단계

1. **Supabase 프로젝트 생성** 및 위 SQL 실행
2. **환경변수 설정**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **회원가입 / 로그인 페이지** (`app/auth/`) 구현
4. **소울북 CRUD** — `books` 테이블 연동 (건네주기 폼 → Supabase insert)
5. **실시간 채팅** — Supabase Realtime으로 `messages` 구독
