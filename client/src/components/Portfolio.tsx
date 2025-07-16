import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import image1 from "@assets/1.1_1752664761830.jpg";
import image2 from "@assets/1.2_1752664761845.jpg";
import image3 from "@assets/1.3_1752664761845.jpg";
import image4 from "@assets/1.5_1752664761846.jpg";
import image5 from "@assets/1.7_1752664761847.jpg";
import image6 from "@assets/4.2_1752664761847.jpg";
import image7 from "@assets/4_1752664761847.jpg";
import image8 from "@assets/7.1_1752664761848.jpg";
import image9 from "@assets/7.2_1752664761849.jpg";
import image10 from "@assets/7_1752664761849.jpg";
import image11 from "@assets/9_1752664761849.jpg";
import workersImage from "@assets/workers_1752664761852.jpg";

const portfolioImages = [
  image1, image2, image3, image4, image5, image6,
  image7, image8, image9, image10, image11, workersImage
];

export function Portfolio() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section id="gallery" className="py-20" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={`text-center mb-16 animate-fade-up ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-white">
            PROJECT PORTFOLIO
          </h2>
          <p className="text-xl font-medium" style={{ color: '#A1A1A1' }}>
            ENGINEERED SOLUTIONS FOR MODERN CONSTRUCTION
          </p>
        </div>
        
        <div 
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up-delay ${gridVisible ? 'visible' : ''}`}
        >
          {portfolioImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{ aspectRatio: '16/9', borderRadius: '8px' }}
            >
              <img
                src={image}
                alt={`Construction project ${index + 1}`}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.9)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}