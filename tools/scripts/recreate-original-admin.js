/**
 * Recreate Original Admin Script
 * 
 * This script deletes the existing user and recreates it with the original credentials.
 * 
 * Usage: node tools/scripts/recreate-original-admin.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc, deleteDoc } = require('firebase/firestore');
const crypto = require('crypto');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "76366138630",
  appId: "1:76366138630:web:0f3381c2f5a62e0401e287",
  measurementId: "G-XZ5VKFGG4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function recreateOriginalAdmin() {
  console.log('🔥 Recreating Original Admin User\n');
  
  const email = 'afouadsoftwareengineer@gmail.com';
  const password = 'zatonafoushware$8888';
  const name = 'Admin User';

  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Password: ${password}`);
  console.log(`👤 Name: ${name}\n`);

  try {
    // Step 1: Try to sign in with current credentials to get user ID
    console.log('Step 1: Attempting to sign in to get user ID...');
    let existingUserId = null;
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      existingUserId = userCredential.user.uid;
      console.log('✅ Successfully signed in with current credentials');
      console.log(`   User ID: ${existingUserId}`);
    } catch (error) {
      console.log('❌ Cannot sign in with current credentials');
      console.log(`   Error: ${error.message}`);
      
      // Try to find user by email in Firestore admins collection
      console.log('\nStep 1b: Searching for existing admin user in Firestore...');
      const { collection, query, where, getDocs } = require('firebase/firestore');
      const adminsRef = collection(db, 'admins');
      const q = query(adminsRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const adminDoc = querySnapshot.docs[0];
        existingUserId = adminDoc.id;
        console.log(`✅ Found existing admin user in Firestore: ${existingUserId}`);
      } else {
        console.log('❌ No existing admin user found in Firestore');
      }
    }

    // Step 2: Delete existing admin document from Firestore if it exists
    if (existingUserId) {
      console.log('\nStep 2: Deleting existing admin document from Firestore...');
      try {
        const adminDocRef = doc(db, 'admins', existingUserId);
        await deleteDoc(adminDocRef);
        console.log('✅ Existing admin document deleted from Firestore');
      } catch (error) {
        console.log('⚠️  Could not delete admin document:', error.message);
      }
    }

    // Step 3: Create password hash
    console.log('\nStep 3: Creating password hash...');
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    console.log(`   Password Hash: ${passwordHash.substring(0, 20)}...`);

    // Step 4: Create new user in Firebase Authentication
    console.log('\nStep 4: Creating new user in Firebase Authentication...');
    let userCredential;
    
    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ New user created successfully in Firebase Authentication');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('❌ Email is still in use. You need to delete the user manually from Firebase Console.');
        console.log('\n🔧 MANUAL DELETION REQUIRED:');
        console.log('1. Go to: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
        console.log('2. Find the user: afouadsoftwareengineer@gmail.com');
        console.log('3. Click on the user');
        console.log('4. Click "Delete user"');
        console.log('5. Confirm deletion');
        console.log('6. Run this script again');
        return;
      } else {
        throw error;
      }
    }

    const user = userCredential.user;
    console.log(`   User ID: ${user.uid}`);
    console.log(`   Email: ${user.email}`);

    // Step 5: Update user profile
    console.log('\nStep 5: Updating user profile...');
    await updateProfile(user, { displayName: name });
    console.log('✅ User profile updated');

    // Step 6: Create admin document in Firestore
    console.log('\nStep 6: Creating admin role in Firestore...');
    const adminDocRef = doc(db, 'admins', user.uid);
    
    const adminData = {
      id: user.uid,
      email: user.email,
      name: name,
      role: 'admin',
      permissions: ['all'],
      isActive: true,
      passwordHash: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(adminDocRef, adminData);
    console.log('✅ Admin role created in Firestore');

    // Step 7: Verify setup
    console.log('\nStep 7: Verifying admin setup...');
    const adminDoc = await getDoc(adminDocRef);
    
    if (adminDoc.exists()) {
      const adminData = adminDoc.data();
      console.log('✅ Admin setup verified!');
      console.log('📊 Admin Details:');
      console.log(`   Email: ${adminData.email}`);
      console.log(`   Role: ${adminData.role}`);
      console.log(`   Permissions: ${adminData.permissions.join(', ')}`);
      console.log(`   Active: ${adminData.isActive}`);
      console.log(`   Password Hash: ${adminData.passwordHash ? 'Set' : 'Not set'}`);
    }

    // Step 8: Test login
    console.log('\nStep 8: Testing login...');
    try {
      const testCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login test successful!');
      console.log('🎉 Everything is working correctly!');
      
      console.log('\n🎉 ORIGINAL ADMIN USER RECREATED SUCCESSFULLY!');
      console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
      console.log(`📧 Email: ${email}`);
      console.log(`🔑 Password: ${password}`);
      
      console.log('\n✅ You can now log in to the admin panel with your original credentials!');
      
      // Save credentials to file for reference
      const fs = require('fs');
      const credentials = {
        email: email,
        password: password,
        timestamp: new Date().toISOString(),
        adminPanelUrl: 'http://localhost:3001/admin/login'
      };
      
      fs.writeFileSync('admin-credentials.json', JSON.stringify(credentials, null, 2));
      console.log('\n📄 Credentials saved to admin-credentials.json');
      
    } catch (loginError) {
      console.log('❌ Login test failed:', loginError.message);
      console.log('💡 Please try logging in manually to the admin panel.');
    }

  } catch (error) {
    console.error('\n❌ Error recreating admin user:', error.message);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('\n💡 The email is still in use. You need to delete the user manually from Firebase Console.');
      console.log('\n🔧 MANUAL DELETION REQUIRED:');
      console.log('1. Go to: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
      console.log('2. Find the user: afouadsoftwareengineer@gmail.com');
      console.log('3. Click on the user');
      console.log('4. Click "Delete user"');
      console.log('5. Confirm deletion');
      console.log('6. Run this script again');
    } else if (error.code === 'auth/weak-password') {
      console.log('\n💡 Password is too weak. Please use a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('\n💡 Invalid email format. Please check the email address.');
    } else if (error.code === 'auth/network-request-failed') {
      console.log('\n💡 Network error. Please check your internet connection.');
    }
  }
}

recreateOriginalAdmin();
