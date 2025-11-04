const { createClient } = require('@supabase/supabase-js');

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

async function createAdminUser() {
  try {
    console.log('🔐 Creating admin user...');

    const email = 'afouadsoftwareengineer@gmail.com';
    const password = 'ZatonaFoushware$8888';

    // Create user using Supabase Admin API
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          name: 'Admin User',
          role: 'super_admin',
        },
      });

    if (authError) {
      console.error('❌ Auth creation error:', authError);
      return;
    }

    console.log('✅ User created in auth.users:', authData.user.id);

    // Create admin record
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .insert({
        user_id: authData.user.id,
        email: email,
        name: 'Admin User',
        role: 'super_admin',
        permissions: {
          can_manage_users: true,
          can_manage_content: true,
          can_view_analytics: true,
          can_manage_settings: true,
        },
        is_active: true,
      })
      .select()
      .single();

    if (adminError) {
      console.error('❌ Admin creation error:', adminError);
      return;
    }

    console.log('✅ Admin record created:', adminData.id);
    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('👤 Role: super_admin');
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

createAdminUser();
