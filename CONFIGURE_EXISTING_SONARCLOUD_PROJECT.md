# Configure Existing SonarCloud Project

## Status
The project `elzatona_web` is **already imported** in SonarCloud! ✅

## Find the Correct Project Key

Since the project is already imported, we need to find its actual project key:

### Method 1: Check SonarCloud URL

1. **Go to your projects**
   - Visit: https://sonarcloud.io/projects

2. **Click on `elzatona_web` project**

3. **Look at the URL**
   - The URL will be: `https://sonarcloud.io/project/overview?id=PROJECT_KEY`
   - Copy the `PROJECT_KEY` from the URL

4. **Common project key formats:**
   - `foushware_elzatona_web` (lowercase)
   - `FoushWare_elzatona_web` (mixed case)
   - `foushware-elzatona-web` (with hyphens)

### Method 2: Use the Script

```bash
./scripts/find-sonarcloud-project-key.sh
```

This will check common project key formats and help you find the correct one.

## Update Configuration

Once you have the correct project key:

1. **Update `sonar-project.properties`**:
   ```properties
   sonar.projectKey=ACTUAL_PROJECT_KEY_HERE
   sonar.projectName=elzatona_web
   ```

2. **Configure Main Branch**:
   - Go to: `https://sonarcloud.io/project/settings?project=ACTUAL_PROJECT_KEY_HERE`
   - Navigate to: **General Settings** → **Branches**
   - Set **Main Branch** to: `main`
   - Save changes

## Quick Steps

1. ✅ Project is already imported
2. 🔍 Find the project key from SonarCloud URL
3. 📝 Update `sonar-project.properties` with correct key
4. ⚙️ Configure main branch in SonarCloud settings
5. ✅ Next workflow run will work correctly

## Verify

After updating:
- Go to: `https://sonarcloud.io/project/overview?id=YOUR_PROJECT_KEY`
- The project should load correctly
- Configure main branch in settings
