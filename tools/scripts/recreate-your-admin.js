/**
 * Recreate Your Admin User Script
 * 
 * This script deletes the existing user and recreates it with your credentials.
 * 
 * Usage: node tools/scripts/recreate-your-admin.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, deleteUser } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc, collection, getDocs, writeBatch } = require('firebase/firestore');

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

async function recreateYourAdmin() {
  console.log('🔥 Recreating your admin user...\n');
  
  const email = 'afouadsoftwareengineer@gmail.com';
  const password = 'zatonafoushware$8888';
  const name = 'Admin User';

  try {
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`👤 Name: ${name}\n`);

    // Step 1: Clean up existing admin documents
    console.log('Step 1: Cleaning up existing admin documents...');
    const adminsRef = collection(db, 'admins');
    const adminsSnapshot = await getDocs(adminsRef);
    
    let deletedCount = 0;
    const batch = writeBatch(db);
    
    adminsSnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      if (data.email === email) {
        console.log(`   🗑️  Deleting admin document: ${docSnapshot.id}`);
        batch.delete(docSnapshot.ref);
        deletedCount++;
      }
    });
    
    if (deletedCount > 0) {
      await batch.commit();
      console.log(`   ✅ Deleted ${deletedCount} admin document(s)`);
    } else {
      console.log('   ✅ No existing admin documents found');
    }

    // Step 2: Try to create the user (this will fail if user exists)
    console.log('\nStep 2: Attempting to create user...');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('✅ User created successfully');
      
      // Update profile
      await updateProfile(user, { displayName: name });
      console.log('✅ User profile updated');
      
      // Create admin document
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
      console.log('✅ Admin document created');
      
      console.log('\n🎉 Admin user created successfully!');
      console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
      console.log('📧 Email: afouadsoftwareengineer@gmail.com');
      console.log('🔑 Password: zatonafoushware$8888');
      
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('❌ User already exists and cannot be deleted programmatically');
        console.log('\n💡 Manual steps required:');
        console.log('1. Go to Firebase Console: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
        console.log('2. Find the user: afouadsoftwareengineer@gmail.com');
        console.log('3. Delete the user');
        console.log('4. Run this script again');
        console.log('\nAlternatively, you can:');
        console.log('1. Reset the password in Firebase Console');
        console.log('2. Use the new password to sign in');
        console.log('3. The admin role will be created automatically');
      } else {
        throw error;
      }
    }

  } catch (error) {
    console.error('\n❌ Error recreating admin:', error.message);
  }
}

recreateYourAdmin();
