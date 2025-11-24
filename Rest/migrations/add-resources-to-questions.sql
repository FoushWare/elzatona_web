-- Migration: Add resources field to questions table
-- Resources is an array of objects with type (video, course, article) and other metadata
-- This field is nullable to allow existing questions to remain unchanged

ALTER TABLE questions 
ADD COLUMN IF NOT EXISTS resources JSONB DEFAULT NULL;

-- Add a comment to document the structure
COMMENT ON COLUMN questions.resources IS 'Array of resource objects. Each object should have: {type: "video"|"course"|"article", title: string, url: string, description?: string, duration?: string, author?: string}';

-- Example structure:
-- resources: [
--   {
--     "type": "video",
--     "title": "Understanding CSS clamp()",
--     "url": "https://youtube.com/watch?v=...",
--     "description": "Learn how clamp() works",
--     "duration": "10:30",
--     "author": "Web Dev Simplified"
--   },
--   {
--     "type": "article",
--     "title": "CSS clamp() Guide",
--     "url": "https://css-tricks.com/clamp/",
--     "description": "Complete guide to clamp()"
--   },
--   {
--     "type": "course",
--     "title": "Advanced CSS Techniques",
--     "url": "https://course-platform.com/...",
--     "description": "Learn advanced CSS",
--     "duration": "5 hours"
--   }
-- ]

