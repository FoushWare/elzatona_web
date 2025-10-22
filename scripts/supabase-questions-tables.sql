-- React Questions Seeding SQL for Supabase
-- Execute this SQL in your Supabase SQL Editor

-- ==============================================
-- STEP 1: CREATE QUESTIONS TABLE
-- ==============================================

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

-- ==============================================
-- STEP 2: CREATE QUESTION-TOPIC RELATIONSHIP TABLE
-- ==============================================

CREATE TABLE IF NOT EXISTS question_topics (
  question_id VARCHAR(50) REFERENCES questions(id) ON DELETE CASCADE,
  topic_id VARCHAR(50) REFERENCES topics(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, topic_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE question_topics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Service role can manage question_topics" ON question_topics FOR ALL USING (
  auth.role() = 'service_role'
);

CREATE POLICY IF NOT EXISTS "Public can read question_topics" ON question_topics FOR SELECT USING (true);

-- ==============================================
-- STEP 3: CREATE QUESTION-CATEGORY RELATIONSHIP TABLE
-- ==============================================

CREATE TABLE IF NOT EXISTS question_categories (
  question_id VARCHAR(50) REFERENCES questions(id) ON DELETE CASCADE,
  category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, category_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE question_categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Service role can manage question_categories" ON question_categories FOR ALL USING (
  auth.role() = 'service_role'
);

CREATE POLICY IF NOT EXISTS "Public can read question_categories" ON question_categories FOR SELECT USING (true);

-- ==============================================
-- STEP 4: CREATE QUESTION-CARD RELATIONSHIP TABLE
-- ==============================================

CREATE TABLE IF NOT EXISTS question_cards (
  question_id VARCHAR(50) REFERENCES questions(id) ON DELETE CASCADE,
  card_id VARCHAR(50) REFERENCES cards(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, card_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE question_cards ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Service role can manage question_cards" ON question_cards FOR ALL USING (
  auth.role() = 'service_role'
);

CREATE POLICY IF NOT EXISTS "Public can read question_cards" ON question_cards FOR SELECT USING (true);

-- ==============================================
-- STEP 5: VERIFICATION QUERIES
-- ==============================================

-- Check if tables were created successfully
SELECT 
  'questions' as table_name, 
  COUNT(*) as record_count 
FROM questions
UNION ALL
SELECT 
  'question_topics' as table_name, 
  COUNT(*) as record_count 
FROM question_topics
UNION ALL
SELECT 
  'question_categories' as table_name, 
  COUNT(*) as record_count 
FROM question_categories
UNION ALL
SELECT 
  'question_cards' as table_name, 
  COUNT(*) as record_count 
FROM question_cards;

-- Check existing categories, topics, and cards
SELECT 'Categories' as type, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Topics' as type, COUNT(*) as count FROM topics
UNION ALL
SELECT 'Cards' as type, COUNT(*) as count FROM cards;

-- Sample React topics
SELECT id, name, slug, category_id 
FROM topics 
WHERE category_id = 'cat-react' 
ORDER BY name 
LIMIT 10;


