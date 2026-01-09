"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

interface ZAxisScrollProps {
    children: React.ReactNode;
    className?: string;
}

export function ZAxisScroll({ children, className = "" }: ZAxisScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // 絶妙な調整：
    // ブラーの開始・終了を強め(12px)にし、クリアな期間を中央の40%に絞る(0.3-0.7)ことで、
    // 「ピントが合う」感覚を強調する。
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const z = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-50, 0, 0, -50]);
    const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [12, 0, 0, 12]);
    const filter = useMotionTemplate`blur(${blur}px)`;

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <motion.div
                style={{
                    scale,
                    opacity,
                    z,
                    filter,
                }}
                className="transform-gpu"
            >
                {children}
            </motion.div>
        </div>
    );
}
