import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden hero-bg">
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Professional Construction & Roofing Solutions
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Expert craftsmanship with real-time project tracking and transparent communication
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-secondary-orange hover:bg-secondary-orange-hover px-8 py-4 text-lg font-semibold"
          >
            Get Free Quote
          </Button>
          <Button
            onClick={() => scrollToSection("portfolio")}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-primary-blue px-8 py-4 text-lg font-semibold"
          >
            View Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
