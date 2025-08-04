# 🏠 Zira Technologies - Complete Localhost Setup Guide

## 📋 Prerequisites

Make sure you have these installed on your local machine:

### Required Software:
- **Node.js** (version 18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- **Git** (optional, for version control)

### Verify Installation:
```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show 9.0.0 or higher
```

## 🚀 Step 1: Get the Project Files

### Option A: Download Project Files
1. Download all project files from your development environment
2. Create a new folder: `mkdir ziratech-website`
3. Copy all files into this folder

### Option B: Clone from Repository (if available)
```bash
git clone [your-repository-url]
cd ziratech-website
```

## 📦 Step 2: Install Dependencies

Navigate to your project folder and install dependencies:

```bash
cd ziratech-website
npm install
```

This will install all required packages including:
- React & TypeScript
- Vite (build tool)
- Tailwind CSS
- ShadCN/UI components
- Supabase client
- And 460+ other dependencies

## 🔧 Step 3: Environment Setup

### Create Environment File
Create a `.env.local` file in your project root:

```env
# Zira Technologies - Local Environment Variables
# PostgreSQL Database Configuration via Supabase

# Your Supabase Project URL
VITE_SUPABASE_URL=https://eflkozuqjcjsswiwqckl.supabase.co

# Your Supabase Anon Key (Publishable Key)
VITE_SUPABASE_ANON_KEY=sb_publishable_g_VVv6zuB6zj_18i-Xj7Jg_uu60LpR8

# Supabase Service Role Key (Secret Key)
SUPABASE_SERVICE_ROLE_KEY=sb_secret_O612eal9M_1g8kSo9hmSew_1DW5kTp1

# Database Connection (for direct access if needed)
DATABASE_URL=postgresql://postgres:Sirgeorge.12@db.eflkozuqjcjsswiwqckl.supabase.co:5432/postgres
```

## 🗄️ Step 4: Database Setup

### Option 1: Use Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard/project/eflkozuqjcjsswiwqckl

2. **Execute Database Schema:**
   - Go to "SQL Editor" in the left sidebar
   - Create a new query
   - Copy the contents of `database-schema.sql`
   - Paste and click "Run"

### Option 2: Use Command Line
```bash
# If you have psql installed
psql "postgresql://postgres:Sirgeorge.12@db.eflkozuqjcjsswiwqckl.supabase.co:5432/postgres" -f database-schema.sql
```

### Option 3: Mock Database (for quick testing)
If you want to test without setting up the real database:

1. **Rename your `.env.local` to `.env.local.backup`**
2. **Create a new `.env.local` with mock values:**
```env
VITE_SUPABASE_URL=https://placeholder.supabase.co
VITE_SUPABASE_ANON_KEY=placeholder-key
```

This will use the mock database for testing.

## 🚀 Step 5: Run the Development Server

Start your localhost server:

```bash
npm run dev
```

You should see output like:
```
VITE v5.4.19  ready in 306 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.xxx:5173/
```

## 🌐 Step 6: Access Your Website

Open your web browser and go to:
- **http://localhost:5173/** (or whatever port Vite shows)

You should see:
- ✅ Zira Technologies homepage
- ✅ Database status indicator (top-right corner)
- ✅ Full navigation menu
- ✅ Responsive design

## 🧪 Step 7: Test Features

### Test Database Connection:
- Check the **Database Status** component on the homepage
- Should show "Connected" in green if database is set up
- Should show "Connected, but tables need to be created" if database setup is needed

### Test Navigation:
- Home page: `http://localhost:5173/`
- Blog: `http://localhost:5173/blog`
- Admin: `http://localhost:5173/admin`
- About sections via smooth scrolling

### Test Admin Features:
- Go to: `http://localhost:5173/admin`
- Test login functionality
- Access dashboard at: `http://localhost:5173/admin/dashboard`

## 📁 Project Structure

```
ziratech-website/
├── public/                 # Static assets
│   ├── zira-logo.webp     # Your company logo
│   ├── favicon.ico        # Browser favicon
│   └── data/              # Mock data (if using)
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # ShadCN UI components
│   │   ├── admin/        # Admin dashboard components
│   │   └── ...           # Other components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities
│   ├── services/         # API services
│   └── integrations/     # Third-party integrations
├── .env.local            # Environment variables
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
└── tailwind.config.ts    # Tailwind CSS config
```

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🛠️ Troubleshooting

### Port Issues:
If port 5173 is busy, Vite will use the next available port (5174, 5175, etc.)

To force a specific port:
```bash
npm run dev -- --port 3000
```

### Dependency Issues:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use legacy peer deps
npm install --legacy-peer-deps
```

### Database Connection Issues:
1. Check that environment variables are correct
2. Verify your Supabase project is active
3. Use mock database for testing (see Option 3 above)

### Build Issues:
```bash
# Type check first
npm run type-check

# Clean build
rm -rf dist
npm run build
```

## 🎯 Development Tips

### Hot Reload:
- Changes to React components update automatically
- Changes to `.env.local` require server restart
- CSS changes update instantly

### Database Development:
- Use Supabase dashboard for database management
- Check database status on homepage
- Admin dashboard shows connection details

### Debugging:
- Browser DevTools for React debugging
- Console logs for API debugging
- Database status component shows connection issues

## 🌟 Ready for Development!

Your localhost environment is now set up with:
- ✅ React + TypeScript + Vite
- ✅ Tailwind CSS + ShadCN UI
- ✅ Supabase database connection
- ✅ Authentication system
- ✅ Admin dashboard
- ✅ Blog management
- ✅ Contact forms
- ✅ Your custom Zira logo

You can now develop, test, and deploy your Zira Technologies website locally! 🎉

### Quick Start Commands:
```bash
# Start development
npm run dev

# View in browser
open http://localhost:5173

# Build for production
npm run build
```
