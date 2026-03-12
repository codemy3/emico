import HeroSection from "@/components/HeroSection";
import CreativeSection from "@/components/CreativeSection";
import PartnersSection from "@/components/PartnersSection";
import ExploreProperties from "@/components/ExploreProperties";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import LeadForm from "@/components/LeadForm";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CreativeSection />
      <PartnersSection />

     <ExploreProperties />
      <StatsSection />
      <WhyChooseUs />
      <LeadForm />
    </main>
  );
}