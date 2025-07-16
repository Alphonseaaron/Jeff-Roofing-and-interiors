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
    <section id="services" className="py-20" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-white">
            CORE SERVICES
          </h2>
          <p className="text-xl font-medium max-w-2xl mx-auto" style={{ color: '#A1A1A1' }}>
            PRECISION ENGINEERING FOR RESIDENTIAL AND COMMERCIAL PROJECTS
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 transition-all duration-200 group"
              style={{ backgroundColor: '#222222' }}
            >
              <div 
                className="w-16 h-16 flex items-center justify-center mb-6 transition-colors duration-200"
                style={{ backgroundColor: '#3399FF' }}
              >
                <service.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-white">{service.title}</h3>
              <p className="mb-6 font-medium" style={{ color: '#A1A1A1' }}>{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center font-medium" style={{ color: '#A1A1A1' }}>
                    <Check className="mr-2" size={16} style={{ color: '#3399FF' }} />
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
