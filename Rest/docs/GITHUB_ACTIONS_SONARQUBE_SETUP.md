# GitHub Actions + SonarQube Configuration Guide

## ✅ Configuration Updated!

Your GitHub Actions workflow has been updated with the correct SonarCloud project configuration.

## 📋 What Was Updated

### 1. GitHub Actions Workflow (`.github/workflows/sonarcloud.yml`)

**Before:**
- Project Key: `zatona-web` ❌
- Organization: `${{ secrets.SONAR_ORG }}` (required secret)

**After:**
- Project Key: `FoushWare_GreatFrontendHub` ✅
- Organization: `FoushWare` ✅ (hardcoded - no secret needed)

### 2. Sonar Project Properties (`sonar-project.properties`)

**Before:**
- Project Key: `zatona-web` ❌
- No organization specified

**After:**
- Project Key: `FoushWare_GreatFrontendHub` ✅
- Organization: `FoushWare` ✅
- Project Name: `GreatFrontendHub` ✅

## 🔑 Required GitHub Secrets

You only need **ONE** secret now:

### `SONAR_TOKEN` (Required)

1. **Go to GitHub Repository**:
   - Navigate to: `https://github.com/FoushWare/GreatFrontendHub`
   - Click **Settings** → **Secrets and variables** → **Actions**

2. **Add Secret**:
   - Click **"New repository secret"**
   - Name: `SONAR_TOKEN`
   - Value: `9de5734cbe531c754630587e4beea08a63abe503` (your token)
   - Click **"Add secret"**

3. **Remove Old Secret** (if exists):
   - If you have `SONAR_ORG` secret, you can remove it (no longer needed)

## ✅ Verification

After adding the secret:

1. **Check Workflow File**:
   ```bash
   cat .github/workflows/sonarcloud.yml | grep -A 5 "SonarCloud Scan"
   ```
   Should show:
   - `projectKey: FoushWare_GreatFrontendHub`
   - `organization: FoushWare`

2. **Check Project Properties**:
   ```bash
   head -8 sonar-project.properties
   ```
   Should show:
   - `sonar.projectKey=FoushWare_GreatFrontendHub`
   - `sonar.organization=FoushWare`

3. **Test Workflow**:
   - Push to `main`, `develop`, or create a PR
   - Or manually trigger: GitHub → Actions → SonarCloud Analysis → Run workflow

## 📊 Workflow Details

The workflow will:
1. ✅ Checkout code
2. ✅ Setup Node.js 20
3. ✅ Install dependencies
4. ✅ Run tests with coverage
5. ✅ Build project
6. ✅ Run SonarCloud analysis
7. ✅ Upload coverage to Codecov

## 🔍 Troubleshooting

### Workflow Fails with "Project not found"

- **Check Project Key**: Must be exactly `FoushWare_GreatFrontendHub`
- **Check Organization**: Must be exactly `FoushWare`
- **Verify Token**: Ensure `SONAR_TOKEN` secret is set correctly

### Workflow Fails with "Not authorized"

- **Check Token**: Verify `SONAR_TOKEN` secret is correct
- **Token Permissions**: Ensure token has read/write access to your organization
- **Token Format**: Should be a long alphanumeric string

### Coverage Not Uploading

- **Check Coverage File**: Ensure `coverage/lcov.info` is generated
- **Check Path**: Verify coverage path in workflow matches actual location
- **Check Tests**: Ensure tests are running and generating coverage

## 🎯 Quick Reference

| Item | Value |
|------|-------|
| **Project Key** | `FoushWare_GreatFrontendHub` |
| **Organization** | `FoushWare` |
| **GitHub Secret** | `SONAR_TOKEN` |
| **Token Value** | `9de5734cbe531c754630587e4beea08a63abe503` |
| **Workflow File** | `.github/workflows/sonarcloud.yml` |
| **Config File** | `sonar-project.properties` |

## 📝 Next Steps

1. ✅ **Add GitHub Secret**:
   - Go to: https://github.com/FoushWare/GreatFrontendHub/settings/secrets/actions
   - Add: `SONAR_TOKEN` = `9de5734cbe531c754630587e4beea08a63abe503`

2. ✅ **Test Workflow**:
   - Push a commit or create a PR
   - Check GitHub Actions tab for results

3. ✅ **View Results**:
   - Go to: https://sonarcloud.io/dashboard?id=FoushWare_GreatFrontendHub
   - See quality gate status and metrics

## 🔄 Using MCP to Configure (After Restart)

Once you restart Cursor and the MCP server connects, you can:

1. **Get Project Details**:
   - Ask: "Get SonarQube project details for FoushWare_GreatFrontendHub"
   - Ask: "Get quality gate status for my project"

2. **Search Issues**:
   - Ask: "Search for high severity issues in my SonarQube project"
   - Ask: "Get all security vulnerabilities"

3. **Get Metrics**:
   - Ask: "Get code coverage metrics from SonarQube"
   - Ask: "Show me technical debt metrics"

---

**Status**: ✅ **Configuration Updated - Add GitHub Secret to Complete**

**Action**: Add `SONAR_TOKEN` secret to GitHub repository

