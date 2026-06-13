import CtaSection from "@/components/CtaSection";
import FeaturedJobsSection from "@/components/FeaturedJobsSection";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <StatsSection />
      <FeaturedJobsSection />
      <CtaSection/>
    </div>
  );
}
