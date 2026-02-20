# Firebase Progress Tracking Setup Guide

This guide will help you set up the comprehensive Firebase progress tracking system for your frontend learning platform.

## Overview

The enhanced Firebase progress tracking system provides:

- **Real-time progress tracking** for questions, challenges, and learning paths
- **User dashboard** with analytics and insights
- **Continue where you left off** functionality
- **Achievement and badge system**
- **Progress analytics** with detailed statistics
- **Streak tracking** and gamification elements

## Prerequisites

1. Firebase project with Authentication and Firestore enabled
2. Environment variables configured (see FIREBASE_SETUP.md)
3. Basic understanding of React hooks and Firebase

## Database Structure

### Collections

#### `userProgress/{userId}`

```typescript
{
  userId: string;
  totalQuestionsCompleted: number;
  totalChallengesCompleted: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  badges: string[];
  achievements: Achievement[];
  learningPaths: LearningPathProgress[];
  questionHistory: QuestionAttempt[];
  challengeHistory: ChallengeAttempt[];
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}
```

#### `users/{userId}` (existing)

Enhanced with progress tracking integration.

## Setup Steps

### 1. Update Firestore Security Rules

Deploy the updated security rules from `firestore.rules`:

```bash
firebase deploy --only firestore:rules
```

### 2. Environment Variables

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

### 3. Component Integration

#### Dashboard Integration

The dashboard automatically uses the enhanced progress tracking:

```tsx
// src/app/dashboard/page.tsx
import EnhancedDashboard from "@/components/EnhancedDashboard";

export default function DashboardPage() {
  return <EnhancedDashboard />;
}
```

#### Progress Tracking in Questions

```tsx
import { useProgressTracking } from "@/components/ProgressTracker";

function QuestionComponent() {
  const { trackQuestion } = useProgressTracking();

  const handleAnswer = async (
    isCorrect: boolean,
    attempts: number,
    timeSpent: number,
  ) => {
    await trackQuestion(
      questionId,
      category,
      difficulty,
      isCorrect,
      attempts,
      timeSpent,
    );
  };
}
```

#### Progress Tracking in Challenges

```tsx
import { useProgressTracking } from "@/components/ProgressTracker";

function ChallengeComponent() {
  const { trackChallenge } = useProgressTracking();

  const handleChallengeComplete = async (
    score: number,
    maxScore: number,
    timeSpent: number,
  ) => {
    await trackChallenge(
      challengeId,
      challengeName,
      category,
      true, // completed
      score,
      maxScore,
      timeSpent,
    );
  };
}
```

#### Learning Path Progress

```tsx
import { useProgressTracking } from "@/components/ProgressTracker";

function LearningPathComponent() {
  const { trackLearningPath } = useProgressTracking();

  const handleSectionComplete = async (
    sectionId: string,
    timeSpent: number,
  ) => {
    await trackLearningPath(
      pathId,
      pathName,
      sectionId,
      true, // completed
      timeSpent,
    );
  };
}
```

## Features

### 1. Real-time Progress Tracking

- Automatic progress updates when users complete questions, challenges, or learning path sections
- Points system based on difficulty and performance
- Time tracking for all activities

### 2. User Dashboard

- **Statistics Overview**: Questions completed, total points, current streak, achievements
- **Continue Where Left Off**: Shows recent learning path and activities
- **Recent Activities**: Timeline of user's learning activities
- **Recommendations**: Personalized content suggestions

### 3. Progress Analytics

- **Time Spent**: Total learning time with weekly/monthly breakdowns
- **Average Score**: Question accuracy percentage
- **Completion Rate**: Learning path completion statistics
- **Top Categories**: Best performing subject areas
- **Activity Summary**: Recent activity breakdown

### 4. Continue Where You Left Off

- Shows the most recently accessed learning path
- Displays recent questions and challenges
- Provides quick access to resume learning
- Tracks last activity timestamp

### 5. Achievement System

- Automatic achievement unlocking based on progress
- Badge collection system
- Streak tracking and rewards
- Milestone celebrations

## Usage Examples

### Basic Progress Tracking

```tsx
import { useUserProgress } from "@/hooks/useUserProgress";

function MyComponent() {
  const { progress, dashboardStats, updateQuestion } = useUserProgress();

  // Access user progress
  console.log("Questions completed:", progress?.totalQuestionsCompleted);
  console.log("Current streak:", progress?.currentStreak);
  console.log("Average score:", dashboardStats?.averageScore);
}
```

