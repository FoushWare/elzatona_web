# Code Review Instructions

## Overview

This document provides comprehensive guidelines for reviewing refactored code in the Elzatona web application. All code reviews must follow these instructions to ensure quality, security, and maintainability.

## Pre-Review Checklist

Before starting a code review, ensure:

- [ ] SonarQube analysis has been run
- [ ] GitHub SAST scan has been completed
- [ ] All tests are passing
- [ ] Documentation has been updated
- [ ] Refactoring plan has been followed

## Review Criteria

### 1. Component Size and Structure

#### Size Limits

- [ ] Atoms: 10-50 lines (verify)
- [ ] Molecules: 50-150 lines (verify)
- [ ] Organisms: 100-200 lines (verify)
- [ ] Templates: 150-300 lines (verify)
- [ ] Pages: 200-500 lines (verify)

#### Structure

- [ ] Single Responsibility Principle followed
- [ ] Maximum 3 levels of nesting
- [ ] Proper component composition
- [ ] No unnecessary complexity

### 2. Code Quality

#### TypeScript

- [ ] Strict mode enabled
- [ ] No `any` types (use `unknown` if needed)
- [ ] All props properly typed
- [ ] All functions have return types
- [ ] All hooks properly typed

#### Code Style

- [ ] Consistent naming conventions
- [ ] Proper import organization
- [ ] No unused imports
- [ ] No commented-out code
- [ ] Proper error handling

#### Complexity

- [ ] Cyclomatic complexity <10 per function
- [ ] Functions are focused and small
- [ ] No deeply nested conditionals
- [ ] Early returns used appropriately

### 3. Security Review

#### Input Validation

- [ ] All user inputs validated
- [ ] Validation happens on both client and server
- [ ] Proper error messages (no information leakage)
- [ ] Input sanitization for XSS prevention

#### Output Encoding

- [ ] All user-generated content sanitized
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] Proper encoding for URLs and HTML
- [ ] Content Security Policy considered

#### Authentication & Authorization

- [ ] Authentication checks on protected routes
- [ ] Authorization checks on all operations
- [ ] Proper session management
- [ ] No hardcoded credentials

#### Security Best Practices

- [ ] CSRF protection where needed
- [ ] Rate limiting implemented
- [ ] No secrets in code
- [ ] Secure error handling
- [ ] Audit logging for sensitive operations

### 4. Testing Requirements

#### Unit Tests

- [ ] Coverage ≥90% for new code
- [ ] All business logic tested
- [ ] All utility functions tested
- [ ] All custom hooks tested
- [ ] Edge cases covered

#### Integration Tests

- [ ] Coverage ≥80% for new code
- [ ] API endpoints tested
- [ ] Database operations tested
- [ ] Component interactions tested

#### E2E Tests

- [ ] Critical user flows tested
- [ ] Authentication flows tested
- [ ] CRUD operations tested
- [ ] Error scenarios tested

#### Test Quality

- [ ] Tests are readable and maintainable
- [ ] Tests are independent
- [ ] Proper test data setup
- [ ] Proper cleanup after tests

### 5. Performance Review

#### Load Time

- [ ] Page load time <2 seconds
- [ ] First Contentful Paint <1.5 seconds
- [ ] Time to Interactive acceptable

#### Bundle Size

- [ ] Bundle size optimized
- [ ] Code splitting implemented
- [ ] Lazy loading where appropriate
- [ ] Unused code removed

#### Runtime Performance

- [ ] No memory leaks
- [ ] Proper cleanup in useEffect
- [ ] Efficient re-renders (React.memo where needed)
- [ ] No unnecessary API calls

### 6. Database Abstraction

#### Repository Pattern

- [ ] Repository interfaces defined
- [ ] Database adapters implemented
- [ ] No direct database calls in components
- [ ] Support for multiple databases

#### Query Optimization

- [ ] Efficient queries
- [ ] Proper indexing considered
- [ ] No N+1 queries
- [ ] Caching where appropriate

### 7. Documentation

#### Code Documentation

- [ ] Complex logic commented
- [ ] Component props documented
- [ ] Functions have JSDoc comments
- [ ] Types are self-documenting

#### Refactoring Documentation

- [ ] Page plan updated with status
- [ ] Component extraction documented
- [ ] Security improvements documented
- [ ] Performance improvements documented

## SonarQube Pass Criteria

### Quality Gate Requirements

- [ ] Quality gate: PASS
- [ ] Security hotspots: 0 critical, 0 high
- [ ] Code smells: <10 per 1000 lines
- [ ] Bugs: 0 critical, 0 high
- [ ] Vulnerabilities: 0 critical, 0 high

