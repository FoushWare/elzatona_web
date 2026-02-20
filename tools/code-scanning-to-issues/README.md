# Code Scanning to Issues Automation

This tool automatically converts GitHub code scanning alerts into GitHub issues with the "bugs" label.

## Features

- ✅ Fetches open code scanning alerts from GitHub Advanced Security
- ✅ Creates detailed GitHub issues with alert information (severity, location, description)
- ✅ Prevents duplicate issues using alert ID tracking
- ✅ Automatically creates and applies "bugs" label
- ✅ Handles API rate limits with retry logic
- ✅ Supports dry-run mode for testing

## Requirements

- Node.js 20+
- GitHub token with appropriate permissions:
  - `security_events:read` - Read code scanning alerts
  - `issues:write` - Create and manage issues
  - `repository` - Access repository metadata

## Usage

### Local Execution

1. Install dependencies:
```bash
cd tools/code-scanning-to-issues
npm install
```

2. Set environment variables:
```bash
export GITHUB_TOKEN="your_github_token"
export GITHUB_REPOSITORY="owner/repo"  # or set GITHUB_REPOSITORY_OWNER and REPO_NAME separately
```

3. Run the script:
```bash
npm start
```

4. Dry run (test without creating issues):
```bash
npm run dry-run
```

### GitHub Actions Workflow

The tool is automatically run via GitHub Actions workflow (`.github/workflows/code-scanning-to-issues.yml`):
- **Schedule**: Daily at 00:00 UTC
- **Manual**: Via workflow_dispatch
- **Automatic**: After code scanning completes

## Issue Format

Created issues include:

- **Title**: `[SEVERITY] Rule Name - Alert #123`
- **Body**:
  - Alert severity, rule ID, and tool name
  - Detailed description and message
  - File path and line numbers
  - Direct link to code location
  - Link to code scanning alert
  - Remediation guidance
  - Creation/update timestamps

## Duplicate Prevention

The tool maintains a mapping of alert IDs to issue numbers by:
1. Scanning all existing issues with "bugs" label
2. Extracting alert numbers from a stable body marker (`code-scanning-alert-id`), title/body patterns, and alert URLs
3. Running a final GitHub Search API check before creating an issue
4. Skipping alerts that already have corresponding issues

The workflow also uses a concurrency group so overlapping runs do not create duplicates during parallel executions.

## Rate Limiting

The tool handles GitHub API rate limits by:
- Adding delays between API calls (500ms-1s)
- Detecting rate limit errors
- Automatically waiting and retrying (60s delay)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | GitHub token with appropriate permissions |
| `GITHUB_REPOSITORY` | Yes* | Full repository name (owner/repo) |
| `GITHUB_REPOSITORY_OWNER` | Yes* | Repository owner (if GITHUB_REPOSITORY not set) |
| `REPO_NAME` | Yes* | Repository name (if GITHUB_REPOSITORY not set) |
| `DRY_RUN` | No | Set to 'true' for dry-run mode (default: false) |

*Either `GITHUB_REPOSITORY` or both `GITHUB_REPOSITORY_OWNER` and `REPO_NAME` must be set.

## Example Output

```
🔍 Code Scanning Alerts to Issues - Starting...
📦 Repository: FoushWare/elzatona_web
🏃 Mode: LIVE

✅ "bugs" label already exists
🔍 Building alert-to-issue mapping...
✅ Mapped 5 existing issues

🔍 Fetching code scanning alerts...
📊 Found 3 open code scanning alerts

📝 Creating issue for Alert #42...
   Title: [HIGH] Insufficient randomness - Alert #42
✅ Created issue #123 for Alert #42
⏭️  Alert #43: Issue #124 already exists
📝 Creating issue for Alert #44...
   Title: [MEDIUM] Uncontrolled data used in path expression - Alert #44
✅ Created issue #125 for Alert #44

📈 Summary:
  ✅ Issues created: 2
  ⏭️  Issues skipped (already exist): 1
  📊 Total alerts processed: 3
```

## Troubleshooting

### Permission Denied
Ensure your GitHub token has the required scopes (`security_events:read`, `issues:write`).

### No Alerts Found
- Check that code scanning is enabled for your repository
- Verify alerts exist at `https://github.com/OWNER/REPO/security/code-scanning`

### Rate Limit Exceeded
The tool automatically handles rate limits. If you're hitting limits frequently, consider:
- Running less frequently
- Processing alerts in smaller batches
- Using a GitHub App token (higher rate limits)

## License

MIT
