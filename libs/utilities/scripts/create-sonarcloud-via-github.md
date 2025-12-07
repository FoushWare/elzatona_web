# Create SonarCloud Project via GitHub Integration

## Why Manual Creation Might Not Work

If you can't create the project manually, it's usually because:

1. **GitHub integration not authorized** - SonarCloud needs permission to access your GitHub repos
2. **Organization permissions** - You might not have permission to create projects in the organization
3. **Repository not visible** - The repository might not be accessible to SonarCloud

## Solution: Authorize GitHub Integration

### Step 1: Authorize SonarCloud GitHub App

1. **Go to SonarCloud Settings**
   - Visit: https://sonarcloud.io/account/organizations
   - Or: https://sonarcloud.io → Your Profile → Organizations

2. **Check GitHub Integration**
   - Look for "GitHub" or "Connected Accounts"
   - If not connected, click "Connect GitHub" or "Authorize"

3. **Authorize SonarCloud**
   - You'll be redirected to GitHub
   - Authorize SonarCloud to access your repositories
   - Select the repositories you want to analyze (or all repos)

### Step 2: Create Project from GitHub

After authorization:

1. **Go to Projects**
   - Visit: https://sonarcloud.io/projects

2. **Import from GitHub**
   - Click "Import from GitHub" or "Analyze new project"
   - Select organization: `foushware`
   - Find and select: `FoushWare/elzatona_web`
   - SonarCloud will create the project automatically

### Step 3: Verify Repository Access

If the repository doesn't appear:

1. **Check GitHub App Permissions**
   - Go to: https://github.com/settings/installations
   - Find "SonarCloud" app
   - Click "Configure"
   - Ensure `FoushWare/elzatona_web` is selected
   - Save changes

2. **Refresh SonarCloud**
   - Go back to: https://sonarcloud.io/projects
   - Click "Import from GitHub" again
   - The repository should now appear

## Alternative: Use API Script

If GitHub integration still doesn't work, use the API script:

```bash
# Set your SonarCloud token
export SONAR_TOKEN=your_token_here

# Run the script
./scripts/create-sonarcloud-project-api.sh
```

Get your token from: https://sonarcloud.io/account/security

## Troubleshooting

### "Repository not found"

- Ensure the repository is public or you've granted SonarCloud access
- Check GitHub App permissions

### "Organization permission denied"

- Contact your organization admin
- Or create the project in your personal organization

### "Project already exists"

- The project might exist with a different key
- Check: https://sonarcloud.io/projects
