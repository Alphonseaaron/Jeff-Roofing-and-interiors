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
    <div className="w-64 bg-primary-blue text-white flex-shrink-0 h-screen">
      <div className="p-4">
        <div className="flex items-center mb-8">
          <HardHat className="text-secondary-orange text-2xl mr-3" />
          <span className="text-xl font-bold">Jeff Roofing Admin</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center py-2 px-4 rounded transition-colors ${
                activeTab === item.id
                  ? "bg-primary-blue-hover text-white"
                  : "text-gray-300 hover:bg-primary-blue-hover hover:text-white"
              }`}
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
