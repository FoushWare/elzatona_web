#!/usr/bin/env node

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';

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
const db = getFirestore(app);

const SALT_ROUNDS = 12;

async function createAdminUser() {
  try {
    const email = "afouadsoftwareengineer@gmail.com";
    const password = "zatonafoushware$8888";
    const name = "Admin User";
    const role = "super_admin";

    console.log('🔐 Creating admin user...');
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Name: ${name}`);
    console.log(`🔑 Role: ${role}`);

    // Check if admin already exists
    const adminsRef = collection(db, 'admins');
    const q = query(adminsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('⚠️  Admin user already exists!');
      const existingAdmin = querySnapshot.docs[0];
      const adminData = existingAdmin.data();
      console.log(`📋 Existing admin: ${adminData.name} (${adminData.role})`);
      console.log(`🟢 Status: ${adminData.isActive ? 'Active' : 'Inactive'}`);
      return;
    }

    // Hash password
    console.log('🔒 Hashing password...');
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create admin document
    const adminId = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const adminData = {
      email,
      passwordHash,
      name,
      role,
      isActive: true,
      createdAt: new Date(),
      lastLogin: null
    };

    console.log('💾 Saving admin to Firestore...');
    await setDoc(doc(db, 'admins', adminId), adminData);

    console.log('✅ Admin user created successfully!');
    console.log(`🆔 Admin ID: ${adminId}`);
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Name: ${name}`);
    console.log(`🔑 Role: ${role}`);
    console.log(`🟢 Status: Active`);

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

// Run the script
createAdminUser()
  .then(() => {
    console.log('🎉 Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
