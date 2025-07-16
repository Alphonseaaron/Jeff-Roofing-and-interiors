import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background opacity-90"></div>
      <div className="relative z-10 text-center text-foreground max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight uppercase tracking-wide">
          Professional Construction & Roofing Solutions
        </h1>
        <p className="text-lg md:text-xl mb-8 text-muted-foreground font-medium">
          Expert craftsmanship with real-time project tracking and transparent communication
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => scrollToSection("contact")}
            className="btn-primary px-8 py-4 text-lg font-semibold uppercase tracking-wide"
          >
            Get Free Quote
          </Button>
          <Button
            onClick={() => scrollToSection("gallery")}
            variant="outline"
            className="btn-secondary px-8 py-4 text-lg font-semibold uppercase tracking-wide"
          >
            View Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
