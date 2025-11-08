# Cleaning Up GitHub Deployments

## Current Situation

You have 828 deployments that need to be cleaned up. Since we've disabled the GitHub Actions deployment workflow, new deployments will only come from Vercel (reducing future deployment count by 50%).

## How to Clean Up Old Deployments

### Option 1: GitHub Web Interface (Recommended for Bulk Cleanup)

1. **Go to Deployments Page:**
   - Navigate to: `https://github.com/FoushWare/GreatFrontendHub/deployments`
   - Or: Repository → Environments → View all deployments

2. **Delete Individual Deployments:**
   - Click on a deployment
   - Click the "..." menu (three dots)
   - Select "Delete deployment"
   - Confirm deletion

3. **Bulk Delete (if available):**
   - Some repositories have bulk delete options
   - Check if there's a "Select all" or bulk action option
   - Note: GitHub may limit bulk operations for very old deployments

### Option 2: GitHub CLI (For Programmatic Cleanup)

If you have GitHub CLI installed, you can use it to delete deployments:

```bash
# List all deployments
gh api repos/FoushWare/GreatFrontendHub/deployments --paginate

# Delete a specific deployment (replace DEPLOYMENT_ID)
gh api repos/FoushWare/GreatFrontendHub/deployments/DEPLOYMENT_ID -X DELETE

# Note: You'll need to script this to delete multiple deployments
```

### Option 3: GitHub API Script

Create a script to delete old deployments:

```bash
#!/bin/bash
# cleanup-deployments.sh

REPO="FoushWare/GreatFrontendHub"
TOKEN="your_github_token"  # Use GitHub Personal Access Token

# Get all deployment IDs
DEPLOYMENT_IDS=$(gh api repos/$REPO/deployments --paginate | jq -r '.[].id')

# Delete each deployment
for id in $DEPLOYMENT_IDS; do
  echo "Deleting deployment $id..."
  gh api repos/$REPO/deployments/$id -X DELETE || true
  sleep 0.5  # Rate limiting
done
```

### Option 4: Let GitHub Auto-Archive (Passive)

- GitHub automatically archives old deployments after 90 days
- This is the least effort option but takes time
- Old deployments will fade from view over time

## Prevention Going Forward

✅ **Already Done:**

- Disabled GitHub Actions deployment workflow
- Only Vercel will deploy now (1 deployment per push instead of 2)

**Result:**

- Future deployments will be reduced by 50%
- Only Vercel deployments will appear
- No duplicate deployments

## Quick Reference

**Current Setup:**

- ✅ Vercel: Auto-deploys on push to `main`
- ❌ GitHub Actions: Disabled (`.github/workflows/deploy-main.yml.disabled`)

**To Re-enable GitHub Actions Deployments:**

```bash
mv .github/workflows/deploy-main.yml.disabled .github/workflows/deploy-main.yml
```

**To Clean Up via Web:**

1. Go to: https://github.com/FoushWare/GreatFrontendHub/deployments
2. Delete old deployments manually or wait for auto-archival

## Notes

- **Deployment History:** Old deployments don't affect current functionality
- **Storage:** Deployments are metadata only, not large files
- **Rate Limits:** GitHub API has rate limits (5000 requests/hour for authenticated users)
- **Bulk Operations:** GitHub may not support bulk delete for all deployment types
