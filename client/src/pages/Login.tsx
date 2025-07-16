import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import { signIn, signUp, getUserProfile } from "@/lib/auth";
import { useLocation } from "wouter";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import { USER_ROLES } from "@shared/schema";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await signIn(loginData.email, loginData.password);
      const userProfile = await getUserProfile(user.uid);
      
      toast({
        title: "Access Granted",
        description: "Welcome to the system",
      });
      
      // Role-based redirect
      if (userProfile?.role === USER_ROLES.ADMIN) {
        setLocation("/admin");
      } else if (userProfile?.role === USER_ROLES.TEAM_LEADER) {
        setLocation("/admin"); // Team leaders also use admin dashboard
      } else if (userProfile?.role === USER_ROLES.CLIENT) {
        setLocation("/client");
      } else {
        setLocation("/"); // Default to landing page
      }
    } catch (error: any) {
      toast({
        title: "Access Denied",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const user = await signUp(signupData.email, signupData.password, signupData.name, USER_ROLES.CLIENT);
      const userProfile = await getUserProfile(user.uid);
      
      toast({
        title: "Account Created",
        description: "Welcome to Jeff Roofing & Interiors",
      });
      
      // Role-based redirect (new accounts default to client)
      if (userProfile?.role === USER_ROLES.ADMIN) {
        setLocation("/admin");
      } else if (userProfile?.role === USER_ROLES.TEAM_LEADER) {
        setLocation("/admin");
      } else {
        setLocation("/client"); // Default for new client accounts
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#000000' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-6">
            <div className="text-3xl sm:text-4xl mr-2 sm:mr-4 font-bold" style={{ color: '#3399FF' }}>J</div>
            <h1 className="text-lg sm:text-2xl font-bold uppercase tracking-wider text-white">JEFF ROOFING & INTERIORS</h1>
          </div>
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={() => setLocation("/")}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft size={20} />
            </Button>
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </div>
        </div>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="text-center">
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <div 
                className="grid w-full grid-cols-2 mb-6 rounded-lg p-1" 
                style={{ backgroundColor: '#1F1F1F', border: '1px solid #333333' }}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-sm font-medium uppercase tracking-wider transition-colors duration-200 py-2 px-4 rounded"
                  style={{
                    backgroundColor: activeTab === "login" ? '#333333' : 'transparent',
                    color: activeTab === "login" ? '#FFFFFF' : '#A1A1A1',
                    border: 'none'
                  }}
                >
                  LOGIN
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className="text-sm font-medium uppercase tracking-wider transition-colors duration-200 py-2 px-4 rounded"
                  style={{
                    backgroundColor: activeTab === "signup" ? '#333333' : 'transparent',
                    color: activeTab === "signup" ? '#FFFFFF' : '#A1A1A1',
                    border: 'none'
                  }}
                >
                  REGISTER
                </button>
              </div>
              
              {activeTab === "login" && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-white font-semibold uppercase tracking-wider">EMAIL</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-white font-semibold uppercase tracking-wider">PASSWORD</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full font-semibold uppercase tracking-wider transition-all duration-300"
                    disabled={isLoading}
                    style={{ 
                      backgroundColor: '#3399FF', 
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#5FB8FF';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#3399FF';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {isLoading ? "AUTHENTICATING..." : "SIGN IN"}
                  </Button>
                </form>
              )}
              
              {activeTab === "signup" && (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name" className="text-white font-semibold uppercase tracking-wider">NAME</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your full name"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      required
                      className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email" className="text-white font-semibold uppercase tracking-wider">EMAIL</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password" className="text-white font-semibold uppercase tracking-wider">PASSWORD</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password" className="text-white font-semibold uppercase tracking-wider">CONFIRM PASSWORD</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                      className="mt-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full font-semibold uppercase tracking-wider transition-all duration-300"
                    disabled={isLoading}
                    style={{ 
                      backgroundColor: '#3399FF', 
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#5FB8FF';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#3399FF';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                  </Button>
                </form>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}