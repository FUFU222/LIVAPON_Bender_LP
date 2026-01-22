"use client";

import type { ReactNode, RefObject, ElementType } from "react";
import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFloatProps {
    children: ReactNode;
    scrollContainerRef?: RefObject<HTMLElement>;
    containerClassName?: string;
    textClassName?: string;
    animationDuration?: number;
    ease?: string;
    scrollStart?: string;
    scrollEnd?: string;
    stagger?: number;
    as?: ElementType;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
    children,
    scrollContainerRef,
    containerClassName = "",
    textClassName = "",
    animationDuration = 1,
    ease = "back.inOut(2)",
    scrollStart = "center bottom+=50%",
    scrollEnd = "bottom bottom-=40%",
    stagger = 0.03,
    as: Component = "h2",
}) => {
    const containerRef = useRef<HTMLElement>(null);

    const splitText = useMemo(() => {
        const text = typeof children === "string" ? children : "";
        return text.split("").map((char, index) => {
            if (char === "\n") {
                return (
                    <React.Fragment key={`br-${index}`}>
                        <br className="block md:hidden" />
                    </React.Fragment>
                );
            }
            return (
                <span className="inline-block word" key={index}>
                    {char === " " ? "\u00A0" : char}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scroller =
            scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

        const charElements = el.querySelectorAll(".inline-block");

        gsap.fromTo(
            charElements,
            {
                willChange: "opacity, transform",
                opacity: 0,
                yPercent: 120,
                scaleY: 2.3,
                scaleX: 0.7,
                transformOrigin: "50% 0%",
            },
            {
                duration: animationDuration,
                ease,
                opacity: 1,
                yPercent: 0,
                scaleY: 1,
                scaleX: 1,
                stagger,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: scrollStart,
                    end: scrollEnd,
                    scrub: true,
                },
            }
        );
    }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

    return (
        <Component ref={containerRef} className={`my-5 overflow-hidden ${containerClassName}`.trim()}>
            <span className={`inline-block ${textClassName}`.trim()}>
                {splitText}
            </span>
        </Component>
    );
};

export default ScrollFloat;
