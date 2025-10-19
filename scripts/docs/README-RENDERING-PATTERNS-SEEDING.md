# Rendering Patterns Questions Seeding Scripts

This directory contains scripts for seeding Rendering Patterns questions into the Firebase database. All questions are assigned to the "system-design" learning card.

## Overview

The Rendering Patterns questions cover various rendering techniques and patterns used in modern web development, including:

- Static Rendering
- Server-Side Rendering (SSR)
- Client-Side Rendering (CSR)
- Hydration
- Streaming SSR
- Partial Hydration
- Edge Rendering
- Progressive Hydration & Resumability
- React Server Components
- Islands Architecture

## Files Structure

### JSON Data Files

Located in `data/json/rendering-patterns/`:

- `rendering.json` - Static Rendering (10 questions)
- `rendering-2.json` - Server-Side Rendering (10 questions)
- `rendering-4.json` - Client-Side Rendering (10 questions)
- `rendering-5.json` - Hydration (10 questions)
- `render-6.json` - Streaming SSR (10 questions)
- `render-7.json` - Partial Hydration (10 questions)
- `rendering-8.json` - Edge Rendering (10 questions)
- `rendering-9.json` - Progressive Hydration & Resumability (10 questions)
- `rendering-10.json` - React Server Components (18 questions)
- `island-archeticure.json` - Islands Architecture (10 questions)

**Total: 108 questions**

### Seeding Scripts

Located in `scripts/`:

- `seed-rendering-patterns-rendering.ts` - Seeds rendering.json
- `seed-rendering-patterns-rendering-2.ts` - Seeds rendering-2.json
- `seed-rendering-patterns-rendering-4.ts` - Seeds rendering-4.json
- `seed-rendering-patterns-rendering-5.ts` - Seeds rendering-5.json
- `seed-rendering-patterns-render-6.ts` - Seeds render-6.json
- `seed-rendering-patterns-render-7.ts` - Seeds render-7.json
- `seed-rendering-patterns-rendering-8.ts` - Seeds rendering-8.json
- `seed-rendering-patterns-rendering-9.ts` - Seeds rendering-9.json
- `seed-rendering-patterns-rendering-10.ts` - Seeds rendering-10.json
- `seed-rendering-patterns-island-archeticure.ts` - Seeds island-archeticure.json
- `seed-all-rendering-patterns-questions.ts` - Master script to run all individual scripts
- `seed-rendering-patterns-questions.sh` - Shell script runner for easy execution

### Utility Scripts

- `clear-questions.ts` - Clears all questions from Firebase
- `transform-rendering-patterns.js` - Transforms JSON files to UnifiedQuestion schema

## Usage

### Prerequisites

1. Ensure you have Node.js and npm installed
2. Install ts-node globally: `npm install -g ts-node`
3. Set up your Firebase service account key in `.env` file:
   ```
   FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
   ```

### Using the Shell Script (Recommended)

```bash
# Navigate to project root
cd /path/to/Elzatona-web

# Clear all existing questions
./scripts/seed-rendering-patterns-questions.sh clear

# Seed all Rendering Patterns questions
./scripts/seed-rendering-patterns-questions.sh seed-all

# Seed individual files
./scripts/seed-rendering-patterns-questions.sh seed-rendering
./scripts/seed-rendering-patterns-questions.sh seed-rendering-2
# ... etc
```

### Using Individual Scripts

```bash
# Clear questions
npx ts-node scripts/clear-questions.ts

# Seed all Rendering Patterns questions
npx ts-node scripts/seed-all-rendering-patterns-questions.ts

# Seed individual files
npx ts-node scripts/seed-rendering-patterns-rendering.ts
npx ts-node scripts/seed-rendering-patterns-rendering-2.ts
# ... etc
```

## Question Schema

All questions follow the `UnifiedQuestion` schema:

```typescript
interface UnifiedQuestion {
  id: string; // Unique identifier
  title: string; // Question title
  content: string; // Question content
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'code';
  category: string; // "Rendering Patterns"
  topic: string; // Specific topic (e.g., "Static Rendering")
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningCardId: string; // "system-design"
  isActive: boolean; // true
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  createdBy: string; // "admin"
  updatedBy: string; // "admin"
  tags: string[]; // Array of tags
  explanation?: string; // Optional explanation
  points: number; // Points value (default: 10)
  options?: {
    // For multiple-choice questions
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  sampleAnswers?: string[]; // For open-ended questions
}
```

## Learning Card Assignment

All Rendering Patterns questions are assigned to the "system-design" learning card, which covers:

- System Design concepts
- Rendering patterns and techniques
- Performance optimization strategies
- Modern web development patterns

## Verification

After seeding, you can verify the questions in the admin panel:

1. Navigate to `/admin/content/questions`
2. Filter by category "Rendering Patterns"
3. Check that all 108 questions are present
4. Verify that questions are assigned to the "system-design" learning card

## Troubleshooting

### Common Issues

1. **Firebase Authentication Error**
   - Ensure `FIREBASE_SERVICE_ACCOUNT_KEY` is properly set in `.env`
   - Verify the service account has Firestore permissions

2. **TypeScript Compilation Error**
   - Ensure ts-node is installed: `npm install -g ts-node`
   - Check that all imports are correct

3. **Permission Denied (Shell Script)**
   - Make script executable: `chmod +x scripts/seed-rendering-patterns-questions.sh`

4. **Questions Not Appearing**
   - Check Firebase console for any errors
   - Verify the collection name is "questions"
   - Ensure questions are marked as `isActive: true`

### Logs and Debugging

The scripts provide detailed console output:

- ✅ Success messages for completed operations
- ❌ Error messages with details
- 📊 Progress indicators and counts

## Maintenance

### Adding New Questions

1. Add questions to the appropriate JSON file
2. Run the transformation script if needed: `node scripts/transform-rendering-patterns.js`
3. Create a new seeding script following the existing pattern
4. Update the master script and shell runner
5. Update this documentation

### Updating Existing Questions

1. Modify the JSON files directly
2. Clear existing questions: `./scripts/seed-rendering-patterns-questions.sh clear`
3. Re-seed: `./scripts/seed-rendering-patterns-questions.sh seed-all`

## Statistics

- **Total Questions**: 108
- **Files**: 10
- **Topics Covered**: 10 different rendering patterns
- **Difficulty Distribution**: Mixed (beginner to advanced)
- **Learning Card**: system-design
- **Category**: Rendering Patterns
