# Firebase Questions System Setup Guide

This guide will help you set up the Firebase-powered questions and answers system that stores questions as JSON in Firestore.

## Overview

The Firebase Questions System provides:

- **JSON Storage**: Questions stored as structured JSON documents in Firestore
- **Real-time Delivery**: Questions loaded dynamically from Firebase
- **Progress Tracking**: User attempts and performance tracking
- **Question Management**: Full CRUD operations for questions and categories
- **Search & Filtering**: Advanced search and filtering capabilities
- **Performance Optimization**: Efficient queries and caching

## Prerequisites

1. Firebase project with Authentication and Firestore enabled
2. Environment variables configured (see FIREBASE_SETUP.md)
3. Basic understanding of React hooks and Firebase

## Database Structure

### Collections

#### `questions/{questionId}`

```typescript
{
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  points: number;
  timeLimit?: number; // in seconds
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  isActive: boolean;
}
```

#### `questionCategories/{categoryId}`

```typescript
{
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  questionCount: number;
  isActive: boolean;
}
```

#### `questionAttempts/{attemptId}`

```typescript
{
  questionId: string;
  userId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // in seconds
  attempts: number;
  timestamp: string;
  points: number;
}
```

## Setup Steps

### 1. Deploy Updated Firestore Security Rules

Deploy the updated security rules from `firestore.rules`:

```bash
firebase deploy --only firestore:rules
```

### 2. Seed Sample Questions

Run the seeding script to populate your database with sample questions:

```bash
# Make sure you have your environment variables set
node scripts/seed-questions.mjs
```

This will create:

- 12 sample questions across JavaScript, React, and CSS categories
- 5 question categories with metadata
- Proper timestamps and relationships

### 3. Environment Variables

Ensure your `.env.local` file contains:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY_HERE>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Usage Examples

### 1. Basic Question Loading

```tsx
import { useQuestions } from "@/hooks/useQuestions";

function MyComponent() {
  const { questions, loadQuestions, isLoading } = useQuestions();

  useEffect(() => {
    loadQuestions({ category: "JavaScript", difficulty: "medium" });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.question}</h3>
          {/* Render question options */}
        </div>
      ))}
    </div>
  );
}
```

### 2. Using the Firebase Question Component

```tsx
import FirebaseQuestion from "@/components/FirebaseQuestion";

function QuizPage() {
  const handleQuestionComplete = (result) => {
    console.log("Question completed:", result);
    // Handle result (points, time, etc.)
  };

  return (
    <FirebaseQuestion
      category="JavaScript"
      difficulty="medium"
      onComplete={handleQuestionComplete}
      showNavigation={true}
      autoAdvance={false}
    />
  );
}
```

### 3. Question Management

```tsx
import QuestionManager from "@/components/QuestionManager";

function AdminPage() {
  return <QuestionManager />;
}
```

### 4. Custom Question Operations

```tsx
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "@/lib/firebase-questions";

// Get questions with filters
const questions = await getQuestions({
  category: "JavaScript",
  difficulty: "hard",
  limit: 10,
});

// Create a new question
const questionId = await createQuestion({
  question: "What is closure in JavaScript?",
  options: [
    "A function inside another function",
    "A variable scope",
    "A data type",
    "A method",
  ],
  correctAnswer: 0,
  explanation:
    "A closure is a function that has access to variables in its outer scope.",
  category: "JavaScript",
  difficulty: "medium",
  tags: ["closure", "scope", "functions"],
  points: 15,
  isActive: true,
});

// Update a question
await updateQuestion(questionId, {
  points: 20,
  difficulty: "hard",
});

// Delete a question
await deleteQuestion(questionId);
```

## Features

### 1. Question Management

- **Create Questions**: Add new questions with full metadata
- **Edit Questions**: Update existing questions
- **Delete Questions**: Remove questions from the database
- **Bulk Operations**: Import/export questions
- **Categories**: Organize questions by categories
- **Tags**: Add custom tags for better organization

### 2. Question Delivery

- **Dynamic Loading**: Questions loaded from Firebase in real-time
- **Filtering**: Filter by category, difficulty, tags
- **Search**: Full-text search across questions and explanations
- **Random Selection**: Get random questions for quizzes
- **Pagination**: Efficient loading of large question sets

### 3. Progress Tracking

- **Attempt Tracking**: Record all user attempts
- **Performance Analytics**: Track accuracy, time spent, points earned
- **User History**: View previous attempts and progress
- **Real-time Updates**: Progress updates immediately in Firebase

### 4. Question Analytics

- **Statistics**: Total questions, categories, difficulty distribution
- **Performance Metrics**: Average points, completion rates
- **Usage Analytics**: Most popular questions, categories
- **User Insights**: Individual performance tracking

## API Reference

### Question Functions

#### `getQuestions(filters?)`

Get questions with optional filters.

```typescript
const questions = await getQuestions({
  category: "JavaScript",
  difficulty: "medium",
  tags: ["closure", "scope"],
  limit: 10,
  isActive: true,
});
```

