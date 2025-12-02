#!/bin/bash
# Configure SonarQube MCP Server for Cursor
# v1.0 - Adds SonarQube MCP configuration to .cursor/mcp.json

set -e

PROJECT_ROOT="/Users/a.fouad/SideProjects/Elzatona-all/Elzatona-web"
MCP_CONFIG="$PROJECT_ROOT/.cursor/mcp.json"
MCP_CONFIG_BACKUP="$PROJECT_ROOT/.cursor/mcp.json.backup"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🔧 Configuring SonarQube MCP Server for Cursor"
echo "════════════════════════════════════════════════════════════════"
echo ""

cd "$PROJECT_ROOT"

# Check if MCP config exists
if [ -f "$MCP_CONFIG" ]; then
  echo "📋 Found existing MCP configuration"
  echo "   Creating backup: $MCP_CONFIG_BACKUP"
  cp "$MCP_CONFIG" "$MCP_CONFIG_BACKUP"
  
  # Check if sonarqube is already configured
  if grep -q '"sonarqube"' "$MCP_CONFIG"; then
    echo "   ⚠️  SonarQube MCP server already configured"
    echo "   💡 To update, manually edit: $MCP_CONFIG"
    echo ""
    exit 0
  fi
else
  echo "📋 Creating new MCP configuration"
  mkdir -p "$PROJECT_ROOT/.cursor"
fi

# Create or update MCP config
echo "📝 Adding SonarQube MCP server configuration..."
echo ""

# If config exists, we need to merge (this is a simple approach)
if [ -f "$MCP_CONFIG" ]; then
  # Use jq if available, otherwise provide manual instructions
  if command -v jq &> /dev/null; then
    echo "   Using jq to merge configuration..."
    jq '.mcpServers.sonarqube = {
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
    }' "$MCP_CONFIG" > "$MCP_CONFIG.tmp" && mv "$MCP_CONFIG.tmp" "$MCP_CONFIG"
    echo "   ✅ Configuration merged successfully"
  else
    echo "   ⚠️  jq not found - manual merge required"
    echo ""
    echo "   Please add the following to your .cursor/mcp.json:"
    echo ""
    cat << 'EOF'
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
EOF
    echo ""
    echo "   Add it inside the 'mcpServers' object"
    exit 1
  fi
else
  # Create new config
  cat > "$MCP_CONFIG" << 'EOF'
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
EOF
  echo "   ✅ New MCP configuration created"
fi

echo ""
echo "📝 Next steps:"
echo ""
echo "   1. Add to your .env.local file:"
echo "      SONARQUBE_TOKEN=your_sonarcloud_token"
echo "      SONARQUBE_ORG=your_organization_key"
echo ""
echo "   2. Get your token from: https://sonarcloud.io/ → My Account → Security"
echo ""
echo "   3. Restart Cursor to load the MCP server"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ SonarQube MCP Server Configuration Complete!"
echo "════════════════════════════════════════════════════════════════"
echo ""

