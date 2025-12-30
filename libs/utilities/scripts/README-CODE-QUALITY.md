# Code Quality & Security Analysis Tools

This directory contains scripts to run code quality and security analysis locally, catching issues before CI/CD.

## Quick Start

### Run All Checks (Recommended)

```bash
# Run all checks (ESLint, TypeScript, Prettier, SonarQube)
npm run check:all

# Quick check (skip SonarQube for faster results)
npm run check:all:quick
```

## Available Tools

### 1. **ESLint** (Code Quality & Style)

```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
```

**What it checks:**

- Code quality issues
- Style violations
- Potential bugs
- Best practices

### 2. **TypeScript Type Checking**

```bash
npm run type-check
```

**What it checks:**

- Type errors
- Missing type definitions
- Type mismatches

### 3. **Prettier** (Code Formatting)

```bash
npm run format        # Auto-fix formatting
npx prettier --check .  # Check formatting only
```

**What it checks:**

- Code formatting consistency
- Indentation
- Line breaks

### 4. **SonarQube/SonarCloud** (Comprehensive Analysis)

```bash
# Full analysis (with tests and build)
npm run sonar

# Light mode (faster, less memory)
npm run sonar:light

# Quick mode (skip tests and build)
npm run sonar:quick
```

**Prerequisites:**

- Set `SONAR_TOKEN` environment variable
  ```bash
  export SONAR_TOKEN=your_token_here
  # Or add to .env.local:
  # SONAR_TOKEN=your_token_here
  ```

**What it checks:**

- Code smells
- Security vulnerabilities
- Code duplication
- Test coverage
- Maintainability issues

**Get your token:**

1. Go to https://sonarcloud.io/
2. Log in with GitHub
3. Go to My Account > Security
4. Generate a new token

### 5. **CodeQL** (GitHub Advanced Security)

CodeQL is GitHub's security analysis tool. It runs automatically in CI, but you can also run it locally:

**Installation:**

```bash
# Install CodeQL CLI
brew install codeql  # macOS
# Or download from: https://github.com/github/codeql-cli-binaries/releases
```

**Run CodeQL locally:**

```bash
# 1. Create CodeQL database
codeql database create codeql-db --language=javascript,typescript

# 2. Run analysis
codeql database analyze codeql-db --format=sarif-latest --output=codeql-results.sarif

# 3. View results
codeql bqrs interpret codeql-results.sarif
```

**Note:** CodeQL analysis is complex and usually better run in CI. The GitHub Actions workflow (`.github/workflows/codeql-analysis.yml`) handles this automatically.

## Recommended Workflow

### Before Committing

```bash
# Quick check (fastest)
npm run check:all:quick

# Or full check (includes SonarQube)
npm run check:all
```

### Before Pushing

```bash
# Run all checks including SonarQube
npm run check:all

# Fix any issues found
npm run lint:fix
npm run format
```

### Weekly/Monthly

```bash
# Full SonarQube analysis
npm run sonar
```

## Understanding the Results

### ESLint Errors

- **Errors**: Must fix before committing
- **Warnings**: Should fix, but won't block CI
- Use `npm run lint:fix` to auto-fix many issues

### TypeScript Errors

- **Type errors**: Must fix
- Usually indicates actual bugs or missing type definitions

### SonarQube Issues

- **Blocker/Critical**: Security vulnerabilities - fix immediately
- **Major**: Code smells - should fix
- **Minor**: Code quality - nice to fix
- **Info**: Suggestions - optional

### CodeQL Alerts (from GitHub)

- **High**: Security vulnerabilities - fix immediately
- **Medium**: Potential issues - should review
- **Warning/Note**: Code quality - optional

## Troubleshooting

### SonarQube fails with "SONAR_TOKEN not set"

```bash
export SONAR_TOKEN=your_token_here
# Or add to .env.local
```

### SonarQube fails with "SonarScanner not found"

```bash
# Option 1: Install globally
npm install -g sonarqube-scanner

# Option 2: Use npx (no installation needed)
# The script will use npx automatically
```

### Out of memory errors

```bash
# Use light mode
npm run sonar:light

# Or set memory limit
export SONAR_MEMORY_LIMIT=1024
npm run sonar
```

## Integration with Git Hooks

The project includes pre-commit and pre-push hooks that run some of these checks automatically:

- **Pre-commit**: Runs Prettier formatting
- **Pre-push**: Runs ESLint, TypeScript, and optionally SonarQube

To enable SonarQube in pre-push hook:

```bash
export SONAR_ENABLE_PRE_PUSH=true
```

## CI/CD Integration

All these checks also run in CI:

- **ESLint & TypeScript**: `.github/workflows/ci-checks.yml`
- **SonarQube**: `.github/workflows/sonarcloud.yml`
- **CodeQL**: `.github/workflows/codeql-analysis.yml`

Running checks locally helps catch issues before CI fails!












