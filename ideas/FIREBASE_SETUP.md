# Firebase Authentication Setup Guide

This guide will help you set up Firebase authentication for the Frontend KodDev project.

## Prerequisites

1. A Google account
2. Node.js and npm installed
3. Basic knowledge of Firebase

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "frontend-koddev")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:

### Email/Password Authentication
- Click "Email/Password"
- Enable "Email/Password"
- Click "Save"

### Google Authentication
- Click "Google"
- Enable "Google"
- Add your support email
- Click "Save"

### GitHub Authentication
- Click "GitHub"
- Enable "GitHub"
- You'll need to create a GitHub OAuth app first (see GitHub setup below)
- Add your GitHub OAuth app credentials
- Click "Save"

## Step 3: Create GitHub OAuth App (for GitHub login)

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: "Frontend KodDev"
   - Homepage URL: `http://localhost:3000` (for development)
   - Authorization callback URL: `https://your-project.firebaseapp.com/__/auth/handler`
4. Click "Register application"
5. Copy the Client ID and Client Secret
6. Add these to your Firebase GitHub authentication settings

## Step 4: Get Firebase Configuration

1. In your Firebase project console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "Frontend KodDev Web")
6. Copy the configuration object

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# OpenAI API Key (for ChatGPT integration)
OPENAI_API_KEY=your_openai_api_key_here
```

## Step 6: Enable Firestore Database

1. In your Firebase project console, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Enable"

## Step 7: Set Firestore Security Rules

1. In the Firestore Database section, go to the "Rules" tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read access to learning content
    match /learning-paths/{document=**} {
      allow read: if true;
    }
    
    match /questions/{document=**} {
      allow read: if true;
    }
  }
}
```

3. Click "Publish"

## Step 8: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/auth` page
3. Try signing in with Google or GitHub
4. Check the browser console for any errors
5. Verify that user data is created in Firestore

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/unauthorized-domain)":**
   - Add `localhost` to authorized domains in Firebase Authentication settings

2. **"Firebase: Error (auth/network-request-failed)":**
   - Check your internet connection
   - Verify Firebase configuration values

3. **"Firebase: Error (auth/popup-closed-by-user)":**
   - User closed the popup before completing authentication
   - This is normal behavior, not an error

4. **"Firebase: Error (auth/account-exists-with-different-credential)":**
   - User already has an account with the same email but different provider
   - Implement account linking if needed

### Development vs Production

- **Development**: Use `localhost:3000` in authorized domains
- **Production**: Add your production domain to authorized domains
- **GitHub OAuth**: Update callback URLs for production

## Security Best Practices

1. **Never commit `.env.local` to version control**
2. **Use environment-specific Firebase projects** (dev/staging/prod)
3. **Implement proper Firestore security rules**
4. **Enable email verification** for production apps
5. **Monitor authentication logs** in Firebase console

## Next Steps

After setting up Firebase authentication:

1. Customize the user profile fields
2. Implement email verification
3. Add password reset functionality
4. Set up user roles and permissions
5. Implement account linking for multiple providers

## Support

If you encounter issues:

1. Check the [Firebase documentation](https://firebase.google.com/docs)
2. Review the [Next.js Firebase integration guide](https://nextjs.org/docs/authentication)
3. Check the browser console for error messages
4. Verify all environment variables are set correctly

---

**Note**: This setup guide assumes you're using the default Firebase configuration. For advanced use cases, you may need to customize the authentication flow and security rules.
