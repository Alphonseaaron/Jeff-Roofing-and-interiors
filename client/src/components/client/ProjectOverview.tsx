import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/ui/loading";
import { PROJECT_STAGES } from "@shared/schema";

export function ProjectOverview() {
  const { user } = useAuth();
  const { data: projects, isLoading, error } = useProjects({
    clientId: user?.id
  });

  if (isLoading) {
    return <Loading text="Loading your projects..." />;
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

  const activeProject = projects.find(p => p.status === PROJECT_STAGES.IN_PROGRESS) || projects[0];

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
          <CardTitle>Current Project: {activeProject.title}</CardTitle>
          {getStatusBadge(activeProject.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Project Details</h3>
            <p className="text-muted-foreground">{activeProject.description}</p>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Address:</strong> {activeProject.address}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Progress</h3>
            <div className="flex items-center space-x-4">
              <Progress value={activeProject.progress} className="flex-1" />
              <span className="text-sm font-medium">{activeProject.progress}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Start Date</p>
              <p className="text-muted-foreground">
                {new Date(activeProject.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="font-medium">Expected Completion</p>
              <p className="text-muted-foreground">
                {activeProject.endDate ? new Date(activeProject.endDate).toLocaleDateString() : "TBD"}
              </p>
            </div>
          </div>

          <div>
            <p className="font-medium">Total Project Value</p>
            <p className="text-2xl font-bold text-primary">
              ${activeProject.totalAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
