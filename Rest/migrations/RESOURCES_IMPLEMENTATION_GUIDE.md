# Resources Feature Implementation Guide

## ✅ Implementation Complete

The resources feature has been fully implemented. Here's what was done and how to use it.

## 📋 What Was Implemented

1. **Database Migration**: Migration file created (`add-resources-to-questions.sql`)
2. **Admin Panel Form**: Resources field added to question edit/create form
3. **API Routes**: Both create and update routes now handle resources
4. **Frontend Display**: Resources display in guided practice page (already implemented)

## 🚀 Next Steps

### Step 1: Run the Migration

Run this SQL in your Supabase SQL Editor:

```sql
ALTER TABLE questions
ADD COLUMN IF NOT EXISTS resources JSONB DEFAULT NULL;

-- Add a comment to document the structure
COMMENT ON COLUMN questions.resources IS 'Array of resource objects. Each object should have: {type: "video"|"course"|"article", title: string, url: string, description?: string, duration?: string, author?: string}';
```

**Or use the migration file:**

- Copy the SQL from `Rest/migrations/add-resources-to-questions.sql`
- Paste it into your Supabase SQL Editor
- Click "Run"

### Step 2: Add Resources via Admin Panel

1. **Navigate to Admin Panel**: Go to `/admin/content/questions`
2. **Edit a Question**: Click the "Edit" button on any question
3. **Find Resources Field**: Scroll down to the "Learning Resources" section (after Explanation)
4. **Enter JSON Array**: Paste or type a JSON array in this format:

```json
[
  {
    "type": "video",
    "title": "CSS clamp() Tutorial",
    "url": "https://youtube.com/watch?v=...",
    "description": "Learn clamp() in 10 minutes",
    "duration": "10:30",
    "author": "Web Dev Simplified"
  },
  {
    "type": "article",
    "title": "CSS clamp() Guide",
    "url": "https://css-tricks.com/clamp/",
    "description": "Complete guide to clamp()"
  },
  {
    "type": "course",
    "title": "Advanced CSS Techniques",
    "url": "https://course-platform.com/...",
    "description": "Learn advanced CSS",
    "duration": "5 hours"
  }
]
```

5. **Save Changes**: Click "Save Changes"
6. **Verify**: The resources will be saved to the database

### Step 3: Verify Resources Display

1. **Navigate to Guided Practice**: Go to a learning plan that contains the question you edited
2. **Answer the Question**: Select an answer to show the explanation
3. **Check Resources Section**: After the explanation, you should see:
   - "Learning Resources" heading with BookOpen icon
   - Resource cards with appropriate icons:
     - 🎥 Video resources (red/pink gradient)
     - 🎓 Course resources (blue/indigo gradient)
     - 📄 Article resources (green/emerald gradient)
   - Each resource shows:
     - Type label (Video, Course, or Article)
     - Title (clickable link)
     - Description (if provided)
     - Duration with Clock icon (if provided)
     - Author (if provided)
     - External link icon on hover

## 📝 Resource Object Structure

Each resource object in the array should have:

**Required Fields:**

- `type`: `"video"` | `"course"` | `"article"`
- `title`: string (resource title)
- `url`: string (resource URL)

**Optional Fields:**

- `description`: string (brief description)
- `duration`: string (e.g., "10:30" for videos/courses)
- `author`: string (author/creator name)

## 🎨 Display Behavior

Resources are displayed:

- ✅ **After the explanation** section
- ✅ **Only for non-code questions** (code questions don't show resources)
- ✅ **Only if resources exist** (null or empty array = no display)
- ✅ **In a new tab** when clicked (with `target="_blank"` and `rel="noopener noreferrer"`)

## 🔍 Validation

The system validates resources:

- Must be an array or null
- Each resource must have valid `type`, `title`, and `url`
- Invalid resources are filtered out
- Empty arrays are treated as null

## 📚 Example Use Cases

### Example 1: Single Video Resource

```json
[
  {
    "type": "video",
    "title": "Understanding CSS clamp()",
    "url": "https://youtube.com/watch?v=example",
    "description": "Learn how clamp() works",
    "duration": "10:30",
    "author": "Web Dev Simplified"
  }
]
```

### Example 2: Multiple Resources

```json
[
  {
    "type": "video",
    "title": "CSS clamp() Tutorial",
    "url": "https://youtube.com/watch?v=...",
    "duration": "10:30"
  },
  {
    "type": "article",
    "title": "CSS clamp() Guide",
    "url": "https://css-tricks.com/clamp/",
    "author": "Chris Coyier"
  },
  {
    "type": "course",
    "title": "Advanced CSS Techniques",
    "url": "https://course-platform.com/...",
    "duration": "5 hours"
  }
]
```

## 🛠️ Technical Details

### Files Modified

1. **`apps/website/src/app/admin/content/questions/page.tsx`**:
   - Added resources textarea field to QuestionForm
   - Added resources to form initialization
   - Resources field appears after explanation field

2. **`apps/website/src/app/api/questions/unified/[id]/route.ts`**:
   - Added resources validation and handling in PUT handler
   - Validates resource structure before saving

3. **`apps/website/src/app/api/questions/unified/route.ts`**:
   - Added resources validation and handling in POST handler
   - Validates resource structure before creating

### Database Schema

```sql
ALTER TABLE questions
ADD COLUMN IF NOT EXISTS resources JSONB DEFAULT NULL;
```

The `resources` column:

- Type: `JSONB` (PostgreSQL JSON binary format)
- Default: `NULL` (nullable)
- Stores: Array of resource objects

## ✅ Testing Checklist

- [ ] Migration runs successfully in Supabase
- [ ] Resources field appears in admin panel edit form
- [ ] Can add resources JSON to a question
- [ ] Resources save correctly to database
- [ ] Resources display in guided practice page
- [ ] Resource links open in new tab
- [ ] Resources only show for non-code questions
- [ ] Resources only show after explanation
- [ ] Empty/null resources don't show section
- [ ] Invalid JSON shows error (doesn't crash)

## 🎉 Ready to Use!

The feature is now fully implemented and ready to use. Follow the steps above to:

1. Run the migration
2. Add resources to questions via admin panel
3. Verify they display correctly in guided practice
