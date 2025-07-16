import { Button } from "@/components/ui/button";
import heroImage from "@assets/5_1752664761848.jpg";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight uppercase tracking-wider text-white">
          ADVANCED ROOFING SYSTEMS
        </h1>
        <p className="text-xl md:text-2xl mb-12 font-medium" style={{ color: '#A1A1A1' }}>
          PRECISION ENGINEERING FOR MODERN CONSTRUCTION
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            onClick={() => scrollToSection("contact")}
            className="px-12 py-4 text-lg font-semibold uppercase tracking-wider transition-all duration-200"
            style={{ 
              backgroundColor: '#3399FF',
              color: 'white',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5FB8FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3399FF';
            }}
          >
            START PROJECT
          </Button>
        </div>
      </div>
    </section>
  );
}
