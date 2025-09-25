# Firebase Data Structure & Entity Relationships

## Overview

This document outlines the Firebase Firestore data structure for the Frontend Development Platform, showing how questions, sections, learning paths, and guided learning plans are interconnected.

## Core Collections

### 1. `unifiedQuestions` Collection

**Purpose**: Central repository for all questions in the system
**Document ID**: Auto-generated or custom ID

```typescript
interface UnifiedQuestion {
  id: string;
  title: string;
  content: string;
  type: 'single' | 'multiple' | 'open-ended' | 'code';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string; // e.g., 'JavaScript', 'React', 'CSS'
  subcategory?: string; // e.g., 'ES6', 'Hooks', 'Flexbox'
  learningPath: string; // Reference to learningPaths.id
  sectionId?: string; // Reference to sections.id (optional)
  tags: string[];
  options?: QuestionOption[]; // For multiple choice
  correctAnswers?: string[]; // For multiple choice
  explanation: string;
  points: number;
  timeLimit: number; // in seconds
  audioQuestion?: string; // URL to audio file
  audioAnswer?: string; // URL to audio file
  isActive: boolean;
  isComplete: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string; // User ID who created
  lastModifiedBy: string; // User ID who last modified
}
```

### 2. `sections` Collection

**Purpose**: Learning sections that group related questions
**Document ID**: Custom ID (e.g., 'javascript-fundamentals')

```typescript
interface Section {
  id: string;
  name: string;
  description: string;
  category:
    | 'foundation'
    | 'frontend'
    | 'advanced'
    | 'specialized'
    | 'career'
    | 'emerging';
  learningPath: string; // Reference to learningPaths.id
  questions: string[]; // Array of question IDs from unifiedQuestions
  order: number;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  lastModifiedBy: string;
}
```

### 3. `learningPaths` Collection

**Purpose**: Learning paths that organize sections and questions
**Document ID**: Custom ID (e.g., 'frontend-fundamentals')

```typescript
interface LearningPath {
  id: string;
  name: string;
  description: string;
  category: string;
  sections: string[]; // Array of section IDs
  questions: string[]; // Array of question IDs (direct questions not in sections)
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in hours
  isActive: boolean;
  isPublic: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  lastModifiedBy: string;
}
```

### 4. `learningPlans` Collection

**Purpose**: Guided learning plans (admin-created and user-created)
**Document ID**: Custom ID for admin plans, auto-generated for user plans

```typescript
interface LearningPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // in days
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sections: PlanSection[];
  totalQuestions: number;
  dailyQuestions: number;
  features: string[];
  isActive: boolean;
  isPublic: boolean;
  isRecommended: boolean;
  estimatedTime: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string; // 'admin' or user ID
  lastModifiedBy: string;
  planType: 'admin' | 'user'; // Distinguishes admin vs user plans
}

interface PlanSection {
  id: string; // Reference to sections.id
  name: string;
  category: string;
  questions: string[]; // Array of question IDs
  weight: number; // Percentage of total plan
  order: number;
}
```

### 5. `userPlans` Collection

**Purpose**: User-created custom learning plans
**Document ID**: Auto-generated

```typescript
interface UserPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  sections: PlanSection[];
  totalQuestions: number;
  dailyQuestions: number;
  isActive: boolean;
  isPublic: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  // Inherits from LearningPlan but with userId
}
```

### 6. `userProgress` Collection

**Purpose**: Track user progress through plans and questions
**Document ID**: `${userId}_${planId}`

```typescript
interface UserProgress {
  userId: string;
  planId: string;
  currentSection: string;
  completedQuestions: string[];
  scores: Record<string, number>; // questionId -> score
  averageScore: number;
  completedSections: string[];
  startedAt: Timestamp;
  lastActivityAt: Timestamp;
  completedAt?: Timestamp;
}
```

## Data Flow & Relationships

### 1. Question Creation Flow

