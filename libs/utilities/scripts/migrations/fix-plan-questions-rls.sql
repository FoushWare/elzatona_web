-- Migration: Fix RLS for plan_questions table
-- This enables Row Level Security and adds a SELECT policy for all users
-- Run this in Supabase SQL Editor

-- 1. Enable RLS
ALTER TABLE plan_questions ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access on plan_questions" ON plan_questions;
DROP POLICY IF EXISTS "Allow authenticated read access on plan_questions" ON plan_questions;

-- 3. Create SELECT policy for all users (or authenticated if preferred)
-- Since learning plans are public in this app, the links should also be readable.
CREATE POLICY "Allow public read access on plan_questions"
ON plan_questions FOR SELECT
USING (true);

-- 4. Create INSERT/UPDATE/DELETE policies for authenticated admins
-- (Assuming admins are authenticated; adjust roles if needed)
CREATE POLICY "Allow admin all access on plan_questions"
ON plan_questions FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Verify policies
SELECT * FROM pg_policies WHERE tablename = 'plan_questions';
