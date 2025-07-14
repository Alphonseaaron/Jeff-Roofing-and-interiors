import { HardHat, Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <HardHat className="text-secondary-orange text-2xl mr-3" />
              <span className="text-xl font-bold">Jeff Roofing & Interiors</span>
            </div>
            <p className="text-gray-300 mb-4">
              Professional construction and roofing services with modern project management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary-orange transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary-orange transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary-orange transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-secondary-orange transition-colors">Residential Roofing</a></li>
              <li><a href="#" className="hover:text-secondary-orange transition-colors">Commercial Construction</a></li>
              <li><a href="#" className="hover:text-secondary-orange transition-colors">Interior Design</a></li>
              <li><a href="#" className="hover:text-secondary-orange transition-colors">Repairs & Maintenance</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-secondary-orange transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-secondary-orange transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-secondary-orange transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-secondary-orange transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
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
