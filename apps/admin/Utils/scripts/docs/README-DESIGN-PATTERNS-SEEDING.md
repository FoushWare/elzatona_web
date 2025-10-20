# Design Patterns Questions Seeding Scripts

This directory contains scripts for seeding Design Patterns questions into the Firebase database.

## Overview

The Design Patterns questions are organized into 23 different pattern files, each containing questions related to specific design patterns. All questions have been transformed to conform to the `UnifiedQuestion` schema.

## Files Structure

### JSON Data Files

Located in `data/json/design-patterns/`:

- `observer-pattern.json` - Observer Pattern questions
- `singleton-pattern.json` - Singleton Pattern questions
- `factory-pattern.json` - Factory Pattern questions
- `strategy-pattern.json` - Strategy Pattern questions
- `decorator-pattern.json` - Decorator Pattern questions
- `command-pattern.json` - Command Pattern questions
- `adapter-pattern.json` - Adapter Pattern questions
- `facade-pattern.json` - Facade Pattern questions
- `proxy-pattern.json` - Proxy Pattern questions
- `builder-pattern.json` - Builder Pattern questions
- `template-method-pattern.json` - Template Method Pattern questions
- `state-pattern.json` - State Pattern questions
- `chain-of-responsibility-pattern.json` - Chain of Responsibility Pattern questions
- `memento-pattern.json` - Memento Pattern questions
- `visitor-pattern.json` - Visitor Pattern questions
- `flyweight-pattern.json` - Flyweight Pattern questions
- `bridge-pattern.json` - Bridge Pattern questions
- `composite-pattern.json` - Composite Pattern questions
- `iterator-pattern.json` - Iterator Pattern questions
- `prototype-pattern.json` - Prototype Pattern questions
- `abstract-factory-pattern.json` - Abstract Factory Pattern questions
- `interpreter-pattern.json` - Interpreter Pattern questions
- `mediator-pattern.json` - Mediator Pattern questions

### Seeding Scripts

- `seed-design-patterns-[pattern-name].js` - Individual seeding scripts for each pattern
- `seed-all-design-patterns-questions.js` - Master script to seed all patterns
- `seed-design-patterns-questions.sh` - Shell script runner for convenience

## Usage

### Prerequisites

- Node.js installed
- Firebase project configured
- Firebase service account key available

### Quick Start

1. **Clear existing questions** (optional):

   ```bash
   ./scripts/seed-design-patterns-questions.sh clear
   ```

2. **Seed all Design Patterns questions**:

   ```bash
   ./scripts/seed-design-patterns-questions.sh seed-all
   ```

3. **Seed individual pattern**:
   ```bash
   ./scripts/seed-design-patterns-questions.sh seed-observer
   ```

### Available Commands

| Command                        | Description                                     |
| ------------------------------ | ----------------------------------------------- |
| `clear`                        | Clears all questions from Firebase              |
| `seed-all`                     | Seeds all Design Patterns questions             |
| `seed-observer`                | Seeds Observer Pattern questions                |
| `seed-singleton`               | Seeds Singleton Pattern questions               |
| `seed-factory`                 | Seeds Factory Pattern questions                 |
| `seed-strategy`                | Seeds Strategy Pattern questions                |
| `seed-decorator`               | Seeds Decorator Pattern questions               |
| `seed-command`                 | Seeds Command Pattern questions                 |
| `seed-adapter`                 | Seeds Adapter Pattern questions                 |
| `seed-facade`                  | Seeds Facade Pattern questions                  |
| `seed-proxy`                   | Seeds Proxy Pattern questions                   |
| `seed-builder`                 | Seeds Builder Pattern questions                 |
| `seed-template-method`         | Seeds Template Method Pattern questions         |
| `seed-state`                   | Seeds State Pattern questions                   |
| `seed-chain-of-responsibility` | Seeds Chain of Responsibility Pattern questions |
| `seed-memento`                 | Seeds Memento Pattern questions                 |
| `seed-visitor`                 | Seeds Visitor Pattern questions                 |
| `seed-flyweight`               | Seeds Flyweight Pattern questions               |
| `seed-bridge`                  | Seeds Bridge Pattern questions                  |
| `seed-composite`               | Seeds Composite Pattern questions               |
| `seed-iterator`                | Seeds Iterator Pattern questions                |
| `seed-prototype`               | Seeds Prototype Pattern questions               |
| `seed-abstract-factory`        | Seeds Abstract Factory Pattern questions        |
| `seed-interpreter`             | Seeds Interpreter Pattern questions             |
| `seed-mediator`                | Seeds Mediator Pattern questions                |

### Direct Node.js Usage

You can also run the scripts directly with Node.js:

```bash
# Clear questions
node scripts/clear-questions.js

# Seed all patterns
node scripts/seed-all-design-patterns-questions.js

# Seed individual pattern
node scripts/seed-design-patterns-observer-pattern.js
```

## Question Statistics

After transformation, the Design Patterns questions include:

- **Total Files**: 23 pattern files
- **Total Questions**: ~460 questions (estimated)
- **Categories**: All questions categorized as "Design Patterns"
- **Learning Card**: All questions assigned to "system-design" learning card
- **Difficulty Levels**: beginner, intermediate, advanced
- **Question Types**: multiple-choice, open-ended, true-false, code

## Schema Compliance

All questions have been transformed to comply with the `UnifiedQuestion` schema:

- ✅ `id`: Unique identifier with pattern prefix
- ✅ `title`: Question title
- ✅ `content`: Question content
- ✅ `type`: Question type (multiple-choice, open-ended, etc.)
- ✅ `category`: "Design Patterns"
- ✅ `topic`: Specific pattern name
- ✅ `difficulty`: Mapped to beginner/intermediate/advanced
- ✅ `learningCardId`: "system-design"
- ✅ `isActive`: true
- ✅ `createdAt`/`updatedAt`: ISO timestamps
- ✅ `createdBy`/`updatedBy`: "admin"
- ✅ `tags`: Pattern-specific tags
- ✅ `explanation`: Generated explanations
- ✅ `points`: Default 10 points
- ✅ `options`: For multiple-choice questions
- ✅ `sampleAnswers`: For open-ended questions
- ✅ `hints`: Pattern-specific hints
- ✅ `metadata`: Additional metadata

## Troubleshooting

### Common Issues

1. **Firebase Connection Error**:
   - Ensure Firebase service account key is properly configured
   - Check Firebase project ID and credentials

2. **Import Errors**:
   - Ensure all dependencies are installed
   - Check file paths are correct

3. **Permission Errors**:
   - Make sure shell script is executable: `chmod +x scripts/seed-design-patterns-questions.sh`

### Verification

After seeding, verify the questions were added correctly:

1. Check Firebase Console for questions in the 'questions' collection
2. Use the admin interface at `/admin/content/questions`
3. Run the verification script: `node scripts/verify-application-state.js`

## Next Steps

After successfully seeding Design Patterns questions:

1. Test the questions in the admin interface
2. Verify question relationships with learning cards
3. Check question filtering and search functionality
4. Ensure proper categorization in the content management system

## Support

For issues or questions regarding the Design Patterns seeding process:

1. Check the console output for error messages
2. Verify Firebase configuration
3. Ensure all JSON files are valid
4. Check file permissions and paths
