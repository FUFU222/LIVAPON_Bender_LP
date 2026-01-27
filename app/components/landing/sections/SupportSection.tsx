"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "../../ui/ScrollReveal";
import { Container } from "../../ui/Container";

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
        <section className="relative z-10 py-24 md:py-32 bg-gradient-to-b from-white via-white to-[#fbf2f2] md:-mt-[35vh]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 right-8 h-52 w-52 rounded-full bg-accent/10 blur-[90px]" />
                <div className="absolute left-10 bottom-10 h-px w-[70%] bg-black/10" />
            </div>
            <Container size="6xl" className="relative">
                <ScrollReveal delay={0} y={20}>
                    <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
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
                    <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 auto-rows-[140px] md:auto-rows-[160px] gap-4 md:gap-5">
                        <div className="col-span-2 sm:col-span-4 lg:col-span-3 row-span-2 rounded-3xl border border-gray-light/60 bg-white p-6 md:p-7 shadow-[0_18px_50px_rgba(0,0,0,0.1)] flex flex-col justify-between">
                            <div className="text-xs font-semibold tracking-[0.3em] text-gray-dark/60">core</div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                                    国内配送の感覚で扱える
                                </h3>
                                <p className="mt-3 text-sm md:text-base text-gray-dark leading-relaxed">
                                    越境可能商品であれば、国内配送と同じ業務感覚で扱えます。
                                    海外向けでも判断軸やフローは増やしません。
                                </p>
                            </div>
                        </div>

                        <div className="col-span-2 sm:col-span-2 lg:col-span-2 row-span-2 rounded-3xl border border-gray-light/60 bg-white/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)] flex items-center justify-center">
                            <div className="text-xs font-semibold tracking-[0.4em] text-gray-dark/60">icon</div>
                        </div>

                        <div className="col-span-1 sm:col-span-2 lg:col-span-1 rounded-2xl border border-gray-light/60 bg-white p-4 md:p-5 shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
                            <div className="mb-3 h-8 w-8 rounded-full border border-gray-light/60 text-[10px] text-gray-dark/60 flex items-center justify-center">
                                icon
                            </div>
                            <h4 className="text-sm md:text-base font-semibold text-foreground">発送フロー構築不要</h4>
                            <p className="mt-2 text-xs md:text-sm text-gray-dark">
                                越境ECの発送設計は不要。
                            </p>
                        </div>

                        <div className="col-span-1 sm:col-span-2 lg:col-span-1 rounded-2xl border border-gray-light/60 bg-white p-4 md:p-5 shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
                            <div className="mb-3 h-8 w-8 rounded-full border border-gray-light/60 text-[10px] text-gray-dark/60 flex items-center justify-center">
                                icon
                            </div>
                            <h4 className="text-sm md:text-base font-semibold text-foreground">国別の出品可否を事前確認</h4>
                            <p className="mt-2 text-xs md:text-sm text-gray-dark">
                                販売後のストップを回避。
                            </p>
                        </div>

                        <div className="col-span-2 sm:col-span-2 lg:col-span-2 rounded-3xl border border-gray-light/60 bg-white p-5 md:p-6 shadow-[0_16px_45px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                            <div className="text-xs font-semibold tracking-[0.25em] text-gray-dark/60">start</div>
                            <div>
                                <h4 className="text-base md:text-lg font-semibold text-foreground">登録だけで海外販売開始</h4>
                                <p className="mt-2 text-sm text-gray-dark">
                                    商品登録のみで海外販売がスタート。
                                </p>
                            </div>
                        </div>

                        <div className="col-span-1 rounded-2xl border border-gray-light/60 bg-white p-4 shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                            <h4 className="text-sm font-semibold text-foreground">初期費用なし</h4>
                            <p className="mt-2 text-xs text-gray-dark">コストゼロで試せる</p>
                        </div>

                        <div className="col-span-1 rounded-2xl border border-gray-light/60 bg-white p-4 shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                            <h4 className="text-sm font-semibold text-foreground">ライブ不要</h4>
                            <p className="mt-2 text-xs text-gray-dark">EC掲載のみでOK</p>
                        </div>

                        <div className="col-span-1 rounded-2xl border border-gray-light/60 bg-white p-4 shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                            <h4 className="text-sm font-semibold text-foreground">専門知識不要</h4>
                            <p className="mt-2 text-xs text-gray-dark">越境ECの知識不要</p>
                        </div>

                        <div className="col-span-1 rounded-2xl border border-gray-light/60 bg-white p-4 shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                            <div className="mb-3 h-8 w-8 rounded-full border border-gray-light/60 text-[10px] text-gray-dark/60 flex items-center justify-center">
                                icon
                            </div>
                            <h4 className="text-sm font-semibold text-foreground">禁制品・規制品チェック</h4>
                        </div>

                        <div className="col-span-1 rounded-2xl border border-gray-light/60 bg-white p-4 shadow-[0_12px_36px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                            <div className="mb-2 h-8 w-8 rounded-full border border-gray-light/60 text-[10px] text-gray-dark/60 flex items-center justify-center">
                                icon
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-accent leading-none">228</div>
                                <p className="mt-1 text-xs text-gray-dark">の国と地域へ配送</p>
                            </div>
                        </div>

                        <div className="col-span-2 sm:col-span-2 lg:col-span-2 rounded-3xl border border-gray-light/60 bg-white p-5 md:p-6 shadow-[0_16px_45px_rgba(0,0,0,0.08)]">
                            <h4 className="text-base md:text-lg font-semibold text-foreground">本格展開前に反応確認</h4>
                            <p className="mt-2 text-sm text-gray-dark">
                                いきなり海外展開を背負わずに検証できます。
                            </p>
                        </div>

                        <div className="col-span-2 sm:col-span-2 lg:col-span-2 rounded-3xl border border-gray-light/60 bg-white p-5 md:p-6 shadow-[0_16px_45px_rgba(0,0,0,0.08)]">
                            <h4 className="text-base md:text-lg font-semibold text-foreground">少量からテスト可能</h4>
                            <p className="mt-2 text-sm text-gray-dark">
                                在庫・ブランドのリスクを抑えられます。
                            </p>
                        </div>

                        <div className="col-span-2 sm:col-span-2 lg:col-span-2 rounded-3xl border border-gray-light/60 bg-white p-5 md:p-6 shadow-[0_16px_45px_rgba(0,0,0,0.08)]">
                            <div className="mb-3 h-8 w-8 rounded-full border border-gray-light/60 text-[10px] text-gray-dark/60 flex items-center justify-center">
                                icon
                            </div>
                            <h4 className="text-base md:text-lg font-semibold text-foreground">
                                日本に関心のある海外ユーザーが既に存在
                            </h4>
                            <p className="mt-2 text-sm text-gray-dark">
                                集客をゼロから設計する必要はありません。
                            </p>
                            <a
                                href="https://www.instagram.com/livapon_japan/"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-flex items-center text-sm font-semibold text-accent underline decoration-accent/40 decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
                            >
                                instagram
                            </a>
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
        </section>
    );
}
