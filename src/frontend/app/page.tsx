import SiteHeader from "@/components/landing/SiteHeader";
import Hero from "@/components/landing/Hero";
import ProductDemo from "@/components/landing/ProductDemo";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesShowcase from "@/components/landing/FeaturesShowcase";
import UseCases from "@/components/landing/UseCases";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", overflowX: "hidden" }}>
      <SiteHeader />
      <Hero />
      <ProductDemo />
      <ProblemSection />
      <SolutionsSection />
      <HowItWorks />
      <FeaturesShowcase />
      <UseCases />
      <Faq />
      <FinalCta />
    </div>
  );
}
