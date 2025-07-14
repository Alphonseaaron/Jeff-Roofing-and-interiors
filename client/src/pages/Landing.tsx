import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChoose } from "@/components/WhyChoose";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export function Landing() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Navigation />
      <Hero />
      <Services />
      <WhyChoose />
      <Portfolio />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}
