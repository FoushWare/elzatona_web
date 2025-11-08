#!/bin/bash

# Supabase MCP Wrapper Script
# This script creates a completely clean environment for Supabase MCP

# Create a temporary directory and change to it to avoid .env conflicts
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

# Set the PATH to include pipx binaries
export PATH="/Users/a.fouad/.local/bin:/usr/local/bin:/usr/bin:/bin"

# Load only Supabase environment variables
export SUPABASE_PROJECT_REF="hpnewqkvpnthpohvxcmq"
export SUPABASE_DB_PASSWORD="your-database-password"
export SUPABASE_REGION="eu-central-1"
export SUPABASE_ACCESS_TOKEN="your-access-token"

# Run the Supabase MCP server
exec /Users/a.fouad/.local/bin/supabase-mcp-server "$@"
