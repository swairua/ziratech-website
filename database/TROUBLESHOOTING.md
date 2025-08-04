# 🔧 Database Troubleshooting Guide

## Current Status: Database Connection Error

I can see your website is showing: **"Connection failed: Auth session missing!"**

This indicates the database connection needs to be established. Here's how to fix it:

---

## 🚀 Quick Fix Steps

### Step 1: Set Up Database Tables
Your Supabase database is connected, but tables need to be created.

**Option A: Supabase Dashboard (Recommended)**
1. Go to: https://supabase.com/dashboard/project/eflkozuqjcjsswiwqckl
2. Click **"SQL Editor"** in left sidebar
3. Click **"New Query"**
4. Copy contents of `database/schema.sql`
5. Paste and click **"Run"**

**Option B: Use Our Automation Script**
```bash
node database/setup-automated.js
```

### Step 2: Verify Connection
After running the schema, your website should show:
- ✅ **Green "Connected"** badge in Database Status
- ✅ Working admin dashboard at `/admin`
- ✅ Contact forms functional

---

## 🔍 Common Issues & Solutions

### Issue: "Auth session missing"
**Cause:** Database tables not created yet
**Solution:** Run the schema.sql file as described above

### Issue: "Connection failed"
**Cause:** Network or credential issues
**Solutions:**
1. Check internet connection
2. Verify Supabase project is active
3. Confirm environment variables are set

### Issue: "Table does not exist"
**Cause:** Partial database setup
**Solution:** Re-run the complete schema.sql

### Issue: "Permission denied"
**Cause:** Database permissions not set
**Solution:** Schema includes permission grants

---

## 🔍 Diagnostic Tools

### Test Connection
```bash
node database/test-connection.js
```

### Check Environment Variables
Your current configuration:
```
VITE_SUPABASE_URL=https://eflkozuqjcjsswiwqckl.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_g_VVv6zuB6zj_18i-Xj7Jg_uu60LpR8
```

### Verify Tables in Supabase
1. Go to Supabase dashboard
2. Click "Table Editor"
3. Should see: users, blog_posts, contact_submissions, etc.

---

## 📊 What Should Work After Setup

### ✅ Expected Features:
- **User Authentication** - Login/signup forms
- **Admin Dashboard** - User management interface
- **Blog System** - Create and manage posts
- **Contact Forms** - Receive submissions
- **Database Status** - Green "Connected" indicator
- **Content Management** - Dynamic settings

### 🔗 Test URLs:
- **Homepage:** https://ddc3bd7fffb1496da342d3c52e31e64a-f8f1c0ababdc4e8890ad6717e.fly.dev/
- **Admin:** https://ddc3bd7fffb1496da342d3c52e31e64a-f8f1c0ababdc4e8890ad6717e.fly.dev/admin
- **Blog:** https://ddc3bd7fffb1496da342d3c52e31e64a-f8f1c0ababdc4e8890ad6717e.fly.dev/blog

---

## 🆘 Emergency Contacts

If you continue having issues:

**Technical Support:**
- Email: info@ziratech.com
- Phone: +254 700 000 000

**Database Access:**
- Supabase Dashboard: https://supabase.com/dashboard/project/eflkozuqjcjsswiwqckl
- Project ID: eflkozuqjcjsswiwqckl

---

## ✅ Success Indicators

You'll know everything is working when:
1. ✅ Database Status shows **"Connected"** (green)
2. ✅ Admin login works with admin@ziratech.com
3. ✅ Blog posts display on /blog page
4. ✅ Contact form submissions are saved
5. ✅ No error messages in browser console

---

**Next Action: Run the database schema to fix the connection error! 🚀**
