import { TopAppBar } from "../components/TopAppBar";
import { HeroSection } from "../components/HeroSection";
import { FeatureGrid } from "../components/FeatureGrid";
import { Testimonials } from "../components/Testimonials";
import { CtaSection } from "../components/CtaSection";
import { Footer } from "../components/Footer";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-surface text-[#003622]">
      <TopAppBar />
      <main className="pt-24">
        <HeroSection />
        <FeatureGrid />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};
