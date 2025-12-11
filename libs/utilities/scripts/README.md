# Scripts Directory

This directory contains all essential scripts for development, deployment, and maintenance.

## 📦 Scripts Overview

**Total Scripts:** 76+ files (JS, SH, MJS)

All scripts should be run from the project root:

```bash
node libs/utilities/scripts/script-name.js
# or
bash libs/utilities/scripts/script-name.sh
```

## 📋 Script Categories

### Environment & Configuration

- `verify-env-setup.mjs` - Verify environment setup
- `verify-supabase-keys.js` - Verify Supabase keys
- `fix-production-anon-key.js` - Fix production anon key
- `check-env.js` - Check environment configuration
- `set-env.js` - Set environment variables
- `switch-env.js` - Switch between environments
- `update-env-local.js` - Update .env.local
- `update-env-test-local.js` - Update .env.test.local
- `add-env-comments.js` - Add comments to env files

### Database & Admin

- `check-supabase-schema.js` - Check Supabase schema
- `setup-supabase-admin.js` - Setup Supabase admin
- `setup-admin-final.js` - Final admin setup
- `setup-admin-user.js` - Setup admin user
- `create-admin-record.js` - Create admin record
- `create-admins-table.js` - Create admins table
- `create-table-and-admin.js` - Create table and admin
- `check-admin-user.js` - Check admin user
- `test-admin-login.js` - Test admin login
- `update-admin-password-hash.js` - Update admin password hash
- `update-admin-password-direct.js` - Update admin password directly
- `delete-admin-user.js` - Delete admin user
- `create-fresh-admin-user.js` - Create fresh admin user
- `diagnose-admin-issue.js` - Diagnose admin issues
- `fix-admin-login.sh` - Fix admin login
- `fix-admin-login-production.js` - Fix admin login in production
- `fix-admin-production.js` - Fix admin in production
- `verify-password-hash.js` - Verify password hash

### Database Operations

- `clear-main-database.mjs` - Clear main database
- `seed-from-testing-to-main.mjs` - Seed from testing to main
- `export-questions-to-json.js` - Export questions to JSON
- `export-questions-batched.js` - Export questions in batches
- `export-questions-batched-mcp.js` - Export questions via MCP
- `export-questions-batches.js` - Export question batches
- `export-questions-to-files.js` - Export questions to files
- `export-questions.js` - Export questions
- `export-db-mcp.js` - Export database via MCP
- `check-questions-batches.js` - Check question batches
- `process-questions-topics.js` - Process questions and topics
- `match-questions-to-topics.js` - Match questions to topics
- `fix-questions-cleaning.js` - Fix question cleaning
- `fix-all-questions-comprehensive.js` - Comprehensive question fixes
- `fix-option-text.js` - Fix option text
- `generate-options-for-questions.mjs` - Generate options for questions
- `save-batch-002.js` - Save batch 002

### Security & Secrets

- `remove-all-hardcoded-secrets.sh` - Remove hardcoded secrets
- `fix-all-secrets-comprehensive.js` - Comprehensive secret fixes
- `fix-all-security-secrets.sh` - Fix all security secrets
- `fix-secrets-from-alerts.sh` - Fix secrets from alerts
- `fix-docs-secrets.sh` - Fix secrets in docs
- `fix-rest-scripts-secrets.sh` - Fix secrets in Rest scripts
- `scan-git-history-for-secrets.sh` - Scan git history for secrets
- `remove-secrets-from-history.sh` - Remove secrets from history
- `remove-secrets-from-history-complete.sh` - Complete secret removal
- `remove-gitguardian-key-from-history.sh` - Remove GitGuardian key
- `resolve-gitguardian-via-dashboard.sh` - Resolve GitGuardian via dashboard
- `resolve-secret-scanning-alerts.sh` - Resolve secret scanning alerts
- `pre-commit-secret-scan.sh` - Pre-commit secret scan
- `pre-push-secret-scan.sh` - Pre-push secret scan

### Testing & Quality

- `run-all-tests.sh` - Run all tests
- `run-all-tests-verbose.sh` - Run all tests verbosely
- `run-sonarqube-local.js` - Run SonarQube locally
- `delete-failed-github-actions.mjs` - Delete failed GitHub actions
- `remove-failed-github-actions.sh` - Remove failed GitHub actions

### Deployment & Infrastructure

- `configure-sonarcloud-main-branch.sh` - Configure SonarCloud main branch
- `create-sonarcloud-project-api.sh` - Create SonarCloud project via API
- `find-sonarcloud-project-key.sh` - Find SonarCloud project key
- `configure-vercel-cli.sh` - Configure Vercel CLI
- `configure-vercel-production-branch.sh` - Configure Vercel production branch
- `check-repository-access.sh` - Check repository access
- `cleanup-playwright-videos.sh` - Cleanup Playwright videos

### Development Tools

- `start-dev-test.sh` - Start dev test environment
- `check-questions-batches.js` - Check question batches
- `generate-nextjs-route-handlers.js` - Generate Next.js route handlers
- `create-page-wrappers.js` - Create page wrappers
- `fix-import-paths.js` - Fix import paths
- `fix-page-component-imports.js` - Fix page component imports
- `fix-all-imports.js` - Fix all imports

### Python Scripts (Migrations)

- `apply_migration_from_file.py` - Apply migration from file
- `apply_topics_migration.py` - Apply topics migration
- `apply_topics_migration_direct.py` - Apply topics migration directly
- `copy_all_data_from_testing.py` - Copy all data from testing
- `copy_all_tables_from_testing.py` - Copy all tables from testing
- `copy_missing_topics.py` - Copy missing topics
- `copy_questions_and_plans.py` - Copy questions and plans
- `generate_full_migration.py` - Generate full migration
- `generate_topics_insert.py` - Generate topics insert
- `generate_topics_migration.py` - Generate topics migration

## 📝 Documentation Files

- `README.md` - This file
- `ENV_SETUP.md` - Environment setup documentation
- `README-seed-data.md` - Seed data documentation

## 🔧 Usage Examples

```bash
# Verify environment setup
node libs/utilities/scripts/verify-env-setup.mjs

# Check Supabase schema
node libs/utilities/scripts/check-supabase-schema.js

# Setup admin user
node libs/utilities/scripts/setup-admin-user.js

# Export questions
node libs/utilities/scripts/export-questions-to-json.js

# Fix import paths
node libs/utilities/scripts/fix-import-paths.js

# Run SonarQube locally
node libs/utilities/scripts/run-sonarqube-local.js
```

## ➕ Adding New Scripts

When adding new scripts:

1. Place them in this directory (`libs/utilities/scripts/`)
2. Update this README with description
3. Ensure scripts are necessary (not temporary/debugging)
4. Add proper error handling and documentation
5. Use appropriate file extensions:
   - `.js` for Node.js scripts
   - `.mjs` for ES modules
   - `.sh` for shell scripts
   - `.py` for Python scripts (if needed)

## 📦 Script Consolidation

All scripts have been consolidated from:

- `scripts/` → `libs/utilities/scripts/`
- `Rest/scripts/scripts/` → `libs/utilities/scripts/` (essential ones)

This consolidation follows the refactoring plan to keep all utilities in one location.
