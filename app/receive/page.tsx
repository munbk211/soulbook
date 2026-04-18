"use client";

import Image from "next/image";
import { useState } from "react";

type SortKey = "latest" | "price";

const BOOKS = [
  {
    id: 1,
    title: "아몬드",
    author: "손원평",
    price: 4800,
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    date: "2026-04-18",
  },
  {
    id: 2,
    title: "채식주의자",
    author: "한강",
    price: 5500,
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    date: "2026-04-17",
  },
  {
    id: 3,
    title: "82년생 김지영",
    author: "조남주",
    price: 3900,
    coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80",
    date: "2026-04-17",
  },
  {
    id: 4,
    title: "해변의 카프카",
    author: "무라카미 하루키",
    price: 6200,
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    date: "2026-04-16",
  },
  {
    id: 5,
    title: "데미안",
    author: "헤르만 헤세",
    price: 3200,
    coverUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&q=80",
    date: "2026-04-16",
  },
  {
    id: 6,
    title: "어린 왕자",
    author: "생텍쥐페리",
    price: 2800,
    coverUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&q=80",
    date: "2026-04-15",
  },
  {
    id: 7,
    title: "나미야 잡화점의 기적",
    author: "히가시노 게이고",
    price: 5000,
    coverUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&q=80",
    date: "2026-04-15",
  },
  {
    id: 8,
    title: "파친코",
    author: "이민진",
    price: 7500,
    coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80",
    date: "2026-04-14",
  },
];

export default function ReceivePage() {
  const [sort, setSort] = useState<SortKey>("latest");

  const sorted = [...BOOKS].sort((a, b) =>
    sort === "price" ? a.price - b.price : b.date.localeCompare(a.date)
  );

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">

      {/* ── 페이지 타이틀 ── */}
      <div className="mb-8 animate-fade-up">
        <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">소울북 상점</h1>
        <p className="mt-2 text-sm text-stone">
          옛친구들이 정성껏 건네주는 소울북을 만나보세요.
        </p>
      </div>

      {/* ── 필터 ── */}
      <div className="animate-fade-up delay-100 mb-6 flex gap-2">
        <button
          onClick={() => setSort("latest")}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            sort === "latest"
              ? "border-book-green bg-book-green text-white"
              : "border-linen bg-paper text-stone hover:border-book-green hover:text-book-green"
          }`}
        >
          최신 등록순
        </button>
        <button
          onClick={() => setSort("price")}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            sort === "price"
              ? "border-book-green bg-book-green text-white"
              : "border-linen bg-paper text-stone hover:border-book-green hover:text-book-green"
          }`}
        >
          친구비 낮은순
        </button>
      </div>

      {/* ── 상품 그리드 ── */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {sorted.map((book, i) => (
          <a
            key={book.id}
            href={`/receive/${book.id}`}
            className={`animate-fade-up delay-${Math.min((i % 4) * 100, 300)} group flex flex-col overflow-hidden rounded-card bg-paper shadow-card transition-shadow hover:shadow-md`}
          >
            {/* 책 이미지 */}
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={book.coverUrl}
                alt={book.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>

            {/* 책 정보 */}
            <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
              <div>
                <p className="font-serif text-sm font-semibold leading-tight text-ink line-clamp-2 sm:text-base">
                  {book.title}
                </p>
                <p className="mt-0.5 text-xs text-stone">{book.author}</p>
              </div>
              <p className="mt-3 text-sm font-bold text-book-green sm:text-base">
                {book.price.toLocaleString()}원
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* ── 플로팅 액션 버튼 ── */}
      <a
        href="/give"
        className="fixed bottom-8 right-6 flex items-center gap-2 rounded-full bg-book-green px-5 py-3.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-soft-green hover:shadow-xl sm:right-10 sm:px-6 sm:py-4 sm:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        건네주기
      </a>
    </div>
  );
}
