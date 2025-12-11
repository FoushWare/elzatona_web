# Security Quick Start Guide

## 🚀 Quick Reference

### Before Writing Code

1. **Review Security Reference**

   ```bash
   # Read development reference
   cat docs/security/development-reference.md
   ```

2. **Perform Threat Modeling**
   - Use [threat-modeling.md](threat-modeling.md) template
   - Identify threats using STRIDE
   - Define mitigations

### During Development

1. **Follow Security Guidelines**
   - Use [development-reference.md](development-reference.md) checklist
   - Implement security controls
   - Write security tests

2. **Run Static Analysis**

   ```bash
   # Lint code
   bun run lint

   # Type check
   bun run type-check

   # SonarQube (optional)
   bun run sonar
   ```

### Before Committing

1. **Security Checklist**
   - [ ] No secrets in code
   - [ ] Input validation implemented
   - [ ] Authorization checks in place
   - [ ] Security tests written
   - [ ] Static analysis passed

2. **Run Security Checks**
   ```bash
   # All checks (pre-push hook runs automatically)
   git push
   ```

### Before Deployment

1. **Security Assessment**
   - Complete [security-configuration.md](security-configuration.md) checklist
   - Run security tests
   - Review security configuration

## 📋 Security Cycle Summary

| Phase                   | Activity                      | Document                                               |
| ----------------------- | ----------------------------- | ------------------------------------------------------ |
| **1. Reference**        | Review security guidelines    | [development-reference.md](development-reference.md)   |
| **2. Threat Modeling**  | Identify and mitigate threats | [threat-modeling.md](threat-modeling.md)               |
| **3. Static Analysis**  | Scan code for vulnerabilities | [static-analysis.md](static-analysis.md)               |
| **4. Security Testing** | Test security controls        | [security-testing.md](security-testing.md)             |
| **5. Configuration**    | Configure and assess security | [security-configuration.md](security-configuration.md) |

## 🎯 Most Common Security Tasks

### Add New Feature

1. Threat model the feature
2. Review security reference
3. Implement with security controls
4. Write security tests
5. Run static analysis
6. Security code review

### Fix Security Issue

1. Identify the vulnerability
2. Rotate affected secrets (if applicable)
3. Implement security fix
4. Write security test
5. Verify fix
6. Deploy fix

### Security Review

1. Review security metrics
2. Review threat models
3. Review security configuration
4. Review security tests
5. Update security documentation

## 📚 Full Documentation

See [README.md](README.md) for complete security documentation index.
