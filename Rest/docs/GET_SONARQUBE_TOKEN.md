# 🔑 How to Get Your SonarCloud Token

## Quick Steps

1. **Go to SonarCloud**: https://sonarcloud.io/
2. **Sign in** with your GitHub account
3. **Click your profile** (top right corner)
4. **Select "My Account"**
5. **Go to "Security" tab**
6. **Scroll to "Generate Tokens" section**
7. **Click "Generate" button**
8. **Give it a name**: e.g., "MCP Server Token"
9. **Copy the token immediately** ⚠️ (you won't see it again!)

## What You Need

Based on your project URL (https://sonarcloud.io/project/configuration?id=FoushWare_GreatFrontendHub):

- ✅ **Organization Key**: `FoushWare` (already configured)
- ⏳ **Personal Access Token**: You need to generate this

## After Getting the Token

Add to your `.env.local` file:

```bash
SONARQUBE_TOKEN=your_token_here
SONARQUBE_ORG=FoushWare
```

Or update `.cursor/mcp.json` directly with the token value.

## Token Permissions

The token needs:

- ✅ Read access to your projects
- ✅ Read access to your organization (`FoushWare`)

## Visual Guide

```
SonarCloud Dashboard
  └─> Your Profile (top right)
      └─> My Account
          └─> Security Tab
              └─> Generate Tokens Section
                  └─> Generate Button
                      └─> Copy Token
```

---

**Next Step**: Generate token and add to `.env.local` or `.cursor/mcp.json`
