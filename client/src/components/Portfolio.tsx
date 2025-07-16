import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  { src: image1, title: "RESIDENTIAL ROOFING PROJECT", category: "ROOFING" },
  { src: image2, title: "COMMERCIAL CONSTRUCTION", category: "COMMERCIAL" },
  { src: image3, title: "INTERIOR RENOVATION", category: "INTERIOR" },
  { src: image4, title: "MODERN ROOFING SOLUTION", category: "ROOFING" },
  { src: image5, title: "STRUCTURAL ENGINEERING", category: "CONSTRUCTION" },
  { src: image6, title: "PREMIUM INTERIOR WORK", category: "INTERIOR" },
  { src: image7, title: "INDUSTRIAL PROJECT", category: "COMMERCIAL" },
  { src: image8, title: "CUSTOM CONSTRUCTION", category: "CONSTRUCTION" },
  { src: image9, title: "ARCHITECTURAL DESIGN", category: "DESIGN" },
  { src: image10, title: "ROOFING EXPERTISE", category: "ROOFING" },
  { src: image11, title: "PROFESSIONAL INSTALLATION", category: "INSTALLATION" },
  { src: workersImage, title: "EXPERT TEAM AT WORK", category: "TEAM" }
];

export function Portfolio() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? portfolioImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === portfolioImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateImage('prev');
    if (e.key === 'ArrowRight') navigateImage('next');
  };

  return (
    <>
      <section id="gallery" className="py-20" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={headerRef}
            className={`text-center mb-16 animate-fade-up ${headerVisible ? 'visible' : ''}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-white">
              PROJECT PORTFOLIO
            </h2>
            <p className="text-xl font-medium" style={{ color: '#FFFFFF' }}>
              ENGINEERED SOLUTIONS FOR MODERN CONSTRUCTION
            </p>
          </div>
          
          {/* Unique Masonry-style Layout */}
          <div 
            ref={gridRef}
            className={`columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 animate-fade-up-delay ${gridVisible ? 'visible' : ''}`}
          >
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="break-inside-avoid mb-4 cursor-pointer group relative overflow-hidden transition-all duration-300 hover:transform hover:scale-105"
                style={{ borderRadius: '12px' }}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto object-cover transition-all duration-300 group-hover:brightness-110"
                  style={{ filter: 'brightness(0.9)' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-sm uppercase tracking-wider">{image.title}</h3>
                    <p className="text-xs opacity-80 mt-1">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-7xl max-h-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X size={24} />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
              onClick={() => navigateImage('prev')}
            >
              <ChevronLeft size={32} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
              onClick={() => navigateImage('next')}
            >
              <ChevronRight size={32} />
            </Button>

            {/* Image */}
            <img
              src={portfolioImages[selectedImage].src}
              alt={portfolioImages[selectedImage].title}
              className="max-w-full max-h-full object-contain"
              style={{ borderRadius: '8px' }}
            />

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold uppercase tracking-wider">
                {portfolioImages[selectedImage].title}
              </h3>
              <p className="text-sm opacity-80">
                {portfolioImages[selectedImage].category} • {selectedImage + 1} of {portfolioImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}