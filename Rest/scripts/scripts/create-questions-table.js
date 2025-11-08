#!/usr/bin/env node

console.log('📋 Questions Table Creation SQL\n');
console.log('Copy and paste this SQL into your Supabase SQL Editor:\n');
console.log('='.repeat(80));
console.log(`
-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) CHECK (type IN ('open-ended', 'multiple-choice', 'true-false', 'code-completion', 'debugging')),
  category VARCHAR(100),
  subcategory VARCHAR(100),
  topic VARCHAR(100),
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  learning_card_id VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(100) DEFAULT 'system',
  updated_by VARCHAR(100) DEFAULT 'system',
  tags TEXT[],
  explanation TEXT,
  points INTEGER DEFAULT 1,
  time_limit INTEGER DEFAULT 120,
  sample_answers TEXT[],
  options JSONB,
  correct_answer TEXT,
  hints TEXT[],
  related_links TEXT[]
);

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Service role can manage questions" ON questions FOR ALL USING (
  auth.role() = 'service_role'
);

CREATE POLICY IF NOT EXISTS "Public can read questions" ON questions FOR SELECT USING (true);

-- Verify table creation
SELECT 'questions' as table_name, COUNT(*) as record_count FROM questions;
`);
console.log('='.repeat(80));
console.log('\n🎯 Steps to create the table:');
console.log('   1. Go to your Supabase Dashboard');
console.log('   2. Navigate to SQL Editor');
console.log('   3. Copy and paste the SQL above');
console.log('   4. Click "Run" to execute');
console.log('   5. Verify the table was created successfully');
console.log('\n✅ After creating the table, run:');
console.log('   node scripts/seed-questions-data-only.js');
