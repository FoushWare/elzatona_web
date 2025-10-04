/**
 * Complete Admin Setup Script
 * 
 * This script provides multiple options to complete the admin setup:
 * 1. Try to fix existing user
 * 2. Create new admin user
 * 3. Provide manual instructions
 * 
 * Usage: node tools/scripts/complete-admin-setup.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');
const crypto = require('crypto');
const readline = require('readline');

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function completeAdminSetup() {
  console.log('🔥 Complete Admin Setup\n');
  
  const originalEmail = 'afouadsoftwareengineer@gmail.com';
  const password = 'zatonafoushware$8888';
  const name = 'Admin User';

  console.log('📧 Original Email: afouadsoftwareengineer@gmail.com');
  console.log('🔑 Password: zatonafoushware$8888');
  console.log('👤 Name: Admin User\n');

  // Step 1: Try to sign in with original credentials
  console.log('Step 1: Testing original credentials...');
  try {
    const userCredential = await signInWithEmailAndPassword(auth, originalEmail, password);
    const user = userCredential.user;
    
    console.log('✅ Successfully signed in with original credentials!');
    console.log(`   User ID: ${user.uid}`);
    console.log(`   Email: ${user.email}`);

    // Create admin role
    await createAdminRole(user, password);
    return;

  } catch (error) {
    console.log('❌ Cannot sign in with original credentials');
    console.log(`   Error: ${error.message}\n`);
  }

  // Step 2: Try alternative email
  console.log('Step 2: Trying alternative email...');
  const alternativeEmail = 'admin@elzatona.com';
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, alternativeEmail, password);
    const user = userCredential.user;
    
    console.log('✅ Successfully created alternative admin user!');
    console.log(`   User ID: ${user.uid}`);
    console.log(`   Email: ${user.email}`);

    await updateProfile(user, { displayName: name });
    await createAdminRole(user, password);
    
    console.log('\n🎉 Alternative admin user created successfully!');
    console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
    console.log(`📧 Email: ${alternativeEmail}`);
    console.log(`🔑 Password: ${password}`);
    return;

  } catch (error) {
    console.log('❌ Cannot create alternative user');
    console.log(`   Error: ${error.message}\n`);
  }

  // Step 3: Provide manual instructions
  console.log('Step 3: Manual setup required\n');
  console.log('🔧 MANUAL SETUP INSTRUCTIONS:');
  console.log('\nOption A: Reset Password in Firebase Console');
  console.log('1. Go to: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
  console.log('2. Find the user: afouadsoftwareengineer@gmail.com');
  console.log('3. Click on the user');
  console.log('4. Click "Reset password" or "Edit"');
  console.log('5. Set password to: zatonafoushware$8888');
  console.log('6. Save changes');
  console.log('7. Run: node tools/scripts/test-admin-login-final.js');

  console.log('\nOption B: Delete and Recreate User');
  console.log('1. Go to: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
  console.log('2. Find the user: afouadsoftwareengineer@gmail.com');
  console.log('3. Click on the user');
  console.log('4. Click "Delete user"');
  console.log('5. Confirm deletion');
  console.log('6. Run: node tools/scripts/create-admin-with-hash.js');

  console.log('\nOption C: Use Different Email');
  console.log('1. Run: node tools/scripts/configurable-admin-setup.js');
  console.log('2. Enter a different email address');
  console.log('3. Use password: zatonafoushware$8888');

  console.log('\nOption D: Create Admin Role Only (if user exists)');
  const createRoleOnly = await askQuestion('\nDo you want to create admin role for existing user? (y/n): ');
  
  if (createRoleOnly.toLowerCase() === 'y') {
    const email = await askQuestion('Enter the email of the existing user: ');
    const userPassword = await askQuestion('Enter the password for this user: ');
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, userPassword);
      const user = userCredential.user;
      
      console.log('✅ Successfully signed in!');
      await createAdminRole(user, userPassword);
      
    } catch (error) {
      console.log('❌ Cannot sign in with provided credentials');
      console.log(`   Error: ${error.message}`);
    }
  }

  rl.close();
}

async function createAdminRole(user, password) {
  console.log('\nCreating admin role in Firestore...');
  
  // Create password hash
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
  console.log(`   Password Hash: ${passwordHash.substring(0, 20)}...`);

  // Create admin document
  const adminDocRef = doc(db, 'admins', user.uid);
  
  const adminData = {
    id: user.uid,
    email: user.email,
    name: user.displayName || 'Admin User',
    role: 'admin',
    permissions: ['all'],
    isActive: true,
    passwordHash: passwordHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await setDoc(adminDocRef, adminData);
  console.log('✅ Admin role created in Firestore');

  // Verify setup
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
    
    console.log('\n🎉 Admin user setup complete!');
    console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
    console.log(`📧 Email: ${user.email}`);
    console.log(`🔑 Password: ${password}`);
    
    console.log('\n✅ You can now log in to the admin panel!');
  }
}

completeAdminSetup();
