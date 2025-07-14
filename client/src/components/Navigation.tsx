import { useState } from "react";
import { HardHat, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/auth";
import { useLocation } from "wouter";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-primary-blue text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <HardHat className="text-secondary-orange text-2xl mr-3" />
            <span className="text-xl font-bold">Jeff Roofing & Interiors</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-secondary-orange transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="hover:text-secondary-orange transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="hover:text-secondary-orange transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-secondary-orange transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  onClick={() => setLocation(user.role === "admin" ? "/admin" : "/client")}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-blue"
                >
                  Dashboard
                </Button>
                <Button
                  onClick={handleLogout}
                  className="bg-secondary-orange hover:bg-secondary-orange-hover"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setLocation("/login")}
                className="bg-secondary-orange hover:bg-secondary-orange-hover"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-primary-blue-hover"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => scrollToSection("services")}
                className="block px-3 py-2 text-base font-medium hover:text-secondary-orange"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="block px-3 py-2 text-base font-medium hover:text-secondary-orange"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block px-3 py-2 text-base font-medium hover:text-secondary-orange"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-base font-medium hover:text-secondary-orange"
              >
                Contact
              </button>
              
              {user ? (
                <>
                  <Button
                    onClick={() => setLocation(user.role === "admin" ? "/admin" : "/client")}
                    variant="outline"
                    className="w-full mt-2 border-white text-white hover:bg-white hover:text-primary-blue"
                  >
                    Dashboard
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="w-full mt-2 bg-secondary-orange hover:bg-secondary-orange-hover"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setLocation("/login")}
                  className="w-full mt-2 bg-secondary-orange hover:bg-secondary-orange-hover"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
