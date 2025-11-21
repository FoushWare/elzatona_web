-- 🚀 Supabase Migration Schema: Firebase → PostgreSQL
-- This file contains the complete SQL schema for migrating from Firebase to Supabase

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Learning Cards Table
CREATE TABLE learning_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('core-technologies', 'framework-questions', 'problem-solving', 'system-design')),
  description TEXT,
  color VARCHAR(7), -- hex color code
  icon VARCHAR(10),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories Table
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

-- Topics Table
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

-- Questions Table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('multiple-choice', 'open-ended', 'true-false', 'code')),
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  answer TEXT,
  explanation TEXT,
  hints TEXT[],
  constraints TEXT[], -- Array of constraint strings for problem-solving questions
  time_limit INTEGER, -- in seconds
  points INTEGER DEFAULT 10,
  tags TEXT[],
  metadata JSONB,
  -- Multiple choice options (stored as JSONB)
  options JSONB,
  -- Code template and test cases
  code_template TEXT,
  test_cases JSONB,
  language VARCHAR(50) DEFAULT 'javascript', -- Programming language for code questions
  -- LeetCode-style examples (input/output with explanations)
  examples JSONB DEFAULT '[]'::jsonb,
  -- Sample answers for open-ended questions
  sample_answers TEXT[],
  -- Statistics
  stats JSONB,
  -- Relationships
  topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  learning_card_id UUID REFERENCES learning_cards(id) ON DELETE SET NULL,
  -- Status
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);

-- Learning Plans Table
CREATE TABLE learning_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_days INTEGER DEFAULT 7,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_time_hours INTEGER DEFAULT 0,
  is_template BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT false,
  prerequisites TEXT[],
  learning_objectives TEXT[],
  metadata JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);

-- Plan Cards Junction Table (Many-to-Many)
CREATE TABLE plan_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES learning_plans(id) ON DELETE CASCADE,
  card_id UUID REFERENCES learning_cards(id) ON DELETE CASCADE,
  order_index INTEGER DEFAULT 0,
  question_count INTEGER DEFAULT 0,
  time_limit_minutes INTEGER DEFAULT 0,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(plan_id, card_id)
);

-- User Progress Table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  plan_id UUID REFERENCES learning_plans(id) ON DELETE CASCADE,
  card_id UUID REFERENCES learning_cards(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('not_started', 'in_progress', 'completed', 'skipped')),
  score DECIMAL(5,2), -- percentage score
  time_spent INTEGER, -- in seconds
  attempts INTEGER DEFAULT 0,
  last_attempted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- Question Attempts Table
CREATE TABLE question_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  selected_answer TEXT,
  is_correct BOOLEAN,
  time_spent INTEGER, -- in seconds
  points_earned INTEGER DEFAULT 0,
  attempt_number INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Learning Cards Indexes
CREATE INDEX idx_learning_cards_type ON learning_cards(type);
CREATE INDEX idx_learning_cards_is_active ON learning_cards(is_active);
CREATE INDEX idx_learning_cards_order ON learning_cards(order_index);

