# GitHub SAST Integration

## Overview

This document defines GitHub SAST (Static Application Security Testing) requirements, security vulnerability categories, and security scanning standards for the Elzatona web application refactoring.

## Security Vulnerability Categories

### Critical Vulnerabilities

**ZERO TOLERANCE** - All critical vulnerabilities must be resolved before merging:

#### 1. SQL Injection

- **Description**: Unvalidated user input in SQL queries
- **Risk**: Complete database compromise
- **Fix**: Use parameterized queries, ORM, input validation
- **Status**: Must be 0

#### 2. Cross-Site Scripting (XSS)

- **Description**: Unvalidated user input rendered in HTML
- **Risk**: Session hijacking, data theft
- **Fix**: Input validation, output encoding, CSP headers
- **Status**: Must be 0

#### 3. Authentication Bypass

- **Description**: Flaws allowing unauthorized access
- **Risk**: Complete system compromise
- **Fix**: Proper authentication checks, secure session management
- **Status**: Must be 0

#### 4. Authorization Issues

- **Description**: Insufficient access controls
- **Risk**: Unauthorized data access/modification
- **Fix**: Role-based access control, permission checks
- **Status**: Must be 0

#### 5. Sensitive Data Exposure

- **Description**: Exposure of passwords, tokens, PII
- **Risk**: Data breach, identity theft
- **Fix**: Encryption, secure storage, no logging of secrets
- **Status**: Must be 0

#### 6. Insecure Deserialization

- **Description**: Deserializing untrusted data
- **Risk**: Remote code execution
- **Fix**: Validate serialized data, use safe deserialization
- **Status**: Must be 0

#### 7. Server-Side Request Forgery (SSRF)

- **Description**: Forcing server to make requests
- **Risk**: Internal network access, data exfiltration
- **Fix**: Validate URLs, whitelist allowed domains
- **Status**: Must be 0

#### 8. Path Traversal

- **Description**: Accessing files outside intended directory
- **Risk**: File system access, data exposure
- **Fix**: Validate file paths, use safe file operations
- **Status**: Must be 0

### High Vulnerabilities

**MUST BE ADDRESSED** - High vulnerabilities require immediate attention:

#### 1. Weak Cryptography

- **Description**: Use of weak encryption algorithms
- **Risk**: Data decryption, security bypass
- **Fix**: Use strong, modern encryption
- **Status**: Must be 0

#### 2. Insecure Random Number Generation

- **Description**: Predictable random numbers
- **Risk**: Token/session prediction
- **Fix**: Use cryptographically secure random generators
- **Status**: Must be 0

#### 3. Missing CSRF Protection

- **Description**: No CSRF tokens on state-changing operations
- **Risk**: Unauthorized actions
- **Fix**: Implement CSRF tokens, SameSite cookies
- **Status**: Must be 0

#### 4. Insecure Cookie Handling

- **Description**: Cookies without secure flags
- **Risk**: Cookie theft, session hijacking
- **Fix**: Secure, HttpOnly, SameSite cookies
- **Status**: Must be 0

#### 5. Missing Security Headers

- **Description**: Missing security headers (CSP, HSTS, etc.)
- **Risk**: XSS, clickjacking, protocol downgrade
- **Fix**: Implement security headers
- **Status**: Must be 0

#### 6. Insecure File Operations

- **Description**: Unsafe file uploads/access
- **Risk**: Malicious file uploads, file system access
- **Fix**: Validate file types, sanitize filenames, restrict access
- **Status**: Must be 0

### Medium Vulnerabilities

**SHOULD BE ADDRESSED** - Medium vulnerabilities should be fixed in current sprint:

- Information disclosure
- Weak password policies
- Insecure direct object references
- Missing input validation
- Insecure redirects

### Low Vulnerabilities

**CAN BE ADDRESSED** - Low vulnerabilities can be fixed in next sprint:

- Missing error handling
- Weak session management
- Information leakage in errors
- Missing rate limiting
- Insecure dependencies

## Dependency Scanning Requirements

### Critical Dependency Vulnerabilities

**ZERO TOLERANCE** - All critical dependency vulnerabilities must be resolved:

