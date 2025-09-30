# Development Setup Guide

## Firebase Authentication Setup

To enable full authentication functionality, you need to set up Firebase Admin SDK environment variables.

### Option 1: Full Firebase Admin SDK Setup (Recommended for Production)

1. **Get Firebase Service Account Key:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file

2. **Add Environment Variables:**
   Create a `.env.local` file in your project root:

   ```bash
   # Firebase Admin SDK
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

   # Firebase Client SDK (already configured)
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   ```

3. **Restart Development Server:**
   ```bash
   npm run dev
   ```

### Option 2: Development Mode (Current Setup)

The application is currently configured to work in **development mode** without requiring Firebase Admin SDK setup. This means:

- ✅ **Authentication works** - Users can sign in/out
- ✅ **Progress tracking works** - Progress is saved locally and to mock server responses
- ✅ **Learning plans work** - Plans are saved to localStorage
- ✅ **All features functional** - Everything works for development and testing
- ⚠️ **Limited persistence** - Data is not permanently stored in Firestore
- ⚠️ **Mock responses** - Server returns mock data instead of real Firestore data

### What Works in Development Mode:

1. **User Authentication:**
   - Sign in with Google/GitHub/Email
   - User session management
   - HTTP-only cookies for security

2. **Progress Tracking:**
   - Question progress saved locally
   - Session statistics
   - Time tracking
   - Accuracy calculations

3. **Learning Plans:**
   - Plan selection and management
   - Progress tracking within plans
   - Daily goals and milestones

4. **User Preferences:**
   - Theme settings
   - Learning preferences
   - Notification settings

### Development Mode Indicators:

When running in development mode, you'll see these console messages:

- `⚠️ Firebase Admin SDK environment variables not set. Using fallback authentication.`
- `✅ Token verified using REST API fallback`
- `Development mode: Using development mode - authentication not fully configured`

### Testing the Application:

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Test authentication:**
   - Sign in with any method
   - Check that user data loads correctly

3. **Test progress tracking:**
   - Go to guided learning or free-style practice
   - Answer questions
   - Check that progress is saved

4. **Test learning plans:**
   - Select a learning plan
   - Start practicing
   - Verify progress tracking

### Production Deployment:

When ready for production:

1. Set up Firebase Admin SDK environment variables
2. Configure Firestore security rules
3. Deploy with proper environment variables
4. Test authentication and data persistence

### Troubleshooting:

**If you see "Authentication required" errors:**

- The application is working in development mode
- Progress is still being saved locally
- This is expected behavior without Firebase Admin SDK setup

**To enable full functionality:**

- Follow Option 1 above to set up Firebase Admin SDK
- Restart the development server
- Authentication will work with full Firestore integration

## Current Status: ✅ Development Ready

The application is fully functional in development mode and ready for testing all features!

