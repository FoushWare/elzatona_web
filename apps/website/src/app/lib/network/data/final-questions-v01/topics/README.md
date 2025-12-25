# Topics and Categories Management

This directory contains the topics and categories structure for organizing questions across different technologies (HTML, CSS, JavaScript, etc.).

## File Structure

- `topics.json` - Main file containing all categories, topics, and their metadata
- `README.md` - This documentation file

## Structure

The `topics.json` file follows this structure:

```json
{
  "categories": {
    "HTML": {
      "name": "HTML",
      "description": "Category description",
      "topics": {
        "Basics": {
          "name": "Basics",
          "description": "Topic description",
          "count": 15,
          "difficulties": {
            "intermediate": 14,
            "difficult": 1
          },
          "questionTypes": {
            "multiple-choice": 10,
            "multiple-select": 5
          },
          "lastUpdated": "2025-01-15T03:53:54.816Z"
        }
      },
      "totalQuestions": 113,
      "lastUpdated": "2025-01-15T03:53:54.816Z"
    }
  },
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2025-01-15T03:53:54.816Z",
    "totalCategories": 1,
    "totalTopics": 13,
    "totalQuestions": 113
  }
}
```

## Usage

### Updating Topics After Adding Questions

Whenever you add or modify questions, run the update script to sync the topics structure:

```bash
node Rest/scripts/update-topics.js
```

This script will:

- Read all questions from `html-questions.json` (and future question files)
- Automatically detect new categories and topics
- Update counts, difficulty distributions, and question type distributions
- Preserve existing descriptions while updating statistics

### Adding New Categories

Categories are automatically created when you add questions with a new `category` field. For example:

```json
{
  "category": "CSS",
  "topic": "Layout",
  ...
}
```

This will automatically create:

- Category: "CSS"
- Topic: "Layout" under CSS

### Adding New Topics

Topics are automatically created when you add questions with a new `topic` field within an existing category.

### Manual Category/Topic Management

You can manually edit `topics.json` to:

- Add descriptions for categories and topics
- Update metadata
- Organize topics

**Note:** When you run `update-topics.js`, it will preserve your descriptions but recalculate all counts and statistics from the actual questions.

## Current Categories

- **HTML** - HyperText Markup Language
  - Basics (15 questions)
  - Forms (15 questions)
  - Media (15 questions)
  - SEO (15 questions)
  - Accessibility (15 questions)
  - Performance (15 questions)
  - HTML5 APIs (15 questions)
  - Plus additional specialized topics

## Future Categories

As you add questions for other technologies, new categories will be automatically created:

- CSS
- JavaScript
- React
- Node.js
- etc.

## Best Practices

1. **Always run update script after adding questions** - Keeps statistics accurate
2. **Use consistent category names** - Use "CSS" not "css" or "Css"
3. **Use descriptive topic names** - "Layout" is better than "Layout1"
4. **Add descriptions** - Helps understand what each category/topic covers
5. **Keep topics focused** - Each topic should have a clear scope

## Scripts

- `Rest/scripts/update-topics.js` - Updates topics.json from question files
