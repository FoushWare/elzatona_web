# 🐙 GitHub OAuth Setup Guide

## Step-by-Step Instructions:

### 1. Go to GitHub Developer Settings

- Open: https://github.com/settings/developers
- Sign in to your GitHub account

### 2. Create New OAuth App

- Click "New OAuth App" button
- Fill in the required fields:

### 3. Configure OAuth App

- **Application name**: "Elzatona Web"
- **Homepage URL**: `http://localhost:3001`
- **Authorization callback URL**: `http://localhost:3001/api/auth/callback/github`
- **Application description**: "Elzatona Web Application" (optional)

### 4. Create the OAuth App

- Click "Register application"
- You'll be taken to the app's settings page

### 5. Get Your Credentials

- You'll see:
  - **Client ID**: Copy this (it's visible immediately)
  - **Client Secret**: Click "Generate a new client secret" to get this

### 6. Add to Your .env.local

Add these lines to your `.env.local` file:

```
GITHUB_CLIENT_ID=your-actual-client-id-here
GITHUB_CLIENT_SECRET=your-actual-client-secret-here
```

## Important Notes:

- The callback URL must match exactly: `http://localhost:3001/api/auth/callback/github`
- For production, update the URLs to your actual domain
- Keep the client secret secure
- You can update the URLs later for production deployment

## Additional GitHub Settings:

- You can add a logo/avatar for your OAuth app
- Set up webhook URLs if needed
- Configure additional OAuth scopes if required
