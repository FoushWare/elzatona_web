-- Migration: Enable Row Level Security (RLS) and Create Policies
-- Date: 2025-12-10
-- Description: Enables RLS on all public tables and creates appropriate security policies
-- 
-- This migration addresses Supabase security linter warnings about RLS being disabled
-- on tables in the public schema exposed to PostgREST.

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- ============================================================================

-- Admin tables (restricted access)
ALTER TABLE IF EXISTS public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.admins ENABLE ROW LEVEL SECURITY;

-- Content tables (public read, restricted write)
ALTER TABLE IF EXISTS public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.learning_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.learning_cards ENABLE ROW LEVEL SECURITY;

-- Task tables (public read, restricted write)
ALTER TABLE IF EXISTS public.frontend_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.problem_solving_tasks ENABLE ROW LEVEL SECURITY;

-- Junction tables (public read, restricted write)
ALTER TABLE IF EXISTS public.plan_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.card_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.plan_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.plan_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.questions_topics ENABLE ROW LEVEL SECURITY;

-- User-specific tables (users can only access their own data)
ALTER TABLE IF EXISTS public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.question_attempts ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- DROP EXISTING POLICIES (if any) - Clean slate approach
-- ============================================================================

-- Admin tables
DROP POLICY IF EXISTS "admin_users_select_policy" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_insert_policy" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_update_policy" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_delete_policy" ON public.admin_users;

DROP POLICY IF EXISTS "admins_select_policy" ON public.admins;
DROP POLICY IF EXISTS "admins_insert_policy" ON public.admins;
DROP POLICY IF EXISTS "admins_update_policy" ON public.admins;
DROP POLICY IF EXISTS "admins_delete_policy" ON public.admins;

-- Content tables
DROP POLICY IF EXISTS "categories_select_policy" ON public.categories;
DROP POLICY IF EXISTS "categories_insert_policy" ON public.categories;
DROP POLICY IF EXISTS "categories_update_policy" ON public.categories;
DROP POLICY IF EXISTS "categories_delete_policy" ON public.categories;

DROP POLICY IF EXISTS "topics_select_policy" ON public.topics;
DROP POLICY IF EXISTS "topics_insert_policy" ON public.topics;
DROP POLICY IF EXISTS "topics_update_policy" ON public.topics;
DROP POLICY IF EXISTS "topics_delete_policy" ON public.topics;

DROP POLICY IF EXISTS "questions_select_policy" ON public.questions;
DROP POLICY IF EXISTS "questions_insert_policy" ON public.questions;
DROP POLICY IF EXISTS "questions_update_policy" ON public.questions;
DROP POLICY IF EXISTS "questions_delete_policy" ON public.questions;

DROP POLICY IF EXISTS "learning_plans_select_policy" ON public.learning_plans;
DROP POLICY IF EXISTS "learning_plans_insert_policy" ON public.learning_plans;
DROP POLICY IF EXISTS "learning_plans_update_policy" ON public.learning_plans;
DROP POLICY IF EXISTS "learning_plans_delete_policy" ON public.learning_plans;

DROP POLICY IF EXISTS "learning_cards_select_policy" ON public.learning_cards;
DROP POLICY IF EXISTS "learning_cards_insert_policy" ON public.learning_cards;
DROP POLICY IF EXISTS "learning_cards_update_policy" ON public.learning_cards;
DROP POLICY IF EXISTS "learning_cards_delete_policy" ON public.learning_cards;

-- Task tables
DROP POLICY IF EXISTS "frontend_tasks_select_policy" ON public.frontend_tasks;
DROP POLICY IF EXISTS "frontend_tasks_insert_policy" ON public.frontend_tasks;
DROP POLICY IF EXISTS "frontend_tasks_update_policy" ON public.frontend_tasks;
DROP POLICY IF EXISTS "frontend_tasks_delete_policy" ON public.frontend_tasks;

DROP POLICY IF EXISTS "problem_solving_tasks_select_policy" ON public.problem_solving_tasks;
DROP POLICY IF EXISTS "problem_solving_tasks_insert_policy" ON public.problem_solving_tasks;
DROP POLICY IF EXISTS "problem_solving_tasks_update_policy" ON public.problem_solving_tasks;
DROP POLICY IF EXISTS "problem_solving_tasks_delete_policy" ON public.problem_solving_tasks;

