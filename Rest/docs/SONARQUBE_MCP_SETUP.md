# SonarQube MCP Server Setup Guide

## ✅ Installation Complete!

The SonarQube MCP server has been successfully installed and configured.

## 📦 What Was Installed

- **SonarQube MCP Server JAR**: `Rest/mcp/sonarqube/sonarqube-mcp-server.jar` (45MB)
- **JDK 21**: Already installed via Homebrew at `/opt/homebrew/opt/openjdk@21/bin/java`
- **Storage Directory**: `Rest/mcp/sonarqube/storage/`

## 🔧 Configuration Steps

### Step 1: Configure MCP in Cursor

The MCP configuration needs to be added to `.cursor/mcp.json`. 

**Option A: Automatic (if jq is installed)**
```bash
npm run configure:sonarqube-mcp
# or
bash Rest/scripts/scripts/configure-sonarqube-mcp.sh
```

**Option B: Manual Configuration**

Add the following to `.cursor/mcp.json`:

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
        "SONARQUBE_TOKEN": "${SONARQUBE_TOKEN}",
        "SONARQUBE_ORG": "${SONARQUBE_ORG}"
      }
    }
  }
}
```

**Note**: If you already have other MCP servers configured, add `"sonarqube"` to the existing `mcpServers` object.

### Step 2: Get Your SonarCloud Credentials

1. **Get Your Token**:
   - Go to https://sonarcloud.io/
   - Sign in with GitHub
   - Navigate to: **My Account → Security**
   - Click **Generate Token**
   - Copy the token (you won't see it again!)

2. **Get Your Organization Key**:
   - In SonarCloud, go to your organization
   - The organization key is visible in the URL or organization settings
   - Example: `foushware` or `your-org-key`

### Step 3: Set Environment Variables

Add to your `.env.local` file:

```bash
# SonarQube MCP Configuration
SONARQUBE_TOKEN=your_token_here
SONARQUBE_ORG=your_organization_key
```

**Important**: 
- For Cursor MCP, these variables should also be set in your shell environment
- Or use the actual values directly in `mcp.json` (less secure)

### Step 4: Restart Cursor

After configuring:
1. Save all files
2. **Restart Cursor completely** (Quit and reopen)
3. The MCP server will start automatically

## ✅ Verification

After restarting Cursor, you should see:
- SonarQube MCP server in the MCP status
- No errors in the MCP logs
- Ability to use SonarQube tools in AI conversations

## 🛠️ Available MCP Tools

Once configured, you can use these SonarQube tools:

- **Search Issues**: Find code quality issues
- **Get Quality Gate Status**: Check project quality
- **Get Measures**: Retrieve metrics (coverage, complexity, etc.)
- **List Projects**: View your SonarCloud projects
- **And more!**

## 📚 Documentation

- **Official Docs**: https://github.com/SonarSource/sonarqube-mcp-server
- **MCP Config Example**: `Rest/mcp/sonarqube/MCP_CONFIG_EXAMPLE.json`
- **Setup Script**: `Rest/scripts/scripts/configure-sonarqube-mcp.sh`

## 🔍 Troubleshooting

### MCP Server Not Starting

1. **Check Java Version**:
   ```bash
   /opt/homebrew/opt/openjdk@21/bin/java -version
   ```
   Should show: `openjdk version "21.x.x"`

2. **Check JAR File**:
   ```bash
   ls -lh Rest/mcp/sonarqube/sonarqube-mcp-server.jar
   ```
   Should be ~45MB

3. **Check Logs**:
   - MCP logs: `Rest/mcp/sonarqube/storage/logs/mcp.log`
   - Cursor MCP logs: Check Cursor's MCP status panel

### Authentication Errors

- Verify `SONARQUBE_TOKEN` is correct
- Verify `SONARQUBE_ORG` matches your organization key
- Token must have appropriate permissions

### Configuration Issues

- Ensure `.cursor/mcp.json` is valid JSON
- Check that paths are correct (relative to project root)
- Verify environment variables are set

## 🎯 Next Steps

1. ✅ Configure `.cursor/mcp.json` (see Step 1)
2. ✅ Set environment variables (see Step 3)
3. ✅ Restart Cursor
4. ✅ Test by asking AI to search SonarQube issues
5. ✅ Integrate with your development workflow

## 📝 Quick Reference

```bash
# Check installation
ls -lh Rest/mcp/sonarqube/sonarqube-mcp-server.jar

# Verify Java
/opt/homebrew/opt/openjdk@21/bin/java -version

# Configure (if jq installed)
bash Rest/scripts/scripts/configure-sonarqube-mcp.sh

# View logs
tail -f Rest/mcp/sonarqube/storage/logs/mcp.log
```

---

**Status**: ✅ Installation Complete - Configuration Required

