# 🗄️ Zira Technologies Database Setup

## ✅ Connection Configured

Your Supabase database connection is now configured with:
- **Project URL**: `https://eflkozuqjcjsswiwqckl.supabase.co`
- **Publishable Key**: `sb_publishable_g_VVv6zuB6zj_18i-Xj7Jg_uu60LpR8`
- **Secret Key**: `sb_secret_O612eal9M_1g8kSo9hmSew_1DW5kTp1`

## 🚀 Next Steps: Create Database Tables

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/eflkozuqjcjsswiwqckl

2. **Open SQL Editor**
   - Navigate to "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Execute the Schema**
   - Copy the contents of `database-schema.sql`
   - Paste into the SQL editor
   - Click "Run" to execute

### Option 2: Using psql Command Line

```bash
psql "postgresql://postgres:Sirgeorge.12@db.eflkozuqjcjsswiwqckl.supabase.co:5432/postgres" -f database-schema.sql
```

### Option 3: Manual Table Creation

If you prefer to create tables manually, here are the essential tables:

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    published BOOLEAN DEFAULT false,
    author_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔍 Verify Setup

After creating the tables, check the **Database Status** component that appears:
- **On Homepage**: Top-right corner (development mode only)
- **On Admin Dashboard**: `/admin/dashboard` page

## 🎯 Test Features

Once tables are created, you can test:

1. **User Authentication** - Login/signup functionality
2. **Blog Management** - Create and manage blog posts
3. **Contact Forms** - Receive contact submissions
4. **Admin Dashboard** - View analytics and manage users

## 🔐 Environment Variables

Your `.env.local` file is configured with:

```env
VITE_SUPABASE_URL=https://eflkozuqjcjsswiwqckl.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_g_VVv6zuB6zj_18i-Xj7Jg_uu60LpR8
SUPABASE_SERVICE_ROLE_KEY=sb_secret_O612eal9M_1g8kSo9hmSew_1DW5kTp1
```

## 🆘 Troubleshooting

**Connection Issues:**
- Check that your Supabase project is active
- Verify the keys are correct
- Ensure your IP is whitelisted (if restrictions are enabled)

**Table Creation Issues:**
- Make sure you're using the service role key for admin operations
- Check Supabase logs for detailed error messages
- Verify PostgreSQL extensions are enabled if needed

## 📱 Ready to Go!

Once the database is set up, your Zira Technologies website will have:
- ✅ User management and authentication
- ✅ Blog content management system
- ✅ Contact form handling
- ✅ Admin dashboard functionality
- ✅ Analytics and reporting
- ✅ Newsletter subscriptions

The database connection is live and your app is ready for development! 🎉
