import { AdminAuthService } from '../lib/admin-auth';
import { adminConfig, validateAdminConfig } from '../config/admin';

/**
 * Initialize Admin Credentials Script
 *
 * This script creates the initial super admin account.
 * Run this once to set up your admin credentials.
 *
 * Usage: npx tsx src/scripts/initialize-admin.ts
 *
 * Environment Variables:
 * - INITIAL_ADMIN_EMAIL: Admin email address
 * - INITIAL_ADMIN_PASSWORD: Admin password
 * - INITIAL_ADMIN_NAME: Admin display name
 * - INITIAL_ADMIN_ROLE: Admin role (super_admin or admin)
 */

async function initializeAdmin() {
  console.log('🚀 Initializing Admin Credentials...\n');

  // Validate configuration
  try {
    validateAdminConfig();
  } catch (error) {
    console.error('❌ Configuration validation failed:', error);
    process.exit(1);
  }

  // Get admin credentials from environment variables
  const adminEmail = adminConfig.credentials.initialAdmin.email;
  const adminPassword = adminConfig.credentials.initialAdmin.password;
  const adminName = adminConfig.credentials.initialAdmin.name;
  const adminRole = adminConfig.credentials.initialAdmin.role;

  // Validate required credentials
  if (!adminEmail || !adminPassword) {
    console.error('❌ Missing required environment variables:');
    console.error(
      '   INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD must be set'
    );
    console.error('');
    console.error('Example:');
    console.error(
      '   INITIAL_ADMIN_EMAIL=admin@example.com INITIAL_ADMIN_PASSWORD=securepassword npx tsx src/scripts/initialize-admin.ts'
    );
    process.exit(1);
  }

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
      console.log(`   ${adminConfig.urls.admin}/admin/login`);
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
