"use client";

import { useState } from "react";

type SubmitState = "idle" | "success" | "error";

export default function GivePage() {
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [story, setStory] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const next = files.map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    setImages((prev) => [...prev, ...next].slice(0, 5));
    e.target.value = "";
  }

  function removeImage(index: number) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleSubmit() {
    if (!title.trim()) {
      alert("소울북 제목을 입력해주세요.");
      return;
    }
    const payload = { title, price: Number(price), story, imageCount: images.length };
    console.log("[소울북 건네주기]", payload);
    setSubmitState("success");
  }

  if (submitState === "success") {
    return (
      <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <p className="text-4xl">📬</p>
        <h2 className="mt-6 font-serif text-2xl font-semibold text-ink">소울북이 건네졌어요.</h2>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone">
          당신의 진심이 담긴 소울북이 새친구를 기다리고 있습니다.<br />
          수기 독서 가이드도 꼭 책 사이에 넣어주세요!
        </p>
        <a
          href="/receive"
          className="mt-8 inline-block rounded-button bg-book-green px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-soft-green"
        >
          소울북 상점 보러 가기
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-input border border-[#DDD8CF] bg-cream px-4 py-3 text-sm text-ink placeholder:text-stone/50 focus:border-book-green focus:outline-none transition-colors";

  return (
    <div className="relative z-10 mx-auto w-full max-w-2xl px-6 py-16">

      {/* ── Hero Section ── */}
      <div className="mb-10 rounded-card border border-[#E4DDD2] bg-paper px-8 py-8 shadow-card">
        <h1 className="font-serif text-3xl font-semibold leading-snug text-ink sm:text-4xl">
          소울북을 보내는 마음
        </h1>
        <div className="mt-5 rounded-input border border-[#E4DDD2] bg-cream px-5 py-4">
          <p className="text-[10px] font-medium uppercase tracking-widest text-book-green">
            소울북 가이드 질문
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone">
            <li>📌 이 소울북은 당신에게 어떤 의미였나요?</li>
            <li>📌 왜 다음 새친구가 이 책을 꼭 읽어줬으면 하나요?</li>
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
            {images.map((img, i) => (
              <div
                key={img.url}
                className="relative h-24 w-24 overflow-hidden rounded-input border border-[#DDD8CF]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={`미리보기 ${i + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink/70 text-white hover:bg-ink"
                  aria-label="사진 삭제"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-input border border-dashed border-[#C8C0B4] bg-cream text-stone/60 transition-colors hover:border-book-green hover:text-book-green">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="mt-1 text-xs">{images.length}/5</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>
        </section>

        <hr className="border-[#E4DDD2]" />

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
            className={inputClass}
          />
        </section>

        {/* 친구비 */}
        <section>
          <label className="mb-2 block font-serif text-base font-semibold text-ink" htmlFor="price">
            친구비
            <span className="ml-2 font-sans text-xs font-normal text-stone">
              새친구가 건네받을 때 내는 비용이에요
            </span>
          </label>
          <div className="relative">
            <input
              id="price"
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={inputClass + " pr-10"}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone">원</span>
          </div>
        </section>

        <hr className="border-[#E4DDD2]" />

        {/* 이 소울북은 나에게 어떤 의미였나요? */}
        <section>
          <label className="mb-4 block font-serif text-xl font-semibold leading-snug text-ink sm:text-2xl" htmlFor="story">
            이 소울북은 나에게<br />어떤 의미였나요?
          </label>
          <textarea
            id="story"
            rows={8}
            placeholder="예) 처음 이 책을 읽었을 때 저는 20대 중반이었고, 무언가 무너지는 기분이 드는 날이었어요. 마지막 장을 덮고 나서 한참을 멍하니 있었던 기억이 나요. 지금 비슷한 감정을 느끼는 누군가에게 이 책이 닿았으면 해서, 소울북으로 올립니다."
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="w-full resize-none rounded-card border border-[#DDD8CF] bg-cream px-4 py-4 text-sm leading-relaxed text-ink placeholder:text-stone/40 focus:border-book-green focus:outline-none transition-colors"
          />
          <p className="mt-2 text-right text-xs text-stone">{story.length}자</p>
        </section>

        {/* 따뜻한 당부 */}
        <div className="flex items-start gap-3 rounded-card border border-[#E4DDD2] bg-cream px-5 py-4">
          <span className="mt-0.5 text-lg">✉️</span>
          <p className="text-sm leading-relaxed text-stone">
            <a
              href="/guide"
              className="font-medium text-book-green underline-offset-2 hover:underline"
            >
              수기 소울북 가이드
            </a>
            도 잊지 말고 책 사이에 꼭 넣어주세요!<br />
            당신의 손 글씨가 새친구에게 가장 큰 선물이 될 거예요.
          </p>
        </div>

        {/* 제출 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-button bg-book-green py-4 text-base font-medium text-white shadow-card transition-colors hover:bg-soft-green"
        >
          진심을 담아 건네주기
        </button>
      </div>
    </div>
  );
}
