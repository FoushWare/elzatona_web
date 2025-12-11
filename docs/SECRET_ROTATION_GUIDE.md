# Secret Rotation Guide

## Overview

This guide documents all secrets that were exposed in the git repository history and need to be rotated immediately.

## Exposed Secrets Summary

### 1. Supabase Service Role Keys (4 instances)

**Locations in History:**

- `scripts/clean-all-branches-secrets.sh`
- `tests/api/test-small-records-fixed.js`
- `scripts/reset-admin-password.js`
- `scripts/seed-all-questions-comprehensive.js`
- Documentation files

**Projects Affected:**

- `hpnewqkvpnthpohvxcmq` (main project)
- `kiycimlsatwfqxtfprlr` (testing project)
- `slfyltsmcivmqfloxpmq` (another project)

**Action Required:**

1. Go to each Supabase project dashboard
2. Navigate to Settings → API
3. Revoke the current service_role key
4. Generate a new service_role key
5. Update all environment files (`.env.local`, `.env.test.local`, etc.)
6. Update GitHub Secrets

### 2. Google API Keys (9 instances)

**Locations in History:**

- `src/scripts/check-and-seed-learning-cards.ts`
- `debug-delete-test.js`
- `scripts/add-missing-plans.mjs`
- `src/scripts/seed-learning-cards.ts`
- `scripts/init-admin.mjs`
- `clear-unified-questions.js`
- `scripts/setup-vercel-env.md`
- `create-simple-questions.js`
- `debug-delete-manual.js`

**Action Required:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. For each exposed API key:
   - Click on the key
   - Click "Restrict key" or "Delete"
   - If restricting, add application restrictions
   - If deleting, create a new key
4. Update all environment files
5. Update GitHub Secrets

### 3. GitHub OAuth Access Token

**Location in History:**

- `.cursor/mcp.json`

**Token:** `YOUR_GITHUB_TOKEN_HERE` (⚠️ Rotate immediately - token was exposed in git history)

**Action Required:**

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Find the token (if it still exists)
3. Revoke the token immediately
4. Generate a new token with required permissions
5. Update `.cursor/mcp.json` (local only, not committed)
6. Update GitHub Secrets if used in CI/CD

### 4. OpenAI API Key

**Location in History:**

- `.cursor/mcp.json`

**Key:** `YOUR_OPENAI_API_KEY_HERE` (⚠️ Rotate immediately - key was exposed in git history)

**Action Required:**

1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Find the key (if it still exists)
3. Delete the key immediately
4. Create a new API key
5. Update `.cursor/mcp.json` (local only)
6. Update GitHub Secrets if used in CI/CD

### 5. Sentry Personal Token

**Location in History:**

- `Rest/docs/SENTRY_MCP_SETUP_COMPLETE.md`

**Token:** `YOUR_SENTRY_TOKEN_HERE` (⚠️ This token was exposed and should be rotated)

**Action Required:**

1. Go to [Sentry Settings → Auth Tokens](https://sentry.io/settings/account/api/auth-tokens/)
2. Find the token
3. Revoke the token immediately
4. Create a new auth token
5. Update `.cursor/mcp.json` (local only)
6. Update GitHub Secrets if used in CI/CD

### 6. Google OAuth Client ID and Secret

**Location in History:**

- `docs/authentication/AUTHENTICATION_COMPLETE_SUCCESS.md`

**Client ID:** `655799372296-vd44sjnvf427est82dsa9nj029iis4b7.apps.googleusercontent.com`
**Client Secret:** `YOUR_GOOGLE_OAUTH_SECRET_HERE` (⚠️ Rotate immediately - secret was exposed in git history)

**Action Required:**

1. Go to [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
2. Find the OAuth 2.0 Client ID
3. Delete the client secret
4. Generate a new client secret
5. Update all environment files
6. Update GitHub Secrets
7. Update application configuration

## Rotation Checklist

### Immediate Actions (Do First)

- [ ] Rotate Supabase service role keys (all projects)
- [ ] Revoke GitHub OAuth token
- [ ] Delete OpenAI API key
- [ ] Revoke Sentry token
- [ ] Rotate Google OAuth client secret

### Update Configuration Files

- [ ] Update `.env.local` with new Supabase keys
- [ ] Update `.env.test.local` with new Supabase keys
- [ ] Update `.cursor/mcp.json` (local only) with new tokens
- [ ] Update all GitHub Secrets in repository settings

### Update GitHub Secrets

Go to: https://github.com/FoushWare/elzatona_web/settings/secrets/actions

Update the following secrets:

- [ ] `TEST_SUPABASE_URL` (if changed)
- [ ] `TEST_SUPABASE_ANON_KEY` (if changed)
- [ ] `TEST_SUPABASE_SERVICE_ROLE_KEY` (NEW KEY)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (NEW KEY)
- [ ] `JWT_SECRET` (if exposed)
- [ ] Any Google API keys
- [ ] Any OAuth tokens

### Verify After Rotation

- [ ] Test application builds successfully
- [ ] Test authentication flows
- [ ] Test API endpoints
- [ ] Verify CI/CD pipelines work
- [ ] Check that secret scanning alerts decrease

## Security Best Practices Going Forward

1. **Never commit secrets to git**
   - Use `.env` files (already in `.gitignore`)
   - Use GitHub Secrets for CI/CD
   - Use placeholder values in documentation

2. **Use environment variables**
   - All secrets should come from `process.env`
   - No hardcoded values in source code
   - Validate required env vars at startup

3. **Regular secret rotation**
   - Rotate secrets quarterly
   - Rotate immediately after exposure
   - Document rotation process

4. **Monitor secret scanning**
   - Check GitHub secret scanning alerts regularly
   - Set up notifications for new alerts
   - Respond immediately to alerts

## Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Google Cloud Console**: https://console.cloud.google.com/
- **GitHub Tokens**: https://github.com/settings/tokens
- **OpenAI API Keys**: https://platform.openai.com/api-keys
- **Sentry Tokens**: https://sentry.io/settings/account/api/auth-tokens/
- **GitHub Secrets**: https://github.com/FoushWare/elzatona_web/settings/secrets/actions

## Notes

- All secrets listed here have been exposed in git history
- Even after removing from history, secrets should be rotated
- Some secrets may have already been rotated or revoked
- Check each service dashboard to verify current status
- Update this document as secrets are rotated

---

**Last Updated**: December 2024
**Status**: Secrets need rotation - see checklist above
