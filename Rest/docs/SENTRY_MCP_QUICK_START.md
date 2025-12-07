# Sentry MCP Quick Start

## 🚀 3-Step Setup

### Step 1: Get Your Sentry Token

1. Go to https://sentry.io/settings/auth-tokens/
2. Click **Create New Token**
3. Name it: "MCP Server Token"
4. Select scopes:
   - ✅ `org:read`
   - ✅ `project:read`
   - ✅ `event:read`
5. Click **Create Token** and copy it

### Step 2: Add to Environment

Add to `.env.local`:

```bash
SENTRY_MCP_TOKEN=your_token_here
```

### Step 3: Configure

```bash
npm run configure:sentry-mcp
```

Then **restart Cursor**.

## ✅ Done!

Now you can ask questions like:

- "What are the top errors in my Sentry project?"
- "Show me performance metrics for the last 24 hours"
- "What's the status of issue ABC123?"

## 📚 Full Documentation

See [SENTRY_MCP_SETUP.md](./SENTRY_MCP_SETUP.md) for complete details.