- [ ] Critical vulnerabilities: 0
- [ ] Known exploits: 0
- [ ] Unpatched CVEs: 0

### High Dependency Vulnerabilities

**MUST BE ADDRESSED** - High dependency vulnerabilities require immediate attention:

- [ ] High vulnerabilities: 0
- [ ] Recent CVEs: Review and patch
- [ ] Outdated packages: Update

### Dependency Management

1. **Regular Updates**
   - Update dependencies monthly
   - Review security advisories weekly
   - Patch critical vulnerabilities immediately

2. **Dependency Review**
   - Review new dependencies before adding
   - Check for known vulnerabilities
   - Verify maintenance status

3. **Automated Scanning**
   - GitHub Dependabot enabled
   - Automated security alerts
   - Automated pull requests for patches

## Secret Detection Rules

### Zero Secrets Policy

**ZERO TOLERANCE** - No secrets in code or commit history:

- [ ] API keys: 0
- [ ] Database passwords: 0
- [ ] OAuth tokens: 0
- [ ] Private keys: 0
- [ ] Access tokens: 0

### Secret Management

1. **Use Environment Variables**

   ```typescript
   // ✅ GOOD: Use environment variables
   const apiKey = process.env.API_KEY;
   if (!apiKey) {
     throw new Error("API_KEY is required");
   }

   // ❌ BAD: Hardcoded secret
   const apiKey = "sk_live_1234567890abcdef";
   ```

2. **Use Secret Management Services**
   - AWS Secrets Manager
   - Azure Key Vault
   - HashiCorp Vault
   - GitHub Secrets (for CI/CD)

3. **Git Configuration**
   - `.env` files in `.gitignore`
   - `.env.example` for documentation
   - Pre-commit hooks for secret scanning
   - GitHub secret scanning enabled

### Secret Detection Tools

- **GitHub Secret Scanning**: Automatic scanning
- **TruffleHog**: Local secret scanning
- **Gitleaks**: Git history scanning
- **GitGuardian**: Real-time secret detection

## CodeQL Analysis Requirements

### CodeQL Queries

CodeQL runs the following security queries:

1. **Injection Queries**
   - SQL injection
   - Command injection
   - LDAP injection
   - XPath injection

2. **Authentication Queries**
   - Weak authentication
   - Missing authentication
   - Insecure session management

3. **Authorization Queries**
   - Missing authorization
   - Insecure direct object references
   - Privilege escalation

4. **Cryptography Queries**
   - Weak cryptography
   - Insecure random number generation
   - Hardcoded secrets

5. **Input Validation Queries**
   - Missing input validation
   - Path traversal
   - Unsafe deserialization

### CodeQL Results

- **Critical Issues**: 0 (ZERO TOLERANCE)
- **High Issues**: 0 (ZERO TOLERANCE)
- **Medium Issues**: Review and address
- **Low Issues**: Document and track

## Pull Request Security Checks

### Required Checks

All pull requests must pass:

1. **Secret Scanning**
   - [ ] No secrets detected
   - [ ] All secrets in environment variables
   - [ ] `.env` files properly gitignored

2. **Dependency Scanning**
   - [ ] No critical vulnerabilities
   - [ ] No high vulnerabilities
   - [ ] Dependencies up to date

3. **CodeQL Analysis**
   - [ ] CodeQL analysis: PASS
   - [ ] No critical security issues
   - [ ] No high security issues

4. **Security Review**
   - [ ] Security review completed
   - [ ] All security issues addressed
   - [ ] Security documentation updated

### PR Security Checklist

Before merging, verify:

- [ ] No secrets in code
- [ ] No secrets in commit history
- [ ] All dependencies secure
- [ ] CodeQL analysis passed
- [ ] Security review completed
- [ ] Security tests passing
- [ ] Security documentation updated

## Security Scanning Workflow

### Pre-Commit

1. **Local Secret Scan**

   ```bash
   # Run TruffleHog
   trufflehog filesystem . --json

   # Run Gitleaks
   gitleaks detect --source . --verbose
   ```

2. **Fix Issues**
   - Remove any detected secrets
   - Move secrets to environment variables
   - Update `.gitignore` if needed

