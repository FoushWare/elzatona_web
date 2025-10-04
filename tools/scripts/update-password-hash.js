/**
 * Update Password Hash Script
 * 
 * This script updates the admin user's password and creates a proper hash.
 * 
 * Usage: node tools/scripts/update-password-hash.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, updatePassword } = require('firebase/auth');
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

async function updatePasswordHash() {
  console.log('🔥 Updating Password and Hash...\n');
  
  const email = 'afouadsoftwareengineer@gmail.com';
  const newPassword = 'zatonafoushware$8888';
  const name = 'Admin User';

  try {
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 New Password: ${newPassword}`);
    console.log(`👤 Name: ${name}\n`);

    // Step 1: Try to sign in with current credentials
    console.log('Step 1: Attempting to sign in with current credentials...');
    let userCredential;
    
    try {
      // Try with the new password first
      userCredential = await signInWithEmailAndPassword(auth, email, newPassword);
      console.log('✅ Successfully signed in with new password');
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        console.log('❌ Cannot sign in with current credentials');
        console.log('💡 You need to reset the password in Firebase Console first');
        console.log('🔗 Firebase Console: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
        console.log('\nSteps to reset:');
        console.log('1. Go to Firebase Console');
        console.log('2. Find the user: afouadsoftwareengineer@gmail.com');
        console.log('3. Click "Reset password" or "Edit"');
        console.log('4. Set password to: zatonafoushware$8888');
        console.log('5. Save changes');
        console.log('6. Run this script again');
        return;
      } else {
        throw error;
      }
    }

    const user = userCredential.user;
    console.log(`   User ID: ${user.uid}`);
    console.log(`   Email: ${user.email}`);

    // Step 2: Update password (this will hash it properly in Firebase)
    console.log('\nStep 2: Updating password in Firebase...');
    try {
      await updatePassword(user, newPassword);
      console.log('✅ Password updated successfully in Firebase');
    } catch (error) {
      console.log('⚠️  Could not update password:', error.message);
      console.log('   This might be because the password is already correct');
    }

    // Step 3: Create password hash for Firestore (if needed)
    console.log('\nStep 3: Creating password hash...');
    const passwordHash = crypto.createHash('sha256').update(newPassword).digest('hex');
    console.log(`   Password Hash: ${passwordHash.substring(0, 20)}...`);

    // Step 4: Create or update admin document in Firestore
    console.log('\nStep 4: Creating/updating admin role in Firestore...');
    const adminDocRef = doc(db, 'admins', user.uid);
    
    const adminData = {
      id: user.uid,
      email: user.email,
      name: user.displayName || name,
      role: 'admin',
      permissions: ['all'],
      isActive: true,
      passwordHash: passwordHash, // Store the hash
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(adminDocRef, adminData);
    console.log('✅ Admin role created/updated in Firestore');

    // Step 5: Verify setup
    console.log('\nStep 5: Verifying admin setup...');
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
      
      console.log('\n🎉 Password update complete!');
      console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
      console.log(`📧 Email: ${email}`);
      console.log(`🔑 Password: ${newPassword}`);
      
      console.log('\n✅ You can now log in to the admin panel!');
    }

  } catch (error) {
    console.error('\n❌ Error updating password:', error.message);
    
    if (error.code === 'auth/network-request-failed') {
      console.log('\n💡 Network error. Please check your internet connection.');
    } else if (error.code === 'auth/requires-recent-login') {
      console.log('\n💡 Recent login required. Please sign out and sign in again.');
    } else {
      console.log('\n💡 Please check your internet connection and try again.');
    }
  }
}

updatePasswordHash();
