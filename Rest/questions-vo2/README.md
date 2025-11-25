# Questions Export - Version 2

This directory contains exported questions from the Supabase database, organized in batches.

## Structure

- Each file contains an array of question objects in JSON format
- Files are named: `questions-batch-XXX.json` where XXX is a 3-digit batch number
- Each batch contains up to 50 questions (configurable)

## File Format

Each question object contains:
- `id`: Unique question identifier
- `title`: Question title
- `content`: Question content/text
- `type`: Question type (multiple-choice, code, etc.)
- `difficulty`: Difficulty level (beginner, intermediate, advanced)
- `explanation`: Explanation for the answer
- `options`: Answer options (for multiple-choice questions)
- `resources`: Learning resources array
- `points`: Points value
- `isActive`: Active status
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Usage

These files can be used for:
- Reviewing questions locally
- Data migration
- Backup purposes
- Quality assurance

## Export Status

- **Total questions in database:** 2,596
- **Total batches exported:** 53
  - Batch 001: 10 questions (initial test)
  - Batches 002-052: 50 questions each
  - Batch 053: 36 questions (final batch)
- **Total questions exported:** 2,596 ✅
- **Batch size:** 50 questions per file (configurable)
- **Export date:** 2025-11-25
- **Export method:** Automated script (`scripts/export-questions-batches.js`)

## How to Re-export

To re-export all questions or continue from a specific point:

```bash
# Export all questions with default batch size (50)
node scripts/export-questions-batches.js

# Export with custom batch size (e.g., 100 questions per file)
node scripts/export-questions-batches.js 100

# Continue from a specific batch and offset
node scripts/export-questions-batches.js 50 10 500
```

## Script Usage

```bash
node scripts/export-questions-batches.js [batchSize] [startBatch] [startOffset]
```

- `batchSize`: Number of questions per file (default: 50)
- `startBatch`: Batch number to start from (default: 1)
- `startOffset`: Database offset to start from (default: 0)
