# PR 9: Move Hardcoded Secrets in Scripts to Environment Variables

**Branch**: `fix/gitleaks-scripts-secrets`
**Priority**: 🟡 MEDIUM (scripts run locally but contain real keys)
**Gitleaks Rules**: google-api-key, generic-api-key

## Instructions

For each script file, replace hardcoded API keys with `process.env.VARIABLE_NAME` reads and add fallback error messages.

### Pattern

```javascript
// BEFORE:
const firebaseConfig = {
  apiKey: "AIzaSyB_REAL_KEY_HERE",
  // ...
};

// AFTER:
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ?? throwEnvError("FIREBASE_API_KEY"),
  // ...
};

function throwEnvError(name) {
  throw new Error(`Missing environment variable: ${name}. See .env.example`);
}
```

## Files to Fix

### 1. scripts/test-firestore-connection.mjs

**Alert lines**: 7, 11
**Action**: Replace Firebase `apiKey` literal with `process.env.FIREBASE_API_KEY`

```javascript
// BEFORE (line ~7):
const firebaseConfig = {
  apiKey: "AIzaSy...",
  // ...
};

// AFTER:
import "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  // ...
};
```

### 2. scripts/test-progress-api.mjs

**Alert line**: 5
**Action**: Replace hardcoded API URL/key with env var

```javascript
// BEFORE (line ~5):
const API_KEY = "AIzaSy...";

// AFTER:
import "dotenv/config";
const API_KEY = process.env.FIREBASE_API_KEY;
```

### 3. scripts/populate-learning-plans.mjs

**Alert lines**: 9, 15
**Action**: Replace Firebase config with env vars

```javascript
import "dotenv/config";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  // ...
};
```

### 4. scripts/create-admin-user.mjs

**Alert line**: 8
**Action**: Replace Firebase config with env vars (same pattern)

### 5. scripts/setup-vercel-env.sh

**Alert lines**: 25-40
**Action**: Replace hardcoded keys with shell env var references

```bash
# BEFORE:
vercel env add FIREBASE_API_KEY production <<< "AIzaSy..."

# AFTER:
vercel env add FIREBASE_API_KEY production <<< "${FIREBASE_API_KEY:?Missing FIREBASE_API_KEY}"
```

### 6. scripts/fix-vercel-env.sh

**Alert lines**: 18-30
**Action**: Same pattern as setup-vercel-env.sh

### 7. scripts/setup-vercel-env.md

**Alert line**: 25
**Action**: Replace example key with `<YOUR_GOOGLE_API_KEY_HERE>`

## Also: Create/Update .env.example

```env
# Firebase
FIREBASE_API_KEY=<your-firebase-api-key>
FIREBASE_AUTH_DOMAIN=<your-project>.firebaseapp.com
FIREBASE_PROJECT_ID=<your-project-id>

# Supabase
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

## Commit

```bash
git commit -m "fix(security): move hardcoded secrets in scripts to environment variables"
```
