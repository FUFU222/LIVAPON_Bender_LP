"use client";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { WaterRipple } from "../canvas/WaterRipple";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SplitText } from "../ui/SplitText";
import { ShinyText } from "../ui/ShinyText";
import RotatingText from "../ui/RotatingText";
import BlurText from "../ui/BlurText";
import { CTAForm } from "../forms/CTAForm";
import { DividerSection } from "../sections/DividerSection";
import { CommonRecognitionSection } from "./variant-a/sections/CommonRecognitionSection";
import { IntroProblemsSection } from "./variant-a/sections/IntroProblemsSection";
import { SupportSection } from "./variant-a/sections/SupportSection";
import {
    heroCopy,
    introItems,
    supportFeatures,
    supportNotes,
    officialSponsor,
    liveHighlights,
    entryNotes,
} from "./content";

export function VariantA() {
    const [openFaqId, setOpenFaqId] = useState<number | null>(null);

    const FaqItem = ({ item }: { item: { id: number; question: string; answer: string } }) => {
        const isOpen = openFaqId === item.id;
        const contentRef = useRef<HTMLDivElement>(null);
        const [maxHeight, setMaxHeight] = useState("0px");

        useEffect(() => {
            const el = contentRef.current;
            if (!el) return;
            if (isOpen) {
                setMaxHeight(`${el.scrollHeight}px`);
            } else {
                setMaxHeight("0px");
            }
        }, [isOpen, item.answer]);

        return (
            <div className="rounded-2xl border border-gray-light/60 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <button
                    type="button"
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenFaqId((prev) => (prev === item.id ? null : item.id))}
                >
                    <div className="flex items-center gap-4 min-h-[28px]">
                        <span className="text-sm font-semibold tracking-[0.3em] text-gray-dark">
                            Q
                        </span>
                        <span className="text-base text-foreground">
                            {item.question}
                        </span>
                    </div>
                    <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-light/60 text-gray-dark transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </span>
                </button>
                <div
                    className="border-t border-gray-light/60 overflow-hidden"
                    style={{
                        maxHeight,
                        opacity: isOpen ? 1 : 0,
                        transition: isOpen
                            ? "max-height 520ms cubic-bezier(0.22,1,0.36,1) 0ms, opacity 360ms ease 0ms"
                            : "max-height 620ms cubic-bezier(0.22,1,0.36,1) 0ms, opacity 240ms ease 120ms",
                    }}
                >
                    <div ref={contentRef} className="px-6 pt-4 pb-5">
                        <span className="text-sm font-semibold tracking-[0.3em] text-accent">
                            A
                        </span>
                        <div className="mt-2 text-sm text-gray-dark min-h-[28px]">
                            {item.answer}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const freeBadgeVariant: "premium" | "stamp" | "chip" = "stamp";
    const faqRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: faqProgress } = useScroll({
        target: faqRef,
        offset: ["start start", "end end"],
    });
    const faqPanelY = useTransform(faqProgress, [0, 0.3, 1], ["110%", "0%", "0%"]);
    const faqItems = Array.from({ length: 7 }, (_, index) => ({
        id: index + 1,
        question: "",
        answer: "",
    }));

    const renderFreeBadge = (variant: "premium" | "stamp" | "chip") => {
        switch (variant) {
            case "stamp":
                return (
                    <span className="-rotate-2 inline-flex items-center rounded-lg border-2 border-accent/70 bg-white px-3 py-1 text-sm font-semibold tracking-[0.12em] text-accent shadow-[0_10px_20px_rgba(193,39,45,0.18)] whitespace-nowrap leading-none">
                        無料
                    </span>
                );
            case "chip":
                return (
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold tracking-[0.18em] text-white shadow-[0_10px_20px_rgba(15,23,42,0.25)]">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M12 3l2.6 5.3L20 9l-4 3.9.9 5.6L12 15.7 7.1 18.5 8 12.9 4 9l5.4-.7L12 3z" />
                        </svg>
                        参加無料
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center rounded-full border border-amber-300/60 bg-gradient-to-r from-amber-50 via-white to-amber-100 px-4 py-1.5 text-sm font-semibold tracking-[0.25em] text-amber-700 shadow-[0_8px_20px_rgba(191,141,57,0.18)]">
                        無料
                    </span>
                );
        }
    };

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
        <div className="bg-white text-foreground">
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
                <div className="absolute inset-0">
                    <video
                        className="h-full w-full object-cover brightness-50"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster="/livapon_symbol_new.png"
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

            <IntroProblemsSection items={introItems} />

            <CommonRecognitionSection />

            <SupportSection features={supportFeatures} notes={supportNotes} />

            <section className="relative py-[20vh] bg-white">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <BlurText
                        text="すでに舞台は用意されています"
                        delay={40}
                        animateBy="letters"
                        direction="top"
                        className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-center justify-center w-full"
                    />
                </div>
            </section>

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
                                    {officialSponsor.badge}
                                </span>
                                <h2 className="mt-4 text-3xl md:text-5xl font-bold">
                                    {officialSponsor.title}
                                </h2>
                                <p className="mt-5 text-lg md:text-2xl font-medium text-white/90">
                                    {officialSponsor.lead}
                                </p>
                                <ul className="mt-6 space-y-3 text-base md:text-lg text-white/85">
                                    {officialSponsor.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-start gap-3">
                                            <span className="mt-2 h-2 w-2 rounded-full bg-white/80" />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="#contact"
                                    onClick={handleContactClick}
                                    className="mt-8 inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-2 text-sm md:text-base font-semibold text-white/95 backdrop-blur-sm transition hover:bg-white/10"
                                >
                                    {officialSponsor.cta}
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
                                    {officialSponsor.logoCaption}
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <section className="relative py-24 md:py-32 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto px-6">
                    <ScrollReveal delay={0} y={24}>
                        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] items-center gap-6 mb-12">
                            <div className="text-center md:text-right">
                                <span className="text-5xl md:text-7xl font-light tracking-tighter text-gray-dark">
                                    Deliver
                                </span>
                            </div>
                            <div className="text-center md:text-left flex justify-center md:justify-start">
                                <RotatingText
                                    texts={["LIVE", "NIPPON"]}
                                    mainClassName="text-6xl md:text-8xl font-black tracking-tighter text-accent overflow-hidden py-2 px-2"
                                    staggerFrom="last"
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: "-120%", opacity: 0 }}
                                    staggerDuration={0.02}
                                    rotationInterval={3000}
                                    animatePresenceMode="popLayout"
                                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                                />
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3} y={20}>
                        <p className="text-lg md:text-xl text-gray-dark max-w-3xl mx-auto text-center leading-relaxed mb-12">
                            ライブの熱量だけが、静かな世界を動かす。
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {liveHighlights.map((item, index) => (
                            <ScrollReveal key={item.title} delay={0.2 + index * 0.08} y={24}>
                                <div className="rounded-3xl border border-gray-light/60 p-7 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.14)]">
                                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                    <p className="text-gray-dark leading-relaxed">{item.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <DividerSection className="bg-gradient-to-b from-white via-white to-gray-light/50">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-16 right-6 h-56 w-56 rounded-full bg-accent/10 blur-[90px]" />
                    <div className="absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-[#f6dede] blur-[110px]" />
                </div>
                <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-transparent">
                        <Image
                            src="/livapon-webinar.png"
                            alt="オンライン合同説明会のイメージ"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                            <span className="inline-flex items-center gap-3">
                                {renderFreeBadge(freeBadgeVariant)}
                                <span className="whitespace-nowrap">越境EC「LIVAPON」</span>
                            </span>
                            <span className="md:block">オンライン合同説明会</span>
                        </h2>
                        <p className="mt-6 text-lg text-gray-dark leading-relaxed">
                            Made in Japanを世界へ。海外販売の仕組みやライブコマース戦略を解説します。初心者の方も大歓迎です。
                        </p>
                        <div className="mt-8 text-base md:text-lg font-semibold text-gray-900">
                            <span className="text-gray-500 font-medium">開催日時：</span>
                            毎週水曜日 17:00〜18:00
                        </div>
                        <a
                            href="https://peatix.com/group/16512658/events"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5"
                        >
                            詳細・申し込みはこちら
                        </a>
                    </div>
                </div>
            </DividerSection>

            <section ref={faqRef} className="relative h-[140vh]">
                <div className="sticky top-0 h-screen overflow-hidden z-30">
                    <motion.section
                        style={{ y: faqPanelY }}
                        className="relative z-20 h-screen bg-white shadow-[0_-20px_60px_rgba(0,0,0,0.08)]"
                    >
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-x-10 top-10 h-px bg-black/10" />
                            <div className="absolute inset-x-10 bottom-10 h-px bg-black/10" />
                        </div>
                        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
                            <ScrollReveal delay={0} y={20}>
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl md:text-5xl font-bold">
                                        よくあるご質問
                                    </h2>
                                </div>
                            </ScrollReveal>
                            <div className="max-w-4xl mx-auto space-y-4">
                                {faqItems.map((item) => (
                                    <FaqItem key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    </motion.section>
                </div>
            </section>

            <section id="contact" className="relative py-24 md:py-32 bg-white overflow-hidden">
                <div className="absolute inset-0 pointer-events-auto">
                    <WaterRipple baseOpacity={0.1} />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <ScrollReveal delay={0} y={0} duration={1}>
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-5">
                                お問い合わせ
                            </h2>
                            <p className="text-lg text-gray-dark leading-relaxed">
                                導入・提携に関するご相談はこちらから
                            </p>
                        </div>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {entryNotes.map((note, index) => (
                            <ScrollReveal
                                key={note}
                                delay={0.1 + index * 0.08}
                                y={0}
                                duration={0.9}
                            >
                                <div className="rounded-2xl bg-white/90 border border-gray-light/60 px-5 py-4 text-sm text-gray-dark text-center shadow-[0_16px_50px_rgba(0,0,0,0.12)]">
                                    {note}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                    <CTAForm />
                </div>
            </section>
        </div>
    );
}
