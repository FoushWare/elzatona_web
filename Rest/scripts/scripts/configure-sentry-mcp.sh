#!/usr/bin/env bash

# Configure Sentry MCP Server in Cursor
# v1.0 - Sets up Sentry MCP server integration

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🔧 Sentry MCP Server Configuration${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo ""

# Check if .cursor/mcp.json exists
MCP_CONFIG=".cursor/mcp.json"
if [ ! -f "$MCP_CONFIG" ]; then
    echo -e "${YELLOW}⚠️  .cursor/mcp.json not found. Creating it...${NC}"
    mkdir -p .cursor
    echo '{"mcpServers": {}}' > "$MCP_CONFIG"
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${RED}❌ jq is not installed${NC}"
    echo ""
    echo "Install it with:"
    echo "  brew install jq"
    echo ""
    exit 1
fi

# Check if SENTRY_MCP_TOKEN is set
if [ -z "$SENTRY_MCP_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  SENTRY_MCP_TOKEN not found in environment${NC}"
    echo ""
    echo "Please set it in your .env.local file:"
    echo "  SENTRY_MCP_TOKEN=your_sentry_mcp_token_here"
    echo ""
    echo "To get your token:"
    echo "  1. Go to https://sentry.io/settings/auth-tokens/"
    echo "  2. Create a new token with scopes: org:read, project:read, event:read"
    echo "  3. Copy the token and add it to .env.local"
    echo ""
    read -p "Do you want to continue without the token? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

# Read current MCP config
CURRENT_CONFIG=$(cat "$MCP_CONFIG")

# Check if sentry is already configured
if echo "$CURRENT_CONFIG" | jq -e '.mcpServers.sentry' > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Sentry MCP server is already configured${NC}"
    echo ""
    read -p "Do you want to update it? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Configuration unchanged."
        exit 0
    fi
fi

# Add Sentry MCP server configuration
echo -e "${BLUE}📝 Adding Sentry MCP server configuration...${NC}"

# Use jq to add/update the sentry configuration
if [ -n "$SENTRY_MCP_TOKEN" ]; then
    UPDATED_CONFIG=$(echo "$CURRENT_CONFIG" | jq --arg token "$SENTRY_MCP_TOKEN" '
        .mcpServers.sentry = {
            "url": "https://mcp.sentry.dev/sse",
            "headers": {
                "Authorization": "Bearer \($token)"
            }
        }
    ')
else
    UPDATED_CONFIG=$(echo "$CURRENT_CONFIG" | jq '
        .mcpServers.sentry = {
            "url": "https://mcp.sentry.dev/sse",
            "headers": {
                "Authorization": "Bearer ${SENTRY_MCP_TOKEN}"
            }
        }
    ')
fi

# Write updated config
echo "$UPDATED_CONFIG" > "$MCP_CONFIG"

echo -e "${GREEN}✅ Sentry MCP server configuration added!${NC}"
echo ""
echo "Configuration:"
echo "  URL: https://mcp.sentry.dev/sse"
echo "  Authentication: Bearer token"
echo ""
echo -e "${YELLOW}⚠️  Next steps:${NC}"
echo "  1. Add SENTRY_MCP_TOKEN to your .env.local file"
echo "  2. Restart Cursor to load the new MCP configuration"
echo "  3. The Sentry MCP server will be available for AI interactions"
echo ""
echo "See Rest/mcp/sentry/README.md for more details."

