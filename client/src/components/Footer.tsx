import { HardHat, Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: '#000000', borderTop: '1px solid #222222' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3 font-bold" style={{ color: '#3399FF' }}>J</div>
              <span className="text-xl font-bold uppercase tracking-wider text-white">JEFF ROOFING & INTERIORS</span>
            </div>
            <p className="mb-4 font-medium" style={{ color: '#FFFFFF' }}>
              BESPOKE ROOFING & INTERIORS, BUILT TO ENDURE
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/jeffroofinginteriors" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200" style={{ color: '#FFFFFF' }}
                 onMouseEnter={(e) => e.currentTarget.style.color = '#3399FF'}
                 onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}>
                <Facebook size={20} />
              </a>
              <a href="https://www.tiktok.com/@engineerjeff" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200" style={{ color: '#FFFFFF' }}
                 onMouseEnter={(e) => e.currentTarget.style.color = '#3399FF'}
                 onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-white">SERVICES</h3>
            <ul className="space-y-2" style={{ color: '#FFFFFF' }}>
              <li><a href="#" className="transition-colors duration-200 font-medium" style={{ color: '#FFFFFF' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#3399FF'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}>RESIDENTIAL ROOFING</a></li>
              <li><a href="#" className="transition-colors duration-200 font-medium" style={{ color: '#FFFFFF' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#3399FF'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}>COMMERCIAL CONSTRUCTION</a></li>
              <li><a href="#" className="transition-colors duration-200 font-medium" style={{ color: '#FFFFFF' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#3399FF'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}>INTERIOR DESIGN</a></li>
              <li><a href="#" className="transition-colors duration-200 font-medium" style={{ color: '#FFFFFF' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#3399FF'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}>REPAIRS & MAINTENANCE</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-white">COMPANY</h3>
            <ul className="space-y-2" style={{ color: '#FFFFFF' }}>
              <li><a href="#" className="transition-colors duration-200 font-medium" style={{ color: '#FFFFFF' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#3399FF'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}>ABOUT US</a></li>
              <li><a href="#" className="transition-colors duration-200 font-medium" style={{ color: '#FFFFFF' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#3399FF'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}>OUR TEAM</a></li>
              <li><a href="#" className="transition-colors duration-200 font-medium" style={{ color: '#FFFFFF' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#3399FF'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}>CAREERS</a></li>
              <li><a href="#" className="transition-colors duration-200 font-medium" style={{ color: '#FFFFFF' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = '#3399FF'}
                     onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}>CONTACT</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-white">CONTACT INFO</h3>
            <ul className="space-y-2" style={{ color: '#FFFFFF' }}>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                Kenya
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                +254721752466 / +254733386713
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                INFO@JEFFROOFING.COM
              </li>
              <li className="flex items-center">
                <Clock size={16} className="mr-2" />
                MON-FRI: 7AM-6PM
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 text-center" style={{ borderTop: '1px solid #222222', color: '#FFFFFF' }}>
          <p>&copy; 2025 JEFF ROOFING & INTERIORS. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
