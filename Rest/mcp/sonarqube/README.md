# SonarQube MCP Server Setup

This directory contains the SonarQube MCP (Model Context Protocol) server for integration with Cursor and other AI assistants.

## Installation

The SonarQube MCP server JAR file is located here: `sonarqube-mcp-server.jar`

## Configuration

### For SonarCloud (Recommended)

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "sonarqube": {
      "command": "java",
      "args": ["-jar", "Rest/mcp/sonarqube/sonarqube-mcp-server.jar"],
      "env": {
        "STORAGE_PATH": "Rest/mcp/sonarqube/storage",
        "SONARQUBE_TOKEN": "your_sonarcloud_token",
        "SONARQUBE_ORG": "your_organization_key"
      }
    }
  }
}
```

### For SonarQube Server

```json
{
  "mcpServers": {
    "sonarqube": {
      "command": "java",
      "args": ["-jar", "Rest/mcp/sonarqube/sonarqube-mcp-server.jar"],
      "env": {
        "STORAGE_PATH": "Rest/mcp/sonarqube/storage",
        "SONARQUBE_TOKEN": "your_sonar_token",
        "SONARQUBE_URL": "https://your-sonarqube-server.com"
      }
    }
  }
}
```

## Requirements

- **JDK 21 or later** (current: Java 17 - needs upgrade)
- SonarQube Server 2025.1+ or SonarCloud account
- Authentication token

## Getting Your Token

### SonarCloud

1. Go to https://sonarcloud.io/
2. My Account → Security
3. Generate a new token
4. Copy your organization key

### SonarQube Server

1. Go to your SonarQube instance
2. My Account → Security
3. Generate a new token

## Environment Variables

Add to `.env.local`:

```bash
SONARQUBE_TOKEN=your_token_here
SONARQUBE_ORG=your_org_key  # For SonarCloud
# OR
SONARQUBE_URL=https://your-server.com  # For SonarQube Server
```

## Usage

Once configured, the MCP server provides tools for:

- Searching issues
- Getting quality gate status
- Retrieving measures and metrics
- Managing projects
- And more!

See the [official documentation](https://github.com/SonarSource/sonarqube-mcp-server) for full details.
