# 🔑 Quick Guide: Get SonarQube Token

## What's Missing?
❌ **SONARQUBE_TOKEN** - You need to generate this

## Quick Steps:
1. Go to: https://sonarcloud.io/
2. Sign in with GitHub
3. Click your profile (top right) → **My Account**
4. Click **Security** tab
5. Scroll to **Generate Tokens**
6. Enter name: "MCP Server Token"
7. Click **Generate**
8. **Copy token immediately** (shown only once!)

## Add to .env.local:
```bash
SONARQUBE_TOKEN=your_token_here
SONARQUBE_ORG=FoushWare
```

## Then:
- Restart Cursor
- Test: Ask AI "Search SonarQube issues"

## Direct Link:
https://sonarcloud.io/account/security
