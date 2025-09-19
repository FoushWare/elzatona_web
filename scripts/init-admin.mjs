#!/usr/bin/env node

/**
 * Initialize Admin User Script
 * This script creates a default admin user for development
 */

import bcrypt from 'bcryptjs';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvOkBw0lBp4t4j8K9vL2mN3oP5qR6sT7u",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createAdminUser() {
  try {
    console.log('🔐 Creating default admin user...');
    
    // Default admin credentials
    const email = 'admin@example.com';
    const password = 'admin123';
    const name = 'Admin User';
    const role = 'super_admin';
    
    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Create admin document
    const adminId = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const adminData = {
      email,
      passwordHash,
      name,
      role,
      isActive: true,
      createdAt: serverTimestamp(),
    };
    
    await setDoc(doc(db, 'admins', adminId), adminData);
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('🆔 Admin ID:', adminId);
    console.log('👤 Role:', role);
    console.log('');
    console.log('🌐 You can now login at: http://localhost:3000/admin/login');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
}

// Run the script
createAdminUser().then(() => {
  console.log('🏁 Script completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});
