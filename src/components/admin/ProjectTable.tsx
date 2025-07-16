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
    switch (status) {
      case PROJECT_STAGES.PENDING:
        return <Badge variant="outline" className="status-pending">Pending</Badge>;
      case PROJECT_STAGES.IN_PROGRESS:
        return <Badge variant="outline" className="status-in-progress">In Progress</Badge>;
      case PROJECT_STAGES.COMPLETED:
        return <Badge variant="outline" className="status-completed">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Recent Projects</CardTitle>
          <Button variant="outline">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Project</th>
                <th className="text-left py-3 px-4 font-medium">Client</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Progress</th>
                <th className="text-left py-3 px-4 font-medium">Due Date</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-sm text-muted-foreground">{project.address}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">Client ID: {project.clientId}</p>
                      <p className="text-sm text-muted-foreground">Contact info</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(project.status)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Progress value={project.progress} className="w-16" />
                      <span className="text-sm">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm">
                      {project.endDate ? new Date(project.endDate).toLocaleDateString() : "TBD"}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
