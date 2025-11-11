-- Schema Update: Add 'frontend-tasks' to learning_cards type constraint
-- Run this SQL in Supabase SQL Editor if you get constraint errors

-- Drop the existing constraint
ALTER TABLE learning_cards 
DROP CONSTRAINT IF EXISTS learning_cards_type_check;

-- Add new constraint with frontend-tasks included
ALTER TABLE learning_cards 
ADD CONSTRAINT learning_cards_type_check 
CHECK (type IN ('core-technologies', 'framework-questions', 'problem-solving', 'system-design', 'frontend-tasks'));
