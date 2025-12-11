#!/bin/bash
# Configure SonarQube MCP Server for Cursor IDE
# This script helps set up the SonarQube Model Context Protocol (MCP) server
# Repository: https://github.com/FoushWare/elzatona_web

set -e

PROJECT_KEY="FoushWare_GreatFrontendHub"
ORGANIZATION="foushware"
MCP_CONFIG_PATH=".cursor/mcp.json"

echo "🔧 SonarQube MCP Server Configuration"
echo "======================================"
echo ""
echo "This script will help you configure the SonarQube MCP server for Cursor IDE."
echo "The MCP server enables real-time code analysis and quality feedback in Cursor."
echo ""

# Check if .cursor directory exists
if [ ! -d ".cursor" ]; then
  echo "📁 Creating .cursor directory..."
  mkdir -p .cursor
fi

# Check if mcp.json already exists
if [ -f "$MCP_CONFIG_PATH" ]; then
  echo "⚠️  Warning: $MCP_CONFIG_PATH already exists!"
  read -p "Do you want to backup the existing file and create a new one? (yes/no): " backup
  if [ "$backup" = "yes" ]; then
    BACKUP_FILE="${MCP_CONFIG_PATH}.backup.$(date +%Y%m%d_%H%M%S)"
    cp "$MCP_CONFIG_PATH" "$BACKUP_FILE"
    echo "✅ Backup created: $BACKUP_FILE"
  else
    echo "ℹ️  Keeping existing configuration. You can manually add SonarQube MCP server."
    exit 0
  fi
fi

echo ""
echo "📋 Configuration Steps:"
echo ""
echo "1️⃣  Get your SonarQube token:"
echo "   👉 https://sonarcloud.io/account/security"
echo "   - Click 'Generate Token'"
echo "   - Give it a name (e.g., 'Cursor MCP')"
echo "   - Copy the token (you'll need it in the next step)"
echo ""

read -p "Do you have your SonarQube token ready? (yes/no): " ready
if [ "$ready" != "yes" ]; then
  echo ""
  echo "ℹ️  Please get your token first, then run this script again."
  echo "   Token URL: https://sonarcloud.io/account/security"
  exit 0
fi

echo ""
read -p "Enter your SonarQube token: " SONAR_TOKEN

if [ -z "$SONAR_TOKEN" ]; then
  echo "❌ Error: Token cannot be empty"
  exit 1
fi

echo ""
echo "2️⃣  Choose installation method:"
echo "   a) Docker (Recommended - easier setup)"
echo "   b) NPM (Local installation)"
echo ""
read -p "Select method (a/b): " method

# Read existing mcp.json if it exists
EXISTING_CONFIG="{}"
if [ -f "$MCP_CONFIG_PATH" ]; then
  EXISTING_CONFIG=$(cat "$MCP_CONFIG_PATH" 2>/dev/null || echo "{}")
fi

if [ "$method" = "a" ]; then
  # Docker method
  echo ""
  echo "🐳 Docker Installation Method"
  echo ""
  echo "The SonarQube MCP server will run in a Docker container."
  echo ""
  
  # Check if Docker is installed
  if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed"
    echo "   Install Docker from: https://www.docker.com/get-started"
    exit 1
  fi
  
  echo "✅ Docker is installed"
  echo ""
  
  # Create MCP configuration with Docker command
  cat > "$MCP_CONFIG_PATH" << EOF
{
  "mcpServers": {
    "sonarqube": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "SONARQUBE_TOKEN=${SONAR_TOKEN}",
        "-e",
        "SONARQUBE_ORG=${ORGANIZATION}",
        "mcp/sonarqube"
      ]
    }
  }
}
EOF

  echo "✅ Created MCP configuration with Docker setup"
  echo ""
  echo "📝 Configuration saved to: $MCP_CONFIG_PATH"
  echo ""
  echo "3️⃣  Next Steps:"
  echo "   - Restart Cursor IDE to load the MCP server"
  echo "   - The SonarQube MCP server will start automatically when Cursor starts"
  echo "   - You can analyze code by asking: 'Analyze this code with SonarQube'"
  echo ""
  echo "🔍 To test the connection:"
  echo "   - Open Cursor"
  echo "   - Check the MCP server status in the Cursor settings"
  echo "   - Try analyzing a code file with SonarQube"
  
elif [ "$method" = "b" ]; then
  # NPM method
  echo ""
  echo "📦 NPM Installation Method"
  echo ""
  echo "The SonarQube MCP server will be installed locally via NPM."
  echo ""
  
  # Check if npm is installed
  if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    echo "   Install Node.js from: https://nodejs.org/"
    exit 1
  fi
  
  echo "✅ npm is installed"
  echo ""
  echo "📦 Installing SonarQube MCP server package..."
  
  # Install the MCP server package (if it exists)
  if npm list -g @modelcontextprotocol/server-sonarqube &> /dev/null; then
    echo "✅ SonarQube MCP server package already installed"
  else
    echo "⚠️  Note: The official SonarQube MCP server package may need to be installed manually"
    echo "   Check: https://github.com/modelcontextprotocol/servers for available packages"
    echo ""
    read -p "Continue with configuration anyway? (yes/no): " continue_setup
    if [ "$continue_setup" != "yes" ]; then
      exit 0
    fi
  fi
  
  # Create MCP configuration with NPM command
  # Note: Adjust the command based on the actual package name when available
  cat > "$MCP_CONFIG_PATH" << EOF
{
  "mcpServers": {
    "sonarqube": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sonarqube"
      ],
      "env": {
        "SONARQUBE_TOKEN": "${SONAR_TOKEN}",
        "SONARQUBE_ORG": "${ORGANIZATION}",
        "SONARQUBE_PROJECT_KEY": "${PROJECT_KEY}"
      }
    }
  }
}
EOF

  echo "✅ Created MCP configuration with NPM setup"
  echo ""
  echo "📝 Configuration saved to: $MCP_CONFIG_PATH"
  echo ""
  echo "3️⃣  Next Steps:"
  echo "   - Install the MCP server package (if not already installed)"
  echo "   - Restart Cursor IDE to load the MCP server"
  echo "   - The SonarQube MCP server will start automatically when Cursor starts"
  echo ""
  echo "🔍 To test the connection:"
  echo "   - Open Cursor"
  echo "   - Check the MCP server status in the Cursor settings"
  echo "   - Try analyzing a code file with SonarQube"
  
else
  echo "❌ Invalid selection"
  exit 1
fi

echo ""
echo "✅ SonarQube MCP configuration complete!"
echo ""
echo "📚 Documentation:"
echo "   - SonarQube MCP Server: https://docs.sonarsource.com/sonarqube-mcp-server"
echo "   - Cursor MCP Setup: https://docs.cursor.com/mcp"
echo ""
echo "⚠️  Security Note:"
echo "   - $MCP_CONFIG_PATH contains your SonarQube token"
echo "   - This file is in .gitignore and should NOT be committed"
echo "   - Keep your token secure and rotate it if exposed"
echo ""
