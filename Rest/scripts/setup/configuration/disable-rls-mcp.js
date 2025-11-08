import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Anon Key is not set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔓 Disabling RLS via Supabase Client');
console.log('====================================');

async function disableRLS() {
  try {
    // SQL queries to disable RLS
    const disableQueries = [
      'ALTER TABLE learning_cards DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE categories DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE topics DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE questions DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE learning_plans DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE plan_cards DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE question_attempts DISABLE ROW LEVEL SECURITY;',
    ];

    console.log('📋 Disabling RLS on all tables...\n');

    for (let i = 0; i < disableQueries.length; i++) {
      const query = disableQueries[i];
      const tableName = query.match(/ALTER TABLE (\w+)/)[1];

      console.log(`${i + 1}. Disabling RLS on ${tableName}...`);

      try {
        // Try using rpc method first
        const { error } = await supabase.rpc('exec_sql', { sql: query });

        if (error) {
          console.warn(`   ⚠️ RPC method failed: ${error.message}`);

          // Try alternative approach - direct SQL execution
          const { error: directError } = await supabase
            .from('_supabase_migrations')
            .select('*')
            .limit(0);

          if (directError) {
            console.warn(
              `   ⚠️ Direct method also failed: ${directError.message}`
            );
          }
        } else {
          console.log(`   ✅ RLS disabled on ${tableName}`);
        }
      } catch (e) {
        console.warn(`   ⚠️ Error disabling RLS on ${tableName}: ${e.message}`);
      }
    }

    console.log('\n🔍 Verifying RLS status...');

    // Check RLS status
    const checkQuery = `
      SELECT schemaname, tablename, rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename IN ('learning_cards', 'categories', 'topics', 'questions', 'learning_plans', 'plan_cards', 'user_progress', 'question_attempts')
      ORDER BY tablename;
    `;

    try {
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: checkQuery,
      });

      if (error) {
        console.warn('⚠️ Could not verify RLS status:', error.message);
        console.log('\n💡 Manual verification needed:');
        console.log('   Go to Supabase Dashboard → SQL Editor');
        console.log('   Run the disable RLS queries manually');
      } else {
        console.log('\n📊 RLS Status:');
        data.forEach(row => {
          const status = row.rowsecurity ? '🔒 ENABLED' : '🔓 DISABLED';
          console.log(`   ${row.tablename}: ${status}`);
        });
      }
    } catch (e) {
      console.warn('⚠️ Could not verify RLS status:', e.message);
    }

    console.log('\n🎯 Next Steps:');
    console.log(
      '1. If RLS is still enabled, disable it manually in Supabase dashboard'
    );
    console.log('2. Run the migration script: node migrate-direct.js');
    console.log('3. Re-enable RLS after migration completes');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

disableRLS();
