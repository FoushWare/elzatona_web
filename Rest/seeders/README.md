# Database Seeders

This directory contains seeders for populating the Supabase database with learning cards, categories, topics, and questions.

## Structure

```
Rest/seeders/
├── 00-run-all-seeders.js    # Master script to run all seeders
├── 01-seed-learning-cards.js
├── 02-seed-categories.js
├── 03-seed-topics.js
├── 04-seed-questions.js
└── README.md
```

## How It Works

### Update-Only Approach
- **Learning Cards**: Updates existing cards by `type`, creates new ones if missing
- **Categories**: Updates existing categories by `slug`, creates new ones if missing
- **Topics**: Updates existing topics by `slug` + `category_id`, creates new ones if missing
- **Questions**: Updates existing questions by `title` + `category_id`, creates new ones if missing

### Dependencies
Seeders must be run in order due to foreign key relationships:
1. Learning Cards (no dependencies)
2. Categories (depends on Learning Cards)
3. Topics (depends on Categories)
4. Questions (depends on Topics, Categories, Learning Cards)

## Usage

### Run All Seeders
```bash
node Rest/seeders/00-run-all-seeders.js
```

### Run Individual Seeders
```bash
# Seed learning cards only
node Rest/seeders/01-seed-learning-cards.js

# Seed categories only
node Rest/seeders/02-seed-categories.js

# Seed topics only
node Rest/seeders/03-seed-topics.js

# Seed questions only
node Rest/seeders/04-seed-questions.js
```

## Environment Variables

Required environment variables (in `.env` file):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Data Sources

- **Learning Cards**: Defined in seeders (5 cards: core-technologies, framework-questions, system-design, frontend-tasks, problem-solving)
- **Categories**: From `apps/admin/network/data/json/categories-topics-cards-plans/categories-topics-cards-plans.json`
- **Topics**: From `apps/admin/network/data/json/categories-topics-cards-plans/categories-topics-cards-plans.json`
- **Questions**: From `Rest/final-questions-v01/*-questions.json` files

## Features

- ✅ **Idempotent**: Can be run multiple times safely
- ✅ **Update Existing**: Updates records that already exist
- ✅ **Create Missing**: Creates new records if they don't exist
- ✅ **Batch Processing**: Questions are processed in batches to avoid memory issues
- ✅ **Error Handling**: Continues processing even if individual records fail
- ✅ **Progress Tracking**: Shows progress for long-running operations

## Card Structure

```
Cards (Learning Cards)
├── Core Technologies
│   ├── HTML
│   ├── CSS
│   └── JavaScript
├── Framework Questions
│   ├── React
│   ├── Next.js
│   └── Design Patterns
├── System Design
│   ├── System Design
│   ├── Performance Patterns
│   ├── Rendering Patterns
│   └── Security
├── Frontend Tasks
│   └── Frontend Tasks
└── Problem Solving
    └── Problem Solving
```

## Notes

- Questions are linked to topics, categories, and learning cards automatically
- If a topic doesn't exist for a question, it will still be created but may not have a topic link
- The seeder uses Supabase's upsert pattern (check existence, then update or insert)
- All timestamps are set automatically (`created_at` for new records, `updated_at` for all)

