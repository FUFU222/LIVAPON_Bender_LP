import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";
import { ZAxisScroll } from "../ui/ZAxisScroll";

const phases = [
    {
        step: "STEP 01",
        title: "検討・準備フェーズ",
        lead: "何から始めるべきかが見えない",
        points: [
            "方向性が定まらない",
            "社内の合意が難しい",
        ],
        image: "/placeholders/phase-01.svg",
    },
    {
        step: "STEP 02",
        title: "実行・運用フェーズ",
        lead: "動かしたが、成果が続かない",
        points: [
            "運用の負担が重い",
            "再現性が作れない",
        ],
        image: "/placeholders/phase-02.svg",
    },
    {
        step: "STEP 03",
        title: "成長・定着フェーズ",
        lead: "売上はあるが、次が続かない",
        points: [
            "ファンが育たない",
            "反応が見えにくい",
        ],
        image: "/placeholders/phase-03.svg",
    },
];

export function ProblemSection() {
    return (
        <section className="relative py-28 md:py-36 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Title */}
                <ScrollReveal delay={0} y={30}>
                    <div className="text-center mb-14 md:mb-16">
                        <p className="text-xs tracking-[0.35em] uppercase text-gray-dark mb-4">
                            PROBLEM
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                            海外展開が進まない理由
                        </h2>
                        <p className="text-gray-dark text-base md:text-lg leading-relaxed mt-4">
                            努力不足でも、商品力不足でもありません。
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15} y={24}>
                    <div className="text-center mb-10 md:mb-12">
                        <h3 className="text-xl md:text-2xl font-semibold">
                            越え方の違う「3つの壁」
                        </h3>
                    </div>
                </ScrollReveal>

                {/* Phases */}
                <ZAxisScroll>
                    <div className="space-y-8 md:space-y-10">
                        {phases.map((phase, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-light/50 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center">
                                    <div>
                                        <div className="text-sm font-semibold tracking-widest text-accent mb-3">
                                            {phase.step}
                                        </div>
                                        <div className="text-xl md:text-2xl font-bold text-foreground mb-3">
                                            {phase.title}
                                        </div>
                                        <p className="text-lg md:text-xl text-foreground leading-relaxed mb-4">
                                            {phase.lead}
                                        </p>
                                        <ul className="flex flex-wrap gap-3 text-gray-dark text-sm md:text-base">
                                            {phase.points.map((point, pointIndex) => (
                                                <li
                                                    key={pointIndex}
                                                    className="rounded-full border border-gray-light/80 bg-gray-light/20 px-4 py-2"
                                                >
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="rounded-2xl border border-gray-light/60 bg-gray-light/20 p-3">
                                        <div className="relative w-full overflow-hidden rounded-xl bg-white aspect-[4/3]">
                                            <Image
                                                src={phase.image}
                                                alt={`${phase.title}のイメージ`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ZAxisScroll>
            </div>
        </section>
    );
}
