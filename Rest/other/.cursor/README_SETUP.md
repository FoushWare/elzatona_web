# 🎯 Setup Instructions - READ THIS FIRST

## Quick Run

**Easiest way:**

```bash
bash .cursor/RUN_ME.sh
```

This will:

1. ✅ Check all prerequisites
2. ✅ Verify authentication
3. ✅ Run the setup script

## Manual Steps

If the automated script doesn't work, follow these steps:

### 1. Install CLIs

```bash
brew install gh vercel-cli
```

### 2. Authenticate

```bash
gh auth login
vercel login
```

### 3. Prepare .env.local

```bash
# Create if needed
cp env.example .env.local

# Edit with your actual secrets (not placeholders!)
nano .env.local
```

### 4. Run Setup

```bash
bash .cursor/scripts/setup-secrets-from-env.sh
```

### 5. Verify

```bash
gh secret list
vercel env ls production
```

## Documentation

- **Quick Start:** `.cursor/QUICK_START.md`
- **Step-by-Step:** `.cursor/STEP_BY_STEP_SETUP.md`
- **Complete Guide:** `.cursor/SECRETS_SETUP_GUIDE.md`
- **Run Now:** `.cursor/RUN_SETUP_NOW.md`

---

**Start here:** `bash .cursor/RUN_ME.sh`