-- Categories Indexes
CREATE INDEX idx_categories_learning_card_id ON categories(learning_card_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_is_active ON categories(is_active);
CREATE INDEX idx_categories_order ON categories(order_index);

-- Topics Indexes
CREATE INDEX idx_topics_category_id ON topics(category_id);
CREATE INDEX idx_topics_slug ON topics(slug);
CREATE INDEX idx_topics_difficulty ON topics(difficulty);
CREATE INDEX idx_topics_is_active ON topics(is_active);
CREATE INDEX idx_topics_order ON topics(order_index);

-- Questions Indexes
CREATE INDEX idx_questions_topic_id ON questions(topic_id);
CREATE INDEX idx_questions_category_id ON questions(category_id);
CREATE INDEX idx_questions_learning_card_id ON questions(learning_card_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_type ON questions(type);
CREATE INDEX idx_questions_is_active ON questions(is_active);
CREATE INDEX idx_questions_created_at ON questions(created_at);
CREATE INDEX idx_questions_points ON questions(points);

-- Composite indexes for common queries
CREATE INDEX idx_questions_topic_active ON questions(topic_id, is_active);
CREATE INDEX idx_questions_card_active ON questions(learning_card_id, is_active);
CREATE INDEX idx_questions_category_active ON questions(category_id, is_active);

-- Full-text search index
CREATE INDEX idx_questions_search ON questions USING gin(to_tsvector('english', title || ' ' || content));

-- Learning Plans Indexes
CREATE INDEX idx_learning_plans_is_template ON learning_plans(is_template);
CREATE INDEX idx_learning_plans_is_public ON learning_plans(is_public);
CREATE INDEX idx_learning_plans_difficulty ON learning_plans(difficulty);
CREATE INDEX idx_learning_plans_is_active ON learning_plans(is_active);

-- Plan Cards Indexes
CREATE INDEX idx_plan_cards_plan_id ON plan_cards(plan_id);
CREATE INDEX idx_plan_cards_card_id ON plan_cards(card_id);
CREATE INDEX idx_plan_cards_order ON plan_cards(order_index);
CREATE INDEX idx_plan_cards_is_active ON plan_cards(is_active);

-- User Progress Indexes
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_plan_id ON user_progress(plan_id);
CREATE INDEX idx_user_progress_card_id ON user_progress(card_id);
CREATE INDEX idx_user_progress_question_id ON user_progress(question_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);
CREATE INDEX idx_user_progress_user_plan ON user_progress(user_id, plan_id);

-- Question Attempts Indexes
CREATE INDEX idx_question_attempts_user_id ON question_attempts(user_id);
CREATE INDEX idx_question_attempts_question_id ON question_attempts(question_id);
CREATE INDEX idx_question_attempts_created_at ON question_attempts(created_at);
CREATE INDEX idx_question_attempts_user_question ON question_attempts(user_id, question_id);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_learning_cards_updated_at BEFORE UPDATE ON learning_cards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_topics_updated_at BEFORE UPDATE ON topics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_plans_updated_at BEFORE UPDATE ON learning_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_plan_cards_updated_at BEFORE UPDATE ON plan_cards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- MATERIALIZED VIEWS FOR PERFORMANCE
-- ============================================================================

-- Question Statistics View
CREATE MATERIALIZED VIEW question_stats AS
SELECT 
  t.id as topic_id,
  t.name as topic_name,
  t.difficulty as topic_difficulty,
  c.id as category_id,
  c.name as category_name,
  c.card_type,
  lc.id as card_id,
  lc.title as card_title,
  lc.type as card_type_enum,
  COUNT(q.id) as total_questions,
  COUNT(CASE WHEN q.difficulty = 'beginner' THEN 1 END) as beginner_questions,
  COUNT(CASE WHEN q.difficulty = 'intermediate' THEN 1 END) as intermediate_questions,
  COUNT(CASE WHEN q.difficulty = 'advanced' THEN 1 END) as advanced_questions,
  COUNT(CASE WHEN q.type = 'multiple-choice' THEN 1 END) as multiple_choice_questions,
  COUNT(CASE WHEN q.type = 'open-ended' THEN 1 END) as open_ended_questions,
  COUNT(CASE WHEN q.type = 'true-false' THEN 1 END) as true_false_questions,
  COUNT(CASE WHEN q.type = 'code' THEN 1 END) as code_questions,
  AVG(q.points) as average_points,
  SUM(q.points) as total_points
FROM topics t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN learning_cards lc ON c.learning_card_id = lc.id
LEFT JOIN questions q ON q.topic_id = t.id AND q.is_active = true
WHERE t.is_active = true AND c.is_active = true AND lc.is_active = true
GROUP BY t.id, t.name, t.difficulty, c.id, c.name, c.card_type, lc.id, lc.title, lc.type;

-- Create index on materialized view
CREATE INDEX idx_question_stats_topic_id ON question_stats(topic_id);
CREATE INDEX idx_question_stats_category_id ON question_stats(category_id);
CREATE INDEX idx_question_stats_card_id ON question_stats(card_id);

-- Function to refresh question stats
CREATE OR REPLACE FUNCTION refresh_question_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW question_stats;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE learning_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;

-- Public read access for learning content
CREATE POLICY "Public read access for learning cards" ON learning_cards FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for topics" ON topics FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for questions" ON questions FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for learning plans" ON learning_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for plan cards" ON plan_cards FOR SELECT USING (is_active = true);

-- User-specific policies for progress tracking
CREATE POLICY "Users can view their own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own attempts" ON question_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own attempts" ON question_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin policies (for authenticated users with admin role)
CREATE POLICY "Admins can manage learning cards" ON learning_cards FOR ALL USING (
  auth.role() = 'authenticated' AND 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (
  auth.role() = 'authenticated' AND 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

CREATE POLICY "Admins can manage topics" ON topics FOR ALL USING (
  auth.role() = 'authenticated' AND 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

CREATE POLICY "Admins can manage questions" ON questions FOR ALL USING (
  auth.role() = 'authenticated' AND 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

CREATE POLICY "Admins can manage learning plans" ON learning_plans FOR ALL USING (
  auth.role() = 'authenticated' AND 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

CREATE POLICY "Admins can manage plan cards" ON plan_cards FOR ALL USING (
  auth.role() = 'authenticated' AND 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get question count for a topic
CREATE OR REPLACE FUNCTION get_topic_question_count(topic_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::INTEGER 
    FROM questions 
    WHERE topic_id = topic_uuid AND is_active = true
  );
END;
$$ LANGUAGE plpgsql;

-- Function to get question count for a category
CREATE OR REPLACE FUNCTION get_category_question_count(category_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::INTEGER 
    FROM questions q
    JOIN topics t ON q.topic_id = t.id
    WHERE t.category_id = category_uuid AND q.is_active = true AND t.is_active = true
  );
END;
$$ LANGUAGE plpgsql;

-- Function to get question count for a learning card
CREATE OR REPLACE FUNCTION get_card_question_count(card_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::INTEGER 
    FROM questions q
    JOIN topics t ON q.topic_id = t.id
    JOIN categories c ON t.category_id = c.id
    WHERE c.learning_card_id = card_uuid AND q.is_active = true AND t.is_active = true AND c.is_active = true
  );
END;
$$ LANGUAGE plpgsql;

-- Function to update question counts
CREATE OR REPLACE FUNCTION update_question_counts()
RETURNS void AS $$
BEGIN
  -- Update topic question counts
  UPDATE topics SET estimated_questions = get_topic_question_count(id);
  
  -- Refresh materialized view
  PERFORM refresh_question_stats();
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SAMPLE DATA INSERTION
-- ============================================================================

-- Insert sample learning cards
INSERT INTO learning_cards (title, type, description, color, icon, order_index) VALUES
('Core Technologies', 'core-technologies', 'HTML, CSS, JavaScript, TypeScript fundamentals', '#3B82F6', '💻', 1),
('Framework Questions', 'framework-questions', 'React, Next.js, Vue, Angular, Svelte', '#10B981', '⚛️', 2),
('Problem Solving', 'problem-solving', 'Frontend coding challenges and algorithms', '#8B5CF6', '🧩', 3),
('System Design', 'system-design', 'Frontend architecture patterns', '#F59E0B', '🏗️', 4);

-- Insert sample categories
INSERT INTO categories (name, slug, description, card_type, icon, color, order_index, learning_card_id) VALUES
('React', 'react', 'React library fundamentals, components, hooks, and advanced patterns', 'Framework Questions', '⚛️', '#61DAFB', 1, (SELECT id FROM learning_cards WHERE type = 'framework-questions')),
('JavaScript', 'javascript', 'JavaScript fundamentals, ES6+, DOM manipulation, and advanced concepts', 'Core Technologies', '🟨', '#F7DF1E', 1, (SELECT id FROM learning_cards WHERE type = 'core-technologies')),
('CSS', 'css', 'CSS fundamentals, layouts, animations, and modern CSS features', 'Core Technologies', '🎨', '#1572B6', 2, (SELECT id FROM learning_cards WHERE type = 'core-technologies')),
('HTML', 'html', 'HTML fundamentals, semantic markup, and accessibility', 'Core Technologies', '📄', '#E34F26', 3, (SELECT id FROM learning_cards WHERE type = 'core-technologies'));

-- Insert sample topics
INSERT INTO topics (name, slug, description, difficulty, estimated_questions, order_index, category_id) VALUES
('React Basics', 'react-basics', 'Core React concepts, JSX, elements, and components', 'beginner', 30, 1, (SELECT id FROM categories WHERE slug = 'react')),
('React Hooks', 'react-hooks', 'useState, useEffect, custom hooks, and advanced patterns', 'intermediate', 25, 2, (SELECT id FROM categories WHERE slug = 'react')),
('React Components', 'react-components', 'Function components, class components, pure components', 'beginner', 20, 3, (SELECT id FROM categories WHERE slug = 'react')),
('JavaScript Fundamentals', 'javascript-fundamentals', 'Variables, functions, objects, arrays, and basic concepts', 'beginner', 40, 1, (SELECT id FROM categories WHERE slug = 'javascript')),
('ES6+ Features', 'es6-features', 'Arrow functions, destructuring, modules, and modern JavaScript', 'intermediate', 30, 2, (SELECT id FROM categories WHERE slug = 'javascript'));

-- Insert sample learning plans
INSERT INTO learning_plans (name, description, duration_days, difficulty, estimated_time_hours, is_template, is_public) VALUES
('Frontend Fundamentals', 'Complete frontend development course covering HTML, CSS, and JavaScript', 14, 'beginner', 20, true, true),
('React Mastery', 'Advanced React development course with hooks, context, and performance optimization', 21, 'intermediate', 30, true, true),
('Full-Stack Frontend', 'Comprehensive frontend development with modern frameworks and tools', 30, 'advanced', 50, true, true);

-- Insert sample plan-card relationships
INSERT INTO plan_cards (plan_id, card_id, order_index, question_count, time_limit_minutes, difficulty) VALUES
((SELECT id FROM learning_plans WHERE name = 'Frontend Fundamentals'), (SELECT id FROM learning_cards WHERE type = 'core-technologies'), 1, 0, 120, 'beginner'),
((SELECT id FROM learning_plans WHERE name = 'React Mastery'), (SELECT id FROM learning_cards WHERE type = 'framework-questions'), 1, 0, 180, 'intermediate'),
((SELECT id FROM learning_plans WHERE name = 'Full-Stack Frontend'), (SELECT id FROM learning_cards WHERE type = 'core-technologies'), 1, 0, 120, 'advanced'),
((SELECT id FROM learning_plans WHERE name = 'Full-Stack Frontend'), (SELECT id FROM learning_cards WHERE type = 'framework-questions'), 2, 0, 180, 'advanced'),
((SELECT id FROM learning_plans WHERE name = 'Full-Stack Frontend'), (SELECT id FROM learning_cards WHERE type = 'problem-solving'), 3, 0, 240, 'advanced');

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE learning_cards IS 'Learning card definitions that group related categories';
COMMENT ON TABLE categories IS 'Question categories that belong to learning cards';
COMMENT ON TABLE topics IS 'Question topics that belong to categories';
COMMENT ON TABLE questions IS 'Individual learning questions with full content and metadata';
COMMENT ON TABLE learning_plans IS 'Learning plan templates and user-created plans';
COMMENT ON TABLE plan_cards IS 'Junction table linking learning plans to learning cards';
COMMENT ON TABLE user_progress IS 'User progress tracking for questions and plans';
COMMENT ON TABLE question_attempts IS 'Individual question attempts by users';

COMMENT ON COLUMN questions.options IS 'JSONB array of multiple choice options with isCorrect flag';
COMMENT ON COLUMN questions.test_cases IS 'JSONB array of test cases for code questions';
COMMENT ON COLUMN questions.stats IS 'JSONB object containing question statistics';
COMMENT ON COLUMN questions.metadata IS 'JSONB object for flexible additional data';

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

-- This schema is now ready for migration from Firebase to Supabase!
-- Next steps:
-- 1. Run this SQL in your Supabase SQL editor
-- 2. Create migration scripts to transfer data from Firebase
-- 3. Update your API endpoints to use Supabase client
-- 4. Test the new relational structure
-- 5. Deploy and monitor performance

SELECT 'Supabase schema created successfully! Ready for Firebase migration.' as status;
