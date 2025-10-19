# 🔧 Google OAuth Setup Guide

## Step-by-Step Instructions:

### 1. Go to Google Cloud Console

- Open: https://console.cloud.google.com/
- Sign in with your Google account

### 2. Create or Select a Project

- If you don't have a project, click "Create Project"
- Give it a name like "Elzatona Web OAuth"
- If you have an existing project, select it from the dropdown

### 3. Enable Google+ API

- Go to "APIs & Services" → "Library"
- Search for "Google+ API" or "Google Identity"
- Click on it and press "Enable"

### 4. Create OAuth Credentials

- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "OAuth 2.0 Client IDs"
- If prompted, configure the OAuth consent screen first

### 5. Configure OAuth Consent Screen

- Choose "External" (unless you have a Google Workspace)
- Fill in the required fields:
  - App name: "Elzatona Web"
  - User support email: your email
  - Developer contact: your email
- Save and continue through the steps

### 6. Create OAuth 2.0 Client ID

- Application type: "Web application"
- Name: "Elzatona Web OAuth"
- Authorized redirect URIs:
  - `http://localhost:3001/api/auth/callback/google`
  - `https://yourdomain.com/api/auth/callback/google` (for production)

### 7. Get Your Credentials

- After creating, you'll see:
  - **Client ID**: Copy this
  - **Client Secret**: Copy this

### 8. Add to Your .env.local

Add these lines to your `.env.local` file:

```
GOOGLE_CLIENT_ID=your-actual-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
```

## Important Notes:

- The redirect URI must match exactly: `http://localhost:3001/api/auth/callback/google`
- For production, add your actual domain
- Keep the client secret secure
- You can add multiple redirect URIs for different environments