-- Junction tables
DROP POLICY IF EXISTS "plan_cards_select_policy" ON public.plan_cards;
DROP POLICY IF EXISTS "plan_cards_insert_policy" ON public.plan_cards;
DROP POLICY IF EXISTS "plan_cards_update_policy" ON public.plan_cards;
DROP POLICY IF EXISTS "plan_cards_delete_policy" ON public.plan_cards;

DROP POLICY IF EXISTS "card_categories_select_policy" ON public.card_categories;
DROP POLICY IF EXISTS "card_categories_insert_policy" ON public.card_categories;
DROP POLICY IF EXISTS "card_categories_update_policy" ON public.card_categories;
DROP POLICY IF EXISTS "card_categories_delete_policy" ON public.card_categories;

DROP POLICY IF EXISTS "plan_categories_select_policy" ON public.plan_categories;
DROP POLICY IF EXISTS "plan_categories_insert_policy" ON public.plan_categories;
DROP POLICY IF EXISTS "plan_categories_update_policy" ON public.plan_categories;
DROP POLICY IF EXISTS "plan_categories_delete_policy" ON public.plan_categories;

DROP POLICY IF EXISTS "plan_questions_select_policy" ON public.plan_questions;
DROP POLICY IF EXISTS "plan_questions_insert_policy" ON public.plan_questions;
DROP POLICY IF EXISTS "plan_questions_update_policy" ON public.plan_questions;
DROP POLICY IF EXISTS "plan_questions_delete_policy" ON public.plan_questions;

DROP POLICY IF EXISTS "questions_topics_select_policy" ON public.questions_topics;
DROP POLICY IF EXISTS "questions_topics_insert_policy" ON public.questions_topics;
DROP POLICY IF EXISTS "questions_topics_update_policy" ON public.questions_topics;
DROP POLICY IF EXISTS "questions_topics_delete_policy" ON public.questions_topics;

-- User-specific tables
DROP POLICY IF EXISTS "user_progress_select_policy" ON public.user_progress;
DROP POLICY IF EXISTS "user_progress_insert_policy" ON public.user_progress;
DROP POLICY IF EXISTS "user_progress_update_policy" ON public.user_progress;
DROP POLICY IF EXISTS "user_progress_delete_policy" ON public.user_progress;

DROP POLICY IF EXISTS "question_attempts_select_policy" ON public.question_attempts;
DROP POLICY IF EXISTS "question_attempts_insert_policy" ON public.question_attempts;
DROP POLICY IF EXISTS "question_attempts_update_policy" ON public.question_attempts;
DROP POLICY IF EXISTS "question_attempts_delete_policy" ON public.question_attempts;

-- ============================================================================
-- CREATE POLICIES FOR ADMIN TABLES
-- ============================================================================
-- Admin tables should only be accessible via service role key
-- (Service role key bypasses RLS, so these policies restrict anon key access)

-- admin_users: No anon access (service role only)
CREATE POLICY "admin_users_no_anon_access" ON public.admin_users
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- admins: No anon access (service role only)
CREATE POLICY "admins_no_anon_access" ON public.admins
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- ============================================================================
-- CREATE POLICIES FOR CONTENT TABLES (Public Read, Service Role Write)
-- ============================================================================
-- These tables contain public content that should be readable by anyone
-- but only writable via service role key (admin operations)

-- categories: Public read, service role write
CREATE POLICY "categories_public_read" ON public.categories
  FOR SELECT
  USING (true);

CREATE POLICY "categories_service_role_write" ON public.categories
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- topics: Public read, service role write
CREATE POLICY "topics_public_read" ON public.topics
  FOR SELECT
  USING (true);

CREATE POLICY "topics_service_role_write" ON public.topics
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- questions: Public read, service role write
CREATE POLICY "questions_public_read" ON public.questions
  FOR SELECT
  USING (true);

CREATE POLICY "questions_service_role_write" ON public.questions
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- learning_plans: Public read, service role write
CREATE POLICY "learning_plans_public_read" ON public.learning_plans
  FOR SELECT
  USING (true);

CREATE POLICY "learning_plans_service_role_write" ON public.learning_plans
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- learning_cards: Public read, service role write
CREATE POLICY "learning_cards_public_read" ON public.learning_cards
  FOR SELECT
  USING (true);

CREATE POLICY "learning_cards_service_role_write" ON public.learning_cards
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- ============================================================================
-- CREATE POLICIES FOR TASK TABLES (Public Read, Service Role Write)
-- ============================================================================

