-- Migration: Generate default options for questions without options
-- This creates 4 generic options (A, B, C, D) for multiple-choice and code questions
-- Run this in Supabase SQL Editor or via MCP

-- Step 1: Create a helper function to generate default options
CREATE OR REPLACE FUNCTION generate_default_options()
RETURNS jsonb AS $$
BEGIN
  RETURN jsonb_build_array(
    jsonb_build_object(
      'id', 'A',
      'text', 'Option A',
      'isCorrect', true,
      'explanation', ''
    ),
    jsonb_build_object(
      'id', 'B',
      'text', 'Option B',
      'isCorrect', false,
      'explanation', ''
    ),
    jsonb_build_object(
      'id', 'C',
      'text', 'Option C',
      'isCorrect', false,
      'explanation', ''
    ),
    jsonb_build_object(
      'id', 'D',
      'text', 'Option D',
      'isCorrect', false,
      'explanation', ''
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Step 2: Update questions without options
UPDATE questions
SET 
  options = generate_default_options(),
  correct_answer = 'Option A'
WHERE (
  options IS NULL 
  OR options::text = 'null' 
  OR (options::jsonb IS NOT NULL AND jsonb_array_length(options) = 0)
)
AND type IN ('multiple-choice', 'code');

-- Step 3: Verify the update
SELECT 
  'Questions with options' as status,
  COUNT(*) as count
FROM questions
WHERE options IS NOT NULL 
  AND options::text != 'null'
  AND jsonb_array_length(options) > 0
UNION ALL
SELECT 
  'Questions without options' as status,
  COUNT(*) as count
FROM questions
WHERE options IS NULL 
   OR options::text = 'null'
   OR (options::jsonb IS NOT NULL AND jsonb_array_length(options) = 0);

-- Step 4: Show sample of updated questions
SELECT 
  id,
  title,
  type,
  options,
  correct_answer
FROM questions
WHERE options IS NOT NULL 
  AND options::text != 'null'
  AND jsonb_array_length(options) = 4
  AND correct_answer = 'Option A'
LIMIT 5;

-- Optional: Drop the helper function after use (uncomment if desired)
-- DROP FUNCTION IF EXISTS generate_default_options();






