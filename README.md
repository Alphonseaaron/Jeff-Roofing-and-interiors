# Jeff Roofing & Interiors - Construction Management Platform

A comprehensive construction management platform for Jeff Roofing & Interiors featuring project tracking, client communication, and administrative tools with real-time updates and role-based access control.

## Overview

This application provides:
- **Landing Page**: Professional showcase with services, portfolio, and contact form
- **Admin Dashboard**: Complete project management, team assignment, and client communication
- **Client Portal**: Project overview, progress tracking, payment status, and messaging
- **Real-time Features**: Live updates via Firebase Firestore
- **Responsive Design**: Optimized for all devices with dark theme support

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with custom Starlink-inspired design system
- **Radix UI** primitives with shadcn/ui components
- **TanStack Query** for server state management
- **Wouter** for client-side routing
- **React Hook Form** with Zod validation

### Backend
- **Node.js** with Express.js
- **TypeScript** (ESM modules)
- **Firebase Auth** for authentication
- **Firebase Firestore** for real-time data
- **Firebase Storage** for file uploads
- **Neon Database** (PostgreSQL) with Drizzle ORM

## Getting Started

### Prerequisites
- Node.js 18 or higher
- Firebase project with Firestore, Auth, and Storage enabled
- Neon Database (PostgreSQL) instance

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jeff-roofing-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Database
DATABASE_URL=your_neon_database_url
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Deployment to Firebase Hosting

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase Hosting

In your project root directory:

```bash
firebase init hosting
```

When prompted:
- **Select your Firebase project** (or create a new one)
- **Set public directory**: Enter `dist`
- **Configure as single-page app**: Choose `Yes`
- **Set up automatic builds**: Choose `No` (we'll handle builds manually)
- **Overwrite index.html**: Choose `No`

### Step 4: Configure Firebase Hosting

Create or update `firebase.json` in your project root:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(eot|otf|ttf|ttc|woff|font.css)",
        "headers": [
          {
            "key": "Access-Control-Allow-Origin",
            "value": "*"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=604800"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=604800"
          }
        ]
      }
    ]
  }
}
```

### Step 5: Build and Deploy

1. **Build the application for production:**
```bash
npm run build
```

2. **Deploy to Firebase Hosting:**
```bash
firebase deploy --only hosting
```

3. **View your deployed site:**
After deployment completes, Firebase will provide your hosting URL:
```
Hosting URL: https://your-project-id.web.app
```

### Step 6: Set Up Environment Variables for Production

1. **Configure Firebase environment variables:**
```bash
firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"
```

2. **For client-side environment variables**, ensure they're prefixed with `VITE_` and configured in your build environment.

### Step 7: Custom Domain (Optional)

To use a custom domain:

1. **Add custom domain in Firebase Console:**
   - Go to Firebase Console → Hosting
   - Click "Add custom domain"
   - Follow the verification steps

2. **Update DNS records** as instructed by Firebase

### Deployment Scripts

Add these scripts to your `package.json` for easier deployment:

```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && firebase deploy --only hosting",
    "deploy:preview": "npm run build && firebase hosting:channel:deploy preview"
  }
}
```

### Continuous Deployment (Optional)

For automatic deployments from GitHub:

1. **Set up GitHub Actions:**
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
        VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
        VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
        VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
        VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
        VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
    
    - name: Deploy to Firebase
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
        projectId: your-project-id
```

2. **Add secrets to GitHub repository:**
   - Go to GitHub repo → Settings → Secrets
   - Add all your environment variables as secrets

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── contexts/       # React contexts
├── server/                 # Backend Express application
├── shared/                 # Shared types and schemas
├── public/                 # Static assets
└── dist/                   # Build output (created after build)
```

## Key Features

### Authentication & Authorization
- Firebase Auth integration
- Role-based access control (admin, team_leader, client)
- Protected routes and components

### Real-time Communication
- Live project updates via Firestore
- Real-time messaging system
- Instant notifications

### Project Management
- Complete project lifecycle tracking
- Team assignment and management
- Payment tracking and milestones
- Photo galleries and documentation

### Responsive Design
- Mobile-first approach
- Dark theme with Starlink-inspired aesthetics
- Professional construction industry branding

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `DATABASE_URL` | Neon PostgreSQL database URL | Yes |

## Support & Contact

- **Business**: Jeff Roofing & Interiors
- **Location**: Kenya
- **Phone**: +254721752466 / +254733386713
- **Email**: info@jeffroofing.com
- **TikTok**: @engineerjeff
- **Facebook**: @jeffroofinginteriors

---

© 2025 Jeff Roofing & Interiors. All rights reserved.