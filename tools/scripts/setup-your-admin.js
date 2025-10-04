/**
 * Setup Your Admin User Script
 * 
 * This script creates your admin user with the specified credentials.
 * 
 * Usage: node tools/scripts/setup-your-admin.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc, deleteDoc, collection, getDocs, writeBatch } = require('firebase/firestore');

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

async function setupYourAdmin() {
  console.log('🔥 Setting up your admin user...\n');
  
  const email = 'afouadsoftwareengineer@gmail.com';
  const password = 'zatonafoushware$8888';
  const name = 'Admin User';

  try {
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`👤 Name: ${name}\n`);

    // Step 1: Try to create the user
    console.log('Step 1: Creating user in Firebase Authentication...');
    let userCredential;
    
    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ User created successfully in Firebase Authentication');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('ℹ️  User already exists in Firebase Authentication');
        console.log('   Attempting to sign in to get user details...');
        
        try {
          userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log('✅ Successfully signed in with existing credentials');
        } catch (signInError) {
          console.log('❌ Cannot sign in with existing credentials');
          console.log('   This means the password is different or the account has issues');
          console.log('   You may need to reset the password through Firebase Console');
          console.log('   🔗 Firebase Console: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
          throw signInError;
        }
      } else {
        throw error;
      }
    }

    const user = userCredential.user;
    console.log(`   User ID: ${user.uid}`);
    console.log(`   Email: ${user.email}`);

    // Step 2: Update user profile
    console.log('\nStep 2: Updating user profile...');
    try {
      await updateProfile(user, { displayName: name });
      console.log('✅ User profile updated');
    } catch (error) {
      console.log('⚠️  Could not update profile:', error.message);
    }

    // Step 3: Clean up any existing admin documents for this email
    console.log('\nStep 3: Cleaning up existing admin documents...');
    const adminsRef = collection(db, 'admins');
    const adminsSnapshot = await getDocs(adminsRef);
    
    let deletedCount = 0;
    const batch = writeBatch(db);
    
    adminsSnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      if (data.email === email) {
        console.log(`   🗑️  Deleting old admin document: ${docSnapshot.id}`);
        batch.delete(docSnapshot.ref);
        deletedCount++;
      }
    });
    
    if (deletedCount > 0) {
      await batch.commit();
      console.log(`   ✅ Deleted ${deletedCount} old admin document(s)`);
    } else {
      console.log('   ✅ No old admin documents found');
    }

    // Step 4: Create admin document in Firestore
    console.log('\nStep 4: Creating admin document in Firestore...');
    const adminDocRef = doc(db, 'admins', user.uid);
    
    const adminData = {
      id: user.uid,
      email: user.email,
      name: name,
      role: 'admin',
      permissions: ['all'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(adminDocRef, adminData);
    console.log('✅ Admin document created in Firestore');

    // Step 5: Verify the setup
    console.log('\nStep 5: Verifying admin setup...');
    const adminDoc = await getDoc(adminDocRef);
    
    if (adminDoc.exists()) {
      const adminData = adminDoc.data();
      console.log('✅ Admin setup verified!');
      console.log(`   Email: ${adminData.email}`);
      console.log(`   Role: ${adminData.role}`);
      console.log(`   Permissions: ${adminData.permissions.join(', ')}`);
      console.log(`   Active: ${adminData.isActive}`);
    } else {
      throw new Error('Admin document was not created properly');
    }

    console.log('\n🎉 Admin setup complete!');
    console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
    console.log('📧 Email: afouadsoftwareengineer@gmail.com');
    console.log('🔑 Password: zatonafoushware$8888');

  } catch (error) {
    console.error('\n❌ Error setting up admin:', error.message);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('\n💡 The email is already in use. Possible solutions:');
      console.log('1. Reset the password through Firebase Console');
      console.log('2. Delete the existing user and recreate');
      console.log('3. Use a different email address');
      console.log('\n🔗 Firebase Console: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
    } else if (error.code === 'auth/weak-password') {
      console.log('\n💡 Password is too weak. Please use a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('\n💡 Invalid email format. Please check the email address.');
    }
  }
}

setupYourAdmin();
