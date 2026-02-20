# Bug Issues Reconciliation (Batch 3) — 2026-02-20

## Scope

This document reconciles the next open `bugs` issues that reference generated/legacy artifact paths not present in the current repository.

## Method

- Read each issue body and extracted the `File:` location.
- Verified file existence in the current repository checkout.
- Marked each issue as stale when the referenced file does not exist.

## Reconciled Issues

- #11921 — [WARNING] supabase-key - Alert #1997
  - Referenced file: `gitleaks-current.json`
  - Current status: missing
- #11920 — [WARNING] supabase-key - Alert #1998
  - Referenced file: `gitleaks-current.json`
  - Current status: missing
- #11919 — [WARNING] supabase-key - Alert #1999
  - Referenced file: `gitleaks-current.json`
  - Current status: missing
- #11918 — [WARNING] supabase-key - Alert #2000
  - Referenced file: `gitleaks-current.json`
  - Current status: missing
- #11917 — [WARNING] supabase-key - Alert #2001
  - Referenced file: `gitleaks-current.json`
  - Current status: missing
- #11916 — [WARNING] supabase-key - Alert #2002
  - Referenced file: `gitleaks-current.json`
  - Current status: missing

## Resolution

These issues are reconciled as stale references to generated/legacy scan artifacts that are not part of the active repository contents.

On merge, this PR should close linked issues. If repository permissions allow, automated cleanup may delete closed issues through the configured workflow.
