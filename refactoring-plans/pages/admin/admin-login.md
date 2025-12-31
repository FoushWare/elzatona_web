# Admin Login Page Refactoring Plan

## Page Information

- **Route**: `/admin/login`
- **File**: `apps/website/src/app/admin/login/page.tsx`
- **Current Lines**: ~5 (wrapper)
- **Complexity**: Low
- **Priority**: High (Security Critical)

## Current State Analysis

### File Location

- **Source**: `apps/website/src/app/admin/login/page.tsx`
- **Actual Implementation**: `apps/website/page-components/admin/login/page.tsx` (if exists)

### Current Implementation

- Simple wrapper (5 lines)
- May import from page-components

### Current Issues

- Need to verify actual implementation
- May need security enhancements
- May need CSRF protection
- May need rate limiting

### Dependencies

- Next.js routing
- Admin auth system
- Login form component

## Refactoring Strategy

### Component Breakdown (Target: 3 components)

#### Molecules (0/3)

- [ ] `LoginForm` - Email/password login form
- [ ] `AuthErrorAlert` - Error message display
- [ ] `LoginPageTemplate` - Page layout template

### Target Structure

```
AdminLoginPage (page, <200 lines)
├── LoginPageTemplate
│   ├── LoginForm (molecule)
│   │   ├── EmailInput (atom)
│   │   ├── PasswordInput (atom)
│   │   └── SubmitButton (atom)
│   └── AuthErrorAlert (molecule)
```

## Security Considerations

### Authentication

- [ ] Secure password handling
- [ ] Secure session management
- [ ] Proper error messages (no information leakage)
- [ ] Account lockout after failed attempts

### CSRF Protection

- [ ] Implement CSRF tokens
- [ ] Validate CSRF tokens
- [ ] Use SameSite cookies

### Rate Limiting

- [ ] Limit login attempts (5 per 15 minutes)
- [ ] Implement progressive delays
- [ ] Log failed attempts

### Input Validation

- [ ] Validate email format
- [ ] Validate password strength
- [ ] Sanitize all inputs
- [ ] Prevent SQL injection

### Output Encoding

- [ ] Encode error messages
- [ ] Prevent XSS
- [ ] Secure cookie handling

## Database Abstraction

### Current Database Usage

- Admin authentication
- User lookup
- Session management

### Database Abstraction Points

- Create `AuthRepository` interface
- Create `UserRepository` interface
- Create `SessionRepository` interface
- Support multiple auth providers

### Repository Interfaces

```typescript
interface AuthRepository {
  authenticate(email: string, password: string): Promise<AuthResult>;
  validateSession(sessionId: string): Promise<Session | null>;
  createSession(userId: string): Promise<Session>;
  invalidateSession(sessionId: string): Promise<void>;
}
```

## Testing Strategy

### Unit Tests (Target: 90% coverage)

- [ ] `LoginForm` component
- [ ] `AuthErrorAlert` component
- [ ] Form validation
- [ ] Input sanitization

### Integration Tests (Target: 80% coverage)

- [ ] Authentication flow
- [ ] Error handling
- [ ] Session management
- [ ] CSRF protection

### E2E Tests

- [ ] Successful login
- [ ] Failed login (wrong password)
- [ ] Failed login (wrong email)
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Session creation

### Security Tests

- [ ] Brute force protection
- [ ] SQL injection attempts
- [ ] XSS attempts
- [ ] CSRF attempts
- [ ] Session hijacking attempts

## Implementation Steps

### Step 1: Analysis Phase

- [ ] Run SonarQube analysis
- [ ] Run GitHub SAST scan
- [ ] Review current auth implementation
- [ ] Identify security vulnerabilities

### Step 2: Component Extraction

- [ ] Extract `LoginForm` molecule
- [ ] Extract `AuthErrorAlert` molecule
- [ ] Create `LoginPageTemplate` template
- [ ] Extract input atoms if needed

### Step 3: Security Hardening

- [ ] Implement CSRF protection
- [ ] Implement rate limiting
- [ ] Add password strength validation
- [ ] Secure session management
- [ ] Add account lockout
- [ ] Secure error messages

### Step 4: Database Abstraction

- [ ] Create `AuthRepository` interface
- [ ] Implement PostgreSQL adapter
- [ ] Update auth logic to use repository
- [ ] Test with multiple databases

### Step 5: Testing Implementation

- [ ] Write unit tests (90% coverage)
- [ ] Write integration tests (80% coverage)
- [ ] Write E2E tests
- [ ] Write security tests

### Step 6: Quality Gates

- [ ] SonarQube quality gate: PASS
- [ ] GitHub SAST: 0 critical issues
- [ ] Test coverage: ≥80%
- [ ] Security review: PASS

## Success Metrics

- **Line Count**: Target <200 lines
- **Component Count**: 0 → 3 components
- **Security Vulnerabilities**: 0 critical, 0 high
- **Test Coverage**: ≥90% (security critical)
- **CSRF Protection**: Implemented
- **Rate Limiting**: Implemented

## Manual Testing Checklist

### Functional Testing

- [ ] Login form displays correctly
- [ ] Email validation works
- [ ] Password validation works
- [ ] Submit button works
- [ ] Error messages display correctly
- [ ] Success redirect works

### Security Testing

- [ ] CSRF protection works
- [ ] Rate limiting works (5 attempts)
- [ ] Account lockout works
- [ ] Password not logged
- [ ] Session created securely
- [ ] No information leakage in errors

### Attack Testing

- [ ] SQL injection attempts blocked
- [ ] XSS attempts blocked
- [ ] CSRF attempts blocked
- [ ] Brute force attempts blocked
- [ ] Session hijacking prevented

## Automated Testing

### Test Files to Create

- `LoginForm.test.tsx`
- `AuthErrorAlert.test.tsx`
- `LoginPage.test.tsx`
- `LoginPage.integration.test.tsx`
- `LoginPage.e2e.spec.tsx`
- `LoginPage.security.test.tsx`

## Documentation Updates

- [ ] Update auth documentation
- [ ] Update security documentation
- [ ] Update testing documentation
- [ ] Document CSRF implementation
- [ ] Document rate limiting

## Related Files

- `apps/website/src/app/admin/login/page.tsx` - Wrapper
- `apps/website/page-components/admin/login/page.tsx` - Implementation (if exists)
- `libs/contexts/src/lib/AdminAuthProvider.tsx` - Auth provider
- `apps/website/network/routes/admin/auth/route.ts` - Auth API

## Security Checklist

- [ ] CSRF tokens implemented
- [ ] Rate limiting implemented
- [ ] Password strength validation
- [ ] Secure session management
- [ ] Account lockout
- [ ] Input validation
- [ ] Output encoding
- [ ] Error message security
- [ ] Audit logging
- [ ] Security headers

## Notes

- **CRITICAL**: This is a security-critical page
- Must implement CSRF protection
- Must implement rate limiting
- Must have comprehensive security tests
- Must pass all security scans

