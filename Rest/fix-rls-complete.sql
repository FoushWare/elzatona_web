-- Complete RLS Fix for Migration
-- Run this in Supabase SQL Editor

-- First, drop all existing policies
DROP POLICY IF EXISTS "Public read access for learning cards" ON learning_cards;
DROP POLICY IF EXISTS "Public read access for categories" ON categories;
DROP POLICY IF EXISTS "Public read access for topics" ON topics;
DROP POLICY IF EXISTS "Public read access for questions" ON questions;
DROP POLICY IF EXISTS "Public read access for learning plans" ON learning_plans;
DROP POLICY IF EXISTS "Public read access for plan cards" ON plan_cards;
DROP POLICY IF EXISTS "Admins can manage learning cards" ON learning_cards;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage topics" ON topics;
DROP POLICY IF EXISTS "Admins can manage questions" ON questions;
DROP POLICY IF EXISTS "Admins can manage learning plans" ON learning_plans;
DROP POLICY IF EXISTS "Admins can manage plan cards" ON plan_cards;

-- Disable RLS completely
ALTER TABLE learning_cards DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE topics DISABLE ROW LEVEL SECURITY;
ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE learning_plans DISABLE ROW LEVEL SECURITY;
ALTER TABLE plan_cards DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempts DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('learning_cards', 'categories', 'topics', 'questions', 'learning_plans', 'plan_cards');



