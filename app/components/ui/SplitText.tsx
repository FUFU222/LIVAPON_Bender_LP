"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
    children: string;
    className?: string;
    delay?: number;
}

export function SplitText({ children, className = "", delay = 0 }: SplitTextProps) {
    const chars = children.split("");

    return (
        <span className={`inline-block ${className}`}>
            {chars.map((char, i) => (
                <motion.span
                    key={`${char}-${i}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: delay + i * 0.03,
                        ease: [0.215, 0.61, 0.355, 1],
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}
