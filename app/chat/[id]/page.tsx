"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useBooks } from "../../context/BookContext";

type Message = {
  id: number;
  from: "me" | "friend";
  text: string;
  time: string;
};

function now() {
  return new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const { books } = useBooks();
  const book = books.find((b) => b.id === Number(id));

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "friend",
      text: `안녕하세요 :) 소울북 "${book?.title ?? "이 책"}"에 관심 가져주셔서 감사해요. 어떤 부분이 마음에 드셨나요?`,
      time: now(),
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const myMsg: Message = { id: Date.now(), from: "me", text, time: now() };
    setMessages((prev) => [...prev, myMsg]);
    setInput("");

    // 자동 답변 (Supabase 실시간 연결 전 임시)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "friend",
          text: "감사해요! 이 책, 당신에게 잘 맞을 것 같아요. 주소 알려주시면 바로 보내드릴게요 :)",
          time: now(),
        },
      ]);
    }, 1200);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="relative z-10 flex h-[calc(100vh-64px)] flex-col">

      {/* ── 채팅 헤더 ── */}
      <div className="flex items-center gap-4 border-b border-linen bg-paper px-4 py-3 sm:px-6">
        <Link href={`/receive/${id}`} className="text-stone hover:text-book-green">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {book && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.coverUrl}
              alt={book.title}
              style={{ width: "36px", height: "50px", objectFit: "cover", borderRadius: "2px", flexShrink: 0 }}
            />
            <div className="min-w-0">
              <p className="font-serif text-sm font-semibold text-ink line-clamp-1">{book.title}</p>
              <p className="text-xs text-stone">옛친구 {book.author} 님과의 책 대화</p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-serif text-sm font-bold text-book-green">{book.price.toLocaleString()}원</p>
              <p className="text-xs text-stone">친구비</p>
            </div>
          </>
        )}
      </div>

      {/* ── 메시지 목록 ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.from === "me" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* 아바타 */}
              {msg.from === "friend" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-book-green/10 font-serif text-xs font-semibold text-book-green">
                  {book?.author.slice(0, 1) ?? "?"}
                </div>
              )}

              <div className={`flex flex-col gap-1 ${msg.from === "me" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-xs rounded-card px-4 py-3 text-sm leading-relaxed sm:max-w-sm ${
                    msg.from === "me"
                      ? "bg-book-green text-white"
                      : "border border-linen bg-paper text-ink"
                  }`}
                >
                  {msg.text}
                </div>
                <p className="text-[10px] text-stone">{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── 입력창 ── */}
      <div className="border-t border-linen bg-paper px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-2xl items-end gap-3">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요... (Enter 전송)"
            className="flex-1 resize-none rounded-card border border-[#DDD8CF] bg-cream px-4 py-3 text-sm text-ink placeholder:text-stone/50 focus:border-book-green focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-book-green text-white transition-colors hover:bg-soft-green disabled:opacity-40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-stone">
          Supabase 연결 후 실시간 채팅이 활성화됩니다.
        </p>
      </div>
    </div>
  );
}
