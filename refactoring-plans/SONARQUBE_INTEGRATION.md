# SonarQube Integration

## Overview

This document defines SonarQube quality gate requirements, security hotspot rules, and code quality standards for the Elzatona web application refactoring.

## Quality Gate Requirements

### Mandatory Quality Gate: PASS

All refactored code MUST pass the SonarQube quality gate before merging.

### Quality Gate Criteria

#### 1. Reliability Rating

- **Target**: A
- **Acceptable**: B
- **Unacceptable**: C, D, E

#### 2. Security Rating

- **Target**: A
- **Acceptable**: B
- **Unacceptable**: C, D, E

#### 3. Maintainability Rating

- **Target**: A
- **Acceptable**: B
- **Unacceptable**: C, D, E

#### 4. Coverage

- **Target**: ≥90%
- **Minimum**: ≥80%
- **Unacceptable**: <80%

#### 5. Duplicated Lines

- **Target**: <1%
- **Maximum**: <3%
- **Unacceptable**: ≥3%

## Security Hotspot Rules

### Critical Security Hotspots

**ZERO TOLERANCE** - All critical security hotspots must be resolved:

- [ ] SQL Injection vulnerabilities
- [ ] XSS (Cross-Site Scripting) vulnerabilities
- [ ] Authentication bypass
- [ ] Authorization issues
- [ ] Sensitive data exposure
- [ ] Insecure deserialization
- [ ] Server-Side Request Forgery (SSRF)
- [ ] Path traversal vulnerabilities

### High Security Hotspots

**MUST BE ADDRESSED** - High security hotspots require immediate attention:

- [ ] Weak cryptography
- [ ] Insecure random number generation
- [ ] Missing CSRF protection
- [ ] Insecure cookie handling
- [ ] Missing security headers
- [ ] Insecure file operations

### Security Hotspot Resolution

1. **Identify**: Review SonarQube security hotspot report
2. **Assess**: Determine actual risk level
3. **Fix**: Implement proper security measures
4. **Verify**: Re-run SonarQube analysis
5. **Document**: Update security documentation

## Code Smell Detection

### Code Smell Limits

- **Target**: <5 code smells per 1000 lines
- **Maximum**: <10 code smells per 1000 lines
- **Unacceptable**: ≥10 code smells per 1000 lines

### Common Code Smells to Fix

#### 1. Duplicated Code

- **Rule**: No code duplication >3%
- **Action**: Extract common code to utilities/components
- **Priority**: High

#### 2. Long Functions

- **Rule**: Functions should be <50 lines
- **Action**: Break down into smaller functions
- **Priority**: Medium

#### 3. Complex Functions

- **Rule**: Cyclomatic complexity <10
- **Action**: Simplify logic, use early returns
- **Priority**: High

#### 4. Large Classes/Components

- **Rule**: Components should be <200 lines
- **Action**: Extract sub-components
- **Priority**: High

#### 5. Too Many Parameters

- **Rule**: Functions should have ≤3 parameters
- **Action**: Use parameter objects
- **Priority**: Medium

#### 6. Dead Code

- **Rule**: No unused code
- **Action**: Remove unused code
- **Priority**: Low

#### 7. Magic Numbers

- **Rule**: Use named constants
- **Action**: Extract to constants
- **Priority**: Low

## Coverage Requirements

### Unit Test Coverage

- **Target**: ≥90%
- **Minimum**: ≥80%
- **Line Coverage**: ≥80%
- **Branch Coverage**: ≥80%

### Coverage Rules

1. **All new code must be covered**
   - New functions: 100% coverage
   - New components: ≥90% coverage
   - New utilities: 100% coverage

2. **Critical paths must be covered**
   - Authentication flows: 100%
   - Authorization checks: 100%
   - Payment processing: 100%
   - Data validation: 100%

3. **Edge cases must be covered**
   - Error handling: ≥80%
   - Boundary conditions: ≥80%
   - Null/undefined handling: 100%

