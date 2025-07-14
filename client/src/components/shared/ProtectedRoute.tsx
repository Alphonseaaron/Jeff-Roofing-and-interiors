import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@shared/schema";
import { PageLoading } from "@/components/ui/loading";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return <PageLoading />;
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    setLocation("/");
    return null;
  }

  return <>{children}</>;
}
