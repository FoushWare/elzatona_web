import { AdminAuthService } from '../lib/admin-auth';

/**
 * Initialize Admin Credentials Script
 *
 * This script creates the initial super admin account.
 * Run this once to set up your admin credentials.
 *
 * Usage: npx tsx src/scripts/initialize-admin.ts
 */

async function initializeAdmin() {
  console.log('🚀 Initializing Admin Credentials...\n');

  // Your admin credentials
  const adminEmail = 'afouadsoftwareengineer@gmail.com';
  const adminPassword = 'zatonafoushware';
  const adminName = 'Super Admin';
  const adminRole = 'super_admin';

  try {
    console.log('📧 Email:', adminEmail);
    console.log('👤 Name:', adminName);
    console.log('🔑 Role:', adminRole);
    console.log('');

    const result = await AdminAuthService.initializeAdminCredentials(
      adminEmail,
      adminPassword,
      adminName,
      adminRole
    );

    if (result.success) {
      console.log('✅ Admin account created successfully!');
      console.log('');
      console.log('🎉 You can now login to the admin dashboard at:');
      console.log('   http://localhost:3000/admin/login');
      console.log('');
      console.log('📋 Login Credentials:');
      console.log('   Email:', adminEmail);
      console.log('   Password:', adminPassword);
      console.log('');
      console.log('⚠️  Important: Keep these credentials secure!');
    } else {
      console.error('❌ Failed to create admin account:', result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeAdmin();
