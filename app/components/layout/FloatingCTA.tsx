"use client";

import Image from "next/image";
import Link from "next/link";
import CircularText from "../ui/CircularText";

export function FloatingCTA() {
    return (
        <Link
            href="/#contact" // アンカーリンクまたは別ページ
            className="fixed bottom-8 right-8 z-[9999] group cursor-pointer block"
            aria-label="Contact Us"
        >
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* 背景のぼかしや装飾（オプション） */}
                <div className="absolute inset-0 bg-black/10 rounded-full blur-xl scale-75 group-hover:scale-90 transition-transform duration-500" />

                {/* 回転するテキストリング */}
                <div className="absolute inset-0 pointer-events-none">
                    <CircularText
                        text="LIVAPON * LIVAPON * LIVAPON * "
                        spinDuration={20}
                        onHover="speedUp"
                        className="w-full h-full text-foreground text-[10px]"
                    />
                </div>

                {/* 中央のシンボルとテキスト */}
                <div className="relative w-20 h-20 flex items-center justify-center rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                    {/* シンボル画像 */}
                    <div className="absolute inset-0 opacity-90">
                        <Image
                            src="/livapon_symbol_new.png"
                            alt="Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* 重ねるCONTACTテキスト */}
                    <span
                        className="relative z-10 text-[12px] font-black text-white tracking-widest"
                        style={{
                            // 参考画像のような、下に落ちるハードな影
                            textShadow: "0px 2px 0px rgba(0,0,0,0.5)"
                        }}
                    >
                        CONTACT
                    </span>
                </div>
            </div>
        </Link>
    );
}
