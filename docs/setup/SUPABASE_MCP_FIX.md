# Supabase MCP Configuration Fix

## Current Issue

- MCP was using wrong configuration
- Region was set incorrectly
- Missing proper credentials

## Fixed Configuration

The `.cursor/mcp.json` has been updated with:

- Correct region: `us-east-1` (matching your project)
- Proper Supabase MCP server command
- Environment variables for authentication

## Required Credentials

You need to update these values in `.cursor/mcp.json`:

1. **SUPABASE_DB_PASSWORD**: Your database password
   - Get from: Supabase Dashboard → Settings → Database
   - Look for "Database password"

2. **SUPABASE_ACCESS_TOKEN**: Your personal access token
   - Get from: Supabase Dashboard → Settings → Access Tokens
   - Create a new token if needed

## Steps to Complete Setup

1. **Get Database Password**:
   - Go to Supabase Dashboard
   - Settings → Database
   - Copy the database password

2. **Get Access Token**:
   - Go to Supabase Dashboard
   - Settings → Access Tokens
   - Generate new token or copy existing one

3. **Update .cursor/mcp.json**:
   Replace the placeholder values:

   ```json
   "SUPABASE_DB_PASSWORD": "your-actual-database-password",
   "SUPABASE_ACCESS_TOKEN": "your-actual-access-token"
   ```

4. **Restart Cursor**:
   - Close and reopen Cursor
   - MCP server will restart with new configuration

## Test MCP Connection

After updating credentials, test with:

```bash
# The MCP should now work properly
```

## Alternative: Use Manual Approach

If MCP setup is complex, you can still:

1. Disable RLS manually in Supabase dashboard
2. Run migration scripts directly
3. Re-enable RLS after migration

The MCP is optional - the manual approach works perfectly!
