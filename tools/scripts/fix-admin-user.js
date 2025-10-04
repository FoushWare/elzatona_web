const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } = require('firebase/auth');
const { getFirestore, doc, getDoc, setDoc, deleteDoc } = require('firebase/firestore');
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

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function fixAdminUser() {
  console.log('🔥 Fixing admin user setup...');
  const email = 'afouadsoftwareengineer@gmail.com';
  const password = 'zatonafoushware$8888';

  try {
    // First, try to create the user
    console.log('📧 Attempting to create admin user...');
    let userCredential;
    
    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ User created successfully');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('ℹ️  User already exists. This is expected.');
        console.log('🔗 Please manually delete the user from Firebase Console:');
        console.log('   https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
        console.log('   Then run this script again.');
        return;
      } else {
        throw error;
      }
    }

    const user = userCredential.user;
    console.log(`📧 User ID: ${user.uid}`);

    // Create admin role in Firestore
    console.log('📝 Creating admin role in Firestore...');
    await setDoc(doc(db, 'admins', user.uid), {
      email: user.email,
      name: 'Admin User',
      role: 'admin',
      permissions: ['all'],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });
    console.log('✅ Admin role created in Firestore');

    // Test the login
    console.log('🧪 Testing login...');
    await auth.signOut(); // Sign out first
    const testCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('✅ Login test successful!');

    console.log(`\n🎉 Admin user setup completed successfully!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`🔗 Admin Panel: http://localhost:3001/admin/login`);

  } catch (error) {
    console.error('❌ Error details:', error.message);
    if (error.code === 'auth/email-already-in-use') {
      console.log('\n💡 Solution:');
      console.log('1. Go to Firebase Console: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
      console.log('2. Find the user with email: afouadsoftwareengineer@gmail.com');
      console.log('3. Delete the user');
      console.log('4. Run this script again');
    }
  } finally {
    rl.close();
    console.log('🏁 Script completed.');
  }
}

fixAdminUser();
