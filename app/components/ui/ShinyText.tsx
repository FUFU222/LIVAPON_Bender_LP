"use client";

import { motion } from "framer-motion";

interface ShinyTextProps {
    children: React.ReactNode;
    className?: string;
}

export function ShinyText({ children, className = "" }: ShinyTextProps) {
    return (
        <motion.span
            className={`relative inline-block ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <span className="relative z-10 bg-gradient-to-r from-gray-dark via-gray-light to-gray-dark bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]">
                {children}
            </span>
            <style jsx>{`
        @keyframes shimmer {
          0%, 100% { background-position: 200% center; }
          50% { background-position: 0% center; }
        }
      `}</style>
        </motion.span>
    );
}
