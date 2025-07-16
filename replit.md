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

## Recent Development Progress (January 2025)

### Dark/Light Theme System Implementation
- Created sophisticated theme context with localStorage persistence
- Implemented custom CSS variables for seamless theme switching
- Added theme toggle with sun/moon icons throughout the application
- Enhanced visual elements with dark mode support across all components

### Visual Identity Enhancement
- Implemented capital "J" logo branding system
- Created custom SVG favicon with construction-themed design
- Updated all header elements to use consistent "J" branding
- Enhanced login screen with theme toggle and modern aesthetics

### Landing Page Improvements
- Added fullscreen gallery with navigation controls
- Implemented "Why Choose BuildPro?" section with key features
- Enhanced contact form with dark theme support
- Added sophisticated animations and card hover effects

### Admin Experience Enhancement
- Configured admin routing to start with landing page for inline editing
- Applied consistent dark mode styling to admin dashboard
- Enhanced sidebar and header components with theme support
- Improved admin authentication flow and user experience

### Client Portal Enhancements
- Enhanced project overview with detailed progress tracking
- Added payment status visualization with milestones
- Improved project detail cards with dark theme support
- Enhanced messaging interface with theme-aware styling

### Technical Improvements
- Enhanced HTML metadata with proper SEO tags
- Improved favicon implementation with SVG support
- Added comprehensive Open Graph meta tags
- Enhanced accessibility with proper color contrast in both themes

## Major Architectural Update (January 2025)

### Complete Starlink-Inspired Dark Theme Implementation
- Implemented full CSS reset with comprehensive dark theme system
- Created custom Starlink-inspired color palette (#000000, #111111, #3399FF, #A1A1A1)
- Applied flat design principles removing all gradients, shadows, and bright colors
- Updated all typography to use uppercase styling with letter-spacing for headings
- Converted all components to use consistent dark theme styling
- Enhanced button system with proper hover states and transitions
- Updated form inputs with dark background and proper focus states
- Applied theme consistently across Navigation, Hero, Services, Footer, and ContactForm components
- Ensured mobile responsiveness throughout the new design system

### Complete Website Restructuring (January 2025)
- Removed all existing images and implemented only uploaded construction project images
- Created full-screen hero section with uploaded background image and black overlay
- Redesigned Portfolio gallery with clean 16:9 grid layout using only uploaded images
- Updated all section titles to use Starlink-style uppercase messaging
- Removed testimonials section for cleaner, more minimalist design
- Applied consistent Starlink color scheme across all components (#3399FF, #000000, #111111, #A1A1A1)
- Transformed navigation, services, why choose, contact form, and footer to match Starlink aesthetic
- Implemented flat styling with no borders, shadows, or decorative elements