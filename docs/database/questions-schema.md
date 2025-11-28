# Questions Table Schema

## Table: `questions`

### Overview
The `questions` table stores all question data for the platform, including multiple-choice, code, and open-ended questions.

### Columns

| Column Name | Data Type | Nullable | Default | Description |
|------------|-----------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | Primary key |
| `title` | `varchar(500)` | NO | - | Question title/heading |
| `content` | `text` | NO | - | Question content/body |
| `type` | `varchar(50)` | NO | - | Question type (see allowed values below) |
| `difficulty` | `varchar(20)` | YES | - | Difficulty level (see allowed values below) |
| `points` | `integer` | YES | `1` | Points awarded for correct answer |
| `options` | `jsonb` | YES | - | Answer options (for multiple-choice questions) |
| `correct_answer` | `text` | YES | - | Correct answer text |
| `explanation` | `text` | YES | - | Explanation of the answer |
| `test_cases` | `jsonb` | YES | - | Test cases (for code questions) |
| `hints` | `text[]` | YES | - | Array of hint strings |
| `tags` | `text[]` | YES | - | Array of tag strings |
| `stats` | `jsonb` | YES | `{"avgTime": 0, "correct": 0, "attempts": 0}` | Question statistics |
| `metadata` | `jsonb` | YES | - | Additional metadata |
| `category_id` | `uuid` | YES | - | Foreign key to `categories.id` |
| `learning_card_id` | `uuid` | YES | - | Foreign key to `learning_cards.id` |
| `topic_id` | `uuid` | YES | - | Foreign key to `topics.id` |
| `is_active` | `boolean` | YES | `true` | Whether the question is active |
| `created_at` | `timestamptz` | YES | `now()` | Creation timestamp |
| `updated_at` | `timestamptz` | YES | `now()` | Last update timestamp |
| `resources` | `jsonb` | YES | - | Learning resources (see structure below) |

### Constraints

#### Primary Key
- `questions_pkey` on `id`

#### Foreign Keys
- `questions_category_id_fkey`: `category_id` → `categories.id`
- `questions_learning_card_id_fkey`: `learning_card_id` → `learning_cards.id`
- `questions_topic_id_fkey`: `topic_id` → `topics.id`

#### Check Constraints

**`type`** - Allowed values:
- `'multiple-choice'` (or `'mcq'` - same thing)
- `'true-false'`
- `'code'`

**`difficulty`** - Allowed values:
- `'beginner'`
- `'intermediate'`
- `'advanced'`

### JSONB Field Structures

#### `options` (for multiple-choice and true-false questions)
```json
[
  {
    "id": "A",
    "text": "Option text here",
    "isCorrect": true,
    "explanation": "Optional explanation for this option"
  },
  {
    "id": "B",
    "text": "Another option",
    "isCorrect": false,
    "explanation": ""
  }
]
```

#### `stats`
```json
{
  "avgTime": 0,
  "correct": 0,
  "attempts": 0
}
```

#### `resources` (Learning Resources)
```json
[
  {
    "type": "video" | "course" | "article",
    "title": "Resource title",
    "url": "https://...",
    "description": "Optional description",
    "duration": "Optional duration (e.g., '10 min')",
    "author": "Optional author name"
  }
]
```

#### `test_cases` (for code questions)
```json
[
  {
    "input": "...",
    "expectedOutput": "...",
    "description": "Optional description"
  }
]
```

#### `metadata`
```json
{
  // Any additional metadata
}
```

### Array Fields

#### `hints`
```sql
-- Example: ['Hint 1', 'Hint 2', 'Hint 3']
```

#### `tags`
```sql
-- Example: ['react', 'hooks', 'state-management']
```

### Indexes
- Primary key index on `id`
- Foreign key indexes on `category_id`, `learning_card_id`, `topic_id`

### Row Level Security (RLS)
- **Enabled**: Yes
- Policies control access based on user permissions

### Example Record

```json
{
  "id": "uuid-here",
  "title": "What is React?",
  "content": "Explain what React is and its main features.",
  "type": "multiple-choice",
  "difficulty": "beginner",
  "points": 1,
  "options": [
    {
      "id": "A",
      "text": "A JavaScript library for building user interfaces",
      "isCorrect": true,
      "explanation": ""
    },
    {
      "id": "B",
      "text": "A database management system",
      "isCorrect": false,
      "explanation": ""
    }
  ],
  "correct_answer": "A JavaScript library for building user interfaces",
  "explanation": "React is a JavaScript library developed by Facebook for building user interfaces.",
  "hints": ["Think about UI libraries", "It's developed by Facebook"],
  "tags": ["react", "javascript", "frontend"],
  "stats": {
    "avgTime": 0,
    "correct": 0,
    "attempts": 0
  },
  "category_id": "uuid-of-category",
  "topic_id": "uuid-of-topic",
  "learning_card_id": "uuid-of-learning-card",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "resources": [
    {
      "type": "article",
      "title": "React Documentation",
      "url": "https://react.dev",
      "description": "Official React documentation"
    }
  ]
}
```

### Notes

1. **Required Fields**: `id`, `title`, `content`, `type` are required
2. **Options Field**: Required for `multiple-choice`, `true-false`, and `code` question types
3. **Foreign Keys**: All foreign keys are nullable, allowing questions to exist without being linked to categories/topics/cards
4. **Stats Field**: Automatically initialized with default values if not provided
5. **Resources Field**: Contains learning resources related to the question (videos, articles, courses)
6. **Removed Types**: `open-ended`, `scenario`, and `concept` types have been removed as they were not being used

