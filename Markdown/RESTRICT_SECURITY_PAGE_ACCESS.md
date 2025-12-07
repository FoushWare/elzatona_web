# Restrict GitHub Security Page Access to Owner Only

## 🎯 Goal

Restrict access to `https://github.com/FoushWare/elzatona_web/security` so only you (the owner) can see sensitive security information.

## ⚠️ Important Note

For **public repositories**, the security page itself (`/security`) is visible to everyone. However, you can restrict **sensitive security alerts** to admins only.

## ✅ Solution: Restrict Security Alerts to Admins

### Step 1: Configure Secret Scanning Visibility

1. **Go to Repository Settings**
   - Visit: https://github.com/FoushWare/elzatona_web/settings
   - Or: Repository → Settings

2. **Navigate to Security**
   - Click **"Security"** (left sidebar)
   - Click **"Code security and analysis"**

3. **Configure Secret Scanning**
   - Find **"Secret scanning"**
   - Ensure it's enabled
   - **Note**: Secret scanning alerts are automatically restricted to repository admins by default

### Step 2: Configure Dependabot Alerts Visibility

1. **In the same "Code security and analysis" section**
2. **Find "Dependabot alerts"**
3. **Click "Manage access"** next to Dependabot alerts
4. **Set visibility to "Admins only"** (if available)
   - Note: Dependabot alerts are typically visible to admins by default

### Step 3: Configure Code Scanning Visibility

1. **In "Code security and analysis" section**
2. **Find "Code scanning"**
3. **Click "Manage access"** or configure visibility
4. **Restrict to "Admins only"** if option is available

### Step 4: Verify Collaborator Access

1. **Go to Repository Settings**
   - https://github.com/FoushWare/elzatona_web/settings

2. **Click "Manage access"** (left sidebar)

3. **Review Collaborators**
   - Ensure no one has **"Admin"** role except you
   - Remove any admins you don't trust
   - Only **"Admin"** role can see all security information

4. **Recommended Roles for Collaborators:**
   - **"Write"** - Can push code, but limited security access
   - **"Maintain"** - Can manage some settings, but not security
   - **"Triage"** - Can manage issues/PRs, no security access
   - **"Read"** - Can view code only, no security access

## 🔒 Complete Restriction: Make Repository Private

If you want to completely restrict the security page to only you:

### Option: Make Repository Private

1. **Go to Repository Settings**
   - https://github.com/FoushWare/elzatona_web/settings

2. **Scroll to "Danger Zone"**

3. **Click "Change repository visibility"**

4. **Select "Make private"**

5. **Confirm the change**

**⚠️ Important Considerations:**

- Private repos are not visible to the public
- GitHub Actions minutes are limited for private repos (free tier)
- Some integrations may not work with private repos
- You'll need to explicitly grant access to collaborators

## 📋 Current Security Visibility Settings

### What's Visible to Everyone (Public Repo):

- ✅ Security page (`/security`) - visible to all
- ✅ SECURITY.md file - visible to all
- ✅ Public security advisories (if published)
- ✅ Security policy

### What Can Be Restricted to Admins:

- ✅ Secret scanning alerts (default: admins only)
- ✅ Dependabot alerts (can be restricted)
- ✅ Code scanning alerts (can be restricted)
- ✅ Private security advisories (admins only)

## 🔧 Recommended Configuration

For a public repository where you want maximum privacy:

1. ✅ **Keep repository public** (if you want public visibility)
2. ✅ **Ensure no collaborators have Admin role** (except you)
3. ✅ **Secret scanning alerts** - Already restricted to admins
4. ✅ **Dependabot alerts** - Check visibility settings
5. ✅ **Code scanning alerts** - Check visibility settings
6. ✅ **Review all collaborators** - Remove unnecessary admins

## 📝 Quick Checklist

- [ ] Review collaborators: https://github.com/FoushWare/elzatona_web/settings/access
- [ ] Remove any unnecessary Admin roles
- [ ] Check secret scanning settings
- [ ] Check Dependabot alert visibility
- [ ] Check code scanning alert visibility
- [ ] (Optional) Consider making repository private

## 🔗 Direct Links

- **Repository Settings**: https://github.com/FoushWare/elzatona_web/settings
- **Manage Access**: https://github.com/FoushWare/elzatona_web/settings/access
- **Code Security & Analysis**: https://github.com/FoushWare/elzatona_web/settings/security_analysis
- **Security Page**: https://github.com/FoushWare/elzatona_web/security

---

**Last Updated:** December 2024  
**Status:** Security access restriction guide created ✅
