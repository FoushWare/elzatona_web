# Automated GitHub Secrets Setup

## Quick Setup Using Script

The easiest way to add all required GitHub Secrets for the test environment is using the automated script.

### Prerequisites

1. **GitHub CLI installed**:
   ```bash
   brew install gh
   ```

2. **Authenticated with GitHub**:
   ```bash
   gh auth login
   ```

3. **`.env.test.local` file exists** with your test credentials

### Run the Script

```bash
npm run setup:github-test-secrets
```

The script will:
- ✅ Check if GitHub CLI is installed and authenticated
- ✅ Read values from `.env.test.local`
- ✅ Generate JWT_SECRET if needed
- ✅ Add all secrets to GitHub automatically
- ✅ Show summary of what was added

### What Secrets Are Added

The script adds these secrets to your GitHub repository:

| Secret Name | Source | Description |
|------------|--------|-------------|
| `ADMIN_EMAIL` | `.env.test.local` | Test admin email |
| `ADMIN_PASSWORD` | `.env.test.local` | Test admin password |
| `TEST_SUPABASE_URL` | `.env.test.local` | Test Supabase URL |
| `TEST_SUPABASE_ANON_KEY` | `.env.test.local` | Test Supabase anon key |
| `TEST_SUPABASE_SERVICE_ROLE_KEY` | `.env.test.local` | Test Supabase service role key |
| `JWT_SECRET` | `.env.test.local` or generated | JWT secret for admin auth |

### Manual Setup (Alternative)

If you prefer to add secrets manually:

1. **Go to GitHub Repository**:
   - Navigate to: https://github.com/FoushWare/GreatFrontendHub/settings/secrets/actions

2. **Add each secret**:
   - Click "New repository secret"
   - Enter name and value
   - Click "Add secret"

### Verify Secrets

After running the script, verify secrets are added:

```bash
gh secret list --repo FoushWare/GreatFrontendHub
```

You should see:
- ✅ ADMIN_EMAIL
- ✅ ADMIN_PASSWORD
- ✅ TEST_SUPABASE_URL
- ✅ TEST_SUPABASE_ANON_KEY
- ✅ TEST_SUPABASE_SERVICE_ROLE_KEY
- ✅ JWT_SECRET

### Troubleshooting

**Script fails with "Not authenticated"**:
```bash
gh auth login
```

**Script fails with "Permission denied"**:
- Ensure you have admin access to the repository
- Check repository name is correct: `FoushWare/GreatFrontendHub`

**Missing values in .env.test.local**:
- Edit `.env.test.local` with your test credentials
- Run the script again

### Security Notes

- ✅ Secrets are encrypted by GitHub
- ✅ Only accessible in GitHub Actions workflows
- ✅ Never exposed in logs or code
- ✅ Use test credentials, NOT production

---

**Quick Command:**
```bash
npm run setup:github-test-secrets
```

