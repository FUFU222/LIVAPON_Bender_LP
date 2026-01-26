"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { ScrollReveal } from "../../ui/ScrollReveal";

type OfficialSponsor = {
    badge: string;
    title: string;
    lead: string;
    bullets: string[];
    cta: string;
    logoCaption: string;
};

interface OfficialSponsorSectionProps {
    sponsor: OfficialSponsor;
    onContactClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function OfficialSponsorSection({ sponsor, onContactClick }: OfficialSponsorSectionProps) {
    return (
        <section className="relative py-24 md:py-32 bg-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0">
                    <Image
                        src="/japan-festival-canada-bg.png"
                        alt="Japan Festival CANADA 会場背景"
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
                <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2 bg-white" />
                <div className="absolute -top-20 left-6 h-52 w-52 rounded-full bg-accent/10 blur-[90px]" />
                <div className="absolute -bottom-16 right-6 h-60 w-60 rounded-full bg-[#f6e2e4] blur-[110px]" />
                <div className="absolute inset-x-10 top-10 h-px bg-black/10" />
                <div className="absolute inset-x-10 bottom-10 h-px bg-black/10" />
            </div>
            <div className="relative max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
                    <ScrollReveal delay={0} y={20}>
                        <div className="relative z-10 text-white">
                            <span className="inline-flex items-center rounded-full bg-[#c7a04a] px-3 py-1 text-[10px] md:text-xs font-semibold tracking-[0.3em] text-white shadow-[0_10px_25px_rgba(199,160,74,0.35)]">
                                {sponsor.badge}
                            </span>
                            <h2 className="mt-4 text-3xl md:text-5xl font-bold">
                                {sponsor.title}
                            </h2>
                            <p className="mt-5 text-lg md:text-2xl font-medium text-white/90">
                                {sponsor.lead}
                            </p>
                            <ul className="mt-6 space-y-3 text-base md:text-lg text-white/85">
                                {sponsor.bullets.map((bullet) => (
                                    <li key={bullet} className="flex items-start gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-white/80" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="#contact"
                                onClick={onContactClick}
                                className="mt-8 inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-2 text-sm md:text-base font-semibold text-white/95 backdrop-blur-sm transition hover:bg-white/10"
                            >
                                {sponsor.cta}
                            </a>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1} y={20}>
                        <div className="flex flex-col items-center">
                            <div className="relative h-[300px] w-[300px] md:h-[420px] md:w-[420px] lg:h-[520px] lg:w-[520px]">
                                <Image
                                    src="/japan-festival-canada-logo.png"
                                    alt="Japan Festival CANADA 公式ロゴ"
                                    fill
                                    sizes="(max-width: 1024px) 80vw, 45vw"
                                    className="object-contain mix-blend-multiply scale-[1.12] md:scale-[1.25] lg:scale-[1.35] origin-center"
                                />
                            </div>
                            <p className="mt-3 text-xs md:text-sm tracking-[0.2em] text-gray-dark">
                                {sponsor.logoCaption}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
