/**
 * Configurable Admin Setup Script
 * 
 * This script allows you to create an admin user with any email and password.
 * 
 * Usage: node tools/scripts/configurable-admin-setup.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');
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

async function configurableAdminSetup() {
  console.log('🔥 Configurable Admin Setup\n');
  
  console.log('Enter the admin credentials you want to use:');
  const email = await askQuestion('Admin Email: ');
  const password = await askQuestion('Admin Password (min 6 characters): ');
  const name = await askQuestion('Admin Name: ');

  try {
    console.log(`\n📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`👤 Name: ${name}\n`);

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
      
      console.log('\n🎉 Admin user created successfully!');
      console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
      console.log(`📧 Email: ${email}`);
      console.log(`🔑 Password: ${password}`);
      
      console.log('\n✅ You can now log in to the admin panel!');
    }

  } catch (error) {
    console.error('\n❌ Error creating admin user:', error.message);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('\n💡 The email is already in use. Please try a different email.');
    } else if (error.code === 'auth/weak-password') {
      console.log('\n💡 Password is too weak. Please use a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('\n💡 Invalid email format. Please check the email address.');
    } else if (error.code === 'auth/network-request-failed') {
      console.log('\n💡 Network error. Please check your internet connection.');
    }
  } finally {
    rl.close();
  }
}

configurableAdminSetup();