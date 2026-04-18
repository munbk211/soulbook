"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  coverUrl: string;
  date: string;
};

const INITIAL_BOOKS: Book[] = [
  { id: 1,  title: "아몬드",              author: "손원평",         price: 4800, coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80", date: "2026-04-18" },
  { id: 2,  title: "채식주의자",           author: "한강",           price: 5500, coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80", date: "2026-04-17" },
  { id: 3,  title: "82년생 김지영",        author: "조남주",         price: 3900, coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80", date: "2026-04-17" },
  { id: 4,  title: "해변의 카프카",        author: "무라카미 하루키", price: 6200, coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80", date: "2026-04-16" },
  { id: 5,  title: "데미안",              author: "헤르만 헤세",     price: 3200, coverUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&q=80", date: "2026-04-16" },
  { id: 6,  title: "어린 왕자",           author: "생텍쥐페리",      price: 2800, coverUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&q=80", date: "2026-04-15" },
  { id: 7,  title: "나미야 잡화점의 기적", author: "히가시노 게이고", price: 5000, coverUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&q=80", date: "2026-04-15" },
  { id: 8,  title: "파친코",              author: "이민진",          price: 7500, coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80", date: "2026-04-14" },
  { id: 9,  title: "완전한 행복",          author: "정유정",          price: 4200, coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80", date: "2026-04-14" },
  { id: 10, title: "불편한 편의점",        author: "김호연",          price: 3800, coverUrl: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&q=80", date: "2026-04-13" },
  { id: 11, title: "작별인사",             author: "김영하",          price: 4500, coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80", date: "2026-04-13" },
  { id: 12, title: "흰",                  author: "한강",            price: 3600, coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80", date: "2026-04-12" },
  { id: 13, title: "구의 증명",            author: "최진영",          price: 4100, coverUrl: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&q=80", date: "2026-04-12" },
  { id: 14, title: "달러구트 꿈 백화점",   author: "이미예",          price: 5200, coverUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&q=80", date: "2026-04-11" },
  { id: 15, title: "소년이 온다",          author: "한강",            price: 4900, coverUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80", date: "2026-04-11" },
];

type BookContextValue = {
  books: Book[];
  addBook: (book: Omit<Book, "id" | "date">) => void;
};

const BookContext = createContext<BookContextValue | null>(null);

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);

  function addBook(data: Omit<Book, "id" | "date">) {
    const newBook: Book = {
      ...data,
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
    };
    setBooks((prev) => [newBook, ...prev]);
  }

  return (
    <BookContext.Provider value={{ books, addBook }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBooks must be used inside BookProvider");
  return ctx;
}
