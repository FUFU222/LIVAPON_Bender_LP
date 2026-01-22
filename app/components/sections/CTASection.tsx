import { WaterRipple } from "../canvas/WaterRipple";
import { ScrollReveal } from "../ui/ScrollReveal";
import { CTAForm } from "../forms/CTAForm";

export function CTASection() {
    return (
        <section className="relative py-24 md:py-32 bg-white overflow-hidden">
            {/* Water Ripple Background */}
            <div className="absolute inset-0 pointer-events-auto">
                <WaterRipple />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4">
                {/* Title */}
                <ScrollReveal delay={0} y={30}>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            お問い合わせ
                        </h2>
                        <p className="text-lg md:text-xl text-gray-dark max-w-2xl mx-auto leading-relaxed">
                            導入・提携に関するご相談はこちらから
                        </p>
                    </div>
                </ScrollReveal>

                {/* Interactive Form Component */}
                <CTAForm />
            </div>
        </section>
    );
}
