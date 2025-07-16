import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/firestore";
import { signUp } from "@/lib/auth";
import { sendMessage } from "@/lib/firestore";
import { USER_ROLES } from "@shared/schema";

export function ContactForm() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, register the user
      const user = await signUp(formData.email, "TempPassword123!", formData.name, USER_ROLES.CLIENT);
      
      // Then send the consultation message
      await sendMessage({
        projectId: "consultation", // Special project ID for consultation requests
        senderId: user.uid,
        content: `New consultation request from ${formData.name}\n\nService: ${formData.service}\nPhone: ${formData.phone}\nMessage: ${formData.message}`,
      });
      
      toast({
        title: "Consultation request sent!",
        description: "We've created your account and will contact you soon.",
      });
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (error: any) {
      // If user already exists, just send the message
      try {
        await submitContactForm(formData);
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } catch (submitError) {
        toast({
          title: "Error sending message",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={`text-center mb-16 animate-fade-up ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-white">
            INITIATE PROJECT
          </h2>
          <p className="text-xl font-medium" style={{ color: '#A1A1A1' }}>
            ADVANCED CONSULTATION REQUEST SYSTEM
          </p>
        </div>
        
        <div 
          ref={formRef}
          className={`max-w-2xl mx-auto animate-fade-up-delay ${formVisible ? 'visible' : ''}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-white font-semibold uppercase tracking-wider">NAME</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  className="mt-2"
                  style={{ 
                    backgroundColor: '#111111', 
                    borderColor: '#333333', 
                    color: '#FFFFFF'
                  }}
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white font-semibold uppercase tracking-wider">EMAIL</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="mt-2"
                  style={{ 
                    backgroundColor: '#111111', 
                    borderColor: '#333333', 
                    color: '#FFFFFF'
                  }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone" className="text-white font-semibold uppercase tracking-wider">PHONE</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                  className="mt-2"
                  style={{ 
                    backgroundColor: '#111111', 
                    borderColor: '#333333', 
                    color: '#FFFFFF'
                  }}
                />
              </div>
              <div>
                <Label htmlFor="service" className="text-white font-semibold uppercase tracking-wider">SERVICE</Label>
                <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
                  <SelectTrigger 
                    className="mt-2"
                    style={{ 
                      backgroundColor: '#111111', 
                      borderColor: '#333333', 
                      color: '#FFFFFF'
                    }}
                  >
                    <SelectValue placeholder="Select a service" style={{ color: '#A1A1A1' }} />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: '#111111', borderColor: '#333333' }}>
                    <SelectItem value="roofing" style={{ color: '#FFFFFF' }}>ROOFING</SelectItem>
                    <SelectItem value="commercial" style={{ color: '#FFFFFF' }}>COMMERCIAL CONSTRUCTION</SelectItem>
                    <SelectItem value="interior" style={{ color: '#FFFFFF' }}>INTERIOR DESIGN</SelectItem>
                    <SelectItem value="maintenance" style={{ color: '#FFFFFF' }}>REPAIRS & MAINTENANCE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="message" className="text-white font-semibold uppercase tracking-wider">PROJECT DETAILS</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
                rows={4}
                className="mt-2"
                style={{ 
                  backgroundColor: '#111111', 
                  borderColor: '#333333', 
                  color: '#FFFFFF'
                }}
                placeholder="Describe your project requirements..."
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 text-lg font-semibold uppercase tracking-wider transition-all duration-300"
                style={{ 
                  backgroundColor: '#3399FF', 
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#5FB8FF';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3399FF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {isSubmitting ? "SENDING..." : "SEND REQUEST"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}