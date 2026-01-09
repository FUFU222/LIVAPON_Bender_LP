"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function DividerSection() {
    // 300vh分のスクロール領域を確保
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // 0.8倍からスタートし、最後は80倍まで拡大して「通り抜ける」
    const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.8, 2, 80]);

    // 透明度調整：最初は見えていて、通り抜けた後に消える
    const opacity = useTransform(scrollYProgress, [0, 0.8, 0.95, 1], [1, 1, 0, 0]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-white">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ scale, opacity }} className="relative z-10 w-[60vw] max-w-[600px]">
                    <Image
                        src="/livapon_logo.png"
                        alt="LIVAPON"
                        width={600}
                        height={600}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    );
}
