export * from '@shared/schema';

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
}

export interface ProjectWithClient extends Project {
  client: User;
  teamLead: User;
}

export interface ProjectWithDetails extends ProjectWithClient {
  payments: Payment[];
  photos: Photo[];
  messages: Message[];
  teamMembers: (TeamMember & { user: User })[];
}

export interface DashboardStats {
  activeProjects: number;
  totalRevenue: number;
  teamMembers: number;
  clientSatisfaction: number;
}

export interface NotificationData {
  id: string;
  type: 'message' | 'payment' | 'project_update' | 'team_assignment';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  projectId?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'roofing' | 'interior' | 'commercial';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export * from '@shared/schema';
