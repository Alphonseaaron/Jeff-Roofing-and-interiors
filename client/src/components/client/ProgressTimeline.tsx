import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Hammer, ClipboardCheck } from "lucide-react";

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface ProgressTimelineProps {
  progress: number;
}

export function ProgressTimeline({ progress }: ProgressTimelineProps) {
  const steps: TimelineStep[] = [
    {
      id: "assessment",
      title: "Initial Assessment",
      description: "Site inspection and damage assessment completed",
      status: progress >= 25 ? 'completed' : 'pending',
      icon: ClipboardCheck
    },
    {
      id: "materials",
      title: "Material Procurement",
      description: "All materials ordered and delivered",
      status: progress >= 50 ? 'completed' : progress >= 25 ? 'in_progress' : 'pending',
      icon: CheckCircle
    },
    {
      id: "installation",
      title: "Installation Work",
      description: "Roofing installation in progress",
      status: progress >= 75 ? 'completed' : progress >= 50 ? 'in_progress' : 'pending',
      icon: Hammer
    },
    {
      id: "inspection",
      title: "Quality Inspection",
      description: "Final inspection and quality check",
      status: progress >= 100 ? 'completed' : progress >= 75 ? 'in_progress' : 'pending',
      icon: CheckCircle
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  const getTextColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      case 'pending':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex items-center mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${getStatusColor(step.status)}`}>
                {step.status === 'completed' ? (
                  <CheckCircle className="text-white" size={16} />
                ) : step.status === 'in_progress' ? (
                  <Clock className="text-white" size={16} />
                ) : (
                  <step.icon className="text-gray-600" size={16} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{step.title}</h4>
                  <span className={`text-sm ${getTextColor(step.status)}`}>
                    {getStatusText(step.status)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
