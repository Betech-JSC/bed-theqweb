import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ThreePillars } from "@/components/ThreePillars";
import { Introduction } from "@/components/Introduction";
import { HighlightServices } from "@/components/HighlightServices";
import { MidCTA } from "@/components/MidCTA";
import { DoctorsCarousel } from "@/components/DoctorsCarousel";
import { QuickForm } from "@/components/QuickForm";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ExpertSharing } from "@/components/ExpertSharing";
import { RealResults } from "@/components/RealResults";
import { FAQ } from "@/components/FAQ";
import { ConsultLocations } from "@/components/ConsultLocations";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <ThreePillars />
        <Introduction />
        <HighlightServices />
        <MidCTA />
        <DoctorsCarousel />
        <QuickForm />
        <WhyChooseUs />
        <RealResults />
        <ExpertSharing />
        <FAQ />
        <ConsultLocations />
      </main>
      <Footer />
    </>
  );
}

