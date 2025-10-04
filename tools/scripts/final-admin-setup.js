/**
 * Final Admin Setup Script
 * 
 * This script creates a working admin user and tests it immediately.
 * 
 * Usage: node tools/scripts/final-admin-setup.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } = require('firebase/auth');
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

async function finalAdminSetup() {
  console.log('🔥 Final Admin Setup\n');
  
  // Generate unique email
  const timestamp = Date.now();
  const email = `admin${timestamp}@elzatona.com`;
  const password = 'zatonafoushware$8888';
  const name = 'Admin User';

  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Password: ${password}`);
  console.log(`👤 Name: ${name}\n`);

  try {
    // Step 1: Create password hash
    console.log('Step 1: Creating password hash...');
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    console.log(`   Password Hash: ${passwordHash.substring(0, 20)}...`);

    // Step 2: Create user in Firebase Authentication
    console.log('\nStep 2: Creating user in Firebase Authentication...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('✅ User created successfully in Firebase Authentication');
    console.log(`   User ID: ${user.uid}`);
    console.log(`   Email: ${user.email}`);

    // Step 3: Update user profile
    console.log('\nStep 3: Updating user profile...');
    await updateProfile(user, { displayName: name });
    console.log('✅ User profile updated');

    // Step 4: Create admin document in Firestore
    console.log('\nStep 4: Creating admin role in Firestore...');
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
    }

    // Step 6: Test login
    console.log('\nStep 6: Testing login...');
    try {
      const testCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login test successful!');
      console.log('🎉 Everything is working correctly!');
      
      console.log('\n🎉 ADMIN SETUP COMPLETE!');
      console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
      console.log(`📧 Email: ${email}`);
      console.log(`🔑 Password: ${password}`);
      
      console.log('\n✅ You can now log in to the admin panel!');
      
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
    console.error('\n❌ Error creating admin user:', error.message);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('\n💡 The email is already in use. This is unexpected.');
    } else if (error.code === 'auth/weak-password') {
      console.log('\n💡 Password is too weak. Please use a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('\n💡 Invalid email format. Please check the email address.');
    } else if (error.code === 'auth/network-request-failed') {
      console.log('\n💡 Network error. Please check your internet connection.');
    }
  }
}

finalAdminSetup();
