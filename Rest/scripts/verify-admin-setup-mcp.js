/**
 * Verify Admin Setup Using MCP Supabase
 *
 * This script uses MCP to verify:
 * 1. Admin user exists in the database
 * 2. Admin user is active
 * 3. Password hash is present
 * 4. Service role key matches the project
 */

const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const { resolve } = require('path');
const bcrypt = require('bcryptjs');

// Load .env.test.local
const envPath = resolve(process.cwd(), '.env.test.local');
config({ path: envPath });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL || 'elzatonafoushware@gmail.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'ZatonaFoushware$12';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing environment variables in .env.test.local');
  process.exit(1);
}

// Extract project reference from URL
const urlProjectRef = supabaseUrl.match(
  /https?:\/\/([^.]+)\.supabase\.co/
)?.[1];

console.log('\n🔍 Admin Setup Verification (Using MCP)\n');
console.log('📋 Project:', urlProjectRef);
console.log('📧 Admin Email:', adminEmail);
console.log('');

// Verify service role key matches project
try {
  const jwtParts = serviceRoleKey.split('.');
  const payload = JSON.parse(Buffer.from(jwtParts[1], 'base64').toString());
  const keyProjectRef = payload.ref;
  const keyRole = payload.role;

  if (keyProjectRef !== urlProjectRef || keyRole !== 'service_role') {
    console.error('❌ Service role key mismatch!');
    console.error('   URL project:', urlProjectRef);
    console.error('   Key project:', keyProjectRef);
    console.error('   Key role:', keyRole);
    console.error('');
    console.error('📝 Get the correct service_role key from:');
    console.error(
      `   https://supabase.com/dashboard/project/${urlProjectRef}/settings/api`
    );
    process.exit(1);
  }

  console.log('✅ Service role key matches project');
} catch (error) {
  console.error('❌ Invalid service role key:', error.message);
  process.exit(1);
}

// Test connection and verify admin user
console.log('🧪 Testing database connection...');
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

(async () => {
  try {
    // Query admin user
    const { data: adminData, error: queryError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', adminEmail)
      .single();

    if (queryError) {
      console.error('❌ Database query failed:', queryError.message);
      console.error('   Code:', queryError.code);
      process.exit(1);
    }

    if (!adminData) {
      console.error(`❌ Admin user not found: ${adminEmail}`);
      console.error('');
      console.error('📝 Create the admin user by running:');
      console.error('   node Rest/scripts/create-test-admin.js');
      process.exit(1);
    }

    console.log('✅ Admin user found in database');
    console.log('   ID:', adminData.id);
    console.log('   Email:', adminData.email);
    console.log('   Role:', adminData.role);
    console.log('   Active:', adminData.is_active ? '✅' : '❌');
    console.log(
      '   Password Hash:',
      adminData.password_hash ? '✅ Present' : '❌ Missing'
    );

    if (!adminData.is_active) {
      console.error('');
      console.error('❌ Admin user is not active!');
      process.exit(1);
    }

    if (!adminData.password_hash) {
      console.error('');
      console.error('❌ Admin user has no password hash!');
      process.exit(1);
    }

    // Verify password
    console.log('');
    console.log('🔐 Verifying password...');
    const isValidPassword = await bcrypt.compare(
      adminPassword,
      adminData.password_hash
    );

    if (isValidPassword) {
      console.log('✅ Password verification successful!');
    } else {
      console.error('❌ Password verification failed!');
      console.error(
        '   The password in .env.test.local does not match the hash in the database.'
      );
      console.error('');
      console.error('📝 To fix this, update the admin user password:');
      console.error('   node Rest/scripts/create-test-admin.js');
      process.exit(1);
    }

    console.log('');
    console.log('🎉 All checks passed! Admin setup is correct.');
    console.log('');
    console.log('✅ Service role key matches project');
    console.log('✅ Admin user exists and is active');
    console.log('✅ Password hash is present');
    console.log('✅ Password verification successful');
    console.log('');
    console.log('🚀 You can now test the API:');
    console.log(`   curl 'http://localhost:3000/api/admin/auth' \\`);
    console.log(`     -H 'Content-Type: application/json' \\`);
    console.log(
      `     --data-raw '{"email":"${adminEmail}","password":"${adminPassword}"}'`
    );
  } catch (error) {
    console.error('❌ Verification error:', error.message);
    process.exit(1);
  }
})();
