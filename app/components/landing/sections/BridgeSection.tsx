"use client";

import Image from "next/image";
import { ScrollReveal } from "../../ui/ScrollReveal";
import { Container } from "../../ui/Container";

export function BridgeSection() {
    return (
        <section className="relative py-20 md:py-28 bg-white">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-16 right-10 h-48 w-48 rounded-full bg-accent/10 blur-[90px]" />
                <div className="absolute -bottom-20 left-6 h-56 w-56 rounded-full bg-gray-light/70 blur-[110px]" />
            </div>
            <Container size="5xl" className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10">
                    <ScrollReveal delay={0} y={16}>
                        <div className="max-w-xl text-center lg:text-left">
                            <p className="text-lg md:text-xl text-gray-dark leading-relaxed">
                                <span className="block text-2xl md:text-3xl font-semibold text-gray-900">
                                    「いつか自分も…」と思った方へ。
                                </span>
                            </p>
                            <p className="mt-6 text-lg md:text-xl text-gray-dark leading-relaxed">
                                LIVAPONでは、
                                <br />
                                海外販売やライブコマースについて
                                <br />
                                基礎から整理できる説明会を行っています。
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1} y={16}>
                        <div className="mx-auto w-full max-w-sm">
                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gray-light/60 bg-gradient-to-b from-white via-white to-gray-light/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
                                <Image
                                    src="/bridge-image.png"
                                    alt="考える人物のイメージ"
                                    fill
                                    sizes="(max-width: 1024px) 90vw, 360px"
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/40" />
                                <div className="absolute -top-6 right-6 h-12 w-12 rounded-full border border-accent/30 bg-white/70 shadow-[0_8px_20px_rgba(188,0,45,0.15)]" />
                                <div className="absolute bottom-6 left-6 h-10 w-10 rounded-full border border-gray-light/60 bg-white/80 shadow-[0_6px_16px_rgba(0,0,0,0.08)]" />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
                <div className="mt-12 flex justify-center">
                    <div className="flex flex-col items-center gap-1 text-accent/80 drop-shadow-[0_6px_12px_rgba(188,0,45,0.35)]">
                        <span className="bridge-arrow" aria-hidden="true">
                            <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M6 8l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="bridge-arrow bridge-arrow--delay" aria-hidden="true">
                            <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M6 8l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>
            </Container>
        </section>
    );
}
