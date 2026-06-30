import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CuisinesSection from "@/components/landing/CuisinesSection";
import FeaturedCooksSection from "@/components/landing/FeaturedCooksSection";
import StatsSection from "@/components/landing/StatsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import WhyCookDashSection from "@/components/landing/WhyCookDashSection";
import CookCTASection from "@/components/landing/CookCTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <CuisinesSection />
        <FeaturedCooksSection />
        <StatsSection />
        <WhyCookDashSection />
        <TestimonialsSection />
        <CookCTASection />
      </main>
      <Footer />
    </>
  );
}
