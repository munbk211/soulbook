import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { BookProvider } from "./context/BookContext";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const notoSerif = Noto_Serif_KR({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "소울북 — 이 책, 당신이 읽어줬으면 해서요.",
  description: "단순한 중고 거래를 넘어, 책에 담긴 마음과 독서 가이드를 함께 전달하는 감성 중고책 건네기 서비스.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSans.variable} ${notoSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream">
        <BookProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </BookProvider>
      </body>
    </html>
  );
}
