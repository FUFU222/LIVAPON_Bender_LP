import { CountUp } from "../ui/CountUp";
import { ScrollReveal } from "../ui/ScrollReveal";

const features = [
    {
        title: "面倒な国境は、テクノロジーが消去した。",
        description: "EC構築から配送まで完全自動化。あなたは「日本円」を見るだけ。",
        isMain: true,
        span: "md:col-span-2 md:row-span-2",
    },
    {
        title: "現地ファンを獲得し、その場で即売",
        description: "現地KOL起用 × 双方向コミュニケーション。",
        isMain: false,
        span: "",
    },
    {
        number: "228",
        label: "の国と地域へ",
        sublabel: "",
        isMetric: true,
        span: "",
    },
    {
        title: "固定費・掲載料 ¥0",
        description: "リスクなく海外展開を開始可能。",
        isMain: false,
        span: "",
    },
];

export function FeaturesSection() {
    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-white to-gray-light/20">
            <div className="max-w-6xl mx-auto px-4">
                {/* Title */}
                <ScrollReveal delay={0} y={30}>
                    <div className="text-center mb-16">
                        <span className="text-sm tracking-[0.3em] uppercase text-gray-dark mb-4 block">
                            CAPABILITIES
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                            LIVAPONの強み
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {features.map((feature, index) => (
                        <ScrollReveal
                            key={index}
                            delay={0.2 + index * 0.1}
                            y={40}
                            className={`
                                bg-white rounded-3xl p-8 shadow-sm border border-gray-light/30
                                hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                                ${feature.span}
                                ${feature.isMain ? "flex flex-col justify-center" : ""}
                            `}
                        >
                            {feature.isMetric ? (
                                <div className="text-center py-8">
                                    <CountUp
                                        from={0}
                                        to={parseInt(feature.number || "0")}
                                        duration={2}
                                        separator=","
                                        className="text-7xl md:text-8xl font-black text-accent block mb-2"
                                    />
                                    <span className="text-lg font-medium text-foreground block">
                                        {feature.label}
                                    </span>
                                    <span className="text-sm text-gray-dark">
                                        {feature.sublabel}
                                    </span>
                                </div>
                            ) : (
                                <>
                                    <h3
                                        className={`font-bold mb-4 leading-tight ${feature.isMain
                                            ? "text-2xl md:text-3xl lg:text-4xl"
                                            : "text-xl md:text-2xl"
                                            }`}
                                    >
                                        {feature.title}
                                    </h3>
                                    <p
                                        className={`text-gray-dark leading-relaxed ${feature.isMain ? "text-lg md:text-xl" : "text-base"
                                            }`}
                                    >
                                        {feature.description}
                                    </p>
                                </>
                            )}
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
