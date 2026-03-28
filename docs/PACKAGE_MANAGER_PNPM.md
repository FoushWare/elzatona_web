# pnpm Migration & Setup Guide

## Overview

This project uses **pnpm** as the package manager (not npm, yarn, or bun). This decision was made to:

- **Save storage**: pnpm uses a content-addressable store, not per-project node_modules folders
- **Reduce disk footprint**: Avoid npm's global cache bloat (`~/.npm` can grow to 10GB+)
- **Better performance**: pnpm's flat/non-flat node_modules strategy is more efficient
- **RAM efficiency**: Lower memory overhead during dependency installation
- **Monorepo support**: pnpm workspaces are ideal for Nx monorepos

## Installation

### macOS (using Homebrew)

```bash
brew install pnpm
```

### All Platforms (using npm)

```bash
npm install -g pnpm@latest
```

### Verify Installation

```bash
pnpm --version
# Expected: v9.0.0 or later
```

## Usage

Replace all `npm` commands with `pnpm`:

| npm Command           | pnpm Equivalent     |
| --------------------- | ------------------- |
| `npm install`         | `pnpm install`      |
| `npm install <pkg>`   | `pnpm add <pkg>`    |
| `npm uninstall <pkg>` | `pnpm remove <pkg>` |
| `npm update`          | `pnpm update`       |
| `npm run dev`         | `pnpm dev`          |
| `npm run build`       | `pnpm build`        |
| `npm test`            | `pnpm test`         |

## Common pnpm Commands

### Install Dependencies

```bash
# Install all dependencies
pnpm install

# Install and add a new package
pnpm add lodash

# Install a dev dependency
pnpm add -D @types/node

# Install globally
pnpm add -g eslint
```

### Workspace Commands (for this monorepo)

```bash
# Run command across all packages
pnpm -r run test

# Run command in specific package
pnpm --filter @elzatona/database run build

# Install deps in specific package
pnpm --filter website add react-query
```

### Maintenance

```bash
# Check for outdated packages
pnpm outdated

# Update all packages
pnpm update --latest

# Verify lock file integrity
pnpm install --frozen-lockfile

# Clean pnpm cache (use cautiously)
pnpm store prune
```

## Lock File

The `pnpm-lock.yaml` file **MUST** be committed to version control:

```bash
git add pnpm-lock.yaml
git commit -m "chore: add pnpm lock file"
```

This ensures reproducible installs across all environments (local, CI/CD, etc.).

## Memory & Storage Benefits

### Before (npm)

- `node_modules/` per project: 500MB - 2GB each
- `~/.npm` global cache: Can grow to 10GB+
- Per-dependency duplication across projects
- Total disk usage: 15-50GB for active development

### After (pnpm)

- Content-addressable store: ~5-10GB for entire ecosystem
- Hard/soft links to dependencies (minimal duplication)
- Predictable file structure under `~/.pnpm-store`
- Total disk usage: 5-10GB (75% reduction)

### Memory Impact During Install

```bash
# npm
npm install → ~400MB RAM, Slow on 8GB machines

# pnpm
pnpm install → ~150MB RAM, Fast even on 8GB machines
```

## Troubleshooting

### "pnpm: command not found"

Install pnpm globally:

```bash
npm install -g pnpm@latest
```

### Lock file conflicts in git

Don't manually edit `pnpm-lock.yaml`. Conflicts usually mean you edited package.json without pnpm:

```bash
# Regenerate lock file
pnpm install

# Force sync with package.json
pnpm install --frozen-lockfile=false
```

### Node modules permission errors

Clear pnpm cache:

```bash
pnpm store prune
pnpm install
```

### CI/CD Considerations

In GitHub Actions or other CI systems, use `--frozen-lockfile`:

```bash
pnpm install --frozen-lockfile
```

This ensures the exact versions from `pnpm-lock.yaml` are installed without modifications.

## Pre-commit Hooks

The project uses husky + lint-staged for pre-commit validation. pnpm commands work seamlessly:

```bash
# These will run automatically before each commit
pnpm run lint
pnpm run type-check
pnpm run format
```

## Environment Variables

pnpm respects `.npmrc` and `.pnpmrc` files. Key settings for this project:

```bash
# .pnpmrc (optional, in project root)
shamefully-hoist=true  # (Use only if needed for compatibility)
store-dir=~/.pnpm-store
```

## Further Reading

- [pnpm Official Docs](https://pnpm.io)
- [pnpm Monorepo Guide](https://pnpm.io/workspaces)
- [Migration from npm](https://pnpm.io/migration)

---

**Last Updated**: March 28, 2026  
**Package Manager**: pnpm v9+  
**Node Version**: 20.x LTS
