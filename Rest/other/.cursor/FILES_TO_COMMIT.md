# Files to Commit

## Important Files (4 main files)

### 1. CI/CD Fix

- **File**: `.github/workflows/ci.yml`
- **Change**: Added `JWT_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` to test-batches job
- **Why**: Fixes 87 failing admin tests

### 2. Build Script Update

- **File**: `.cursor/check-build-and-push.sh`
- **Change**: Added Step 7/8 Security Audit, fixed step numbering
- **Why**: Security checks before push

### 3. Command Documentation

- **File**: `.cursor/commands/gh-push.md`
- **Change**: Updated with security audit information
- **Why**: Documentation update

### 4. Usage Guide

- **File**: `.cursor/HOW_TO_USE_COMMANDS.md`
- **Change**: New file explaining how to use commands
- **Why**: User guide

## Additional Files (Optional)

- `.cursor/COMMAND_CLEANUP.md` - Command cleanup summary
- `.cursor/PUSH_COMPLETE.md` - Push completion summary
- `.cursor/EXECUTING_GH_PUSH.md` - Execution status

## Files to Exclude

- `apps/website/.jest-cache/*` - Jest cache files (should be ignored)
- `.cursor/SCRIPT_RUNNING.md` - Temporary status file

## Commit Command

```bash
cd /Users/a.fouad/SideProjects/Elzatona-all/Elzatona-web

# Stage important files
git add .github/workflows/ci.yml \
        .cursor/check-build-and-push.sh \
        .cursor/commands/gh-push.md \
        .cursor/HOW_TO_USE_COMMANDS.md

# Commit
git commit -m "fix(ci): add missing JWT_SECRET and NEXTAUTH env vars for admin tests"

# Push
git push origin main
```

---

**The 4 main files are ready to commit!**
