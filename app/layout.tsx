import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import { FloatingCTA } from "./components/layout/FloatingCTA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LIVAPON | 日本の『最高』を、世界の『熱狂』へ。",
  description:
    "待っているのは80億人。言葉も国境も超える、0.1秒のライブ革命。LIVAPONは日本の越境ライブコマースプラットフォームです。",
  keywords: [
    "ライブコマース",
    "越境EC",
    "海外展開",
    "LIVAPON",
    "リバポン",
    "日本製品",
    "海外販売",
  ],
  openGraph: {
    title: "LIVAPON | 日本の『最高』を、世界の『熱狂』へ。",
    description:
      "待っているのは80億人。言葉も国境も超える、0.1秒のライブ革命。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "LIVAPON | 日本の『最高』を、世界の『熱狂』へ。",
    description:
      "待っているのは80億人。言葉も国境も超える、0.1秒のライブ革命。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <FloatingCTA />
      </body>
    </html>
  );
}
