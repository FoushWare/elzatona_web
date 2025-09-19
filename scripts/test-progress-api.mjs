#!/usr/bin/env node

/**
 * Test script to verify the progress saving API endpoint
 */

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testProgressAPI() {
  console.log('🧪 Testing Progress API endpoint...\n');

  try {
    // Step 1: Authenticate user
    console.log('1️⃣ Authenticating user...');
    const testEmail = `test-progress-${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    
    let userCredential;
    try {
      userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
      console.log(`✅ User created: ${userCredential.user.uid}`);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        userCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
        console.log(`✅ User signed in: ${userCredential.user.uid}`);
      } else {
        throw error;
      }
    }
    
    const user = userCredential.user;
    const token = await user.getIdToken();
    console.log('✅ Firebase token obtained\n');

    // Step 2: Test progress saving API
    console.log('2️⃣ Testing progress saving API...');
    
    const progressData = {
      userId: user.uid,
      sessionId: `test-session-${Date.now()}`,
      questionId: 'test-question-1',
      answer: 1,
      isCorrect: true,
      timeSpent: 30,
      section: 'HTML',
      difficulty: 'easy',
      timestamp: Date.now(),
      learningMode: 'guided',
      planId: 'test-plan-1',
    };

    // First, set the auth cookie
    console.log('3️⃣ Setting auth cookie...');
    const cookieResponse = await fetch('http://localhost:3000/api/auth/set-cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!cookieResponse.ok) {
      throw new Error(`Failed to set cookie: ${cookieResponse.status}`);
    }
    console.log('✅ Auth cookie set successfully\n');

    // Debug: Check what cookies are available
    console.log('4️⃣ Debug: Checking cookies...');
    const cookieCheckResponse = await fetch('http://localhost:3000/api/auth/session', {
      method: 'GET',
      credentials: 'include',
    });
    const cookieCheckResult = await cookieCheckResponse.json();
    console.log('📄 Session check result:', cookieCheckResult);

    // Now test the progress saving
    console.log('5️⃣ Saving progress...');
    const progressResponse = await fetch('http://localhost:3000/api/progress/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progressData),
      credentials: 'include', // Include cookies
    });

    console.log(`Response status: ${progressResponse.status}`);
    
    if (!progressResponse.ok) {
      const errorData = await progressResponse.json();
      console.error('❌ Progress save failed:', errorData);
      throw new Error(`Progress save failed: ${progressResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const result = await progressResponse.json();
    console.log('✅ Progress saved successfully!');
    console.log('📄 Response:', result);

    // Step 3: Test progress retrieval
    console.log('\n6️⃣ Testing progress retrieval...');
    const getResponse = await fetch('http://localhost:3000/api/progress/get', {
      method: 'GET',
      credentials: 'include',
    });

    if (!getResponse.ok) {
      const errorData = await getResponse.json();
      console.error('❌ Progress retrieval failed:', errorData);
    } else {
      const progressResult = await getResponse.json();
      console.log('✅ Progress retrieved successfully!');
      console.log('📄 Progress data:', progressResult);
    }

    console.log('\n🎉 All progress API tests completed successfully!');

  } catch (error) {
    console.error('❌ Progress API test failed:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

// Check if the development server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000/api/auth/session');
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Run the test
async function main() {
  console.log('🔍 Checking if development server is running...');
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Development server is not running!');
    console.log('Please start the development server with: npm run dev');
    process.exit(1);
  }
  
  console.log('✅ Development server is running\n');
  await testProgressAPI();
}

main().catch(console.error);
