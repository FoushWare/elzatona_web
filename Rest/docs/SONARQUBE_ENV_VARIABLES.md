# SonarQube MCP Environment Variables

## 📋 Required Environment Variables

For the SonarQube MCP server to work, you need these environment variables:

### 1. **SONARQUBE_TOKEN** (Required)
- **Description**: Your SonarCloud personal access token
- **How to get**: 
  - Go to https://sonarcloud.io/ → My Account → Security
  - Click "Generate Tokens" → Generate
  - Copy the token immediately
- **Example**: `squ_1234567890abcdefghijklmnopqrstuvwxyz`
- **Format**: Long alphanumeric string

### 2. **SONARQUBE_ORG** (Required for SonarCloud)
- **Description**: Your SonarCloud organization key
- **Your value**: `FoushWare` (already configured)
- **How to find**: 
  - Visible in your project URL: `https://sonarcloud.io/project/configuration?id=FoushWare_GreatFrontendHub`
  - Or in SonarCloud → Your Organization → Settings
- **Format**: Organization name (case-sensitive)

### 3. **STORAGE_PATH** (Optional - Auto-configured)
- **Description**: Path where MCP server stores data
- **Current value**: `Rest/mcp/sonarqube/storage`
- **Note**: Already configured in `.cursor/mcp.json`

## 🔧 Where to Set Environment Variables

### Option 1: `.env.local` File (Recommended)

Add to `/Users/a.fouad/SideProjects/Elzatona-all/Elzatona-web/.env.local`:

```bash
# SonarQube MCP Configuration
SONARQUBE_TOKEN=your_actual_token_here
SONARQUBE_ORG=FoushWare
```

**Note**: Cursor may not automatically read `.env.local` for MCP servers. You may need to set these in your shell environment or directly in `mcp.json`.

### Option 2: Direct in `.cursor/mcp.json`

Update `.cursor/mcp.json` with actual values:

```json
{
  "mcpServers": {
    "sonarqube": {
      "env": {
        "STORAGE_PATH": "Rest/mcp/sonarqube/storage",
        "SONARQUBE_TOKEN": "your_actual_token_here",
        "SONARQUBE_ORG": "FoushWare"
      }
    }
  }
}
```

### Option 3: Shell Environment Variables

Export in your shell (`.zshrc` or `.bash_profile`):

```bash
export SONARQUBE_TOKEN=your_actual_token_here
export SONARQUBE_ORG=FoushWare
```

Then restart Cursor.

## 📝 Complete Example

### `.env.local` File:
```bash
# SonarQube MCP Configuration
SONARQUBE_TOKEN=squ_1234567890abcdefghijklmnopqrstuvwxyz
SONARQUBE_ORG=FoushWare
```

### `.cursor/mcp.json` (Current):
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
        "SONARQUBE_ORG": "FoushWare"
      }
    }
  }
}
```

## ✅ Current Status

| Variable | Status | Value |
|----------|--------|-------|
| `STORAGE_PATH` | ✅ Configured | `Rest/mcp/sonarqube/storage` |
| `SONARQUBE_ORG` | ✅ Configured | `FoushWare` |
| `SONARQUBE_TOKEN` | ⏳ **NEEDED** | Generate from SonarCloud |

## 🎯 What You Need to Do

1. **Generate Token**:
   - Go to https://sonarcloud.io/
   - My Account → Security → Generate Tokens
   - Copy the token

2. **Add to `.env.local`**:
   ```bash
   SONARQUBE_TOKEN=your_token_here
   SONARQUBE_ORG=FoushWare
   ```

3. **OR Update `.cursor/mcp.json`**:
   Replace `${SONARQUBE_TOKEN}` with your actual token

4. **Restart Cursor**

## 🔍 Verification

After setting variables, verify:

```bash
# Check if variables are set (if using shell)
echo $SONARQUBE_TOKEN
echo $SONARQUBE_ORG

# Check MCP config
cat .cursor/mcp.json | jq '.mcpServers.sonarqube.env'
```

## ⚠️ Important Notes

- **Token Security**: Never commit tokens to Git
- **Token Expiration**: Tokens don't expire, but you can revoke them
- **Organization Key**: Must be exact match (case-sensitive)
- **Environment Variables**: Cursor MCP may not read `.env.local` automatically - you may need to set them in shell or directly in `mcp.json`

---

**Summary**: You only need to provide `SONARQUBE_TOKEN`. Everything else is already configured!