-- frontend_tasks: Public read, service role write
CREATE POLICY "frontend_tasks_public_read" ON public.frontend_tasks
  FOR SELECT
  USING (true);

CREATE POLICY "frontend_tasks_service_role_write" ON public.frontend_tasks
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- problem_solving_tasks: Public read, service role write
CREATE POLICY "problem_solving_tasks_public_read" ON public.problem_solving_tasks
  FOR SELECT
  USING (true);

CREATE POLICY "problem_solving_tasks_service_role_write" ON public.problem_solving_tasks
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- ============================================================================
-- CREATE POLICIES FOR JUNCTION TABLES (Public Read, Service Role Write)
-- ============================================================================

-- plan_cards: Public read, service role write
CREATE POLICY "plan_cards_public_read" ON public.plan_cards
  FOR SELECT
  USING (true);

CREATE POLICY "plan_cards_service_role_write" ON public.plan_cards
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- card_categories: Public read, service role write
CREATE POLICY "card_categories_public_read" ON public.card_categories
  FOR SELECT
  USING (true);

CREATE POLICY "card_categories_service_role_write" ON public.card_categories
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- plan_categories: Public read, service role write
CREATE POLICY "plan_categories_public_read" ON public.plan_categories
  FOR SELECT
  USING (true);

CREATE POLICY "plan_categories_service_role_write" ON public.plan_categories
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- plan_questions: Public read, service role write
CREATE POLICY "plan_questions_public_read" ON public.plan_questions
  FOR SELECT
  USING (true);

CREATE POLICY "plan_questions_service_role_write" ON public.plan_questions
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- questions_topics: Public read, service role write
CREATE POLICY "questions_topics_public_read" ON public.questions_topics
  FOR SELECT
  USING (true);

CREATE POLICY "questions_topics_service_role_write" ON public.questions_topics
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- ============================================================================
-- CREATE POLICIES FOR USER-SPECIFIC TABLES
-- ============================================================================
-- Note: This application uses Firebase authentication with JWT tokens
-- and validates user_id in the application layer. Since the app uses
-- service role key for database operations, RLS policies are primarily
-- for defense-in-depth. The service role key bypasses RLS by default.

-- user_progress: Restrict anon access (service role bypasses RLS)
-- The application validates user_id in code before saving progress
CREATE POLICY "user_progress_no_anon_access" ON public.user_progress
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- question_attempts: Restrict anon access (service role bypasses RLS)
-- The application validates user_id in code before saving attempts
CREATE POLICY "question_attempts_no_anon_access" ON public.question_attempts
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- ============================================================================
-- NOTES AND ARCHITECTURE
-- ============================================================================

-- This application uses:
-- 1. Service role key for all database operations (bypasses RLS)
-- 2. Firebase JWT tokens for user authentication
-- 3. Application-layer validation of user_id before database operations
--
-- RLS policies here provide defense-in-depth security:
-- - Prevents accidental use of anon key (which would be blocked by RLS)
-- - Protects against misconfiguration (if anon key is used by mistake)
-- - Service role key operations bypass RLS automatically
--
-- If you need to allow anon key access in the future, you can:
-- 1. Create policies that check JWT claims from Firebase tokens
-- 2. Use Supabase's auth.uid() if you migrate to Supabase Auth
-- 3. Create custom functions that validate user_id from JWT claims
--
-- Example for Firebase JWT (if needed):
-- CREATE POLICY "user_progress_user_access" ON public.user_progress
--   FOR ALL
--   USING (
--     user_id::text = current_setting('request.jwt.claims', true)::json->>'user_id'
--   )
--   WITH CHECK (
--     user_id::text = current_setting('request.jwt.claims', true)::json->>'user_id'
--   );

-- ============================================================================
-- VERIFICATION QUERIES (Run these after applying the migration)
-- ============================================================================

-- Check RLS status on all tables
-- SELECT schemaname, tablename, rowsecurity 
-- FROM pg_tables 
-- WHERE schemaname = 'public' 
-- AND tablename IN (
--   'admin_users', 'admins', 'categories', 'topics', 'questions',
--   'learning_plans', 'learning_cards', 'frontend_tasks', 'problem_solving_tasks',
--   'plan_cards', 'card_categories', 'plan_categories', 'plan_questions',
--   'questions_topics', 'user_progress', 'question_attempts'
-- )
-- ORDER BY tablename;

-- List all policies
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
