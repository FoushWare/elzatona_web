const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

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

async function testPasswords() {
  console.log('🔥 Testing common passwords for afouadsoftwareengineer@gmail.com...');
  
  const email = 'afouadsoftwareengineer@gmail.com';
  const passwords = [
    'zatonafoushware$8888',
    'zatonafoushware8888',
    'zatonafoushware',
    'admin123',
    'password123',
    'admin',
    'password',
    '123456',
    'admin@123',
    'Admin123!',
    'zatonafoushware!',
    'zatonafoushware@123'
  ];

  for (const password of passwords) {
    try {
      console.log(`🧪 Testing password: ${password}`);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(`✅ SUCCESS! Password works: ${password}`);
      console.log(`📧 User ID: ${userCredential.user.uid}`);
      console.log(`📧 Email: ${userCredential.user.email}`);
      return;
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        console.log(`❌ Wrong password: ${password}`);
      } else if (error.code === 'auth/user-not-found') {
        console.log(`❌ User not found`);
        return;
      } else {
        console.log(`❌ Other error with ${password}: ${error.message}`);
      }
    }
  }
  
  console.log('❌ None of the tested passwords worked.');
  console.log('🔗 Please check Firebase Console: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
}

testPasswords();
