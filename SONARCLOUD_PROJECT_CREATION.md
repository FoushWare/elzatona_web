# SonarCloud Project Creation Guide

## Problem
When accessing https://sonarcloud.io/project/settings?project=FoushWare_elzatona_web, you see only a loading screen.

## Cause
The project `FoushWare_elzatona_web` doesn't exist in SonarCloud yet. It needs to be created first.

## Solution: Create the Project

### Step 1: Go to SonarCloud Projects
Visit: **https://sonarcloud.io/projects**

### Step 2: Create New Project
1. Click **"Create Project"** or **"Analyze new project"** button
2. Select **"From GitHub"**
3. Choose your organization: **`foushware`**
4. Select repository: **`FoushWare/elzatona_web`**
5. SonarCloud will automatically:
   - Create the project
   - Set project key to: `FoushWare_elzatona_web`
   - Link it to your GitHub repository

### Step 3: Configure Main Branch
After the project is created:

1. Go to: **https://sonarcloud.io/project/settings?project=FoushWare_elzatona_web**
   (This page will now load correctly)

2. Navigate to: **General Settings** → **Branches**

3. Set **Main Branch** to: **`main`**

4. Click **Save**

### Step 4: Verify
- Go to: https://sonarcloud.io/project/overview?id=FoushWare_elzatona_web
- The project should show up correctly
- After the next GitHub Actions workflow run, analysis will work

## Alternative: Use Existing Project (Temporary)

If you want to use the old project temporarily while setting up the new one:

1. **Update `sonar-project.properties`**:
   ```properties
   sonar.projectKey=FoushWare_GreatFrontendHub
   sonar.projectName=GreatFrontendHub
   ```

2. **Configure main branch** in old project:
   - Go to: https://sonarcloud.io/project/settings?project=FoushWare_GreatFrontendHub
   - Set Main Branch to: `main`

3. **Later**, create the new project and update the key back

## Quick Links

- **Create Project**: https://sonarcloud.io/projects
- **Project Overview** (after creation): https://sonarcloud.io/project/overview?id=FoushWare_elzatona_web
- **Project Settings** (after creation): https://sonarcloud.io/project/settings?project=FoushWare_elzatona_web
- **GitHub Repository**: https://github.com/FoushWare/elzatona_web

## Troubleshooting: Can't Create Project Manually

If you can't create the project manually, try these solutions:

### Solution 1: Authorize GitHub Integration

1. **Check GitHub App Authorization**
   - Go to: https://github.com/settings/installations
   - Find "SonarCloud" app
   - Click "Configure"
   - Ensure `FoushWare/elzatona_web` is selected
   - Save changes

2. **Authorize in SonarCloud**
   - Go to: https://sonarcloud.io/account/organizations
   - Check if GitHub is connected
   - If not, click "Connect GitHub" and authorize

3. **Try Creating Again**
   - Go to: https://sonarcloud.io/projects
   - Click "Import from GitHub"
   - Select: `FoushWare/elzatona_web`

### Solution 2: Use API Script

If manual creation still doesn't work:

```bash
# Get your SonarCloud token
# Visit: https://sonarcloud.io/account/security

# Set the token
export SONAR_TOKEN=your_token_here

# Run the API script
./scripts/create-sonarcloud-project-api.sh
```

### Solution 3: Use Existing Project (Temporary)

If you need to get analysis working immediately:

1. **Revert to old project key** in `sonar-project.properties`:
   ```properties
   sonar.projectKey=FoushWare_GreatFrontendHub
   sonar.projectName=GreatFrontendHub
   ```

2. **Configure main branch** in old project:
   - Go to: https://sonarcloud.io/project/settings?project=FoushWare_GreatFrontendHub
   - Set Main Branch to: `main`

3. **Later**, create the new project when permissions are fixed
