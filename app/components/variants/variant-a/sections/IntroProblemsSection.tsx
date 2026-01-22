"use client";

import Image from "next/image";
import { ScrollReveal } from "../../../ui/ScrollReveal";

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
                                                        <h3 className="text-[28px] md:text-[28px] font-semibold text-white bg-black/75 px-3 py-2 rounded-[8px] box-decoration-clone inline">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-[22px] md:text-[24px] lg:text-[16px] font-semibold text-black/90 leading-relaxed bg-white/90 px-2 py-1 rounded-[8px] box-decoration-clone inline">
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
    );
}
