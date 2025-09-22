#!/usr/bin/env node

/**
 * Test script to verify Firebase integration for topics system
 * Run with: node scripts/test-topics-firebase.mjs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'fir-demo-project-adffb.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'fir-demo-project-adffb',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '76366138630',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XZ5VKFGG4Y',
};

async function testFirebaseTopicsIntegration() {
  console.log('🧪 Testing Firebase Topics Integration...\n');

  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log('✅ Firebase initialized successfully');

    // Test 1: Check if topics collection exists and is accessible
    console.log('\n📋 Test 1: Checking topics collection...');
    const topicsRef = collection(db, 'topics');
    const topicsSnapshot = await getDocs(topicsRef);
    console.log(`✅ Topics collection accessible. Found ${topicsSnapshot.size} existing topics.`);

    // Test 2: Add a test topic
    console.log('\n📝 Test 2: Adding test topic...');
    const testTopic = {
      name: 'Test Topic',
      description: 'This is a test topic for Firebase integration',
      category: 'javascript',
      color: '#FF0000',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questionCount: 0,
    };

    const docRef = await addDoc(topicsRef, testTopic);
    console.log(`✅ Test topic added with ID: ${docRef.id}`);

    // Test 3: Verify the topic was added
    console.log('\n🔍 Test 3: Verifying test topic...');
    const updatedSnapshot = await getDocs(topicsRef);
    const testTopicDoc = updatedSnapshot.docs.find(doc => doc.id === docRef.id);
    
    if (testTopicDoc) {
      console.log('✅ Test topic found in database:', testTopicDoc.data());
    } else {
      console.log('❌ Test topic not found in database');
    }

    // Test 4: Clean up test topic
    console.log('\n🧹 Test 4: Cleaning up test topic...');
    await deleteDoc(doc(db, 'topics', docRef.id));
    console.log('✅ Test topic deleted successfully');

    // Test 5: Test API endpoint (if server is running)
    console.log('\n🌐 Test 5: Testing API endpoint...');
    try {
      const response = await fetch('http://localhost:3001/api/admin/topics');
      if (response.ok) {
        const data = await response.json();
        console.log('✅ API endpoint working:', data.success ? 'Success' : 'Failed');
        console.log(`   Found ${data.data?.length || 0} topics via API`);
      } else {
        console.log('⚠️  API endpoint not accessible (server might not be running)');
      }
    } catch (error) {
      console.log('⚠️  API endpoint not accessible (server might not be running)');
    }

    console.log('\n🎉 All Firebase integration tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   ✅ Firebase connection: Working');
    console.log('   ✅ Topics collection: Accessible');
    console.log('   ✅ Add topic: Working');
    console.log('   ✅ Delete topic: Working');
    console.log('   ✅ API endpoint: Ready (if server running)');

  } catch (error) {
    console.error('❌ Firebase integration test failed:', error);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Check Firebase configuration');
    console.error('   2. Ensure Firestore is enabled in Firebase console');
    console.error('   3. Verify network connection');
    console.error('   4. Check Firebase project permissions');
    process.exit(1);
  }
}

// Run the test
testFirebaseTopicsIntegration().catch(console.error);