### Coverage Exclusions

Only the following can be excluded from coverage:

- Type definitions (`.types.ts` files)
- Configuration files
- Test setup files
- Storybook files

All exclusions must be documented with justification.

## Technical Debt Limits

### Technical Debt Ratio

- **Target**: <2%
- **Maximum**: <5%
- **Unacceptable**: ≥5%

### Technical Debt Calculation

```
Technical Debt Ratio = (Remediation Cost / Development Cost) × 100
```

### Remediation Strategy

1. **Identify**: Review SonarQube technical debt report
2. **Prioritize**: Focus on high-impact, low-effort fixes
3. **Plan**: Create tickets for technical debt items
4. **Track**: Monitor technical debt ratio over time
5. **Reduce**: Allocate time for technical debt reduction

## Duplication Rules

### Code Duplication Limits

- **Target**: <1%
- **Maximum**: <3%
- **Unacceptable**: ≥3%

### Duplication Detection

SonarQube identifies:

- Exact code duplication
- Similar code blocks
- Repeated patterns

### Duplication Resolution

1. **Extract Common Code**
   - Create utility functions
   - Create shared components
   - Create custom hooks

2. **Use Composition**
   - Compose components
   - Use higher-order components
   - Use render props

3. **Refactor Patterns**
   - Identify repeated patterns
   - Create reusable abstractions
   - Document patterns

## Bug Detection

### Bug Severity Levels

#### Critical Bugs

- **Count**: 0 (ZERO TOLERANCE)
- **Examples**: Memory leaks, security vulnerabilities, data corruption
- **Action**: Fix immediately, block merge

#### High Bugs

- **Count**: 0 (ZERO TOLERANCE)
- **Examples**: Null pointer exceptions, resource leaks
- **Action**: Fix before merge

#### Medium Bugs

- **Count**: <5 per 1000 lines
- **Examples**: Logic errors, incorrect calculations
- **Action**: Fix in current sprint

#### Low Bugs

- **Count**: <10 per 1000 lines
- **Examples**: Minor logic issues, edge cases
- **Action**: Fix in next sprint

## Vulnerability Detection

### Vulnerability Severity Levels

#### Critical Vulnerabilities

- **Count**: 0 (ZERO TOLERANCE)
- **Examples**: SQL injection, XSS, authentication bypass
- **Action**: Fix immediately, block merge

#### High Vulnerabilities

- **Count**: 0 (ZERO TOLERANCE)
- **Examples**: Weak cryptography, insecure deserialization
- **Action**: Fix before merge

#### Medium Vulnerabilities

- **Count**: <3 per 1000 lines
- **Examples**: Missing security headers, weak passwords
- **Action**: Fix in current sprint

#### Low Vulnerabilities

- **Count**: <5 per 1000 lines
- **Examples**: Information disclosure, weak session management
- **Action**: Fix in next sprint

## SonarQube Configuration

### Project Configuration

```properties
# sonar-project.properties
sonar.projectKey=FoushWare_GreatFrontendHub
sonar.organization=foushware
sonar.host.url=https://sonarcloud.io

# Source and test directories
sonar.sources=apps,libs
sonar.tests=tests
sonar.inclusions=**/*.ts,**/*.tsx,**/*.js,**/*.jsx
sonar.exclusions=**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx,**/node_modules/**,**/dist/**,**/.next/**,**/coverage/**

# Coverage
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.typescript.lcov.reportPaths=coverage/lcov.info

# Quality Gate
sonar.qualitygate.wait=true
```

### Quality Gate Profile

The quality gate includes:

1. **Coverage**: ≥80%
2. **Duplicated Lines**: <3%
3. **Maintainability Rating**: A or B
4. **Reliability Rating**: A or B
5. **Security Rating**: A or B
6. **Security Hotspots**: 0 critical, 0 high
7. **Bugs**: 0 critical, 0 high
8. **Vulnerabilities**: 0 critical, 0 high

