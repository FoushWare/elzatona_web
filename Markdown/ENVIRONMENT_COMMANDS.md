# Environment Commands - Complete Reference

## 🚀 Development Server Commands

### Full Memory (2048 MB) - Recommended for Development

```bash
# TEST Environment
npm run dev:test

# DEVELOPMENT Environment (uses test DB until separate dev project)
npm run dev:dev

# PRODUCTION Environment (default)
npm run dev:prod
# or
npm run dev
```

### Light Memory (1536 MB) - For 8GB RAM Systems

```bash
# TEST Environment (Light)
npm run dev:light:test

# DEVELOPMENT Environment (Light)
npm run dev:light:dev

# PRODUCTION Environment (Light)
npm run dev:light:prod
# or
npm run dev:light
```

## 📋 Command Summary

| Command                  | Environment | Memory  | Database         |
| ------------------------ | ----------- | ------- | ---------------- |
| `npm run dev`            | PRODUCTION  | 2048 MB | Production       |
| `npm run dev:prod`       | PRODUCTION  | 2048 MB | Production       |
| `npm run dev:dev`        | DEVELOPMENT | 2048 MB | Test (temporary) |
| `npm run dev:test`       | TEST        | 2048 MB | Test             |
| `npm run dev:light`      | PRODUCTION  | 1536 MB | Production       |
| `npm run dev:light:prod` | PRODUCTION  | 1536 MB | Production       |
| `npm run dev:light:dev`  | DEVELOPMENT | 1536 MB | Test (temporary) |
| `npm run dev:light:test` | TEST        | 1536 MB | Test             |

## 🧪 Test Commands (Always Use TEST Environment)

```bash
# Unit Tests
npm run test:unit

# Integration Tests
npm run test:integration

# E2E Tests
npm run test:e2e
```

**Note**: All test commands automatically use TEST environment - no configuration needed!

## 🔄 Switching Environments

### Method 1: Use npm Scripts (Recommended)

```bash
npm run dev:test      # TEST
npm run dev:dev       # DEVELOPMENT
npm run dev:prod      # PRODUCTION
```

### Method 2: Use Set Script

```bash
node scripts/set-env.js test        # Switch to TEST
node scripts/set-env.js dev          # Switch to DEVELOPMENT
node scripts/set-env.js production   # Switch to PRODUCTION
```

### Method 3: Set Environment Variable

```bash
APP_ENV=test npm run dev
APP_ENV=development npm run dev
APP_ENV=production npm run dev
```

## 📊 Environment Detection

The system automatically detects environment based on:

1. **`APP_ENV`** variable (highest priority)
2. `NEXT_PUBLIC_APP_ENV`
3. `NODE_ENV`
4. Supabase URL (fallback)

## ✅ Quick Reference

### For Testing

```bash
npm run dev:test          # Full memory
npm run dev:light:test    # Light memory
```

### For Development

```bash
npm run dev:dev           # Full memory
npm run dev:light:dev     # Light memory
```

### For Production

```bash
npm run dev:prod          # Full memory
npm run dev:light:prod    # Light memory
```

## 🔍 Check Current Environment

```bash
node scripts/check-env.js
# or
node scripts/set-env.js
```

## 📝 Environment Files

- **`.env.test.local`** → TEST environment
- **`.env.dev.local`** → DEVELOPMENT environment (uses test DB for now)
- **`.env.local`** → PRODUCTION environment

## 💡 Tips

1. **Use light mode** if you have 8GB RAM or less
2. **Use full memory** for better performance if you have 16GB+ RAM
3. **Tests always use TEST** - no need to switch
4. **Development uses test DB** until you create a separate dev project
