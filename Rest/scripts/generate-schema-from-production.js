#!/usr/bin/env node

/**
 * Generate SQL Schema from Production Project
 *
 * This script generates CREATE TABLE statements based on the production schema
 * and creates a SQL file that can be applied to the test project.
 */

const schema = {
  tables: [
    {
      name: 'learning_cards',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'title VARCHAR(255) NOT NULL',
        "type VARCHAR(50) NOT NULL CHECK (type IN ('core-technologies', 'framework-questions', 'problem-solving', 'system-design'))",
        'description TEXT',
        'color VARCHAR(7)',
        'icon VARCHAR(10)',
        'order_index INTEGER DEFAULT 0',
        'is_active BOOLEAN DEFAULT true',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'categories',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'name VARCHAR(255) NOT NULL',
        'slug VARCHAR(255) UNIQUE NOT NULL',
        'description TEXT',
        'card_type VARCHAR(50) NOT NULL',
        'icon VARCHAR(10)',
        'color VARCHAR(7)',
        'order_index INTEGER DEFAULT 0',
        'learning_card_id UUID REFERENCES learning_cards(id) ON DELETE CASCADE',
        'is_active BOOLEAN DEFAULT true',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'topics',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'name VARCHAR(255) NOT NULL',
        'slug VARCHAR(255) UNIQUE NOT NULL',
        'description TEXT',
        "difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced'))",
        'estimated_questions INTEGER DEFAULT 0',
        'order_index INTEGER DEFAULT 0',
        'category_id UUID REFERENCES categories(id) ON DELETE CASCADE',
        'is_active BOOLEAN DEFAULT true',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'questions',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'title VARCHAR(500) NOT NULL',
        'content TEXT NOT NULL',
        "type VARCHAR(50) NOT NULL CHECK (type IN ('multiple-choice', 'open-ended', 'true-false', 'code', 'mcq', 'concept', 'scenario'))",
        "difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced'))",
        'points INTEGER DEFAULT 1',
        'options JSONB',
        'correct_answer TEXT',
        'explanation TEXT',
        'test_cases JSONB',
        'hints TEXT[]',
        'tags TEXT[]',
        'stats JSONB DEFAULT \'{"avgTime": 0, "correct": 0, "attempts": 0}\'::jsonb',
        'metadata JSONB',
        'category_id UUID REFERENCES categories(id) ON DELETE SET NULL',
        'learning_card_id UUID REFERENCES learning_cards(id) ON DELETE SET NULL',
        'is_active BOOLEAN DEFAULT true',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'topic_id UUID REFERENCES topics(id) ON DELETE SET NULL',
      ],
    },
    {
      name: 'learning_plans',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'name VARCHAR(255) NOT NULL',
        'description TEXT',
        "difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced'))",
        'estimated_duration INTEGER',
        'is_public BOOLEAN DEFAULT false',
        'is_active BOOLEAN DEFAULT true',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'plan_cards',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'plan_id UUID REFERENCES learning_plans(id) ON DELETE CASCADE',
        'card_id UUID REFERENCES learning_cards(id) ON DELETE CASCADE',
        'order_index INTEGER DEFAULT 0',
        'is_active BOOLEAN DEFAULT true',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'user_progress',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'user_id UUID NOT NULL',
        'plan_id UUID REFERENCES learning_plans(id) ON DELETE CASCADE',
        'card_id UUID REFERENCES learning_cards(id) ON DELETE CASCADE',
        'question_id UUID REFERENCES questions(id) ON DELETE CASCADE',
        "status VARCHAR(20) CHECK (status IN ('not-started', 'in-progress', 'completed', 'skipped'))",
        'score INTEGER DEFAULT 0',
        'time_spent INTEGER DEFAULT 0',
        'last_attempted_at TIMESTAMP WITH TIME ZONE',
        'completed_at TIMESTAMP WITH TIME ZONE',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        "progress_data JSONB DEFAULT '{}'::jsonb",
        'last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'question_attempts',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'user_id UUID NOT NULL',
        'question_id UUID REFERENCES questions(id) ON DELETE CASCADE',
        'answer TEXT',
        'is_correct BOOLEAN',
        'time_spent INTEGER',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'admins',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL',
        'email VARCHAR(255) UNIQUE NOT NULL',
        'name VARCHAR(255)',
        "role VARCHAR(50) DEFAULT 'admin'",
        "permissions JSONB DEFAULT '{}'::jsonb",
        'is_active BOOLEAN DEFAULT true',
        'last_login TIMESTAMP WITH TIME ZONE',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'frontend_tasks',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'title VARCHAR(255) NOT NULL',
        'description TEXT NOT NULL',
        "difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard'))",
        'category VARCHAR(255) NOT NULL',
        'estimated_time INTEGER DEFAULT 30',
        "author VARCHAR(255) DEFAULT 'Elzatona Team'",
        'company VARCHAR(255)',
        'requirements TEXT NOT NULL',
        "hints TEXT[] DEFAULT '{}'::text[]",
        'solution TEXT',
        'starter_code TEXT',
        "files JSONB DEFAULT '[]'::jsonb",
        "test_cases JSONB DEFAULT '[]'::jsonb",
        "tags TEXT[] DEFAULT '{}'::text[]",
        'is_active BOOLEAN DEFAULT true',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'problem_solving_tasks',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'title VARCHAR(255) NOT NULL',
        'description TEXT NOT NULL',
        "difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard'))",
        'category VARCHAR(255) NOT NULL',
        'function_name VARCHAR(255)',
        'starter_code TEXT',
        'solution TEXT',
        "test_cases JSONB DEFAULT '[]'::jsonb",
        "constraints TEXT[] DEFAULT '{}'::text[]",
        "examples JSONB DEFAULT '[]'::jsonb",
        "tags TEXT[] DEFAULT '{}'::text[]",
        'is_active BOOLEAN DEFAULT true',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'questions_topics',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE',
        'topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE',
        'order_index INTEGER DEFAULT 0',
        'is_primary BOOLEAN DEFAULT false',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'category_topics',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE',
        'topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE',
        'order_index INTEGER DEFAULT 0',
        'is_primary BOOLEAN DEFAULT false',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'card_categories',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'card_id UUID NOT NULL REFERENCES learning_cards(id) ON DELETE CASCADE',
        'category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE',
        'order_index INTEGER DEFAULT 0',
        'is_primary BOOLEAN DEFAULT false',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'plan_categories',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'plan_id UUID NOT NULL REFERENCES learning_plans(id) ON DELETE CASCADE',
        'category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE',
        'order_index INTEGER DEFAULT 0',
        'is_primary BOOLEAN DEFAULT false',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'plan_questions',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'plan_id UUID NOT NULL REFERENCES learning_plans(id) ON DELETE CASCADE',
        'question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE',
        'topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE',
        'order_index INTEGER DEFAULT 0',
        'is_active BOOLEAN DEFAULT true',
        'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
        'updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
      ],
    },
    {
      name: 'admin_users',
      columns: [
        'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
        'email TEXT UNIQUE NOT NULL',
        'password_hash TEXT NOT NULL',
        'name TEXT',
        "role TEXT NOT NULL DEFAULT 'admin'",
        'is_active BOOLEAN DEFAULT true',
        "permissions JSONB DEFAULT '[]'::jsonb",
        'created_at TIMESTAMPTZ DEFAULT NOW()',
        'updated_at TIMESTAMPTZ DEFAULT NOW()',
      ],
    },
  ],
};

