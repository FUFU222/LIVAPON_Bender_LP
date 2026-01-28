"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "../../ui/ScrollReveal";
import { CountUp } from "../../ui/CountUp";
import { Container } from "../../ui/Container";
import { Package, Globe, ShoppingCart, Check } from "@deemlol/next-icons";

type SupportFeature = {
    title: string;
    description: string;
};

type SupportNotes = {
    heading: string;
    description: string;
    fact: string;
    note: {
        emphasis: string;
        detail?: string;
    }[];
};

interface SupportSectionProps {
    features: SupportFeature[];
    notes: SupportNotes;
}

const supportImages = ["/feature01.png", "/feature02.png", "/feature03.png"];

const CurtainReveal = ({
    children,
    className = "",
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`.trim()}>
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 z-10 bg-accent"
                initial={{ scaleX: 1 }}
                animate={isInView ? { scaleX: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1], delay }}
                style={{ transformOrigin: "100% 50%" }}
            />
            <motion.div
                className="relative z-0"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: delay + 0.15 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

const renderSupportLead = (text: string) => {
    const parts = text.split("伝わる");
    if (parts.length === 1) return text;
    return (
        <>
            {parts.map((part, index) => (
                <span key={`${part}-${index}`}>
                    {part}
                    {index < parts.length - 1 && <span className="font-semibold">伝わる</span>}
                </span>
            ))}
        </>
    );
};

const renderSupportDescription = (description: string) => {
    if (description.includes("購入者情報を")) {
        const [before, after] = description.split("購入者情報を");
        return (
            <>
                {before}購入者情報を<span className="md:hidden"><br /></span>{after}
            </>
        );
    }
    return description;
};

export function SupportSection({ features, notes }: SupportSectionProps) {
    return (
        <section className="relative z-10 py-16 md:py-20 bg-gradient-to-b from-white via-white to-[#fbf2f2] md:-mt-[28vh]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 right-8 h-52 w-52 rounded-full bg-accent/10 blur-[90px]" />
                <div className="absolute left-10 bottom-10 h-px w-[70%] bg-black/10" />
            </div>
            <Container size="6xl" className="relative">
                <ScrollReveal delay={0} y={20}>
                    <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 whitespace-pre-line sm:whitespace-normal">
                            {notes.heading}
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-dark leading-relaxed">
                            {renderSupportLead(notes.description)}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="mt-12 space-y-6">
                    {features.map((item, index) => (
                        <div key={item.title} className="relative w-full lg:max-w-[1400px] lg:mx-auto">
                            <div className="relative overflow-hidden border border-gray-light/60 bg-white h-[360px] md:h-[520px] lg:h-[600px]">
                                <Image
                                    src={supportImages[index % supportImages.length]}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 100vw"
                                    className={`object-cover scale-[1.08] ${
                                        index % 2 === 1 ? "object-left" : "object-right"
                                    }`}
                                    priority={index === 0}
                                />
                                <div
                                    className={`absolute inset-0 ${
                                        index % 2 === 1
                                            ? "bg-gradient-to-l from-black/45 via-black/15 to-transparent"
                                            : "bg-gradient-to-r from-black/45 via-black/15 to-transparent"
                                    }`}
                                />
                                <div className="absolute inset-0">
                                    <Container
                                        size="6xl"
                                        className={`h-full flex items-center ${
                                            index % 2 === 1 ? "justify-end" : "justify-start"
                                        } lg:pt-[250px]`}
                                    >
                                        <div className="max-w-3xl space-y-2">
                                            <CurtainReveal delay={0.08 + index * 0.08} className="inline-block align-top">
                                                <h3 className="bg-white px-3 py-2 md:px-4 md:py-2.5 text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight text-accent leading-tight shadow-[0_10px_24px_rgba(0,0,0,0.1)] max-w-[85vw] md:max-w-none whitespace-normal md:whitespace-nowrap">
                                                    {item.title}
                                                </h3>
                                            </CurtainReveal>
                                            <CurtainReveal delay={0.18 + index * 0.08} className="inline-block align-top">
                                                <p className="bg-white px-3 py-1 md:px-3.5 md:py-1.5 text-sm md:text-xl text-accent/85 leading-snug shadow-[0_8px_20px_rgba(0,0,0,0.08)] max-w-[85vw] md:max-w-none break-words">
                                                    {renderSupportDescription(item.description)}
                                                </p>
                                            </CurtainReveal>
                                        </div>
                                    </Container>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <ScrollReveal delay={0.05} y={20}>
                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 auto-rows-[minmax(120px,auto)] md:auto-rows-[minmax(140px,auto)] lg:auto-rows-[minmax(80px,1fr)] gap-4 md:gap-5 lg:gap-4">
                        <div className="col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-6 lg:row-span-2 lg:col-start-4 lg:row-start-1 rounded-[28px] border border-gray-light/60 bg-white shadow-[0_22px_60px_rgba(0,0,0,0.12)] overflow-hidden relative min-h-[220px] md:min-h-[260px] lg:min-h-0">
                            <Image
                                src="/Bento-delivery.png"
                                alt="国内配送の感覚で扱える"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/55" />
                            <div className="relative z-10 h-full p-7 md:p-8 text-center">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.65)] tracking-[0.04em]">
                                        国内配送感覚
                                    </h3>
                                </div>
                                <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full px-6">
                                    <p className="text-xs md:text-sm font-light text-white/90 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)] max-w-md mx-auto">
                                        越境可能商品であれば、国内配送と同じ感覚で扱えます。
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-3 lg:row-span-1 lg:col-start-1 lg:row-start-1 rounded-[28px] border border-gray-light/60 bg-white p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col justify-center relative overflow-hidden lg:min-h-0">
                            <div className="relative text-center">
                                <div className="inline-flex flex-col items-center text-base md:text-lg font-semibold text-gray-dark">
                                    <p className="leading-none">初期費用＆手数料</p>
                                </div>
                                <div className="mt-2 inline-flex items-baseline gap-1 text-accent leading-none">
                                    <span className="text-[64px] md:text-[88px] lg:text-[104px] font-black tracking-tight">
                                        0
                                    </span>
                                    <span className="text-[28px] md:text-[36px] lg:text-[42px] font-bold tracking-tight">
                                        円
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 sm:col-span-2 lg:col-span-3 lg:row-span-2 lg:col-start-10 lg:row-start-1 rounded-[24px] border border-gray-light/60 shadow-[0_16px_45px_rgba(0,0,0,0.08)] overflow-hidden relative min-h-[170px] md:min-h-[200px] lg:min-h-0 flex flex-col justify-end p-5 md:p-6">
                            <Image
                                src="/Bento-228.png"
                                alt="228の国と地域へ配送"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/60" />
                            <div className="relative z-10 h-full">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <CountUp
                                        from={100}
                                        to={228}
                                        duration={1.6}
                                        animation="tween"
                                        ease="easeIn"
                                        className="text-[96px] md:text-[140px] font-black text-white leading-none tracking-tight drop-shadow-[0_10px_24px_rgba(0,0,0,0.6)]"
                                    />
                                </div>
                                <div className="absolute bottom-[10px] md:bottom-[8px] left-1/2 -translate-x-1/2 translate-y-[2px]">
                                    <p className="text-xs md:text-sm font-semibold text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]">
                                        の国と地域へ
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-3 lg:row-span-1 lg:col-start-1 lg:row-start-2 rounded-[24px] border border-gray-light/60 bg-white p-5 md:p-6 shadow-[0_16px_45px_rgba(0,0,0,0.08)] relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.04),rgba(193,39,45,0.08))]" />
                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gray-100/80" />
                            <div className="absolute left-5 top-4 text-[56px] md:text-[64px] font-black tracking-tight text-gray-200/80">
                                EC
                            </div>
                            <div className="relative z-10 w-full text-center flex flex-col items-center">
                                <div className="mb-4 inline-flex w-[40%] max-w-[120px] min-w-[72px] aspect-square items-center justify-center rounded-full border border-gray-light/60 bg-white/90 shadow-[0_10px_20px_rgba(0,0,0,0.08)] mx-auto relative">
                                    <ShoppingCart className="h-[56%] w-[56%] text-accent/80" />
                                    <span className="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white shadow-[0_6px_16px_rgba(188,0,45,0.35)]">
                                        <Check className="h-4 w-4" />
                                    </span>
                                </div>
                                <h4 className="text-base md:text-lg font-semibold text-foreground">EC掲載のみでも</h4>
                                <p className="mt-1 text-[28px] md:text-[36px] font-black text-accent leading-none tracking-tight">
                                    OK！
                                </p>
                            </div>
                        </div>

                        <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-3 lg:row-span-1 lg:col-start-1 lg:row-start-3 rounded-[24px] border border-gray-light/60 bg-white p-5 md:p-6 shadow-[0_16px_45px_rgba(0,0,0,0.08)] relative overflow-hidden flex items-center justify-center">
                            <Image
                                src="/Bento-country-check.png"
                                alt="国別の出品可否を事前確認"
                                fill
                                sizes="(max-width: 1024px) 100vw, 30vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/45" />
                            <div className="relative z-10 w-full text-center flex flex-col items-center">
                                <h4 className="text-base md:text-lg font-semibold text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.55)]">
                                    国別の出品可否を
                                    <br />
                                    事前確認
                                </h4>
                            </div>
                        </div>

                        <div className="col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-3 lg:row-span-1 lg:col-start-4 lg:row-start-3 rounded-[24px] border border-gray-light/60 bg-white p-5 md:p-6 shadow-[0_16px_45px_rgba(0,0,0,0.08)] relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.03),rgba(15,23,42,0.0))]" />
                            <div className="relative text-center w-full flex flex-col items-center">
                                <div className="mb-4 inline-flex w-[40%] max-w-[120px] min-w-[72px] aspect-square items-center justify-center rounded-full border border-gray-light/60 bg-white/90 shadow-[0_10px_20px_rgba(0,0,0,0.08)] mx-auto">
                                    <Package className="h-[60%] w-[60%] text-accent/80" />
                                </div>
                                <h4 className="text-base md:text-lg font-semibold text-foreground">
                                    少量ロットから
                                    <br />
                                    小さく始められる
                                </h4>
                            </div>
                        </div>

                        <div className="col-span-2 sm:col-span-2 lg:col-span-6 lg:row-span-1 lg:col-start-7 lg:row-start-3 rounded-[24px] border border-gray-light/60 bg-white p-5 md:p-6 shadow-[0_16px_45px_rgba(0,0,0,0.08)]">
                            <div className="mb-4 inline-flex w-[40%] max-w-[120px] min-w-[72px] aspect-square rounded-full border border-gray-light/60 items-center justify-center bg-white">
                                <Image
                                    src="/insta-logo.png"
                                    alt="Instagram"
                                    width={48}
                                    height={48}
                                    className="h-[60%] w-[60%]"
                                />
                            </div>
                            <h4 className="text-base md:text-lg font-semibold text-foreground">
                                日本に関心のある海外ユーザーが既に存在
                            </h4>
                            <a
                                href="https://www.instagram.com/livapon_japan/"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-flex items-center text-sm font-semibold text-accent underline decoration-accent/40 decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
                            >
                                instagramを見る
                            </a>
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
        </section>
    );
}
