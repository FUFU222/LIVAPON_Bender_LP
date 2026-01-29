"use client";

import Image from "next/image";
import { ScrollReveal } from "../../ui/ScrollReveal";
import { Container } from "../../ui/Container";

type IntroItem = {
    title: string;
    description: string;
};

interface IntroProblemsSectionProps {
    items: IntroItem[];
}

export function IntroProblemsSection({ items }: IntroProblemsSectionProps) {
    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-white to-[#fbf2f2]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
                <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-[#f7dede] blur-[120px]" />
                <div className="absolute inset-x-6 top-8 h-px bg-black/10" />
                <div className="absolute inset-x-6 bottom-8 h-px bg-black/10" />
                <div className="absolute left-8 top-8 h-2 w-2 rounded-full border border-black/20" />
                <div className="absolute right-8 bottom-8 h-2 w-2 rounded-full border border-black/20" />
            </div>
            <Container size="6xl">
                <ScrollReveal delay={0} y={20}>
                    <div className="mb-10">
                        <h2 className="text-3xl md:text-5xl font-bold">
                            海外展開が伸び悩む
                            <br />
                            5つの理由
                        </h2>
                        <p className="mt-4 text-xl md:text-2xl text-gray-dark max-w-xl">
                            こんなお悩みありませんか？
                        </p>
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={0.1} y={20}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
                        {items.map((item, index) => {
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
                                        <div className="relative rounded-3xl overflow-hidden h-full min-h-[230px] md:min-h-[280px]">
                                            <span className="pointer-events-none absolute bottom-4 left-10 h-4 w-4 rotate-45 bg-white border border-gray-light/60 shadow-sm z-20" />
                                            <div className="absolute top-0 inset-x-0 h-[65%] p-6 md:p-8">
                                                <div className="relative h-full w-full transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04] flex items-center justify-center">
                                                    <div className="relative h-full w-full max-w-[85%] mx-auto">
                                                        <Image
                                                            src={`/problem-${index + 1}.png`}
                                                            alt={item.title}
                                                            fill
                                                            sizes="(max-width: 1024px) 100vw, 33vw"
                                                            className="object-contain object-center"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative z-10 flex h-full w-full items-end bg-gradient-to-t from-white via-white to-transparent">
                                                <div className="relative w-full p-6 md:p-8 flex flex-col justify-end">
                                                    <p
                                                        className="absolute top-[-30px] left-6 text-2xl md:text-4xl font-semibold tracking-[0.05em] text-white font-[var(--font-oswald)]"
                                                        style={{ WebkitTextStroke: "2px var(--accent)" }}
                                                    >
                                                        {String(index + 1).padStart(2, "0")}
                                                    </p>
                                                    <div className="pt-2 flex flex-col items-start gap-2.5">
                                                        <h3 className="text-[22px] md:text-[26px] font-semibold text-accent leading-tight">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-[14px] md:text-[18px] lg:text-[15px] font-medium text-gray-dark leading-relaxed">
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
            </Container>
        </section>
    );
}
