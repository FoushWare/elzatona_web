# SonarQube MCP Connection Guide

## 🔗 Your SonarCloud Project

Based on your project URL, here's what we know:
- **Organization**: `FoushWare`
- **Project Key**: `FoushWare_GreatFrontendHub`
- **Project URL**: https://sonarcloud.io/project/configuration?id=FoushWare_GreatFrontendHub

## ✅ What's Already Configured

The SonarQube MCP server has been added to `.cursor/mcp.json` with:
- ✅ Java path: `/opt/homebrew/opt/openjdk@21/bin/java`
- ✅ JAR file: `Rest/mcp/sonarqube/sonarqube-mcp-server.jar`
- ✅ Storage path: `Rest/mcp/sonarqube/storage`
- ⏳ **Missing**: Authentication credentials

## 🔑 What You Need to Get

### 1. SonarCloud Personal Access Token

**Steps:**
1. Go to https://sonarcloud.io/
2. Sign in with your GitHub account
3. Click on your profile (top right) → **My Account**
4. Go to **Security** tab
5. Scroll to **Generate Tokens** section
6. Click **Generate** button
7. Give it a name (e.g., "MCP Server Token")
8. **Copy the token immediately** (you won't see it again!)

**Token Permissions Needed:**
- Read access to your projects
- Read access to your organization

### 2. Organization Key

From your project URL, your organization key is: **`FoushWare`**

This is already visible in the URL: `https://sonarcloud.io/project/configuration?id=FoushWare_GreatFrontendHub`

## 📝 Configuration Steps

### Step 1: Add Environment Variables

Add to your `.env.local` file:

```bash
# SonarQube MCP Configuration
SONARQUBE_TOKEN=your_personal_access_token_here
SONARQUBE_ORG=FoushWare
```

**Important Notes:**
- Replace `your_personal_access_token_here` with the actual token you generated
- The organization key `FoushWare` is already correct based on your project URL

### Step 2: Update MCP Configuration (Optional)

If you want to use the actual values directly in `mcp.json` instead of environment variables:

```json
{
  "mcpServers": {
    "sonarqube": {
      "command": "/opt/homebrew/opt/openjdk@21/bin/java",
      "args": [
        "-jar",
        "Rest/mcp/sonarqube/sonarqube-mcp-server.jar"
      ],
      "env": {
        "STORAGE_PATH": "Rest/mcp/sonarqube/storage",
        "SONARQUBE_TOKEN": "your_actual_token_here",
        "SONARQUBE_ORG": "FoushWare"
      }
    }
  }
}
```

**Note**: Using environment variables (via `${SONARQUBE_TOKEN}`) is more secure, but you need to ensure Cursor can access them.

### Step 3: Restart Cursor

1. **Quit Cursor completely** (⌘Q on Mac)
2. **Reopen Cursor**
3. The SonarQube MCP server should start automatically

## ✅ Verification

After restarting Cursor, verify the connection:

1. **Check MCP Status**:
   - Open Cursor's MCP panel
   - Look for "sonarqube" server
   - Should show as "Connected" or "Running"

2. **Test in Chat**:
   - Ask: "Search for SonarQube issues in my project"
   - Or: "Get the quality gate status for FoushWare_GreatFrontendHub"
   - Should work if configured correctly

3. **Check Logs** (if issues):
   - Location: `Rest/mcp/sonarqube/storage/logs/mcp.log`

## 🔍 Troubleshooting

### MCP Server Not Starting

1. **Check Java**:
   ```bash
   /opt/homebrew/opt/openjdk@21/bin/java -version
   ```
   Should show: `openjdk version "21.x.x"`

2. **Check JAR File**:
   ```bash
   ls -lh Rest/mcp/sonarqube/sonarqube-mcp-server.jar
   ```
   Should be ~45MB

3. **Check Environment Variables**:
   ```bash
   echo $SONARQUBE_TOKEN
   echo $SONARQUBE_ORG
   ```
   Should show your values (if set in shell)

### Authentication Errors

- **Invalid Token**: Verify the token is correct and hasn't expired
- **Wrong Organization**: Verify `SONARQUBE_ORG` is `FoushWare` (case-sensitive)
- **Token Permissions**: Ensure token has read access to your organization

### Connection Issues

- **Network**: Ensure you can access https://sonarcloud.io/
- **Token Format**: Token should be a long alphanumeric string
- **Organization Key**: Must match exactly (case-sensitive)

## 📚 Quick Reference

| Item | Value |
|------|-------|
| **Organization** | `FoushWare` |
| **Project Key** | `FoushWare_GreatFrontendHub` |
| **Token Location** | SonarCloud → My Account → Security |
| **Config File** | `.cursor/mcp.json` |
| **Environment File** | `.env.local` |

## 🎯 Next Steps

1. ✅ Generate token at https://sonarcloud.io/ → My Account → Security
2. ✅ Add to `.env.local`: `SONARQUBE_TOKEN=...` and `SONARQUBE_ORG=FoushWare`
3. ✅ Restart Cursor
4. ✅ Test connection by asking AI to search SonarQube issues

---

**Status**: ⏳ Waiting for authentication token

**Action Required**: Generate token and add to `.env.local`

