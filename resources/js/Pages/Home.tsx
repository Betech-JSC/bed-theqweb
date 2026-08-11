import { Head } from "@inertiajs/react";
import { Header } from "@/Components/Header";
import { Hero } from "@/Components/Hero";
import { Introduction } from "@/Components/Introduction";
import { HighlightServices } from "@/Components/HighlightServices";
import { MidCTA } from "@/Components/MidCTA";
import { DoctorsCarousel } from "@/Components/DoctorsCarousel";
import { WhyChooseUs } from "@/Components/WhyChooseUs";
import { ExpertSharing } from "@/Components/ExpertSharing";
import { RealResults } from "@/Components/RealResults";
import { FAQ } from "@/Components/FAQ";
import { ConsultLocations } from "@/Components/ConsultLocations";
import { Footer } from "@/Components/Footer";

interface Banner {
  id: number;
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_desktop: string;
  image_mobile: string | null;
  button_primary_text: string | null;
  button_primary_url: string | null;
  button_secondary_text: string | null;
  button_secondary_url: string | null;
  order: number;
  is_active: boolean;
}

interface Doctor {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  order: number;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  order: number;
}

interface Service {
  id: number;
  name: string;
  category: string;
  price: string | null;
  description: string | null;
  image: string | null;
  slug: string | null;
  is_highlight?: boolean | number;
}

interface ArticleItem {
  id: number;
  title: string;
  slug: string | null;
  description: string | null;
  content: string | null;
  image: string | null;
  author: string | null;
  published_date: string | null;
  category: string;
}

interface RealResultItem {
  id: number;
  category: string;
  title: string;
  detail: string;
  image: string;
  is_video: boolean | number;
  order: number;
}

interface HomeProps {
  banners?: Banner[];
  doctors?: Doctor[];
  faqs?: FAQItem[];
  services?: Service[];
  realResults?: RealResultItem[];
  articles?: ArticleItem[];
}

export default function Home({ banners = [], doctors = [], faqs = [], services = [], realResults = [], articles = [] }: HomeProps) {
  return (
    <>
      <Head title="Theq Nail Centre" />
      <Header />
      <main className="flex-grow">
        <Hero banners={banners} />
        <Introduction />
        <HighlightServices services={services} />
        <MidCTA />
        <DoctorsCarousel doctors={doctors} />
        <WhyChooseUs />
        <RealResults results={realResults} />
        <ExpertSharing articles={articles} />
        <FAQ faqs={faqs} />
        <ConsultLocations />
      </main>
      <Footer />
    </>
  );
}

