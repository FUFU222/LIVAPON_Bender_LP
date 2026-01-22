import type { Metadata } from "next";
import {
  Noto_Sans_JP,
  Noto_Serif_JP,
  Shippori_Mincho,
  Zen_Kaku_Gothic_New,
  Oswald,
} from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import { FloatingCTA } from "./components/layout/FloatingCTA";
import BlobCursor from "./components/ui/BlobCursor";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LIVAPON | 世界進出を、もっとシンプルに。",
  description:
    "「LIVEで語る」越境プラットフォーム。複雑な海外展開を、一本の流れへ。",
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
    title: "LIVAPON | 世界進出を、もっとシンプルに。",
    description: "「LIVEで語る」越境プラットフォーム。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "LIVAPON | 世界進出を、もっとシンプルに。",
    description: "「LIVEで語る」越境プラットフォーム。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="overflow-x-hidden">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} ${shipporiMincho.variable} ${zenKaku.variable} ${oswald.variable} antialiased overflow-x-hidden`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <FloatingCTA />
        <BlobCursor
          blobType="circle"
          fillColor="var(--accent)"
          trailCount={3}
          sizes={[22, 40, 28]}
          innerSizes={[7, 12, 9]}
          innerColor="rgba(255,255,255,0.7)"
          opacities={[0.45, 0.35, 0.4]}
          shadowColor="rgba(0,0,0,0.35)"
          shadowBlur={4}
          shadowOffsetX={6}
          shadowOffsetY={6}
          filterStdDeviation={12}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
          zIndex={10000}
          hideCursor={false}
        />
      </body>
    </html>
  );
}
