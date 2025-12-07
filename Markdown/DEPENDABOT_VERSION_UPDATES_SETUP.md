# Enable Dependabot Version Updates

## ✅ Configuration Status

Your `.dependabot.yml` file is already configured and committed to the repository. The configuration includes:

- **NPM dependencies**: Daily checks for updates
- **GitHub Actions**: Weekly checks for updates
- **PR limits**: 10 for npm, 5 for actions
- **Auto-assignment**: All PRs assigned to @FoushWare
- **Auto-review**: All PRs request review from @FoushWare
- **Grouping**: Production and development dependencies grouped separately
- **Auto-merge**: Disabled (requires manual approval)

## 🔧 Enable in GitHub UI

Dependabot version updates must be enabled in the GitHub repository settings:

### Step-by-Step Instructions

1. **Navigate to Repository Settings**:
   - Go to: https://github.com/FoushWare/elzatona_web/settings/security

2. **Find "Code security and analysis" Section**:
   - Scroll down to the "Code security and analysis" section

3. **Enable "Dependabot version updates"**:
   - Find the "Dependabot version updates" option
   - Click the **"Enable"** button (or **"Configure"** if already partially enabled)
   - GitHub will automatically detect your `.dependabot.yml` file

4. **Verify Configuration**:
   - After enabling, you should see a green checkmark
   - GitHub will show: "Configured via .dependabot.yml"

## 📋 What Happens Next

Once enabled, Dependabot will:

1. **Check for Updates**:
   - NPM packages: Daily at a scheduled time
   - GitHub Actions: Weekly

2. **Create Pull Requests**:
   - Automatically opens PRs for available updates
   - Groups related updates together (production/dev separate)
   - Limits to 10 npm PRs and 5 action PRs at a time

3. **Assign and Request Review**:
   - All PRs assigned to @FoushWare
   - Review requested from @FoushWare
   - Labeled with: `dependencies`, `automated`, `dependabot`

4. **Wait for Approval**:
   - PRs will NOT auto-merge
   - You must manually review and merge each PR
   - This ensures you have control over all updates

## 🔗 Quick Links

- **Repository Settings**: https://github.com/FoushWare/elzatona_web/settings/security
- **Dependabot Alerts**: https://github.com/FoushWare/elzatona_web/security/dependabot
- **Dependabot PRs**: https://github.com/FoushWare/elzatona_web/pulls?q=is:pr+author:app/dependabot
- **Configuration File**: https://github.com/FoushWare/elzatona_web/blob/main/.dependabot.yml

## ⚙️ Configuration Details

### NPM Dependencies

```yaml
- package-ecosystem: "npm"
  schedule:
    interval: "daily"
  open-pull-requests-limit: 10
  reviewers:
    - "FoushWare"
  assignees:
    - "FoushWare"
  groups:
    production-dependencies:
      dependency-type: "production"
    development-dependencies:
      dependency-type: "development"
```

### GitHub Actions

```yaml
- package-ecosystem: "github-actions"
  schedule:
    interval: "weekly"
  open-pull-requests-limit: 5
  reviewers:
    - "FoushWare"
  assignees:
    - "FoushWare"
```

## 💡 Tips

- **Review PRs Regularly**: Check PRs daily to keep dependencies up-to-date
- **Test Before Merging**: Always test Dependabot PRs before merging
- **Monitor Breaking Changes**: Major version updates may require code changes
- **Group Updates**: The grouping feature reduces PR noise by combining related updates

## 🚨 Important Notes

- **Auto-merge is Disabled**: All PRs require manual review and approval
- **Security Updates**: Already enabled separately (different from version updates)
- **First Run**: Dependabot may take up to 24 hours to create the first PRs
- **Rate Limits**: Dependabot respects GitHub API rate limits

## ✅ Verification

After enabling, verify it's working:

1. Wait 24 hours for the first check
2. Check for PRs: https://github.com/FoushWare/elzatona_web/pulls?q=is:pr+author:app/dependabot
3. Check Dependabot logs: https://github.com/FoushWare/elzatona_web/security/dependabot

## 🆘 Troubleshooting

### PRs Not Being Created

- Verify `.dependabot.yml` is in the root directory
- Check that Dependabot version updates is enabled in settings
- Wait 24 hours for the first check
- Check Dependabot logs for errors

### Too Many PRs

- Reduce `open-pull-requests-limit` in `.dependabot.yml`
- Enable grouping (already configured)
- Add `ignore` rules for specific packages

### Want to Disable

- Go to: https://github.com/FoushWare/elzatona_web/settings/security
- Find "Dependabot version updates"
- Click "Disable"
