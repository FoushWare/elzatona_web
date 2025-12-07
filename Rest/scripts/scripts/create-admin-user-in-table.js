const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Use service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error(
    'Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createAdminUserInTable() {
  try {
    console.log('🔐 Creating admin user in admin_users table...');

    // Get credentials from env or command line args
    const email = process.env.ADMIN_EMAIL || process.argv[2];
    const password = process.env.ADMIN_PASSWORD || process.argv[3];

    if (!email || !password) {
      console.error('❌ Missing admin credentials');
      console.error(
        'Usage: node create-admin-user-in-table.js <email> <password>'
      );
      console.error(
        'Or set ADMIN_EMAIL and ADMIN_PASSWORD in environment variables'
      );
      process.exit(1);
    }

    // Check if admin_users table exists
    const { data: tableCheck, error: tableError } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1);

    if (tableError && tableError.code === 'PGRST116') {
      console.error('❌ admin_users table does not exist!');
      console.error('Please run the SQL script to create the table:');
      console.error('   Rest/scripts/scripts/create-admin-users-table.sql');
      console.error(
        '\nOr create it manually in Supabase dashboard SQL editor.'
      );
      console.error('\nThe table structure is:');
      console.error('  - id (UUID, primary key)');
      console.error('  - email (TEXT, unique)');
      console.error('  - password_hash (TEXT)');
      console.error('  - name (TEXT)');
      console.error('  - role (TEXT, default: admin)');
      console.error('  - is_active (BOOLEAN, default: true)');
      console.error('  - permissions (JSONB)');
      console.error('  - created_at, updated_at (TIMESTAMPTZ)');
      return;
    }

    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists. Updating password...');

      // Hash the new password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Update password
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({
          password_hash: passwordHash,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq('email', email);

      if (updateError) {
        console.error('❌ Error updating admin password:', updateError);
        return;
      }

      console.log('✅ Admin password updated successfully!');
      console.log('📧 Email:', email);
      console.log('👤 Role:', existingAdmin.role);
    } else {
      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Create admin user
      const { data: adminData, error: insertError } = await supabase
        .from('admin_users')
        .insert({
          email: email,
          password_hash: passwordHash,
          name: 'Admin User',
          role: 'super_admin',
          is_active: true,
          permissions: {
            can_manage_users: true,
            can_manage_content: true,
            can_view_analytics: true,
            can_manage_settings: true,
          },
        })
        .select()
        .single();

      if (insertError) {
        console.error('❌ Error creating admin user:', insertError);
        return;
      }

      console.log('✅ Admin user created successfully!');
      console.log('📧 Email:', email);
      console.log('👤 Role: super_admin');
      console.log('🆔 Admin ID:', adminData.id);
    }

    console.log('\n🎉 Admin user is ready for login!');
    console.log('You can now login at: http://localhost:3000/admin/login');
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

createAdminUserInTable();
