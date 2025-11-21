const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '../../.env.local') });

/**
 * Execute SQL batches from seed-questions-mcp.sql via Supabase client
 * This script reads the SQL file and executes each batch
 */

const PROJECT_ID = 'kiycimlsatwfqxtfprlr';
const SQL_FILE = path.join(__dirname, '../seed-questions-mcp.sql');

// Get Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('   Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function executeSQLBatch(sql) {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    if (error) {
      // Try direct query execution
      const response = await supabase.from('questions').select('id').limit(1);
      // If that works, try executing via raw SQL
      const { error: execError } = await supabase.rpc('exec_sql', { query: sql });
      if (execError) {
        throw execError;
      }
    }
    return { success: true, data };
  } catch (error) {
    // Fallback: try using Supabase's query builder or direct SQL
    // Since we can't execute raw SQL directly, we'll need to use the MCP tool
    throw error;
  }
}

async function main() {
  console.log('📖 Reading SQL file...');
  const sqlContent = fs.readFileSync(SQL_FILE, 'utf8');
  
  // Split by batch comments
  const batches = sqlContent.split(/^-- .*? - Batch \d+ \(\d+ questions\)$/m);
  const validBatches = batches
    .map((batch, index) => {
      const trimmed = batch.trim();
      if (trimmed && trimmed.startsWith('INSERT')) {
        return { index: index + 1, sql: trimmed };
      }
      return null;
    })
    .filter(Boolean);
  
  console.log(`\n🔍 Found ${validBatches.length} SQL batches\n`);
  
  console.log('⚠️  Note: This script requires MCP tools to execute SQL.');
  console.log('   Please use mcp_supabase_execute_sql tool to execute each batch.\n');
  
  // Save batches to individual files for easier execution
  const batchesDir = path.join(__dirname, '../seed-batches');
  if (!fs.existsSync(batchesDir)) {
    fs.mkdirSync(batchesDir, { recursive: true });
  }
  
  validBatches.forEach((batch, idx) => {
    const batchFile = path.join(batchesDir, `batch-${String(idx + 1).padStart(2, '0')}.sql`);
    fs.writeFileSync(batchFile, batch.sql, 'utf8');
    console.log(`  ✅ Saved batch ${idx + 1} to ${path.relative(process.cwd(), batchFile)}`);
  });
  
  console.log(`\n📊 Total batches: ${validBatches.length}`);
  console.log(`\n💡 To execute via MCP, use:`);
  console.log(`   mcp_supabase_execute_sql with project_id: ${PROJECT_ID}`);
  console.log(`   and read each batch file from ${path.relative(process.cwd(), batchesDir)}`);
}

main().catch(console.error);



