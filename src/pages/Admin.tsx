import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/admin/Sidebar";
import { Dashboard } from "@/components/admin/Dashboard";
import { ProjectTable } from "@/components/admin/ProjectTable";
import { TeamModal } from "@/components/admin/TeamModal";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/auth";
import { useLocation } from "wouter";

export function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Admin starts with the landing page for editing
  useEffect(() => {
    setLocation("/");
  }, [setLocation]);

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "projects":
        return <ProjectTable />;
      case "team":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Team Management</h2>
              <TeamModal projectId="sample-project" />
            </div>
            <p className="text-muted-foreground">Team management features will be implemented here.</p>
          </div>
        );
      case "clients":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Client Management</h2>
            <p className="text-muted-foreground">Client management features will be implemented here.</p>
          </div>
        );
      case "payments":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Payment Management</h2>
            <p className="text-muted-foreground">Payment management features will be implemented here.</p>
          </div>
        );
      case "messages":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Messages</h2>
            <p className="text-muted-foreground">Message management features will be implemented here.</p>
          </div>
        );
      case "notifications":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Notifications</h2>
            <p className="text-muted-foreground">Notification management features will be implemented here.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex h-screen bg-gray-100 dark:bg-surface-dark">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <div className="bg-white dark:bg-surface-medium border-b border-gray-200 dark:border-border p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-primary dark:text-primary">
                {activeTab === "dashboard" && "Dashboard Overview"}
                {activeTab === "projects" && "Project Management"}
                {activeTab === "team" && "Team Management"}
                {activeTab === "clients" && "Client Management"}
                {activeTab === "payments" && "Payment Management"}
                {activeTab === "messages" && "Messages"}
                {activeTab === "notifications" && "Notifications"}
              </h1>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.displayName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium dark:text-primary">{user?.displayName}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </div>
    </ProtectedRoute>
  );
}
