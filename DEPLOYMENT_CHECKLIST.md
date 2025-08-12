# 🚀 Deployment Checklist

Follow these steps to deploy your SIGIR 2025 Papers application:

## ✅ Step 1: Set Up Database (Supabase Dashboard)

1. **Go to your Supabase project**: https://supabase.com/dashboard/project/ylspgsnyuhqcqmpgixqd
2. Click **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy and paste the contents of `setup-test-users.sql`
5. Click **Run** to create the database schema

## ✅ Step 2: Create Test Users (Supabase Dashboard)

Since Supabase doesn't allow direct password creation via SQL, create users manually:

1. In Supabase Dashboard, go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. For each test user, enter:
   - Email and password from the list below
   - Check "Auto Confirm Email"
   
Test Users to create:
- `alex.researcher@example.com` / `ResearchPaper2025!`
- `priya.datascience@example.com` / `DataScience123#`
- `carlos.mleng@example.com` / `MachineLearning456$`
- `sarah.phd@example.com` / `PhDStudent789%`
- `david.industry@example.com` / `IndustryExp2025^`
- `maria.prof@example.com` / `Academic&Research!`

## ✅ Step 3: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each:

### Required Secrets:
| Secret Name | Value |
|------------|-------|
| `SUPABASE_URL` | `https://ylspgsnyuhqcqmpgixqd.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsc3Bnc255dWhxY3FtcGdpeHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMTAwMTMsImV4cCI6MjA3MDU4NjAxM30.dK15yBRgqvtBABav2DKj1UESZUuqgFwWn40DnjRStQY` |

### Optional Test User Secrets:
| Secret Name | Value |
|------------|-------|
| `TEST_USER_1_EMAIL` | `alex.researcher@example.com` |
| `TEST_USER_1_PASSWORD` | `ResearchPaper2025!` |
| `TEST_USER_2_EMAIL` | `priya.datascience@example.com` |
| `TEST_USER_2_PASSWORD` | `DataScience123#` |
| `TEST_USER_3_EMAIL` | `carlos.mleng@example.com` |
| `TEST_USER_3_PASSWORD` | `MachineLearning456$` |
| `TEST_USER_4_EMAIL` | `sarah.phd@example.com` |
| `TEST_USER_4_PASSWORD` | `PhDStudent789%` |
| `TEST_USER_5_EMAIL` | `david.industry@example.com` |
| `TEST_USER_5_PASSWORD` | `IndustryExp2025^` |
| `TEST_USER_6_EMAIL` | `maria.prof@example.com` |
| `TEST_USER_6_PASSWORD` | `Academic&Research!` |

## ✅ Step 4: Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the settings

## ✅ Step 5: Test Locally First

```bash
# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

Check that:
- ✅ Page loads without errors
- ✅ Can view paper READMEs
- ✅ Can sign in with test users
- ✅ Voting buttons work

## ✅ Step 6: Commit and Deploy

```bash
# Add all new files
git add .

# Commit changes
git commit -m "Add environment variables setup and deployment configuration

- Set up .env file for local development
- Configure GitHub Actions for production deployment
- Add Supabase integration with voting system
- Create deployment and setup documentation"

# Push to deploy
git push origin main
```

## ✅ Step 7: Verify Deployment

After pushing:
1. Go to **Actions** tab in GitHub
2. Watch the deployment workflow run
3. Once complete, visit your site at:
   ```
   https://[your-username].github.io/sigir2025
   ```

## 🔍 Troubleshooting

### Local Issues
- **Can't connect to Supabase**: Check .env file has correct credentials
- **Can't sign in**: Verify test users were created in Supabase
- **No papers showing**: Check browser console for errors

### Deployment Issues
- **Workflow failing**: Check GitHub Actions logs
- **Site not updating**: Clear browser cache, wait 5-10 minutes
- **Auth not working**: Verify GitHub secrets are set correctly

## 📊 Post-Deployment

1. **Monitor Usage**: Check Supabase dashboard for API usage
2. **Add Custom Domain** (optional): Settings → Pages → Custom domain
3. **Analytics** (optional): Add Google Analytics or similar
4. **Backup Data**: Regularly export votes from Supabase

## ✨ Success Indicators

Your deployment is successful when:
- ✅ Site loads at GitHub Pages URL
- ✅ Can browse all paper READMEs
- ✅ Authentication works with test users
- ✅ Voting system records votes in Supabase
- ✅ Search functionality works properly

## 🎉 Congratulations!

Your SIGIR 2025 Papers site is now live with:
- Paper collection browsing
- README viewer with markdown rendering
- User authentication
- Voting system
- Search functionality
- Responsive design