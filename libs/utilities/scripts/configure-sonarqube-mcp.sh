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
echo "   a) Java (Manual installation - requires JAR file)"
echo "   b) Docker (Container-based - easier setup)"
echo ""
read -p "Select method (a/b): " method

# Read existing mcp.json if it exists
EXISTING_CONFIG="{}"
if [ -f "$MCP_CONFIG_PATH" ]; then
  EXISTING_CONFIG=$(cat "$MCP_CONFIG_PATH" 2>/dev/null || echo "{}")
fi

# Get absolute path for storage directory
STORAGE_DIR="$(pwd)/.cursor/mcp-storage/sonarqube"
mkdir -p "$STORAGE_DIR"

if [ "$method" = "a" ]; then
  # Java method (manual installation)
  echo ""
  echo "☕ Java Installation Method (Manual)"
  echo ""
  echo "The SonarQube MCP server will run using Java."
  echo "This requires JDK 21 or later and the SonarQube MCP Server JAR file."
  echo ""
  
  # Check if Java is installed
  if ! command -v java &> /dev/null; then
    echo "❌ Error: Java is not installed"
    echo "   Install JDK 21+ from: https://adoptium.net/"
    exit 1
  fi
  
  JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
  if [ -z "$JAVA_VERSION" ] || [ "$JAVA_VERSION" -lt 21 ]; then
    echo "⚠️  Warning: Java version $JAVA_VERSION detected"
    echo "   SonarQube MCP Server requires JDK 21 or later"
    echo "   Install JDK 21+ from: https://adoptium.net/"
    echo ""
    read -p "Continue anyway? (yes/no): " continue_anyway
    if [ "$continue_anyway" != "yes" ]; then
      exit 0
    fi
  else
    echo "✅ Java $JAVA_VERSION is installed"
  fi
  
  echo ""
  echo "📦 JAR File Setup:"
  echo "   You need to build or download the SonarQube MCP Server JAR file."
  echo ""
  echo "   Option 1: Build from source (requires JDK 21+ and Gradle):"
  echo "   👉 git clone https://github.com/SonarSource/sonarqube-mcp-server.git"
  echo "   👉 cd sonarqube-mcp-server"
  echo "   👉 ./gradlew clean build -x test"
  echo "   👉 JAR will be in: build/libs/"
  echo ""
  echo "   Option 2: Download from releases:"
  echo "   👉 https://github.com/SonarSource/sonarqube-mcp-server/releases"
  echo ""
  
  read -p "Enter the absolute path to the SonarQube MCP Server JAR file: " JAR_PATH
  
  if [ -z "$JAR_PATH" ]; then
    echo "❌ Error: JAR path cannot be empty"
    exit 1
  fi
  
  if [ ! -f "$JAR_PATH" ]; then
    echo "❌ Error: JAR file not found at: $JAR_PATH"
    exit 1
  fi
  
  echo "✅ JAR file found: $JAR_PATH"
  echo ""
  
  # Create MCP configuration with Java command
  cat > "$MCP_CONFIG_PATH" << EOF
{
  "mcpServers": {
    "sonarqube": {
      "command": "java",
      "args": [
        "-jar",
        "${JAR_PATH}"
      ],
      "env": {
        "STORAGE_PATH": "${STORAGE_DIR}",
        "SONARQUBE_TOKEN": "${SONAR_TOKEN}",
        "SONARQUBE_ORG": "${ORGANIZATION}"
      }
    }
  }
}
EOF

  echo "✅ Created MCP configuration with Java setup"
  echo ""
  echo "📝 Configuration saved to: $MCP_CONFIG_PATH"
  echo "📁 Storage directory: $STORAGE_DIR"
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