```
admin/content/questions → unifiedQuestions
                      ↓
                  (categorize by category + learningPath)
                      ↓
admin/sections → sections (filter by category + learningPath)
                      ↓
admin/guided-learning → learningPlans (filter by category + learningPath)
```

### 2. Section Management Flow

```
admin/sections → sections
              ↓
        (link questions by category + learningPath)
              ↓
admin/guided-learning → learningPlans
```

### 3. User Custom Plan Flow

```
User creates plan → userPlans
                 ↓
            (selects from sections + questions)
                 ↓
            userProgress (tracks completion)
```

## Firebase Indexes Required

### Composite Indexes for Queries

1. **unifiedQuestions**
   - `isActive` + `category` + `createdAt`
   - `isActive` + `learningPath` + `createdAt`
   - `isActive` + `difficulty` + `createdAt`
   - `isActive` + `isComplete` + `createdAt`
   - `sectionId` + `isActive` + `createdAt`

2. **sections**
   - `isActive` + `category` + `order`
   - `isActive` + `learningPath` + `order`
   - `category` + `learningPath` + `order`

3. **learningPaths**
   - `isActive` + `isPublic` + `createdAt`
   - `category` + `difficulty` + `createdAt`

4. **learningPlans**
   - `isActive` + `isPublic` + `createdAt`
   - `planType` + `isActive` + `createdAt`
   - `createdBy` + `isActive` + `createdAt`

5. **userPlans**
   - `userId` + `isActive` + `createdAt`
   - `isPublic` + `isActive` + `createdAt`

6. **userProgress**
   - `userId` + `completedAt` + `lastActivityAt`
   - `planId` + `completedAt` + `lastActivityAt`

## Linking Logic

### 1. Questions to Sections

- Questions are linked to sections based on `category` and `learningPath`
- When a question is created in `admin/content/questions`, it automatically appears in relevant sections
- Sections can also have questions added directly via `admin/sections`

### 2. Sections to Learning Plans

- Learning plans reference sections by `sectionId`
- Sections are filtered by `category` and `learningPath` when building plans
- Plans can override section questions by maintaining their own `questions` array

### 3. User Custom Plans

- Users can create custom plans by selecting from available sections and questions
- User plans are stored separately in `userPlans` collection
- User plans can mix and match sections from different learning paths

## Admin Interface Integration

### 1. `/admin/content/questions`

- **Create**: Add questions to `unifiedQuestions`
- **Categorize**: Set `category` and `learningPath`
- **Auto-link**: Questions automatically appear in relevant sections

### 2. `/admin/sections`

- **View**: Show questions filtered by section's `category` and `learningPath`
- **Add**: Add questions directly to section's `questions` array
- **Manage**: Bulk operations (JSON, markdown import)

### 3. `/admin/guided-learning`

- **View**: Show sections and questions for plan creation
- **Create**: Build learning plans by selecting sections
- **Manage**: Assign questions to plan sections

## User Interface Integration

### 1. Free Style Learning

- Users can browse all available questions by category/learning path
- Users can create custom plans by selecting questions/sections
- Progress is tracked in `userProgress`

### 2. Guided Learning

- Users follow pre-built learning plans
- Progress is tracked per plan
- Plans can be admin-created or user-created

## Data Consistency Rules

1. **Question Deletion**: When a question is deleted, remove it from all sections and plans
2. **Section Deletion**: When a section is deleted, remove it from all plans
3. **Learning Path Changes**: Update all related sections and questions
4. **Category Changes**: Re-evaluate section and plan assignments

## Migration Strategy

1. **Phase 1**: Migrate existing questions to `unifiedQuestions`
2. **Phase 2**: Create sections based on current categories
3. **Phase 3**: Build learning plans from sections
4. **Phase 4**: Enable user custom plan creation
5. **Phase 5**: Implement progress tracking

This structure provides a flexible, scalable foundation for both admin-managed content and user-generated learning paths while maintaining data consistency and enabling efficient querying.



