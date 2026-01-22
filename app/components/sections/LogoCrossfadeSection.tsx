"use client";

import { useRef, ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface LogoCrossfadeSectionProps {
    children: ReactNode;
    heightVh?: number;
    className?: string;
}

export function LogoCrossfadeSection({
    children,
    heightVh = 200,
    className = "bg-white",
}: LogoCrossfadeSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const logoScale = useTransform(scrollYProgress, [0, 0.6, 1], [0.9, 1.5, 2.2]);
    const logoOpacity = useTransform(scrollYProgress, [0, 0.7, 0.88, 1], [1, 1, 0.1, 0]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.88, 0.95, 1], [0, 0, 0.6, 1]);
    const contentPointer = useTransform(
        scrollYProgress,
        [0, 0.9, 0.91, 1],
        ["none", "none", "auto", "auto"]
    );

    return (
        <section
            ref={containerRef}
            className={`relative ${className}`}
            style={{ height: `${heightVh}vh` }}
        >
            <div className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ scale: logoScale, opacity: logoOpacity }}
                    className="fixed inset-0 flex items-center justify-center pointer-events-none"
                >
                    <Image
                        src="/livapon_logo.png"
                        alt="LIVAPON"
                        width={720}
                        height={720}
                        className="w-[55vw] max-w-[520px] opacity-80"
                        priority
                    />
                </motion.div>
                <motion.div
                    style={{ opacity: contentOpacity, pointerEvents: contentPointer }}
                    className="relative w-full flex items-center justify-center"
                >
                    <div className="w-full">{children}</div>
                </motion.div>
            </div>
        </section>
    );
}
