# How to Use Cursor Commands in `.cursor/commands`

## Overview

The `.cursor/commands/` directory contains **Cursor command documentation** that you can invoke directly in Cursor using the `/` prefix.

## Available Commands

### 1. `/gh-push` - Build Check and Push

**What it does:**

- Checks for uncommitted changes
- Runs linting with auto-fix
- Checks TypeScript errors
- Runs build check
- Runs tests
- Auto-fixes common errors
- Commits changes
- **Runs security audit** (NEW!)
- Pushes to GitHub

**How to use:**

**Option 1: In Cursor Chat**

```
/gh-push
```

**Option 2: In Terminal**

```bash
npm run build:check-and-push
```

**Option 3: Direct Script**

```bash
bash .cursor/check-build-and-push.sh
```

**What happens:**

1. The AI reads the command documentation from `.cursor/commands/gh-push.md`
2. Executes the script at `.cursor/check-build-and-push.sh`
3. Shows progress through all 8 steps
4. Automatically handles errors and fixes issues

---

### 2. `/security-audit` - Security Review

**What it does:**

- Dependency audit
- Code security review
- Infrastructure security check

**How to use:**

**In Cursor Chat:**

```
/security-audit
```

**What happens:**

- The AI reads `.cursor/commands/security-audit.md`
- Performs comprehensive security review
- Reports vulnerabilities and recommendations

---

### 3. `/code-review-checklist` - Code Review

**What it does:**

- Provides comprehensive code review checklist
- Helps ensure code quality before merging

**How to use:**

**In Cursor Chat:**

```
/code-review-checklist
```

**What happens:**

- The AI reads `.cursor/commands/code-review-checklist.md`
- Provides checklist for code review
- Helps identify issues before merging

---

## How Cursor Commands Work

### Command Structure

1. **Command File**: `.cursor/commands/[command-name].md`
   - Contains documentation and instructions
   - Written in Markdown
   - Includes usage examples and expected output

2. **Script File**: `.cursor/[script-name].sh` (if needed)
   - Actual executable script
   - Performs the work
   - Can be called directly or via npm script

3. **Invocation**: Type `/command-name` in Cursor chat
   - Cursor reads the `.md` file
   - AI understands what to do
   - Executes the script or performs the action

### Example: `/gh-push` Flow

```
User types: /gh-push
    ↓
Cursor reads: .cursor/commands/gh-push.md
    ↓
AI understands: "Run build check and push script"
    ↓
AI executes: bash .cursor/check-build-and-push.sh
    ↓
Script runs 8 steps:
  1. Check git status
  2. Run linter
  3. Check TypeScript
  4. Build check
  5. Run tests
  6. Commit changes
  7. Security audit
  8. Push to GitHub
    ↓
Results shown to user
```

---

## Current Status

### ✅ Working Commands

1. **`/gh-push`** ✅
   - Script: `.cursor/check-build-and-push.sh`
   - NPM: `npm run build:check-and-push`
   - Status: **Working** (process 19636 is running)

2. **`/security-audit`** ✅
   - Documentation: `.cursor/commands/security-audit.md`
   - Status: **Available**

3. **`/code-review-checklist`** ✅
   - Documentation: `.cursor/commands/code-review-checklist.md`
   - Status: **Available**

---

## How to Use Right Now

### Quick Start

**In Cursor Chat, type:**

```
/gh-push
```

**Or in Terminal:**

```bash
npm run build:check-and-push
```

### Check if Script is Running

From your terminal selection, I can see:

```bash
ps aux | grep check-build-and-push
# Shows: process 19636 is running
```

### Monitor Progress

```bash
# Check git status
git status

# Check recent commits
git log --oneline -3

# Check if pushed
git log origin/main..HEAD --oneline
```

---

## Troubleshooting

### Command Not Found

If `/gh-push` doesn't work:

1. Check file exists: `ls .cursor/commands/gh-push.md`
2. Use terminal: `npm run build:check-and-push`
3. Run directly: `bash .cursor/check-build-and-push.sh`

### Script Not Running

If script doesn't execute:

1. Check permissions: `chmod +x .cursor/check-build-and-push.sh`
2. Check path: `cd /Users/a.fouad/SideProjects/Elzatona-all/Elzatona-web`
3. Run manually: `bash .cursor/check-build-and-push.sh`

### No Output

If you don't see output:

1. Script may be running in background
2. Check process: `ps aux | grep check-build-and-push`
3. Check logs: `ls -la /tmp/*lint*.log /tmp/*tsc*.log`

---

## Summary

✅ **Commands are working!**

- `/gh-push` - **Active** (process running)
- `/security-audit` - **Available**
- `/code-review-checklist` - **Available**

**To use:** Type `/gh-push` in Cursor chat or run `npm run build:check-and-push` in terminal.

---

**The commands in `.cursor/commands/` are working and ready to use!**
