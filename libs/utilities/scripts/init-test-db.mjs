import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.test.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.test.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function initDb() {
  console.log('🏁 Initializing test database schema...');

  const tables = [
    {
      name: 'categories',
      sql: `
        CREATE TABLE IF NOT EXISTS categories (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT,
          icon TEXT,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );
      `
    },
    {
      name: 'topics',
      sql: `
        CREATE TABLE IF NOT EXISTS topics (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT,
          order_index INTEGER DEFAULT 0,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );
      `
    },
    {
      name: 'learning_cards',
      sql: `
        CREATE TABLE IF NOT EXISTS learning_cards (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          type TEXT NOT NULL,
          description TEXT,
          color TEXT,
          icon TEXT,
          order_index INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );
      `
    },
    {
      name: 'questions',
      sql: `
        CREATE TABLE IF NOT EXISTS questions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          type TEXT NOT NULL,
          difficulty TEXT NOT NULL,
          category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
          topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
          learning_card_id UUID REFERENCES learning_cards(id) ON DELETE SET NULL,
          options JSONB,
          correct_answer JSONB NOT NULL,
          explanation TEXT,
          code TEXT,
          language TEXT,
          points INTEGER DEFAULT 0,
          tags TEXT[],
          is_published BOOLEAN DEFAULT true,
          author_id UUID,
          view_count INTEGER DEFAULT 0,
          success_rate FLOAT,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );
      `
    },
    {
      name: 'admin_users',
      sql: `
        CREATE TABLE IF NOT EXISTS admin_users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          name TEXT,
          role TEXT DEFAULT 'admin',
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );
      `
    }
  ];

  for (const table of tables) {
    console.log(`⏳ Creating table: ${table.name}...`);
    const { error } = await supabase.rpc('exec_sql', { sql_query: table.sql });

    if (error) {
      console.warn(`⚠️ Error creating table ${table.name}: ${error.message}`);
    } else {
      console.log(`✅ Table ${table.name} ready.`);
    }
  }

  // Seed test admin if credentials are provided
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    console.log(`👤 Seeding test admin: ${adminEmail}...`);
    // Using a pre-hashed version of 'password123' if that's what we want, 
    // or just a simple hash for 'admin-password'
    // For E2E tests, we often use a known hash to avoid bcrypt dependency in this script
    // 'password' hashed with 10 rounds: $2a$10$8K1p/a06PuvK78K6mE/MNeuT.eR/6mXWl9v6bL.hF8uJjD6v.3YqG

    // However, it's better to use a simple approach for CI.
    // We'll insert it if it doesn't exist.
    const { error: seedError } = await supabase.rpc('exec_sql', {
      sql_query: `
                INSERT INTO admin_users (email, password_hash, name, role)
                VALUES ('${adminEmail}', '$2a$10$8K1p/a06PuvK78K6mE/MNeuT.eR/6mXWl9v6bL.hF8uJjD6v.3YqG', 'Test Admin', 'admin')
                ON CONFLICT (email) DO NOTHING;
            `
    });

    if (seedError) {
      console.warn(`⚠️ Error seeding admin user: ${seedError.message}`);
    } else {
      console.log('✅ Test admin seeded (Note: Password is set to "password" if using the default hash)');
    }
  }

  console.log('✨ Database initialization finished.');
}

initDb().catch(err => {
  console.error('❌ Initialization failed:', err);
  process.exit(1);
});
