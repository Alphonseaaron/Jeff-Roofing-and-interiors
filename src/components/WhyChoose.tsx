import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CheckCircle, Clock, Users, Shield } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Staged Payments",
    description: "Transparent pricing with payments tied to project milestones",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Track your project progress with live updates and photos",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled professionals with years of experience",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "We stand behind our work with comprehensive warranties",
  },
];

export function WhyChoose() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section className="py-20" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={`text-center mb-16 animate-fade-up ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-white">
            WHY CHOOSE US
          </h2>
          <p className="text-xl font-medium" style={{ color: '#A1A1A1' }}>
            ADVANCED SYSTEMS FOR SUPERIOR CONSTRUCTION DELIVERY
          </p>
        </div>
        
        <div 
          ref={gridRef}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-up-delay ${gridVisible ? 'visible' : ''}`}
        >
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div 
                className="w-20 h-20 flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#111111', borderRadius: '8px' }}
              >
                <feature.icon className="w-10 h-10" style={{ color: '#3399FF' }} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-white">{feature.title}</h3>
              <p className="font-medium leading-relaxed" style={{ color: '#A1A1A1' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}