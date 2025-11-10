// Simple script to reset admin password
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function resetAdminPassword() {
  try {
    console.log('🔐 Resetting admin password...');

    const email = process.env.ADMIN_EMAIL;
    const newPassword = process.env.ADMIN_PASSWORD;

    if (!email || !newPassword) {
      console.error('❌ Missing admin credentials in environment variables');
      console.error('Required: ADMIN_EMAIL, ADMIN_PASSWORD');
      console.error('Please set these in your .env.local file');
      process.exit(1);
    }

    // Update user password using admin API
    const { data, error } = await supabase.auth.admin.updateUserById(
      'faa952ef-a21a-43c0-940f-a59b9158da0f', // User ID from previous query
      { password: newPassword }
    );

    if (error) {
      console.error('❌ Password reset error:', error);
      return;
    }

    console.log('✅ Password reset successful!');
    console.log('📧 Email:', email);
    console.log('🔑 New Password:', newPassword);
    console.log('👤 User ID:', data.user.id);
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

resetAdminPassword();
