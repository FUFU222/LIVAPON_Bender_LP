"use client";

import Link from "next/link";
import CircularText from "../ui/CircularText";

export function FloatingCTA() {
    return (
        <Link
            href="/#contact" // アンカーリンクまたは別ページ
            className="fixed bottom-8 right-4 2xl:right-[max(2rem,calc((100vw-72rem)/2-11rem))] z-[9999] group cursor-pointer block"
            aria-label="エントリーはこちらから"
        >
            <div className="relative w-28 h-28 md:w-40 md:h-40 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10 rounded-full blur-xl scale-75 group-hover:scale-90 transition-transform duration-500" />
                <div className="absolute inset-0 pointer-events-none">
                    <CircularText
                        text="LIVAPON ENTRY • LIVAPON ENTRY • LIVAPON ENTRY • "
                        spinDuration={20}
                        onHover="speedUp"
                        className="w-full h-full text-white text-[10px] [-webkit-text-stroke:0.6px_rgba(0,0,0,0.45)]"
                    />
                </div>
                <div className="relative w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#8d001f] via-[#c9153a] to-[#ff6b6b] shadow-[0_12px_24px_rgba(188,0,45,0.25)] ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-105">
                    <span className="text-[10px] md:text-[14px] font-semibold tracking-[0.28em] text-white/85 whitespace-nowrap leading-none">
                        ENTRY
                    </span>
                    <span className="mt-0.5 text-[12px] md:text-[18px] font-bold tracking-tight text-white whitespace-nowrap">
                        エントリー
                    </span>
                </div>
            </div>
        </Link>
    );
}
