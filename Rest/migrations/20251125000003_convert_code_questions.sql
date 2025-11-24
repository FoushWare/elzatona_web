-- Migration: Convert questions with code patterns to 'code' type
-- This migration identifies and converts questions that should be 'code' type
-- based on their title or options containing code patterns
-- Total questions to convert: ~256

-- Convert all questions that match code patterns in a single operation
UPDATE questions
SET type = 'code'
WHERE type = 'multiple-choice'
  AND (
    -- Questions asking about output (typically code output questions)
    title = 'What''s the output?'
    -- Questions with code patterns in options
    OR options::text LIKE '%console.log%'
    OR options::text LIKE '%function%'
    OR options::text LIKE '%const %'
    OR options::text LIKE '%let %'
    OR options::text LIKE '%var %'
    OR options::text LIKE '%=>%'
    OR options::text LIKE '%()%'
    OR options::text LIKE '%[]%'
    OR options::text LIKE '%{}%'
    OR options::text LIKE '%typeof%'
    OR options::text LIKE '%instanceof%'
    OR options::text LIKE '%async%'
    OR options::text LIKE '%await%'
    OR options::text LIKE '%Promise%'
    OR options::text LIKE '%class %'
    OR options::text LIKE '%import %'
    OR options::text LIKE '%export %'
    OR options::text LIKE '%return %'
    OR options::text LIKE '%throw%'
    OR options::text LIKE '%try%'
    OR options::text LIKE '%catch%'
    OR options::text LIKE '%finally%'
    -- Questions with error types in title
    OR title LIKE '%TypeError%'
    OR title LIKE '%SyntaxError%'
    OR title LIKE '%ReferenceError%'
    OR title LIKE '%Error%'
    OR title LIKE '%Exception%'
  );

