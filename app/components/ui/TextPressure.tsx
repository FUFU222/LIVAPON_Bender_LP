"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface TextPressureProps {
    text: string;
    className?: string;
    containerRef?: React.RefObject<HTMLElement | null>;
    type?: "zoom-in" | "zoom-out";
}

export function TextPressure({
    text,
    className = "",
    containerRef,
    type = "zoom-out"
}: TextPressureProps) {
    const internalRef = useRef<HTMLDivElement>(null);
    const targetRef = containerRef || internalRef;

    const [mouseX, setMouseX] = useState(0.5);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const target = internalRef.current;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        setMouseX(Math.max(0, Math.min(1, x)));
    }, []);

    useEffect(() => {
        const container = internalRef.current;
        if (!container) return;

        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // ズーム効果の切り替え
    const rawScale = useTransform(
        scrollYProgress,
        [0, 0.8],
        type === "zoom-out" ? [8, 1] : [1, 20]
    );
    const scale = useSpring(rawScale, { stiffness: 50, damping: 20 });

    // 透明度の調整（ズームアウトは現れる、ズームインは消えていく）
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        type === "zoom-out" ? [0, 1, 1, 1] : [1, 1, 0.2, 0]
    );

    return (
        <motion.div
            ref={internalRef}
            className={`relative w-full h-full flex flex-col justify-center items-center py-24 ${className}`}
            style={{
                scale,
                opacity,
                maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
            }}
        >
            <div className="flex justify-center items-center w-full px-4">
                {text.split("").map((char, i) => {
                    const charPosition = i / (text.length - 1);
                    const distFromMouse = Math.abs(charPosition - mouseX);
                    const pressure = Math.max(0, 1 - distFromMouse * 3);

                    return (
                        <motion.span
                            key={i}
                            className="inline-block text-[12vw] font-black tracking-tighter"
                            style={{
                                WebkitTextStroke: `${1 + pressure * 1}px var(--foreground)`,
                                color: "transparent",
                                transform: `scaleY(${1 + pressure * 0.1})`,
                                transition: "transform 0.15s ease-out",
                                willChange: "transform",
                            }}
                        >
                            {char}
                        </motion.span>
                    );
                })}
            </div>

            {/* 装飾的なテキストや効果を追加可能 */}
        </motion.div>
    );
}
