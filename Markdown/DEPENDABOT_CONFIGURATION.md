# Dependabot Configuration

## Overview

Dependabot is configured to create pull requests for dependency updates but **NOT** to auto-merge them. All PRs require manual review and approval.

## Configuration

### Location

`.dependabot.yml`

### Settings

#### NPM Dependencies

- **Schedule**: Daily checks
- **PR Limit**: 10 open PRs at a time
- **Reviewers**: @FoushWare (manual review required)
- **Assignees**: @FoushWare
- **Auto-merge**: ❌ **Disabled** (manual approval required)
- **Grouping**: Enabled (production and development dependencies grouped separately)

#### GitHub Actions

- **Schedule**: Weekly checks
- **PR Limit**: 5 open PRs at a time
- **Reviewers**: @FoushWare (manual review required)
- **Assignees**: @FoushWare
- **Auto-merge**: ❌ **Disabled** (manual approval required)

## How It Works

1. **Dependabot Checks**: Runs daily (npm) and weekly (GitHub Actions)
2. **Creates PRs**: When updates are found, Dependabot creates pull requests
3. **Requires Review**: All PRs are assigned to @FoushWare for review
4. **Manual Merge**: You must manually review and merge each PR
5. **No Auto-Merge**: PRs will NOT be merged automatically

## PR Labels

All Dependabot PRs are labeled with:

- `dependencies`
- `automated`
- `dependabot`
- `github-actions` (for action updates only)

## Grouping

Dependencies are grouped to reduce PR noise:

- **Production dependencies**: Grouped together
- **Development dependencies**: Grouped together

This means instead of 10 separate PRs, you might get 2 grouped PRs.

## Disabling Auto-Merge

Auto-merge is **explicitly disabled** in the configuration. There is no `auto-merge` or `auto-merge-strategy` setting, which means:

- ✅ PRs are created
- ❌ PRs are NOT auto-merged
- ✅ Manual review required
- ✅ Manual approval required

## Managing Dependabot PRs

### Review PRs

- Go to: https://github.com/FoushWare/elzatona_web/pulls
- Filter by: `label:dependabot`
- Review each PR individually
- Merge when approved

### Close PRs

If you don't want a specific update:

- Close the PR (Dependabot won't recreate it for that version)
- Or add to ignore list in `.dependabot.yml`

### Ignore Specific Updates

To ignore specific dependencies or update types, add to `.dependabot.yml`:

```yaml
ignore:
  - dependency-name: "package-name"
    update-types: ["version-update:semver-major"]
```

## Verification

To verify auto-merge is disabled:

1. Check `.dependabot.yml` - no `auto-merge` settings
2. Check branch protection rules - require review
3. Check repository settings - no auto-merge enabled

## Troubleshooting

### PRs are being auto-merged

- Check repository settings: Settings → General → Pull Requests
- Ensure "Allow auto-merge" is disabled or requires approval
- Check branch protection rules require review

### PRs not being created

- Check Dependabot is enabled: Settings → Code security and analysis
- Verify `.dependabot.yml` syntax is correct
- Check Dependabot logs: Insights → Dependency graph → Dependabot
