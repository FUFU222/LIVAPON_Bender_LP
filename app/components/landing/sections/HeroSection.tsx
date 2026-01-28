"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { ScrollReveal } from "../../ui/ScrollReveal";
import { SplitText } from "../../ui/SplitText";
import { ShinyText } from "../../ui/ShinyText";
import { heroCopy } from "../content";

type HeroSectionProps = {
    onHeroReady: () => void;
    isHeroReady: boolean;
};

export function HeroSection({ onHeroReady, isHeroReady }: HeroSectionProps) {
    const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
        const target = document.getElementById("contact");
        if (!target) return;
        event.preventDefault();
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const lenis = (window as { lenis?: { scrollTo: (target: HTMLElement) => void } }).lenis;
        if (lenis?.scrollTo && !prefersReducedMotion) {
            lenis.scrollTo(target);
            return;
        }
        target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
        });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
            <div
                className={`hero-video-mask absolute inset-0 ${isHeroReady ? "hero-video-mask--ready" : ""}`}
            >
                <video
                    className="h-full w-full object-cover brightness-50"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedData={onHeroReady}
                    onCanPlay={onHeroReady}
                >
                    <source src="/FV_bg_movie.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(193,39,45,0.28),_transparent_60%)]" />
            <div className="absolute top-6 left-6 z-20">
                <Image
                    src="/images/livapon_logo_white.png"
                    alt="LIVAPON"
                    width={180}
                    height={48}
                    className="h-auto w-36 md:w-44"
                    priority
                />
            </div>

            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <ScrollReveal delay={0} y={18}>
                    <div className="mb-8 flex justify-center">
                        <ShinyText className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                            {heroCopy.label}
                        </ShinyText>
                    </div>
                </ScrollReveal>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.65)]">
                    <SplitText delay={0.2}>{heroCopy.titleLine1}</SplitText>
                    <br />
                    <SplitText delay={0.2 + 10 * 0.03}>{heroCopy.titleLine2}</SplitText>
                </h1>
                <ScrollReveal delay={0.9} y={24}>
                    <p className="mt-6 text-lg md:text-2xl font-serif font-semibold text-white/85 drop-shadow-[0_6px_18px_rgba(0,0,0,0.65)]">
                        {heroCopy.subtitle}
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={1.2} y={16}>
                    <div className="mt-10 flex justify-center">
                        <a
                            href="#contact"
                            onClick={handleContactClick}
                            className="group relative inline-flex items-center justify-center rounded-full bg-accent text-white px-8 py-3 text-base font-medium tracking-wide shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-all duration-300 overflow-hidden hover:shadow-[0_22px_50px_rgba(0,0,0,0.45)]"
                        >
                            <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-[350ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-x-100" />
                            <span className="relative z-10">{heroCopy.cta}</span>
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
