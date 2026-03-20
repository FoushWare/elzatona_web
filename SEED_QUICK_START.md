# Quick Start: Seeding Questions from NotebookLM

## Prerequisites

Ensure `.env.local` has these Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Option 1: Auto-Load Samples (Recommended)

If you have `.json` files in `tools/seed/questions/`:

```bash
npm run seed
```

The seeder will automatically:

- 📂 Recursively discover all `.json` files in `tools/seed/questions/`
- 🔀 Merge categories, topics, and questions
- 🚫 Skip duplicates using `slug` and `external_ref`
- ✅ Seed to Supabase in order: categories → topics → questions

### Your Current Samples

You have samples ready to seed:

- `tools/seed/questions/rendering-patterns/rendering-patterns-01.json`
- `rendering-patterns-02.json`
- `rendering-patterns-03.json`

## Option 2: Manual Seeding (From NotebookLM JSON)

If you don't have samples yet:

```bash
# Copy template
cp tools/seed/starter-data.template.json tools/seed/starter-data.json

# Edit tools/seed/starter-data.json with your NotebookLM output
# Then run:
npm run seed
```

## Sample File Format

Each file should match this structure:

```json
{
  "categories": [
    {
      "slug": "category-slug",
      "name": "Category Name",
      "description": "Description"
    }
  ],
  "topics": [
    {
      "slug": "topic-slug",
      "name": "Topic Name",
      "category_slug": "category-slug",
      "description": "Description"
    }
  ],
  "questions": [
    {
      "external_ref": "unique-identifier",
      "question_text": "What is...?",
      "question_type": "mcq",
      "difficulty": "beginner",
      "explanation": "The answer is...",
      "hint": "Think about...",
      "tags": ["tag1", "tag2"],
      "learning_modes": ["guided", "free-style"],
      "topic_slugs": ["topic-slug"],
      "category_slugs": ["category-slug"],
      "source": {
        "kind": "video|website|document",
        "title": "Source Title",
        "url": "https://...",
        "section": "Section Name",
        "timestamp": "00:48"
      },
      "choices": [
        { "key": "A", "text": "Option A" },
        { "key": "B", "text": "Option B" }
      ]
    }
  ]
}
```

## Verify After Seeding

Check the admin panel:

```bash
npm run dev:admin
# Navigate to:
# - http://localhost:3001/admin/content/questions
# - http://localhost:3001/admin/content-management
# - http://localhost:3001/admin/learning-cards
```

## Troubleshooting

### Script doesn't load samples

- ✅ Check `tools/seed/questions/` directory exists
- ✅ Verify `.json` files are valid JSON (use `jsonlint`)
- ✅ Ensure `external_ref` is unique per question (deduplication key)

### Supabase errors

- ✅ Verify `.env.local` has correct credentials
- ✅ Check database is online: `curl $NEXT_PUBLIC_SUPABASE_URL`
- ✅ Ensure service role key has provider access (not just user/auth)

### Duplicates not removed

- ✅ Duplicates are detected by `slug` (categories/topics) and `external_ref` (questions)
- ✅ First occurrence wins; later duplicates are skipped

## Notes

- The seeder **does not** clear existing data (only upserts)
- To reset, manually clear tables in Supabase UI or use a separate cleanup script
- All seeds are idempotent: running multiple times won't create duplicates
