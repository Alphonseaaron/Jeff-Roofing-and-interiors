import { z } from "zod";

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEAM_LEADER: 'team_leader',
  CLIENT: 'client'
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Project stages
export const PROJECT_STAGES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
} as const;

export type ProjectStage = typeof PROJECT_STAGES[keyof typeof PROJECT_STAGES];

// Payment status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  DUE: 'due',
  OVERDUE: 'overdue'
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];

// User schema
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string(),
  role: z.enum([USER_ROLES.ADMIN, USER_ROLES.TEAM_LEADER, USER_ROLES.CLIENT]),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const insertUserSchema = userSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Project schema
export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  clientId: z.string(),
  teamLeadId: z.string(),
  status: z.enum([PROJECT_STAGES.PENDING, PROJECT_STAGES.IN_PROGRESS, PROJECT_STAGES.COMPLETED]),
  progress: z.number().min(0).max(100),
  totalAmount: z.number(),
  address: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const insertProjectSchema = projectSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;

// Message schema
export const messageSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  senderId: z.string(),
  content: z.string(),
  timestamp: z.date(),
  isRead: z.boolean().default(false)
});

export const insertMessageSchema = messageSchema.omit({ id: true, timestamp: true, isRead: true });

export type Message = z.infer<typeof messageSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Payment schema
export const paymentSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  description: z.string(),
  amount: z.number(),
  status: z.enum([PAYMENT_STATUS.PENDING, PAYMENT_STATUS.PAID, PAYMENT_STATUS.DUE, PAYMENT_STATUS.OVERDUE]),
  dueDate: z.date(),
  paidDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const insertPaymentSchema = paymentSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type Payment = z.infer<typeof paymentSchema>;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;

// Photo schema
export const photoSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  url: z.string(),
  caption: z.string().optional(),
  uploadedBy: z.string(),
  uploadedAt: z.date()
});

export const insertPhotoSchema = photoSchema.omit({ id: true, uploadedAt: true });

export type Photo = z.infer<typeof photoSchema>;
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;

// Dashboard permissions
export const DASHBOARD_FEATURES = {
  DASHBOARD: 'dashboard',
  PROJECTS: 'projects',
  TEAM: 'team',
  CLIENTS: 'clients',
  PAYMENTS: 'payments',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications'
} as const;

export type DashboardFeature = typeof DASHBOARD_FEATURES[keyof typeof DASHBOARD_FEATURES];

// Team member schema
export const teamMemberSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  userId: z.string(),
  role: z.string(),
  permissions: z.array(z.enum([
    DASHBOARD_FEATURES.DASHBOARD,
    DASHBOARD_FEATURES.PROJECTS,
    DASHBOARD_FEATURES.TEAM,
    DASHBOARD_FEATURES.CLIENTS,
    DASHBOARD_FEATURES.PAYMENTS,
    DASHBOARD_FEATURES.MESSAGES,
    DASHBOARD_FEATURES.NOTIFICATIONS
  ])).default([DASHBOARD_FEATURES.DASHBOARD, DASHBOARD_FEATURES.PROJECTS]),
  assignedAt: z.date()
});

export const insertTeamMemberSchema = teamMemberSchema.omit({ id: true, assignedAt: true });

export type TeamMember = z.infer<typeof teamMemberSchema>;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
