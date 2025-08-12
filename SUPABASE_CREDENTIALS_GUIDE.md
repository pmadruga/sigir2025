# 🔑 Getting Your Supabase Credentials - Step by Step

## 1️⃣ Create a Supabase Account (if you don't have one)

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** (green button)
3. Sign up with GitHub, or create an account with email

## 2️⃣ Create a New Project

1. Once logged in, click **"New project"**
2. Fill in:
   - **Project name**: `sigir2025-papers` (or any name you prefer)
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose the closest to you
   - **Pricing Plan**: Free tier is fine for this project
3. Click **"Create new project"**
4. Wait ~2 minutes for the project to be created

## 3️⃣ Find Your Credentials

Once your project is ready:

### Method 1: Quick Access from Dashboard
1. You'll see your project dashboard
2. Look for the **"Project URL"** and **"API Key"** right on the home screen
3. These are displayed in green boxes

### Method 2: From Settings (More Details)
1. Click on the **⚙️ Settings** icon in the left sidebar
2. Click on **API** in the settings menu
3. You'll see:

#### Project URL
```
https://YOUR_PROJECT_ID.supabase.co
```
This is your `SUPABASE_URL`

#### Project API keys
You'll see several keys:

- **`anon` `public`** - This is your `SUPABASE_ANON_KEY`
  - ✅ Safe to use in frontend code
  - This is what you need for the voting system
  - Copy the long string that looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

- **`service_role` `secret`** - This is your `SUPABASE_SERVICE_ROLE_KEY`
  - ⚠️ NEVER expose this in frontend code
  - Only use in secure backend environments
  - Has full admin access to your database

## 4️⃣ Copy to Your .env File

1. Open your `.env` file in the project
2. Replace the placeholder values:

```bash
# Supabase Configuration
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzI2MjgwMCwiZXhwIjoxOTM4ODM4ODAwfQ.1234567890abcdefghijklmnopqrstuvwxyz
```

## 5️⃣ Set Up Your Database (Already Done!)

The `supabase_schema.sql` file in your project contains the database structure. To apply it:

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the contents of `supabase_schema.sql`
4. Paste and click **"Run"**
5. You should see "Success" messages

## 6️⃣ Enable Authentication

1. Go to **Authentication** in the left sidebar
2. Click **Providers**
3. Make sure **Email** is enabled (it usually is by default)
4. Under **Auth Settings**:
   - Site URL: `http://localhost:8000` (for local dev)
   - Add your GitHub Pages URL later for production

## 7️⃣ Create Test Users (Optional)

1. Go to **Authentication** → **Users**
2. Click **"Invite user"**
3. Add the test emails from your `.env` file
4. They'll receive invite emails to set passwords

OR

Use the SQL Editor to create them directly:
```sql
-- This is already in your supabase_schema.sql file
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
  ('alex.researcher@example.com', crypt('ResearchPaper2025!', gen_salt('bf')), NOW(), NOW(), NOW());
```

## 🎯 Quick Checklist

- [ ] Created Supabase account
- [ ] Created new project
- [ ] Found Project URL (looks like: `https://xxxxx.supabase.co`)
- [ ] Found Anon Key (starts with: `eyJ...`)
- [ ] Updated `.env` file with real values
- [ ] Run database schema SQL
- [ ] Test users created (optional)

## 🧪 Test Your Connection

Open your site locally and check the browser console:
- ✅ "Environment variables loaded from .env file"
- ✅ No Supabase connection errors
- ✅ Can sign in with test users

## 🚨 Common Issues

### "Invalid API Key"
- Make sure you copied the entire key (it's very long!)
- Check you're using the `anon` key, not `service_role`

### "Project not found"
- Verify the URL matches exactly (including the random string before .supabase.co)
- Make sure there's no trailing slash

### "CORS Error"
- Add your domain to Supabase Auth settings
- For local dev, use `http://localhost:8000` not `file://`

## 📱 Mobile App?
If you see "Download mobile app" prompts, you can ignore them - you're building a web app!

## 💡 Pro Tips

1. **Keep credentials secure**: Never commit `.env` to git
2. **Use Row Level Security**: Already set up in your schema
3. **Monitor usage**: Free tier gives you 50,000 rows and 500MB
4. **Backup regularly**: Export your data from the dashboard

## Need More Help?

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- Check browser console for detailed errors