### Coverage Requirements

- [ ] Coverage: ≥80% (target: 90%)
- [ ] Line coverage: ≥80%
- [ ] Branch coverage: ≥80%
- [ ] All new code covered

### Technical Debt

- [ ] Technical debt ratio: <5%
- [ ] Code duplication: <3%
- [ ] Maintainability rating: A or B

## GitHub SAST Pass Criteria

### Security Vulnerabilities

- [ ] Critical vulnerabilities: 0
- [ ] High vulnerabilities: 0
- [ ] Medium vulnerabilities: Reviewed and acceptable
- [ ] Low vulnerabilities: Reviewed and acceptable

### Secret Detection

- [ ] No secrets in code
- [ ] No secrets in commit history
- [ ] All secrets in environment variables
- [ ] `.env` files properly gitignored

### Dependency Scanning

- [ ] Critical dependency vulnerabilities: 0
- [ ] High dependency vulnerabilities: 0
- [ ] Outdated dependencies updated
- [ ] Security patches applied

### CodeQL Analysis

- [ ] CodeQL analysis: PASS
- [ ] No critical security issues
- [ ] No high security issues
- [ ] All alerts reviewed and resolved

## Review Process

### Step 1: Initial Review

1. Review the refactoring plan
2. Check if plan was followed
3. Verify all quality gates passed
4. Review code structure and organization

### Step 2: Detailed Review

1. Review each component individually
2. Check security implementations
3. Verify test coverage
4. Review performance considerations

### Step 3: Security Review

1. Review authentication/authorization
2. Check input validation
3. Verify output encoding
4. Review error handling

### Step 4: Final Approval

1. All criteria met
2. All tests passing
3. Documentation complete
4. Ready to merge

## Common Issues to Watch For

### Security Issues

- Missing input validation
- Unsanitized user content
- Missing authentication checks
- Hardcoded secrets
- Information leakage in errors

### Code Quality Issues

- Components too large
- Too much nesting
- Unused code
- Poor naming
- Missing types

### Performance Issues

- Unnecessary re-renders
- Missing memoization
- Large bundle sizes
- Memory leaks
- Inefficient queries

### Testing Issues

- Low coverage
- Missing edge cases
- Flaky tests
- Poor test organization
- Missing integration tests

## Review Checklist Template

Use this checklist for each refactored page:

### Pre-Review

- [ ] SonarQube analysis completed
- [ ] GitHub SAST scan completed
- [ ] All tests passing
- [ ] Documentation updated

### Code Quality

- [ ] Component sizes within limits
- [ ] TypeScript strict mode
- [ ] No code duplication
- [ ] Proper error handling
- [ ] Clean code principles followed

### Security

- [ ] Input validation implemented
- [ ] Output sanitization implemented
- [ ] Authentication checks present
- [ ] Authorization checks present
- [ ] No security vulnerabilities

### Testing

- [ ] Unit test coverage ≥90%
- [ ] Integration test coverage ≥80%
- [ ] E2E tests for critical flows
- [ ] All tests passing

### Performance

- [ ] Page load time <2s
- [ ] Bundle size optimized
- [ ] No memory leaks
- [ ] Efficient re-renders

### Database

- [ ] Repository pattern used
- [ ] No direct database calls
- [ ] Queries optimized
- [ ] Multi-database support

### Documentation

- [ ] Code documented
- [ ] Plan updated
- [ ] Changes documented
- [ ] README updated if needed

## Approval Criteria

A refactored page is approved when:

1. ✅ All quality gates passed
2. ✅ SonarQube quality gate: PASS
3. ✅ GitHub SAST: 0 critical issues
4. ✅ Test coverage requirements met
5. ✅ Performance benchmarks met
6. ✅ Security review completed
7. ✅ Code review approved
8. ✅ Documentation complete

## Rejection Criteria

A refactored page is rejected if:

1. ❌ SonarQube quality gate: FAIL
2. ❌ Critical security vulnerabilities
3. ❌ Test coverage below requirements
4. ❌ Performance benchmarks not met
5. ❌ Component sizes exceed limits
6. ❌ Code quality issues not addressed
7. ❌ Documentation incomplete

## Review Notes

- Be constructive and specific in feedback
- Provide examples of improvements
- Reference relevant documentation
- Suggest best practices
- Acknowledge good work

## Escalation

If critical issues are found:

1. Document all issues clearly
2. Prioritize by severity
3. Request immediate fixes for critical issues
4. Schedule follow-up review
5. Do not approve until all critical issues resolved

