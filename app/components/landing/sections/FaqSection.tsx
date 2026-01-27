"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "../../ui/ScrollReveal";
import { Container } from "../../ui/Container";

type FaqItemType = {
    id: number;
    question: string;
    answer: string;
};

interface FaqSectionProps {
    items?: FaqItemType[];
}

const defaultItems = Array.from({ length: 7 }, (_, index) => ({
    id: index + 1,
    question: "",
    answer: "",
}));

const renderAnswer = (text: string) => {
    const parts = text.split("**");
    return parts.map((part, index) =>
        index % 2 === 1 ? (
            <strong key={`${part}-${index}`} className="font-semibold text-foreground">
                {part}
            </strong>
        ) : (
            <span key={`${part}-${index}`}>{part}</span>
        )
    );
};

const FaqItem = ({
    item,
    isOpen,
    onToggle,
}: {
    item: FaqItemType;
    isOpen: boolean;
    onToggle: () => void;
}) => {
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
                onClick={onToggle}
            >
                <div className="flex items-center gap-4 min-h-[28px]">
                    <span className="text-base md:text-lg font-semibold tracking-[0.3em] text-gray-dark">
                        Q
                    </span>
                    <span className="text-lg md:text-xl text-foreground">
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
                    <div className="flex items-start gap-4 min-h-[28px]">
                        <span className="text-base md:text-lg font-semibold tracking-[0.3em] text-accent">
                            A
                        </span>
                        <div className="text-base md:text-lg text-gray-dark leading-relaxed">
                            {renderAnswer(item.answer)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function FaqSection({ items = defaultItems }: FaqSectionProps) {
    const [openFaqId, setOpenFaqId] = useState<number | null>(null);
    return (
        <section className="relative py-24 md:py-32 bg-white">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-x-10 top-10 h-px bg-black/10" />
                <div className="absolute inset-x-10 bottom-10 h-px bg-black/10" />
            </div>
            <Container size="6xl" className="relative">
                <ScrollReveal delay={0} y={20}>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold">
                            よくあるご質問
                        </h2>
                    </div>
                </ScrollReveal>
                <div className="max-w-4xl mx-auto space-y-4">
                    {items.map((item) => (
                        <FaqItem
                            key={item.id}
                            item={item}
                            isOpen={openFaqId === item.id}
                            onToggle={() =>
                                setOpenFaqId((prev) => (prev === item.id ? null : item.id))
                            }
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