// Generate SQL
let sql = `-- ============================================================================
-- PRODUCTION SCHEMA FOR TEST DATABASE
-- ============================================================================
-- Generated from production project: zatona-web (hpnewqkvpnthpohvxcmq)
-- Target: zatona-web-testing (slfyltsmcivmqfloxpmq)
-- 
-- This schema includes all 17 tables from production
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

`;

// Generate CREATE TABLE statements
schema.tables.forEach(table => {
  sql += `-- ${table.name} Table\n`;
  sql += `CREATE TABLE IF NOT EXISTS ${table.name} (\n`;
  sql += `  ${table.columns.join(',\n  ')}\n`;
  sql += `);\n\n`;
});

// Add indexes
sql += `-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_learning_cards_type ON learning_cards(type);
CREATE INDEX IF NOT EXISTS idx_learning_cards_is_active ON learning_cards(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_learning_card_id ON categories(learning_card_id);
CREATE INDEX IF NOT EXISTS idx_topics_slug ON topics(slug);
CREATE INDEX IF NOT EXISTS idx_topics_category_id ON topics(category_id);
CREATE INDEX IF NOT EXISTS idx_questions_topic_id ON questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_questions_category_id ON questions(category_id);
CREATE INDEX IF NOT EXISTS idx_questions_learning_card_id ON questions(learning_card_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

`;

// Add triggers
sql += `-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

`;

const tablesWithUpdatedAt = [
  'learning_cards',
  'categories',
  'topics',
  'questions',
  'learning_plans',
  'plan_cards',
  'user_progress',
  'questions_topics',
  'category_topics',
  'card_categories',
  'plan_categories',
  'plan_questions',
  'admin_users',
  'admins',
  'frontend_tasks',
  'problem_solving_tasks',
];

tablesWithUpdatedAt.forEach(table => {
  sql += `DROP TRIGGER IF EXISTS update_${table}_updated_at ON ${table};\n`;
  sql += `CREATE TRIGGER update_${table}_updated_at BEFORE UPDATE ON ${table} FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();\n\n`;
});

// Add RLS
sql += `-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE learning_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE frontend_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_solving_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

`;

console.log(sql);
