# Create SonarCloud Project for elzatona_web

## Issue

The project `FoushWare_elzatona_web` doesn't exist in SonarCloud yet, which is why the settings page shows only loading.

## Solution: Create New Project

### Option 1: Via SonarCloud UI (Recommended)

1. **Go to SonarCloud Projects Page**
   - Visit: https://sonarcloud.io/projects
   - Or: https://sonarcloud.io → Projects → Create Project

2. **Create Project from GitHub**
   - Click "Create Project" or "Analyze new project"
   - Select "From GitHub"
   - Choose your organization: `foushware`
   - Select repository: `FoushWare/elzatona_web`
   - SonarCloud will automatically create the project with key: `FoushWare_elzatona_web`

3. **Configure Project**
   - After creation, go to: Project Settings → General Settings → Branches
   - Set Main Branch to: `main`
   - Save changes

### Option 2: Keep Using Old Project (Temporary)

If you want to use the existing project temporarily:

1. **Revert project key** in `sonar-project.properties`:

   ```
   sonar.projectKey=FoushWare_GreatFrontendHub
   sonar.projectName=GreatFrontendHub
   ```

2. **Configure main branch** in the old project:
   - Go to: https://sonarcloud.io/project/settings?project=FoushWare_GreatFrontendHub
   - Set Main Branch to: `main`

3. **Later, create new project** and update the key

## Quick Steps

1. Go to: https://sonarcloud.io/projects
2. Click "Create Project" or "Analyze new project"
3. Select "From GitHub"
4. Choose: `FoushWare/elzatona_web`
5. SonarCloud creates project automatically
6. Configure main branch in settings

## After Creating Project

Once the project is created:

- The settings page will load: https://sonarcloud.io/project/settings?project=FoushWare_elzatona_web
- Configure main branch: General Settings → Branches → Set to `main`
- The next workflow run will analyze correctly
