import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/ui/loading";
import { PROJECT_STAGES } from "@shared/schema";

export function ProjectTable() {
  const { user } = useAuth();
  const { data: projects, isLoading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  if (isLoading) {
    return <Loading text="Loading projects..." />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-600">Error loading projects. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">No projects found.</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      backgroundColor: status === PROJECT_STAGES.COMPLETED ? '#10B981' : 
                      status === PROJECT_STAGES.IN_PROGRESS ? '#3399FF' : '#F59E0B',
      color: '#FFFFFF',
      border: 'none',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      fontSize: '12px',
      fontWeight: 'bold'
    };
    
    switch (status) {
      case PROJECT_STAGES.PENDING:
        return <Badge style={styles}>PENDING</Badge>;
      case PROJECT_STAGES.IN_PROGRESS:
        return <Badge style={styles}>IN PROGRESS</Badge>;
      case PROJECT_STAGES.COMPLETED:
        return <Badge style={styles}>COMPLETED</Badge>;
      default:
        return <Badge style={styles}>{status.toUpperCase()}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider text-white">PROJECT MANAGEMENT</h2>
          <p className="text-white mt-2">Monitor and manage construction projects</p>
        </div>
        <Button 
          className="btn-primary"
          style={{ backgroundColor: '#3399FF', color: '#FFFFFF' }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.backgroundColor = '#FFFFFF'; 
            e.currentTarget.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3399FF';
            e.currentTarget.style.color = '#FFFFFF';
          }}
        >
          <Plus size={16} className="mr-2" />
          NEW PROJECT
        </Button>
      </div>
      
      <Card style={{ backgroundColor: '#111111', borderColor: '#333333' }}>
        <CardHeader>
          <CardTitle className="text-white font-bold uppercase tracking-wider">ACTIVE PROJECTS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #333333' }}>
                  <th className="text-left py-3 px-4 font-medium text-white uppercase tracking-wider">PROJECT</th>
                  <th className="text-left py-3 px-4 font-medium text-white uppercase tracking-wider">CLIENT</th>
                  <th className="text-left py-3 px-4 font-medium text-white uppercase tracking-wider">STATUS</th>
                  <th className="text-left py-3 px-4 font-medium text-white uppercase tracking-wider">PROGRESS</th>
                  <th className="text-left py-3 px-4 font-medium text-white uppercase tracking-wider">DUE DATE</th>
                  <th className="text-left py-3 px-4 font-medium text-white uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} style={{ borderBottom: '1px solid #333333' }} className="hover:bg-gray-900/30 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-white">{project.title}</p>
                        <p className="text-sm text-white opacity-70">{project.address}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-white">Client ID: {project.clientId}</p>
                        <p className="text-sm text-white opacity-70">Contact info</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(project.stage)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2 w-16">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${project.progress || 0}%`,
                              backgroundColor: '#3399FF'
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-white">{project.progress || 0}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-white">
                        {project.endDate ? new Date(project.endDate).toLocaleDateString() : "TBD"}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-white hover:bg-gray-700"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-white hover:bg-gray-700"
                        >
                          <Edit size={16} />
                        </Button>
                        <TeamModal projectId={project.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
