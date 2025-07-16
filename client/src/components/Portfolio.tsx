import { useState } from "react";
import { Expand } from "lucide-react";
import { Lightbox } from "@/components/ui/lightbox";

const portfolioItems = [
  {
    id: 1,
    title: "Modern Residential Roofing",
    description: "Complete roof replacement with premium materials",
    imageUrl: "https://images.unsplash.com/photo-1558618047-b1a3f8e6e0d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "roofing"
  },
  {
    id: 2,
    title: "Luxury Interior Design",
    description: "Custom gypsum ceiling with integrated lighting",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "interior"
  },
  {
    id: 3,
    title: "Commercial Construction",
    description: "Large-scale commercial building project",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "commercial"
  },
  {
    id: 4,
    title: "Roofing Installation",
    description: "Professional roofing installation process",
    imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "roofing"
  },
  {
    id: 5,
    title: "Ceiling Design",
    description: "Custom gypsum ceiling with modern lighting",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "interior"
  },
  {
    id: 6,
    title: "Construction Management",
    description: "Professional project management and safety",
    imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "commercial"
  }
];

export function Portfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = portfolioItems.map(item => item.imageUrl);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase tracking-wide">Project Gallery</h2>
          <p className="text-lg text-muted-foreground font-medium">Explore our recent work and craftsmanship</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg border border-border hover:border-primary transition-all duration-200">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                  <button
                    onClick={() => openLightbox(index)}
                    className="text-foreground transform scale-90 group-hover:scale-100 transition-transform duration-200 bg-card border border-border rounded-lg p-4 hover:bg-accent"
                  >
                    <Expand size={24} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/90 to-transparent">
                  <h3 className="text-lg font-bold text-foreground mb-1 uppercase tracking-wide">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={previousImage}
        />
      )}
    </section>
  );
}
