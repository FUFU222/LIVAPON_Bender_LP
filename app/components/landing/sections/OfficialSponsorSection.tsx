"use client";
import Image from "next/image";
import { ScrollReveal } from "../../ui/ScrollReveal";
import { Container } from "../../ui/Container";

type OfficialSponsor = {
    badge: string;
    title: string;
    lead: string;
};

interface OfficialSponsorSectionProps {
    sponsor: OfficialSponsor;
}

export function OfficialSponsorSection({ sponsor }: OfficialSponsorSectionProps) {
    return (
        <section className="relative bg-white overflow-hidden">
            <div className="relative mx-auto w-full max-w-[1400px] py-24 md:py-32">
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
                <Container size="6xl" className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
                        <ScrollReveal delay={0} y={20}>
                            <div className="relative z-10 text-white">
                                <span className="inline-flex items-center rounded-full bg-[#c7a04a] px-4 py-1.5 text-xs md:text-sm lg:text-base font-semibold tracking-[0.28em] text-white shadow-[0_12px_30px_rgba(199,160,74,0.4)]">
                                    {sponsor.badge}
                                </span>
                            <h2 className="mt-4 text-3xl md:text-5xl font-bold drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
                                {sponsor.title}
                            </h2>
                                <p className="mt-5 text-lg md:text-2xl font-medium text-white/90">
                                    {sponsor.lead}
                                </p>
                                <div className="mt-6 h-px w-20 bg-white/50" />
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.1} y={20}>
                            <div className="flex flex-col items-center">
                                <div className="rounded-3xl bg-white/95 border border-white/70 shadow-[0_18px_50px_rgba(0,0,0,0.12)] p-6 sm:p-8 md:p-10">
                                    <div className="relative h-[220px] w-[220px] md:h-[320px] md:w-[320px] lg:h-[400px] lg:w-[400px]">
                                        <Image
                                            src="/japan-festival-canada-logo.png"
                                            alt="Japan Festival CANADA 公式ロゴ"
                                            fill
                                            sizes="(max-width: 1024px) 80vw, 45vw"
                                            className="object-contain mix-blend-multiply scale-[1.0] md:scale-[1.08] lg:scale-[1.12] origin-center"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </Container>
            </div>
        </section>
    );
}
