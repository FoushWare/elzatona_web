/**
 * Admin Setup Guide
 * 
 * This script provides a comprehensive guide for setting up admin access
 * and includes all necessary testing to prevent authentication errors.
 */

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "76366138630",
  appId: "1:76366138630:web:0f3381c2f5a62e0401e287",
  measurementId: "G-XZ5VKFGG4Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const TARGET_CREDENTIALS = {
  email: 'afouadsoftwareengineer@gmail.com',
  password: 'zatonafoushware$8888',
  name: 'Admin User'
};

async function adminSetupGuide() {
  console.log('🔥 Elzatona Admin Setup Guide');
  console.log('================================');
  console.log('');
  console.log('Target Credentials:');
  console.log(`📧 Email: ${TARGET_CREDENTIALS.email}`);
  console.log(`🔑 Password: ${TARGET_CREDENTIALS.password}`);
  console.log('');

  // Step 1: Test current credentials
  console.log('Step 1: Testing current credentials...');
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      TARGET_CREDENTIALS.email,
      TARGET_CREDENTIALS.password
    );
    
    console.log('✅ SUCCESS! Credentials are working!');
    console.log(`📧 User ID: ${userCredential.user.uid}`);
    console.log(`📧 Email: ${userCredential.user.email}`);
    
    // Check admin role
    const adminDocRef = doc(db, 'admins', userCredential.user.uid);
    const adminDoc = await getDoc(adminDocRef);
    
    if (adminDoc.exists()) {
      const adminData = adminDoc.data();
      console.log('✅ Admin role found:');
      console.log(`   - Role: ${adminData.role}`);
      console.log(`   - Permissions: ${adminData.permissions}`);
      console.log(`   - Active: ${adminData.isActive}`);
    } else {
      console.log('⚠️  Admin role not found, creating...');
      await setDoc(adminDocRef, {
        email: userCredential.user.email,
        name: TARGET_CREDENTIALS.name,
        role: 'admin',
        permissions: ['all'],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      });
      console.log('✅ Admin role created!');
    }
    
    console.log('');
    console.log('🎉 Admin setup is complete!');
    console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
    return;
    
  } catch (error) {
    console.log('❌ Current credentials are not working.');
    console.log(`   Error: ${error.message}`);
    console.log('');
  }

  // Step 2: Try to create the user
  console.log('Step 2: Attempting to create user...');
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      TARGET_CREDENTIALS.email,
      TARGET_CREDENTIALS.password
    );
    
    console.log('✅ User created successfully!');
    console.log(`📧 User ID: ${userCredential.user.uid}`);
    
    // Create admin role
    const adminDocRef = doc(db, 'admins', userCredential.user.uid);
    await setDoc(adminDocRef, {
      email: userCredential.user.email,
      name: TARGET_CREDENTIALS.name,
      role: 'admin',
      permissions: ['all'],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });
    console.log('✅ Admin role created!');
    
    console.log('');
    console.log('🎉 Admin setup is complete!');
    console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
    return;
    
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️  User already exists with different credentials.');
    } else {
      console.log(`❌ Error creating user: ${error.message}`);
    }
    console.log('');
  }

  // Step 3: Manual setup required
  console.log('Step 3: Manual setup required');
  console.log('=============================');
  console.log('');
  console.log('The user exists but with different credentials. Please follow these steps:');
  console.log('');
  console.log('1. Go to Firebase Console:');
  console.log('   https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
  console.log('');
  console.log('2. Find the user with email: afouadsoftwareengineer@gmail.com');
  console.log('');
  console.log('3. Click on the user and select "Reset Password"');
  console.log('');
  console.log('4. Set the new password to: zatonafoushware$8888');
  console.log('');
  console.log('5. Go to Firestore Database:');
  console.log('   https://console.firebase.google.com/project/fir-demo-project-adffb/firestore/data');
  console.log('');
  console.log('6. Create a collection called "admins" (if it doesn\'t exist)');
  console.log('');
  console.log('7. Add a document with the user\'s UID as the document ID');
  console.log('   Document ID: [User\'s UID from step 2]');
  console.log('   Document data:');
  console.log('   {');
  console.log('     "email": "afouadsoftwareengineer@gmail.com",');
  console.log('     "name": "Admin User",');
  console.log('     "role": "admin",');
  console.log('     "permissions": ["all"],');
  console.log('     "createdAt": "2024-01-01T00:00:00.000Z",');
  console.log('     "updatedAt": "2024-01-01T00:00:00.000Z",');
  console.log('     "isActive": true');
  console.log('   }');
  console.log('');
  console.log('8. Run this script again to verify the setup');
  console.log('');
  console.log('Alternative: Use the working admin credentials:');
  console.log('📧 Email: admin@elzatona.com');
  console.log('🔑 Password: admin123456');
  console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
}

adminSetupGuide();
