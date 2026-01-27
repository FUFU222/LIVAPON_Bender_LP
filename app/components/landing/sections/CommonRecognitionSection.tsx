"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollFloat from "../../ui/ScrollFloat";
import { ScrollReveal } from "../../ui/ScrollReveal";
import { Container } from "../../ui/Container";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

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
        { text: "つまずいています", emphasis: true }
    ],
];

export function CommonRecognitionSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const tweens: gsap.core.Tween[] = [];
        const baseTrigger = {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        };

        if (orbRef.current) {
            tweens.push(
                gsap.to(orbRef.current, {
                    y: 80,
                    ease: "none",
                    scrollTrigger: baseTrigger,
                })
            );
        }

        if (lineRef.current) {
            tweens.push(
                gsap.to(lineRef.current, {
                    x: -50,
                    ease: "none",
                    scrollTrigger: baseTrigger,
                })
            );
        }

        return () => {
            tweens.forEach((tween) => tween.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[70vh] md:min-h-[140vh] bg-gradient-to-b from-white via-white to-[#fbf2f2] md:overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/10 blur-[90px]" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#f8e7e8] blur-[100px]" />
                <div className="absolute inset-x-10 top-10 h-px bg-black/10" />
                <div className="absolute inset-x-10 bottom-10 h-px bg-black/10" />
                <div
                    ref={orbRef}
                    className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#f4d9d9]/70 blur-[80px]"
                />
                <div
                    ref={lineRef}
                    className="absolute left-12 bottom-20 h-px w-48 bg-black/10"
                />
            </div>
            <div className="relative w-full min-h-screen flex items-center">
                <Container size="5xl" className="w-full py-0 text-left md:text-center">
                    <ScrollReveal delay={0} y={16}>
                        <div>
                            <div className="md:hidden space-y-0 text-left">
                                {introMobileLines.map((line, lineIndex) => (
                                    <div
                                        key={`intro-line-${lineIndex}`}
                                        className={lineIndex === 0 ? "" : "-mt-1"}
                                    >
                                        <div className="relative w-fit">
                                            <div className="flex flex-wrap items-baseline gap-x-1 pb-1">
                                                {line.map((segment, segmentIndex) => (
                                                    <ScrollFloat
                                                        key={`intro-seg-${lineIndex}-${segmentIndex}`}
                                                        as="span"
                                                        containerClassName="my-0 inline-flex relative"
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
                                    <div className="relative inline-block pt-2">
                                        <div className="flex items-baseline whitespace-nowrap">
                                            <ScrollFloat
                                                as="span"
                                                containerClassName="my-0 inline-flex relative"
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
                                                    containerClassName="my-0 inline-flex relative"
                                                    textClassName="text-[48px] md:text-5xl lg:text-6xl font-semibold leading-[1.4] tracking-tight text-foreground"
                                                    animationDuration={1}
                                                    ease="back.inOut(2)"
                                                    scrollStart="center bottom+=50%"
                                                    scrollEnd="bottom bottom-=40%"
                                                    stagger={0.03}
                                                >
                                                    {"つまずいています"}
                                                </ScrollFloat>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </Container>
            </div>
        </section>
    );
}
