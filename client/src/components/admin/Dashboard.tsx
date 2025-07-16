import { useEffect, useState } from "react";
import { TrendingUp, Users, DollarSign, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjects } from "@/hooks/useProjects";
import { useUsers } from "@/hooks/useUsers";
import { getProjects } from "@/lib/firestore";
import { PROJECT_STAGES } from "@shared/schema";

export function Dashboard() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: users, isLoading: usersLoading } = useUsers();
  const [dashboardStats, setDashboardStats] = useState({
    activeProjects: 0,
    totalRevenue: 0,
    teamMembers: 0,
    clientSatisfaction: 97
  });

  useEffect(() => {
    if (projects && users) {
      const activeProjects = projects.filter(p => 
        p.stage === PROJECT_STAGES.IN_PROGRESS || 
        p.stage === PROJECT_STAGES.PLANNING
      ).length;
      
      const totalRevenue = projects.reduce((sum, project) => sum + (project.totalCost || 0), 0);
      const teamMemberCount = users.filter(u => u.role !== 'client').length;
      
      setDashboardStats({
        activeProjects,
        totalRevenue,
        teamMembers: teamMemberCount,
        clientSatisfaction: 97
      });
    }
  }, [projects, users]);

  const stats = [
    {
      title: "Active Projects",
      value: projectsLoading ? "..." : dashboardStats.activeProjects.toString(),
      change: projects ? `${projects.length} total projects` : "Loading...",
      icon: TrendingUp,
      iconColor: "#3399FF",
      bgColor: "#111111"
    },
    {
      title: "Total Revenue",
      value: projectsLoading ? "..." : `$${(dashboardStats.totalRevenue / 1000).toFixed(0)}K`,
      change: "From active projects",
      icon: DollarSign,
      iconColor: "#3399FF",
      bgColor: "#111111"
    },
    {
      title: "Team Members",
      value: usersLoading ? "..." : dashboardStats.teamMembers.toString(),
      change: `${users?.filter(u => u.role === 'client').length || 0} clients`,
      icon: Users,
      iconColor: "#3399FF",
      bgColor: "#111111"
    },
    {
      title: "Client Satisfaction",
      value: "97%",
      change: "Based on project reviews",
      icon: Star,
      iconColor: "#3399FF",
      bgColor: "#111111"
    }
  ];

  return (
    <div className="p-6" style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-white">DASHBOARD OVERVIEW</h1>
        <p className="text-white mt-2">Monitor your construction projects and team performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} style={{ backgroundColor: '#111111', borderColor: '#333333' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider" style={{ color: '#A1A1A1' }}>{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: stat.bgColor, border: '1px solid #333333' }}
                >
                  <stat.icon size={24} style={{ color: stat.iconColor }} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-white opacity-70">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card style={{ backgroundColor: '#111111', borderColor: '#333333' }}>
          <CardHeader>
            <CardTitle className="text-white font-bold uppercase tracking-wider">RECENT PROJECTS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : projects && projects.length > 0 ? (
                projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="flex items-center space-x-4">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: project.stage === PROJECT_STAGES.COMPLETED ? '#10B981' : 
                                       project.stage === PROJECT_STAGES.IN_PROGRESS ? '#3399FF' : '#F59E0B'
                      }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{project.title}</p>
                      <p className="text-xs text-white opacity-70">Stage: {project.stage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-white opacity-70">No projects found</p>
                  <p className="text-xs text-white opacity-50 mt-2">Create your first project to get started</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#111111', borderColor: '#333333' }}>
          <CardHeader>
            <CardTitle className="text-white font-bold uppercase tracking-wider">TEAM MEMBERS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usersLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : users && users.length > 0 ? (
                users.filter(u => u.role !== 'client').slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center space-x-4">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: '#3399FF' }}
                    >
                      {user.displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{user.displayName}</p>
                      <p className="text-xs text-white opacity-70 uppercase">{user.role}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-white opacity-70">No team members found</p>
                  <p className="text-xs text-white opacity-50 mt-2">Invite team members to get started</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
