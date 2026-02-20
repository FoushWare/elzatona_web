# Bugs Issues Reconciliation — 2026-02-20 (Batch 9)

## Scope

Reconcile stale `bugs` issues that reference generated scan artifact paths no longer present in the repository.

## Findings

The following open `bugs` issues reference `gitleaks-history.json`, while the file is missing in the current repository tree:

- #10723 — Alert #3237
- #10722 — Alert #3238
- #10721 — Alert #3239
- #10720 — Alert #3240
- #10719 — Alert #3241
- #10718 — Alert #3242

## Verification

- Checked issue bodies and confirmed all six reference `gitleaks-history.json`
- Verified local repository state: `gitleaks-history.json` is missing
- Classified as stale-path backlog issues for reconciliation closure

## Action

Close through PR-linked issue closure:

- Closes #10723
- Closes #10722
- Closes #10721
- Closes #10720
- Closes #10719
- Closes #10718
