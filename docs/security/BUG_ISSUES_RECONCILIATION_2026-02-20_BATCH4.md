# Bugs Issues Reconciliation — 2026-02-20 (Batch 4)

## Scope

Reconcile stale `bugs` issues that point to historical generated scan artifacts no longer present in the repository.

## Findings

The following open `bugs` issues reference `gitleaks-history.json` at historical commit paths, while the file is no longer present in the repository root:

- #11522 — Alert #2438
- #11521 — Alert #2439
- #11520 — Alert #2440
- #11519 — Alert #2441
- #11518 — Alert #2442
- #11517 — Alert #2443

## Verification

- Checked issue bodies for each issue in this batch: all reference `gitleaks-history.json`
- Verified repository state: `gitleaks-history.json` is missing in current tree
- Classification: stale-path issue backlog requiring reconciliation closure

## Action

Close the six issues via PR-linked closure using `Closes #...` references:

- Closes #11522
- Closes #11521
- Closes #11520
- Closes #11519
- Closes #11518
- Closes #11517
