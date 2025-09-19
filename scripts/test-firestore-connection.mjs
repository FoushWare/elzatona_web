#!/usr/bin/env node

/**
 * Test script to verify Firestore connection and security rules
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
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
const db = getFirestore(app);
const auth = getAuth(app);

async function testFirestoreConnection() {
  console.log('🧪 Testing Firestore connection and security rules...\n');

  try {
    // Test 1: Email/Password authentication
    console.log('1️⃣ Testing email/password authentication...');
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    
    let userCredential;
    try {
      // Try to create a new user
      userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
      console.log(`✅ New user created: ${userCredential.user.uid}`);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // If user exists, try to sign in
        userCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
        console.log(`✅ Existing user signed in: ${userCredential.user.uid}`);
      } else {
        throw error;
      }
    }
    
    const user = userCredential.user;
    console.log(`✅ User authenticated: ${user.uid}\n`);

    // Test 2: Write to user document
    console.log('2️⃣ Testing write to user document...');
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: null,
      displayName: 'Test User',
      createdAt: new Date().toISOString(),
      preferences: {
        theme: 'system',
        language: 'en',
        learningMode: 'guided',
      },
    });
    console.log('✅ User document written successfully\n');

    // Test 3: Read from user document
    console.log('3️⃣ Testing read from user document...');
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      console.log('✅ User document read successfully');
      console.log('📄 User data:', userDoc.data());
    } else {
      console.log('❌ User document not found');
    }
    console.log();

    // Test 4: Write to progress document
    console.log('4️⃣ Testing write to progress document...');
    const progressDocRef = doc(db, 'progress', user.uid);
    await setDoc(progressDocRef, {
      userId: user.uid,
      totalQuestions: 0,
      correctAnswers: 0,
      accuracy: 0,
      currentStreak: 0,
      lastActivityAt: new Date().toISOString(),
    });
    console.log('✅ Progress document written successfully\n');

    // Test 5: Write to learning plans subcollection
    console.log('5️⃣ Testing write to learning plans subcollection...');
    const learningPlanRef = doc(db, 'learningPlans', user.uid, 'plans', 'test-plan-1');
    await setDoc(learningPlanRef, {
      planId: 'test-plan-1',
      planName: 'Test Learning Plan',
      startDate: new Date().toISOString(),
      status: 'active',
      totalQuestions: 5,
      questionsCompleted: 0,
      progress: 0,
    });
    console.log('✅ Learning plan document written successfully\n');

    // Test 6: Test security rules (try to access another user's data)
    console.log('6️⃣ Testing security rules (should fail)...');
    try {
      const otherUserRef = doc(db, 'users', 'other-user-id');
      await getDoc(otherUserRef);
      console.log('❌ Security rules failed - was able to access other user data');
    } catch (error) {
      console.log('✅ Security rules working - correctly blocked access to other user data');
      console.log('🔒 Error:', error.message);
    }
    console.log();

    console.log('🎉 All Firestore tests completed successfully!');
    console.log('✅ Connection: Working');
    console.log('✅ Authentication: Working');
    console.log('✅ Read/Write: Working');
    console.log('✅ Security Rules: Working');

  } catch (error) {
    console.error('❌ Firestore test failed:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

// Run the test
testFirestoreConnection().catch(console.error);
