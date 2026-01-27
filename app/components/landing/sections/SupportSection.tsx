"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "../../ui/ScrollReveal";
import { CountUp } from "../../ui/CountUp";
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

const renderFactText = (text: string) => {
    const parts = text.split("Instagram");
    if (parts.length === 1) return text;
    return (
        <>
            {parts.map((part, index) => (
                <span key={`${part}-${index}`}>
                    {part}
                    {index < parts.length - 1 ? (
                        <a
                            href="https://www.instagram.com/livapon_japan/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 font-semibold text-accent underline decoration-accent/40 decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
                        >
                            <Image
                                src="/insta-logo.png"
                                alt="Instagram"
                                width={16}
                                height={16}
                                className="h-4 w-4"
                            />
                            Instagram
                        </a>
                    ) : null}
                </span>
            ))}
        </>
    );
};

const renderBadgeEmphasis = (text: string) => {
    const highlightOk = (line: string) => {
        const parts = line.split("OK");
        if (parts.length === 1) return line;
        return (
            <>
                {parts[0]}
                <span className="inline-block translate-y-[2px] px-0.5 text-xl md:text-2xl font-black leading-none align-baseline bg-gradient-to-r from-accent via-rose-400 to-amber-400 bg-clip-text text-transparent">
                    OK
                </span>
                {parts.slice(1).join("OK")}
            </>
        );
    };

    return (
        <>
            {text.split("\n").map((line, index) => (
                <span key={`${line}-${index}`} className="block whitespace-nowrap">
                    {highlightOk(line)}
                </span>
            ))}
        </>
    );
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
                        <div className="relative overflow-hidden rounded-3xl border border-gray-light/60 bg-white p-7 md:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.1)]">
                            <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-accent/10 blur-[60px]" />
                            <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-accent/70" />
                            <div className="mb-5" />
                            <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
                                {notes.fact.split("日本に関心を持つ海外ユーザーが集まっています。").map((part, index, arr) => (
                                    <span key={`${part}-${index}`}>
                                        {renderFactText(part)}
                                        {index < arr.length - 1 ? (
                                            <>
                                                <span className="hidden md:inline"><br /></span>
                                                日本に関心を持つ海外ユーザーが集まっています。
                                            </>
                                        ) : null}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2} y={20}>
                        <div className="rounded-3xl border border-gray-light/60 bg-gray-light/20 p-7 md:p-8">
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                {notes.note.map((item) => (
                                    <div
                                        key={item.emphasis}
                                        className="relative h-36 w-36 md:h-40 md:w-40 rounded-full border border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-rose-100 shadow-[0_22px_50px_rgba(0,0,0,0.14)]"
                                    >
                                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,_rgba(255,255,255,0.95),_rgba(255,255,255,0.2)_60%,_rgba(193,39,45,0.08)_100%)]" />
                                        <div className="absolute inset-3 rounded-full border border-amber-300/60 bg-white/85" />
                                        <div className="absolute inset-4 rounded-full border border-dashed border-amber-300/60" />
                                        <div className="relative z-10 flex h-full w-full items-center justify-center px-5 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-sm md:text-base font-semibold text-gray-900 leading-tight tracking-[0.02em]">
                                                    {renderBadgeEmphasis(item.emphasis)}
                                                </span>
                                                {item.detail && (
                                                    <span className="text-xs md:text-sm font-semibold text-gray-dark leading-snug underline decoration-amber-300 decoration-2 underline-offset-4">
                                                        {item.detail}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </Container>
        </section>
    );
}
