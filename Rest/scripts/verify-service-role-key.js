/**
 * Verify Service Role Key Matches Supabase Project
 * 
 * This script checks if the SUPABASE_SERVICE_ROLE_KEY in .env.test.local
 * matches the project ID in NEXT_PUBLIC_SUPABASE_URL.
 */

const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const { resolve } = require('path');

// Load .env.test.local
const envPath = resolve(process.cwd(), '.env.test.local');
config({ path: envPath });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? '✅' : '❌');
  process.exit(1);
}

// Extract project reference from URL
const urlProjectRef = supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1];

if (!urlProjectRef) {
  console.error('❌ Could not extract project reference from URL:', supabaseUrl);
  process.exit(1);
}

// Decode JWT to check project reference
try {
  const jwtParts = serviceRoleKey.split('.');
  if (jwtParts.length !== 3) {
    throw new Error('Invalid JWT format');
  }
  
  const payload = JSON.parse(Buffer.from(jwtParts[1], 'base64').toString());
  const keyProjectRef = payload.ref;
  const keyRole = payload.role;
  
  console.log('\n🔍 Service Role Key Verification\n');
  console.log('📋 URL Project Reference:', urlProjectRef);
  console.log('🔑 Key Project Reference:', keyProjectRef);
  console.log('👤 Key Role:', keyRole);
  console.log('');
  
  if (keyProjectRef === urlProjectRef && keyRole === 'service_role') {
    console.log('✅ SUCCESS: Service role key matches the project URL!');
    console.log('');
    
    // Test the connection
    console.log('🧪 Testing connection...');
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    
    // Try a simple query
    supabase
      .from('admin_users')
      .select('count')
      .limit(1)
      .then(({ data, error }) => {
        if (error) {
          console.error('❌ Connection test failed:', error.message);
          process.exit(1);
        } else {
          console.log('✅ Connection test passed!');
          console.log('');
          console.log('🎉 Your service role key is correctly configured!');
        }
      })
      .catch((error) => {
        console.error('❌ Connection test error:', error.message);
        process.exit(1);
      });
  } else {
    console.error('❌ MISMATCH: Service role key does not match the project URL!');
    console.error('');
    console.error('The service role key is for project:', keyProjectRef);
    console.error('But your URL points to project:', urlProjectRef);
    console.error('');
    console.error('📝 To fix this:');
    console.error('1. Go to Supabase Dashboard: https://supabase.com/dashboard');
    console.error(`2. Select project: ${urlProjectRef} (zatona-web-testing)`);
    console.error('3. Go to Settings → API');
    console.error('4. Copy the service_role key (click the eye icon to reveal)');
    console.error('5. Update SUPABASE_SERVICE_ROLE_KEY in .env.test.local');
    console.error('');
    console.error(`Direct link: https://supabase.com/dashboard/project/${urlProjectRef}/settings/api`);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error decoding JWT:', error.message);
  console.error('');
  console.error('The service role key might be invalid or corrupted.');
  process.exit(1);
}

