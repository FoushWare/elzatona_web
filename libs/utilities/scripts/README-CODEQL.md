# CodeQL Local Analysis

This guide explains how to run CodeQL security analysis locally before pushing to GitHub.

## Prerequisites

1. **Install CodeQL CLI**

   Choose one of these methods:

   ### Option 1: Homebrew (macOS)
   ```bash
   brew install codeql
   ```

   ### Option 2: Manual Installation
   1. Visit: https://github.com/github/codeql-cli-binaries/releases
   2. Download the latest release for your OS
   3. Extract and add to PATH:
     ```bash
     export PATH="$PATH:/path/to/codeql"
     ```

   ### Option 3: GitHub CLI Extension
   ```bash
   gh extension install github/gh-codeql
   ```

2. **Verify Installation**
   ```bash
   codeql version
   ```

## Usage

### Basic Analysis (Local Only)

Run CodeQL analysis locally and view results:

```bash
npm run codeql
```

Or directly:
```bash
./libs/utilities/scripts/run-codeql-local.sh
```

This will:
1. Check if CodeQL CLI is installed
2. Create a CodeQL database
3. Build your project
4. Analyze the codebase
5. Generate a SARIF results file (`codeql-results.sarif`)

### Upload Results to GitHub

To upload results to GitHub (requires GitHub token):

```bash
npm run codeql:upload
```

Or:
```bash
./libs/utilities/scripts/run-codeql-local.sh --upload
```

**Required Environment Variable:**
```bash
export GITHUB_TOKEN=your_github_personal_access_token
```

The token needs `security_events: write` permission.

## Viewing Results

### Option 1: VS Code SARIF Extension
1. Install the "SARIF Viewer" extension in VS Code
2. Open `codeql-results.sarif` in VS Code
3. View all security alerts with details

### Option 2: GitHub Security Tab
If you uploaded results, view them in:
- GitHub Repository → Security → Code scanning alerts

### Option 3: Command Line
```bash
# View database info
codeql database info codeql-database

# Interpret results (if available)
codeql bqrs interpret codeql-database/results/javascript.bqrs
```

## What Gets Analyzed

The script uses the same configuration as GitHub Actions:
- **Language**: JavaScript (includes TypeScript)
- **Query Suite**: `security-extended,security-and-quality`
- **Format**: SARIF v2.1.0

## Troubleshooting

### Database Creation Fails

If the build command fails, the script will try without it:
```bash
codeql database create codeql-database --language=javascript --source-root="."
```

### Memory Issues

If you encounter memory issues during analysis:
```bash
# Limit threads
codeql database analyze codeql-database \
  "security-extended,security-and-quality" \
  --format=sarifv2.1.0 \
  --output=codeql-results.sarif \
  --threads=2
```

### Clean Up

To remove the database and start fresh:
```bash
rm -rf codeql-database codeql-results.sarif
```

## Integration with Pre-Push Hook

You can add CodeQL to your pre-push hook:

```bash
# In .git/hooks/pre-push or via husky
npm run codeql || exit 1
```

## Comparison with GitHub Actions

The local analysis uses the same:
- Query suites (`security-extended,security-and-quality`)
- Language (`javascript` which includes TypeScript)
- Analysis approach

Results should match what you see in GitHub Actions, allowing you to catch issues before pushing.

