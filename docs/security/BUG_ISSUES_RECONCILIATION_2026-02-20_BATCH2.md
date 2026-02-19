# Bug Issues Reconciliation (Batch 2) — 2026-02-20

## Scope

This document reconciles the next open `bugs` issues that reference legacy paths removed from the repository.

## Method

- Read each issue body and extracted the `File:` location.
- Verified file existence in current repository checkout.
- Marked each issue as stale when the referenced file does not exist.

## Reconciled Issues

- #7506 — [ERROR] js/clear-text-logging - Alert #765
  - Referenced file: `Rest/scripts/setup/configuration/setup-admin-account.js`
  - Current status: missing
- #7505 — [ERROR] js/clear-text-logging - Alert #766
  - Referenced file: `Rest/scripts/setup/configuration/setup-admin-account.js`
  - Current status: missing
- #7504 — [ERROR] js/clear-text-logging - Alert #767
  - Referenced file: `Rest/scripts/setup/configuration/manage-admin-mcp.js`
  - Current status: missing
- #7503 — [ERROR] js/clear-text-logging - Alert #768
  - Referenced file: `Rest/scripts/setup/configuration/manage-admin-mcp.js`
  - Current status: missing
- #7502 — [ERROR] js/clear-text-logging - Alert #769
  - Referenced file: `Rest/scripts/setup/configuration/manage-admin-accounts.js`
  - Current status: missing
- #7501 — [ERROR] js/clear-text-logging - Alert #770
  - Referenced file: `Rest/scripts/setup/configuration/manage-admin-accounts.js`
  - Current status: missing

## Resolution

These issues are reconciled as stale references to legacy files that are no longer part of the active codebase.

On merge, this PR should close linked issues. If repository permissions allow, automated cleanup may delete closed duplicates/issues through the configured workflow.
