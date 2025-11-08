-- Supabase Database Schema and Seed Data
-- Execute this SQL in your Supabase SQL Editor

-- ==============================================
-- STEP 1: CREATE TABLES
-- ==============================================

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  card_type VARCHAR(100),
  icon VARCHAR(10),
  color VARCHAR(7),
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_questions INTEGER DEFAULT 0,
  "order" INTEGER DEFAULT 0,
  category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cards table
CREATE TABLE IF NOT EXISTS cards (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  color VARCHAR(20),
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create card_categories junction table
CREATE TABLE IF NOT EXISTS card_categories (
  card_id VARCHAR(50) REFERENCES cards(id) ON DELETE CASCADE,
  category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (card_id, category_id)
);

-- Create learning plans table
CREATE TABLE IF NOT EXISTS learning_plans (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL,
  total_questions INTEGER DEFAULT 0,
  new_questions INTEGER DEFAULT 0,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create plan_card_distribution table
CREATE TABLE IF NOT EXISTS plan_card_distribution (
  id SERIAL PRIMARY KEY,
  plan_id VARCHAR(50) REFERENCES learning_plans(id) ON DELETE CASCADE,
  card_slug VARCHAR(255) NOT NULL,
  question_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- STEP 2: ENABLE ROW LEVEL SECURITY
-- ==============================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_card_distribution ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- STEP 3: CREATE POLICIES
-- ==============================================

-- Service role policies (for admin operations)
CREATE POLICY IF NOT EXISTS "Service role can manage categories" ON categories FOR ALL USING (
  auth.role() = 'service_role'
);

CREATE POLICY IF NOT EXISTS "Service role can manage topics" ON topics FOR ALL USING (
  auth.role() = 'service_role'
);

CREATE POLICY IF NOT EXISTS "Service role can manage cards" ON cards FOR ALL USING (
  auth.role() = 'service_role'
);

CREATE POLICY IF NOT EXISTS "Service role can manage card_categories" ON card_categories FOR ALL USING (
  auth.role() = 'service_role'
);

CREATE POLICY IF NOT EXISTS "Service role can manage learning_plans" ON learning_plans FOR ALL USING (
  auth.role() = 'service_role'
);

CREATE POLICY IF NOT EXISTS "Service role can manage plan_card_distribution" ON plan_card_distribution FOR ALL USING (
  auth.role() = 'service_role'
);

-- Public read access policies
CREATE POLICY IF NOT EXISTS "Public can read categories" ON categories FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Public can read topics" ON topics FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Public can read cards" ON cards FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Public can read card_categories" ON card_categories FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Public can read learning_plans" ON learning_plans FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Public can read plan_card_distribution" ON plan_card_distribution FOR SELECT USING (true);

-- ==============================================
-- STEP 4: SEED CATEGORIES DATA
-- ==============================================

INSERT INTO categories (id, name, slug, description, card_type, icon, color, "order") VALUES
('cat-react', 'React', 'react', 'React library fundamentals, components, hooks, and advanced patterns', 'Framework Questions', '⚛️', '#61DAFB', 1),
('cat-javascript', 'JavaScript', 'javascript', 'Modern JavaScript (ES6+), core concepts, and advanced patterns', 'Core Technologies', '🟨', '#F7DF1E', 2),
('cat-nextjs', 'Next.js', 'nextjs', 'Next.js framework, SSR, SSG, routing, and optimization', 'Framework Questions', '▲', '#000000', 3),
('cat-css', 'CSS', 'css', 'CSS fundamentals, layouts, animations, and modern techniques', 'Core Technologies', '🎨', '#1572B6', 4),
('cat-html', 'HTML', 'html', 'HTML5 semantics, accessibility, forms, and best practices', 'Core Technologies', '🌐', '#E34F26', 5),
('cat-system-design', 'System Design', 'system-design', 'Frontend system design, architecture, and scalability', 'System Design', '🏗️', '#FF6B6B', 6),
('cat-design-patterns', 'Design Patterns', 'design-patterns', 'Common frontend design patterns and best practices', 'Framework Questions', '🎯', '#9B59B6', 7),
('cat-performance', 'Performance Patterns', 'performance-patterns', 'Frontend performance optimization techniques', 'System Design', '⚡', '#F39C12', 8),
('cat-rendering', 'Rendering Patterns', 'rendering-patterns', 'Different rendering strategies for web applications', 'System Design', '🎬', '#3498DB', 9),
('cat-security', 'Security', 'security', 'Web security, authentication, and best practices', 'System Design', '🔒', '#E74C3C', 10);

-- ==============================================
-- STEP 5: SEED CARDS DATA
-- ==============================================

INSERT INTO cards (id, name, slug, description, icon, color, "order") VALUES
('card-core-tech', 'Core Technologies', 'core-technologies', 'HTML, CSS, JavaScript, TypeScript fundamentals', '💻', 'blue', 1),
('card-frameworks', 'Framework Questions', 'framework-questions', 'React.js, Next.js, Vue.js, Angular, Svelte', '⚛️', 'green', 2),
('card-problem-solving', 'Problem Solving', 'problem-solving', 'Frontend-specific coding challenges and algorithms', '🧩', 'purple', 3),
('card-system-design', 'System Design', 'system-design', 'Frontend architecture patterns (Facebook feeds, Twitter timeline)', '🏗️', 'orange', 4);

-- ==============================================
-- STEP 6: SEED CARD-CATEGORY RELATIONSHIPS
-- ==============================================

INSERT INTO card_categories (card_id, category_id) VALUES
-- Core Technologies
('card-core-tech', 'cat-html'),
('card-core-tech', 'cat-css'),
('card-core-tech', 'cat-javascript'),

-- Framework Questions
('card-frameworks', 'cat-react'),
('card-frameworks', 'cat-nextjs'),
('card-frameworks', 'cat-design-patterns'),

-- System Design
('card-system-design', 'cat-system-design'),
('card-system-design', 'cat-performance'),
('card-system-design', 'cat-rendering'),
('card-system-design', 'cat-security');

-- ==============================================
-- STEP 7: SEED LEARNING PLANS DATA
-- ==============================================

INSERT INTO learning_plans (id, name, slug, description, duration, total_questions, new_questions, "order") VALUES
('plan-1-day', '1-Day Interview Prep', '1-day', 'Intensive 1-day preparation covering core essentials', 1, 100, 0, 1),
('plan-2-day', '2-Day Interview Prep', '2-day', 'Comprehensive 2-day preparation with all Day 1 questions + new content', 2, 150, 50, 2),
('plan-3-day', '3-Day Interview Prep', '3-day', 'Extended 3-day prep with cumulative Day 1-2 questions + new content', 3, 200, 50, 3),
('plan-4-day', '4-Day Interview Prep', '4-day', 'Thorough 4-day preparation with all previous questions + new material', 4, 250, 50, 4),
('plan-5-day', '5-Day Interview Prep', '5-day', 'Comprehensive 5-day program with cumulative content', 5, 300, 50, 5),
('plan-6-day', '6-Day Interview Prep', '6-day', 'Extensive 6-day preparation covering all topics deeply', 6, 350, 50, 6),
('plan-7-day', '7-Day Interview Prep', '7-day', 'Complete 7-day mastery program with all cumulative questions', 7, 400, 50, 7);

-- ==============================================
-- STEP 8: SEED PLAN CARD DISTRIBUTIONS
-- ==============================================

-- 1-Day Plan
INSERT INTO plan_card_distribution (plan_id, card_slug, question_count) VALUES
('plan-1-day', 'core-technologies', 25),
('plan-1-day', 'framework-questions', 25),
('plan-1-day', 'problem-solving', 25),
('plan-1-day', 'system-design', 25);

-- 2-Day Plan
INSERT INTO plan_card_distribution (plan_id, card_slug, question_count) VALUES
('plan-2-day', 'core-technologies', 38),
('plan-2-day', 'framework-questions', 37),
('plan-2-day', 'problem-solving', 38),
('plan-2-day', 'system-design', 37);

-- 3-Day Plan
INSERT INTO plan_card_distribution (plan_id, card_slug, question_count) VALUES
('plan-3-day', 'core-technologies', 50),
('plan-3-day', 'framework-questions', 50),
('plan-3-day', 'problem-solving', 50),
('plan-3-day', 'system-design', 50);

-- 4-Day Plan
INSERT INTO plan_card_distribution (plan_id, card_slug, question_count) VALUES
('plan-4-day', 'core-technologies', 63),
('plan-4-day', 'framework-questions', 62),
('plan-4-day', 'problem-solving', 63),
('plan-4-day', 'system-design', 62);

-- 5-Day Plan
INSERT INTO plan_card_distribution (plan_id, card_slug, question_count) VALUES
('plan-5-day', 'core-technologies', 75),
('plan-5-day', 'framework-questions', 75),
('plan-5-day', 'problem-solving', 75),
('plan-5-day', 'system-design', 75);

-- 6-Day Plan
INSERT INTO plan_card_distribution (plan_id, card_slug, question_count) VALUES
('plan-6-day', 'core-technologies', 88),
('plan-6-day', 'framework-questions', 87),
('plan-6-day', 'problem-solving', 88),
('plan-6-day', 'system-design', 87);

-- 7-Day Plan
INSERT INTO plan_card_distribution (plan_id, card_slug, question_count) VALUES
('plan-7-day', 'core-technologies', 100),
('plan-7-day', 'framework-questions', 100),
('plan-7-day', 'problem-solving', 100),
('plan-7-day', 'system-design', 100);

-- ==============================================
-- STEP 9: SEED TOPICS DATA (Sample - React Topics)
-- ==============================================

INSERT INTO topics (id, name, slug, description, difficulty, estimated_questions, "order", category_id) VALUES
-- React Topics
('react-basics', 'React Basics', 'react-basics', 'Core React concepts, JSX, elements, and components', 'beginner', 30, 1, 'cat-react'),
('react-components', 'Components', 'components', 'Function components, class components, pure components', 'beginner', 25, 2, 'cat-react'),
('react-jsx', 'JSX', 'jsx', 'JSX syntax, expressions, and transformations', 'beginner', 15, 3, 'cat-react'),
('react-props', 'Props', 'props', 'Props passing, PropTypes, default props, children', 'beginner', 20, 4, 'cat-react'),
('react-state', 'State', 'state', 'State management, useState, setState, immutability', 'beginner', 25, 5, 'cat-react'),
('react-hooks', 'Hooks', 'hooks', 'useState, useEffect, useContext, useReducer, custom hooks', 'intermediate', 40, 6, 'cat-react'),
('react-lifecycle', 'Lifecycle Methods', 'lifecycle', 'Component lifecycle, mounting, updating, unmounting', 'intermediate', 20, 7, 'cat-react'),
('react-events', 'Event Handling', 'events', 'Synthetic events, event handlers, event delegation', 'beginner', 15, 8, 'cat-react'),
('react-conditional-rendering', 'Conditional Rendering', 'conditional-rendering', 'If/else, ternary, logical operators, inline expressions', 'beginner', 12, 9, 'cat-react'),
('react-lists-keys', 'Lists and Keys', 'lists-keys', 'Rendering lists, key prop, array mapping', 'beginner', 10, 10, 'cat-react'),

-- JavaScript Topics
('js-basics', 'JavaScript Basics', 'basics', 'Variables, data types, operators, control flow', 'beginner', 25, 1, 'cat-javascript'),
('js-functions', 'Functions', 'functions', 'Function declarations, expressions, arrow functions, IIFE', 'beginner', 20, 2, 'cat-javascript'),
('js-scope-closure', 'Scope & Closures', 'scope-closure', 'Lexical scope, closures, hoisting, temporal dead zone', 'intermediate', 18, 3, 'cat-javascript'),
('js-this', 'This Keyword', 'this', 'This binding, call, apply, bind, arrow functions', 'intermediate', 15, 4, 'cat-javascript'),
('js-objects', 'Objects', 'objects', 'Object literals, properties, methods, prototypes', 'beginner', 20, 5, 'cat-javascript'),
('js-arrays', 'Arrays', 'arrays', 'Array methods, iteration, map, filter, reduce', 'beginner', 22, 6, 'cat-javascript'),
('js-es6-features', 'ES6+ Features', 'es6-features', 'Let/const, destructuring, spread/rest, template literals', 'intermediate', 25, 7, 'cat-javascript'),
('js-async', 'Asynchronous JavaScript', 'async', 'Callbacks, promises, async/await, event loop', 'intermediate', 30, 8, 'cat-javascript'),

-- Next.js Topics
('nextjs-basics', 'Next.js Basics', 'basics', 'Introduction, installation, project structure', 'beginner', 15, 1, 'cat-nextjs'),
('nextjs-routing', 'Routing', 'routing', 'File-based routing, dynamic routes, nested routes', 'beginner', 20, 2, 'cat-nextjs'),
('nextjs-pages', 'Pages', 'pages', 'Page components, _app.js, _document.js', 'beginner', 12, 3, 'cat-nextjs'),
('nextjs-data-fetching', 'Data Fetching', 'data-fetching', 'getStaticProps, getServerSideProps, getStaticPaths', 'intermediate', 25, 4, 'cat-nextjs'),
('nextjs-ssr', 'Server-Side Rendering', 'ssr', 'SSR concepts, implementation, use cases', 'intermediate', 18, 5, 'cat-nextjs'),
('nextjs-ssg', 'Static Site Generation', 'ssg', 'SSG, static exports, incremental static regeneration', 'intermediate', 15, 6, 'cat-nextjs'),

-- CSS Topics
('css-basics', 'CSS Basics', 'basics', 'Selectors, specificity, cascade, inheritance', 'beginner', 20, 1, 'cat-css'),
('css-box-model', 'Box Model', 'box-model', 'Content, padding, border, margin, box-sizing', 'beginner', 12, 2, 'cat-css'),
('css-layout', 'Layout', 'layout', 'Display, position, float, clear', 'beginner', 15, 3, 'cat-css'),
('css-flexbox', 'Flexbox', 'flexbox', 'Flex container, flex items, alignment, ordering', 'intermediate', 18, 4, 'cat-css'),
('css-grid', 'Grid', 'grid', 'Grid container, grid items, tracks, areas', 'intermediate', 20, 5, 'cat-css'),
('css-responsive', 'Responsive Design', 'responsive', 'Media queries, mobile-first, breakpoints', 'intermediate', 15, 6, 'cat-css'),

-- HTML Topics
('html-basics', 'HTML Basics', 'basics', 'Elements, tags, attributes, document structure', 'beginner', 15, 1, 'cat-html'),
('html-semantics', 'Semantic HTML', 'semantics', 'Header, nav, main, article, section, footer', 'beginner', 12, 2, 'cat-html'),
('html-forms', 'Forms', 'forms', 'Form elements, input types, validation, submission', 'intermediate', 18, 3, 'cat-html'),
('html-accessibility', 'Accessibility', 'accessibility', 'ARIA, screen readers, keyboard navigation, alt text', 'intermediate', 15, 4, 'cat-html'),
('html-media', 'Media Elements', 'media', 'Images, audio, video, picture, source', 'beginner', 10, 5, 'cat-html');

-- ==============================================
-- VERIFICATION QUERIES
-- ==============================================

-- Check counts
SELECT 'Categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Topics' as table_name, COUNT(*) as count FROM topics
UNION ALL
SELECT 'Cards' as table_name, COUNT(*) as count FROM cards
UNION ALL
SELECT 'Learning Plans' as table_name, COUNT(*) as count FROM learning_plans
UNION ALL
SELECT 'Card Categories' as table_name, COUNT(*) as count FROM card_categories
UNION ALL
SELECT 'Plan Distributions' as table_name, COUNT(*) as count FROM plan_card_distribution;

-- Sample data verification
SELECT c.name as category, COUNT(t.id) as topic_count 
FROM categories c 
LEFT JOIN topics t ON c.id = t.category_id 
GROUP BY c.id, c.name 
ORDER BY c."order";

SELECT lp.name as plan, SUM(pcd.question_count) as total_questions
FROM learning_plans lp
LEFT JOIN plan_card_distribution pcd ON lp.id = pcd.plan_id
GROUP BY lp.id, lp.name
ORDER BY lp."order";


