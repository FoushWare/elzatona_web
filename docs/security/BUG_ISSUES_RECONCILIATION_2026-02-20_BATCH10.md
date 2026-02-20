# Bugs Issues Reconciliation — 2026-02-20 (Batch 10)

## Scope

Reconcile stale `bugs` issues that reference generated scan artifact paths no longer present in the repository.

## Findings

The following open `bugs` issues reference `gitleaks-current.json`, while the file is missing in the current repository tree:

- #10590 — Alert #3370
- #10589 — Alert #3371
- #10588 — Alert #3372
- #10587 — Alert #3373
- #10586 — Alert #3374
- #10585 — Alert #3375

## Verification

- Checked issue bodies and confirmed all six reference `gitleaks-current.json`
- Verified local repository state: `gitleaks-current.json` is missing
- Classified as stale-path backlog issues for reconciliation closure

## Action

Close through PR-linked issue closure:

- Closes #10590
- Closes #10589
- Closes #10588
- Closes #10587
- Closes #10586
- Closes #10585
