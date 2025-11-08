# Command Cleanup - `/gh` vs `/gh-push`

## Decision Made

✅ **Keep:** `/gh-push` (more descriptive name)  
❌ **Removed:** `/gh` (duplicate command)

## Changes Made

1. **Deleted** `.cursor/commands/gh.md` (duplicate)
2. **Enhanced** `.cursor/check-build-and-push.sh` with security audit step
3. **Updated** `.cursor/commands/gh-push.md` documentation

## What Changed

### Security Audit Integration

The build-check-and-push script now includes **Step 7: Security Audit** that:

- ✅ Scans for hardcoded secrets in staged files
- ✅ Prevents .env files from being committed
- ✅ Runs npm audit for dependency vulnerabilities
- ✅ Reports security issues (non-blocking)

### Command to Use

**Use:** `/gh-push` or `npm run build:check-and-push`

Both commands now:

1. Check for uncommitted changes
2. Run linting with auto-fix
3. Check TypeScript errors
4. Run build check
5. Run tests
6. Auto-fix common errors
7. Commit changes
8. **Run security audit** ← NEW
9. Push to GitHub

## Usage

```bash
# Recommended command
npm run build:check-and-push

# Or directly
bash .cursor/check-build-and-push.sh
```

---

**The `/gh` command has been removed. Use `/gh-push` going forward.**
