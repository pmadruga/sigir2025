# Environment Variables Setup Guide

This guide explains how to configure environment variables for both local development and production deployment.

## 🏠 Local Development Setup

### 1. Copy the example environment file
```bash
cp .env.example .env
```

### 2. Edit your `.env` file with your actual values
```bash
# Supabase Configuration
SUPABASE_URL=https://your-actual-project-id.supabase.co
SUPABASE_ANON_KEY=your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key

# Test User Credentials (for development only)
TEST_USER_1_EMAIL=alex.researcher@example.com
TEST_USER_1_PASSWORD=ResearchPaper2025!
# ... etc
```

### 3. Get your Supabase credentials
1. Go to [supabase.com](https://supabase.com)
2. Create a new project or select your existing project
3. Go to Settings → API
4. Copy your Project URL and anon public key
5. Update your `.env` file with these values

## 🚀 GitHub Production Setup

### 1. Set up GitHub Secrets
Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

#### Required Secrets:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon public key

#### Test User Secrets (optional, for demo):
- `TEST_USER_1_EMAIL` & `TEST_USER_1_PASSWORD`
- `TEST_USER_2_EMAIL` & `TEST_USER_2_PASSWORD`
- `TEST_USER_3_EMAIL` & `TEST_USER_3_PASSWORD`
- `TEST_USER_4_EMAIL` & `TEST_USER_4_PASSWORD`
- `TEST_USER_5_EMAIL` & `TEST_USER_5_PASSWORD`
- `TEST_USER_6_EMAIL` & `TEST_USER_6_PASSWORD`

### 2. Enable GitHub Pages
1. Go to repository Settings → Pages
2. Select "GitHub Actions" as the source
3. Your site will be deployed automatically on each push to main

## 🔧 How It Works

### Local Development
- The `load-env.js` script automatically loads your `.env` file
- Variables are parsed and made available as `window.SIGIR_CONFIG`
- Only works on localhost or file:// protocol for security

### Production Deployment
- GitHub Actions workflow injects secrets into `config.js`
- The workflow replaces the local config with production values
- Site is deployed to GitHub Pages with your actual credentials

## 🔒 Security Notes

- ✅ `.env` files are in `.gitignore` - never committed
- ✅ GitHub secrets are encrypted and only accessible during builds
- ✅ Local development uses separate credentials from production
- ✅ Test users should only be used for development/demo purposes

## 🧪 Test Users

The test users are provided for demonstration purposes. In production, you should:
1. Create real user accounts in Supabase
2. Remove test user credentials from production
3. Use proper user authentication flow

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | ✅ | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | ✅ | Public anon key from Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | 🔧 | Service role key (for admin operations) |
| `TEST_USER_*_EMAIL` | 🧪 | Test user email addresses |
| `TEST_USER_*_PASSWORD` | 🧪 | Test user passwords |

Legend: ✅ Required, 🔧 Optional, 🧪 Development only

## 🚨 Troubleshooting

### Local Development Issues
- **Config not loading**: Check that `.env` file exists and is readable
- **CORS errors**: Make sure you're serving from localhost, not file://
- **Supabase errors**: Verify your URL and key are correct

### Production Issues
- **Site not updating**: Check GitHub Actions logs for deployment errors  
- **Config not found**: Verify all required secrets are set in GitHub
- **Authentication failing**: Check Supabase project settings and domain allowlist

### Getting Help
- Check browser console for detailed error messages
- Verify all secrets are properly set in GitHub
- Test locally first before deploying to production