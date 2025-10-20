import { AdminAuthService } from '../lib/admin-auth';

/**
 * Check Admin Users Script
 *
 * This script lists all admin users in the database.
 */

async function checkAdmins() {
  console.log('🔍 Checking Admin Users...\n');

  try {
    const admins = await AdminAuthService.getAllAdmins();

    if (admins.length === 0) {
      console.log('❌ No admin users found in database');
      return;
    }

    console.log(`✅ Found ${admins.length} admin user(s):\n`);

    admins.forEach((admin, index) => {
      console.log(`${index + 1}. Admin User:`);
      console.log(`   ID: ${admin.id}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Name: ${admin.name}`);
      console.log(`   Role: ${admin.role}`);
      console.log(`   Active: ${admin.is_active}`);
      console.log(`   Created: ${admin.created_at}`);
      console.log(`   Last Login: ${admin.last_login || 'Never'}`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ Error checking admins:', error);
  }
}

// Run the check
checkAdmins();
