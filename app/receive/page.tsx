"use client";

import Image from "next/image";
import { useState } from "react";

type SortKey = "latest" | "price";

const BOOKS = [
  { id: 1,  title: "아몬드",              author: "손원평",        price: 4800, coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80", date: "2026-04-18" },
  { id: 2,  title: "채식주의자",           author: "한강",          price: 5500, coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80", date: "2026-04-17" },
  { id: 3,  title: "82년생 김지영",        author: "조남주",        price: 3900, coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80", date: "2026-04-17" },
  { id: 4,  title: "해변의 카프카",        author: "무라카미 하루키", price: 6200, coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80", date: "2026-04-16" },
  { id: 5,  title: "데미안",              author: "헤르만 헤세",    price: 3200, coverUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&q=80", date: "2026-04-16" },
  { id: 6,  title: "어린 왕자",           author: "생텍쥐페리",     price: 2800, coverUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&q=80", date: "2026-04-15" },
  { id: 7,  title: "나미야 잡화점의 기적", author: "히가시노 게이고", price: 5000, coverUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&q=80", date: "2026-04-15" },
  { id: 8,  title: "파친코",              author: "이민진",         price: 7500, coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80", date: "2026-04-14" },
  { id: 9,  title: "완전한 행복",          author: "정유정",         price: 4200, coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80", date: "2026-04-14" },
  { id: 10, title: "불편한 편의점",        author: "김호연",         price: 3800, coverUrl: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&q=80", date: "2026-04-13" },
  { id: 11, title: "작별인사",             author: "김영하",         price: 4500, coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80", date: "2026-04-13" },
  { id: 12, title: "흰",                  author: "한강",           price: 3600, coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80", date: "2026-04-12" },
  { id: 13, title: "구의 증명",            author: "최진영",         price: 4100, coverUrl: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&q=80", date: "2026-04-12" },
  { id: 14, title: "달러구트 꿈 백화점",   author: "이미예",         price: 5200, coverUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&q=80", date: "2026-04-11" },
  { id: 15, title: "소년이 온다",          author: "한강",           price: 4900, coverUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80", date: "2026-04-11" },
];

const PAGE_SIZE = 10; // 2행 × 5열

function BookItem({ book }: { book: typeof BOOKS[0] }) {
  return (
    <a
      href={`/receive/${book.id}`}
      className="group flex flex-col items-center"
      style={{ width: "108px" }}
    >
      {/* 책 표지 */}
      <div className="relative" style={{ perspective: "700px" }}>
        <div
          className="relative transition-transform duration-300 group-hover:-translate-y-3"
          style={{
            width: "88px",
            height: "130px",
            transformStyle: "preserve-3d",
            transform: "rotateY(-6deg)",
          }}
        >
          {/* 앞표지 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "2px 5px 5px 2px",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.12)",
              boxShadow:
                "-4px 4px 10px rgba(0,0,0,0.22), 2px 0 6px rgba(0,0,0,0.08), inset -2px 0 5px rgba(0,0,0,0.06)",
            }}
          >
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              className="object-cover"
              sizes="88px"
            />
            {/* 광택 */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, transparent 55%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* 페이지 측면 두께 */}
          <div
            style={{
              position: "absolute",
              top: "2px",
              left: "-9px",
              width: "9px",
              height: "126px",
              background:
                "linear-gradient(to right, #d8cfc4, #f0ebe3, #e2dbd0, #f0ebe3)",
              borderRadius: "1px 0 0 1px",
              transform: "rotateY(90deg)",
              transformOrigin: "right center",
              boxShadow: "inset -1px 0 3px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* 선반 위 그림자 (책 발 그림자) */}
        <div
          style={{
            width: "72px",
            height: "8px",
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, transparent 75%)",
            margin: "0 auto",
            marginTop: "2px",
          }}
        />
      </div>

      {/* 책 정보 — 선반 바로 아래 */}
      <div className="mt-3 text-center" style={{ width: "108px" }}>
        <p className="font-serif text-[11px] font-semibold leading-tight text-ink line-clamp-2 px-1">
          {book.title}
        </p>
        <p className="mt-1 text-[10px] font-bold text-book-green">
          {book.price.toLocaleString()}원
        </p>
      </div>
    </a>
  );
}

function WoodenShelf() {
  return (
    <div style={{ marginTop: "10px" }}>
      {/* 선반 상단 하이라이트 */}
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 100%)",
          borderRadius: "2px 2px 0 0",
        }}
      />
      {/* 선반 본체 */}
      <div
        style={{
          height: "20px",
          background:
            "linear-gradient(180deg, #C99252 0%, #B87D40 30%, #A46C30 65%, #8C5820 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 나뭇결 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(255,255,255,0.07) 38px, rgba(255,255,255,0.07) 39px)," +
              "repeating-linear-gradient(90deg, transparent, transparent 97px, rgba(0,0,0,0.08) 97px, rgba(0,0,0,0.08) 98px)",
          }}
        />
        {/* 나뭇결 불규칙 곡선 */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}
          preserveAspectRatio="none"
        >
          <path d="M0 10 Q80 6 160 11 Q240 16 320 10 Q400 4 480 10 Q560 15 640 10 Q720 5 800 10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
          <path d="M0 15 Q100 11 200 15 Q300 19 400 14 Q500 9 600 14 Q700 19 800 14" stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="none" />
        </svg>
      </div>
      {/* 선반 하단 그림자 — 더 깊고 선명하게 */}
      <div
        style={{
          height: "22px",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.14) 50%, rgba(0,0,0,0.04) 80%, transparent 100%)",
        }}
      />
    </div>
  );
}

function ShelfRow({ books }: { books: typeof BOOKS }) {
  return (
    <div className="mb-14">
      {/* 책들: grid-cols-5로 균등 배치, 선반과 동일 너비 */}
      <div
        className="grid items-end pb-2"
        style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: "0" }}
      >
        {books.map((book) => (
          <div key={book.id} className="flex justify-center">
            <BookItem book={book} />
          </div>
        ))}
      </div>
      <WoodenShelf />
    </div>
  );
}

export default function ReceivePage() {
  const [sort, setSort] = useState<SortKey>("latest");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const sorted = [...BOOKS].sort((a, b) =>
    sort === "price" ? a.price - b.price : b.date.localeCompare(a.date)
  );

  const visibleBooks = sorted.slice(0, visible);

  const shelves: (typeof BOOKS)[] = [];
  for (let i = 0; i < visibleBooks.length; i += 5) {
    shelves.push(visibleBooks.slice(i, i + 5));
  }

  const hasMore = visible < sorted.length;

  return (
    <div className="relative z-10 w-full px-4 py-14 sm:px-8">

      {/* 타이틀 */}
      <div className="mx-auto mb-10 max-w-6xl animate-fade-up">
        <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">소울북 상점</h1>
        <p className="mt-2 text-sm text-stone">
          친구들이 보내는 소울북을 둘러보세요.
        </p>
      </div>

      {/* 필터 */}
      <div className="mx-auto mb-10 max-w-6xl animate-fade-up delay-100 flex gap-2">
        {(["latest", "price"] as SortKey[]).map((key) => (
          <button
            key={key}
            onClick={() => { setSort(key); setVisible(PAGE_SIZE); }}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              sort === key
                ? "border-book-green bg-book-green text-white"
                : "border-linen bg-paper text-stone hover:border-book-green hover:text-book-green"
            }`}
          >
            {key === "latest" ? "최신 등록순" : "친구비 낮은순"}
          </button>
        ))}
      </div>

      {/* 책장 — 선반이 full width로 뻗도록 패딩 없는 래퍼 사용 */}
      <div className="animate-fade-up delay-200">
        {shelves.map((row, i) => (
          <div key={i} className="mx-auto max-w-6xl">
            <ShelfRow books={row} />
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      {hasMore && (
        <div className="mx-auto mt-2 max-w-6xl text-center animate-fade-up">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-button border border-book-green bg-cream px-8 py-3 font-serif text-sm text-book-green transition-colors hover:bg-book-green hover:text-white"
          >
            더 많은 소울북 보기
          </button>
        </div>
      )}

      {/* FAB */}
      <a
        href="/give"
        className="fixed bottom-8 right-6 flex items-center gap-2 rounded-full bg-book-green px-5 py-3.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-soft-green hover:shadow-xl sm:right-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        건네주기
      </a>
    </div>
  );
}
