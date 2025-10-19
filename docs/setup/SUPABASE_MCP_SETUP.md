# Supabase MCP Setup Guide

## ✅ Installation Complete!

The Supabase MCP server has been successfully installed and configured.

## 1. Install Supabase MCP Server

```bash
pipx install supabase-mcp-server
```

## 2. Configure Environment Variables

The `supabase-mcp.env` file has been created. Update it with your actual Supabase credentials:

```bash
# Supabase MCP Environment Variables
SUPABASE_PROJECT_REF=your-20-character-project-ref
SUPABASE_DB_PASSWORD=your-database-password
SUPABASE_REGION=us-east-1
SUPABASE_ACCESS_TOKEN=your-access-token
```

## 3. Get Supabase Credentials

### Project Reference

- Go to your Supabase project dashboard
- The project reference is in the URL: `https://supabase.com/dashboard/project/<project-ref>`
- Must be exactly 20 characters long

### Database Password

- Go to Settings > Database
- Copy the database password

### Access Token

- Go to Settings > API
- Generate a new access token if needed

### Anon Key

- Go to Settings > API
- Copy the anon/public key

## 4. MCP Configuration

The Supabase MCP server has been added to your `.cursor/mcp.json` file with a clean environment setup:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "bash",
      "args": [
        "-c",
        "env -i $(cat supabase-mcp.env | xargs) supabase-mcp-server"
      ],
      "env": {}
    }
  }
}
```

## 5. Test the Setup

Run the test script to verify everything is configured correctly:

```bash
./test-supabase-mcp.sh
```

## 6. Restart Cursor

After updating the `supabase-mcp.env` file with your credentials:

1. Restart Cursor completely
2. The Supabase MCP server will be available in your AI tools

## 7. Available MCP Tools

Once configured, you'll have access to these Supabase MCP tools:

- Database queries and operations
- Table management
- Data migration tools
- Schema operations
- Real-time subscriptions
- Row-level security (RLS) management

## 8. Migration from Firebase

The Supabase MCP will help with:

- Data migration scripts
- Schema conversion
- API endpoint updates
- Authentication migration
- Real-time features migration

## 9. Troubleshooting

### Environment Conflicts

The setup uses a clean environment (`env -i`) to avoid conflicts with your existing Firebase environment variables.

### Project Reference Format

- Must be exactly 20 characters long
- Found in your Supabase dashboard URL
- Example: `abcdefghijklmnopqrst`

### Database Password

- Required for remote Supabase projects
- Found in Settings > Database
- Different from your account password

## 10. Next Steps

1. **Create a Supabase project** if you haven't already
2. **Update `supabase-mcp.env`** with your actual credentials
3. **Restart Cursor** to load the MCP configuration
4. **Test the connection** using the Supabase MCP tools
5. **Begin migration planning** from Firebase to Supabase
