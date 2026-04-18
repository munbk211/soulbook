"use client";

import Image from "next/image";
import { useState } from "react";

type SortKey = "latest" | "price";

const BOOKS = [
  { id: 1, title: "아몬드", author: "손원평", price: 4800, coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80", date: "2026-04-18" },
  { id: 2, title: "채식주의자", author: "한강", price: 5500, coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80", date: "2026-04-17" },
  { id: 3, title: "82년생 김지영", author: "조남주", price: 3900, coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80", date: "2026-04-17" },
  { id: 4, title: "해변의 카프카", author: "무라카미 하루키", price: 6200, coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80", date: "2026-04-16" },
  { id: 5, title: "데미안", author: "헤르만 헤세", price: 3200, coverUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&q=80", date: "2026-04-16" },
  { id: 6, title: "어린 왕자", author: "생텍쥐페리", price: 2800, coverUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&q=80", date: "2026-04-15" },
  { id: 7, title: "나미야 잡화점의 기적", author: "히가시노 게이고", price: 5000, coverUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&q=80", date: "2026-04-15" },
  { id: 8, title: "파친코", author: "이민진", price: 7500, coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80", date: "2026-04-14" },
  { id: 9, title: "완전한 행복", author: "정유정", price: 4200, coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80", date: "2026-04-14" },
  { id: 10, title: "불편한 편의점", author: "김호연", price: 3800, coverUrl: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&q=80", date: "2026-04-13" },
];

const SHELF_SIZE = 5;

function BookCard({ book }: { book: typeof BOOKS[0] }) {
  return (
    <a href={`/receive/${book.id}`} className="group flex flex-col items-center">
      {/* 책 표지 — 3D 입체 효과 */}
      <div
        className="relative transition-transform duration-300 group-hover:-translate-y-3"
        style={{ perspective: "600px" }}
      >
        <div
          style={{
            width: "100px",
            height: "148px",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: "rotateY(-8deg)",
            filter: "drop-shadow(-6px 10px 14px rgba(0,0,0,0.35))",
          }}
        >
          {/* 앞표지 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "2px 6px 6px 2px",
              overflow: "hidden",
            }}
          >
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              className="object-cover"
              sizes="100px"
            />
          </div>
          {/* 페이지 측면 (두께 표현) */}
          <div
            style={{
              position: "absolute",
              top: "1px",
              left: "-10px",
              width: "10px",
              height: "146px",
              background: "linear-gradient(to right, #e8e0d0, #f5f0e8, #e8e0d0)",
              borderRadius: "1px 0 0 1px",
              transform: "rotateY(90deg)",
              transformOrigin: "right center",
            }}
          />
          {/* 표지 광택 오버레이 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "2px 6px 6px 2px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* 책 정보 */}
      <div className="mt-4 text-center">
        <p className="font-serif text-xs font-semibold leading-tight text-ink line-clamp-1 w-24">{book.title}</p>
        <p className="mt-0.5 text-[10px] text-stone">{book.author}</p>
        <p className="mt-1 text-xs font-bold text-book-green">{book.price.toLocaleString()}원</p>
      </div>
    </a>
  );
}

function Shelf({ books }: { books: typeof BOOKS }) {
  return (
    <div className="relative mb-16">
      {/* 책들 */}
      <div className="flex items-end justify-start gap-6 px-8 pb-4 overflow-x-auto">
        {books.map((book) => (
          <div key={book.id} className="flex-shrink-0">
            <BookCard book={book} />
          </div>
        ))}
      </div>

      {/* 원목 선반 */}
      <div
        style={{
          height: "18px",
          background: "linear-gradient(180deg, #C8995A 0%, #B8864A 35%, #A07035 70%, #8B5E2C 100%)",
          borderRadius: "2px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        {/* 나뭇결 패턴 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.18,
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.4) 40px, rgba(255,255,255,0.4) 41px), repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(0,0,0,0.15) 120px, rgba(0,0,0,0.15) 121px)",
          }}
        />
      </div>
      {/* 선반 아래 그림자 */}
      <div
        style={{
          height: "10px",
          background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 100%)",
          borderRadius: "0 0 4px 4px",
        }}
      />
    </div>
  );
}

export default function ReceivePage() {
  const [sort, setSort] = useState<SortKey>("latest");

  const sorted = [...BOOKS].sort((a, b) =>
    sort === "price" ? a.price - b.price : b.date.localeCompare(a.date)
  );

  const shelves: (typeof BOOKS)[] = [];
  for (let i = 0; i < sorted.length; i += SHELF_SIZE) {
    shelves.push(sorted.slice(i, i + SHELF_SIZE));
  }

  return (
    <div className="relative z-10 w-full px-4 py-14 sm:px-8">
      {/* 타이틀 */}
      <div className="mx-auto mb-10 max-w-6xl animate-fade-up">
        <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">소울북 상점</h1>
        <p className="mt-2 text-sm text-stone">옛친구들이 정성껏 건네주는 소울북을 만나보세요.</p>
      </div>

      {/* 필터 */}
      <div className="mx-auto mb-10 max-w-6xl animate-fade-up delay-100 flex gap-2">
        {(["latest", "price"] as SortKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setSort(key)}
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

      {/* 책장 */}
      <div className="animate-fade-up delay-200 mx-auto max-w-6xl">
        {shelves.map((shelfBooks, i) => (
          <Shelf key={i} books={shelfBooks} />
        ))}
      </div>

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
