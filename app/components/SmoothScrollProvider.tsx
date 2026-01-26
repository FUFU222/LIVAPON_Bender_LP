"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

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

        lenis.on("scroll", ScrollTrigger.update);

        const tick = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        ScrollTrigger.refresh();

        // Add lenis class to html
        document.documentElement.classList.add("lenis", "lenis-smooth");

        return () => {
            gsap.ticker.remove(tick);
            lenis.off("scroll", ScrollTrigger.update);
            lenis.destroy();
            document.documentElement.classList.remove("lenis", "lenis-smooth");
            if ((window as { lenis?: Lenis }).lenis === lenis) {
                delete (window as { lenis?: Lenis }).lenis;
            }
        };
    }, []);

    return <>{children}</>;
}
