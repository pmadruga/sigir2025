# 🔐 Secure Credentials Setup Guide

## Overview
Your SIGIR 2025 voting system now supports secure credential management through multiple methods. All sensitive data is properly protected and excluded from git commits.

## 🔒 Security Features Implemented

- ✅ Environment variables for sensitive data
- ✅ `.env` files ignored by git
- ✅ GitHub Actions secrets integration
- ✅ Runtime configuration validation
- ✅ Test user quick-login (development only)

---

## 🖥️ Option 1: Local Development (.env file)

### 1. Create your local environment file:
```bash
cp .env.example .env
```

### 2. Edit `.env` with your actual Supabase credentials:
```bash
# Supabase Configuration
SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Test User Credentials
TEST_USER_1_EMAIL=alex.researcher@example.com
TEST_USER_1_PASSWORD=ResearchPaper2025!
# ... (other test users)
```

### 3. For local development, update `config.js`:
```javascript
// Replace the default config with your actual values
const defaultConfig = {
    SUPABASE_URL: 'https://YOUR-PROJECT.supabase.co',
    SUPABASE_ANON_KEY: 'YOUR-ANON-KEY-HERE'
    // ...
};
```

---

## 🚀 Option 2: GitHub Actions Deployment

### 1. Set up GitHub Secrets:
Go to your repository → Settings → Secrets and variables → Actions

### 2. Add these repository secrets:

| Secret Name | Value |
|-------------|--------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anon key |
| `TEST_USER_1_EMAIL` | alex.researcher@example.com |
| `TEST_USER_1_PASSWORD` | ResearchPaper2025! |
| `TEST_USER_2_EMAIL` | priya.datascience@example.com |
| `TEST_USER_2_PASSWORD` | DataScience123# |
| `TEST_USER_3_EMAIL` | carlos.mleng@example.com |
| `TEST_USER_3_PASSWORD` | MachineLearning456$ |
| `TEST_USER_4_EMAIL` | sarah.phd@example.com |
| `TEST_USER_4_PASSWORD` | PhDStudent789% |
| `TEST_USER_5_EMAIL` | david.industry@example.com |
| `TEST_USER_5_PASSWORD` | IndustryExp2025^ |
| `TEST_USER_6_EMAIL` | maria.prof@example.com |
| `TEST_USER_6_PASSWORD` | Academic&Research! |

### 3. Enable GitHub Pages:
1. Go to Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will automatically deploy on push to main

---

## 🔧 How It Works

### Configuration Loading:
1. **Development**: Uses `config.js` with default values
2. **Production**: GitHub Actions generates secure `config.js` with secrets
3. **Runtime**: JavaScript validates configuration and shows warnings

### Security Layers:
1. **Git Ignore**: `.env` files never committed
2. **Secrets**: Sensitive data stored in GitHub/environment variables
3. **Runtime Validation**: Configuration checked before initialization
4. **Test Users**: Only available in development builds

### Quick Login Feature:
- Adds a collapsible "🧪 Quick Login" section
- Shows test user buttons for easy development
- Only visible when test users are configured
- Automatically fills login form

---

## 📝 Setup Instructions

### For Supabase:
1. **Create Project**: Go to [supabase.com](https://supabase.com)
2. **Get Credentials**: Settings → API → Copy URL and anon key
3. **Run Schema**: Execute `supabase_schema.sql` in SQL Editor
4. **Create Users**: Add test users in Authentication → Users

### For GitHub Actions:
```bash
# 1. Commit your changes
git add .
git commit -m "Add secure credentials setup"
git push origin main

# 2. Check deployment
# Go to Actions tab to see deployment progress
```

### For Local Development:
```bash
# 1. Copy environment template
cp .env.example .env

# 2. Edit with your credentials
nano .env

# 3. Update config.js defaults (optional)
# 4. Open index.html in browser
```

---

## 🛡️ Security Best Practices

### ✅ DO:
- Use environment variables for all sensitive data
- Keep `.env` files out of version control
- Use GitHub secrets for deployment
- Validate configuration at runtime
- Use strong passwords for test users

### ❌ DON'T:
- Commit `.env` files to git
- Hardcode credentials in JavaScript
- Share service role keys publicly
- Use weak test passwords
- Deploy with default configuration

---

## 🧪 Testing Your Setup

### 1. Configuration Validation:
Open browser console and look for:
```
✅ Configuration loaded successfully
⚠️ Supabase URL not configured properly (if not set up)
```

### 2. Authentication Test:
1. Try voting without login (should be blocked)
2. Use quick login buttons (development)
3. Sign in manually with test credentials
4. Verify vote counts update correctly

### 3. Security Test:
1. Check `.env` is not in git: `git status`
2. Verify secrets are working in Actions tab
3. Test from incognito/different browser

---

## 🚨 Troubleshooting

### "Configuration not loaded":
- Check `config.js` is included before other scripts
- Verify GitHub secrets are set correctly
- Check browser console for JavaScript errors

### "Supabase connection failed":
- Verify URL format: `https://project-id.supabase.co`
- Check anon key is complete (starts with `eyJhbG...`)
- Confirm Supabase project is active

### "Test users not working":
- Create users in Supabase Authentication → Users
- Use exact email/password combinations
- Confirm users are email-confirmed in dashboard

Your credentials are now securely managed! 🎉