const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
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

async function createNewAdmin() {
  console.log('🔥 Creating new admin user...');
  
  const email = await askQuestion('Enter admin email: ');
  const password = await askQuestion('Enter admin password (min 6 characters): ');
  const name = await askQuestion('Enter admin name: ');

  try {
    console.log('📧 Creating user in Firebase Auth...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(`✅ User created successfully with ID: ${user.uid}`);

    console.log('📝 Creating admin role in Firestore...');
    await setDoc(doc(db, 'admins', user.uid), {
      email: user.email,
      name: name,
      role: 'admin',
      permissions: ['all'],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });
    console.log('✅ Admin role created in Firestore');

    console.log(`\n🎉 Admin user created successfully!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`🔗 Admin Panel: http://localhost:3001/admin/login`);

  } catch (error) {
    console.error('❌ Error details:', error.message);
    if (error.code === 'auth/email-already-in-use') {
      console.log('❌ This email is already in use. Please try a different email.');
    } else if (error.code === 'auth/weak-password') {
      console.log('❌ Password is too weak. Please use a stronger password.');
    }
  } finally {
    rl.close();
    console.log('🏁 Script completed.');
  }
}

createNewAdmin();
