import { db } from '../lib/firebase';

import bcrypt from 'bcryptjs';
import { adminConfig, getAdminApiUrl } from '@/admin.config';

/**
 * Update Admin Password Script
 *
 * This script updates the admin password to match the one you're using in curl.
 */

async function updateAdminPassword() {
  console.log('🔐 Updating Admin Password...\n');

  const adminEmail =
    process.env.UPDATE_ADMIN_EMAIL ||
    adminConfig.credentials.initialAdmin.email;
  const newPassword = process.env.UPDATE_ADMIN_PASSWORD || '';

  if (!adminEmail || !newPassword) {
    console.error('❌ Missing environment variables:');
    console.error(
      '   UPDATE_ADMIN_EMAIL and UPDATE_ADMIN_PASSWORD must be set'
    );
    console.error('');
    console.error('Example:');
    console.error(
      '   UPDATE_ADMIN_EMAIL=admin@example.com UPDATE_ADMIN_PASSWORD=newpassword npx tsx src/scripts/update-admin-password.ts'
    );
    process.exit(1);
  }

  const SALT_ROUNDS = adminConfig.security.saltRounds;

  try {
    if (!db) {
      console.error('❌ Database not initialized');
      return;
    }

    // Find the admin user
    const adminsRef = supabase.from('admins');
    const q = query(adminsRef, where('email', adminEmail));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.length === 0) {
      console.error('❌ Admin user not found');
      return;
    }

    const adminDoc = querySnapshot.docs[0];
    const adminData = adminDoc;

    console.log('📧 Found admin:', adminData.email);
    console.log('👤 Name:', adminData.name);
    console.log('🔑 Role:', adminData.role);
    console.log('✅ Active:', adminData.isActive);
    console.log('');

    // Hash the new password
    const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Update the password
    await updateDoc(adminDoc.ref, {
      passwordHash: newPasswordHash,
    });

    console.log('✅ Admin password updated successfully!');
    console.log('');
    console.log('🎉 You can now login with:');
    console.log('   Email:', adminEmail);
    console.log('   Password:', newPassword);
    console.log('');
    console.log('🧪 Test with curl:');
    console.log(`curl '${getAdminApiUrl('/admin/auth')}' \\`);
    console.log(`  -H 'Content-Type: application/json' \\`);
    console.log(
      `  --data-raw '{"email":"${adminEmail}","password":"${newPassword}"}'`
    );
  } catch (error) {
    console.error('❌ Error updating admin password:', error);
  }
}

// Run the update
updateAdminPassword();
