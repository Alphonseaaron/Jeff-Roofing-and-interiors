import { useState } from "react";
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
    <section id="contact" className="py-20 bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary dark:text-primary mb-4">Get Started Today</h2>
          <p className="text-xl text-secondary dark:text-secondary">Request a free consultation and we'll create your account</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-medium p-8 rounded-xl shadow-sm dark:shadow-black/20">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="name" className="text-primary dark:text-primary font-medium mb-2">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  className="dark:bg-surface-dark dark:border-border"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-primary dark:text-primary font-medium mb-2">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="dark:bg-surface-dark dark:border-border"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="phone" className="text-primary dark:text-primary font-medium mb-2">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="dark:bg-surface-dark dark:border-border"
                />
              </div>
              <div>
                <Label htmlFor="service" className="text-primary dark:text-primary font-medium mb-2">Service Type</Label>
                <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
                  <SelectTrigger className="dark:bg-surface-dark dark:border-border">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential-roofing">Residential Roofing</SelectItem>
                    <SelectItem value="commercial-construction">Commercial Construction</SelectItem>
                    <SelectItem value="interior-design">Interior Design</SelectItem>
                    <SelectItem value="repairs-maintenance">Repairs & Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="message" className="text-primary dark:text-primary font-medium mb-2">Project Details</Label>
              <Textarea
                id="message"
                rows={4}
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
                className="dark:bg-surface-dark dark:border-border"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-blue hover:bg-primary-blue-hover text-white font-semibold py-3 px-6"
            >
              {isSubmitting ? "Creating Account & Sending..." : "Request Free Consultation"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
