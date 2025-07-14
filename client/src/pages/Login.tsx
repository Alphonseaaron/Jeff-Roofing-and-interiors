import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import { signIn, signUp } from "@/lib/auth";
import { useLocation } from "wouter";
import { HardHat, Sun, Moon } from "lucide-react";
import { USER_ROLES } from "@shared/schema";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(loginData.email, loginData.password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      setLocation("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const displayName = loginData.email.split('@')[0];
      await signUp(loginData.email, "TempPassword123!", displayName, USER_ROLES.CLIENT);
      toast({
        title: "Account created successfully",
        description: "Welcome to Jeff Roofing & Interiors! We'll contact you soon.",
      });
      setLocation("/");
    } catch (error: any) {
      toast({
        title: "Request failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-light dark:bg-surface-dark px-4">
      <Card className="w-full max-w-md dark:bg-surface-medium dark:border-border">
        <CardHeader className="text-center">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <div className="text-primary-blue text-4xl font-bold">J</div>
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="text-primary dark:text-primary hover:bg-primary/10"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </div>
          <CardTitle className="text-2xl dark:text-primary">Jeff Roofing & Interiors</CardTitle>
          <CardDescription className="dark:text-secondary">Access your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="consultation">Free Consultation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary-blue hover:bg-primary-blue-hover"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="consultation">
              <form onSubmit={handleConsultation} className="space-y-4">
                <div>
                  <Label htmlFor="consultation-email">Email</Label>
                  <Input
                    id="consultation-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <p>We'll create your account and send you a message to get started with your free consultation.</p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-secondary-orange hover:bg-secondary-orange-hover"
                  disabled={isLoading}
                >
                  {isLoading ? "Setting up consultation..." : "Request Free Consultation"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
