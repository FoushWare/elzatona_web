# Security Development Reference

## Overview

This document provides security guidelines and best practices for developers. Reference this document during development to ensure security is built into your code from the start.

## 🔒 Security Principles

### 1. Defense in Depth

Implement multiple layers of security:

- **Input Validation** - Validate all inputs
- **Authentication** - Verify user identity
- **Authorization** - Check user permissions
- **Encryption** - Encrypt sensitive data
- **Logging** - Log security events
- **Monitoring** - Monitor for security issues

### 2. Least Privilege

Grant minimum necessary permissions:

- **User Permissions** - Users should only access what they need
- **Service Accounts** - Use service accounts with minimal permissions
- **API Keys** - Use keys with minimum required scopes
- **Database Access** - Limit database access to necessary operations

### 3. Fail Securely

Handle failures securely:

- **Error Messages** - Don't expose sensitive information
- **Default Deny** - Deny access by default
- **Secure Defaults** - Use secure default configurations
- **Error Handling** - Handle errors without exposing internals

### 4. Secure by Default

Security should be the default:

- **HTTPS Only** - Use HTTPS everywhere
- **Secure Headers** - Set security headers
- **Input Sanitization** - Sanitize all inputs
- **Output Encoding** - Encode all outputs

## 📋 Security Checklist

Use this checklist during development:

### Before Writing Code

- [ ] Reviewed threat model for the feature
- [ ] Identified security requirements
- [ ] Reviewed security guidelines
- [ ] Planned security testing approach

### During Development

- [ ] **Input Validation**
  - [ ] All user inputs validated
  - [ ] Input length limits enforced
  - [ ] Input type validation
  - [ ] SQL injection prevention
  - [ ] XSS prevention

- [ ] **Authentication & Authorization**
  - [ ] Authentication implemented
  - [ ] Authorization checks in place
  - [ ] Session management secure
  - [ ] Password requirements enforced
  - [ ] Multi-factor authentication (if applicable)

- [ ] **Data Protection**
  - [ ] Sensitive data encrypted
  - [ ] Secrets stored securely (environment variables)
  - [ ] PII handled according to privacy requirements
  - [ ] Data transmission encrypted (HTTPS)

- [ ] **Error Handling**
  - [ ] Errors don't expose sensitive information
  - [ ] Error messages are user-friendly
  - [ ] Errors are logged appropriately
  - [ ] Stack traces not exposed in production

- [ ] **Logging & Monitoring**
  - [ ] Security events logged
  - [ ] Logs don't contain sensitive data
  - [ ] Monitoring in place
  - [ ] Alerts configured

### Before Committing

- [ ] **Code Review**
  - [ ] Security review completed
  - [ ] No hardcoded secrets
  - [ ] No security vulnerabilities
  - [ ] Security tests written

- [ ] **Static Analysis**
  - [ ] ESLint security rules pass
  - [ ] SonarQube security issues resolved
  - [ ] Secret scanning passed
  - [ ] TypeScript type safety verified

- [ ] **Testing**
  - [ ] Security tests pass
  - [ ] Input validation tested
  - [ ] Authorization tested
  - [ ] Error handling tested

## 🛡️ Common Security Vulnerabilities

### 1. Injection Attacks

**Prevention:**
- Use parameterized queries
- Validate and sanitize all inputs
- Use ORM/query builders
- Escape special characters

**Example:**
```typescript
// ❌ DON'T: SQL Injection
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ DO: Parameterized Query
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId);
```

### 2. Cross-Site Scripting (XSS)

**Prevention:**
- Encode all outputs
- Use React's built-in XSS protection
- Sanitize user-generated content
- Use Content Security Policy (CSP)

**Example:**
```typescript
// ❌ DON'T: Direct HTML injection
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ DO: React's built-in protection
<div>{userInput}</div> // React automatically escapes
```

### 3. Cross-Site Request Forgery (CSRF)

