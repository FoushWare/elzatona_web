-- Migration: Convert questions with code patterns to 'code' type
-- Date: 2025-11-25
-- Description: Identifies and converts multiple-choice questions that contain code patterns
--              to 'code' type for proper categorization

-- Convert questions with code patterns in title or options to 'code' type
UPDATE questions
SET type = 'code'
WHERE type = 'multiple-choice'
  AND (
    -- Questions asking about output
    title ILIKE '%What''s the output%' OR
    title ILIKE '%What is the output%' OR
    
    -- Questions with console.log
    title ILIKE '%console.log%' OR
    options::text ILIKE '%console.log%' OR
    
    -- Questions with error types
    title ILIKE '%ReferenceError%' OR
    title ILIKE '%TypeError%' OR
    title ILIKE '%SyntaxError%' OR
    
    -- Questions with function patterns
    (title ILIKE '%function%' AND title ILIKE '%()%') OR
    options::text ILIKE '%function%' OR
    options::text ILIKE '%()%' OR
    
    -- Questions with variable declarations
    title ILIKE '%const %' OR
    title ILIKE '%let %' OR
    title ILIKE '%var %' OR
    options::text ILIKE '%const %' OR
    options::text ILIKE '%let %' OR
    options::text ILIKE '%var %'
  );

-- Verify final distribution
-- Expected: All questions should be either 'multiple-choice' or 'code'
-- SELECT type, COUNT(*) as count FROM questions GROUP BY type ORDER BY count DESC;
