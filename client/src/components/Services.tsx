import { Home, Building, Paintbrush, Check } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Roofing",
    description: "Complete roofing solutions for homes with premium materials and expert installation.",
    features: [
      "Shingle Installation",
      "Roof Repairs",
      "Gutter Systems"
    ]
  },
  {
    icon: Building,
    title: "Commercial Construction",
    description: "Large-scale commercial projects with advanced project management systems.",
    features: [
      "Office Buildings",
      "Retail Spaces",
      "Warehouse Construction"
    ]
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    description: "Modern interior solutions with gypsum ceiling and custom designs.",
    features: [
      "Gypsum Ceiling",
      "Custom Lighting",
      "Space Planning"
    ]
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase tracking-wide">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Comprehensive construction solutions with modern project management and real-time tracking
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-card border border-border p-8 rounded-lg hover:border-primary transition-all duration-200 group">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-hover transition-colors duration-200">
                <service.icon className="text-foreground" size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-wide">{service.title}</h3>
              <p className="text-muted-foreground mb-6 font-medium">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-muted-foreground font-medium">
                    <Check className="text-success mr-2" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
