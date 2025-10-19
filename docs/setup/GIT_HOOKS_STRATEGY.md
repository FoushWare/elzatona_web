# Git Hooks Strategy for Admin Login Tests

This document outlines the comprehensive Git hooks strategy implemented for the admin login tests, following industry best practices for automated testing and code quality.

## 🎯 Strategy Overview

We implement a **tiered testing approach** that balances thoroughness with developer productivity:

- **Pre-commit**: Fast, essential tests (API tests only)
- **Pre-push**: Comprehensive tests (all admin tests)
- **CI/CD**: Full test suite with coverage and reporting

## 📋 Available Configurations

### 1. Standard Configuration

```bash
npm run git-hooks:standard
```

**Pre-commit**: Formatting + Linting only  
**Pre-push**: Build validation (development branches only)

### 2. Admin Tests Configuration

```bash
npm run git-hooks:admin-tests
```

**Pre-commit**: Formatting + Linting + Fast Admin Tests  
**Pre-push**: Build validation + Comprehensive Admin Tests

### 3. Fast Configuration

```bash
npm run git-hooks:fast
```

**Pre-commit**: Formatting + Linting + Fast Admin Tests (API only)  
**Pre-push**: Build validation + Comprehensive Admin Tests

### 4. Comprehensive Configuration

```bash
npm run git-hooks:comprehensive
```

**Pre-commit**: Formatting + Linting + Fast Admin Tests  
**Pre-push**: Build validation + Comprehensive Admin Tests + Coverage

## 🚀 Quick Start

### Enable Admin Login Tests in Git Hooks

```bash
# Enable admin tests (recommended for development)
npm run git-hooks:admin-tests

# Check current configuration
npm run git-hooks:status
```

### Run Tests Manually

```bash
# Run all admin login tests
npm run test:admin-login

# Run fast tests only (API tests)
npm run test:admin-login:fast

# Run tests with coverage
npm run test:admin-login:coverage

# Run tests in watch mode
npm run test:admin-login:watch
```

## 🔧 Configuration Details

### Pre-commit Hook Features

- **Prettier Formatting**: Ensures consistent code formatting
- **ESLint Linting**: Catches code quality issues
- **Fast Admin Tests**: Runs only critical API tests (< 10 seconds)
- **Automatic Staging**: Adds formatted files to git staging

### Pre-push Hook Features

- **Build Validation**: Ensures code compiles successfully
- **Comprehensive Admin Tests**: Runs all admin login tests
- **Branch-specific**: Only runs on development branches
- **Build Cleanup**: Removes build artifacts after validation

### CI/CD Pipeline Features

- **Multi-Node Testing**: Tests on Node.js 18.x and 20.x
- **Coverage Reporting**: Generates detailed coverage reports
- **PR Comments**: Automatically comments on pull requests
- **Environment Variables**: Secure handling of test secrets

## 📊 Performance Characteristics

| Configuration | Pre-commit Time | Pre-push Time | Coverage |
| ------------- | --------------- | ------------- | -------- |
| Standard      | ~5 seconds      | ~30 seconds   | None     |
| Admin Tests   | ~15 seconds     | ~45 seconds   | Basic    |
| Fast          | ~10 seconds     | ~45 seconds   | Basic    |
| Comprehensive | ~15 seconds     | ~60 seconds   | Full     |

## 🛡️ Best Practices Implemented

### 1. **Fail Fast Principle**

- Pre-commit hooks run fast tests to catch issues early
- Pre-push hooks run comprehensive tests before sharing code
- CI/CD runs full validation before merging

### 2. **Developer Experience**

- Fast feedback loops for common issues
- Clear error messages with actionable advice
- Automatic backup of existing hooks before changes

### 3. **Security & Quality**

- Environment variable validation
- Secure handling of test secrets
- Comprehensive error handling and logging

### 4. **Maintainability**

- Modular hook configurations
- Easy switching between configurations
- Comprehensive documentation and status reporting

## 🔍 Monitoring & Debugging

### Check Current Configuration

```bash
npm run git-hooks:status
```

### View Hook Contents

```bash
# View pre-commit hook
cat .husky/pre-commit

# View pre-push hook
cat .husky/pre-push
```

### Test Hook Execution

```bash
# Test pre-commit hook manually
.husky/pre-commit

# Test pre-push hook manually
.husky/pre-push
```

### Debug Test Failures

```bash
# Run tests with verbose output
npm run test:admin-login:fast -- --verbose

# Run specific test file
npx jest tests/admin/admin-login-api.test.ts --verbose

# Run tests with coverage
npm run test:admin-login:coverage
```

## 🚨 Troubleshooting

### Common Issues

1. **Tests failing in pre-commit**

   ```bash
   # Run fast tests manually to debug
   npm run test:admin-login:fast

   # Check environment variables
   npm run git-hooks:status
   ```

2. **Slow pre-commit hooks**

   ```bash
   # Switch to fast configuration
   npm run git-hooks:fast

   # Or disable admin tests temporarily
   npm run git-hooks:standard
   ```

3. **Pre-push hooks not running**

   ```bash
   # Check if you're on a development branch
   git branch --show-current

   # Pre-push only runs on: main, develop, release/v1.0.0-main-website
   ```

4. **Environment variable issues**

   ```bash
   # Check if .env file exists
   ls -la .env

   # Run setup script
   npm run setup-env
   ```

### Recovery Options

1. **Restore from backup**

   ```bash
   # List available backups
   ls -la .husky/*.backup.*

   # Restore specific backup
   cp .husky/pre-commit.backup.20250108_120000 .husky/pre-commit
   ```

2. **Reset to standard configuration**

   ```bash
   npm run git-hooks:standard
   ```

3. **Disable hooks temporarily**
   ```bash
   # Rename hooks to disable them
   mv .husky/pre-commit .husky/pre-commit.disabled
   mv .husky/pre-push .husky/pre-push.disabled
   ```

## 📈 Metrics & Reporting

### Test Coverage Goals

- **API Tests**: >95% coverage
- **UI Tests**: >90% coverage
- **Integration Tests**: >85% coverage
- **Overall**: >90% coverage

### Performance Targets

- **Pre-commit**: <15 seconds
- **Pre-push**: <60 seconds
- **CI/CD**: <5 minutes

### Quality Metrics

- **Test Reliability**: <1% flaky test rate
- **Build Success**: >99% success rate
- **Code Quality**: ESLint errors <5 per commit

## 🔄 Continuous Improvement

### Regular Maintenance

- Review test performance monthly
- Update test configurations quarterly
- Monitor CI/CD pipeline health weekly

### Feedback Collection

- Track developer feedback on hook performance
- Monitor test failure patterns
- Analyze build time trends

### Future Enhancements

- Parallel test execution
- Cached test results
- Smart test selection based on changed files
- Integration with IDE plugins

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Maintainer**: Development Team
