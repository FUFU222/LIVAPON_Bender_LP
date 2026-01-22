"use client";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { WaterRipple } from "../canvas/WaterRipple";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SplitText } from "../ui/SplitText";
import { ShinyText } from "../ui/ShinyText";
import { CountUp } from "../ui/CountUp";
import RotatingText from "../ui/RotatingText";
import ScrollFloat from "../ui/ScrollFloat";
import BlurText from "../ui/BlurText";
import { CTAForm } from "../forms/CTAForm";
import { DividerSection } from "../sections/DividerSection";
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
    const renderSupportLead = (text: string) => {
        const parts = text.split("伝わる");
        if (parts.length === 1) return text;
        return (
            <>
                {parts.map((part, index) => (
                    <span key={`${part}-${index}`}>
                        {part}
                        {index < parts.length - 1 && (
                            <span className="font-semibold">伝わる</span>
                        )}
                    </span>
                ))}
            </>
        );
    };

    const introMobileLines = [
        [
            { text: "実は…", emphasis: false },
            { text: "多く", emphasis: true },
            { text: "の", emphasis: false },
        ],
        [
            { text: "ブランド", emphasis: true },
            { text: "や", emphasis: false },
        ],
        [
            { text: "メーカー", emphasis: true },
            { text: "が", emphasis: false },
        ],
        [
            { text: "同じところ", emphasis: true },
            { text: "で", emphasis: false },
        ],
        [
            { text: "つまずいて", emphasis: true },
            { text: "います", emphasis: false },
        ],
    ];

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
    const supportImages = [
        "/feature01.png",
        "/feature02.png",
        "/feature03.png",
    ];
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
    const underlineRef = useRef<HTMLDivElement>(null);
    const underlineInView = useInView(underlineRef, { once: true, margin: "-20% 0px" });
    const mobileUnderlineRef = useRef<HTMLDivElement>(null);
    const mobileUnderlineInView = useInView(mobileUnderlineRef, { once: true, margin: "-20% 0px" });


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

            <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-white to-[#fbf2f2]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
                    <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-[#f7dede] blur-[120px]" />
                    <div className="absolute inset-x-6 top-8 h-px bg-black/10" />
                    <div className="absolute inset-x-6 bottom-8 h-px bg-black/10" />
                    <div className="absolute left-8 top-8 h-2 w-2 rounded-full border border-black/20" />
                    <div className="absolute right-8 bottom-8 h-2 w-2 rounded-full border border-black/20" />
                </div>
                <div className="max-w-6xl mx-auto px-6">
                    <ScrollReveal delay={0} y={20}>
                        <div className="mb-10">
                            <h2 className="text-3xl md:text-5xl font-bold">
                                海外展開が伸び悩む
                                <br />
                                5つの理由
                            </h2>
                            <p className="mt-4 text-lg text-gray-dark max-w-xl">
                                こんなお悩みありませんか？
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1} y={20}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
                            {introItems.map((item, index) => {
                                const placement =
                                    index === 3
                                        ? "lg:col-start-2"
                                        : index === 4
                                            ? "lg:col-start-4"
                                            : "";
                                return (
                                    <div key={item.title} className={`lg:col-span-2 ${placement}`}>
                                        <div className="group relative rounded-3xl border border-gray-light/60 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] transform-gpu will-change-transform transition-transform duration-700 ease-out hover:-translate-y-1">
                                            <span className="pointer-events-none absolute inset-0 rounded-3xl shadow-[0_26px_70px_rgba(0,0,0,0.18)] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />
                                            <div className="relative rounded-3xl overflow-hidden">
                                                <span className="pointer-events-none absolute -bottom-2 left-10 h-4 w-4 rotate-45 bg-white border border-gray-light/60 shadow-sm" />
                                                <div className="absolute inset-0 p-5 md:p-6">
                                                    <div className="relative h-full w-full transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.02]">
                                                        <Image
                                                            src={`/problem-${index + 1}.png`}
                                                            alt={item.title}
                                                            fill
                                                            sizes="(max-width: 1024px) 100vw, 33vw"
                                                            className="object-cover object-top"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="relative z-10 flex h-full w-full items-end">
                                                    <div className="relative aspect-[16/9] w-full p-6 md:p-8 flex flex-col justify-end min-h-[230px] md:min-h-[260px]">
                                                        <p
                                                            className="absolute top-4 left-5 text-2xl md:text-3xl font-semibold tracking-[0.05em] text-white font-[var(--font-oswald)]"
                                                            style={{ WebkitTextStroke: "2px var(--accent)" }}
                                                        >
                                                            {String(index + 1).padStart(2, "0")}
                                                        </p>
                                                        <div className="pt-8 flex flex-col items-start gap-2">
                                                            <h3 className="text-[28px] md:text-[36px] font-semibold text-white bg-black/75 px-3 py-2 rounded-[8px] box-decoration-clone inline">
                                                                {item.title}
                                                            </h3>
                                                            <p className="text-[22px] md:text-[28px] font-semibold text-black/90 leading-relaxed bg-white/90 px-2 py-1 rounded-[8px] box-decoration-clone inline">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="relative min-h-[70vh] md:min-h-[140vh] bg-gradient-to-b from-white via-white to-[#fbf2f2] md:overflow-hidden flex items-center md:block">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#f8e7e8] blur-[100px]" />
                    <div className="absolute inset-x-10 top-10 h-px bg-black/10" />
                    <div className="absolute inset-x-10 bottom-10 h-px bg-black/10" />
                </div>
                <div className="relative max-w-5xl mx-auto px-6 w-full py-0 md:py-0 md:sticky md:top-1/2 md:-translate-y-1/2 text-left md:text-center">
                    <ScrollReveal delay={0} y={16}>
                        <div className="mt-4 md:mt-8">
                            <div className="md:hidden space-y-0 text-left">
                                {introMobileLines.map((line, lineIndex) => (
                                    <div
                                        key={`intro-line-${lineIndex}`}
                                        className={lineIndex === 0 ? "" : "-mt-1"}
                                    >
                                        <div
                                            ref={lineIndex === introMobileLines.length - 1 ? mobileUnderlineRef : undefined}
                                            className="relative w-fit"
                                        >
                                            <div className="flex flex-wrap items-baseline gap-x-1 pb-1">
                                                {line.map((segment, segmentIndex) => (
                                                    <ScrollFloat
                                                        key={`intro-seg-${lineIndex}-${segmentIndex}`}
                                                        as="span"
                                                        containerClassName="my-0 inline-flex relative z-10"
                                                        textClassName={`${
                                                            segment.emphasis
                                                                ? "text-[48px] font-semibold"
                                                                : "text-[40px] font-medium"
                                                        } leading-[1] tracking-tight text-foreground`}
                                                        animationDuration={1}
                                                        ease="back.inOut(2)"
                                                        scrollStart="center bottom+=50%"
                                                        scrollEnd="bottom bottom-=40%"
                                                        stagger={0.03}
                                                    >
                                                        {segment.text}
                                                    </ScrollFloat>
                                                ))}
                                            </div>
                                            {lineIndex === introMobileLines.length - 1 && (
                                                <motion.span
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute left-0 right-0 bottom-[0.4em] z-0 h-3 shadow-[0_6px_14px_rgba(188,0,45,0.18)]"
                                                    style={{
                                                        transformOrigin: "0% 50%",
                                                        scaleX: mobileUnderlineInView ? 1 : 0,
                                                        borderRadius: "4px",
                                                        background: "rgba(188,0,45,0.6)",
                                                    }}
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: mobileUnderlineInView ? 1 : 0 }}
                                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="hidden md:block">
                                <div className="flex flex-col items-center">
                                    <ScrollFloat
                                        containerClassName="my-0"
                                        textClassName="text-[48px] md:text-5xl lg:text-6xl font-semibold leading-[1.4] tracking-tight text-foreground whitespace-nowrap"
                                        animationDuration={1}
                                        ease="back.inOut(2)"
                                        scrollStart="center bottom+=50%"
                                        scrollEnd="bottom bottom-=40%"
                                        stagger={0.03}
                                    >
                                        {"実は…多くのブランドやメーカーが"}
                                    </ScrollFloat>
                                    <div ref={underlineRef} className="relative inline-block pt-2">
                                        <div className="flex items-baseline whitespace-nowrap">
                                            <ScrollFloat
                                                as="span"
                                                containerClassName="my-0 inline-flex"
                                                textClassName="text-[48px] md:text-5xl lg:text-6xl font-semibold leading-[1.4] tracking-tight text-foreground"
                                                animationDuration={1}
                                                ease="back.inOut(2)"
                                                scrollStart="center bottom+=50%"
                                                scrollEnd="bottom bottom-=40%"
                                                stagger={0.03}
                                            >
                                                {"同じところで"}
                                            </ScrollFloat>
                                            <div className="relative inline-flex">
                                                <ScrollFloat
                                                    as="span"
                                                    containerClassName="my-0 inline-flex"
                                                    textClassName="text-[48px] md:text-5xl lg:text-6xl font-semibold leading-[1.4] tracking-tight text-foreground"
                                                    animationDuration={1}
                                                    ease="back.inOut(2)"
                                                    scrollStart="center bottom+=50%"
                                                    scrollEnd="bottom bottom-=40%"
                                                    stagger={0.03}
                                                >
                                                    {"つまずいています"}
                                                </ScrollFloat>
                                                <motion.span
                                                    aria-hidden="true"
                                                    className="absolute left-0 right-0 bottom-[0.4em] h-3 shadow-[0_6px_14px_rgba(188,0,8,0.2)]"
                                                    style={{
                                                        transformOrigin: "0% 50%",
                                                        scaleX: underlineInView ? 1 : 0,
                                                        borderRadius: "4px",
                                                        background: "rgba(188,0.5,0.9)",
                                                    }}
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: underlineInView ? 1 : 0 }}
                                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-white to-[#fbf2f2]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-20 right-8 h-52 w-52 rounded-full bg-accent/10 blur-[90px]" />
                    <div className="absolute left-10 bottom-10 h-px w-[70%] bg-black/10" />
                </div>
                <div className="relative max-w-6xl mx-auto px-6">
                    <ScrollReveal delay={0} y={20}>
                        <div className="max-w-3xl">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                {supportNotes.heading}
                            </h2>
                            <p className="text-lg text-gray-dark leading-relaxed">
                                {renderSupportLead(supportNotes.description)}
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="mt-12 space-y-6">
                        {supportFeatures.map((item, index) => (
                            <div key={item.title} className="relative lg:w-screen lg:left-1/2 lg:-translate-x-1/2">
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
                                        <div className={`h-full max-w-6xl mx-auto px-6 flex items-center ${index % 2 === 1 ? "justify-end" : "justify-start"} lg:pt-[250px]`}>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <ScrollReveal delay={0.05} y={20}>
                        <div className="mt-12 text-center">
                            <CountUp
                                from={0}
                                to={228}
                                duration={0.5}
                                separator=","
                                className="text-[110px] md:text-[170px] lg:text-[220px] font-black text-accent block leading-none"
                            />
                            <p className="mt-2 text-lg md:text-2xl font-medium text-foreground">
                                の国と地域へ配送可能
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
                        <ScrollReveal delay={0.1} y={20}>
                            <div className="rounded-3xl border border-gray-light/60 bg-white p-7 md:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.1)]">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-xs tracking-[0.3em] uppercase text-gray-dark">
                                        FACT
                                    </p>
                                    <span className="text-[10px] font-semibold tracking-[0.25em] text-accent">
                                        LIVAPON INSIGHT
                                    </span>
                                </div>
                                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                                    {supportNotes.fact}
                                </p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2} y={20}>
                            <div className="rounded-3xl border border-gray-light/60 bg-gray-light/20 p-7 md:p-8">
                                <p className="text-sm md:text-base text-gray-dark leading-relaxed">
                                    {supportNotes.note}
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <section className="relative py-[20vh] bg-white">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <BlurText
                        text="すでに舞台は用意されています"
                        delay={40}
                        animateBy="letters"
                        direction="top"
                        className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground"
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
                        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 bg-white" />
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
