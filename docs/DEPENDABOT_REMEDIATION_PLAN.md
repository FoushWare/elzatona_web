# Dependabot Remediation Plan

## Scope

This plan covers dependency and security remediation for the repository, including closed Dependabot PRs that may still represent unresolved risk.

## Current Findings

- PR pipeline status for `fix/admin-dashboard-and-features` (`#12027`) is currently green in GitHub status checks.
- Local code diagnostics were cleaned to remove active analyzer warnings in changed areas.
- `node-forge` override was bumped from `1.3.2` to `1.3.3` in `package.json` as a high-confidence security hardening update.

## Closed Dependabot PRs To Re-evaluate

The following closed Dependabot PRs should be re-reviewed and either reopened/recreated or manually applied if still relevant:

- https://github.com/FoushWare/elzatona_web/pull/193
  - `next` update in `apps/admin`
- https://github.com/FoushWare/elzatona_web/pull/209
  - `qs` update
- https://github.com/FoushWare/elzatona_web/pull/168
  - grouped npm updates (includes security-sensitive packages)

## Why Re-evaluate Closed PRs

Closed Dependabot PRs are often closed for CI conflicts, timing, or grouping noise, not because risk is eliminated. If the vulnerable versions are still present in lockfiles/transitives, alerts can reappear.

## Execution Plan

1. Build a dependency baseline

- Run `npm outdated` and export the full list.
- Run `npm ls --depth=4` for vulnerable packages from Dependabot alerts.
- Record direct vs transitive ownership per package.

2. Reconcile GitHub Dependabot alerts

- In GitHub Security -> Dependabot alerts, export open alerts.
- For each alert: record package, affected range, patched range, severity, and exploitability context.
- Map each alert to one of: direct dependency, transitive via package X, or false-positive context mismatch.

3. Re-open or supersede closed Dependabot PRs

- Reopen/recreate the closed PRs above when still applicable.
- If grouped updates are too noisy, split into:
  - security-critical patch/minor updates
  - non-security maintenance updates
- Require CI green before merge.

4. Apply prioritized updates

- Priority P0: critical/high remotely exploitable vulnerabilities.
- Priority P1: moderate vulnerabilities in runtime/prod dependencies.
- Priority P2: low severity and dev-only vulnerabilities.
- Use `overrides` only when upstream pinning blocks direct upgrades.

5. Validate and prevent regressions

- Run lint, type-check, unit/integration tests, and relevant e2e subset.
- Run local security checks (`codeql`, Sonar, secret scan scripts if configured).
- Confirm no new runtime incompatibilities (Next, auth libs, test tooling).

6. Close alerts with evidence

- Close only when one of these is true:
  - fixed by version upgrade and merged
  - proven unreachable/not exploitable in this code path with evidence
  - accepted risk with expiration date and owner
- Link closure to PR/commit and test evidence.

## Operational Rules

- Never close security alerts without a linked technical justification.
- Keep grouped updates limited to reduce hidden breakage.
- Prefer patch/minor security upgrades over broad major jumps.
- Track accepted risks with owner and due date.

## Suggested Cadence

- Daily: triage new alerts and Dependabot PRs.
- Weekly: merge security patch updates.
- Monthly: review ignored/closed alerts and stale dependency debt.

## Tracking Template

Use this per alert/PR:

- Alert/PR:
- Package:
- Current version:
- Patched version:
- Direct or transitive:
- Severity:
- Reachability:
- Decision:
- Fix PR:
- Validation evidence:
- Owner + due date:
