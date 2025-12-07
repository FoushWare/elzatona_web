# SonarCloud Main Branch Configuration

## Issue

SonarCloud shows warning: "main" branch has not been analyzed yet and you have multiple branches already. It looks like it is not your Main Branch.

## Solution

The main branch needs to be configured in SonarCloud UI. The workflow is correctly configured, but SonarCloud needs to know that "main" is your main branch.

### Steps to Fix:

1. **Go to SonarCloud Dashboard**
   - Visit: https://sonarcloud.io/project/overview?id=FoushWare_elzatona_web
   - Or: https://sonarcloud.io → Your Project → Project Settings
   - Repository: https://github.com/FoushWare/elzatona_web

2. **Configure Main Branch**
   - Go to: **Project Settings** → **General Settings** → **Branches**
   - Set **Main Branch** to: `main`
   - Save changes

3. **Alternative: Use Helper Script**

   ```bash
   # Run the helper script for step-by-step instructions
   ./scripts/configure-sonarcloud-main-branch.sh
   ```

4. **Verify**
   - After the next workflow run, the warning should disappear
   - The main branch should show as analyzed in SonarCloud

## Current Workflow Configuration

The workflow is correctly configured:

- Repository: https://github.com/FoushWare/elzatona_web
- Project Key: `FoushWare_elzatona_web`
- Triggers on push to `main` branch
- Triggers on PRs to `main` branch
- Does not set `sonar.branch.name` for main (allows auto-detection)

## Note

This is a SonarCloud UI configuration issue, not a code/workflow issue. The workflow will work correctly once the main branch is set in SonarCloud settings.
