"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollFloat from "../../../ui/ScrollFloat";
import { ScrollReveal } from "../../../ui/ScrollReveal";

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

export function CommonRecognitionSection() {
    const underlineRef = useRef<HTMLDivElement>(null);
    const underlineInView = useInView(underlineRef, { once: true, margin: "-20% 0px" });
    const mobileUnderlineRef = useRef<HTMLDivElement>(null);
    const mobileUnderlineInView = useInView(mobileUnderlineRef, { once: true, margin: "-20% 0px" });

    return (
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
                                                className="pointer-events-none absolute left-0 right-0 bottom-[0.4em] z-0 h-3 shadow-[0_6px_14px_rgba(155,0,30,0.22)]"
                                                style={{
                                                    transformOrigin: "0% 50%",
                                                    scaleX: mobileUnderlineInView ? 1 : 0,
                                                    borderRadius: "2px",
                                                    background: "rgba(155,0,30,0.75)",
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
                                                className="absolute left-0 right-0 bottom-[0.4em] h-3 shadow-[0_6px_14px_rgba(155,0,30,0.22)]"
                                                style={{
                                                    transformOrigin: "0% 50%",
                                                    scaleX: underlineInView ? 1 : 0,
                                                    borderRadius: "2px",
                                                    background: "rgba(155,0,30,0.75)",
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
    );
}
