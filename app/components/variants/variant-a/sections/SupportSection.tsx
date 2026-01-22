"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "../../../ui/ScrollReveal";
import { CountUp } from "../../../ui/CountUp";

type SupportFeature = {
    title: string;
    description: string;
};

type SupportNotes = {
    heading: string;
    description: string;
    fact: string;
    note: string;
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
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-white to-[#fbf2f2]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 right-8 h-52 w-52 rounded-full bg-accent/10 blur-[90px]" />
                <div className="absolute left-10 bottom-10 h-px w-[70%] bg-black/10" />
            </div>
            <div className="relative max-w-6xl mx-auto px-6">
                <ScrollReveal delay={0} y={20}>
                    <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            {notes.heading}
                        </h2>
                        <p className="text-lg text-gray-dark leading-relaxed">
                            {renderSupportLead(notes.description)}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="mt-12 space-y-6">
                    {features.map((item, index) => (
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
                                    <div
                                        className={`h-full max-w-6xl mx-auto px-6 flex items-center ${
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
                                {notes.fact}
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2} y={20}>
                        <div className="rounded-3xl border border-gray-light/60 bg-gray-light/20 p-7 md:p-8">
                            <p className="text-sm md:text-base text-gray-dark leading-relaxed">
                                {notes.note}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
