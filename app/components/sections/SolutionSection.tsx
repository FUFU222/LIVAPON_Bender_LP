import { ScrollReveal } from "../ui/ScrollReveal";

const steps = [
    {
        number: "01",
        title: "LIVE STREAMING",
        description: "現地KOLによる熱狂的なリアルタイム紹介",
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
                <rect x="6" y="10" width="36" height="24" rx="2" />
                <circle cx="24" cy="22" r="6" />
                <path d="M32 22a8 8 0 00-16 0" />
                <circle cx="38" cy="14" r="3" fill="#bc002d" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "INSTANT PURCHASE",
        description: "動画を見ながら、その場で購入完了",
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 16l4-8h24l4 8" />
                <rect x="6" y="16" width="36" height="24" rx="2" />
                <path d="M18 28l4 4 8-8" stroke="#bc002d" strokeWidth="2" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "ONE-STOP EXPORT",
        description: "決済・配送・輸出まで全て自動化",
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
                <circle cx="24" cy="24" r="18" />
                <path d="M24 6v6m0 24v6M6 24h6m24 0h6" />
                <circle cx="24" cy="24" r="6" fill="#bc002d" fillOpacity="0.2" stroke="#bc002d" />
            </svg>
        ),
    },
];

export function SolutionSection() {
    return (
        <section className="relative py-24 md:py-32 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Title */}
                <ScrollReveal delay={0} y={30}>
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                            ライブコマースで、海外展開の壁を突破。
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Steps */}
                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-gray-light to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                        {steps.map((step, index) => (
                            <ScrollReveal
                                key={index}
                                delay={0.3 + index * 0.2}
                                y={50}
                                className="text-center"
                            >
                                {/* Step Number */}
                                <div className="text-6xl md:text-7xl font-black text-gray-light/50 mb-4 font-mono">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="inline-block mb-6 text-foreground hover:scale-110 hover:rotate-6 transition-transform duration-300 cursor-default">
                                    {step.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-wide">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-dark text-lg leading-relaxed">
                                    {step.description}
                                </p>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
