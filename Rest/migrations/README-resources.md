# Resources Feature for Questions

## Overview

Added support for learning resources (videos, courses, articles) to be associated with questions. Resources are displayed after the explanation to help users learn more about the topic.

## Database Migration

### Step 1: Run the Migration

Execute the SQL migration file to add the `resources` column to the `questions` table:

```sql
-- Run this in your Supabase SQL Editor
ALTER TABLE questions
ADD COLUMN IF NOT EXISTS resources JSONB DEFAULT NULL;
```

Or use the migration file:

```bash
# Copy the SQL from Rest/migrations/add-resources-to-questions.sql
# and run it in your Supabase SQL Editor
```

### Step 2: Verify the Migration

Check that the column was added:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'questions' AND column_name = 'resources';
```

## Resource Structure

Each resource object should follow this structure:

```json
{
  "type": "video" | "course" | "article",
  "title": "Resource Title",
  "url": "https://example.com/resource",
  "description": "Optional description of the resource",
  "duration": "Optional duration (e.g., '10:30' or '5 hours')",
  "author": "Optional author name"
}
```

### Example Resources Array

```json
[
  {
    "type": "video",
    "title": "Understanding CSS clamp() Function",
    "url": "https://youtube.com/watch?v=...",
    "description": "Learn how clamp() works with practical examples",
    "duration": "10:30",
    "author": "Web Dev Simplified"
  },
  {
    "type": "article",
    "title": "CSS clamp() Complete Guide",
    "url": "https://css-tricks.com/clamp/",
    "description": "Comprehensive guide to using clamp() for responsive design"
  },
  {
    "type": "course",
    "title": "Advanced CSS Techniques",
    "url": "https://course-platform.com/...",
    "description": "Master advanced CSS including clamp() and other modern features",
    "duration": "5 hours",
    "author": "CSS Mastery"
  }
]
```

## Admin Panel Integration

To add resources from the admin panel:

1. **Navigate to the question edit page**
2. **Add resources in the `resources` field** as a JSON array
3. **Each resource must have:**
   - `type`: One of `"video"`, `"course"`, or `"article"`
   - `title`: The resource title
   - `url`: The resource URL
4. **Optional fields:**
   - `description`: Brief description
   - `duration`: Duration string (e.g., "10:30", "5 hours")
   - `author`: Author/creator name

## Frontend Display

Resources are automatically displayed:

- **Location**: After the explanation section
- **Visibility**: Only shown when:
  - Question type is not 'code'
  - Explanation is visible (after answer is selected)
  - Resources array exists and has items
- **Styling**:
  - Each resource type has a distinct color and icon
  - Videos: Red/Pink gradient with video icon
  - Courses: Blue/Indigo gradient with graduation cap icon
  - Articles: Green/Emerald gradient with file icon
  - Resources open in a new tab with proper security attributes

## API Changes

The API route `/api/guided-learning/plan-details/[planId]` now includes:

- `resources`: Array of resource objects or `null` if not set

## Testing

1. **Add resources to a question** via admin panel or direct database update
2. **Navigate to guided practice** with that question
3. **Answer the question** to see the explanation
4. **Scroll down** to see the resources section below the explanation
5. **Click on resources** to verify they open correctly in new tabs

## Notes

- The `resources` field is **nullable** - existing questions will have `null` until updated
- Resources are optional - questions work fine without them
- The field accepts any valid JSONB array structure, but the frontend expects the structure above
- Resources are displayed in the order they appear in the array
