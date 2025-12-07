# Sentry MCP Server Setup

This directory contains configuration for the Sentry MCP (Model Context Protocol) server integration with Cursor and other AI assistants.

## Overview

Sentry provides an MCP server that enables AI agents to interact with Sentry's monitoring and error-tracking capabilities. This allows you to:

- View and analyze errors from your Sentry projects
- Monitor application performance
- Manage issues and events
- Get insights into your application's health

## Configuration

### Remote MCP Server (Recommended)

Sentry provides a hosted MCP server at `https://mcp.sentry.dev/sse`. This uses OAuth authentication.

Add to `.cursor/mcp.json`:

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

### Alternative: Self-Hosted MCP Server

If you prefer to run your own MCP server, you can use the Sentry SDK to create a custom MCP server.

## Authentication

### Getting Your Sentry MCP Token

1. Go to [Sentry.io](https://sentry.io) and sign in
2. Navigate to **Settings** → **Auth Tokens**
3. Create a new token with the following scopes:
   - `org:read` - Read organization data
   - `project:read` - Read project data
   - `event:read` - Read events and issues
4. Copy the token

### Environment Variables

Add to `.env.local`:

```bash
# Sentry MCP Token (for MCP server authentication)
SENTRY_MCP_TOKEN=your_sentry_mcp_token_here

# Sentry DSN (for application error tracking - already configured)
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/your-project-id
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-slug
```

## Features

Once configured, the Sentry MCP server provides tools for:

- **Viewing Issues**: Get details about errors and issues in your projects
- **Performance Monitoring**: Access performance metrics and traces
- **Event Analysis**: Analyze error events and their context
- **Project Management**: List and manage Sentry projects
- **Release Tracking**: Monitor releases and their health
- **User Feedback**: Access user feedback and comments

## Usage

After configuration, you can interact with Sentry through the MCP interface:

- Ask about recent errors: "What are the top errors in my Sentry project?"
- Analyze performance: "Show me performance metrics for the last 24 hours"
- Get issue details: "What's the status of issue XYZ?"
- Monitor releases: "How is release v1.0.0 performing?"

## Documentation

- [Sentry MCP Server Documentation](https://docs.sentry.io/product/sentry-mcp)
- [Sentry Blog: Sentry MCP Server](https://sentry-blog.sentry.dev/yes-sentry-has-an-mcp-server-and-its-pretty-good/)
- [MCP Stack: Sentry](https://www.mcpstack.org/remote-servers/monitoring/sentry)

## Troubleshooting

### Connection Issues

1. Verify your `SENTRY_MCP_TOKEN` is correct
2. Check that the token has the required scopes
3. Ensure your Sentry account has access to the projects you want to monitor

### Authentication Errors

- Regenerate your token if it's expired
- Verify token permissions in Sentry settings
- Check that the token format is correct (should start with `sntrys_`)

## Security Notes

- Never commit your `SENTRY_MCP_TOKEN` to version control
- Store tokens in `.env.local` (already in `.gitignore`)
- Rotate tokens regularly for security
- Use the minimum required scopes for your use case
