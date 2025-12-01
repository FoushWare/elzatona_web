-- SQL Script to Link Questions to Topics
-- Run this after the questions are created in the database

-- First, find the question IDs by title (update these after questions are created)
-- Then link them to topics

-- 1. JavaScript Hoisting: var vs let in a function -> Basics
UPDATE questions 
SET topic_id = '8dcdb2c6-5056-4b47-a5ce-a3cd4a1e20eb'
WHERE title = 'JavaScript Hoisting: var vs let in a function';

-- 2. Async Execution and Scoping: var vs let in loops -> Basics
UPDATE questions 
SET topic_id = '8dcdb2c6-5056-4b47-a5ce-a3cd4a1e20eb'
WHERE title = 'Async Execution and Scoping: var vs let in loops';

-- 3. Arrow Functions and `this` Context in Objects -> This Binding
UPDATE questions 
SET topic_id = '1b62c368-375b-4df1-aadd-eb0504ae3612'
WHERE title = 'Arrow Functions and `this` Context in Objects';

-- 4. Type Coercion: Unary Plus and Logical NOT -> Type Coercion
UPDATE questions 
SET topic_id = 'ba0c5753-135e-4c6f-803a-104b8fb3f83f'
WHERE title = 'Type Coercion: Unary Plus and Logical NOT';

-- 5. Object Property Access: Dot vs. Bracket Notation -> Data Structures
UPDATE questions 
SET topic_id = 'ea7a64be-4db2-4acd-abdb-13bd93a7218d'
WHERE title = 'Object Property Access: Dot vs. Bracket Notation';

-- 6. Object Reference vs. Value Assignment -> Data Structures
UPDATE questions 
SET topic_id = 'ea7a64be-4db2-4acd-abdb-13bd93a7218d'
WHERE title = 'Object Reference vs. Value Assignment';

-- 7. Equality Operators: `==` vs. `===` with Object Wrappers -> Type Coercion
UPDATE questions 
SET topic_id = 'ba0c5753-135e-4c6f-803a-104b8fb3f83f'
WHERE title = 'Equality Operators: `==` vs. `===` with Object Wrappers';

-- 8. Static Methods in JavaScript Classes -> Classes
UPDATE questions 
SET topic_id = '4d2a6785-b6db-4985-953f-f3ba4a388e8e'
WHERE title = 'Static Methods in JavaScript Classes';

-- 9. Global Variable Creation via Typo (Sloppy Mode) -> Basics
UPDATE questions 
SET topic_id = '8dcdb2c6-5056-4b47-a5ce-a3cd4a1e20eb'
WHERE title = 'Global Variable Creation via Typo (Sloppy Mode)';

-- 10. Functions as Objects: Adding Properties -> Functions
UPDATE questions 
SET topic_id = 'b0f06ff7-c677-430e-96f3-d743b5a47d08'
WHERE title = 'Functions as Objects: Adding Properties';

-- Also add to questions_topics junction table for many-to-many relationship
-- (Only if questions_topics table exists and you want many-to-many)

-- Get question IDs first, then insert into questions_topics
INSERT INTO questions_topics (question_id, topic_id, is_primary, order_index)
SELECT 
  q.id as question_id,
  '8dcdb2c6-5056-4b47-a5ce-a3cd4a1e20eb' as topic_id, -- Basics
  true as is_primary,
  0 as order_index
FROM questions q
WHERE q.title = 'JavaScript Hoisting: var vs let in a function'
ON CONFLICT (question_id, topic_id) DO NOTHING;

INSERT INTO questions_topics (question_id, topic_id, is_primary, order_index)
SELECT 
  q.id as question_id,
  '8dcdb2c6-5056-4b47-a5ce-a3cd4a1e20eb' as topic_id, -- Basics
  true as is_primary,
  0 as order_index
FROM questions q
WHERE q.title = 'Async Execution and Scoping: var vs let in loops'
ON CONFLICT (question_id, topic_id) DO NOTHING;

INSERT INTO questions_topics (question_id, topic_id, is_primary, order_index)
SELECT 
  q.id as question_id,
  '1b62c368-375b-4df1-aadd-eb0504ae3612' as topic_id, -- This Binding
  true as is_primary,
  0 as order_index
FROM questions q
WHERE q.title = 'Arrow Functions and `this` Context in Objects'
ON CONFLICT (question_id, topic_id) DO NOTHING;

INSERT INTO questions_topics (question_id, topic_id, is_primary, order_index)
SELECT 
  q.id as question_id,
  'ba0c5753-135e-4c6f-803a-104b8fb3f83f' as topic_id, -- Type Coercion
  true as is_primary,
  0 as order_index
FROM questions q
WHERE q.title = 'Type Coercion: Unary Plus and Logical NOT'
ON CONFLICT (question_id, topic_id) DO NOTHING;

INSERT INTO questions_topics (question_id, topic_id, is_primary, order_index)
SELECT 
  q.id as question_id,
  'ea7a64be-4db2-4acd-abdb-13bd93a7218d' as topic_id, -- Data Structures
  true as is_primary,
  0 as order_index
FROM questions q
WHERE q.title = 'Object Property Access: Dot vs. Bracket Notation'
ON CONFLICT (question_id, topic_id) DO NOTHING;

INSERT INTO questions_topics (question_id, topic_id, is_primary, order_index)
SELECT 
  q.id as question_id,
  'ea7a64be-4db2-4acd-abdb-13bd93a7218d' as topic_id, -- Data Structures
  true as is_primary,
  0 as order_index
FROM questions q
WHERE q.title = 'Object Reference vs. Value Assignment'
ON CONFLICT (question_id, topic_id) DO NOTHING;

INSERT INTO questions_topics (question_id, topic_id, is_primary, order_index)
SELECT 
  q.id as question_id,
  'ba0c5753-135e-4c6f-803a-104b8fb3f83f' as topic_id, -- Type Coercion
  true as is_primary,
  0 as order_index
FROM questions q
WHERE q.title = 'Equality Operators: `==` vs. `===` with Object Wrappers'
ON CONFLICT (question_id, topic_id) DO NOTHING;

INSERT INTO questions_topics (question_id, topic_id, is_primary, order_index)
SELECT 
  q.id as question_id,
  '4d2a6785-b6db-4985-953f-f3ba4a388e8e' as topic_id, -- Classes
  true as is_primary,
  0 as order_index
FROM questions q
WHERE q.title = 'Static Methods in JavaScript Classes'
ON CONFLICT (question_id, topic_id) DO NOTHING;

INSERT INTO questions_topics (question_id, topic_id, is_primary, order_index)
SELECT 
  q.id as question_id,
  '8dcdb2c6-5056-4b47-a5ce-a3cd4a1e20eb' as topic_id, -- Basics
  true as is_primary,
  0 as order_index
FROM questions q
WHERE q.title = 'Global Variable Creation via Typo (Sloppy Mode)'
ON CONFLICT (question_id, topic_id) DO NOTHING;

INSERT INTO questions_topics (question_id, topic_id, is_primary, order_index)
SELECT 
  q.id as question_id,
  'b0f06ff7-c677-430e-96f3-d743b5a47d08' as topic_id, -- Functions
  true as is_primary,
  0 as order_index
FROM questions q
WHERE q.title = 'Functions as Objects: Adding Properties'
ON CONFLICT (question_id, topic_id) DO NOTHING;

