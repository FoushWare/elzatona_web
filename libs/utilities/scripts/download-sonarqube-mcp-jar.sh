#!/bin/bash
# Download SonarQube MCP Server JAR file
# This script downloads the latest release JAR from GitHub

set -e

REPO="SonarSource/sonarqube-mcp-server"
DOWNLOAD_DIR=".cursor/mcp-storage/sonarqube"
JAR_NAME="sonarqube-mcp-server.jar"

echo "📦 Downloading SonarQube MCP Server JAR"
echo "========================================"
echo ""

# Create download directory
mkdir -p "$DOWNLOAD_DIR"

# Check if JAR already exists
if [ -f "$DOWNLOAD_DIR/$JAR_NAME" ]; then
  echo "⚠️  JAR file already exists: $DOWNLOAD_DIR/$JAR_NAME"
  read -p "Do you want to download the latest version? (yes/no): " overwrite
  if [ "$overwrite" != "yes" ]; then
    echo "✅ Using existing JAR file"
    echo "   Path: $(pwd)/$DOWNLOAD_DIR/$JAR_NAME"
    exit 0
  fi
fi

echo "🔍 Fetching latest release information..."
LATEST_RELEASE=$(curl -s "https://api.github.com/repos/$REPO/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')

if [ -z "$LATEST_RELEASE" ]; then
  echo "❌ Error: Could not fetch latest release information"
  echo "   Please check your internet connection and try again"
  exit 1
fi

echo "✅ Latest release: $LATEST_RELEASE"
echo ""

# Find the JAR asset URL
echo "🔍 Finding JAR file in release assets..."
JAR_URL=$(curl -s "https://api.github.com/repos/$REPO/releases/latest" | grep '"browser_download_url".*\.jar"' | head -1 | sed -E 's/.*"([^"]+)".*/\1/')

if [ -z "$JAR_URL" ]; then
  echo "⚠️  No pre-built JAR found in releases"
  echo ""
  echo "📚 Building from source is required:"
  echo "   1. git clone https://github.com/$REPO.git"
  echo "   2. cd sonarqube-mcp-server"
  echo "   3. ./gradlew clean build -x test"
  echo "   4. Copy build/libs/*.jar to $DOWNLOAD_DIR/$JAR_NAME"
  echo ""
  echo "   Repository: https://github.com/$REPO"
  echo "   Requires: JDK 21+ and Gradle"
  exit 1
fi

echo "✅ Found JAR: $JAR_URL"
echo ""
echo "📥 Downloading JAR file..."
curl -L -o "$DOWNLOAD_DIR/$JAR_NAME" "$JAR_URL"

if [ -f "$DOWNLOAD_DIR/$JAR_NAME" ]; then
  JAR_SIZE=$(du -h "$DOWNLOAD_DIR/$JAR_NAME" | cut -f1)
  echo "✅ Download complete!"
  echo "   File: $(pwd)/$DOWNLOAD_DIR/$JAR_NAME"
  echo "   Size: $JAR_SIZE"
  echo ""
  echo "📝 Next step: Update .cursor/mcp.json with the JAR path:"
  echo "   $(pwd)/$DOWNLOAD_DIR/$JAR_NAME"
else
  echo "❌ Error: Download failed"
  exit 1
fi
