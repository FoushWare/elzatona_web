# 🚀 Run Setup Now - Manual Instructions

Since the automated script needs your interaction, follow these steps:

## Step 1: Check Prerequisites

Run these commands one by one:

```bash
# Check GitHub CLI
which gh
gh auth status

# Check Vercel CLI
which vercel
vercel whoami

# Check .env.local
ls -la .env.local
```

## Step 2: Install Missing Tools

### If GitHub CLI is missing:

```bash
brew install gh
gh auth login
```

### If Vercel CLI is missing:

```bash
npm install -g vercel
vercel login
```

## Step 3: Prepare .env.local

Make sure `.env.local` exists and has your actual secrets:

```bash
# If it doesn't exist
cp env.example .env.local

# Edit it with your secrets
nano .env.local
# or
code .env.local
```

**Important:** Replace all placeholders like:

- `your-supabase-anon-key-here` → Your actual key
- `your-service-role-key-here` → Your actual key
- etc.

## Step 4: Run the Setup Script

```bash
bash .cursor/scripts/setup-secrets-from-env.sh
```

This will:

1. Read your `.env.local`
2. Set up GitHub Actions secrets
3. Set up Vercel environment variables
4. Show you what was configured

## Step 5: Verify

```bash
# Check GitHub secrets
gh secret list

# Check Vercel variables
vercel env ls production
vercel env ls preview
vercel env ls development
```

## Alternative: Interactive Setup

If you prefer step-by-step prompts:

```bash
# GitHub Actions secrets
bash .cursor/scripts/setup-github-secrets.sh
# Choose option 2 (From .env.local file)

# Vercel environment variables
bash .cursor/scripts/setup-vercel-secrets.sh
# Choose option 2 (From .env.local file)
```

## Troubleshooting

### "Command not found"

- Install the missing CLI tool (gh or vercel)

### "Not authenticated"

- Run `gh auth login` or `vercel login`

### ".env.local not found"

- Create it: `cp env.example .env.local`
- Edit with your actual secrets

### "Permission denied"

- Make script executable: `chmod +x .cursor/scripts/setup-secrets-from-env.sh`

### Script shows placeholders

- Your `.env.local` still has placeholder values
- Replace them with actual secrets

---

**Ready?** Open your terminal and run:

```bash
bash .cursor/scripts/setup-secrets-from-env.sh
```
