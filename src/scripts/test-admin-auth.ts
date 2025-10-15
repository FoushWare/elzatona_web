import { adminConfig, getAdminApiUrl } from '@/admin.config';

/**
 * Test Admin Authentication Script
 *
 * This script tests the admin authentication API directly.
 *
 * Environment Variables:
 * - TEST_ADMIN_EMAIL: Admin email for testing
 * - TEST_ADMIN_PASSWORD: Admin password for testing
 */

async function testAdminAuth() {
  console.log('🧪 Testing Admin Authentication API...\n');

  const adminEmail =
    process.env.TEST_ADMIN_EMAIL || adminConfig.credentials.initialAdmin.email;
  const adminPassword =
    process.env.TEST_ADMIN_PASSWORD ||
    adminConfig.credentials.initialAdmin.password;
  const apiUrl = getAdminApiUrl('/admin/auth');

  if (!adminEmail || !adminPassword) {
    console.error('❌ Missing test credentials:');
    console.error(
      '   Set TEST_ADMIN_EMAIL and TEST_ADMIN_PASSWORD environment variables'
    );
    console.error(
      '   Or ensure INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD are set'
    );
    process.exit(1);
  }

  try {
    console.log('📧 Email:', adminEmail);
    console.log('🔗 API URL:', apiUrl);
    console.log('');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: adminEmail,
        password: adminPassword,
      }),
    });

    const data = await response.json();

    console.log('📊 Response Status:', response.status);
    console.log('📋 Response Data:', JSON.stringify(data, null, 2));

    if (data.success) {
      console.log('✅ Authentication successful!');
      console.log('🎉 Admin session created');
    } else {
      console.log('❌ Authentication failed:', data.error);

      // Log error details for debugging
      console.log('\n🔍 Authentication failed. Please check:');
      console.log('   - Email address is correct');
      console.log('   - Password is correct');
      console.log('   - Environment variables are set properly');
      console.log('   - Admin account exists in Firebase');
    }
  } catch (error) {
    console.error('❌ Error testing admin auth:', error);
  }
}

// Run the test
testAdminAuth();
