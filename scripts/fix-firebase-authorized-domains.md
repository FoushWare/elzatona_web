# Fix Firebase Authentication: Add Authorized Domain

## Problem

You're getting `Firebase: Error (auth/unauthorized-domain)` when trying to authenticate on your Vercel deployment.

## Solution

Add your Vercel domain to Firebase Authentication's authorized domains list.

## Steps to Fix

### 1. Go to Firebase Console

- Open your web browser and navigate to: https://console.firebase.google.com/
- Sign in with your Google account

### 2. Select Your Project

- From the list of projects, click on **"fir-demo-project-adffb"**

### 3. Navigate to Authentication

- On the left-hand navigation menu, look for the **"Build"** section
- Under "Build," click on **"Authentication"**

### 4. Go to Settings Tab

- Once you're on the Authentication page, you'll see several tabs at the top
- Click on the **"Settings"** tab

### 5. Locate Authorized Domains

- Scroll down on the Settings page
- You'll find a section clearly labeled **"Authorized domains"**

### 6. Add Domain

- Click on the **"Add domain"** button within this section

### 7. Enter the Domain

- A small pop-up window will appear
- In the text field, carefully type: `great-frontend-hub.vercel.app`
- **Important**: Do NOT include `https://` - just the domain name

### 8. Save

- Click the **"Add"** button in the pop-up window

## Expected Result

After adding the domain, you should see `great-frontend-hub.vercel.app` listed in the authorized domains section.

## Test Authentication

Once you've added the domain:

1. Go to: https://great-frontend-hub.vercel.app/auth
2. Try signing in with Google or GitHub
3. The authentication should now work without the unauthorized domain error

## Additional Domains to Consider

You might also want to add:

- `localhost` (for local development)
- `127.0.0.1` (for local development)
- Any other domains where you plan to deploy your app

## Security Note

Only add domains that you own and trust. Never add domains that you don't control, as this could create security vulnerabilities.
