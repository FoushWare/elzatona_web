# Security Testing

## Overview

Security testing ensures that security controls work as intended and that vulnerabilities are identified before deployment. This includes both automated and manual testing.

## 🧪 Types of Security Testing

### 1. Unit Security Tests

**Purpose:** Test security controls at the unit level

**Focus Areas:**
- Input validation
- Authentication logic
- Authorization checks
- Encryption/decryption
- Error handling

**Example:**
```typescript
// Input validation test
describe('validateEmail', () => {
  it('should reject SQL injection attempts', () => {
    expect(validateEmail("'; DROP TABLE users; --")).toBe(false);
  });
  
  it('should reject XSS attempts', () => {
    expect(validateEmail('<script>alert("xss")</script>')).toBe(false);
  });
});
```

### 2. Integration Security Tests

**Purpose:** Test security controls across components

**Focus Areas:**
- API security
- Authentication flows
- Authorization flows
- Data encryption
- Session management

**Example:**
```typescript
// API authorization test
describe('DELETE /api/users/:id', () => {
  it('should reject unauthorized requests', async () => {
    const response = await fetch('/api/users/123', {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer invalid-token' }
    });
    expect(response.status).toBe(401);
  });
  
  it('should allow admin users', async () => {
    const token = await getAdminToken();
    const response = await fetch('/api/users/123', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(response.status).toBe(200);
  });
});
```

### 3. E2E Security Tests

**Purpose:** Test security from user perspective

**Focus Areas:**
- Authentication flows
- Authorization in UI
- Data protection
- Session management
- Error handling

**Example:**
```typescript
// E2E authentication test
test('user cannot access admin panel without admin role', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL('/login');
  await expect(page.locator('text=Unauthorized')).toBeVisible();
});
```

### 4. Penetration Testing

**Purpose:** Simulate real-world attacks

**Focus Areas:**
- Authentication bypass
- Authorization bypass
- Injection attacks
- XSS attacks
- CSRF attacks

**Tools:**
- OWASP ZAP
- Burp Suite
- Postman (for API testing)

### 5. Vulnerability Scanning

**Purpose:** Automated vulnerability detection

**Tools:**
- npm audit (dependency vulnerabilities)
- Snyk (dependency and code scanning)
- OWASP Dependency-Check

## 🔒 Security Test Categories

### Authentication Testing

**Test Cases:**
- [ ] Valid credentials accepted
- [ ] Invalid credentials rejected
- [ ] Password requirements enforced
- [ ] Account lockout after failed attempts
- [ ] Session timeout works
- [ ] Password reset flow secure
- [ ] MFA works (if implemented)

**Example:**
```typescript
describe('Authentication', () => {
  it('should lock account after 5 failed attempts', async () => {
    for (let i = 0; i < 5; i++) {
      await login('user@example.com', 'wrong-password');
    }
    const response = await login('user@example.com', 'correct-password');
    expect(response.status).toBe(429); // Too Many Requests
  });
});
```

### Authorization Testing

**Test Cases:**
- [ ] Unauthorized users cannot access protected resources
- [ ] Users cannot access other users' data
- [ ] Admin-only endpoints protected
- [ ] Role-based access control works
- [ ] Permission checks in place

**Example:**
```typescript
describe('Authorization', () => {
  it('should prevent users from accessing other users data', async () => {
    const user1Token = await getUserToken('user1');
    const response = await fetch('/api/users/user2/data', {
      headers: { 'Authorization': `Bearer ${user1Token}` }
    });
    expect(response.status).toBe(403);
  });
});
```

### Input Validation Testing

**Test Cases:**
- [ ] SQL injection prevented
- [ ] XSS prevented
- [ ] Command injection prevented
- [ ] Path traversal prevented
- [ ] Input length limits enforced
- [ ] Type validation works

**Example:**
```typescript
describe('Input Validation', () => {
  const sqlInjectionPayloads = [
    "'; DROP TABLE users; --",
    "' OR '1'='1",
    "admin'--",
    "' UNION SELECT * FROM users--"
  ];
  
  sqlInjectionPayloads.forEach(payload => {
    it(`should reject SQL injection: ${payload}`, async () => {
      const response = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({ query: payload })
      });
      expect(response.status).toBe(400);
    });
  });
});
```

### Data Protection Testing

**Test Cases:**
- [ ] Sensitive data encrypted
- [ ] Passwords hashed
- [ ] PII protected
- [ ] Data transmission encrypted (HTTPS)
- [ ] Secrets not exposed in logs

**Example:**
```typescript
describe('Data Protection', () => {
  it('should not expose passwords in API responses', async () => {
    const response = await fetch('/api/users/me');
    const data = await response.json();
    expect(data).not.toHaveProperty('password');
    expect(data).not.toHaveProperty('passwordHash');
  });
  
  it('should hash passwords before storage', async () => {
    const password = 'myPassword123';
    const hashed = await hashPassword(password);
    expect(hashed).not.toBe(password);
    expect(hashed.length).toBeGreaterThan(50); // Bcrypt hash length
  });
});
```

### Session Management Testing

