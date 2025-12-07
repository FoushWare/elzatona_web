# Seeding Data from Testing to Main Database

This guide explains how to seed data from `zatona-web-testing` to `zatona-web` (main database).

## Prerequisites

1. **Supabase Service Role Keys**: You need service role keys for both databases:
   - `TESTING_SUPABASE_SERVICE_ROLE_KEY` - For zatona-web-testing (kiycimlsatwfqxtfprlr)
   - `SUPABASE_SERVICE_ROLE_KEY` - For zatona-web (hpnewqkvpnthpohvxcmq)

2. **Get Service Role Keys**:
   - Testing: https://supabase.com/dashboard/project/kiycimlsatwfqxtfprlr/settings/api
   - Main: https://supabase.com/dashboard/project/hpnewqkvpnthpohvxcmq/settings/api
   - Steps: Dashboard → Your Project → Settings → API → Scroll to "Project API keys" → Click 👁️ next to "service_role" → Copy

## Setup

The script reads from both `.env.local` and `.env.test.local`:

1. **Add to `.env.local`** (for main database):

   ```bash
   # Main database (zatona-web) - should already exist
   NEXT_PUBLIC_SUPABASE_URL=https://hpnewqkvpnthpohvxcmq.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_main_service_role_key_here
   ```

2. **Add to `.env.test.local`** (for testing database):

   ```bash
   # Testing database (zatona-web-testing)
   TESTING_SUPABASE_SERVICE_ROLE_KEY=your_testing_service_role_key_here
   # Optional: if you want to specify a custom URL
   # TESTING_SUPABASE_URL=https://kiycimlsatwfqxtfprlr.supabase.co
   ```

   **Note**: The script automatically uses:
   - `SUPABASE_SERVICE_ROLE_KEY` from `.env.local` (for main database)
   - `TESTING_SUPABASE_SERVICE_ROLE_KEY` from `.env.test.local` (preferred) or `.env.local` (fallback)
   - `NEXT_PUBLIC_SUPABASE_URL` from `.env.local` (for main database URL, optional)

## Usage

Run the seeding script:

```bash
npm run seed:testing-to-main
```

Or directly:

```bash
node scripts/seed-from-testing-to-main.mjs
```

## What Gets Copied

The script copies the following data from testing to main:

1. **Questions** (2,596 questions)
   - Maps `category_id`, `topic_id`, and `learning_card_id` using slug/name matching
   - Creates new UUIDs for questions

2. **Learning Plans** (7 plans)
   - Creates new UUIDs for plans
   - Maps relationships to questions

3. **Plan Cards** (28 relationships)
   - Maps `plan_id` and `card_id` to new IDs

4. **Plan Questions** (3,968 relationships)
   - Maps `plan_id`, `question_id`, and `topic_id` to new IDs

5. **Card Categories** (12 relationships)
   - Maps `card_id` and `category_id` to new IDs

## ID Mapping Strategy

The script uses the following strategies to map foreign keys:

- **Categories**: Matched by `slug`
- **Topics**: Matched by `slug`
- **Learning Cards**: Matched by `title`
- **Questions**: Matched by `title` and `content` (after insertion)
- **Learning Plans**: Matched by `name` (after insertion)

## Important Notes

⚠️ **Warning**: This script will:

- Insert new records (doesn't delete existing data)
- Use `upsert` with conflict resolution (won't duplicate if title/name matches)
- Create new UUIDs for all inserted records
- Map foreign keys automatically

✅ **Safe to run multiple times**: The script uses `upsert` with conflict resolution, so running it multiple times won't create duplicates.

## Troubleshooting

### Missing Service Role Keys

```
❌ Error: Missing TESTING_SUPABASE_SERVICE_ROLE_KEY
```

**Solution**: Add `TESTING_SUPABASE_SERVICE_ROLE_KEY` to `.env.test.local` (or `.env.local` as fallback)

### Foreign Key Mapping Issues

If you see warnings like:

```
⚠️  Category not found in main: Category Name
```

**Solution**: Ensure categories, topics, and learning_cards exist in both databases with matching slugs/names.

### Duplicate Key Errors

If you see duplicate key errors:

- The script uses `upsert` which should handle this
- Check if data already exists in main database
- The script will skip duplicates automatically

## Verification

After running the script, verify the data:

```sql
-- Check question count
SELECT COUNT(*) FROM questions;

-- Check learning plans
SELECT COUNT(*) FROM learning_plans;

-- Check plan questions
SELECT COUNT(*) FROM plan_questions;
```

Expected counts:

- Questions: ~2,596
- Learning Plans: 7
- Plan Questions: ~3,968
