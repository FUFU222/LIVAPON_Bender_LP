"use client";

import { ScrollReveal } from "../ui/ScrollReveal";
import RotatingText from "../ui/RotatingText";

export function BrandConceptSection() {
    return (
        <section className="relative py-32 md:py-48 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 text-center">
                {/* Deliver + Rotating Text (LIVE / NIPPON) */}
                {/* Deliver + Rotating Text (LIVE / NIPPON) */}
                <ScrollReveal delay={0} y={40} duration={1}>
                    <div className="grid grid-cols-1 md:grid-cols-[45%_55%] items-center gap-4 md:gap-8 mb-16 max-w-7xl mx-auto">
                        <div className="text-center md:text-right">
                            <span className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-gray-dark">
                                Deliver
                            </span>
                        </div>
                        <div className="text-center md:text-left flex justify-center md:justify-start">
                            <RotatingText
                                texts={['LIVE', 'NIPPON']}
                                mainClassName="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-accent overflow-hidden py-2 px-2"
                                staggerFrom="last"
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: "-120%", opacity: 0 }}
                                staggerDuration={0.02}
                                rotationInterval={3000}
                                animatePresenceMode="popLayout"
                                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            />
                        </div>
                    </div>
                </ScrollReveal>

                {/* Caption */}
                <ScrollReveal delay={0.5} y={20} duration={0.8}>
                    <p className="text-xl md:text-2xl text-gray-dark max-w-3xl mx-auto leading-relaxed font-medium mt-16">
                        「ライブ」の熱狂で、「ニッポン」を解き放つ。
                        <br className="hidden md:block" />
                        世界へ届ける、その情熱をブランドに込めました。
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
}