### Custom Progress Updates

```tsx
import { useProgressTracking } from "@/components/ProgressTracker";

function CustomLearningComponent() {
  const { trackQuestion, trackChallenge, trackLearningPath } =
    useProgressTracking();

  // Track custom question
  const handleCustomQuestion = async () => {
    await trackQuestion(
      "custom-question-1",
      "javascript",
      "medium",
      true, // answered correctly
      1, // attempts
      30, // time spent in seconds
    );
  };

  // Track custom challenge
  const handleCustomChallenge = async () => {
    await trackChallenge(
      "custom-challenge-1",
      "Build a Todo App",
      "react",
      true, // completed
      85, // score
      100, // max score
      45, // time spent in minutes
    );
  };
}
```

## Data Models

### QuestionAttempt

```typescript
interface QuestionAttempt {
  questionId: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  answeredCorrectly: boolean;
  timeSpent: number; // in seconds
  attempts: number;
  timestamp: string;
  points: number;
}
```

### ChallengeAttempt

```typescript
interface ChallengeAttempt {
  challengeId: string;
  challengeName: string;
  category: string;
  completed: boolean;
  timeSpent: number; // in minutes
  score: number;
  maxScore: number;
  timestamp: string;
  points: number;
}
```

### LearningPathProgress

```typescript
interface LearningPathProgress {
  pathId: string;
  pathName: string;
  progress: number; // 0-100
  completedSections: string[];
  currentSection: string;
  lastAccessed: string;
  timeSpent: number; // in minutes
  startedAt: string;
  completedAt?: string;
}
```

## Points System

### Question Points

- **Easy**: 5 points (base)
- **Medium**: 10 points (base)
- **Hard**: 20 points (base)
- **Attempt Penalty**: -2 points per additional attempt
- **Minimum**: 1 point (even with multiple attempts)

### Challenge Points

- **Base**: Up to 50 points per challenge
- **Calculation**: (score / maxScore) \* 50
- **Completion Required**: Must complete challenge to earn points

### Streak Bonuses

- **Daily Streak**: Automatic streak tracking
- **Achievement Unlocks**: Based on streak milestones
- **Longest Streak**: Personal best tracking

## Testing

### Test Progress Tracking

1. Sign in to your application
2. Complete a few questions
3. Check the dashboard for updated statistics
4. Verify progress is saved in Firestore

### Test Continue Where Left Off

1. Start a learning path
2. Complete a few sections
3. Navigate away and return
4. Verify the "Continue Where You Left Off" section shows your progress

### Test Analytics

1. Complete various types of content
2. Check the progress analytics page
3. Verify statistics are accurate and up-to-date

## Troubleshooting

### Common Issues

1. **Progress not updating**
   - Check Firebase authentication
   - Verify Firestore security rules
   - Check browser console for errors

2. **Dashboard not loading**
   - Ensure user is authenticated
   - Check network connectivity
   - Verify Firebase configuration

3. **Continue where left off not working**
   - Check if user has any progress data
   - Verify learning path IDs match
   - Check Firestore data structure

### Debug Mode

Enable debug logging by adding to your environment:

```env
NEXT_PUBLIC_DEBUG_PROGRESS=true
```

## Performance Considerations

1. **Data Limits**: Firestore has document size limits (1MB)
2. **Read Optimization**: Use pagination for large question/challenge histories
3. **Real-time Updates**: Consider using Firestore listeners for live updates
4. **Caching**: Implement local caching for frequently accessed data

## Security

1. **User Data Isolation**: Each user can only access their own progress
2. **Input Validation**: Validate all progress data before saving
3. **Rate Limiting**: Consider implementing rate limiting for progress updates
4. **Audit Trail**: All progress changes are timestamped

## Future Enhancements

1. **Social Features**: Leaderboards and friend comparisons
2. **Advanced Analytics**: Machine learning insights
3. **Gamification**: More badges, levels, and rewards
4. **Export Data**: Allow users to export their progress
5. **Offline Support**: Cache progress for offline use

## Support

For issues or questions:

1. Check the browser console for errors
2. Verify Firebase configuration
3. Test with a fresh user account
4. Check Firestore security rules

---

**Note**: This system is designed to be scalable and can handle thousands of users with proper Firebase configuration and monitoring.
