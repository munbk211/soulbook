"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const STORAGE_KEY = "soulbook_books";

export type Book = {
  id: number;
  title: string;
  author: string;
  authorProfile?: string;
  price: number;
  coverUrl: string;
  date: string;
  story?: string;
};

const INITIAL_BOOKS: Book[] = [
  { id: 1,  title: "아몬드",              author: "손원평",         price: 4800, coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80", date: "2026-04-18", story: "처음 이 책을 읽었을 때 저는 감정이 잘 느껴지지 않는 사람이었어요. 윤재를 보면서 이상하게도 위로받았습니다. 나만 이런 게 아닐 수도 있겠다고. 감정이 서툰 누군가에게 꼭 건네고 싶습니다." },
  { id: 2,  title: "채식주의자",           author: "한강",           price: 5500, coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80", date: "2026-04-17", story: "마지막 장을 덮고 나서 한참을 멍하니 있었어요. 무언가 무너지는 기분이 드는 날 밤에 읽었으면 합니다. 이 책이 당신 안의 무언가를 건드릴 거예요." },
  { id: 3,  title: "82년생 김지영",        author: "조남주",         price: 3900, coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80", date: "2026-04-17", story: "읽는 내내 '이게 나 얘기인가' 싶었어요. 주변의 여성분들께 특히 건네고 싶은 책입니다. 공감과 위로, 그리고 작은 용기를 드릴 수 있을 거예요." },
  { id: 4,  title: "해변의 카프카",        author: "무라카미 하루키", price: 6200, coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80", date: "2026-04-16", story: "스무 살에 읽었던 책을 서른이 넘어 다시 펼쳤습니다. 완전히 다른 책이 되어 있었어요. 이 책은 당신이 어떤 나이에 읽느냐에 따라 다른 이야기를 건네줍니다." },
  { id: 5,  title: "데미안",              author: "헤르만 헤세",     price: 3200, coverUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&q=80", date: "2026-04-16", story: "새는 알을 깨고 나온다. 알은 세계다. 태어나려는 자는 하나의 세계를 파괴해야 한다. 이 문장이 오래도록 마음에 남았습니다. 무언가를 시작하려는 분께 드립니다." },
  { id: 6,  title: "어린 왕자",           author: "생텍쥐페리",      price: 2800, coverUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&q=80", date: "2026-04-15", story: "어른이 되고 나서 다시 읽으면 완전히 다른 책입니다. 어린 시절의 나를 기억하고 싶을 때, 혹은 지친 하루 끝에 꺼내 읽어보세요." },
  { id: 7,  title: "나미야 잡화점의 기적", author: "히가시노 게이고", price: 5000, coverUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&q=80", date: "2026-04-15", story: "따뜻한 이야기가 필요한 날 손에 잡은 책입니다. 읽고 나서 주변 사람들에게 연락하고 싶어질 거예요. 그 마음 그대로 전달하고 싶어서 올립니다." },
  { id: 8,  title: "파친코",              author: "이민진",          price: 7500, coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80", date: "2026-04-14", story: "4대에 걸친 이야기인데, 다 읽고 나면 내 가족 이야기처럼 느껴집니다. 역사와 개인이 이렇게 연결될 수 있다는 것을 보여주는 책이에요." },
  { id: 9,  title: "완전한 행복",          author: "정유정",          price: 4200, coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80", date: "2026-04-14", story: "스릴러인데 읽는 내내 손을 놓을 수가 없었어요. 행복이란 무엇인가에 대해 섬뜩한 방식으로 질문을 던집니다." },
  { id: 10, title: "불편한 편의점",        author: "김호연",          price: 3800, coverUrl: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&q=80", date: "2026-04-13", story: "따뜻하고 유쾌한 이야기입니다. 지치고 힘든 날, 가벼운 마음으로 펼치기 좋은 책이에요. 읽고 나면 기분이 조금 나아질 거예요." },
  { id: 11, title: "작별인사",             author: "김영하",          price: 4500, coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80", date: "2026-04-13", story: "SF인데 가장 인간적인 이야기였습니다. 존재와 감정에 대해 새롭게 생각하게 해준 책이에요." },
  { id: 12, title: "흰",                  author: "한강",            price: 3600, coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80", date: "2026-04-12", story: "시처럼 읽히는 산문입니다. 눈 오는 날, 혼자 조용히 읽으면 가장 잘 어울리는 책이에요." },
  { id: 13, title: "구의 증명",            author: "최진영",          price: 4100, coverUrl: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&q=80", date: "2026-04-12", story: "사랑에 대한 책인데 읽는 내내 마음이 아팠습니다. 누군가를 깊이 사랑해본 분께 건네고 싶어요." },
  { id: 14, title: "달러구트 꿈 백화점",   author: "이미예",          price: 5200, coverUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&q=80", date: "2026-04-11", story: "꿈을 파는 백화점이라는 상상력이 너무 사랑스러워요. 지친 일상 속에서 잠깐의 도피처가 되어줄 책입니다." },
  { id: 15, title: "소년이 온다",          author: "한강",            price: 4900, coverUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80", date: "2026-04-11", story: "읽는 내내 눈물을 참기 어려웠습니다. 역사를 기억하는 것이 무엇인지, 인간의 존엄이 무엇인지 다시 생각하게 해준 책입니다." },
];

type BookContextValue = {
  books: Book[];
  addBook: (book: Omit<Book, "id" | "date">) => void;
};

const BookContext = createContext<BookContextValue | null>(null);

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(() => {
    if (typeof window === "undefined") return INITIAL_BOOKS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as Book[];
    } catch {}
    return INITIAL_BOOKS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch {}
  }, [books]);

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
