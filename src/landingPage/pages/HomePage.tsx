import { TopAppBar } from "../components/TopAppBar";
import { HeroSection } from "../components/HeroSection";
import { FeatureGrid } from "../components/FeatureGrid";
import { Testimonials } from "../components/Testimonials";
import { CtaSection } from "../components/CtaSection";
import { Footer } from "../components/Footer";
import { StructuredData } from "@/components/StructuredData";

export const HomePage = () => {
  return (
    <div className="bg-canvas">
      <StructuredData type="WebSite" />
      <TopAppBar />
      <HeroSection />
      <FeatureGrid />
      <Testimonials />
      <CtaSection />
      <Footer />
    </div>
  );
};
