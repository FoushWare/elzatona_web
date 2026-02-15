# Quick Start: Converting Code Scanning Alerts to GitHub Issues

## 🎯 Goal

Convert all your code scanning security alerts into trackable GitHub issues so you can work on and solve them.

## ✅ Good News!

The automation tool is **already fully implemented** in this repository! You just need to run it.

## 🚀 Fastest Way to Get Issues Created

### Step 1: Merge the PR

If you have a PR open with the code scanning tool (branch: `copilot/convert-code-scanning-results-to-issues`), merge it to main.

### Step 2: Run the Workflow Manually

1. Go to your GitHub repository: https://github.com/FoushWare/elzatona_web
2. Click the **Actions** tab at the top
3. In the left sidebar, click **Code Scanning to Issues**
4. Click the **Run workflow** button (on the right)
5. Select your branch (usually `main`)
6. Click the green **Run workflow** button

### Step 3: Wait a Moment

The workflow will:

- Fetch all open code scanning alerts
- Create GitHub issues for each alert
- Apply the "bugs" label
- Skip any alerts that already have issues

This usually takes 1-2 minutes.

### Step 4: Check Your Issues

1. Go to the **Issues** tab in your repository
2. Filter by label: `bugs`
3. You'll see all your code scanning alerts as issues!

## 📋 What You'll See

Each issue will look like:

**Title:** `[HIGH] Insufficient randomness - Alert #42`

**Body:**

```
## Code Scanning Alert #42

**Severity:** HIGH
**Rule:** js/insufficient-randomness
**File:** `src/auth/tokens.ts`
**Lines:** 23

### Description
Math.random() should not be used for security-sensitive operations

### Links
- [View alert in GitHub](link to security tab)
- [View code location](link to specific line)

### Remediation
Please review the alert details and apply the necessary fixes...
```

## 🔄 Automatic Running

Once set up, the tool will automatically run:

- **Daily** at midnight UTC
- **After** every CodeQL analysis

So new alerts will automatically become issues without any manual work!

## 🧪 Test First (Optional)

If you want to test without creating real issues:

1. When running the workflow, check the "dry-run mode" option
2. Review the workflow logs to see what would be created
3. Run again without dry-run to create real issues

## ❓ Troubleshooting

### "No alerts found"

- Check that code scanning is enabled: Go to Settings → Security → Code scanning
- Verify alerts exist: Go to Security → Code scanning alerts

### "Permission denied"

- The workflow uses `GITHUB_TOKEN` automatically
- This should have all required permissions
- If issues persist, check repository settings → Actions → General → Workflow permissions

### "Rate limit exceeded"

- The tool handles this automatically by waiting and retrying
- Just let it finish - it will complete eventually

## 📞 Need Help?

Check the full documentation:

- Tool README: `tools/code-scanning-to-issues/README.md`
- Architecture: `tools/code-scanning-to-issues/ARCHITECTURE.md`
- Workflow config: `.github/workflows/code-scanning-to-issues.yml`

---

**Ready to go! Just run the workflow and your alerts will become trackable issues.** 🎉
