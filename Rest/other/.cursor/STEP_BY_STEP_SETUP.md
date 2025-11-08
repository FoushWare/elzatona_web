# 🚀 Step-by-Step Setup Guide

Follow these steps in order to set up your secrets.

## Step 1: Install GitHub CLI

### Check if installed:

```bash
which gh
```

### If not installed (macOS):

```bash
brew install gh
```

### If not installed (other OS):

Visit: https://cli.github.com/

## Step 2: Authenticate with GitHub

```bash
gh auth login
```

**Follow the prompts:**

1. Choose "GitHub.com"
2. Choose "HTTPS" or "SSH" (HTTPS recommended)
3. Authenticate via web browser or token
4. Follow the instructions

**Verify:**

```bash
gh auth status
```

You should see: "✓ Logged in to github.com as [your-username]"

## Step 3: Install Vercel CLI

### Check if installed:

```bash
which vercel
```

### If not installed:

```bash
npm install -g vercel
```

**Or on macOS:**

```bash
brew install vercel-cli
```

## Step 4: Authenticate with Vercel

```bash
vercel login
```

**Follow the prompts:**

1. It will open a browser
2. Log in to Vercel
3. Authorize the CLI

**Verify:**

```bash
vercel whoami
```

You should see your email address.

## Step 5: Prepare .env.local

### Check if exists:

```bash
ls -la .env.local
```

### If it doesn't exist:

```bash
# Option 1: Copy from example
cp env.example .env.local

# Option 2: Create manually
touch .env.local
```

### Edit .env.local:

Make sure it has your **actual secrets** (not placeholders):

```bash
# Required secrets
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key
JWT_SECRET=your-actual-jwt-secret
NEXTAUTH_SECRET=your-actual-nextauth-secret
NEXTAUTH_URL=https://your-domain.com

# OAuth (if used)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Firebase (if used)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
# ... other Firebase vars
```

**⚠️ Important:** Replace all `your-*-here` placeholders with actual values!

## Step 6: Run Automated Setup

### Option A: Automated (Recommended)

```bash
bash .cursor/scripts/setup-secrets-from-env.sh
```

This will:

- Read your `.env.local`
- Set up GitHub Actions secrets
- Set up Vercel environment variables (production, preview, development)
- Skip placeholder values
- Show you what was set

### Option B: Interactive

```bash
# GitHub Actions
bash .cursor/scripts/setup-github-secrets.sh

# Vercel
bash .cursor/scripts/setup-vercel-secrets.sh
```

### Option C: Complete Guided Setup

```bash
bash .cursor/scripts/install-and-setup.sh
```

This guides you through everything step by step.

## Step 7: Verify Setup

### Check GitHub Secrets:

```bash
gh secret list
```

You should see your secrets listed.

### Check Vercel Variables:

```bash
# Production
vercel env ls production

# Preview
vercel env ls preview

# Development
vercel env ls development
```

## Step 8: Rotate Keys (If Exposed)

If your keys were exposed in git history, you **must** rotate them:

1. **See the guide:**

   ```bash
   cat .cursor/KEY_ROTATION_GUIDE.md
   ```

2. **Rotate each key:**
   - Supabase Service Role Key (CRITICAL)
   - Supabase Anon Key
   - Firebase API Key
   - JWT Secret
   - NextAuth Secret

3. **Update .env.local** with new keys

4. **Run setup again:**
   ```bash
   bash .cursor/scripts/setup-secrets-from-env.sh
   ```

## Troubleshooting

### "gh: command not found"

- Install: `brew install gh` (macOS) or visit https://cli.github.com/

### "vercel: command not found"

- Install: `npm install -g vercel` or `brew install vercel-cli`

### "Not authenticated"

- Run: `gh auth login` or `vercel login`

### ".env.local not found"

- Create it: `cp env.example .env.local`
- Edit with your actual secrets

### "Permission denied"

- Make scripts executable: `chmod +x .cursor/scripts/*.sh`

### Secrets not showing up

- Check authentication: `gh auth status` and `vercel whoami`
- Verify .env.local has actual values (not placeholders)
- Check repository/project access

## Quick Commands Reference

```bash
# Install CLIs
brew install gh vercel-cli

# Authenticate
gh auth login
vercel login

# Set up secrets (automated)
bash .cursor/scripts/setup-secrets-from-env.sh

# Verify
gh secret list
vercel env ls production

# Check status
gh auth status
vercel whoami
```

## Next Steps After Setup

1. ✅ **Test workflows** - Push a commit to trigger CI/CD
2. ✅ **Test deployment** - Deploy to Vercel: `vercel --prod`
3. ✅ **Rotate keys** - If they were exposed (see KEY_ROTATION_GUIDE.md)
4. ✅ **Remove from git history** - After rotating keys

---

**Need help?** Check `.cursor/SECRETS_SETUP_GUIDE.md` for detailed documentation.
