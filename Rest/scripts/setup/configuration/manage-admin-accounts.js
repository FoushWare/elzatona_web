#!/usr/bin/env node

/**
 * Admin Account Management Script
 * Check existing admins and create new ones if needed
 */

import 'dotenv/config';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import bcrypt from 'bcryptjs';

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: 'service_account',
  project_id: 'fir-demo-project-adffb',
  private_key_id: 'mock-key-id',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMOCK_PRIVATE_KEY\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-mock@fir-demo-project-adffb.iam.gserviceaccount.com',
  client_id: 'mock-client-id',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mock%40fir-demo-project-adffb.iam.gserviceaccount.com',
};

try {
  initializeApp({
    credential: cert(serviceAccount),
  });
} catch (error) {
  console.log(
    '⚠️  Firebase Admin SDK already initialized or mock service account'
  );
}

const firestore = getFirestore();

async function manageAdminAccounts() {
  console.log('🛡️ Admin Account Management\n');

  try {
    // Check existing admins
    console.log('📋 Checking existing admin accounts...');
    const adminsRef = firestore.collection('admins');
    const snapshot = await adminsRef.get();

    if (snapshot.empty) {
      console.log('❌ No admin accounts found');
    } else {
      console.log(`✅ Found ${snapshot.size} admin account(s):`);
      snapshot.forEach(doc => {
        const data = doc.data();
        console.log(
          `   - ${data.email} (${data.role}) - Active: ${data.isActive}`
        );
      });
    }

    // Create a new admin account
    console.log('\n🔄 Creating new admin account...');
    const adminEmail = 'admin@elzatona.com';
    const adminPassword = 'ElzatonaAdmin2024!';
    const adminName = 'Super Admin';
    const adminRole = 'super_admin';

    // Hash the password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

    // Check if admin already exists
    const existingAdminQuery = await adminsRef
      .where('email', '==', adminEmail)
      .get();

    if (!existingAdminQuery.empty) {
      console.log('⚠️  Admin account already exists, updating password...');
      const adminDoc = existingAdminQuery.docs[0];
      await adminDoc.ref.update({
        passwordHash: passwordHash,
        isActive: true,
        updatedAt: new Date(),
      });
      console.log('✅ Admin password updated successfully');
    } else {
      // Create new admin
      await adminsRef.add({
        email: adminEmail,
        passwordHash: passwordHash,
        name: adminName,
        role: adminRole,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('✅ New admin account created successfully');
    }

    console.log('\n📋 Admin Account Details:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`   Name: ${adminName}`);
    console.log(`   Role: ${adminRole}`);

    console.log('\n🎯 You can now login at:');
    console.log('   URL: http://localhost:3001/admin/login');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);

    // Test the login
    console.log('\n🧪 Testing admin login...');
    const loginResponse = await fetch('http://localhost:3001/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: adminEmail,
        password: adminPassword,
      }),
    });

    const loginResult = await loginResponse.json();

    if (loginResult.success) {
      console.log('✅ Admin login test successful!');
      console.log(`   Welcome: ${loginResult.admin.name}`);
      console.log(`   Role: ${loginResult.admin.role}`);
    } else {
      console.log('❌ Admin login test failed:');
      console.log(`   Error: ${loginResult.error}`);
    }
  } catch (error) {
    console.error('❌ Error managing admin accounts:', error.message);
  }
}

manageAdminAccounts();
