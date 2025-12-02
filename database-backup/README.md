# Database Backup & Seeding Guide

This directory contains scripts and instructions for backing up and restoring the Supabase database.

## Quick Start

### Option 1: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref kiycimlsatwfqxtfprlr

# Export schema only
supabase db dump --schema public -f schema.sql

# Export data only
supabase db dump --data-only --schema public -f data.sql

# Export everything (schema + data)
supabase db dump --schema public -f full-backup.sql
```

### Option 2: Using pg_dump (Direct PostgreSQL)

```bash
# Get connection string from Supabase Dashboard
# Settings > Database > Connection string (use the "URI" format)

# Export schema
pg_dump -h <host> -U postgres -d postgres \
  --schema-only --schema=public \
  -f schema.sql

# Export data
pg_dump -h <host> -U postgres -d postgres \
  --data-only --schema=public \
  -f data.sql

# Export everything
pg_dump -h <host> -U postgres -d postgres \
  --schema=public \
  -f full-backup.sql
```

## Restoring/Seeding

### Using Supabase CLI

```bash
# Restore schema first
supabase db reset --db-url <connection-string> < schema.sql

# Then restore data
psql <connection-string> < data.sql
```

### Using psql

```bash
# Restore schema first
psql <connection-string> < schema.sql

# Then restore data
psql <connection-string> < data.sql
```

## Table Export Order

When manually exporting, respect this order (foreign key dependencies):

1. `learning_cards` (foundation)
2. `categories` (depends on learning_cards)
3. `topics` (depends on categories)
4. `admin_users` (independent)
5. `admins` (depends on admin_users)
6. `card_categories` (junction table)
7. `plan_categories` (junction table)
8. `learning_plans` (independent)
9. `plan_cards` (depends on learning_plans, learning_cards)
10. `questions` (depends on categories, topics, learning_cards)
11. `plan_questions` (depends on learning_plans, questions, topics)
12. `questions_topics` (junction table)
13. `user_progress` (user data - can be empty)
14. `question_attempts` (user data - can be empty)
15. `problem_solving_tasks` (can be empty)
16. `frontend_tasks` (can be empty)

## Current Database Stats

- **Total Questions**: 2,596
  - Multiple-choice: 2,526
  - Code: 70
  - Open-ended: 0
  - True-false: 0
- **Learning Cards**: 4
- **Categories**: 12
- **Topics**: 179
- **Learning Plans**: 7
- **Admin Users**: 1

## Important Notes

- Always export schema before data
- Test imports on a development database first
- Backup current database before importing
- Some tables may be empty (user_progress, question_attempts, etc.)
- Large tables (questions) may take time to export/import
- Use `--data-only` for data exports to avoid schema conflicts

## Automated Export Script

See `scripts/export-database-backup.js` for a Node.js script that can help automate the export process.






