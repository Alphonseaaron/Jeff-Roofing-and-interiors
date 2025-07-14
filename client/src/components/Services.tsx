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
    <section id="services" className="py-20 bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary dark:text-primary mb-4">Our Services</h2>
          <p className="text-xl text-secondary dark:text-secondary max-w-2xl mx-auto">
            Comprehensive construction solutions with modern project management and real-time tracking
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-surface-light dark:bg-surface-dark p-8 rounded-xl hover:shadow-lg dark:hover:shadow-white/10 transition-all duration-300 card-hover group">
              <div className="w-16 h-16 bg-primary-blue dark:bg-primary-blue rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-primary dark:text-primary mb-4">{service.title}</h3>
              <p className="text-secondary dark:text-secondary mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-secondary dark:text-secondary">
                    <Check className="text-success-green mr-2" size={16} />
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