## Analysis Workflow

### Pre-Commit Analysis

```bash
# Run SonarQube analysis locally
npm run sonar

# Check quality gate status
npm run sonar:check
```

### Pre-Merge Analysis

1. **Run Full Analysis**

   ```bash
   npm run sonar
   ```

2. **Review Results**
   - Check quality gate status
   - Review security hotspots
   - Review code smells
   - Check coverage

3. **Fix Issues**
   - Address all critical issues
   - Address all high issues
   - Address blocking code smells
   - Improve coverage if needed

4. **Re-run Analysis**

   ```bash
   npm run sonar
   ```

5. **Verify Quality Gate**
   - Ensure quality gate: PASS
   - Document any exceptions
   - Get approval if exceptions exist

### CI/CD Integration

SonarQube analysis runs automatically:

- On every pull request
- On every merge to main
- On scheduled basis (daily)

## Issue Resolution Process

### 1. Identify Issues

- Review SonarQube dashboard
- Check quality gate status
- Review security hotspots
- Review code smells

### 2. Prioritize Issues

- **P0 (Critical)**: Block merge, fix immediately
- **P1 (High)**: Fix before merge
- **P2 (Medium)**: Fix in current sprint
- **P3 (Low)**: Fix in next sprint

### 3. Fix Issues

- Follow development standards
- Write tests for fixes
- Update documentation
- Get code review

### 4. Verify Fixes

- Re-run SonarQube analysis
- Verify quality gate passes
- Update issue status
- Document resolution

## Metrics Tracking

### Key Metrics

Track the following metrics over time:

1. **Quality Gate Status**
   - Pass rate: Target 100%
   - Current: Track in dashboard

2. **Coverage**
   - Overall coverage: Target ≥90%
   - New code coverage: Target 100%

3. **Technical Debt**
   - Technical debt ratio: Target <2%
   - Remediation cost: Track monthly

4. **Code Smells**
   - Code smells per 1000 lines: Target <5
   - Total code smells: Track trend

5. **Security**
   - Security hotspots: Target 0
   - Vulnerabilities: Target 0

### Reporting

Generate monthly reports:

- Quality gate pass rate
- Coverage trends
- Technical debt trends
- Security hotspot resolution
- Code smell reduction

## Best Practices

### 1. Regular Analysis

- Run analysis before committing
- Run analysis before creating PR
- Run analysis after major changes
- Review results regularly

### 2. Incremental Improvement

- Fix issues as they're found
- Don't accumulate technical debt
- Address security hotspots immediately
- Improve coverage gradually

### 3. Team Awareness

- Share quality gate status
- Discuss code smells in reviews
- Celebrate improvements
- Learn from issues

### 4. Continuous Monitoring

- Monitor quality gate status
- Track metrics over time
- Set improvement goals
- Review and adjust standards

## Troubleshooting

### Quality Gate Fails

1. **Check Coverage**
   - Ensure coverage ≥80%
   - Add missing tests
   - Verify test execution

2. **Check Security Hotspots**
   - Review all security hotspots
   - Fix critical and high issues
   - Document acceptable risks

3. **Check Code Smells**
   - Review code smell report
   - Fix blocking code smells
   - Refactor complex code

4. **Check Technical Debt**
   - Review technical debt report
   - Address high-priority items
   - Plan debt reduction

### Analysis Fails

1. **Check Configuration**
   - Verify sonar-project.properties
   - Check source paths
   - Verify exclusions

2. **Check Dependencies**
   - Ensure all dependencies installed
   - Check Node.js version
   - Verify build succeeds

3. **Check Coverage Reports**
   - Ensure coverage reports generated
   - Verify report paths
   - Check report format

## References

- [SonarQube Documentation](https://docs.sonarqube.org/)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [Quality Gates](https://docs.sonarqube.org/latest/user-guide/quality-gates/)
- [Security Hotspots](https://docs.sonarqube.org/latest/user-guide/security-hotspots/)

