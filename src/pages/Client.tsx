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
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
        {/* Header */}
        <div className="bg-white dark:bg-surface-medium border-b border-gray-200 dark:border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="text-primary-blue text-2xl mr-3 font-bold">J</div>
                <span className="text-xl font-bold text-primary dark:text-primary">Jeff Roofing & Interiors Client Portal</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
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
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary dark:text-primary mb-2">
              Welcome back, {user?.displayName?.split(' ')[0]}!
            </h1>
            <p className="text-secondary dark:text-secondary">Here's an overview of your current projects</p>
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
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Project Overview */}
              <div className="lg:col-span-2 space-y-6">
                <ProjectOverview />
                <ProgressTimeline progress={activeProject.progress} />

                {/* Latest Photos */}
                <Card>
                  <CardHeader>
                    <CardTitle>Latest Progress Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {/* Stock photos for demonstration */}
                      <div className="relative group cursor-pointer">
                        <img 
                          src="https://images.unsplash.com/photo-1558618047-b1a3f8e6e0d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                          alt="Recent roofing work progress" 
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition rounded-lg flex items-center justify-center">
                          <FileDown className="text-white opacity-0 group-hover:opacity-100 transition" size={20} />
                        </div>
                      </div>
                      
                      <div className="relative group cursor-pointer">
                        <img 
                          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                          alt="Construction team working on roof installation" 
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition rounded-lg flex items-center justify-center">
                          <FileDown className="text-white opacity-0 group-hover:opacity-100 transition" size={20} />
                        </div>
                      </div>
                      
                      <div className="relative group cursor-pointer">
                        <img 
                          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                          alt="Completed roofing section detail" 
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition rounded-lg flex items-center justify-center">
                          <FileDown className="text-white opacity-0 group-hover:opacity-100 transition" size={20} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <PaymentTracker projectId={activeProject.id} />

                {/* Team Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold">JD</span>
                        </div>
                        <div>
                          <p className="font-medium text-primary">John Doe</p>
                          <p className="text-sm text-secondary">Project Leader</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold">RS</span>
                        </div>
                        <div>
                          <p className="font-medium text-primary">Rick Smith</p>
                          <p className="text-sm text-secondary">Lead Roofer</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold">TJ</span>
                        </div>
                        <div>
                          <p className="font-medium text-primary">Tom Johnson</p>
                          <p className="text-sm text-secondary">Assistant</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <MessageSquare size={16} className="mr-2" />
                        Send Message
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar size={16} className="mr-2" />
                        Schedule Visit
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <FileDown size={16} className="mr-2" />
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
            <div className="mt-8">
              <MessageInterface projectId={activeProject.id} />
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