### Pre-Push

1. **Pre-Push Hook**
   - Automatic secret scanning
   - Blocks push if secrets found
   - Provides detailed report

2. **Fix Issues**
   - Address all detected issues
   - Verify fixes
   - Re-run scan

### Pull Request

1. **Automated Scanning**
   - GitHub secret scanning
   - Dependency scanning
   - CodeQL analysis

2. **Review Results**
   - Check all security alerts
   - Review CodeQL findings
   - Address critical issues

3. **Security Review**
   - Manual security review
   - Verify fixes
   - Approve if all checks pass

## Security Issue Resolution Process

### 1. Identify Issues

- Review GitHub Security tab
- Check Dependabot alerts
- Review CodeQL findings
- Check secret scanning results

### 2. Assess Risk

- Determine actual risk level
- Check if issue is exploitable
- Review impact assessment
- Prioritize by severity

### 3. Fix Issues

- Follow secure coding practices
- Write security tests
- Update documentation
- Get security review

### 4. Verify Fixes

- Re-run security scans
- Verify alerts resolved
- Test security fixes
- Update security documentation

### 5. Document Resolution

- Document the issue
- Document the fix
- Update security notes
- Share learnings with team

## Security Best Practices

### 1. Input Validation

```typescript
// ✅ GOOD: Validate all inputs
function processUserInput(input: string): string {
  if (!input || input.length > 1000) {
    throw new Error("Invalid input");
  }
  return sanitize(input);
}

// ❌ BAD: No validation
function processUserInput(input: string): string {
  return input; // Dangerous!
}
```

### 2. Output Encoding

```typescript
// ✅ GOOD: Encode output
function displayUserContent(content: string): JSX.Element {
  return <div>{escapeHtml(content)}</div>;
}

// ❌ BAD: Direct HTML injection
function displayUserContent(content: string): JSX.Element {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
```

### 3. Authentication

```typescript
// ✅ GOOD: Proper authentication check
async function getProtectedData(userId: string): Promise<Data> {
  const user = await getCurrentUser();
  if (!user || user.id !== userId) {
    throw new Error("Unauthorized");
  }
  return fetchData(userId);
}

// ❌ BAD: No authentication check
async function getProtectedData(userId: string): Promise<Data> {
  return fetchData(userId); // Anyone can access!
}
```

### 4. Authorization

```typescript
// ✅ GOOD: Check permissions
async function deleteUser(userId: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }
  await deleteUserFromDatabase(userId);
}

// ❌ BAD: No authorization check
async function deleteUser(userId: string): Promise<void> {
  await deleteUserFromDatabase(userId); // Anyone can delete!
}
```

## Security Testing Requirements

### Security Test Coverage

- **Authentication Tests**: 100% coverage
- **Authorization Tests**: 100% coverage
- **Input Validation Tests**: 100% coverage
- **Output Encoding Tests**: 100% coverage
- **Security Headers Tests**: 100% coverage

### Security Test Types

1. **Unit Tests**
   - Input validation
   - Output encoding
   - Authentication logic
   - Authorization checks

2. **Integration Tests**
   - Authentication flows
   - Authorization flows
   - API security
   - Database security

3. **E2E Tests**
   - Complete security flows
   - Attack scenarios
   - Security bypass attempts
   - Data protection

## Security Monitoring

### Continuous Monitoring

- Monitor security alerts daily
- Review dependency updates weekly
- Review security reports monthly
- Conduct security audits quarterly

### Alert Response

1. **Critical Alerts**: Immediate response (<1 hour)
2. **High Alerts**: Urgent response (<4 hours)
3. **Medium Alerts**: Response within 24 hours
4. **Low Alerts**: Response within 1 week

## Compliance

### Security Standards

- OWASP Top 10 compliance
- CWE Top 25 compliance
- Industry best practices
- Regulatory requirements (if applicable)

### Security Documentation

- Security architecture documented
- Security procedures documented
- Incident response plan documented
- Security training materials available

## References

- [GitHub Security](https://docs.github.com/en/code-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [CodeQL Documentation](https://codeql.github.com/docs/)
