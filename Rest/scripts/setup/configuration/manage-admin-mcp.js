#!/usr/bin/env node

/**
 * Admin Account Management using Firebase MCP
 * Check existing admins and create new ones if needed
 */

import 'dotenv/config';
import bcrypt from 'bcryptjs';

console.log('🛡️ Admin Account Management using Firebase MCP\n');

async function manageAdminAccounts() {
  try {
    // Check existing admins
    console.log('📋 Checking existing admin accounts...');

    // Use Firebase MCP to query admins collection
    const { data: admins, error: queryError } =
      await mcp_firebase_firestore_query_collection({
        collection_path: 'admins',
        limit: 100,
      });

    if (queryError) {
      console.log('❌ Error querying admins:', queryError.message);
      return;
    }

    if (!admins || admins.length === 0) {
      console.log('❌ No admin accounts found');
    } else {
      console.log(`✅ Found ${admins.length} admin account(s):`);
      admins.forEach(admin => {
        console.log(
          `   - ${admin.email} (${admin.role}) - Active: ${admin.isActive}`
        );
      });
    }

    // Create a new admin account
    console.log('\n🔄 Creating new admin account...');
    const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@elzatona.com';
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
    const adminName = 'Super Admin';
    const adminRole = 'super_admin';

    if (!adminPassword) {
      console.error(
        '❌ Missing INITIAL_ADMIN_PASSWORD in environment variables'
      );
      console.error(
        'Please set INITIAL_ADMIN_PASSWORD in your .env.local file'
      );
      return;
    }

    // Hash the password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

    // Check if admin already exists
    const existingAdmins =
      admins?.filter(admin => admin.email === adminEmail) || [];

    if (existingAdmins.length > 0) {
      console.log('⚠️  Admin account already exists, updating password...');
      const adminId = existingAdmins[0].id;

      // Update existing admin
      const { error: updateError } = await mcp_firebase_firestore_set_document({
        path: `admins/${adminId}`,
        data: {
          email: adminEmail,
          passwordHash: passwordHash,
          name: adminName,
          role: adminRole,
          isActive: true,
          updatedAt: new Date().toISOString(),
        },
      });

      if (updateError) {
        console.log('❌ Error updating admin:', updateError.message);
        return;
      }

      console.log('✅ Admin password updated successfully');
    } else {
      // Create new admin
      const { error: createError } = await mcp_firebase_firestore_set_document({
        path: `admins/${Date.now()}`, // Use timestamp as ID
        data: {
          email: adminEmail,
          passwordHash: passwordHash,
          name: adminName,
          role: adminRole,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });

      if (createError) {
        console.log('❌ Error creating admin:', createError.message);
        return;
      }

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
