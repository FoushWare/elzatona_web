# Architecture: Code Scanning to Issues Automation

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Code Scanning                         │
│  (CodeQL, Third-party tools detect security vulnerabilities)    │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ Alerts Generated
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│              GitHub Actions Workflow Triggers                    │
│  • Daily at midnight UTC (scheduled)                            │
│  • Manual execution (workflow_dispatch)                         │
│  • After CodeQL analysis (workflow_run)                         │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│         Code Scanning to Issues Script (TypeScript)             │
│                  tools/code-scanning-to-issues/                  │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
              ┌───────────────┐
              │  Step 1:      │
              │  Check/Create │
              │  "bugs" label │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │  Step 2:      │
              │  Build Alert→ │
              │  Issue Map    │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │  Step 3:      │
              │  Fetch Open   │
              │  Alerts       │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │  Step 4:      │
              │  Process Each │
              │  Alert        │
              └───────┬───────┘
                      │
         ┌────────────┴────────────┐
         │                         │
    Already Exists?           New Alert?
         │                         │
         ▼                         ▼
    Skip Alert            Create GitHub Issue
                          - Title: [SEVERITY] Rule - Alert #N
                          - Body: Details, Location, Links
                          - Label: "bugs"
                                  │
                                  ▼
                        ┌─────────────────────┐
                        │  GitHub Issues      │
                        │  Trackable Backlog  │
                        └─────────────────────┘
```

## Data Flow

### Input: Code Scanning Alert
```json
{
  "number": 42,
  "state": "open",
  "rule": {
    "id": "js/insufficient-randomness",
    "name": "Insufficient randomness",
    "severity": "high"
  },
  "tool": {
    "name": "CodeQL"
  },
  "most_recent_instance": {
    "location": {
      "path": "src/auth/tokens.ts",
      "start_line": 23,
      "end_line": 23
    },
    "message": {
      "text": "Math.random() should not be used for security-sensitive operations"
    }
  },
  "html_url": "https://github.com/owner/repo/security/code-scanning/42"
}
```

### Output: GitHub Issue
```markdown
Title: [HIGH] Insufficient randomness - Alert #42

## Code Scanning Alert #42

**Severity:** HIGH
**Rule:** js/insufficient-randomness
**Rule Name:** Insufficient randomness
**Tool:** CodeQL
**State:** open

### Description

Math.random() should not be used for security-sensitive operations

### Location

**File:** `src/auth/tokens.ts`
**Lines:** 23

[View code location](https://github.com/owner/repo/blob/abc123/src/auth/tokens.ts#L23)

### Links

- [View alert in GitHub](https://github.com/owner/repo/security/code-scanning/42)
- [Alert API endpoint](https://api.github.com/repos/owner/repo/code-scanning/alerts/42)

### Remediation

Please review the alert details and apply the necessary fixes to resolve this security or quality issue.

**Created:** 2/11/2026, 11:30:00 PM
**Updated:** 2/11/2026, 11:30:00 PM
```

## Component Architecture

### Main Class: `CodeScanningToIssues`

```typescript
class CodeScanningToIssues {
  // Core functionality
  execute()                      // Main entry point
  
  // Alert processing
  fetchCodeScanningAlerts()      // Get all open alerts
  processAlert(alert)            // Handle single alert
  
  // Issue management
  ensureBugsLabel()              // Create label if needed
  buildAlertIssueMapping()       // Prevent duplicates
  
  // Formatting
  generateIssueTitle(alert)      // Format title
  generateIssueBody(alert)       // Format body
  
  // Utilities
  extractAlertNumber()           // Parse alert ID from issue
  sleep(ms)                      // Rate limit handling
}
```

## Error Handling

### Rate Limiting Strategy
```
API Call
   │
   ├─ Success → Continue
   │
   └─ Rate Limit (403) →
      ├─ Log: "Rate limit hit, waiting 60s..."
      ├─ Wait: 60 seconds
      └─ Retry: Same operation
```

### Duplicate Prevention Logic
```
Process Alert #42
   │
   ├─ Check mapping: alertIssueMapping["42"]
   │
   ├─ Exists? (e.g., Issue #123)
   │  └─ Skip: "Alert #42: Issue #123 already exists"
   │
   └─ Not found?
      └─ Create new issue
         └─ Update mapping: alertIssueMapping["42"] = newIssueNumber
```

## Deployment

### GitHub Actions Environment
- **Trigger**: Daily cron, manual, or post-CodeQL
- **Runner**: ubuntu-latest
- **Node.js**: 20.x
- **Permissions**: 
  - `contents: read`
  - `issues: write`
  - `security-events: read`

### Configuration
- **GITHUB_TOKEN**: Automatic from Actions
- **GITHUB_REPOSITORY**: Automatic from Actions
- **DRY_RUN**: Optional input (default: false)

## Scalability

### Performance Characteristics
- **Pagination**: 100 alerts per page
- **Rate Limiting**: 1000ms delay between issue creations
- **Concurrency**: Sequential processing (prevents race conditions)
- **Memory**: Maintains in-memory mapping of all existing issues

### Limits
- **GitHub API Rate Limit**: 5000 requests/hour (authenticated)
- **Expected Volume**: < 100 new alerts/day
- **Processing Time**: ~1-2 minutes for 100 alerts

## Monitoring

### Success Metrics
```
📈 Summary:
  ✅ Issues created: N
  ⏭️  Issues skipped (already exist): M
  📊 Total alerts processed: N+M
```

### Logs Location
- **GitHub Actions**: Workflow run logs
- **Artifacts**: `conversion-logs` (7-day retention)

## Security Considerations

1. **Token Security**: GitHub token auto-injected by Actions
2. **Rate Limiting**: Respects GitHub API limits
3. **Error Handling**: No sensitive data in error logs
4. **Code Review**: Passed CodeQL security scan
5. **Dependencies**: Minimal (23 packages, all verified)

## Future Enhancements

Potential improvements (currently out of scope):
- Automatic issue assignment
- Custom label configurations
- Alert suppression/filtering
- Integration with other tools (Slack, email)
- Historical analytics dashboard
- Automatic PR creation for fixes
