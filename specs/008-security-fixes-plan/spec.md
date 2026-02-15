# Feature Specification: Comprehensive Security & Code Quality Fixes

**Spec ID**: 008 | **Date**: 2026-02-15 | **Branch**: `008-security-fixes-plan`

## Problem Statement

The elzatona_web repository has accumulated **~100 GitHub Code Scanning alerts** and **93 SonarQube HIGH/BLOCKER issues** that violate the Constitution's Quality Gate: "0 Critical/High security vulnerabilities" and "SonarQube quality gate: PASS". Additionally, 8 open fix PRs (#7510–#7517) need pipeline issues resolved before merging.

## Scope

### 1. GitHub Code Scanning Alerts

| Category               | Tool     | Count | Severity    | Fix                               |
| ---------------------- | -------- | ----- | ----------- | --------------------------------- |
| Next.js CVEs (DoS)     | Trivy    | 3     | HIGH/MEDIUM | Upgrade `next` 16.1.0 → 16.1.5    |
| Leaked Secrets in Docs | Gitleaks | ~97   | WARNING     | Replace secrets with placeholders |

### 2. SonarQube Issues (93 HIGH/BLOCKER)

| Rule  | Description                                     | Count | Priority |
| ----- | ----------------------------------------------- | ----- | -------- |
| S3776 | Cognitive Complexity exceeds 15                 | ~40   | CRITICAL |
| S2004 | Functions nested >4 levels                      | 7     | CRITICAL |
| S3516 | Function always returns same value              | 1     | BLOCKER  |
| S6861 | Exporting mutable `let` binding                 | 2     | CRITICAL |
| S3735 | Unnecessary `void` operator                     | 1     | CRITICAL |
| S7746 | Prefer return/throw over Promise.resolve/reject | 4     | MAJOR    |
| S2871 | Array sort without compare function             | 1     | CRITICAL |

### 3. Open PR Pipeline Fixes

| PR    | Branch                                 | Status    | Issue                  |
| ----- | -------------------------------------- | --------- | ---------------------- |
| #7510 | fix/clear-text-logging                 | MERGEABLE | SonarCloud CI conflict |
| #7511 | fix/insecure-randomness                | MERGEABLE | SonarCloud CI conflict |
| #7512 | fix/double-escaping                    | MERGEABLE | SonarCloud CI conflict |
| #7513 | fix/incomplete-sanitization            | MERGEABLE | SonarCloud CI conflict |
| #7514 | fix/xss-through-dom                    | UNKNOWN   | Needs rebase           |
| #7515 | fix/incomplete-multi-char-sanitization | UNKNOWN   | Needs rebase           |
| #7516 | fix/shell-command-injection            | UNKNOWN   | Needs rebase           |
| #7517 | fix/missing-rate-limiting              | UNKNOWN   | Needs rebase           |

## Acceptance Criteria

1. All 3 Trivy CVE alerts resolved (Next.js upgraded)
2. All Gitleaks secret alerts resolved (secrets replaced with placeholders)
3. All 93 SonarQube HIGH/BLOCKER issues resolved
4. All 8 existing PRs pass CI and are mergeable
5. SonarQube quality gate: PASS on main after merges
6. Zero Critical/High security vulnerabilities remaining

## Out of Scope

- Gitleaks alerts in git history (require `git filter-repo` — separate effort)
- CodeQL JavaScript analysis alerts (already addressed by PRs #7510–#7517)
- New feature development
