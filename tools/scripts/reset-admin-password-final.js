const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, updatePassword } = require('firebase/auth');
const { getFirestore, doc, getDoc, setDoc } = require('firebase/firestore');
const readline = require('readline');

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function resetAdminPassword() {
  console.log('🔥 Resetting admin password and ensuring admin role...');
  const email = 'afouadsoftwareengineer@gmail.com';
  const newPassword = 'zatonafoushware$8888';

  console.log(`📧 Attempting to sign in with existing credentials...`);

  try {
    // First, try to sign in with the current password
    let userCredential;
    try {
      userCredential = await signInWithEmailAndPassword(auth, email, newPassword);
      console.log(`✅ Successfully signed in with current password`);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        console.log('❌ Current password is incorrect. Cannot reset password without authentication.');
        console.log('🔗 Please reset the password through Firebase Console:');
        console.log('   https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
        return;
      } else {
        throw error;
      }
    }

    const user = userCredential.user;

    // Update the password to ensure it's correct
    await updatePassword(user, newPassword);
    console.log(`✅ Password updated successfully`);

    // Ensure admin role exists in Firestore
    const adminDocRef = doc(db, 'admins', user.uid);
    const adminDoc = await getDoc(adminDocRef);
    
    if (!adminDoc.exists()) {
      console.log('📝 Creating admin role in Firestore...');
      await setDoc(adminDocRef, {
        email: user.email,
        name: user.displayName || 'Admin User',
        role: 'admin',
        permissions: ['all'],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      });
      console.log('✅ Admin role created in Firestore');
    } else {
      console.log('✅ Admin role already exists in Firestore');
    }

    console.log(`🎉 Admin setup completed successfully!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${newPassword}`);
    console.log(`🔗 Admin Panel: http://localhost:3001/admin/login`);

  } catch (error) {
    console.error('❌ Error details:', error.message);
    if (error.code === 'auth/user-not-found') {
      console.log('❌ User not found. Please create the user first.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('❌ Invalid email address.');
    }
  } finally {
    rl.close();
    console.log('🏁 Script completed.');
  }
}

resetAdminPassword();
