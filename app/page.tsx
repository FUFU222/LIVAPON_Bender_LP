import { HeroSection } from "./components/sections/HeroSection";
import { BrandConceptSection } from "./components/sections/BrandConceptSection";
import { ProblemSection } from "./components/sections/ProblemSection";
import { DividerSection } from "./components/sections/DividerSection";
import { SolutionSection } from "./components/sections/SolutionSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { SuccessCasesSection } from "./components/sections/SuccessCasesSection";
import { CTASection } from "./components/sections/CTASection";
import { Footer } from "./components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <BrandConceptSection />
      <ProblemSection />
      {/* 比較用：ズームアウト版（デカい状態から収まる） */}
      <SolutionSection />
      <DividerSection />
      <FeaturesSection />
      <SuccessCasesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
