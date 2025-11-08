# Secrets Setup Guide - GitHub Actions & Vercel

## 🔐 Overview

This guide helps you set up secrets for:

1. **GitHub Actions** - For CI/CD workflows
2. **Vercel** - For deployment environments

## 📋 Prerequisites

### 1. Install GitHub CLI

```bash
# macOS
brew install gh

# Or download from: https://cli.github.com/
```

### 2. Install Vercel CLI

```bash
# Using npm
npm install -g vercel

# Or using Homebrew (macOS)
brew install vercel-cli
```

### 3. Authenticate

**GitHub:**

```bash
gh auth login
```

**Vercel:**

```bash
vercel login
```

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)

```bash
# Setup both GitHub Actions and Vercel secrets from .env.local
bash .cursor/scripts/setup-all-secrets.sh
```

### Option 2: Individual Setup

**GitHub Actions:**

```bash
bash .cursor/scripts/setup-github-secrets.sh
```

**Vercel:**

```bash
bash .cursor/scripts/setup-vercel-secrets.sh
```

## 📝 Required Secrets

### GitHub Actions Secrets

These secrets are used by CI/CD workflows:

| Secret Name                     | Description                          | Required |
| ------------------------------- | ------------------------------------ | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                 | ✅       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key               | ✅       |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key (CRITICAL) | ✅       |
| `JWT_SECRET`                    | JWT secret for authentication        | ✅       |
| `NEXTAUTH_SECRET`               | NextAuth.js secret                   | ✅       |
| `NEXTAUTH_URL`                  | NextAuth.js URL                      | ✅       |
| `GOOGLE_CLIENT_ID`              | Google OAuth client ID               | ⚠️       |
| `GOOGLE_CLIENT_SECRET`          | Google OAuth client secret           | ⚠️       |
| `GITHUB_CLIENT_ID`              | GitHub OAuth client ID               | ⚠️       |
| `GITHUB_CLIENT_SECRET`          | GitHub OAuth client secret           | ⚠️       |
| `NEXT_PUBLIC_FIREBASE_API_KEY`  | Firebase API key                     | ⚠️       |
| `NEXT_PUBLIC_FIREBASE_*`        | Other Firebase config vars           | ⚠️       |

### Vercel Environment Variables

Same variables as above, but configured per environment:

- **Production** - Live production environment
- **Preview** - Preview deployments (PRs, branches)
- **Development** - Local development (optional)

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 🔧 Manual Setup

### GitHub Actions (Using GitHub CLI)

```bash
# List existing secrets
gh secret list

# Set a secret (interactive)
gh secret set SECRET_NAME

# Set a secret from file
echo "secret-value" | gh secret set SECRET_NAME

# Set multiple secrets from .env.local
while IFS='=' read -r key value; do
    [[ "$key" =~ ^#.*$ ]] && continue
    [[ -z "$key" ]] && continue
    echo "$value" | gh secret set "$key"
done < .env.local
```

### Vercel (Using Vercel CLI)

```bash
# List environment variables
vercel env ls production
vercel env ls preview
vercel env ls development

# Add environment variable (interactive)
vercel env add VARIABLE_NAME production

# Add from stdin
echo "value" | vercel env add VARIABLE_NAME production

# Add for all environments
for env in production preview development; do
    echo "value" | vercel env add VARIABLE_NAME "$env"
done
```

## 🎯 Setup Modes

### 1. Interactive Mode

Prompts for each secret value. Good for:

- First-time setup
- Adding individual secrets
- When you don't have a `.env.local` file

### 2. From .env.local

Reads from your local `.env.local` file. Good for:

- Bulk setup
- After rotating keys
- Quick updates

### 3. List Mode

Shows existing secrets/variables. Good for:

- Verification
- Auditing
- Debugging

## ⚠️ Important Notes

### Security Best Practices

1. **Never commit secrets to git**
   - Use `.env.local` (already in `.gitignore`)
   - Use GitHub Secrets for CI/CD
   - Use Vercel Environment Variables for deployments

2. **Rotate keys after exposure**
   - See `.cursor/KEY_ROTATION_GUIDE.md`
   - Update all locations after rotation

3. **Use different keys per environment**
   - Production keys should be different from development
   - Use Vercel's environment-specific variables

4. **Restrict access**
   - Only team members who need access should have it
   - Review secret access regularly

### GitHub Actions

- Secrets are encrypted and only available to workflows
- Secrets are not visible in workflow logs
- Use `${{ secrets.SECRET_NAME }}` in workflows

### Vercel

- Environment variables are encrypted at rest
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Server-side variables (like `SUPABASE_SERVICE_ROLE_KEY`) are not exposed
- After adding variables, redeploy: `vercel --prod`

## 🔍 Verification

### Check GitHub Secrets

```bash
gh secret list
```

### Check Vercel Variables

```bash
vercel env ls production
vercel env ls preview
vercel env ls development
```

### Test Workflows

```bash
# Trigger a workflow run
gh workflow run "CI"  # or your workflow name
```

### Test Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## 🐛 Troubleshooting

### GitHub CLI Issues

**"Not authenticated"**

```bash
gh auth login
gh auth refresh
```

**"Repository not found"**

- Make sure you're in the correct directory
- Check repository access: `gh repo view`

### Vercel CLI Issues

**"Not logged in"**

```bash
vercel login
```

**"Project not found"**

- Link project: `vercel link`
- Or specify project: `vercel --prod --yes`

### Script Issues

**"Permission denied"**

```bash
chmod +x .cursor/scripts/*.sh
```

**"Command not found"**

- Install missing CLI tools (gh or vercel)
- Check PATH: `which gh` or `which vercel`

## 📚 Related Documentation

- `.cursor/KEY_ROTATION_GUIDE.md` - How to rotate exposed keys
- `.cursor/START_HERE.md` - Quick start guide
- `.github/GITHUB_ACTIONS_ANALYSIS.md` - GitHub Actions analysis

## 🔗 Git Hooks (Pre-commit Protection)

### Install Pre-commit Hook

```bash
# Install the pre-commit hook
bash .cursor/scripts/install-git-hooks.sh
```

This will:

- Install a pre-commit hook that checks for secrets before each commit
- Set up git-secrets patterns (if installed)
- Block commits containing potential secrets

### Manual Installation

```bash
# Copy pre-commit hook
cp .cursor/scripts/pre-commit-secrets-check.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### Bypass Hook (Not Recommended)

```bash
# Only use in emergencies
git commit --no-verify
```

## 🎉 Next Steps

1. ✅ Set up secrets using the scripts
2. ✅ Verify secrets are set correctly
3. ✅ Test workflows/deployments
4. ✅ Document any custom secrets needed
5. ✅ Set up git-secrets for prevention (see `.cursor/scripts/setup-git-secrets.sh`)
6. ✅ Install pre-commit hooks (see `.cursor/scripts/install-git-hooks.sh`)

---

**Need help?** Check the scripts in `.cursor/scripts/` or run them with `--help` (if implemented).
