# Bugs Issues Reconciliation — 2026-02-20 (Batch 7)

## Scope

Reconcile stale `bugs` issues pointing to generated scan artifact paths no longer present in the repository.

## Findings

The following open `bugs` issues reference `gitleaks-current.json` while the file is missing in the current repository tree:

- #10995 — Alert #2965
- #10994 — Alert #2966
- #10993 — Alert #2967
- #10992 — Alert #2968
- #10991 — Alert #2969
- #10990 — Alert #2970

## Verification

- Checked issue bodies and confirmed all six reference `gitleaks-current.json`
- Verified local repository state: `gitleaks-current.json` is missing
- Classified as stale-path backlog issues for reconciliation closure

## Action

Close through PR-linked issue closure:

- Closes #10995
- Closes #10994
- Closes #10993
- Closes #10992
- Closes #10991
- Closes #10990