**Prevention:**
- Use CSRF tokens
- Verify origin/referer headers
- Use SameSite cookies
- Require authentication for state-changing operations

### 4. Authentication Bypass

**Prevention:**
- Strong password requirements
- Secure session management
- Multi-factor authentication
- Rate limiting on login attempts
- Account lockout after failed attempts

### 5. Sensitive Data Exposure

**Prevention:**
- Encrypt sensitive data at rest
- Encrypt data in transit (HTTPS)
- Don't log sensitive data
- Use environment variables for secrets
- Implement proper access controls

**Example:**
```typescript
// ❌ DON'T: Hardcode secrets
const apiKey = "sk_live_1234567890";

// ✅ DO: Use environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY is required");
}
```

### 6. Insecure Dependencies

**Prevention:**
- Keep dependencies updated
- Use `npm audit` regularly
- Review dependency licenses
- Use security scanning tools

**Commands:**
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check outdated packages
npm outdated
```

### 7. Insufficient Logging & Monitoring

**Prevention:**
- Log all security events
- Monitor for suspicious activity
- Set up alerts
- Regular security reviews

## 🔐 Secret Management

### Never Hardcode Secrets

**❌ DON'T:**
```typescript
const apiKey = "sk_live_1234567890";
const dbPassword = "mypassword123";
```

**✅ DO:**
```typescript
const apiKey = process.env.API_KEY;
const dbPassword = process.env.DB_PASSWORD;

if (!apiKey || !dbPassword) {
  throw new Error("Required environment variables are missing");
}
```

### Environment Variables

1. **Use `.env.local`** for local development
2. **Never commit** `.env.local` files
3. **Use `.env.example`** for documentation
4. **Rotate secrets** if exposed (see [Secret Rotation Guide](../SECRET_ROTATION_GUIDE.md))

### Secret Scanning

- **Pre-push hook** - Automatically scans for secrets
- **GitHub Actions** - Scans all commits
- **Never skip** secret scanning

## 🔍 Security Code Patterns

### Input Validation

```typescript
// ✅ DO: Validate and sanitize inputs
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000); // Limit length
}
```

### Authorization Checks

```typescript
// ✅ DO: Always check authorization
async function deleteUser(userId: string, currentUser: User) {
  // Check if user has permission
  if (currentUser.role !== 'admin' && currentUser.id !== userId) {
    throw new Error('Unauthorized');
  }
  
  // Perform deletion
  await supabase.from('users').delete().eq('id', userId);
}
```

### Secure Error Handling

```typescript
// ❌ DON'T: Expose sensitive information
catch (error) {
  return { error: error.message }; // May expose internals
}

// ✅ DO: Generic error messages
catch (error) {
  console.error('Error:', error); // Log for debugging
  return { error: 'An error occurred. Please try again.' };
}
```

## 📚 Security Resources

### OWASP Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)

### Project-Specific
- [Security Pipeline](../COMPLETE_SECURITY_PIPELINE.md)
- [Secret Management](../SECRET_ROTATION_GUIDE.md)
- [Threat Modeling](threat-modeling.md)
- [Static Analysis](static-analysis.md)

## 🚨 Security Incident Response

If you discover a security vulnerability:

1. **Don't commit** the fix publicly
2. **Create a private branch** for the fix
3. **Rotate affected secrets** immediately
4. **Notify the team** (if applicable)
5. **Fix the vulnerability** following security guidelines
6. **Test the fix** thoroughly
7. **Deploy the fix** following security process

## ✅ Security Review Checklist

Before submitting code for review:

- [ ] All security checklist items completed
- [ ] Static analysis passed
- [ ] Security tests written and passing
- [ ] No secrets in code
- [ ] Input validation implemented
- [ ] Authorization checks in place
- [ ] Error handling secure
- [ ] Logging implemented (without sensitive data)
- [ ] Dependencies updated and secure
- [ ] Security documentation updated (if needed)

