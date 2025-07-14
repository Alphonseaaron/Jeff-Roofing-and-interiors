import { TrendingUp, Users, DollarSign, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Active Projects",
    value: "24",
    change: "+12% from last month",
    icon: TrendingUp,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Total Revenue",
    value: "$485K",
    change: "+8% from last month",
    icon: DollarSign,
    iconColor: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Team Members",
    value: "18",
    change: "+2 new this month",
    icon: Users,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    title: "Client Satisfaction",
    value: "97%",
    change: "+3% from last month",
    icon: Star,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-100"
  }
];

export function Dashboard() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                  <stat.icon className={stat.iconColor} size={24} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Johnson Roof Project completed</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New client inquiry received</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Payment reminder sent to TechCorp</p>
                <p className="text-xs text-muted-foreground">6 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
