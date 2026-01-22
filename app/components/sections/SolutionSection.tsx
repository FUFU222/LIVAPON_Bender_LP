import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";

const solutions = [
    {
        phase: "検討・準備フェーズ",
        number: "01",
        title: "最初の一歩を整える",
        points: [
            "見せ方・伝え方を整理",
            "小さく試す",
        ],
        image: "/placeholders/solution-01.svg",
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12h28v24H10z" />
                <path d="M16 18h16M16 24h10M16 30h12" />
                <circle cx="34" cy="32" r="3" fill="#bc002d" />
            </svg>
        ),
    },
    {
        phase: "実行・運用フェーズ",
        number: "02",
        title: "運用負荷をまとめて解く",
        points: [
            "決済・物流を一体化",
            "接点をつくる",
        ],
        image: "/placeholders/solution-02.svg",
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
                <rect x="8" y="12" width="32" height="24" rx="2" />
                <path d="M14 20h20M14 28h14" />
                <path d="M30 30l4-4 4 4" stroke="#bc002d" strokeWidth="2" />
            </svg>
        ),
    },
    {
        phase: "成長・定着フェーズ",
        number: "03",
        title: "ファンと反応を積み上げる",
        points: [
            "ファン形成を強化",
            "反応を蓄積",
        ],
        image: "/placeholders/solution-03.svg",
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
                <circle cx="24" cy="22" r="10" />
                <path d="M12 34c3.5-4 8-6 12-6s8.5 2 12 6" />
                <circle cx="24" cy="22" r="4" fill="#bc002d" fillOpacity="0.2" stroke="#bc002d" />
            </svg>
        ),
    },
];

export function SolutionSection() {
    return (
        <section className="relative py-28 md:py-36 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Title */}
                <ScrollReveal delay={0} y={30}>
                    <div className="text-center mb-14 md:mb-16">
                        <p className="text-xs tracking-[0.35em] uppercase text-gray-dark mb-4">
                            SOLUTION
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                            段階で支援する
                        </h2>
                        <p className="mt-4 text-gray-dark text-base md:text-lg leading-relaxed">
                            点の施策ではなく、成長の流れを設計します。
                        </p>
                    </div>
                </ScrollReveal>

                {/* Steps */}
                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-gray-light to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
                        {solutions.map((solution, index) => (
                            <ScrollReveal
                                key={index}
                                delay={0.3 + index * 0.2}
                                y={50}
                                className="text-center"
                            >
                                {/* Step Number */}
                                <div className="text-6xl md:text-7xl font-black text-gray-light/50 mb-4 font-mono">
                                    {solution.number}
                                </div>

                                {/* Icon */}
                                <div className="inline-block mb-6 text-foreground hover:scale-110 hover:rotate-6 transition-transform duration-300 cursor-default">
                                    {solution.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-wide">
                                    {solution.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm font-semibold tracking-widest text-accent mb-4">
                                    {solution.phase}
                                </p>
                                <div className="rounded-2xl border border-gray-light/60 bg-gray-light/20 p-3 mb-5">
                                    <div className="relative w-full overflow-hidden rounded-xl bg-white aspect-[4/3]">
                                        <Image
                                            src={solution.image}
                                            alt={`${solution.phase}のイメージ`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <ul className="text-gray-dark text-lg leading-relaxed space-y-2">
                                    {solution.points.map((point, pointIndex) => (
                                        <li key={pointIndex}>{point}</li>
                                    ))}
                                </ul>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
