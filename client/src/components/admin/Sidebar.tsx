import { HardHat, LayoutDashboard, FolderOpen, Users, UserCircle, CreditCard, MessageSquare, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { DASHBOARD_FEATURES, DashboardFeature, USER_ROLES } from "@shared/schema";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userPermissions?: DashboardFeature[];
}

const allMenuItems = [
  { id: DASHBOARD_FEATURES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { id: DASHBOARD_FEATURES.PROJECTS, label: "Projects", icon: FolderOpen },
  { id: DASHBOARD_FEATURES.TEAM, label: "Team Management", icon: Users },
  { id: DASHBOARD_FEATURES.CLIENTS, label: "Clients", icon: UserCircle },
  { id: DASHBOARD_FEATURES.PAYMENTS, label: "Payments", icon: CreditCard },
  { id: DASHBOARD_FEATURES.MESSAGES, label: "Messages", icon: MessageSquare },
  { id: DASHBOARD_FEATURES.NOTIFICATIONS, label: "Notifications", icon: Bell },
];

export function Sidebar({ activeTab, onTabChange, userPermissions }: SidebarProps) {
  const { user } = useAuth();
  
  // Admins see all features, others see only their permitted features
  const menuItems = user?.role === USER_ROLES.ADMIN 
    ? allMenuItems 
    : allMenuItems.filter(item => userPermissions?.includes(item.id));
  return (
    <div className="w-48 sm:w-64 flex-shrink-0 h-screen" style={{ backgroundColor: '#000000', borderRight: '1px solid #333333' }}>
      <div className="p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-8">
          <div className="text-xl sm:text-2xl mr-0 sm:mr-3 font-bold" style={{ color: '#3399FF' }}>J</div>
          <span className="text-sm sm:text-xl font-bold uppercase tracking-wider text-white text-center sm:text-left">JEFF ROOFING ADMIN</span>
        </div>
        
        <nav className="space-y-1 sm:space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="w-full flex items-center py-2 px-2 sm:px-4 rounded transition-colors font-medium uppercase tracking-wider text-xs sm:text-sm"
              style={{
                backgroundColor: activeTab === item.id ? '#3399FF' : 'transparent',
                color: activeTab === item.id ? '#FFFFFF' : '#FFFFFF'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.backgroundColor = '#333333';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <item.icon size={16} className="mr-2 sm:mr-3 flex-shrink-0" />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
