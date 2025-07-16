import { HardHat, LayoutDashboard, FolderOpen, Users, UserCircle, CreditCard, MessageSquare, Bell } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "team", label: "Team Management", icon: Users },
  { id: "clients", label: "Clients", icon: UserCircle },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 flex-shrink-0 h-screen" style={{ backgroundColor: '#000000', borderRight: '1px solid #333333' }}>
      <div className="p-4">
        <div className="flex items-center mb-8">
          <div className="text-2xl mr-3 font-bold" style={{ color: '#3399FF' }}>J</div>
          <span className="text-xl font-bold uppercase tracking-wider text-white">JEFF ROOFING ADMIN</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="w-full flex items-center py-2 px-4 rounded transition-colors font-medium uppercase tracking-wider"
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
              <item.icon size={20} className="mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
