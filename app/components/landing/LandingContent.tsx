import Image from "next/image";
import { WaterRipple } from "../canvas/WaterRipple";
import { ScrollReveal } from "../ui/ScrollReveal";
import RotatingText from "../ui/RotatingText";
import BlurText from "../ui/BlurText";
import { Container } from "../ui/Container";
import SpotlightCard from "../ui/SpotlightCard";
import { CTAForm } from "../forms/CTAForm";
import { CommonRecognitionSection } from "./sections/CommonRecognitionSection";
import { IntroProblemsSection } from "./sections/IntroProblemsSection";
import { BridgeSection } from "./sections/BridgeSection";
import { SupportSection } from "./sections/SupportSection";
import { OfficialSponsorSection } from "./sections/OfficialSponsorSection";
import { FaqSection } from "./sections/FaqSection";
import {
    introItems,
    supportFeatures,
    supportNotes,
    officialSponsor,
    liveHighlights,
    entryNotes,
    faqItems,
} from "./content";

export function LandingContent() {
    const freeBadgeVariant: "premium" | "stamp" | "chip" = "stamp";

    const renderEmphasis = (text: string) =>
        text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
            index % 2 === 1 ? (
                <strong key={index} className="font-semibold text-current">
                    {part}
                </strong>
            ) : (
                part
            )
        );

    const renderFreeBadge = (variant: "premium" | "stamp" | "chip") => {
        switch (variant) {
            case "stamp":
                return (
                    <span className="-rotate-2 inline-flex items-center rounded-lg border-2 border-accent/70 bg-white px-3 py-1 text-sm font-semibold tracking-[0.12em] text-accent shadow-[0_10px_20px_rgba(193,39,45,0.18)] whitespace-nowrap leading-none">
                        無料
                    </span>
                );
            case "chip":
                return (
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold tracking-[0.18em] text-white shadow-[0_10px_20px_rgba(15,23,42,0.25)]">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M12 3l2.6 5.3L20 9l-4 3.9.9 5.6L12 15.7 7.1 18.5 8 12.9 4 9l5.4-.7L12 3z" />
                        </svg>
                        参加無料
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center rounded-full border border-amber-300/60 bg-gradient-to-r from-amber-50 via-white to-amber-100 px-4 py-1.5 text-sm font-semibold tracking-[0.25em] text-amber-700 shadow-[0_8px_20px_rgba(191,141,57,0.18)]">
                        無料
                    </span>
                );
        }
    };

    return (
        <div className="bg-white text-foreground">
            <IntroProblemsSection items={introItems} />

            <CommonRecognitionSection />

            <SupportSection features={supportFeatures} notes={supportNotes} />

            <section className="relative py-[20vh] bg-white">
                <Container size="5xl" className="text-center">
                    <div className="flex flex-col items-center gap-2 md:hidden">
                        <BlurText
                            text="すでに舞台は"
                            delay={40}
                            animateBy="letters"
                            direction="top"
                            className="text-3xl font-semibold tracking-tight text-foreground text-center justify-center w-full"
                        />
                        <BlurText
                            text="用意されています"
                            delay={40}
                            animateBy="letters"
                            direction="top"
                            className="text-3xl font-semibold tracking-tight text-foreground text-center justify-center w-full"
                        />
                    </div>
                    <div className="hidden md:block">
                        <BlurText
                            text="すでに舞台は用意されています"
                            delay={40}
                            animateBy="letters"
                            direction="top"
                            className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-center justify-center w-full"
                        />
                    </div>
                </Container>
            </section>

            <OfficialSponsorSection sponsor={officialSponsor} />

            <section className="relative py-24 md:py-32 bg-white overflow-hidden">
                <Container size="6xl">
                    <ScrollReveal delay={0} y={24}>
                        <div className="flex items-baseline justify-center gap-2 md:gap-5 mb-12 flex-nowrap overflow-visible whitespace-nowrap">
                            <div className="text-right">
                                <span className="text-4xl md:text-7xl font-light tracking-tighter text-gray-dark">
                                    Deliver
                                </span>
                            </div>
                            <div className="relative flex items-baseline">
                                {/* Width Anchor: Hidden placeholder to lock the width and prevent jitter */}
                                <span className="text-5xl md:text-8xl font-black tracking-tighter opacity-0 select-none pointer-events-none px-1 invisible" aria-hidden="true">
                                    NIPPON
                                </span>
                                {/* Nudge up slightly (-1px to -2px often sufficient for optical baseline alignment) */}
                                <div className="absolute inset-x-0 bottom-0 top-0 flex items-baseline justify-center -translate-y-[2px] md:-translate-y-[4px]">
                                    <RotatingText
                                        texts={["LIVE", "NIPPON"]}
                                        mainClassName="text-5xl md:text-8xl font-black tracking-tighter text-accent overflow-hidden py-1 px-1"
                                        stacked
                                        staggerFrom="last"
                                        initial={{ y: "100%", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: "-120%", opacity: 0 }}
                                        staggerDuration={0.02}
                                        rotationInterval={2200}
                                        animatePresenceMode="wait"
                                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3} y={20}>
                        <p className="text-xl md:text-2xl text-gray-dark max-w-3xl mx-auto text-center leading-relaxed font-semibold mb-12">
                            世界ではすでに、<br className="md:hidden" />
                            ライブが「売れる場所」に。
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {liveHighlights.map((item, index) => (
                            <ScrollReveal key={item.title} delay={0.2 + index * 0.08} y={24}>
                                <SpotlightCard className="group rounded-3xl border border-gray-light/60 p-6 pt-8 bg-white text-foreground shadow-[0_20px_70px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-white/20 hover:shadow-[0_35px_90px_rgba(129,26,34,0.45)]">
                                    <div
                                        className="pointer-events-none absolute inset-0 z-0 rounded-3xl opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #8f1d26 0%, #b42330 60%, #8f1d26 100%)",
                                        }}
                                    />
                                    <div className="relative z-20">
                                        <div className="flex items-end justify-between gap-3">
                                            <div className="flex flex-col items-start leading-none">
                                                <span className="pl-1 text-[10px] md:text-xs font-semibold tracking-[0.3em] text-accent/60 transition-colors duration-300 group-hover:text-white/60">
                                                    CASE
                                                </span>
                                                <span className="text-4xl md:text-5xl font-black tracking-tight text-accent/90 drop-shadow-sm transition-colors duration-300 group-hover:text-white/90">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap justify-end gap-2 text-xs font-semibold text-gray-dark transition-colors duration-300 group-hover:text-white/80 self-end">
                                                {item.tags?.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full border border-gray-light/70 bg-gray-light/70 px-2.5 py-1 tracking-wide text-gray-dark transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white/85"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-light/30 transition-colors duration-300 group-hover:bg-white/5">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.08),rgba(193,39,45,0.08))] transition-colors duration-300 group-hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_55%)] transition-colors duration-300 group-hover:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_60%)]" />
                                                    <div className="absolute bottom-4 right-4 text-[10px] font-semibold tracking-[0.3em] text-gray-dark/70 transition-colors duration-300 group-hover:text-white/50">
                                                        IMAGE
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="mt-8 text-lg md:text-xl font-semibold transition-colors duration-300 group-hover:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm md:text-[14px] text-gray-dark leading-relaxed transition-colors duration-300 group-hover:text-white/70">
                                            {renderEmphasis(item.description)}
                                        </p>
                                    </div>
                                </SpotlightCard>
                            </ScrollReveal>
                        ))}
                    </div>
                </Container>
            </section>

            <BridgeSection />

            <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-white to-gray-light/50">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-16 right-6 h-56 w-56 rounded-full bg-accent/10 blur-[90px]" />
                    <div className="absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-[#f6dede] blur-[110px]" />
                </div>
                <Container size="6xl" className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-[4/3] w-full max-w-[256px] sm:max-w-[256px] md:max-w-[420px] lg:max-w-none mx-auto lg:mx-0 overflow-hidden rounded-3xl bg-transparent">
                        <Image
                            src="/livapon-webinar.png"
                            alt="オンライン合同説明会のイメージ"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-[44px] font-bold leading-tight">
                            <span className="inline-flex items-center gap-3">
                                {renderFreeBadge(freeBadgeVariant)}
                                <span className="whitespace-nowrap">越境EC「LIVAPON」</span>
                            </span>
                            <span className="block lg:inline lg:pl-3">オンライン合同説明会</span>
                        </h2>
                        <p className="mt-6 text-sm md:text-lg text-gray-dark leading-relaxed">
                            Made in Japanを世界へ。海外販売の仕組みやライブコマース戦略を解説します。
                            <br className="hidden md:block lg:hidden" />
                            初心者の方も大歓迎です。
                        </p>
                        <div className="mt-8 text-base md:text-lg font-semibold text-gray-900">
                            <span className="text-gray-500 font-medium">開催日時：</span>
                            毎週水曜日 17:00〜18:00
                        </div>
                        <div className="mt-6 flex flex-col items-center">
                            <p className="text-xs md:text-sm text-gray-dark/90 font-medium inline-flex items-center justify-center gap-1">
                                <span className="h-px w-6 bg-gray-dark/60 rotate-[60deg]" aria-hidden="true" />
                                1分程度で申込完了します
                                <span className="h-px w-6 bg-gray-dark/60 -rotate-[60deg]" aria-hidden="true" />
                            </p>
                            <a
                                href="https://peatix.com/group/16512658/events"
                                target="_blank"
                                rel="noreferrer"
                                className="group relative mt-3 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-all duration-300 overflow-hidden hover:shadow-[0_22px_50px_rgba(0,0,0,0.45)] motion-safe:animate-[cta-float_3.6s_ease-in-out_infinite]"
                            >
                                <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-[350ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-x-100" />
                                <span className="relative z-10">詳細・申し込みはこちら</span>
                            </a>
                        </div>
                    </div>
                </Container>
            </section>

            <FaqSection items={faqItems} />

            <section id="contact" className="relative py-24 md:py-32 bg-white overflow-hidden">
                <div className="absolute inset-0 pointer-events-auto">
                    <WaterRipple baseOpacity={0.1} />
                </div>
                <Container size="4xl" className="relative z-10">
                    <ScrollReveal delay={0} y={0} duration={1}>
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-5">
                                お問い合わせ
                            </h2>
                            <p className="text-lg text-gray-dark leading-relaxed">
                                導入・提携に関するご相談はこちらから
                            </p>
                        </div>
                    </ScrollReveal>
                    {entryNotes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                            {entryNotes.map((note, index) => (
                                <ScrollReveal
                                    key={note}
                                    delay={0.1 + index * 0.08}
                                    y={0}
                                    duration={0.9}
                                >
                                    <div className="rounded-2xl bg-white/90 border border-gray-light/60 px-5 py-4 text-sm text-gray-dark text-center shadow-[0_16px_50px_rgba(0,0,0,0.12)]">
                                        {note}
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    ) : null}
                    <CTAForm />
                </Container>
            </section>
        </div>
    );
}
