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
    setTimeout(() => setLocation("/login"), 0);
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    setTimeout(() => setLocation("/"), 0);
    return null;
  }

  return <>{children}</>;
}
