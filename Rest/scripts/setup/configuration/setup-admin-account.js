#!/usr/bin/env node

/**
 * Admin Account Initialization Script
 * Creates the initial admin account for the system
 */

import 'dotenv/config';

console.log('🛡️ Initializing Admin Account...\n');

async function initializeAdmin() {
  try {
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error(
        '❌ Missing INITIAL_ADMIN_PASSWORD in environment variables'
      );
      console.error(
        'Please set INITIAL_ADMIN_PASSWORD in your .env.local file'
      );
      process.exit(1);
    }

    const adminData = {
      email: process.env.INITIAL_ADMIN_EMAIL || 'admin@elzatona.com',
      password: adminPassword,
      name: process.env.INITIAL_ADMIN_NAME || 'Super Admin',
      role: process.env.INITIAL_ADMIN_ROLE || 'super_admin',
    };

    console.log('📋 Admin Account Details:');
    console.log(`   Email: ${adminData.email}`);
    console.log(`   Name: ${adminData.name}`);
    console.log(`   Role: ${adminData.role}`);
    console.log(`   Password: ${adminData.password}\n`);

    console.log('🔄 Creating admin account...');

    const response = await fetch('http://localhost:3001/api/admin/init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Admin account created successfully!');
      console.log(`   Admin ID: ${result.adminId}`);
      console.log(`   Message: ${result.message}\n`);

      console.log('🎯 You can now login at:');
      console.log('   URL: http://localhost:3001/admin/login');
      console.log(`   Email: ${adminData.email}`);
      console.log(`   Password: ${adminData.password}\n`);
    } else {
      console.log('❌ Admin account creation failed:');
      console.log(`   Error: ${result.error}\n`);

      if (result.error.includes('already exists')) {
        console.log('💡 Admin account already exists. You can login with:');
        console.log(`   Email: ${adminData.email}`);
        console.log(`   Password: ${adminData.password}\n`);
      }
    }
  } catch (error) {
    console.log('❌ Error initializing admin account:');
    console.log(`   ${error.message}\n`);
    console.log('💡 Make sure your development server is running:');
    console.log('   npm run dev\n');
  }
}

// Test admin login after initialization
async function testAdminLogin() {
  try {
    console.log('🧪 Testing admin login...');

    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error(
        '❌ Missing INITIAL_ADMIN_PASSWORD in environment variables'
      );
      return;
    }

    const loginData = {
      email: process.env.INITIAL_ADMIN_EMAIL || 'admin@elzatona.com',
      password: adminPassword,
    };

    const response = await fetch('http://localhost:3001/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Admin login test successful!');
      console.log(`   Welcome: ${result.admin.name}`);
      console.log(`   Role: ${result.admin.role}`);
      console.log(
        `   Session expires: ${new Date(result.expiresAt).toLocaleString()}\n`
      );
    } else {
      console.log('❌ Admin login test failed:');
      console.log(`   Error: ${result.error}\n`);
    }
  } catch (error) {
    console.log('❌ Error testing admin login:');
    console.log(`   ${error.message}\n`);
  }
}

// Run the initialization
initializeAdmin().then(() => {
  // Wait a moment then test login
  setTimeout(testAdminLogin, 1000);
});
