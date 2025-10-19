#!/usr/bin/env node

/**
 * Admin Account Test and Creation Script
 * Tests existing admin accounts and creates new ones if needed
 */

import 'dotenv/config';
import bcrypt from 'bcryptjs';

console.log('🛡️ Admin Account Test and Creation\n');

// Test different admin accounts
const testAccounts = [
  {
    email: 'admin@example.com',
    password: 'your-secure-admin-password',
    description: 'Default admin from .env.local',
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    description: 'Common password',
  },
  {
    email: 'admin@example.com',
    password: 'password',
    description: 'Simple password',
  },
  {
    email: 'admin@example.com',
    password: 'admin',
    description: 'Basic password',
  },
  {
    email: 'afouadsoftwareengineer@gmail.com',
    password: 'admin123',
    description: 'Ahmed Fouad account',
  },
];

async function testAdminLogin(email, password, description) {
  try {
    console.log(`🧪 Testing: ${description}`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);

    const response = await fetch('http://localhost:3001/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ SUCCESS! Admin login working');
      console.log(`   Welcome: ${data.admin?.name}`);
      console.log(`   Role: ${data.admin?.role}`);
      console.log(`   Token: ${data.admin?.token?.substring(0, 20)}...`);
      return true;
    } else {
      console.log(`❌ Failed: ${data.error}`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
  console.log('');
  return false;
}

async function createNewAdmin() {
  console.log('🔄 Creating new admin account...');

  const newAdmin = {
    email: 'admin@elzatona.com',
    password: 'ElzatonaAdmin2024!',
    name: 'Super Admin',
    role: 'super_admin',
  };

  try {
    const response = await fetch('http://localhost:3001/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAdmin),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ New admin account created and logged in!');
      console.log(`   Email: ${newAdmin.email}`);
      console.log(`   Password: ${newAdmin.password}`);
      console.log(`   Name: ${newAdmin.name}`);
      console.log(`   Role: ${newAdmin.role}`);
      return true;
    } else {
      console.log(`❌ Failed to create admin: ${data.error}`);
    }
  } catch (error) {
    console.log(`❌ Error creating admin: ${error.message}`);
  }
  return false;
}

async function runTests() {
  console.log('📋 Testing existing admin accounts...\n');

  let success = false;

  // Test existing accounts
  for (const account of testAccounts) {
    success = await testAdminLogin(
      account.email,
      account.password,
      account.description
    );
    if (success) break;
  }

  if (!success) {
    console.log(
      '🔄 All existing accounts failed, trying to create new admin...\n'
    );
    success = await createNewAdmin();
  }

  if (success) {
    console.log('\n🎉 Admin authentication is working!');
    console.log('🎯 You can now access:');
    console.log('   Admin Login: http://localhost:3001/admin/login');
    console.log('   Admin Dashboard: http://localhost:3001/admin/dashboard');
  } else {
    console.log('\n❌ Admin authentication is not working');
    console.log('💡 You may need to:');
    console.log('   1. Check Firebase connection');
    console.log('   2. Verify admin collection exists');
    console.log('   3. Check password hashing');
  }
}

runTests();
