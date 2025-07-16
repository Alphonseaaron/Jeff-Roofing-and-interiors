import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectOverview } from "@/components/client/ProjectOverview";
import { PaymentTracker } from "@/components/client/PaymentTracker";
import { ProgressTimeline } from "@/components/client/ProgressTimeline";
import { MessageInterface } from "@/components/client/MessageInterface";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { logout } from "@/lib/auth";
import { useLocation } from "wouter";
import { PROJECT_STAGES } from "@shared/schema";
import { HardHat, MessageSquare, Calendar, FileDown } from "lucide-react";

export function Client() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { data: projects } = useProjects({ clientId: user?.id });

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  // Get the active project or first project
  const activeProject = projects?.find(p => p.status === PROJECT_STAGES.IN_PROGRESS) || projects?.[0];

  return (
    <ProtectedRoute requiredRole="client">
      <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#000000', borderBottom: '1px solid #333333' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center min-w-0 flex-1">
                <div className="text-xl sm:text-2xl mr-2 sm:mr-3 font-bold flex-shrink-0" style={{ color: '#3399FF' }}>J</div>
                <span className="text-sm sm:text-lg lg:text-xl font-bold uppercase tracking-wider text-white truncate">JEFF ROOFING CLIENT PORTAL</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-gray-800">
                  <Bell size={18} className="sm:w-5 sm:h-5" />
                  <span className="absolute -top-1 -right-1 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center" style={{ backgroundColor: '#3399FF' }}>
                    2
                  </span>
                </Button>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3399FF' }}>
                    <span className="text-white text-xs sm:text-sm font-semibold">
                      {user?.displayName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-white">{user?.displayName}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="border-white text-white hover:bg-white hover:text-black text-xs sm:text-sm"
                  >
                    LOGOUT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
              Welcome back, {user?.displayName?.split(' ')[0]}!
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">Here's an overview of your current projects</p>
          </div>

          {!activeProject ? (
            <Card className="dark:bg-surface-medium dark:border-border">
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <HardHat size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">No Active Projects</h3>
                <p className="text-secondary mb-6">You don't have any active projects at the moment.</p>
                <Button onClick={() => setLocation("/#contact")} className="bg-primary-blue hover:bg-primary-blue-hover">
                  Request a Quote
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Main Project Overview */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ProjectOverview />
                <ProgressTimeline progress={activeProject.progress} />

                {/* Latest Photos */}
                <Card style={{ backgroundColor: '#111111', borderColor: '#333333' }}>
                  <CardHeader>
                    <CardTitle className="text-white">Latest Progress Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                      {/* Stock photos for demonstration */}
                      <div className="relative group cursor-pointer">
                        <img 
                          src="https://images.unsplash.com/photo-1558618047-b1a3f8e6e0d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                          alt="Recent roofing work progress" 
                          className="w-full h-20 sm:h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition rounded-lg flex items-center justify-center">
                          <FileDown className="text-white opacity-0 group-hover:opacity-100 transition" size={16} />
                        </div>
                      </div>
                      
                      <div className="relative group cursor-pointer">
                        <img 
                          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                          alt="Construction team working on roof installation" 
                          className="w-full h-20 sm:h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition rounded-lg flex items-center justify-center">
                          <FileDown className="text-white opacity-0 group-hover:opacity-100 transition" size={16} />
                        </div>
                      </div>
                      
                      <div className="relative group cursor-pointer">
                        <img 
                          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                          alt="Completed roofing section detail" 
                          className="w-full h-20 sm:h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition rounded-lg flex items-center justify-center">
                          <FileDown className="text-white opacity-0 group-hover:opacity-100 transition" size={16} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 sm:space-y-6">
                <PaymentTracker projectId={activeProject.id} />

                {/* Team Information */}
                <Card style={{ backgroundColor: '#111111', borderColor: '#333333' }}>
                  <CardHeader>
                    <CardTitle className="text-white">Your Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ backgroundColor: '#3399FF' }}>
                          <span className="text-white font-semibold text-xs sm:text-sm">JD</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white text-sm sm:text-base">John Doe</p>
                          <p className="text-xs sm:text-sm text-gray-300">Project Leader</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ backgroundColor: '#3399FF' }}>
                          <span className="text-white font-semibold text-xs sm:text-sm">RS</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white text-sm sm:text-base">Rick Smith</p>
                          <p className="text-xs sm:text-sm text-gray-300">Lead Roofer</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ backgroundColor: '#3399FF' }}>
                          <span className="text-white font-semibold text-xs sm:text-sm">TJ</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white text-sm sm:text-base">Tom Johnson</p>
                          <p className="text-xs sm:text-sm text-gray-300">Assistant</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card style={{ backgroundColor: '#111111', borderColor: '#333333' }}>
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 sm:space-y-3">
                      <Button variant="outline" className="w-full justify-start text-xs sm:text-sm border-gray-600 text-white hover:bg-gray-800">
                        <MessageSquare size={14} className="mr-2" />
                        Send Message
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start text-xs sm:text-sm border-gray-600 text-white hover:bg-gray-800">
                        <Calendar size={14} className="mr-2" />
                        Schedule Visit
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start text-xs sm:text-sm border-gray-600 text-white hover:bg-gray-800">
                        <FileDown size={14} className="mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Messages Section */}
          {activeProject && (
            <div className="mt-6 sm:mt-8">
              <MessageInterface projectId={activeProject.id} />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
