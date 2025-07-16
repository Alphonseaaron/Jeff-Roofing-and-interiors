import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "wouter";
import { auth } from "@/lib/firebase";
import { getUserProfile } from "@/lib/auth";
import { User, USER_ROLES } from "@shared/schema";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser.uid);
        setUser(userProfile);
        
        // Auto-redirect based on user role if not on landing page
        if (userProfile && location !== "/" && !location.includes("/login")) {
          if (userProfile.role === USER_ROLES.ADMIN || userProfile.role === USER_ROLES.TEAM_LEADER) {
            if (!location.includes("/admin")) {
              setLocation("/admin");
            }
          } else if (userProfile.role === USER_ROLES.CLIENT) {
            if (!location.includes("/client")) {
              setLocation("/client");
            }
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [location, setLocation]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
