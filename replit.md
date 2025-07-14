# Jeff Roofing & Interiors - Construction Management Platform

## Overview

This is a comprehensive construction management platform for Jeff Roofing & Interiors that provides project tracking, client communication, and administrative tools. The application features a modern web interface with real-time updates and role-based access control.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state, React Context for auth
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Firebase Auth
- **File Storage**: Firebase Storage
- **Real-time Data**: Firestore for real-time updates

### Database Schema
- **Users**: Role-based (admin, team_leader, client) with profile information
- **Projects**: Core project data with status tracking and progress
- **Messages**: Project-based communication system
- **Payments**: Payment tracking with status management
- **Photos**: Project photo galleries with metadata
- **Team Members**: Project team assignments and roles

## Key Components

### Landing Page
- Hero section with background imagery
- Services showcase grid
- Portfolio gallery with lightbox functionality
- Customer testimonials carousel
- Contact form with Firebase integration
- Professional footer with company information

### Admin Dashboard
- Comprehensive project management interface
- Team assignment and management tools
- Client communication panel
- Payment tracking and management
- Progress monitoring with charts
- Sidebar navigation for all admin functions

### Client Portal
- Project overview with real-time updates
- Progress timeline visualization
- Photo galleries for project documentation
- Payment status tracking
- Direct messaging with project team
- Document access and approvals

### Shared Components
- Authentication system with role-based access
- Real-time notification system
- Loading states and error handling
- Modal dialogs and form components
- Responsive navigation components

## Data Flow

### Authentication Flow
1. Firebase Auth handles user authentication
2. User profile data stored in Firestore
3. Role-based routing and component access
4. Persistent session management

### Project Management Flow
1. Admin creates projects and assigns team members
2. Real-time updates via Firestore subscriptions
3. Client portal reflects current project status
4. Message system enables direct communication
5. Payment tracking integrates with project milestones

### File Upload Flow
1. Files uploaded to Firebase Storage
2. URLs stored in Firestore with metadata
3. Organized by project and file type
4. Automatic compression and optimization

## External Dependencies

### Core Services
- **Firebase**: Authentication, Firestore database, and file storage
- **Neon Database**: PostgreSQL hosting for structured data
- **Vercel/Netlify**: Deployment and hosting platform

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Inter Font**: Typography via Google Fonts

### Development Tools
- **Vite**: Build tool and development server
- **ESBuild**: Fast JavaScript bundler
- **TypeScript**: Type safety and developer experience
- **Drizzle Kit**: Database migration and management

## Deployment Strategy

### Development Environment
- Local development with Vite dev server
- Hot module replacement for fast iteration
- Environment variables for Firebase configuration
- Database migrations via Drizzle Kit

### Production Build
1. Vite builds optimized frontend bundle
2. ESBuild compiles server code for Node.js
3. Static assets served from `/dist/public`
4. Server runs from `/dist/index.js`

### Environment Configuration
- **Development**: Local Firebase emulators optional
- **Production**: Live Firebase project with Neon database
- **Environment Variables**: Firebase config, database URLs, API keys

### Database Management
- Drizzle ORM for type-safe database operations
- Migration files in `/migrations` directory
- Schema definitions in `/shared/schema.ts`
- Push-based deployment with `npm run db:push`

The architecture emphasizes real-time collaboration, role-based access control, and professional project management workflows suitable for a construction business.