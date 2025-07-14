import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    role: "Homeowner",
    content: "The real-time project tracking was amazing. I could see exactly what was happening with my roof every day through their client portal.",
    rating: 5,
    avatar: "JS"
  },
  {
    id: 2,
    name: "Maria Johnson",
    role: "Business Owner",
    content: "Professional team, transparent communication, and the payment tracking system made the whole process stress-free.",
    rating: 5,
    avatar: "MJ"
  },
  {
    id: 3,
    name: "Robert Brown",
    role: "CEO",
    content: "The interior design team transformed our office space. The gypsum ceiling work was exceptional and completed on time.",
    rating: 5,
    avatar: "RB"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">What Our Clients Say</h2>
          <p className="text-xl text-secondary">Real feedback from satisfied customers</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-secondary-orange">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-secondary mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">{testimonial.avatar}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                  <p className="text-light">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
