"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useBooks } from "../../context/BookContext";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { books } = useBooks();

  const book = books.find((b) => b.id === Number(id));
  const others = books.filter((b) => b.id !== Number(id)).slice(0, 6);

  if (!book) {
    return (
      <div className="relative z-10 flex min-h-[60vh] items-center justify-center text-stone">
        소울북을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-8">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

        {/* ── 왼쪽: 책 이미지 ── */}
        <div className="flex flex-col items-center lg:w-[380px] lg:flex-shrink-0">
          {/* 조명 + 책 */}
          <div
            className="relative flex items-center justify-center rounded-card"
            style={{
              width: "100%",
              maxWidth: "320px",
              paddingTop: "48px",
              paddingBottom: "56px",
              background: "radial-gradient(ellipse at 50% 40%, rgba(201,146,82,0.18) 0%, transparent 70%)",
            }}
          >
            {/* 책 3D */}
            <div style={{ perspective: "900px" }}>
              <div
                style={{
                  width: "200px",
                  height: "290px",
                  position: "relative",
                  transformStyle: "preserve-3d",
                  transform: "rotateY(-10deg)",
                  filter: "drop-shadow(-12px 20px 30px rgba(0,0,0,0.4))",
                }}
              >
                {/* 앞표지 */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "3px 8px 8px 3px",
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
                {/* 측면 두께 */}
                <div
                  style={{
                    position: "absolute",
                    top: "3px",
                    left: "-18px",
                    width: "18px",
                    height: "284px",
                    background: "linear-gradient(to right, #d0c8bc, #f5f0e8, #e0d8cc)",
                    transform: "rotateY(90deg)",
                    transformOrigin: "right center",
                  }}
                />
              </div>
            </div>
          </div>

          {/* 다른 소울북 */}
          <div className="mt-10 w-full">
            <p className="mb-4 font-serif text-sm font-semibold text-ink">다른 소울북</p>
            <div className="space-y-3">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/receive/${other.id}`}
                  className="flex items-center gap-3 rounded-input border border-linen bg-paper p-3 transition-colors hover:border-book-green"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={other.coverUrl}
                    alt={other.title}
                    style={{ width: "40px", height: "56px", objectFit: "cover", borderRadius: "2px", flexShrink: 0 }}
                  />
                  <div className="min-w-0">
                    <p className="font-serif text-xs font-semibold text-ink line-clamp-1">{other.title}</p>
                    <p className="mt-0.5 text-[10px] text-stone">{other.author}</p>
                    <p className="mt-0.5 text-[10px] font-bold text-book-green">{other.price.toLocaleString()}원</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── 오른쪽: 상세 정보 ── */}
        <div className="flex flex-1 flex-col">

          {/* 옛친구 프로필 */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-book-green/10 font-serif text-sm font-semibold text-book-green"
            >
              {book.author.slice(0, 1)}
            </div>
            <div>
              <p className="text-xs text-stone">옛친구</p>
              <p className="text-sm font-medium text-ink">{book.author}</p>
            </div>
            {/* Supabase 연결 후 실제 사용자 정보로 대체 */}
          </div>

          {/* 제목 */}
          <h1 className="font-serif text-3xl font-semibold leading-snug text-ink sm:text-4xl">
            {book.title}
          </h1>

          {/* 친구비 */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-xs text-stone">친구비</span>
            <span className="font-serif text-2xl font-bold text-book-green">
              {book.price.toLocaleString()}원
            </span>
          </div>

          {/* 구분선 */}
          <hr className="my-8 border-linen" />

          {/* 소울북 소개 */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-book-green">
              내 소울북을 소개합니다
            </p>
            <p className="font-serif text-base leading-[1.9] text-ink whitespace-pre-line">
              {book.story ?? "옛친구가 아직 소개글을 작성하지 않았습니다."}
            </p>
          </div>

          {/* 구분선 */}
          <hr className="my-8 border-linen" />

          {/* 등록일 */}
          <p className="text-xs text-stone">등록일 {book.date}</p>

          {/* 건네받기 버튼 */}
          <Link
            href={`/chat/${book.id}`}
            className="mt-8 flex items-center justify-center gap-2 rounded-button bg-book-green py-4 text-base font-medium text-white shadow-card transition-colors hover:bg-soft-green"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            이 소울북 건네받기 — 책 대화 시작
          </Link>

          <p className="mt-3 text-center text-xs text-stone">
            버튼을 누르면 옛친구와 1:1 책 대화가 시작됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
