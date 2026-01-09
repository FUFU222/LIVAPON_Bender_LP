import { ScrollReveal } from "../ui/ScrollReveal";
import { ZAxisScroll } from "../ui/ZAxisScroll";

const problems = [
    {
        icon: "🌏",
        text: "海外に売り込みたいが、現地の反応がわからない",
    },
    {
        icon: "💰",
        text: "高額な広告費や展示会ばかりでなかなか成果が出ない",
    },
    {
        icon: "🤝",
        text: "代理店任せになってしまい、自社ブランドのファンが育たない",
    },
    {
        icon: "📦",
        text: "輸出手続きや物流コストの負担が大きく、踏み出せない",
    },
];

export function ProblemSection() {
    return (
        <section className="relative py-24 md:py-32 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Title */}
                <ScrollReveal delay={0} y={30}>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            こんなお悩み・課題はありませんか？
                        </h2>
                        <div className="w-16 h-1 bg-accent mx-auto" />
                    </div>
                </ScrollReveal>

                {/* Content with Z-Axis Animation */}
                <ZAxisScroll>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {problems.map((problem, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-light/50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-4xl mb-4">{problem.icon}</div>
                                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                                    {problem.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </ZAxisScroll>
            </div>
        </section>
    );
}
