# CI/CD Pipeline

## Overview

The project uses GitHub Actions for CI/CD with the following workflows:

1. **CodeQL Analysis** - Security vulnerability scanning
2. **SonarCloud** - Code quality and security analysis
3. **Auto-Resolve Secret Scanning** - Automatic secret detection resolution
4. **Fix and Resolve Secrets** - Automatic secret fixing

## Workflows

### 1. CodeQL Analysis

**File:** `.github/workflows/codeql-analysis.yml`

**Purpose:** Automated security vulnerability scanning

**Triggers:**
- Push to main/master branches
- Pull requests
- Manual trigger

**Actions:**
- Analyzes code for security vulnerabilities
- Creates alerts in GitHub Security tab
- Generates reports

### 2. SonarCloud Analysis

**File:** `.github/workflows/sonarcloud.yml`

**Purpose:** Code quality and security analysis

**Triggers:**
- Push to main/master branches
- Pull requests
- Manual trigger

**Actions:**
- Runs SonarQube analysis
- Checks code quality metrics
- Identifies code smells and bugs
- Generates quality reports

**Requirements:**
- `SONAR_TOKEN` secret in GitHub
- SonarCloud project configured

### 3. Auto-Resolve Secret Scanning

**File:** `.github/workflows/auto-resolve-secret-scanning.yml`

**Purpose:** Automatically resolve secret scanning alerts

**Triggers:**
- Scheduled (daily)
- Manual trigger

**Actions:**
- Marks resolved alerts as fixed
- Does NOT fix code (use fix-and-resolve-secrets for that)

### 4. Fix and Resolve Secrets

**File:** `.github/workflows/fix-and-resolve-secrets.yml`

**Purpose:** Automatically fix and resolve secret scanning alerts

**Triggers:**
- Scheduled (weekly)
- Manual trigger

**Actions:**
- Finds files with secrets
- Fixes code (replaces with `process.env`)
- Creates PR with fixes
- Resolves alerts

## Pipeline Stages

### 1. Pre-Commit (Local)

**Hook:** `.git/hooks/pre-commit`

**Actions:**
- Formatting (Prettier)
- Basic linting

**Time:** ~10 seconds

### 2. Pre-Push (Local)

**Hook:** `.git/hooks/pre-push`

**Actions:**
- Linting (ESLint)
- Type checking (TypeScript)
- Build validation
- **Secret scanning** (CRITICAL)

**Time:** ~2-5 minutes

**Blocks push if:**
- Type errors
- Build failures
- **Secrets found**

### 3. CI (GitHub Actions)

**Triggers:** Push, PR, Manual

**Actions:**
- CodeQL analysis
- SonarCloud analysis
- Secret scanning
- Build verification

### 4. Deployment

**Platform:** Vercel

**Triggers:**
- Push to main/master
- PR previews

**Actions:**
- Build application
- Deploy to Vercel
- Run post-deployment checks

## Security Pipeline

See [docs/SECURITY.md](../SECURITY.md) for complete security pipeline details.

## Monitoring

### GitHub Security Tab

- View security alerts
- Review vulnerability reports
- Track secret scanning results

### SonarCloud Dashboard

- View code quality metrics
- Track technical debt
- Review security hotspots

## Troubleshooting

### Pipeline Failures

1. **Check GitHub Actions logs**
   - Go to Actions tab
   - Click on failed workflow
   - Review error messages

2. **Common Issues**
   - Missing secrets
   - Type errors
   - Build failures
   - Secret detection false positives

3. **Fix Steps**
   - Fix code issues locally
   - Run `bun run lint` and `bun run type-check`
   - Test build: `bun run build:check`
   - Push again

## Best Practices

1. **Always run pre-push hooks** - Don't skip with `--no-verify`
2. **Fix issues locally** - Don't push broken code
3. **Review CI results** - Check GitHub Actions after push
4. **Monitor security alerts** - Review GitHub Security tab regularly
5. **Keep secrets secure** - Never commit secrets

