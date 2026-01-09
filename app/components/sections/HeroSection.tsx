import { Threads } from "../canvas/Threads";
import { ShinyText } from "../ui/ShinyText";
import { SplitText } from "../ui/SplitText";
import { ScrollReveal } from "../ui/ScrollReveal";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
            <div className="absolute inset-0 z-0">
                <Threads
                    amplitude={0.7}
                    distance={0}
                    speed={0.15}
                    enableMouseInteraction={true}
                    color={[0.92, 0.92, 0.92]}
                />
            </div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                {/* Label */}
                <ScrollReveal delay={0} y={20}>
                    <div className="mb-8">
                        <ShinyText className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-dark">
                            LIVAPON CROSS BORDER PLATFORM
                        </ShinyText>
                    </div>
                </ScrollReveal>

                {/* Main Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                    <SplitText delay={0.3}>日本の『最高』を、</SplitText>
                    <br />
                    <SplitText delay={0.3 + 9 * 0.03}>世界の『熱狂』へ。</SplitText>
                </h1>

                {/* Sub Headline */}
                <ScrollReveal delay={1.2} y={30}>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-dark max-w-3xl mx-auto leading-relaxed">
                        待っているのは80億人。言葉も国境も超える、0.1秒のライブ革命。
                    </p>
                </ScrollReveal>
            </div>

            {/* Scroll Indicator - Keep as simple CSS/Client animation if needed, or static for RSC */}
            <ScrollReveal delay={2} y={0} duration={1} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
                <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 bg-foreground/50 rounded-full animate-bounce h-2" />
                </div>
            </ScrollReveal>
        </section>
    );
}
