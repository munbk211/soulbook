"use client";

import { useState } from "react";

export default function GivePage() {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [story, setStory] = useState("");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const urls = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls].slice(0, 5));
  }

  return (
    <div className="relative z-10 mx-auto w-full max-w-2xl px-6 py-16">

      {/* ── Hero Section ── */}
      <div className="mb-10 rounded-card border border-linen bg-paper px-8 py-8 shadow-card">
        <h1 className="font-serif text-2xl font-semibold leading-snug text-ink sm:text-3xl">
          당신의 마음을<br />함께 건네주세요.
        </h1>
        <div className="mt-5 rounded-input border border-linen bg-cream px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-widest text-book-green">
            소울북 가이드 질문
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone">
            <li>📌 이 소울북은 당신에게 어떤 의미였나요?</li>
            <li>📌 왜 다음 친구가 이 책을 꼭 읽어줬으면 하나요?</li>
          </ul>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-stone">
          아래 등록 폼에 천천히 답변을 적어주시면 됩니다. 당신의 이야기가 새친구에게 닿을 거예요.
        </p>
      </div>

      {/* ── 등록 폼 ── */}
      <div className="space-y-8">

        {/* 사진 등록 */}
        <section>
          <label className="mb-3 block font-serif text-base font-semibold text-ink">
            사진 등록
            <span className="ml-2 font-sans text-xs font-normal text-stone">
              책과 수기 가이드가 잘 보이도록 함께 찍어주세요 (최대 5장)
            </span>
          </label>
          <div className="flex flex-wrap gap-3">
            {images.map((src, i) => (
              <div
                key={i}
                className="relative h-24 w-24 overflow-hidden rounded-input border border-linen shadow-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`미리보기 ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
            {images.length < 5 && (
              <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-input border-2 border-dashed border-linen bg-cream text-stone transition-colors hover:border-book-green hover:text-book-green">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="mt-1 text-xs">{images.length}/5</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </section>

        {/* 구분선 */}
        <hr className="border-linen" />

        {/* 소울북 제목 */}
        <section>
          <label className="mb-2 block font-serif text-base font-semibold text-ink" htmlFor="title">
            소울북 제목
          </label>
          <input
            id="title"
            type="text"
            placeholder="건네줄 책의 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-input border border-linen bg-cream px-4 py-3 text-sm text-ink placeholder:text-stone/60 focus:border-book-green focus:outline-none"
          />
        </section>

        {/* 친구비 */}
        <section>
          <label className="mb-2 block font-serif text-base font-semibold text-ink" htmlFor="price">
            친구비
            <span className="ml-2 font-sans text-xs font-normal text-stone">
              책을 건네받는 새친구가 내는 비용이에요
            </span>
          </label>
          <div className="relative">
            <input
              id="price"
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-input border border-linen bg-cream px-4 py-3 pr-10 text-sm text-ink placeholder:text-stone/60 focus:border-book-green focus:outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone">원</span>
          </div>
        </section>

        {/* 구분선 */}
        <hr className="border-linen" />

        {/* 나의 소울북 이야기 */}
        <section>
          <label className="mb-1 block font-serif text-base font-semibold text-ink" htmlFor="story">
            나의 소울북 이야기
          </label>
          <p className="mb-3 text-xs text-stone">
            위 질문들에 대한 답변을 자유롭게 적어주세요. 이 글이 새친구에게 전달되는 당신만의 독서 가이드가 됩니다.
          </p>
          <textarea
            id="story"
            rows={8}
            placeholder={"예) 처음 이 책을 읽었을 때 저는 20대 중반이었고, 무언가 무너지는 기분이 드는 날이었어요. 마지막 장을 덮고 나서 한참을 멍하니 있었던 기억이 나요. 지금 비슷한 감정을 느끼는 누군가에게 이 책이 닿았으면 해서, 소울북으로 올립니다."}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="w-full resize-none rounded-card border border-linen bg-cream px-4 py-4 text-sm leading-relaxed text-ink placeholder:text-stone/50 focus:border-book-green focus:outline-none"
          />
          <p className="mt-2 text-right text-xs text-stone">{story.length}자</p>
        </section>

        {/* 따뜻한 당부 */}
        <div className="flex items-start gap-3 rounded-card border border-linen bg-cream px-5 py-4">
          <span className="mt-0.5 text-lg">✉️</span>
          <p className="text-sm leading-relaxed text-stone">
            <span className="font-medium text-book-green">수기 독서 가이드도 잊지 말고</span> 책 사이에 꼭 넣어주세요!<br />
            당신의 손 글씨가 새친구에게 가장 큰 선물이 될 거예요.
          </p>
        </div>

        {/* 제출 버튼 */}
        <button
          type="button"
          className="w-full rounded-button bg-book-green py-4 text-base font-medium text-white shadow-card transition-colors hover:bg-soft-green"
        >
          소울북 건네주기
        </button>
      </div>
    </div>
  );
}
