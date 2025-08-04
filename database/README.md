# 🗄️ Zira Technologies Database Setup

This folder contains all database-related files for your Zira Technologies website.

## 📁 Files in this folder:

- `schema.sql` - Complete database schema with tables, indexes, and sample data
- `README.md` - This setup guide

## 🚀 How to Set Up Your Database

### Step 1: Access Supabase Dashboard
Go to: https://supabase.com/dashboard/project/eflkozuqjcjsswiwqckl

### Step 2: Open SQL Editor
1. Click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**

### Step 3: Run the Schema
1. Open the `schema.sql` file in this folder
2. **Copy all the contents** (about 287 lines)
3. **Paste** into the Supabase SQL editor
4. Click **"Run"** button

### Step 4: Verify Setup
After running the SQL, check:
- ✅ Tables are created in your Supabase dashboard
- ✅ Database Status shows "Connected" on your website
- ✅ Admin login works at `/admin`

## 🗄️ Database Tables Created

1. **users** - User accounts and authentication
2. **blog_posts** - Blog content management
3. **contact_submissions** - Contact form data
4. **app_settings** - Application configuration
5. **user_sessions** - Session management
6. **newsletter_subscriptions** - Email subscriptions
7. **analytics_events** - Usage analytics
8. **services** - Your platform services

## 📊 Sample Data Included

- **Admin User:** admin@ziratech.com
- **Sample Blog Posts:** Welcome post, PropTech, Device Financing
- **App Settings:** Company info, social media, content
- **Services:** Your 4 main platforms

## 🔐 Database Credentials

Your database is configured with:
```
URL: https://eflkozuqjcjsswiwqckl.supabase.co
Publishable Key: sb_publishable_g_VVv6zuB6zj_18i-Xj7Jg_uu60LpR8
Secret Key: sb_secret_O612eal9M_1g8kSo9hmSew_1DW5kTp1
```

## ✅ After Setup

Once tables are created, your website will have:
- User registration and login
- Admin dashboard functionality
- Blog management system
- Contact form handling
- Analytics tracking
- Full content management

## 🆘 Need Help?

If you encounter issues:
1. Check your Supabase project is active
2. Verify the SQL runs without errors
3. Check the Database Status component on your website
4. Contact support if needed

---

**Your Zira Technologies database is ready! 🎉**
