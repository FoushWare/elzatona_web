# Cursor Scripts

This directory contains utility scripts and commands for development workflows.

## Directory Structure

```
.cursor/
├── commands/          # Command documentation (markdown files)
├── rules/            # Cursor rules and guidelines
└── check-build-and-push.sh  # Build check and push script
```

## Available Commands

### Check Build and Push

See [commands/check-build-and-push.md](./commands/check-build-and-push.md) for complete documentation.

**Quick usage:**

```bash
npm run build:check-and-push
# or
npm run check-build-push
```

This command:

1. ✅ Checks for uncommitted changes and stages them
2. 🔧 Runs linting with auto-fix
3. 🔍 Checks TypeScript errors
4. 🏗️ Runs build check
5. 🧪 Runs tests
6. 🔧 Attempts to fix common build and test errors
   - **Vercel errors**: Uses Vercel CLI automatically
   - **GitHub errors**: Uses GitHub CLI or MCP tools
7. 📝 Commits changes if any fixes were made
8. 🚀 Pushes to GitHub (with auto-fix for common issues)

## Commands Directory

All command documentation is stored in `.cursor/commands/` as markdown files:

- `check-build-and-push.md` - Complete documentation for the build check and push command
