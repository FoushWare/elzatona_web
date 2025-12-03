# Sentry MCP Server Setup Guide

## Overview

Sentry provides an MCP (Model Context Protocol) server that enables AI assistants like Cursor to interact with your Sentry projects. This allows you to:
- View and analyze errors from your Sentry projects
- Monitor application performance metrics
- Manage issues and events
- Get insights into your application's health

## Quick Start

### 1. Get Your Sentry MCP Token

1. Go to [Sentry.io](https://sentry.io) and sign in
2. Navigate to **Settings** → **Auth Tokens** (or visit https://sentry.io/settings/auth-tokens/)
3. Click **Create New Token**
4. Give it a name (e.g., "MCP Server Token")
5. Select the following scopes:
   - `org:read` - Read organization data
   - `project:read` - Read project data
   - `event:read` - Read events and issues
6. Click **Create Token**
7. **Copy the token immediately** (you won't be able to see it again)

### 2. Add Token to Environment

Add to your `.env.local` file:

```bash
# Sentry MCP Token (for MCP server authentication)
SENTRY_MCP_TOKEN=your_sentry_mcp_token_here
```

### 3. Configure MCP Server

Run the configuration script:

```bash
npm run configure:sentry-mcp
```

Or manually add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "sentry": {
      "url": "https://mcp.sentry.dev/sse",
      "headers": {
        "Authorization": "Bearer ${SENTRY_MCP_TOKEN}"
      }
    }
  }
}
```

### 4. Restart Cursor

Restart Cursor to load the new MCP configuration.

## Configuration Details

### Remote MCP Server

Sentry provides a hosted MCP server at `https://mcp.sentry.dev/sse`. This is the recommended approach as it:
- Requires no local setup
- Is always up-to-date
- Handles authentication via OAuth/Bearer tokens
- Provides secure access to your Sentry data

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SENTRY_MCP_TOKEN` | Sentry authentication token | ✅ Yes |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for error tracking | Optional (for app integration) |
| `SENTRY_ORG` | Sentry organization slug | Optional |
| `SENTRY_PROJECT` | Sentry project slug | Optional |

## Available MCP Tools

Once configured, the Sentry MCP server provides tools for:

### Issue Management
- View issues and errors
- Get issue details and context
- Search issues by criteria
- Update issue status

### Performance Monitoring
- View performance metrics
- Analyze transaction traces
- Monitor API performance
- Track user experience metrics

### Event Analysis
- Analyze error events
- View event details and stack traces
- Get event context and breadcrumbs
- Filter events by criteria

### Project Management
- List all projects
- Get project details
- View project health
- Monitor project releases

### Release Tracking
- View release information
- Monitor release health
- Track release adoption
- Analyze release performance

## Usage Examples

Once configured, you can interact with Sentry through the MCP interface:

### View Recent Errors
```
"What are the top 10 errors in my Sentry project in the last 24 hours?"
```

### Analyze Performance
```
"Show me performance metrics for the last 7 days"
```

### Get Issue Details
```
"What's the status of issue ABC123? Show me the stack trace and affected users."
```

### Monitor Releases
```
"How is release v1.0.0 performing? Are there any new errors?"
```

### Search Issues
```
"Find all issues related to authentication in the last week"
```

## Troubleshooting

### Connection Issues

**Problem**: MCP server not connecting

**Solutions**:
1. Verify `SENTRY_MCP_TOKEN` is set correctly in `.env.local`
2. Check that the token hasn't expired
3. Ensure token has required scopes (`org:read`, `project:read`, `event:read`)
4. Restart Cursor after configuration changes

### Authentication Errors

**Problem**: "Unauthorized" or "Invalid token" errors

**Solutions**:
1. Regenerate your token in Sentry settings
2. Verify token format (should start with `sntrys_`)
3. Check token permissions match required scopes
4. Ensure token hasn't been revoked

### No Projects Visible

**Problem**: Can't see any projects

**Solutions**:
1. Verify your Sentry account has access to projects
2. Check organization permissions
3. Ensure token has `org:read` scope
4. Try listing projects manually in Sentry dashboard

## Security Best Practices

1. **Never commit tokens**: Keep `SENTRY_MCP_TOKEN` in `.env.local` (already in `.gitignore`)
2. **Use minimum scopes**: Only grant the scopes you need
3. **Rotate tokens regularly**: Regenerate tokens every 90 days
4. **Monitor token usage**: Check Sentry settings for token activity
5. **Revoke unused tokens**: Remove tokens you're no longer using

## Integration with Application Sentry

The Sentry MCP server is separate from your application's Sentry integration:

- **Application Sentry** (`NEXT_PUBLIC_SENTRY_DSN`): Tracks errors in your app
- **Sentry MCP**: Allows AI to query and analyze Sentry data

Both can use the same Sentry account, but serve different purposes:
- Application Sentry → Sends errors to Sentry
- Sentry MCP → Reads data from Sentry

## Resources

- [Sentry MCP Documentation](https://docs.sentry.io/product/sentry-mcp)
- [Sentry Blog: Sentry MCP Server](https://sentry-blog.sentry.dev/yes-sentry-has-an-mcp-server-and-its-pretty-good/)
- [MCP Stack: Sentry](https://www.mcpstack.org/remote-servers/monitoring/sentry)
- [Sentry Auth Tokens](https://sentry.io/settings/auth-tokens/)

## Next Steps

1. ✅ Get your Sentry MCP token
2. ✅ Add it to `.env.local`
3. ✅ Run `npm run configure:sentry-mcp`
4. ✅ Restart Cursor
5. ✅ Start asking questions about your Sentry data!

Example: "What are the most critical errors in my application right now?"

