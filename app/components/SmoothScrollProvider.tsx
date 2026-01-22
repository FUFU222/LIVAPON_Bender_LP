"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;
        // Expose for programmatic scroll triggers (e.g., CTA to contact section).
        (window as { lenis?: Lenis }).lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Add lenis class to html
        document.documentElement.classList.add("lenis", "lenis-smooth");

        return () => {
            lenis.destroy();
            document.documentElement.classList.remove("lenis", "lenis-smooth");
            if ((window as { lenis?: Lenis }).lenis === lenis) {
                delete (window as { lenis?: Lenis }).lenis;
            }
        };
    }, []);

    return <>{children}</>;
}
