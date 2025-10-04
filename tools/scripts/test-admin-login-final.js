const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, getDoc } = require('firebase/firestore');

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

async function testAdminLogin() {
  console.log('🔥 Testing admin login with your credentials...');
  
  const email = 'afouadsoftwareengineer@gmail.com';
  const password = 'zatonafoushware$8888';

  try {
    console.log('📧 Attempting login...');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('✅ Login successful!');
    console.log(`📧 User ID: ${userCredential.user.uid}`);
    console.log(`📧 Email: ${userCredential.user.email}`);

    // Check admin role in Firestore
    console.log('📝 Checking admin role in Firestore...');
    const adminDocRef = doc(db, 'admins', userCredential.user.uid);
    const adminDoc = await getDoc(adminDocRef);
    
    if (adminDoc.exists()) {
      const adminData = adminDoc.data();
      console.log('✅ Admin role found in Firestore:');
      console.log(`   - Role: ${adminData.role}`);
      console.log(`   - Permissions: ${adminData.permissions}`);
      console.log(`   - Active: ${adminData.isActive}`);
    } else {
      console.log('❌ Admin role not found in Firestore');
      console.log('📝 Creating admin role...');
      
      // Create admin role
      const { setDoc } = require('firebase/firestore');
      await setDoc(adminDocRef, {
        email: userCredential.user.email,
        name: 'Admin User',
        role: 'admin',
        permissions: ['all'],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      });
      console.log('✅ Admin role created in Firestore');
    }

    console.log(`\n🎉 Admin login test successful!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`🔗 Admin Panel: http://localhost:3001/admin/login`);

  } catch (error) {
    console.error('❌ Login failed:', error.message);
    
    if (error.code === 'auth/user-not-found') {
      console.log('❌ User not found. Please create the user first.');
      console.log('🔗 Go to Firebase Console: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
    } else if (error.code === 'auth/wrong-password') {
      console.log('❌ Wrong password. Please check your password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('❌ Invalid email address.');
    } else if (error.code === 'auth/network-request-failed') {
      console.log('❌ Network error. Please check your internet connection.');
    } else if (error.code === 'auth/invalid-credential') {
      console.log('❌ Invalid credentials. The email or password is incorrect.');
    } else if (error.code === 'auth/too-many-requests') {
      console.log('❌ Too many failed attempts. Please try again later.');
    }
    
    console.log('\n💡 Troubleshooting steps:');
    console.log('1. Check your internet connection');
    console.log('2. Verify the email and password are correct');
    console.log('3. Check Firebase Console for the user');
    console.log('4. Wait a few minutes if you got "too many requests" error');
  }
}

testAdminLogin();
