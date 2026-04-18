const navItems = [
  { label: "소울북 소개", href: "/about" },
  { label: "소울북 상점", href: "/receive" },
  { label: "내반소", href: "/#" },
  { label: "소울레터", href: "/#" },
];

export default function Header() {
  return (
    <header className="relative z-20 w-full border-b border-linen bg-cream/90 px-6 py-4 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <a
          href="/"
          className="font-serif text-2xl font-semibold tracking-tight text-book-green"
        >
          소울북
        </a>
        <ul className="flex items-center gap-7">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-serif text-sm text-stone transition-colors hover:text-book-green"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
