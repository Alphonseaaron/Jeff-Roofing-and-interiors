import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { assignTeamMember } from "@/lib/firestore";
import { useUsers } from "@/hooks/useUsers";
import { USER_ROLES, DASHBOARD_FEATURES, DashboardFeature } from "@shared/schema";

interface TeamModalProps {
  projectId: string;
  onSuccess?: () => void;
}

const dashboardFeatures = [
  { id: DASHBOARD_FEATURES.DASHBOARD, label: "Dashboard Overview", description: "View project statistics and summary" },
  { id: DASHBOARD_FEATURES.PROJECTS, label: "Project Management", description: "Access and manage project details" },
  { id: DASHBOARD_FEATURES.TEAM, label: "Team Management", description: "Manage team assignments and roles" },
  { id: DASHBOARD_FEATURES.CLIENTS, label: "Client Management", description: "View and manage client information" },
  { id: DASHBOARD_FEATURES.PAYMENTS, label: "Payment Management", description: "Handle payment tracking and processing" },
  { id: DASHBOARD_FEATURES.MESSAGES, label: "Messages", description: "Access project communication" },
  { id: DASHBOARD_FEATURES.NOTIFICATIONS, label: "Notifications", description: "Receive and manage alerts" }
];

export function TeamModal({ projectId, onSuccess }: TeamModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    role: "",
    permissions: [DASHBOARD_FEATURES.DASHBOARD, DASHBOARD_FEATURES.PROJECTS] as DashboardFeature[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { data: users, isLoading: usersLoading } = useUsers();

  const handlePermissionChange = (featureId: DashboardFeature, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, featureId]
        : prev.permissions.filter(p => p !== featureId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userId || !formData.role) {
      toast({
        title: "Missing Information",
        description: "Please select a user and assign a role.",
        variant: "destructive",
      });
      return;
    }

    if (formData.permissions.length === 0) {
      toast({
        title: "No Permissions Selected",
        description: "Please select at least one dashboard feature.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await assignTeamMember({
        projectId,
        userId: formData.userId,
        role: formData.role,
        permissions: formData.permissions
      });

      toast({
        title: "Team Member Assigned",
        description: "The team member has been successfully added with selected permissions.",
      });

      setFormData({ 
        userId: "", 
        role: "", 
        permissions: [DASHBOARD_FEATURES.DASHBOARD, DASHBOARD_FEATURES.PROJECTS] 
      });
      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Assignment Failed",
        description: "Failed to assign team member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter users to exclude clients for team assignment
  const availableUsers = users?.filter(user => user.role !== USER_ROLES.CLIENT) || [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
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
          <Users size={16} className="mr-2" />
          ASSIGN TEAM MEMBER
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" style={{ backgroundColor: '#111111', border: '1px solid #333333' }}>
        <DialogHeader>
          <DialogTitle className="text-white font-bold uppercase tracking-wider">ASSIGN TEAM MEMBER</DialogTitle>
          <DialogDescription className="text-white">
            Select a team member and configure their dashboard permissions for this project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* User Selection */}
            <div>
              <Label htmlFor="userId" className="text-white font-medium uppercase tracking-wider">SELECT USER</Label>
              <Select 
                value={formData.userId} 
                onValueChange={(value) => setFormData({ ...formData, userId: value })}
                disabled={usersLoading}
              >
                <SelectTrigger 
                  className="w-full mt-2"
                  style={{ backgroundColor: '#222222', border: '1px solid #444444', color: '#FFFFFF' }}
                >
                  <SelectValue placeholder={usersLoading ? "Loading users..." : "Choose team member"} />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: '#222222', border: '1px solid #444444' }}>
                  {availableUsers.map((user) => (
                    <SelectItem 
                      key={user.id} 
                      value={user.id}
                      className="text-white hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{user.displayName}</span>
                        <span className="text-xs opacity-70 ml-2 uppercase">{user.role}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Role Assignment */}
            <div>
              <Label htmlFor="role" className="text-white font-medium uppercase tracking-wider">PROJECT ROLE</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger 
                  className="w-full mt-2"
                  style={{ backgroundColor: '#222222', border: '1px solid #444444', color: '#FFFFFF' }}
                >
                  <SelectValue placeholder="Assign project role" />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: '#222222', border: '1px solid #444444' }}>
                  <SelectItem value="Project Manager" className="text-white hover:bg-gray-700">PROJECT MANAGER</SelectItem>
                  <SelectItem value="Lead Contractor" className="text-white hover:bg-gray-700">LEAD CONTRACTOR</SelectItem>
                  <SelectItem value="Site Supervisor" className="text-white hover:bg-gray-700">SITE SUPERVISOR</SelectItem>
                  <SelectItem value="Specialist" className="text-white hover:bg-gray-700">SPECIALIST</SelectItem>
                  <SelectItem value="Assistant" className="text-white hover:bg-gray-700">ASSISTANT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dashboard Permissions */}
          <div>
            <Label className="text-white font-medium uppercase tracking-wider mb-4 block">DASHBOARD PERMISSIONS</Label>
            <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto" style={{ backgroundColor: '#0A0A0A', padding: '16px', borderRadius: '8px', border: '1px solid #333333' }}>
              {dashboardFeatures.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-3 p-2 rounded" style={{ backgroundColor: '#111111' }}>
                  <Checkbox
                    id={feature.id}
                    checked={formData.permissions.includes(feature.id)}
                    onCheckedChange={(checked) => handlePermissionChange(feature.id, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label 
                      htmlFor={feature.id} 
                      className="text-white font-medium text-sm cursor-pointer uppercase tracking-wide"
                    >
                      {feature.label}
                    </label>
                    <p className="text-xs opacity-70 text-white mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="border-white text-white hover:bg-white hover:text-black"
            >
              CANCEL
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.userId || !formData.role}
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
              {isSubmitting ? "ASSIGNING..." : "ASSIGN MEMBER"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
