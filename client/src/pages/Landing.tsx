import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChoose } from "@/components/WhyChoose";
import { Portfolio } from "@/components/Portfolio";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export function Landing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      <Navigation />
      <Hero />
      <Services />
      <WhyChoose />
      <Portfolio />
      <ContactForm />
      <Footer />
    </div>
  );
}
