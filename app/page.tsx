import Image from "next/image";

const sampleBooks = [
  {
    id: 1,
    title: "아몬드",
    author: "손원평",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    message: "인생의 정답을 찾고 싶을 때, 이 책이 조용히 곁에 있어줄 거예요.",
    price: "4,800",
  },
  {
    id: 2,
    title: "채식주의자",
    author: "한강",
    coverUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    message: "무언가 무너지는 기분이 드는 날 밤에 펼쳐보세요.",
    price: "5,500",
  },
];

export default function Home() {
  return (
    <div className="relative z-10 flex flex-col">
      {/* 히어로 섹션 */}
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-16 px-6 py-24 md:flex-row md:items-center md:py-32">
        {/* 텍스트 영역 */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <h1 className="animate-fade-up font-serif text-4xl font-semibold leading-snug tracking-tight text-ink sm:text-5xl md:text-6xl">
            이 책,<br />당신이<br />읽어줬으면 해서요.
          </h1>
          <p className="animate-fade-up delay-200 mt-8 max-w-sm text-base leading-relaxed text-stone sm:text-lg">
            옛친구의 진심이 담긴 소울북을 건네받아보세요.
          </p>
          <a
            href="/receive"
            className="animate-fade-up delay-300 mt-10 inline-block rounded-button bg-book-green px-10 py-4 text-base font-medium text-white shadow-card transition-colors hover:bg-soft-green"
          >
            소울북 건네받기
          </a>
        </div>

        {/* 이미지 영역 */}
        <div className="animate-fade-up delay-200 relative w-full max-w-sm flex-shrink-0 md:w-96">
          <div className="overflow-hidden rounded-card shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80"
              alt="따뜻한 조명 아래 놓인 책 더미"
              width={800}
              height={600}
              className="h-72 w-full object-cover md:h-96"
              priority
            />
          </div>
          {/* 플로팅 태그 */}
          <div className="animate-fade-up delay-500 absolute -bottom-4 -left-4 rounded-card bg-paper px-5 py-3 shadow-card">
            <p className="font-serif text-sm text-book-green">📖 오늘도 책 한 권이 건네집니다.</p>
          </div>
        </div>
      </section>

      {/* 오늘의 소울북 섹션 */}
      <section className="bg-paper px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="animate-fade-up font-serif text-2xl font-semibold text-ink sm:text-3xl">
            오늘의 소울북
          </h2>
          <p className="animate-fade-up delay-100 mt-2 text-sm text-stone">
            오늘 새롭게 건네진 소울북들을 만나보세요.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {sampleBooks.map((book, i) => (
              <div
                key={book.id}
                className={`animate-fade-up delay-${(i + 1) * 200} flex gap-5 rounded-card bg-cream border border-linen p-5 shadow-card transition-shadow hover:shadow-md`}
              >
                <div className="flex-shrink-0 overflow-hidden rounded-input">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    width={80}
                    height={110}
                    className="h-28 w-20 object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="font-serif text-base font-semibold text-ink">{book.title}</p>
                    <p className="mt-0.5 text-xs text-stone">{book.author}</p>
                    <p className="mt-3 text-sm leading-relaxed text-stone">
                      &ldquo;{book.message}&rdquo;
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-book-green">친구비 {book.price}원</span>
                    <button className="rounded-input bg-book-green px-4 py-1.5 text-xs text-white transition-colors hover:bg-soft-green">
                      건네받기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
