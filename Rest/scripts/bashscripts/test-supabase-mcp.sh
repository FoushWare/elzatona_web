#!/bin/bash

# Supabase MCP Test Script
echo "🧪 Testing Supabase MCP Setup..."

# Check if supabase-mcp-server is installed
if command -v supabase-mcp-server &> /dev/null; then
    echo "✅ Supabase MCP server is installed"
else
    echo "❌ Supabase MCP server is not installed"
    echo "Run: pipx install supabase-mcp-server"
    exit 1
fi

# Check if environment file exists
if [ -f "supabase-mcp.env" ]; then
    echo "✅ Supabase environment file exists"
else
    echo "❌ Supabase environment file not found"
    echo "Create supabase-mcp.env with your Supabase credentials"
    exit 1
fi

# Check if .cursor/mcp.json is configured
if grep -q "supabase" .cursor/mcp.json; then
    echo "✅ Supabase MCP is configured in .cursor/mcp.json"
else
    echo "❌ Supabase MCP not configured in .cursor/mcp.json"
    exit 1
fi

echo ""
echo "🎉 Supabase MCP setup looks good!"
echo ""
echo "Next steps:"
echo "1. Update supabase-mcp.env with your actual Supabase credentials"
echo "2. Restart Cursor to load the new MCP configuration"
echo "3. Test the Supabase MCP tools in Cursor"
echo ""
echo "To get your Supabase credentials:"
echo "- Project Ref: Found in your Supabase dashboard URL"
echo "- DB Password: Settings > Database"
echo "- Access Token: Settings > API"
