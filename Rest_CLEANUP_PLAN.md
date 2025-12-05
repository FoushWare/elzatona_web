# Rest/ Directory Cleanup Plan

## 🚨 Critical Issue: 22GB Directory!

The `Rest/` directory is **22GB** in size, mostly due to temporary test files.

## ✅ SAFE TO DELETE (Temporary/Generated Files)

### 1. **Rest/other/playwright-report/** - 22GB ⚠️ **HUGE**
- **Size:** ~22GB
- **Files:** 28,834 files (350 webm videos, 36 png images, etc.)
- **Type:** Playwright test report videos/images
- **Status:** ✅ **SAFE TO DELETE** - Generated test output, can be regenerated
- **Action:** Delete entire directory

### 2. **Rest/other/.nx/cache/** - Cache files
- **Type:** Nx build cache
- **Status:** ✅ **SAFE TO DELETE** - Cache, can be regenerated
- **Action:** Delete cache directory

### 3. **Rest/scripts/scripts-backup/** - Backup scripts
- **Type:** Old backup of scripts
- **Status:** ✅ **SAFE TO DELETE** - Backup, not used
- **Action:** Delete if scripts are already in main scripts/ directory

### 4. **Rest/prompets/** - Typo directory
- **Size:** 4KB, 1 file
- **Type:** Likely typo for "prompts"
- **Status:** ⚠️ **REVIEW FIRST** - Check if file is needed
- **Action:** Review content, then delete if not needed

### 5. **Rest/other/.husky/** - Alternate hook versions
- **Type:** Backup/alternate Husky hooks
- **Status:** ⚠️ **KEEP FOR NOW** - Used by package.json scripts
- **Action:** Keep (used by npm scripts for switching hooks)

## ⚠️ REVIEW BEFORE DELETING

### 1. **Rest/scripts/** - Many batch files
- **Size:** 19MB, 1,097 files
- **Type:** Question generation scripts, batch files
- **Status:** ⚠️ **REVIEW** - Some may be used, some are one-time scripts
- **Action:** Review which scripts are referenced in package.json

### 2. **Rest/seed-batches/** - SQL seed files
- **Size:** 3.4MB, 82 files
- **Type:** SQL seed batch files
- **Status:** ⚠️ **REVIEW** - May be needed for database seeding
- **Action:** Check if used by seeders

### 3. **Rest/final-questions-v01/** - Question data
- **Size:** 4.0MB, 18 files
- **Type:** Question JSON files
- **Status:** ⚠️ **KEEP** - Used by seeders (see Rest/seeders/04-seed-questions.js)
- **Action:** Keep (actively used)

### 4. **Rest/questions-vo2/** - Question data v2
- **Size:** 5.3MB, 55 files
- **Type:** Question JSON files (version 2)
- **Status:** ⚠️ **REVIEW** - Check if still used
- **Action:** Check if referenced anywhere

## ✅ KEEP (Necessary Files)

### 1. **Rest/migrations/** - Database migrations
- **Status:** ✅ **KEEP** - Database migrations, necessary
- **Files:** SQL migration files

### 2. **Rest/seeders/** - Database seeders
- **Status:** ✅ **KEEP** - Used for database seeding
- **Files:** JavaScript seeder files

### 3. **Rest/mcp/** - MCP configuration
- **Status:** ✅ **KEEP** - MCP server configs (Sentry, SonarQube)
- **Files:** JSON configs, JAR files

### 4. **Rest/scripts/scripts/** - Active scripts
- **Status:** ✅ **KEEP** - Referenced in package.json
- **Files:** check-supabase-schema.js, run-sonarqube-local.js, etc.

### 5. **Rest/docs/** - Documentation
- **Status:** ✅ **KEEP** - Project documentation
- **Files:** Setup guides, best practices

### 6. **Rest/markdown/** - Documentation
- **Status:** ✅ **KEEP** - Project documentation
- **Files:** Various markdown docs

### 7. **Rest/other/.husky/** - Husky hooks
- **Status:** ✅ **KEEP** - Used by npm scripts for hook switching
- **Files:** Various hook versions

## 📊 Estimated Space Savings

- **Rest/other/playwright-report/**: ~22GB (99% of total!)
- **Rest/other/.nx/cache/**: ~few MB
- **Rest/scripts/scripts-backup/**: ~few MB
- **Total potential savings: ~22GB+**

## 🎯 Recommended Actions

1. **IMMEDIATE:** Delete `Rest/other/playwright-report/` (22GB)
2. **IMMEDIATE:** Delete `Rest/other/.nx/cache/` (cache)
3. **REVIEW:** Check `Rest/prompets/` content, then delete if not needed
4. **REVIEW:** Audit `Rest/scripts/` for unused batch files
5. **KEEP:** All migrations, seeders, active scripts, docs

