-- Seed data from zatona-web-testing to zatona-web
-- This script copies questions, learning_plans, and related data
-- Note: This assumes categories, topics, and learning_cards already exist in both databases
-- and uses slug/name matching to map foreign keys

-- Step 1: Create temporary tables to store ID mappings
CREATE TEMP TABLE IF NOT EXISTS category_id_mapping (
  old_id UUID,
  new_id UUID,
  slug TEXT
);

CREATE TEMP TABLE IF NOT EXISTS topic_id_mapping (
  old_id UUID,
  new_id UUID,
  slug TEXT
);

CREATE TEMP TABLE IF NOT EXISTS learning_card_id_mapping (
  old_id UUID,
  new_id UUID,
  title TEXT
);

CREATE TEMP TABLE IF NOT EXISTS question_id_mapping (
  old_id UUID,
  new_id UUID
);

CREATE TEMP TABLE IF NOT EXISTS learning_plan_id_mapping (
  old_id UUID,
  new_id UUID
);

-- Step 2: Map categories by slug
INSERT INTO category_id_mapping (old_id, new_id, slug)
SELECT 
  t.id as old_id,
  m.id as new_id,
  t.slug
FROM (
  SELECT id, slug FROM categories
) t
JOIN (
  SELECT id, slug FROM categories
) m ON t.slug = m.slug;

-- Step 3: Map topics by slug
INSERT INTO topic_id_mapping (old_id, new_id, slug)
SELECT 
  t.id as old_id,
  m.id as new_id,
  t.slug
FROM (
  SELECT id, slug FROM topics
) t
JOIN (
  SELECT id, slug FROM topics
) m ON t.slug = m.slug;

-- Step 4: Map learning_cards by title
INSERT INTO learning_card_id_mapping (old_id, new_id, title)
SELECT 
  t.id as old_id,
  m.id as new_id,
  t.title
FROM (
  SELECT id, title FROM learning_cards
) t
JOIN (
  SELECT id, title FROM learning_cards
) m ON t.title = m.title;

-- Step 5: Copy questions with ID mapping
-- First, insert questions and create ID mapping
INSERT INTO questions (
  id, title, content, type, difficulty, points, options, correct_answer,
  explanation, test_cases, hints, tags, stats, metadata,
  category_id, learning_card_id, topic_id, is_active, created_at, updated_at,
  time_limit, code_template, examples, constraints, language, resources
)
SELECT 
  gen_random_uuid() as id,
  title, content, type, difficulty, points, options, correct_answer,
  explanation, test_cases, hints, tags, stats, metadata,
  cm.new_id as category_id,
  lcm.new_id as learning_card_id,
  tm.new_id as topic_id,
  is_active, created_at, updated_at,
  time_limit, code_template, examples, constraints, language, resources
FROM questions q
LEFT JOIN category_id_mapping cm ON q.category_id = cm.old_id
LEFT JOIN learning_card_id_mapping lcm ON q.learning_card_id = lcm.old_id
LEFT JOIN topic_id_mapping tm ON q.topic_id = tm.old_id
ON CONFLICT DO NOTHING;

-- Create question ID mapping (match by title and content for uniqueness)
INSERT INTO question_id_mapping (old_id, new_id)
SELECT 
  q_old.id as old_id,
  q_new.id as new_id
FROM questions q_old
JOIN questions q_new ON q_old.title = q_new.title 
  AND q_old.content = q_new.content
WHERE q_old.id != q_new.id;

-- Step 6: Copy learning_plans
INSERT INTO learning_plans (id, name, description, difficulty, estimated_duration, is_public, is_active, created_at, updated_at)
SELECT 
  gen_random_uuid() as id,
  name, description, difficulty, estimated_duration, is_public, is_active, created_at, updated_at
FROM learning_plans
ON CONFLICT DO NOTHING;

-- Create learning_plan ID mapping
INSERT INTO learning_plan_id_mapping (old_id, new_id)
SELECT 
  lp_old.id as old_id,
  lp_new.id as new_id
FROM learning_plans lp_old
JOIN learning_plans lp_new ON lp_old.name = lp_new.name
WHERE lp_old.id != lp_new.id;

-- Step 7: Copy plan_cards with ID mapping
INSERT INTO plan_cards (id, plan_id, card_id, order_index, is_active, created_at, updated_at)
SELECT 
  gen_random_uuid() as id,
  lpm.new_id as plan_id,
  lcm.new_id as card_id,
  order_index, is_active, created_at, updated_at
FROM plan_cards pc
JOIN learning_plan_id_mapping lpm ON pc.plan_id = lpm.old_id
JOIN learning_card_id_mapping lcm ON pc.card_id = lcm.old_id
ON CONFLICT DO NOTHING;

-- Step 8: Copy plan_questions with ID mapping
INSERT INTO plan_questions (id, plan_id, question_id, topic_id, order_index, is_active, created_at, updated_at)
SELECT 
  gen_random_uuid() as id,
  lpm.new_id as plan_id,
  qm.new_id as question_id,
  tm.new_id as topic_id,
  order_index, is_active, created_at, updated_at
FROM plan_questions pq
JOIN learning_plan_id_mapping lpm ON pq.plan_id = lpm.old_id
JOIN question_id_mapping qm ON pq.question_id = qm.old_id
JOIN topic_id_mapping tm ON pq.topic_id = tm.old_id
ON CONFLICT DO NOTHING;

-- Step 9: Copy card_categories with ID mapping
INSERT INTO card_categories (id, card_id, category_id, order_index, is_primary, created_at, updated_at)
SELECT 
  gen_random_uuid() as id,
  lcm.new_id as card_id,
  cm.new_id as category_id,
  order_index, is_primary, created_at, updated_at
FROM card_categories cc
JOIN learning_card_id_mapping lcm ON cc.card_id = lcm.old_id
JOIN category_id_mapping cm ON cc.category_id = cm.old_id
ON CONFLICT DO NOTHING;

-- Step 10: Copy plan_categories with ID mapping (if any)
INSERT INTO plan_categories (id, plan_id, category_id, order_index, is_primary, created_at, updated_at)
SELECT 
  gen_random_uuid() as id,
  lpm.new_id as plan_id,
  cm.new_id as category_id,
  order_index, is_primary, created_at, updated_at
FROM plan_categories pc
JOIN learning_plan_id_mapping lpm ON pc.plan_id = lpm.old_id
JOIN category_id_mapping cm ON pc.category_id = cm.old_id
ON CONFLICT DO NOTHING;

-- Cleanup: Drop temporary tables
DROP TABLE IF EXISTS category_id_mapping;
DROP TABLE IF EXISTS topic_id_mapping;
DROP TABLE IF EXISTS learning_card_id_mapping;
DROP TABLE IF EXISTS question_id_mapping;
DROP TABLE IF EXISTS learning_plan_id_mapping;



