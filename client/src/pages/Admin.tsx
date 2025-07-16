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

  // Removed auto-redirect to allow admins to stay on dashboard

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
      <div className="flex h-screen" style={{ backgroundColor: '#000000' }}>
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <div className="p-4" style={{ backgroundColor: '#000000', borderBottom: '1px solid #333333' }}>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold uppercase tracking-wider text-white">
                {activeTab === "dashboard" && "DASHBOARD OVERVIEW"}
                {activeTab === "projects" && "PROJECT MANAGEMENT"}
                {activeTab === "team" && "TEAM MANAGEMENT"}
                {activeTab === "clients" && "CLIENT MANAGEMENT"}
                {activeTab === "payments" && "PAYMENT MANAGEMENT"}
                {activeTab === "messages" && "MESSAGES"}
                {activeTab === "notifications" && "NOTIFICATIONS"}
              </h1>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-white hover:bg-gray-800"
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: '#3399FF' }}>
                    3
                  </span>
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3399FF' }}>
                    <span className="text-white text-sm font-semibold">
                      {user?.displayName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-white">{user?.displayName}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="border-white text-white hover:bg-white hover:text-black"
                  >
                    LOGOUT
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
