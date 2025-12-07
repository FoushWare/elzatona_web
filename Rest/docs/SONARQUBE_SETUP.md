# SonarQube/SonarCloud Setup Guide

## Overview

This project uses **SonarCloud** (cloud-based SonarQube) for code quality and security analysis. SonarCloud provides:

- 🔍 **Code Quality Analysis**: Detects bugs, code smells, and technical debt
- 🔒 **Security Vulnerabilities**: Identifies security hotspots and vulnerabilities
- 📊 **Code Coverage**: Tracks test coverage over time
- 🎯 **Quality Gates**: Enforces code quality standards
- 📈 **Technical Debt**: Measures and tracks technical debt

## Setup Instructions

### 1. Create SonarCloud Account

1. Go to [https://sonarcloud.io/](https://sonarcloud.io/)
2. Click **"Log in"** and sign in with your **GitHub account**
3. Authorize SonarCloud to access your GitHub repositories

### 2. Create Organization

1. After logging in, create a new organization (or use existing)
2. Note your **organization key** (e.g., `your-org-key`)

### 3. Create Project

1. Go to **"Projects"** → **"Create Project"**
2. Select **"From GitHub"**
3. Choose your repository: `FoushWare/GreatFrontendHub`
4. Project key will be auto-generated: `zatona-web` (or customize it)

### 4. Generate Token

1. Go to **"My Account"** → **"Security"**
2. Click **"Generate Token"**
3. Give it a name (e.g., "GitHub Actions")
4. Copy the token (you won't see it again!)

### 5. Configure Environment Variables

#### For Local Development

Add to your `.env.local` file:

```bash
SONAR_TOKEN=your_sonarcloud_token_here
SONAR_ORG=your-org-key
```

#### For GitHub Actions

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:
   - `SONAR_TOKEN`: Your SonarCloud token
   - `SONAR_ORG`: Your SonarCloud organization key

## Usage

### Local Analysis (Recommended for Development)

#### Standard Analysis (1536MB memory)

```bash
npm run sonar
```

#### Light Mode (1024MB memory)

```bash
npm run sonar:light
```

#### Quick Analysis (Skip tests and build)

```bash
npm run sonar:quick
```

#### Skip Tests Only

```bash
npm run sonar:skip-tests
```

#### Skip Build Only

```bash
npm run sonar:skip-build
```

### GitHub Actions (Automatic)

The analysis runs automatically on:

- Push to `main`, `develop`, or `release/**` branches
- Pull requests to `main`, `develop`, or `release/**` branches
- Manual trigger via GitHub Actions UI

## Configuration Files

### `sonar-project.properties`

Main configuration file that defines:

- Project identification
- Source code locations
- Exclusions (node_modules, tests, etc.)
- Coverage settings
- Language settings

### `.github/workflows/sonarcloud.yml`

GitHub Actions workflow that:

- Runs tests with coverage
- Builds the project
- Executes SonarCloud analysis
- Uploads results to SonarCloud

## Memory Management

The project uses memory-limited execution to prevent out-of-memory errors:

- **Standard**: 1536MB (`--max-old-space-size=1536`)
- **Light**: 1024MB (`--max-old-space-size=1024`)
- **Quick**: 1024MB (skips tests and build)

You can customize memory limits by setting `SONAR_MEMORY_LIMIT` environment variable:

```bash
SONAR_MEMORY_LIMIT=2048 npm run sonar
```

## Understanding Results

### Quality Gate

The **Quality Gate** determines if your code meets quality standards:

- ✅ **Pass**: Code meets all quality standards
- ❌ **Fail**: Code has issues that need to be addressed

### Metrics

- **Bugs**: Actual errors in the code
- **Vulnerabilities**: Security issues
- **Code Smells**: Maintainability issues
- **Coverage**: Test coverage percentage
- **Duplications**: Code duplication percentage
- **Technical Debt**: Estimated time to fix all issues

### Severity Levels

1. **Blocker**: Must be fixed immediately
2. **Critical**: Should be fixed as soon as possible
3. **Major**: Should be fixed in the near future
4. **Minor**: Nice to have
5. **Info**: Informational only

## Best Practices

1. **Run Local Analysis Before Pushing**

   ```bash
   npm run sonar:quick  # Fast check before commit
   ```

2. **Fix Critical Issues First**
   - Focus on Blocker and Critical severity issues
   - Security vulnerabilities should be addressed immediately

3. **Maintain Quality Gate**
   - Don't merge PRs that fail the quality gate
   - Fix issues incrementally

4. **Review Coverage**
   - Aim for >80% code coverage
   - Focus on critical paths first

5. **Regular Analysis**
   - Run analysis before major releases
   - Monitor technical debt trends

## Troubleshooting

### "SONAR_TOKEN not set"

- Add `SONAR_TOKEN` to `.env.local` or export it
- For GitHub Actions, add it as a secret

### "SONAR_ORG not set"

- Add `SONAR_ORG` to `.env.local` or export it
- For GitHub Actions, add it as a secret

### "Out of memory" errors

- Use light mode: `npm run sonar:light`
- Use quick mode: `npm run sonar:quick`
- Increase memory: `SONAR_MEMORY_LIMIT=2048 npm run sonar`

### "Project not found"

- Ensure project exists in SonarCloud
- Check project key matches `sonar-project.properties`
- Verify organization key is correct

### Analysis takes too long

- Use `--skip-tests` to skip test execution
- Use `--skip-build` to skip build step
- Use quick mode: `npm run sonar:quick`

## Integration with Pre-Push Hook

The pre-push hook can optionally run SonarQube analysis. To enable:

1. Edit `Rest/other/.husky/pre-push`
2. Add SonarQube check before build step
3. Or run manually: `npm run sonar:quick` before pushing

## Resources

- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [SonarQube Rules](https://rules.sonarsource.com/)
- [Quality Gates](https://docs.sonarcloud.io/user-guide/quality-gates/)
- [Security Hotspots](https://docs.sonarcloud.io/user-guide/security-hotspots/)

## Support

For issues or questions:

1. Check SonarCloud dashboard for detailed error messages
2. Review [SonarCloud documentation](https://docs.sonarcloud.io/)
3. Check GitHub Actions logs for workflow issues
