# 🔍 SonarQube/SonarCloud Integration

This project uses **SonarCloud** for automated code quality and security analysis.

## ⚡ Quick Start

### 1. Setup (One-time)

1. **Create SonarCloud account**: [sonarcloud.io](https://sonarcloud.io/) (sign in with GitHub)
2. **Create organization** and note the organization key
3. **Create project** from GitHub repository
4. **Generate token**: My Account → Security → Generate Token
5. **Set environment variables**:

```bash
# Local (.env.local)
SONAR_TOKEN=your_token_here
SONAR_ORG=your-org-key

# GitHub Actions (Repository Secrets)
SONAR_TOKEN=your_token_here
SONAR_ORG=your-org-key
```

### 2. Run Analysis

```bash
# Standard analysis (1536MB memory)
npm run sonar

# Light mode (1024MB memory) - Recommended for local
npm run sonar:light

# Quick check (skip tests & build, 1024MB)
npm run sonar:quick
```

## 📊 Features

- ✅ **Code Quality**: Detects bugs, code smells, technical debt
- 🔒 **Security**: Identifies vulnerabilities and security hotspots
- 📈 **Coverage**: Tracks test coverage over time
- 🎯 **Quality Gates**: Enforces code quality standards
- 📉 **Technical Debt**: Measures and tracks technical debt

## 🚀 Usage Options

### Local Analysis (Recommended)

**Standard Mode:**
```bash
npm run sonar
```
- Memory: 1536MB
- Runs: Tests → Build → Analysis
- Best for: Full analysis before major releases

**Light Mode:**
```bash
npm run sonar:light
```
- Memory: 1024MB
- Runs: Tests → Build → Analysis
- Best for: Regular development checks

**Quick Mode:**
```bash
npm run sonar:quick
```
- Memory: 1024MB
- Runs: Analysis only (skips tests & build)
- Best for: Fast quality checks before commits

### GitHub Actions (Automatic)

Analysis runs automatically on:
- ✅ Push to `main`, `develop`, or `release/**` branches
- ✅ Pull requests to `main`, `develop`, or `release/**` branches
- ✅ Manual trigger via GitHub Actions UI

## 📈 View Results

After analysis, view detailed results at:
**https://sonarcloud.io/dashboard?id=zatona-web**

## 🎯 Quality Metrics

SonarCloud tracks:
- **Bugs**: Actual errors in code
- **Vulnerabilities**: Security issues
- **Code Smells**: Maintainability issues
- **Coverage**: Test coverage percentage
- **Duplications**: Code duplication
- **Technical Debt**: Estimated time to fix issues

## 🔧 Memory Management

The project uses memory-limited execution to prevent OOM errors:

| Command | Memory | Tests | Build | Use Case |
|---------|--------|-------|-------|----------|
| `npm run sonar` | 1536MB | ✅ | ✅ | Full analysis |
| `npm run sonar:light` | 1024MB | ✅ | ✅ | Limited memory |
| `npm run sonar:quick` | 1024MB | ❌ | ❌ | Fast check |
| `npm run sonar:skip-tests` | 1536MB | ❌ | ✅ | No tests |
| `npm run sonar:skip-build` | 1536MB | ✅ | ❌ | No build |

Customize memory:
```bash
SONAR_MEMORY_LIMIT=2048 npm run sonar
```

## 📚 Documentation

- **Quick Start**: [Rest/docs/SONARQUBE_QUICK_START.md](./Rest/docs/SONARQUBE_QUICK_START.md)
- **Full Setup**: [Rest/docs/SONARQUBE_SETUP.md](./Rest/docs/SONARQUBE_SETUP.md)

## 🔗 Resources

- [SonarCloud Dashboard](https://sonarcloud.io/)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [Quality Gates](https://docs.sonarcloud.io/user-guide/quality-gates/)

