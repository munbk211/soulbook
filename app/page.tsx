export default function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="font-serif text-4xl font-semibold leading-snug tracking-tight text-ink sm:text-5xl md:text-6xl">
        이 책,<br />당신이 읽어줬으면 해서요.
      </h1>

      <p className="mt-8 max-w-md text-base leading-relaxed text-stone sm:text-lg">
        옛친구의 진심이 담긴 소울북을 건네받아보세요.
      </p>

      <a
        href="/receive"
        className="mt-12 inline-block rounded-button bg-book-green px-10 py-4 text-base font-medium text-white transition-colors hover:bg-soft-green"
      >
        소울북 건네받기
      </a>
    </section>
  );
}
