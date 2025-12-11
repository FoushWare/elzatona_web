-- Migration: Force RLS Refresh on Junction Tables
-- Date: 2025-12-10
-- Description: Force refresh RLS on junction tables to ensure Supabase linter picks up the changes
-- 
-- This migration addresses a potential caching issue where Supabase's linter
-- may not immediately recognize that RLS has been enabled on these tables.

-- Force enable RLS (explicit, no IF EXISTS to ensure it runs)
ALTER TABLE public.questions_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_questions ENABLE ROW LEVEL SECURITY;

-- Verify RLS is enabled using pg_class (most authoritative source)
-- This query can be run separately to verify
-- SELECT 
--   n.nspname as schema_name,
--   c.relname as table_name,
--   c.relrowsecurity as rls_enabled
-- FROM pg_class c
-- JOIN pg_namespace n ON n.oid = c.relnamespace
-- WHERE n.nspname = 'public'
-- AND c.relname IN ('questions_topics', 'card_categories', 'plan_categories', 'plan_questions')
-- AND c.relkind = 'r';
