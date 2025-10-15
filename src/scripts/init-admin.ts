#!/usr/bin/env tsx

/**
 * Initialize Admin Credentials Script
 *
 * This script creates the initial admin account for the application.
 * Run this once to set up admin access.
 */

import { AdminAuthService } from '@/lib/admin-auth';

async function initializeAdmin() {
  console.log('🚀 Initializing admin credentials...');

  // Check for required environment variables
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('❌ Missing required environment variables:');
    console.error('   ADMIN_EMAIL - Admin email address');
    console.error('   ADMIN_PASSWORD - Admin password');
    console.error('');
    console.error(
      'Please set these environment variables before running this script.'
    );
    console.error('Example:');
    console.error('   export ADMIN_EMAIL="admin@yourdomain.com"');
    console.error('   export ADMIN_PASSWORD="your-secure-password"');
    process.exit(1);
  }

  try {
    const result = await AdminAuthService.initializeAdminCredentials(
      adminEmail,
      adminPassword,
      'Admin User',
      'super_admin'
    );

    if (result.success) {
      console.log('✅ Admin credentials initialized successfully!');
      console.log('📧 Email: ' + adminEmail);
      console.log('🔑 Password: [HIDDEN]');
      console.log('👤 Role: super_admin');
      console.log('');
      console.log(
        'You can now log in to the admin panel at: http://localhost:3000/admin/login'
      );
    } else {
      console.error('❌ Failed to initialize admin credentials:', result.error);
    }
  } catch (error) {
    console.error('❌ Error initializing admin credentials:', error);
  }
}

// Run the initialization
initializeAdmin()
  .then(() => {
    console.log('🏁 Admin initialization complete');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Admin initialization failed:', error);
    process.exit(1);
  });
