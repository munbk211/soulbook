const navItems = [
  { label: "소울북 소개", href: "/about" },
  { label: "내반소", href: "/my" },
  { label: "건네주기", href: "/give" },
  { label: "건네받기", href: "/receive" },
  { label: "소울북 가이드", href: "/guide" },
];

export default function Header() {
  return (
    <header className="w-full border-b border-linen bg-cream px-6 py-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <a
          href="/"
          className="font-serif text-2xl font-semibold tracking-tight text-book-green"
        >
          소울북
        </a>
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-stone transition-colors hover:text-book-green"
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
