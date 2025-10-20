# Comprehensive Learning Flow Implementation

## Overview

Implement a complete learning flow with guided and self-directed modes, including custom roadmap creation and dynamic content management.

## User Flows

### 1. Guided Learning Flow

1. User goes to `/get-started`
2. Chooses "I need guidance"
3. Sign-in popup appears
4. After login, user stays on get-started page
5. Navigates to `/guided-learning` with dynamic plans (1-7 days)
6. Plans and questions are fetched from Firebase dynamically

### 2. Self-Directed Learning Flow

1. User goes to `/get-started`
2. Chooses "I'm self-directed"
3. Goes to new practice selection page
4. Can choose between:
   - Practice interview questions (learning-paths)
   - Practice frontend tasks
   - Practice problem solving

### 3. Custom Roadmap Creation

1. User can create custom roadmap
2. Access to all sections: HTML, CSS, JavaScript, Behavioral Skills, AI Tools, etc.
3. Each section has topics with questions
4. User can select specific questions from each topic
5. Set duration (1 day to N days)
6. Save custom plans per user
7. View and manage custom plans

## Implementation Tasks

### Phase 1: Practice Selection Page

- [ ] Create `/practice-selection` page
- [ ] Add three main options:
  - Practice interview questions → `/learning-paths`
  - Practice frontend tasks → new page
  - Practice problem solving → new page
- [ ] Update get-started page to redirect to practice-selection for self-directed users

### Phase 2: Dynamic Guided Learning

- [ ] Update guided-learning page to fetch plans from Firebase
- [ ] Make plans 1-7 days dynamic
- [ ] Ensure questions are fetched dynamically
- [ ] Test sign-in flow integration

### Phase 3: Custom Roadmap Builder

- [ ] Create `/custom-roadmap` page
- [ ] Implement section selection (HTML, CSS, JS, etc.)
- [ ] Create topic selection with questions
- [ ] Add question selection interface
- [ ] Implement duration selection
- [ ] Add save/load functionality

### Phase 4: Custom Plans Management

- [ ] Create `/my-custom-plans` page
- [ ] List user's custom plans
- [ ] Allow editing/deleting plans
- [ ] Add plan execution functionality

### Phase 5: Firebase Integration

- [ ] Set up Firebase collections for:
  - Learning plans (guided)
  - Custom user plans
  - Questions by topic
  - User progress tracking
- [ ] Implement CRUD operations
- [ ] Add real-time updates

## Technical Requirements

### Database Structure

```javascript
// Learning Plans Collection
learningPlans: {
  id: string,
  name: string,
  duration: number, // days
  description: string,
  topics: [{
    id: string,
    name: string,
    questions: [questionId]
  }],
  createdAt: timestamp,
  updatedAt: timestamp
}

// Custom User Plans Collection
userCustomPlans: {
  id: string,
  userId: string,
  name: string,
  duration: number,
  selectedTopics: [{
    topicId: string,
    topicName: string,
    selectedQuestions: [questionId]
  }],
  createdAt: timestamp,
  updatedAt: timestamp
}

// Questions by Topic Collection
questionsByTopic: {
  topicId: string,
  topicName: string,
  questions: [{
    id: string,
    title: string,
    difficulty: string,
    type: string,
    content: object
  }]
}
```

### Pages to Create/Update

1. `/practice-selection` - New page for self-directed users
2. `/guided-learning` - Update to be dynamic
3. `/custom-roadmap` - New page for roadmap creation
4. `/my-custom-plans` - New page for plan management
5. `/get-started` - Update redirect logic

## Status

- [ ] Phase 1: Practice Selection Page
- [ ] Phase 2: Dynamic Guided Learning
- [ ] Phase 3: Custom Roadmap Builder
- [ ] Phase 4: Custom Plans Management
- [ ] Phase 5: Firebase Integration
