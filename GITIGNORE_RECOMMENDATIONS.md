# .gitignore Recommendations for Security

## 📋 Analysis: What Should Be Committed?

### ✅ **`.cursor/` Folder - PARTIAL**

**Should Commit:**
- ✅ `.cursor/rules/*.mdc` - **YES** (team collaboration, project standards)
- ✅ `.cursor/` configuration files (if project-specific)

**Should NOT Commit:**
- ❌ `.cursor/cache/` - Cache files (regenerated)
- ❌ `.cursor/logs/` - Log files (personal)
- ❌ `.cursor/mcp.json` - **CRITICAL: May contain API keys!**
- ❌ Personal settings files

**Recommendation:**
```gitignore
# .cursor - Commit rules, ignore cache and secrets
.cursor/cache/
.cursor/logs/
.cursor/*.log
.cursor/mcp.json  # ⚠️ May contain API keys!
.cursor/settings.json  # Personal settings
```

### ✅ **`.taskmaster/` Folder - PARTIAL**

**Should Commit:**
- ✅ `.taskmaster/tasks/tasks.json` - **YES** (project tasks)
- ✅ `.taskmaster/config.json` - **YES** (project configuration)
- ✅ `.taskmaster/docs/` - **YES** (project documentation)

**Should NOT Commit:**
- ❌ `.taskmaster/state.json` - Local state (personal)
- ❌ `.taskmaster/reports/` - Generated reports (can be regenerated)
- ❌ `.taskmaster/cache/` - Cache files

**Recommendation:**
```gitignore
# .taskmaster - Commit tasks and config, ignore state and cache
.taskmaster/state.json
.taskmaster/reports/
.taskmaster/cache/
.taskmaster/*.log
```

### ❌ **`database-backup/` Folder - NO**

**Should NOT Commit:**
- ❌ **All database backups** - **NEVER commit!**
  - Large files (bad for git performance)
  - May contain sensitive data (user data, secrets)
  - Can be regenerated
  - Should be stored externally (cloud storage, not git)

**Recommendation:**
```gitignore
# Database backups - NEVER commit
database-backup/
*.sql
*.dump
*.backup
*.db
*.sqlite
*.sqlite3
```

## 🔒 **Security Concerns**

### **`.cursor/mcp.json` - CRITICAL**
This file may contain:
- API keys (Anthropic, OpenAI, etc.)
- Personal access tokens
- Service credentials

**Action Required:**
1. Check if `.cursor/mcp.json` is tracked:
   ```bash
   git ls-files | grep mcp.json
   ```
2. If tracked, check for secrets:
   ```bash
   cat .cursor/mcp.json | grep -i "key\|token\|secret"
   ```
3. If secrets found:
   - Remove from git history
   - Add to `.gitignore`
   - Rotate exposed keys

## 📝 **Recommended .gitignore Additions**

Add these to your `.gitignore`:

```gitignore
# ============================================
# Cursor Configuration
# ============================================
# Commit: .cursor/rules/*.mdc (project rules)
# Ignore: Cache, logs, and files with secrets
.cursor/cache/
.cursor/logs/
.cursor/*.log
.cursor/mcp.json  # ⚠️ May contain API keys!
.cursor/settings.json

# ============================================
# Taskmaster
# ============================================
# Commit: tasks.json, config.json, docs/
# Ignore: State, reports, cache
.taskmaster/state.json
.taskmaster/reports/
.taskmaster/cache/
.taskmaster/*.log

# ============================================
# Database Backups
# ============================================
# NEVER commit database backups!
database-backup/
*.sql
*.dump
*.backup
*.db
*.sqlite
*.sqlite3
backups/
*.backup.sql
```

## ✅ **Current Status Check**

Run these commands to check what's currently tracked:

```bash
# Check if sensitive files are tracked
git ls-files | grep -E "mcp\.json|database-backup|\.sql$|\.dump$"

# Check .cursor folder contents
find .cursor -type f | grep -v "rules/"

# Check .taskmaster folder contents
find .taskmaster -type f
```

## 🚨 **If Sensitive Files Are Already Committed**

If `.cursor/mcp.json` or database backups are already in git:

1. **Check for secrets:**
   ```bash
   git log --all -p -S "api_key" -- .cursor/mcp.json
   ```

2. **Remove from git (but keep locally):**
   ```bash
   git rm --cached .cursor/mcp.json
   git rm --cached -r database-backup/
   ```

3. **Add to .gitignore:**
   ```bash
   echo ".cursor/mcp.json" >> .gitignore
   echo "database-backup/" >> .gitignore
   ```

4. **Commit the changes:**
   ```bash
   git add .gitignore
   git commit -m "security: Remove sensitive files from git tracking"
   ```

5. **If secrets were in history:**
   - Follow `GIT_HISTORY_REMEDIATION.md`
   - Rotate all exposed keys
   - Remove from history

## 📊 **Summary**

| Folder/File | Commit? | Reason |
|------------|---------|--------|
| `.cursor/rules/*.mdc` | ✅ Yes | Team collaboration, project standards |
| `.cursor/mcp.json` | ❌ No | May contain API keys |
| `.cursor/cache/` | ❌ No | Generated files |
| `.taskmaster/tasks.json` | ✅ Yes | Project tasks |
| `.taskmaster/config.json` | ✅ Yes | Project configuration |
| `.taskmaster/state.json` | ❌ No | Local state |
| `database-backup/` | ❌ No | Large files, sensitive data |

## 🔗 **Related Documentation**

- `COMPLETE_SECURITY_PIPELINE.md` - Security pipeline guide
- `GIT_HISTORY_REMEDIATION.md` - History cleanup guide
- `.cursor/rules/security.mdc` - Security rules

---

**Last Updated:** December 2024  
**Status:** Recommendations for secure git practices

