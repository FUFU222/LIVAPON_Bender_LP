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
                <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10">
                    <ScrollReveal delay={0} y={16}>
                        <div className="relative z-10 max-w-xl text-center lg:text-left md:mx-auto lg:mx-0">
                            <div className="flex justify-center lg:justify-end translate-x-[-14px] sm:translate-x-[-18px] md:translate-x-[-24px] lg:translate-x-0">
                                <div className="flex flex-row-reverse items-start gap-8 md:gap-12">
                                    <span className="relative inline-block align-top px-2 md:px-3 text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-[0.08em] text-white [writing-mode:vertical-rl] [text-orientation:mixed]">
                                        <span className="relative z-10">いつか自分も</span>
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 bg-accent -z-[1]"
                                        />
                                    </span>
                                    <span className="mt-20 text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-gray-900 leading-none tracking-[0.08em] [writing-mode:vertical-rl] [text-orientation:mixed]">
                                        と思った方へ
                                    </span>
                                </div>
                            </div>
                            <p className="mt-10 md:mt-12 text-lg md:text-xl text-gray-dark leading-relaxed font-semibold md:text-center">
                                LIVAPONでは、
                                <br className="sm:hidden" />
                                海外販売やライブコマースに関する
                                <br />
                                サービスの説明会を行っています。
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal
                        delay={0.1}
                        y={16}
                        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none lg:static lg:pointer-events-auto"
                    >
                        <div className="mx-auto w-[78vw] max-w-[360px] sm:max-w-[420px] md:w-[56vw] md:max-w-[460px] lg:w-full lg:max-w-md opacity-25 sm:opacity-35 md:opacity-45 lg:opacity-100 translate-x-[14px] sm:translate-x-[18px] md:translate-x-[26px] lg:translate-x-0">
                            <div className="relative aspect-[4/5] w-full">
                                <Image
                                    src="/bridge-image.png"
                                    alt="考える人物のイメージ"
                                    fill
                                    sizes="(max-width: 1024px) 90vw, 360px"
                                    className="object-contain"
                                    priority
                                />
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
