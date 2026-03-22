# Seeding from NotebookLM Output

## Files

- `tools/seed/starter-data.template.json`: copy this as your starting shape.
- `tools/seed/starter-data.json`: runtime input (used if no `questions/` directory).
- `tools/seed/seed-all.mjs`: seed runner.
- `tools/seed/questions/`: sample question files (auto-loaded if present).

## Quick Start (with Samples)

If you have sample `.json` files in `tools/seed/questions/` (or subdirectories):

```bash
# Ensure .env.local has:
# - NEXT_PUBLIC_SUPABASE_URL
# - SUPABASE_SERVICE_ROLE_KEY

npm run seed
# or: node tools/seed/seed-all.mjs
```

The seeder will automatically discover and merge all `.json` files from the `questions/` directory.

During seeding:

- Each successfully inserted question is logged in the terminal.
- Failed question inserts are written to a timestamped file in `tools/seed/logs/`.

## Manual Seeding (from NotebookLM)

If you don't have sample files yet:

1. Copy template:

```bash
cp tools/seed/starter-data.template.json tools/seed/starter-data.json
```

2. Paste/merge transformed NotebookLM content into `tools/seed/starter-data.json`.

3. Ensure `.env.local` contains:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

4. Run seeding:

```bash
node tools/seed/seed-all.mjs
```

## How It Works

1. **Sample Loading**: If `tools/seed/questions/` exists, the seeder recursively finds all `.json` files and merges them.
2. **Deduplication**: Categories, topics, and questions are merged using `slug` and `external_ref` to avoid duplicates.
3. **Fallback**: If no `questions/` directory, uses `starter-data.json`.

## Expected Seed Order

The script seeds in this order:

1. categories
2. topics
3. questions

## Sample File Structure

Each file in `tools/seed/questions/` should follow:

```json
{
  "categories": [
    {
      "slug": "web-architecture",
      "name": "Web Architecture",
      "description": "..."
    }
  ],
  "topics": [
    {
      "slug": "rendering-patterns",
      "name": "Rendering Patterns",
      "category_slug": "web-architecture",
      "description": "..."
    }
  ],
  "questions": [
    {
      "external_ref": "unique-id-per-source",
      "question_text": "...",
      "question_type": "mcq",
      "difficulty": "beginner",
      "explanation": "...",
      "hint": "...",
      "tags": ["tag1", "tag2"],
      "learning_modes": ["guided", "free-style", "custom"],
      "topic_slugs": ["rendering-patterns"],
      "category_slugs": ["web-architecture"],
      "source": {
        "kind": "video|website|document",
        "title": "Source Title",
        "url": "https://...",
        "section": "Section Name",
        "timestamp": "HH:MM:SS"
      },
      "choices": [
        { "key": "A", "text": "Option text" }
      ]
    }
  ]
}
```

## Validation

After seeding, check:

- `/admin/content/questions`
- `/admin/content-management`
- `/admin/learning-cards`
