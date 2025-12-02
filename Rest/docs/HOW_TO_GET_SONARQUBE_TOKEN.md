# 🔑 How to Get Your SonarQube Token - Step by Step

## 📋 What's Missing

Based on your current setup:
- ✅ **SONARQUBE_ORG**: `FoushWare` (already configured)
- ✅ **STORAGE_PATH**: `Rest/mcp/sonarqube/storage` (already configured)
- ❌ **SONARQUBE_TOKEN**: **MISSING** - You need to generate this

## 🎯 Step-by-Step: Get Your SonarQube Token

### Step 1: Go to SonarCloud
1. Open your browser
2. Go to: **https://sonarcloud.io/**
3. **Sign in** with your GitHub account (if not already signed in)

### Step 2: Navigate to Security Settings
1. Click on your **profile picture/icon** (top right corner)
2. Click **"My Account"** from the dropdown menu
3. Click on the **"Security"** tab (in the left sidebar)

### Step 3: Generate Token
1. Scroll down to the **"Generate Tokens"** section
2. You'll see a form with:
   - **Name**: Enter a name (e.g., "MCP Server Token" or "Cursor MCP")
   - **Type**: Select "User Token" (default)
   - **Expires**: Leave as "No expiration" (or set a date)
3. Click the **"Generate"** button

### Step 4: Copy Token
1. **⚠️ IMPORTANT**: Copy the token **immediately**
   - The token will be displayed only once
   - It looks like: `squ_1234567890abcdefghijklmnopqrstuvwxyz...`
2. **Save it somewhere safe** (password manager, notes, etc.)
3. Click **"Done"** or close the dialog

## 📝 Visual Guide

```
SonarCloud Website
  └─> Sign In (top right)
      └─> Profile Icon (top right after login)
          └─> My Account
              └─> Security Tab (left sidebar)
                  └─> Generate Tokens Section
                      └─> Name: "MCP Server Token"
                      └─> Generate Button
                          └─> Copy Token (shown only once!)
```

## 🔧 Add Token to Your Project

### Option 1: Add to `.env.local` (Recommended)

1. Open or create `.env.local` in your project root:
   ```bash
   cd /Users/a.fouad/SideProjects/Elzatona-all/Elzatona-web
   nano .env.local
   # or
   code .env.local
   ```

2. Add these lines:
   ```bash
   # SonarQube MCP Configuration
   SONARQUBE_TOKEN=your_actual_token_here
   SONARQUBE_ORG=FoushWare
   ```

3. Replace `your_actual_token_here` with the token you copied

4. Save the file

### Option 2: Update `.cursor/mcp.json` Directly

1. Open `.cursor/mcp.json`
2. Find the `sonarqube` section
3. Replace `${SONARQUBE_TOKEN}` with your actual token:
   ```json
   "SONARQUBE_TOKEN": "squ_1234567890abcdefghijklmnopqrstuvwxyz..."
   ```

## ✅ Verification

After adding the token:

1. **Check `.env.local`**:
   ```bash
   grep SONARQUBE .env.local
   ```
   Should show:
   ```
   SONARQUBE_TOKEN=your_token
   SONARQUBE_ORG=FoushWare
   ```

2. **Restart Cursor**:
   - Quit Cursor completely (⌘Q)
   - Reopen Cursor
   - The MCP server should connect

3. **Test Connection**:
   - Ask AI: "Search for SonarQube issues in my project"
   - Should work if token is correct

## 🔍 Troubleshooting

### Token Not Working?

1. **Verify Token Format**:
   - Should start with `squ_`
   - Should be a long string (50+ characters)
   - No spaces or line breaks

2. **Check Token Permissions**:
   - Token needs read access to your organization
   - Go to SonarCloud → My Account → Security
   - Check if token is listed and active

3. **Verify Organization Key**:
   - Must be exactly `FoushWare` (case-sensitive)
   - Check in `.cursor/mcp.json`:
     ```bash
     cat .cursor/mcp.json | jq '.mcpServers.sonarqube.env.SONARQUBE_ORG'
     ```

4. **Check MCP Logs**:
   ```bash
   tail -f Rest/mcp/sonarqube/storage/logs/mcp.log
   ```
   Look for authentication errors

### Token Expired or Revoked?

1. Go back to SonarCloud → My Account → Security
2. Generate a new token
3. Update `.env.local` or `.cursor/mcp.json` with the new token
4. Restart Cursor

## 📋 Quick Checklist

- [ ] Signed in to SonarCloud (https://sonarcloud.io/)
- [ ] Navigated to: My Account → Security
- [ ] Generated a new token
- [ ] Copied the token immediately
- [ ] Added `SONARQUBE_TOKEN=...` to `.env.local`
- [ ] Added `SONARQUBE_ORG=FoushWare` to `.env.local`
- [ ] Restarted Cursor
- [ ] Tested connection

## 🎯 Direct Links

- **SonarCloud**: https://sonarcloud.io/
- **Your Project**: https://sonarcloud.io/project/configuration?id=FoushWare_GreatFrontendHub
- **Security Settings**: https://sonarcloud.io/account/security

## 💡 Pro Tips

1. **Token Security**:
   - Never commit tokens to Git
   - Add `.env.local` to `.gitignore` (if not already)
   - Use environment variables instead of hardcoding

2. **Token Management**:
   - Give tokens descriptive names
   - Revoke old/unused tokens
   - Use different tokens for different purposes

3. **If Token Doesn't Work**:
   - Verify you're signed in to the correct SonarCloud account
   - Check that the organization key matches exactly
   - Ensure token has read permissions

---

**Next Step**: Generate token at https://sonarcloud.io/ → My Account → Security → Generate Tokens

