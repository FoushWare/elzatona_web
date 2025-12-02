# SonarQube Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Create SonarCloud Account
- Go to [sonarcloud.io](https://sonarcloud.io/)
- Sign in with GitHub
- Create organization (note the key)

### 2. Create Project
- Click "Create Project" → "From GitHub"
- Select your repository
- Project key: `zatona-web` (auto-generated)

### 3. Get Token
- My Account → Security → Generate Token
- Copy the token

### 4. Set Environment Variables

**Local (.env.local):**
```bash
SONAR_TOKEN=your_token_here
SONAR_ORG=your-org-key
```

**GitHub Actions (Repository Secrets):**
- Settings → Secrets → Actions
- Add `SONAR_TOKEN` and `SONAR_ORG`

## 📝 Usage

### Local Analysis

```bash
# Standard (1536MB memory)
npm run sonar

# Light mode (1024MB memory)
npm run sonar:light

# Quick (skip tests & build, 1024MB)
npm run sonar:quick
```

### GitHub Actions
- Automatically runs on push/PR to main/develop
- View results in SonarCloud dashboard

## 🎯 What It Checks

- ✅ **Bugs**: Actual errors in code
- 🔒 **Security**: Vulnerabilities & hotspots
- 🧹 **Code Smells**: Maintainability issues
- 📊 **Coverage**: Test coverage percentage
- 🔄 **Duplications**: Code duplication
- ⏱️ **Technical Debt**: Time to fix issues

## 📊 View Results

After analysis, view results at:
**https://sonarcloud.io/dashboard?id=zatona-web**

## ⚡ Memory Options

| Command | Memory | Tests | Build | Use Case |
|---------|--------|-------|-------|----------|
| `npm run sonar` | 1536MB | ✅ | ✅ | Full analysis |
| `npm run sonar:light` | 1024MB | ✅ | ✅ | Limited memory |
| `npm run sonar:quick` | 1024MB | ❌ | ❌ | Fast check |
| `npm run sonar:skip-tests` | 1536MB | ❌ | ✅ | No tests |
| `npm run sonar:skip-build` | 1536MB | ✅ | ❌ | No build |

## 🔧 Troubleshooting

**"SONAR_TOKEN not set"**
```bash
export SONAR_TOKEN=your_token
# Or add to .env.local
```

**"Out of memory"**
```bash
npm run sonar:light  # Use light mode
```

**"Project not found"**
- Check project exists in SonarCloud
- Verify `SONAR_ORG` is correct

## 📚 Full Documentation

See [SONARQUBE_SETUP.md](./SONARQUBE_SETUP.md) for detailed documentation.

