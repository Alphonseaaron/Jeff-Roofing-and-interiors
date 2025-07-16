import { HardHat, Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border text-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="text-primary text-2xl mr-3 font-bold">J</div>
              <span className="text-xl font-bold uppercase tracking-wide">Jeff Roofing & Interiors</span>
            </div>
            <p className="text-muted-foreground mb-4 font-medium">
              Professional construction and roofing services with modern project management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors duration-200 font-medium">Residential Roofing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200 font-medium">Commercial Construction</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200 font-medium">Interior Design</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200 font-medium">Repairs & Maintenance</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors duration-200 font-medium">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200 font-medium">Our Team</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200 font-medium">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200 font-medium">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Contact Info</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                123 Construction Ave, City, ST 12345
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                (555) 123-4567
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                info@jeffroofing.com
              </li>
              <li className="flex items-center">
                <Clock size={16} className="mr-2" />
                Mon-Fri: 7AM-6PM
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Jeff Roofing & Interiors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
