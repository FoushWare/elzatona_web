/**
 * Server-side authentication utilities using Firebase Admin SDK
 */

import { verifyIdToken } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin SDK for server-side token verification
if (!getApps().length) {
  try {
    // Check if we have the required environment variables
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
      console.log('✅ Firebase Admin SDK initialized successfully');
    } else {
      console.warn('⚠️ Firebase Admin SDK environment variables not set. Using fallback authentication.');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

// Fallback token verification using Firebase REST API
const verifyTokenWithRestAPI = async (token: string) => {
  try {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: token,
      }),
    });

    if (!response.ok) {
      throw new Error('Token verification failed');
    }

    const data = await response.json();
    if (data.users && data.users.length > 0) {
      const user = data.users[0];
      return {
        uid: user.localId,
        email: user.email,
        email_verified: user.emailVerified === 'true',
        name: user.displayName,
        picture: user.photoUrl,
      };
    }
    return null;
  } catch (error) {
    console.error('REST API token verification error:', error);
    return null;
  }
};

// Verify Firebase token on server side
export const verifyFirebaseToken = async (token: string) => {
  try {
    // Check if Firebase Admin SDK is properly initialized
    const apps = getApps();
    if (apps.length === 0) {
      console.warn('Firebase Admin SDK not initialized, using REST API fallback');
      return await verifyTokenWithRestAPI(token);
    }

    // Try Firebase Admin SDK first
    const decodedToken = await verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.warn('Firebase Admin SDK verification failed, trying REST API fallback:', error);
    
    // Fallback to REST API verification
    try {
      const restApiResult = await verifyTokenWithRestAPI(token);
      if (restApiResult) {
        console.log('✅ Token verified using REST API fallback');
        return restApiResult;
      }
    } catch (restError) {
      console.error('REST API fallback also failed:', restError);
    }
    
    // If both methods fail, return null
    console.error('All token verification methods failed');
    return null;
  }
};
