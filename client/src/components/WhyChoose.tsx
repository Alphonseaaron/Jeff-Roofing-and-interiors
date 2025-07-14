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
    <section className="py-20 bg-gradient-to-br from-primary-blue via-primary-blue to-primary-blue-hover dark:from-primary-blue-hover dark:via-primary-blue dark:to-primary-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose BuildPro?</h2>
          <p className="text-xl text-blue-100">We make home improvement transparent, manageable, and stress-free</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors duration-300">
                <feature.icon className="w-10 h-10 text-accent-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-blue-100 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}