#### `getQuestion(questionId)`

Get a specific question by ID.

```typescript
const question = await getQuestion("question-123");
```

#### `getRandomQuestions(count, filters?)`

Get random questions for quizzes.

```typescript
const randomQuestions = await getRandomQuestions(5, {
  category: "JavaScript",
  difficulty: "medium",
});
```

#### `createQuestion(questionData)`

Create a new question.

```typescript
const questionId = await createQuestion({
  question: "What is...?",
  options: ["A", "B", "C", "D"],
  correctAnswer: 0,
  explanation: "Explanation...",
  category: "JavaScript",
  difficulty: "medium",
  tags: ["tag1", "tag2"],
  points: 10,
  isActive: true,
});
```

#### `updateQuestion(questionId, updates)`

Update an existing question.

```typescript
await updateQuestion("question-123", {
  points: 15,
  difficulty: "hard",
});
```

#### `deleteQuestion(questionId)`

Delete a question.

```typescript
await deleteQuestion("question-123");
```

### Category Functions

#### `getCategories()`

Get all question categories.

```typescript
const categories = await getCategories();
```

#### `createCategory(categoryData)`

Create a new category.

```typescript
const categoryId = await createCategory({
  name: "TypeScript",
  description: "TypeScript programming questions",
  icon: "🔷",
  color: "#3178C6",
  questionCount: 0,
  isActive: true,
});
```

### Progress Functions

#### `saveQuestionAttempt(attempt)`

Save a user's question attempt.

```typescript
await saveQuestionAttempt({
  questionId: "question-123",
  userId: "user-456",
  selectedAnswer: 1,
  isCorrect: false,
  timeSpent: 45,
  attempts: 2,
});
```

#### `getUserQuestionAttempts(userId, questionId?)`

Get user's question attempts.

```typescript
const attempts = await getUserQuestionAttempts("user-456", "question-123");
```

## React Hooks

### `useQuestions()`

A comprehensive hook for managing questions.

```typescript
const {
  questions,
  categories,
  stats,
  currentQuestion,
  userAttempts,
  isLoading,
  error,
  loadQuestions,
  loadQuestion,
  loadRandomQuestions,
  loadCategories,
  loadStats,
  loadUserAttempts,
  submitAnswer,
  searchQuestions,
  getQuiz,
  clearError,
} = useQuestions();
```

## Security

### Firestore Rules

The system includes comprehensive security rules:

- **Questions**: Public read, authenticated write
- **Categories**: Public read, authenticated write
- **Attempts**: Users can only access their own attempts
- **User Progress**: Users can only access their own progress

### Data Validation

- All question data is validated before saving
- User inputs are sanitized
- Points and scores are calculated server-side
- Time limits are enforced client-side

## Performance Optimization

### 1. Efficient Queries

- Indexed fields for fast filtering
- Limit clauses to prevent large data loads
- Client-side caching for frequently accessed data

### 2. Real-time Updates

- Firestore listeners for live updates
- Optimistic updates for better UX
- Batch operations for multiple changes

### 3. Caching Strategy

- Local state management with React hooks
- Memoized selectors for expensive operations
- Lazy loading for large question sets

## Testing

### 1. Test Question Loading

1. Visit `/firebase-questions`
2. Try different question categories and difficulties
3. Verify questions load from Firebase
4. Check that progress is tracked

### 2. Test Question Management

1. Access the Question Manager
2. Create, edit, and delete questions
3. Verify changes appear in real-time
4. Test search and filtering

### 3. Test Progress Tracking

1. Answer questions and check attempts are saved
2. Verify progress appears in user dashboard
3. Check analytics and statistics

## Troubleshooting

### Common Issues

1. **Questions not loading**
   - Check Firebase configuration
   - Verify Firestore security rules
   - Check browser console for errors

2. **Progress not saving**
   - Ensure user is authenticated
   - Check Firestore rules for questionAttempts
   - Verify user ID matches

3. **Question Manager not working**
   - Check authentication status
   - Verify write permissions in Firestore rules
   - Check for validation errors

### Debug Mode

Enable debug logging:

```env
NEXT_PUBLIC_DEBUG_QUESTIONS=true
```

## Future Enhancements

1. **Advanced Analytics**: Machine learning insights
2. **Question Import/Export**: CSV, JSON formats
3. **Question Templates**: Pre-built question types
4. **Collaborative Editing**: Multiple admins
5. **Question Versioning**: Track changes over time
6. **AI-Generated Questions**: Automatic question creation
7. **Question Recommendations**: Personalized suggestions
8. **Offline Support**: Cache questions for offline use

## Support

For issues or questions:

1. Check the browser console for errors
2. Verify Firebase configuration
3. Test with a fresh user account
4. Check Firestore security rules
5. Review the API documentation

---

**Note**: This system is designed to be scalable and can handle thousands of questions with proper Firebase configuration and monitoring. The JSON structure allows for easy data migration and integration with other systems.
