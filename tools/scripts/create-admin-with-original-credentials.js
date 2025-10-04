const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
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

async function createAdminWithOriginalCredentials() {
  console.log('🔥 Creating admin user with original credentials...');
  
  const email = 'afouadsoftwareengineer@gmail.com';
  const password = 'zatonafoushware$8888';
  const name = 'Admin User';

  try {
    // First, try to create the user
    console.log('📧 Creating user in Firebase Auth...');
    let userCredential;
    
    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ User created successfully');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('ℹ️  User already exists. Attempting to sign in...');
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('✅ Sign in successful with existing user');
      } else {
        throw error;
      }
    }

    const user = userCredential.user;
    console.log(`📧 User ID: ${user.uid}`);
    console.log(`📧 Email: ${user.email}`);

    // Create or update admin role in Firestore
    console.log('📝 Creating/updating admin role in Firestore...');
    const adminDocRef = doc(db, 'admins', user.uid);
    const existingAdminDoc = await getDoc(adminDocRef);
    
    if (existingAdminDoc.exists()) {
      console.log('ℹ️  Admin role already exists, updating...');
      await setDoc(adminDocRef, {
        email: user.email,
        name: name,
        role: 'admin',
        permissions: ['all'],
        updatedAt: new Date(),
        isActive: true,
      }, { merge: true });
    } else {
      console.log('📝 Creating new admin role...');
      await setDoc(adminDocRef, {
        email: user.email,
        name: name,
        role: 'admin',
        permissions: ['all'],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      });
    }
    console.log('✅ Admin role created/updated in Firestore');

    // Verify the setup
    console.log('🔍 Verifying admin setup...');
    const verifyAdminDoc = await getDoc(adminDocRef);
    if (verifyAdminDoc.exists()) {
      const adminData = verifyAdminDoc.data();
      console.log('✅ Admin verification successful:');
      console.log(`   - Role: ${adminData.role}`);
      console.log(`   - Permissions: ${adminData.permissions}`);
      console.log(`   - Active: ${adminData.isActive}`);
    }

    console.log(`\n🎉 Admin user setup completed successfully!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`🔗 Admin Panel: http://localhost:3001/admin/login`);

  } catch (error) {
    console.error('❌ Error details:', error.message);
    if (error.code === 'auth/weak-password') {
      console.log('❌ Password is too weak. Please use a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('❌ Invalid email address.');
    } else if (error.code === 'auth/network-request-failed') {
      console.log('❌ Network error. Please check your internet connection.');
    }
  }
}

createAdminWithOriginalCredentials();
