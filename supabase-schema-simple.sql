-- 🚀 Supabase Schema Creation - Simplified Version
-- Execute these statements one by one in Supabase SQL Editor

-- Step 1: Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Step 2: Create Core Tables
CREATE TABLE learning_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('core-technologies', 'framework-questions', 'problem-solving', 'system-design')),
  description TEXT,
  color VARCHAR(7),
  icon VARCHAR(10),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  card_type VARCHAR(50) NOT NULL,
  icon VARCHAR(10),
  color VARCHAR(7),
  order_index INTEGER DEFAULT 0,
  learning_card_id UUID REFERENCES learning_cards(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_questions INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('multiple-choice', 'code', 'essay', 'true-false')),
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  points INTEGER DEFAULT 1,
  options JSONB, -- For multiple choice questions
  correct_answer TEXT,
  explanation TEXT,
  test_cases JSONB, -- For code questions
  hints TEXT[],
  tags TEXT[],
  stats JSONB DEFAULT '{"attempts": 0, "correct": 0, "avgTime": 0}',
  metadata JSONB,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  learning_card_id UUID REFERENCES learning_cards(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE learning_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration INTEGER, -- in hours
  is_public BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE plan_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES learning_plans(id) ON DELETE CASCADE,
  card_id UUID REFERENCES learning_cards(id) ON DELETE CASCADE,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(plan_id, card_id)
);

CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  plan_id UUID REFERENCES learning_plans(id) ON DELETE CASCADE,
  card_id UUID REFERENCES learning_cards(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('not-started', 'in-progress', 'completed', 'skipped')),
  score INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0, -- in seconds
  last_attempted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE question_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  answer TEXT,
  is_correct BOOLEAN,
  time_spent INTEGER, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create Indexes
CREATE INDEX idx_learning_cards_is_active ON learning_cards(is_active);
CREATE INDEX idx_learning_cards_order ON learning_cards(order_index);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_is_active ON categories(is_active);
CREATE INDEX idx_categories_order ON categories(order_index);
CREATE INDEX idx_topics_slug ON topics(slug);
CREATE INDEX idx_topics_difficulty ON topics(difficulty);
CREATE INDEX idx_topics_is_active ON topics(is_active);
CREATE INDEX idx_topics_order ON topics(order_index);
CREATE INDEX idx_questions_category_id ON questions(category_id);
CREATE INDEX idx_questions_learning_card_id ON questions(learning_card_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_type ON questions(type);
CREATE INDEX idx_questions_is_active ON questions(is_active);
CREATE INDEX idx_questions_created_at ON questions(created_at);
CREATE INDEX idx_questions_points ON questions(points);
CREATE INDEX idx_learning_plans_is_public ON learning_plans(is_public);
CREATE INDEX idx_learning_plans_difficulty ON learning_plans(difficulty);
CREATE INDEX idx_learning_plans_is_active ON learning_plans(is_active);
CREATE INDEX idx_plan_cards_card_id ON plan_cards(card_id);
CREATE INDEX idx_plan_cards_order ON plan_cards(order_index);
CREATE INDEX idx_plan_cards_is_active ON plan_cards(is_active);
CREATE INDEX idx_user_progress_plan_id ON user_progress(plan_id);
CREATE INDEX idx_user_progress_card_id ON user_progress(card_id);
CREATE INDEX idx_user_progress_question_id ON user_progress(question_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);
CREATE INDEX idx_user_progress_user_plan ON user_progress(user_id, plan_id);
CREATE INDEX idx_question_attempts_question_id ON question_attempts(question_id);
CREATE INDEX idx_question_attempts_created_at ON question_attempts(created_at);
CREATE INDEX idx_question_attempts_user_question ON question_attempts(user_id, question_id);

-- Step 4: Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;

-- Step 5: Create Security Policies
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for topics" ON topics FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for questions" ON questions FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for learning plans" ON learning_plans FOR SELECT USING (is_active = true AND is_public = true);
CREATE POLICY "Public read access for plan cards" ON plan_cards FOR SELECT USING (is_active = true);

CREATE POLICY "Users can insert their own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own attempts" ON question_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own attempts" ON question_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin policies (you can adjust these based on your admin system)
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (
  auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "Admins can manage topics" ON topics FOR ALL USING (
  auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "Admins can manage questions" ON questions FOR ALL USING (
  auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "Admins can manage learning plans" ON learning_plans FOR ALL USING (
  auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin'
);
CREATE POLICY "Admins can manage plan cards" ON plan_cards FOR ALL USING (
  auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin'
);

