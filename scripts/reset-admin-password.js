// Simple script to reset admin password
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hpnewqkvpnthpohvxcmq.supabase.co';
const supabaseServiceKey =
  'SUPABASE_SERVICE_ROLE_KEY_REDACTED';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function resetAdminPassword() {
  try {
    console.log('🔐 Resetting admin password...');

    const email = 'afouadsoftwareengineer@gmail.com';
    const newPassword = 'ZatonaFoushware$8888';

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
