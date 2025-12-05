const fs = require('fs');
const path = require('path');

// Read the SQL file
const sqlFile = path.join(__dirname, 'all-html-questions-fixed.sql');
const sqlContent = fs.readFileSync(sqlFile, 'utf8');

// Supabase configuration
const supabaseUrl = 'https://qjqjqjqjqjqjqjqj.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

async function executeSQL() {
  try {
    console.log('Executing HTML questions SQL...');

    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
      },
      body: JSON.stringify({
        sql: sqlContent,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error executing SQL:', error);
      return;
    }

    const result = await response.json();
    console.log('SQL executed successfully!');
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

executeSQL();
