import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/5_1752664761848.jpg";

export function Hero() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation();
  const { ref: buttonRef, isVisible: buttonVisible } = useScrollAnimation();

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
        <h1 
          ref={titleRef}
          className={`text-5xl md:text-7xl font-bold mb-6 leading-tight uppercase tracking-wider text-white animate-fade-up ${titleVisible ? 'visible' : ''}`}
        >
          ADVANCED ROOFING SYSTEMS
        </h1>
        <p 
          ref={subtitleRef}
          className={`text-xl md:text-2xl mb-12 font-medium animate-fade-up-delay ${subtitleVisible ? 'visible' : ''}`}
          style={{ color: '#A1A1A1' }}
        >
          Precision-Built. Personally Yours.
        </p>
        <div 
          ref={buttonRef}
          className={`flex flex-col sm:flex-row gap-6 justify-center animate-fade-up-delay ${buttonVisible ? 'visible' : ''}`}
        >
          <Button
            onClick={() => scrollToSection("contact")}
            className="px-12 py-4 text-lg font-semibold uppercase tracking-wider transition-all duration-300"
            style={{ 
              backgroundColor: '#3399FF',
              color: 'white',
              border: 'none',
              borderRadius: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5FB8FF';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3399FF';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            START PROJECT
          </Button>
        </div>
      </div>
    </section>
  );
}
