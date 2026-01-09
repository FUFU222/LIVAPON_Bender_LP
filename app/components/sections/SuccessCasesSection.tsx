import { ScrollReveal } from "../ui/ScrollReveal";

const cases = [
    {
        category: "米国発",
        company: "コスメブランド",
        result: "10時間の配信で4.8億円売上",
        highlight: "4.8億円",
    },
    {
        category: "長野",
        company: "老舗味噌メーカー",
        result: "たった2時間でEC1ヶ月分を販売",
        highlight: "EC1ヶ月分",
    },
    {
        category: "国内",
        company: "真珠ジュエリー",
        result: "1時間の配信で350万円販売",
        highlight: "350万円",
    },
];

export function SuccessCasesSection() {
    return (
        <section className="relative py-24 md:py-32 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Title */}
                <ScrollReveal delay={0} y={30}>
                    <div className="text-center mb-16">
                        <span className="text-sm tracking-[0.3em] uppercase text-gray-dark mb-4 block">
                            SUCCESS CASES
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            ライブコマースの成功事例
                        </h2>
                        <div className="w-16 h-1 bg-accent mx-auto" />
                    </div>
                </ScrollReveal>

                {/* Cases Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cases.map((caseItem, index) => (
                        <ScrollReveal
                            key={index}
                            delay={0.3 + index * 0.15}
                            y={50}
                            className="group relative bg-white rounded-2xl p-8 border border-gray-light/50 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                        >
                            {/* Background Gradient on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                {/* Category Badge */}
                                <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-light/50 text-gray-dark rounded-full mb-4">
                                    {caseItem.category}
                                </span>

                                {/* Company */}
                                <h3 className="text-xl md:text-2xl font-bold mb-6">
                                    {caseItem.company}
                                </h3>

                                {/* Result with Arrow */}
                                <div className="flex items-center gap-3 mb-4">
                                    <svg
                                        className="w-8 h-8 text-accent flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                    <p className="text-lg text-foreground leading-relaxed">
                                        {caseItem.result}
                                    </p>
                                </div>

                                {/* Highlighted Number */}
                                <div className="pt-4 border-t border-gray-light/50">
                                    <span className="text-3xl md:text-4xl font-black text-accent">
                                        {caseItem.highlight}
                                    </span>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
