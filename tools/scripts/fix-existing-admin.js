/**
 * Fix Existing Admin Script
 * 
 * This script handles the existing admin user by either:
 * 1. Creating admin role for existing user (if we can sign in)
 * 2. Providing instructions to delete and recreate
 * 
 * Usage: node tools/scripts/fix-existing-admin.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');
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

async function fixExistingAdmin() {
  console.log('🔥 Fixing Existing Admin User...\n');
  
  const email = 'afouadsoftwareengineer@gmail.com';
  const password = 'zatonafoushware$8888';
  const name = 'Admin User';

  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Password: ${password}`);
  console.log(`👤 Name: ${name}\n`);

  // Step 1: Try to sign in with the password
  console.log('Step 1: Attempting to sign in with provided password...');
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('✅ Successfully signed in!');
    console.log(`   User ID: ${user.uid}`);
    console.log(`   Email: ${user.email}`);

    // Step 2: Create password hash
    console.log('\nStep 2: Creating password hash...');
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    console.log(`   Password Hash: ${passwordHash.substring(0, 20)}...`);

    // Step 3: Create admin document in Firestore
    console.log('\nStep 3: Creating admin role in Firestore...');
    const adminDocRef = doc(db, 'admins', user.uid);
    
    const adminData = {
      id: user.uid,
      email: user.email,
      name: user.displayName || name,
      role: 'admin',
      permissions: ['all'],
      isActive: true,
      passwordHash: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(adminDocRef, adminData);
    console.log('✅ Admin role created in Firestore');

    // Step 4: Verify setup
    console.log('\nStep 4: Verifying admin setup...');
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
      
      console.log('\n🎉 Admin user fixed successfully!');
      console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
      console.log(`📧 Email: ${email}`);
      console.log(`🔑 Password: ${password}`);
      
      console.log('\n✅ You can now log in to the admin panel!');
    }

  } catch (error) {
    console.log('❌ Cannot sign in with provided password');
    console.log('\n💡 The user exists but with different credentials.');
    console.log('\n🔧 SOLUTION OPTIONS:');
    console.log('\nOption 1: Reset Password in Firebase Console (Recommended)');
    console.log('1. Go to: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
    console.log('2. Find the user: afouadsoftwareengineer@gmail.com');
    console.log('3. Click on the user');
    console.log('4. Click "Reset password" or "Edit"');
    console.log('5. Set password to: zatonafoushware$8888');
    console.log('6. Save changes');
    console.log('7. Run this script again');
    
    console.log('\nOption 2: Delete and Recreate User');
    console.log('1. Go to: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
    console.log('2. Find the user: afouadsoftwareengineer@gmail.com');
    console.log('3. Click on the user');
    console.log('4. Click "Delete user"');
    console.log('5. Confirm deletion');
    console.log('6. Run: node tools/scripts/create-admin-with-hash.js');
    
    console.log('\nOption 3: Use Different Email');
    console.log('1. Run: node tools/scripts/configurable-admin-setup.js');
    console.log('2. Enter a different email address');
    console.log('3. Use the same password: zatonafoushware$8888');
    
    console.log('\n🔗 Firebase Console: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
  }
}

fixExistingAdmin();
