# Phase 0 Research: Security & Code Quality Fixes

**Date**: 2026-02-15 | **Spec**: 008-security-fixes-plan

## Research Tasks & Findings

### R1: Next.js CVE Upgrade Path

**Question**: Can we safely upgrade `next` from 16.1.0 → 16.1.5?
**Decision**: Yes — 16.1.5 is a patch release with no breaking changes
**Rationale**: All 3 CVEs (CVE-2025-59472, CVE-2025-59471, GHSA-h25m-26qc-wcjf) are fixed in 16.1.5. Patch releases maintain API compatibility.
**Alternatives Considered**: Pin to 16.1.4 (doesn't fix CVE-2025-59472), stay on 16.1.0 with mitigations (rejected — Constitution requires 0 Critical/High vulns)
**Files Affected**: `apps/admin/package.json`, `apps/website/package.json`, `package.json` (root)
**Risk**: LOW — patch version bump

### R2: Gitleaks Secret Remediation Strategy

**Question**: How to handle ~97 Gitleaks alerts for secrets in documentation files?
**Decision**: Two-pronged approach:

1. **Current HEAD**: Replace real secrets with `<YOUR_xxx_HERE>` placeholders in docs
2. **Git history**: Add paths to `.gitleaks.toml` allowlist (history cleanup is out of scope)
   **Rationale**: Secrets in docs are typically example/placeholder values that were accidentally real. Replacing in HEAD fixes the scanning alert for new commits. History cleanup requires `git filter-repo` which is destructive.
   **Alternatives Considered**:

- `git filter-repo` on all affected commits (rejected — too disruptive, separate effort)
- Dismiss all alerts (rejected — violates Security by Design principle)
  **Unique Files Affected** (deduplicated from ~97 alerts):
  - `References/debugging-web-scrapping.md`
  - `CHATGPT_SETUP.md`, `CHATGPT_COMPLETE_SETUP.md`, `CHATGPT_SETUP_SUMMARY.md`
  - `FIREBASE_SETUP.md`, `FIREBASE_PROGRESS_SETUP.md`, `FIREBASE_QUESTIONS_SETUP.md`
  - `ISSUES_RESOLUTION_REPORT.md`
  - `QuestionsBank/security/questions.md`, `QuestionsBank/english-learning/questions.md`
  - `playwright-report/index.html`
  - `scripts/setup-vercel-env.md`, `scripts/setup-vercel-env.sh`, `scripts/fix-vercel-env.sh`
  - `DAILY_SETUP.md`, `GROQ_SETUP.md`, `FREE_AI_SETUP.md`, `HUMAN_TTS_SETUP.md`
  - `src/lib/firebase.ts`, `src/app/api/questions/[learningPath]/route.ts`
  - `scripts/test-firestore-connection.mjs`, `scripts/test-progress-api.mjs`
  - `scripts/populate-learning-plans.mjs`, `scripts/create-admin-user.mjs`
  - `static/main.js`
  - `DEVELOPMENT_SETUP.md`
    **Risk**: LOW — documentation-only changes + gitleaks config

### R3: SonarQube Cognitive Complexity Reduction

**Question**: Best approach for functions with Cognitive Complexity 50–246?
**Decision**: Extract helper functions, use early returns, flatten nested conditions, use strategy/lookup patterns
**Rationale**: The worst offender (`unified/route.ts` at 246) needs decomposition into multiple handler functions. Functions at 16–20 need minor refactoring (early returns, guard clauses).
**Patterns to Apply**:

1. **Extract Method**: Move nested logic into named helper functions
2. **Guard Clauses**: Replace `if-else` chains with early `return`
3. **Lookup Tables**: Replace `switch` statements with object lookups
4. **Strategy Pattern**: For route handlers, extract each HTTP method into separate function
5. **Decompose Conditional**: Extract complex conditions into named boolean variables
   **Key Files by Severity** (Cognitive Complexity):

- 🔴 `unified/route.ts` (246, 82, 74, 24, 20) — needs major decomposition
- 🔴 `plan-details/[planId]/route.ts` (48, 41, 38, 16) — decompose
- 🟡 `markdown-question-parser.ts` (71) — extract parsing stages
- 🟡 `validation.ts` (51, 16) — extract validators
- 🟡 `plans/route.ts` (48) — extract handlers
- 🟡 `NavbarSimple.tsx` (35) — extract render sections
- 🟢 Multiple files at 16–22 — minor refactoring
  **Risk**: MEDIUM — refactoring route handlers requires careful testing

### R4: SonarQube Quick Fixes

**Question**: Which SonarQube issues can be batch-fixed with minimal risk?
**Decision**: Fix all non-complexity issues in one PR:

- S6861: Change `let` → `const` for exports (2 files)
- S3735: Remove `void` operator (1 file)
- S7746: Replace `Promise.resolve(val)` → `return val` (2 files)
- S2871: Add `.localeCompare()` to sort (1 file)
- S3516: Fix function that always returns same value (1 file — BLOCKER)
  **Risk**: LOW — straightforward code changes

### R5: Open PR Pipeline Resolution

**Question**: Why are PRs #7510–#7517 failing CI?
**Decision**: Two root causes:

1. **SonarCloud CI conflict**: Automatic Analysis is enabled on SonarCloud, conflicting with CI-based scanner. Fix: disable the CI sonar workflow (already done by renaming workflow file)
2. **Merge conflicts / stale branches**: PRs #7514–#7517 need rebasing onto latest main
   **Risk**: LOW — operational fixes only

### R6: Bug-Labeled Issues

**Question**: Are there open issues labeled "bug" or "bugs"?
**Finding**: `gh issue list --label bug` returns 0 results. The repository uses CodeQL-generated issues (labeled with tool names like "CodeQL", "Trivy", "Gitleaks") rather than a "bug" label. The issues listed in `bugs-issues.md` are these CodeQL-generated issues.
**Decision**: Work from the code-scanning alerts API data rather than issue labels
