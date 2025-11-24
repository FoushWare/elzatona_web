-- Migration: Convert code output questions from multiple-choice to code type
-- This migration identifies questions that are about code output/behavior
-- and converts them to 'code' type in batches

-- Batch 1: Questions with explicit output/result/logged patterns
UPDATE questions
SET type = 'code'
WHERE type = 'multiple-choice'
  AND (
    title ILIKE '%what is the output%' OR
    title ILIKE '%what will be logged%' OR
    title ILIKE '%what does this code%' OR
    title ILIKE '%what will this code%' OR
    title ILIKE '%what will be printed%' OR
    title ILIKE '%what will be returned%' OR
    title ILIKE '%what is the result%' OR
    title ILIKE '%what happens when%' OR
    title ILIKE '%what error%' OR
    title ILIKE '%what exception%' OR
    title ILIKE '%console.log%' OR
    title ILIKE '%console.error%' OR
    title ILIKE '%console.warn%'
  );

-- Batch 2: Questions with code snippets and output-related keywords
UPDATE questions
SET type = 'code'
WHERE type = 'multiple-choice'
  AND title LIKE '%`%'
  AND (
    title ILIKE '%output%' OR
    title ILIKE '%result%' OR
    title ILIKE '%logged%' OR
    title ILIKE '%printed%' OR
    title ILIKE '%error%' OR
    title ILIKE '%exception%'
  );

-- Batch 3: Questions with titles that are just error types or code snippets
-- (These are likely code output questions)
UPDATE questions
SET type = 'code'
WHERE type = 'multiple-choice'
  AND (
    title IN ('ReferenceError', 'TypeError', 'SyntaxError', 'Error', 'undefined', 'null') OR
    title ~ '^`[^`]+`$' OR
    (title LIKE '`%' AND LENGTH(title) < 50)
  );

-- Batch 4: Questions with short titles containing code-related patterns
UPDATE questions
SET type = 'code'
WHERE type = 'multiple-choice'
  AND LENGTH(title) < 30
  AND (
    title ILIKE '%error%' OR
    title ILIKE '%undefined%' OR
    title ILIKE '%null%' OR
    title LIKE '%`%'
  )
  AND NOT EXISTS (
    -- Exclude questions that are clearly conceptual (not code output)
    SELECT 1 WHERE 
      title ILIKE '%what is%' AND title NOT ILIKE '%output%' AND title NOT ILIKE '%result%' AND title NOT ILIKE '%logged%'
  );

