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

  try {
    const result = await AdminAuthService.initializeAdminCredentials(
      process.env.ADMIN_EMAIL || 'admin@example.com',
      process.env.ADMIN_PASSWORD || 'admin123',
      'Admin User',
      'super_admin'
    );

    if (result.success) {
      console.log('✅ Admin credentials initialized successfully!');
      console.log(
        '📧 Email: ' + (process.env.ADMIN_EMAIL || 'admin@example.com')
      );
      console.log(
        '🔑 Password: ' + (process.env.ADMIN_PASSWORD ? '[HIDDEN]' : 'admin123')
      );
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
