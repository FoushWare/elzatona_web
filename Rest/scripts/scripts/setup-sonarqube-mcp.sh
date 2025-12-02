#!/bin/bash
# Setup script for SonarQube MCP Server
# v1.0 - Automated installation and configuration

set -e

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🔧 SonarQube MCP Server Setup"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Check Java version
echo "📋 STEP 1: Checking Java version..."
JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
echo "   Found Java version: $JAVA_VERSION"

if [ "$JAVA_VERSION" -lt 21 ]; then
  echo "   ⚠️  Warning: SonarQube MCP requires JDK 21+, found JDK $JAVA_VERSION"
  echo "   💡 You may need to upgrade Java or use Docker instead"
  echo ""
  read -p "   Continue anyway? (y/n) " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "   ❌ Setup cancelled"
    exit 1
  fi
else
  echo "   ✅ Java version is compatible"
fi
echo ""

# Create directories
echo "📁 STEP 2: Creating directories..."
mkdir -p Rest/mcp/sonarqube/storage
echo "   ✅ Directories created"
echo ""

# Download JAR file
echo "📥 STEP 3: Downloading SonarQube MCP Server..."
JAR_PATH="Rest/mcp/sonarqube/sonarqube-mcp-server.jar"
LATEST_VERSION="1.3.0.1623"
DOWNLOAD_URL="https://github.com/SonarSource/sonarqube-mcp-server/releases/download/${LATEST_VERSION}/sonarqube-mcp-server-${LATEST_VERSION}.jar"

if [ -f "$JAR_PATH" ]; then
  echo "   ℹ️  JAR file already exists, skipping download"
else
  echo "   ⏳ Downloading from GitHub..."
  curl -L -o "$JAR_PATH" "$DOWNLOAD_URL" || {
    echo "   ❌ Download failed"
    echo "   💡 Please download manually from:"
    echo "   $DOWNLOAD_URL"
    exit 1
  }
  echo "   ✅ JAR file downloaded"
fi
echo ""

# Check file
if [ -f "$JAR_PATH" ]; then
  FILE_SIZE=$(ls -lh "$JAR_PATH" | awk '{print $5}')
  echo "   📦 JAR file size: $FILE_SIZE"
else
  echo "   ❌ JAR file not found!"
  exit 1
fi
echo ""

# Configuration instructions
echo "📝 STEP 4: Configuration Instructions"
echo ""
echo "   To complete setup, add to .cursor/mcp.json:"
echo ""
echo "   {"
echo "     \"mcpServers\": {"
echo "       \"sonarqube\": {"
echo "         \"command\": \"java\","
echo "         \"args\": ["
echo "           \"-jar\","
echo "           \"Rest/mcp/sonarqube/sonarqube-mcp-server.jar\""
echo "         ],"
echo "         \"env\": {"
echo "           \"STORAGE_PATH\": \"Rest/mcp/sonarqube/storage\","
echo "           \"SONARQUBE_TOKEN\": \"your_token_here\","
echo "           \"SONARQUBE_ORG\": \"your_org_key\""
echo "         }"
echo "       }"
echo "     }"
echo "   }"
echo ""
echo "   Then add to .env.local:"
echo "   SONARQUBE_TOKEN=your_token_here"
echo "   SONARQUBE_ORG=your_org_key"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ SonarQube MCP Server Setup Complete!"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "📚 Next steps:"
echo "   1. Get your SonarCloud token: https://sonarcloud.io/ → My Account → Security"
echo "   2. Get your organization key from SonarCloud"
echo "   3. Add configuration to .cursor/mcp.json (see above)"
echo "   4. Add environment variables to .env.local"
echo "   5. Restart Cursor to load the MCP server"
echo ""

