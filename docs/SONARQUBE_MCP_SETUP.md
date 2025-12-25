# SonarQube MCP Setup Guide

## Overview

This project uses the `oe-sonar-mcp` npm package to integrate SonarQube/SonarCloud with Cursor's Model Context Protocol (MCP).

## Installation

The package is already installed as a dev dependency:

```bash
npm install --save-dev oe-sonar-mcp
```

## Configuration

### 1. Get Your SonarCloud Token

1. Go to https://sonarcloud.io/
2. Log in with GitHub
3. Navigate to **My Account** > **Security**
4. Generate a new token
5. Copy the token

### 2. Configure MCP Server

Create or update `.cursor/mcp.json` with the following configuration:

```json
{
  "mcpServers": {
    "sonarqube": {
      "command": "npx",
      "args": ["-y", "oe-sonar-mcp"],
      "env": {
        "SONAR_TOKEN": "YOUR_SONAR_TOKEN_HERE",
        "SONAR_ORG": "foushware",
        "SONAR_PROJECT_KEY": "FoushWare_GreatFrontendHub",
        "SONAR_HOST_URL": "https://sonarcloud.io"
      }
    }
  }
}
```

### 3. Replace Placeholders

- Replace `YOUR_SONAR_TOKEN_HERE` with your actual SonarCloud token
- Verify `SONAR_ORG` matches your organization (`foushware`)
- Verify `SONAR_PROJECT_KEY` matches your project key (`FoushWare_GreatFrontendHub`)

### 4. Restart Cursor

After updating the MCP configuration, restart Cursor IDE to load the new MCP server.

## Usage

Once configured, you can use SonarQube MCP tools to:

- Query SonarQube issues
- Get project metrics
- Analyze code quality
- View security hotspots

The MCP server will automatically connect to SonarCloud using the configured credentials.

## Troubleshooting

### MCP Server Not Found

If the MCP server is not available:

1. Verify the package is installed: `npm list oe-sonar-mcp`
2. Check the MCP configuration in `.cursor/mcp.json`
3. Verify environment variables are set correctly
4. Restart Cursor IDE

### Authentication Errors

If you see authentication errors:

1. Verify your `SONAR_TOKEN` is correct
2. Check that the token has the necessary permissions
3. Ensure `SONAR_ORG` matches your organization
4. Verify `SONAR_PROJECT_KEY` is correct

### Connection Issues

If you can't connect to SonarCloud:

1. Check your internet connection
2. Verify `SONAR_HOST_URL` is correct (`https://sonarcloud.io`)
3. Check if SonarCloud is accessible from your network

## Security Notes

- `.cursor/mcp.json` is in `.gitignore` and should never be committed
- Keep your SonarCloud token secure
- Rotate tokens regularly
- Use read-only tokens when possible

