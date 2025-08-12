# SIGIR 2025 Voting System Setup Guide

## Overview
Your SIGIR 2025 papers website now includes upvote/downvote functionality with user authentication powered by Supabase.

## Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization and enter project details
4. Wait for the project to be created

### 2. Set Up Database
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `supabase_schema.sql`
4. This creates:
   - `papers` table with all your paper data
   - `votes` table to track user votes
   - Row Level Security policies
   - Helper functions

### 3. Configure Authentication
1. In Supabase dashboard, go to Authentication → Settings
2. Under "Site URL", add your website domain (e.g., `https://yourdomain.com`)
3. Under "Redirect URLs", add your website URL
4. Disable "Enable email confirmations" for easier testing (optional)

### 4. Create Test Users
1. Go to Authentication → Users in Supabase dashboard
2. Create 6 test users using the credentials from `test_users.md`:

#### Test User Credentials:
- **alex.researcher@example.com** / ResearchPaper2025!
- **priya.datascience@example.com** / DataScience123#
- **carlos.mleng@example.com** / MachineLearning456$
- **sarah.phd@example.com** / PhDStudent789%
- **david.industry@example.com** / IndustryExp2025^
- **maria.prof@example.com** / Academic&Research!

### 5. Update Configuration
1. Get your Supabase URL and anon key from Settings → API
2. Update the JavaScript in `index.html`:
   ```javascript
   const SUPABASE_URL = 'https://your-project-id.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key-here';
   ```

### 6. Deploy Files
Upload these files to your web server:
- `index.html` (updated with voting functionality)
- `supabase-client.js` (voting system logic)

## Features Implemented

### ✅ User Authentication
- Secure login/logout system
- Session management
- User-specific vote tracking

### ✅ Voting System
- Upvote/downvote functionality
- Real-time vote count updates
- Visual feedback for user votes
- Prevents duplicate voting (one vote per user per paper)

### ✅ Security
- Row Level Security (RLS) enabled
- Users can only modify their own votes
- Anonymous users cannot vote
- Secure data validation

### ✅ UI/UX
- Clean, modern interface
- Responsive design
- Visual vote indicators
- Smooth animations and transitions

## How It Works

1. **Authentication**: Users sign in with email/password
2. **Voting**: Authenticated users can upvote/downvote papers
3. **Data Storage**: Votes stored securely in Supabase
4. **Real-time Updates**: Vote counts update immediately
5. **User State**: Users see their previous votes highlighted

## Testing the System

1. Open your website
2. Try voting without signing in (should be blocked)
3. Sign in with one of the test accounts
4. Vote on papers and see counts update
5. Sign out and sign in with different account
6. Verify vote isolation between users

## Security Features

- **Authentication Required**: Only signed-in users can vote
- **One Vote Per User**: Each user can vote once per paper
- **Data Isolation**: Users can only see/modify their own votes
- **Input Validation**: All inputs are validated and sanitized
- **Secure Connections**: All API calls use HTTPS

## Troubleshooting

### Common Issues:
1. **"Network Error"**: Check Supabase URL/key configuration
2. **"Sign in failed"**: Verify user exists in Supabase Auth
3. **Votes not saving**: Check Row Level Security policies
4. **UI not updating**: Check browser console for JavaScript errors

### Debug Steps:
1. Open browser developer tools
2. Check Console tab for error messages
3. Verify Network tab shows successful API calls
4. Check Supabase dashboard for data updates

## Next Steps (Optional)

- Add user registration functionality
- Implement vote sorting/filtering
- Add email notifications
- Create admin dashboard
- Add vote analytics

Your voting system is now complete and ready for use!