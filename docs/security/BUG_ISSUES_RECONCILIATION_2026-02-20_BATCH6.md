# Bugs Issues Reconciliation — 2026-02-20 (Batch 6)

## Scope

Reconcile stale `bugs` issues that point to generated scan artifact paths not present in the current repository tree.

## Findings

The following open `bugs` issues reference `gitleaks-history.json` while the file is missing in the current repository state:

- #11234 — Alert #2726
- #11233 — Alert #2727
- #11232 — Alert #2728
- #11231 — Alert #2729
- #11230 — Alert #2730
- #11229 — Alert #2731

## Verification

- Checked issue bodies and confirmed all six reference `gitleaks-history.json`
- Verified local repository state: `gitleaks-history.json` is missing
- Classified as stale-path backlog issues for reconciliation closure

## Action

Close through PR-linked issue closure:

- Closes #11234
- Closes #11233
- Closes #11232
- Closes #11231
- Closes #11230
- Closes #11229
