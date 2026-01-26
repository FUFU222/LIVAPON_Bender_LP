"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

type DividerSectionProps = {
    children?: ReactNode;
    className?: string;
};

export function DividerSection({ children, className = "" }: DividerSectionProps) {
    // 説明会を長めに固定表示させるためスクロール領域を拡張
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        let cleanup: (() => void) | null = null;
        let rafId = 0;
        let attempts = 0;

        const tryBind = () => {
            const lenis = (window as { lenis?: { options?: { wheelMultiplier?: number; touchMultiplier?: number } } }).lenis;
            if (!lenis || !lenis.options) {
                attempts += 1;
                if (attempts < 60) {
                    rafId = requestAnimationFrame(tryBind);
                }
                return;
            }

            const baseWheel = lenis.options.wheelMultiplier ?? 1;
            const baseTouch = lenis.options.touchMultiplier ?? 2;
            const slowWheel = 0.18;
            const slowTouch = 0.6;
            let active = false;

            const unsubscribe = scrollYProgress.on("change", (value) => {
                const inSlowZone = value >= 0.78 && value <= 0.98;
                if (inSlowZone && !active) {
                    active = true;
                    lenis.options!.wheelMultiplier = slowWheel;
                    lenis.options!.touchMultiplier = slowTouch;
                    return;
                }
                if (!inSlowZone && active) {
                    active = false;
                    lenis.options!.wheelMultiplier = baseWheel;
                    lenis.options!.touchMultiplier = baseTouch;
                }
            });

            cleanup = () => {
                lenis.options!.wheelMultiplier = baseWheel;
                lenis.options!.touchMultiplier = baseTouch;
                unsubscribe();
            };
        };

        tryBind();

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (cleanup) cleanup();
        };
    }, [scrollYProgress]);

    // 0.8倍からスタートし、急拡大する前にフェードアウトさせて荒さを隠す
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1.05, 1.8, 4.5, 6]);

    // 透明度調整：ロゴは後半まで維持、説明会は中盤から長めに表示
    const opacity = useTransform(scrollYProgress, [0, 0.7, 0.9, 1], [1, 1, 0.3, 0]);
    const contentOpacity = useTransform(scrollYProgress, [0.35, 0.55, 1], [0, 1, 1]);
    const contentScale = useTransform(scrollYProgress, [0.35, 0.55, 1], [0.98, 1, 1]);

    return (
        <section
            ref={containerRef}
            className={`relative bg-white ${className}`.trim()}
            style={{ height: "260vh" }}
        >
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ scale, opacity }} className="relative z-10 w-[80vw] max-w-[820px]">
                    <Image
                        src="/livapon_logo.png"
                        alt="LIVAPON"
                        width={600}
                        height={600}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </motion.div>
                {children ? (
                    <motion.div
                        style={{ opacity: contentOpacity, scale: contentScale }}
                        className="absolute inset-0 z-20 flex items-center"
                    >
                        <div className="relative w-full">
                            {children}
                        </div>
                    </motion.div>
                ) : null}
            </div>
        </section>
    );
}
