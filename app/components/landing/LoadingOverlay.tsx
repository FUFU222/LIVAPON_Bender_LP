"use client";

import Image from "next/image";
import { TextType } from "../ui/TextType";

type LoadingOverlayProps = {
    stage: "visible" | "pulse-out" | "logo-out" | "hide";
};

export function LoadingOverlay({ stage }: LoadingOverlayProps) {
    const stageClass =
        stage === "pulse-out"
            ? "loading-overlay--pulse-out"
            : stage === "logo-out"
            ? "loading-overlay--logo-out"
            : stage === "hide"
            ? "loading-overlay--hide"
            : "";

    return (
        <div
            className={`loading-overlay fixed inset-0 z-[9999] flex items-center justify-center ${stageClass}`}
            role="status"
            aria-live="polite"
            aria-label="読み込み中"
        >
            <div className="loading-overlay__content loading-overlay__content--lower">
                <div className="loading-logo-stack">
                    <div className="loading-pulse" aria-hidden="true">
                        <span className="loading-pulse__ring" />
                        <span className="loading-pulse__ring loading-pulse__ring--delay" />
                        <span className="loading-pulse__ring loading-pulse__ring--delay-2" />
                    </div>
                    <div className="loading-logo-wrap">
                        <Image
                            src="/livapon_symbol_new.png"
                            alt="LIVAPON"
                            width={96}
                            height={96}
                            className="loading-logo"
                            priority
                        />
                    </div>
                </div>
            </div>
            <div className="loading-typing">
                <TextType
                    text={["LOADING", "LIVAPON"]}
                    typingSpeed={80}
                    deletingSpeed={40}
                    pauseDuration={600}
                    cursorCharacter="|"
                    cursorBlinkDuration={0.6}
                    className="font-mono font-bold text-[12px] tracking-[0.25em] text-gray-400 uppercase"
                />
            </div>
        </div>
    );
}
