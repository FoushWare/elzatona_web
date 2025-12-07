# Memory Optimization Guide (8GB RAM Systems)

## 🎯 Overview

All scripts and processes in this repository are optimized for **8GB RAM systems**. This guide explains the optimizations and how to use them safely.

## 💾 Memory Optimization Strategies

### 1. Single-Threaded Processing

- ✅ No parallel processing
- ✅ Sequential operations only
- ✅ One task at a time

### 2. Incremental Processing

- ✅ Process in small batches
- ✅ Avoid loading entire history into memory
- ✅ Stream processing where possible

### 3. Memory Limits

- ✅ Node.js: `--max-old-space-size=2048` (2GB max)
- ✅ Git: Use `--no-pager` to avoid loading full output
- ✅ Limit search scope (e.g., `-100` commits instead of all)

### 4. Cleanup After Operations

- ✅ Remove temporary files immediately
- ✅ Run `git gc` after history operations
- ✅ Clear caches when done

## 📋 Optimized Scripts

### Git History Scanner (`scripts/scan-git-history-for-secrets.sh`)

**Optimizations:**

- ✅ Single-threaded pattern matching
- ✅ Uses `GIT_PAGER=cat` to avoid loading full history
- ✅ Processes one pattern at a time
- ✅ Incremental commit scanning

**Memory Usage:** ~500MB-1GB

**Usage:**

```bash
# Safe to run on 8GB RAM
./scripts/scan-git-history-for-secrets.sh
```

### Git History Removal (`scripts/remove-secrets-from-history-complete.sh`)

**Optimizations:**

- ✅ Single-threaded git-filter-repo
- ✅ Incremental processing
- ✅ Creates backup before processing
- ✅ Limits verification to recent commits

**Memory Usage:** ~1-2GB (during processing)

**Usage:**

```bash
# Safe to run on 8GB RAM (close other applications)
./scripts/remove-secrets-from-history-complete.sh
```

### Pre-Push Hook (`.git/hooks/pre-push`)

**Optimizations:**

- ✅ TypeScript: `--max-old-space-size=2048` (2GB limit)
- ✅ Build: `--max-old-space-size=2048` (2GB limit)
- ✅ Single-threaded operations
- ✅ No parallel processing

**Memory Usage:** ~2-3GB (peak during build)

**Usage:**

```bash
# Automatic on git push
git push
```

## ⚠️ Memory Usage Guidelines

### Safe Operations (Can run anytime)

- ✅ Pre-commit hook (~100MB)
- ✅ Linting (~200MB)
- ✅ Type checking (~500MB-1GB)
- ✅ Secret scanning (~100MB)

### Moderate Operations (Close other apps)

- ✅ Build validation (~2GB)
- ✅ Git history scanning (~500MB-1GB)
- ✅ SonarQube analysis (~1GB)

### Heavy Operations (Close everything)

- ⚠️ Git history removal (~1-2GB)
- ⚠️ Large git operations
- ⚠️ Full repository rebuilds

## 🔧 Memory Optimization Settings

### Node.js Memory Limits

```bash
# In pre-push hook
NODE_OPTIONS="--max-old-space-size=2048" npm run build

# In GitHub Actions
NODE_OPTIONS: '--max-old-space-size=1536'
```

### Git Memory Optimization

```bash
# Use --no-pager to avoid loading full output
GIT_PAGER=cat git log --all --no-pager

# Limit search scope
git log --all -100  # Last 100 commits only

# Clean up after operations
git gc --prune=now
```

### Git-Filter-Repo Optimization

```bash
# Single-threaded processing
python3 -m git_filter_repo --replace-text file.txt --force

# Process incrementally (default behavior)
# No parallel processing flags used
```

## 📊 Expected Memory Usage

| Operation                  | Memory Usage | Safe for 8GB?       |
| -------------------------- | ------------ | ------------------- |
| Pre-commit hook            | ~100MB       | ✅ Yes              |
| Pre-push hook (linting)    | ~200MB       | ✅ Yes              |
| Pre-push hook (type check) | ~500MB-1GB   | ✅ Yes              |
| Pre-push hook (build)      | ~2GB         | ⚠️ Close other apps |
| Git history scan           | ~500MB-1GB   | ✅ Yes              |
| Git history removal        | ~1-2GB       | ⚠️ Close everything |
| SonarQube analysis         | ~1GB         | ✅ Yes              |

## 🚨 Warning Signs

If you see these, close other applications:

- System becomes slow
- Swap file usage increases
- Applications start freezing
- "Out of memory" errors

## 💡 Best Practices

1. **Close unnecessary applications** before heavy operations
2. **Run one operation at a time** (no parallel processing)
3. **Monitor memory usage** with Activity Monitor (macOS) or Task Manager (Windows)
4. **Take breaks** between heavy operations
5. **Use incremental processing** for large operations

## 🔍 Monitoring Memory Usage

### macOS

```bash
# Check memory usage
vm_stat

# Monitor in real-time
top -l 1 | grep "PhysMem"
```

### Linux

```bash
# Check memory usage
free -h

# Monitor in real-time
htop
```

## ✅ Verification

All scripts include memory optimization:

- ✅ Single-threaded operations
- ✅ Memory limits set
- ✅ Incremental processing
- ✅ No parallel processing

## 📝 Script-Specific Notes

### `scan-git-history-for-secrets.sh`

- Processes one pattern at a time
- Uses `GIT_PAGER=cat` to avoid pager memory
- Limits output to prevent memory overflow

### `remove-secrets-from-history-complete.sh`

- Creates backup before processing
- Uses `--force` to avoid interactive prompts
- Processes incrementally
- Limits verification scope

### Pre-Push Hook

- TypeScript: 2GB memory limit
- Build: 2GB memory limit
- Single-threaded operations
- No parallel processing

## 🔗 Related Documentation

- `COMPLETE_SECURITY_PIPELINE.md` - Complete security pipeline
- `GIT_HISTORY_REMEDIATION.md` - Git history remediation
- `INTEGRATION_VERIFICATION.md` - Integration status

---

**Last Updated:** December 2024  
**Optimized For:** 8GB RAM systems  
**Status:** ✅ All scripts memory-optimized
