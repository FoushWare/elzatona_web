# ⚡ Quick Start - Set Up Secrets Now

## 🚀 Fastest Way (3 Commands)

```bash
# 1. Install CLIs (if needed)
brew install gh vercel-cli

# 2. Authenticate
gh auth login
vercel login

# 3. Set up secrets (automated)
bash .cursor/scripts/setup-secrets-from-env.sh
```

**That's it!** The script will:

- Read your `.env.local` file
- Set up GitHub Actions secrets
- Set up Vercel environment variables
- Show you what was configured

## 📋 Prerequisites Check

Run this to see what you need:

```bash
bash -c '
echo "GitHub CLI: $(which gh >/dev/null 2>&1 && echo ✅ || echo ❌)"
echo "Vercel CLI: $(which vercel >/dev/null 2>&1 && echo ✅ || echo ❌)"
echo "GitHub Auth: $(gh auth status >/dev/null 2>&1 && echo ✅ || echo ❌)"
echo "Vercel Auth: $(vercel whoami >/dev/null 2>&1 && echo ✅ || echo ❌)"
echo ".env.local: $([ -f .env.local ] && echo ✅ || echo ❌)"
'
```

## 🔧 If Something's Missing

### Install GitHub CLI:

```bash
brew install gh
gh auth login
```

### Install Vercel CLI:

```bash
npm install -g vercel
vercel login
```

### Create .env.local:

```bash
cp env.example .env.local
# Then edit .env.local with your actual secrets
```

## ✅ Verify After Setup

```bash
# Check GitHub secrets
gh secret list

# Check Vercel variables
vercel env ls production
```

## 📚 Need More Help?

- **Detailed guide:** `.cursor/STEP_BY_STEP_SETUP.md`
- **Complete guide:** `.cursor/SECRETS_SETUP_GUIDE.md`
- **Key rotation:** `.cursor/KEY_ROTATION_GUIDE.md`

---

**Ready?** Run: `bash .cursor/scripts/setup-secrets-from-env.sh`