**Test Cases:**
- [ ] Sessions expire correctly
- [ ] Session tokens secure
- [ ] Logout invalidates session
- [ ] Concurrent sessions handled
- [ ] Session fixation prevented

**Example:**
```typescript
describe('Session Management', () => {
  it('should invalidate session on logout', async () => {
    const token = await login('user@example.com', 'password');
    await logout(token);
    const response = await fetch('/api/protected', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    expect(response.status).toBe(401);
  });
});
```

## 🛠️ Security Testing Tools

### 1. Jest (Unit & Integration Tests)

**Configuration:** `jest.config.js`

**Usage:**
```bash
# Run all tests
bun run test

# Run unit tests
bun run test:unit

# Run integration tests
bun run test:integration
```

### 2. Playwright (E2E Tests)

**Configuration:** `playwright.config.ts`

**Usage:**
```bash
# Run E2E tests
bun run test:e2e

# Run in UI mode
bun run test:e2e --ui
```

### 3. OWASP ZAP (Penetration Testing)

**Usage:**
```bash
# Install OWASP ZAP
# Run automated scan
zap-cli quick-scan --self-contained http://localhost:3000
```

### 4. npm audit (Dependency Scanning)

**Usage:**
```bash
# Check vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## 📋 Security Testing Checklist

### Before Development

- [ ] Security test plan created
- [ ] Test cases defined
- [ ] Test data prepared
- [ ] Test environment configured

### During Development

- [ ] Unit security tests written
- [ ] Integration security tests written
- [ ] E2E security tests written
- [ ] Tests passing

### Before Deployment

- [ ] All security tests pass
- [ ] Penetration testing completed (if applicable)
- [ ] Vulnerability scanning completed
- [ ] Security test coverage reviewed

## 🔄 Security Testing Workflow

### 1. Write Security Tests

Write tests alongside feature development:

```typescript
// Feature: User registration
describe('User Registration Security', () => {
  it('should validate email format', () => {
    // Test input validation
  });
  
  it('should hash passwords', () => {
    // Test password security
  });
  
  it('should prevent duplicate emails', () => {
    // Test business logic security
  });
});
```

### 2. Run Security Tests

```bash
# Run all security-related tests
bun run test --grep "security"

# Run specific security test suite
bun run test:unit -- security
```

### 3. Review Test Results

- **Passing Tests** - Security controls working
- **Failing Tests** - Security issues found
- **Missing Tests** - Security gaps identified

### 4. Fix Security Issues

1. **Identify** - Identify the security issue
2. **Fix** - Implement security fix
3. **Test** - Verify fix with tests
4. **Document** - Document the fix

## 🎯 Security Test Coverage

### Minimum Coverage Requirements

- **Authentication** - 100% coverage
- **Authorization** - 100% coverage
- **Input Validation** - 90%+ coverage
- **Data Protection** - 90%+ coverage
- **Error Handling** - 80%+ coverage

### Coverage Tools

```bash
# Generate coverage report
bun run test:unit -- --coverage

# View coverage report
open coverage/lcov-report/index.html
```

## 🚨 Security Test Scenarios

### Common Attack Scenarios

1. **SQL Injection**
   ```typescript
   test('should prevent SQL injection', async () => {
     const payload = "'; DROP TABLE users; --";
     const response = await api.search(payload);
     expect(response.status).toBe(400);
   });
   ```

2. **XSS Attack**
   ```typescript
   test('should prevent XSS', async () => {
     const payload = '<script>alert("xss")</script>';
     const response = await api.createComment(payload);
     // Verify script is escaped in response
     expect(response.body).not.toContain('<script>');
   });
   ```

3. **CSRF Attack**
   ```typescript
   test('should prevent CSRF', async () => {
     const response = await api.deleteUser('123', {
       // Missing CSRF token
     });
     expect(response.status).toBe(403);
   });
   ```

4. **Authentication Bypass**
   ```typescript
   test('should require authentication', async () => {
     const response = await api.getProtectedData();
     expect(response.status).toBe(401);
   });
   ```

5. **Authorization Bypass**
   ```typescript
   test('should enforce authorization', async () => {
     const userToken = await getUserToken('regular-user');
     const response = await api.deleteUser('123', {
       headers: { 'Authorization': `Bearer ${userToken}` }
     });
     expect(response.status).toBe(403);
   });
   ```

## 📊 Security Test Metrics

Track these metrics:

- **Security Test Coverage** - Percentage of security controls tested
- **Security Test Pass Rate** - Percentage of tests passing
- **Vulnerabilities Found** - Number of vulnerabilities discovered
- **Time to Fix** - Average time to fix security issues

## 🔄 Continuous Security Testing

### Automated Testing

- **CI/CD Pipeline** - Run security tests on every commit
- **Pre-commit Hooks** - Run quick security checks
- **Scheduled Scans** - Regular vulnerability scans

### Manual Testing

- **Code Review** - Security-focused code review
- **Penetration Testing** - Regular penetration tests
- **Security Audits** - Periodic security audits

## 📚 Resources

- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Security Testing Tools](https://owasp.org/www-community/Vulnerability_Scanning_Tools)

