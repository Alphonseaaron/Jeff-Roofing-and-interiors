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
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase tracking-wide">Why Choose Jeff Roofing?</h2>
          <p className="text-lg text-muted-foreground font-medium">We make construction projects transparent, manageable, and stress-free</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-card border border-border rounded-lg w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:border-primary group-hover:bg-accent transition-all duration-200">
                <feature.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-wide">{feature.title}</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}