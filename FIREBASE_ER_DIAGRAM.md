# Firebase Entity Relationship Diagram

## Visual Representation of Data Structure

```mermaid
erDiagram
    UNIFIED_QUESTIONS {
        string id PK
        string title
        string content
        string type
        string difficulty
        string category
        string subcategory
        string learningPath FK
        string sectionId FK
        array tags
        array options
        array correctAnswers
        string explanation
        number points
        number timeLimit
        string audioQuestion
        string audioAnswer
        boolean isActive
        boolean isComplete
        timestamp createdAt
        timestamp updatedAt
        string createdBy
        string lastModifiedBy
    }

    SECTIONS {
        string id PK
        string name
        string description
        string category
        string learningPath FK
        array questions FK
        number order
        boolean isActive
        timestamp createdAt
        timestamp updatedAt
        string createdBy
        string lastModifiedBy
    }

    LEARNING_PATHS {
        string id PK
        string name
        string description
        string category
        array sections FK
        array questions FK
        string difficulty
        number estimatedDuration
        boolean isActive
        boolean isPublic
        timestamp createdAt
        timestamp updatedAt
        string createdBy
        string lastModifiedBy
    }

    LEARNING_PLANS {
        string id PK
        string name
        string description
        number duration
        string difficulty
        array sections
        number totalQuestions
        number dailyQuestions
        array features
        boolean isActive
        boolean isPublic
        boolean isRecommended
        string estimatedTime
        timestamp createdAt
        timestamp updatedAt
        string createdBy
        string lastModifiedBy
        string planType
    }

    USER_PLANS {
        string id PK
        string userId FK
        string name
        string description
        number duration
        string difficulty
        array sections
        number totalQuestions
        number dailyQuestions
        boolean isActive
        boolean isPublic
        timestamp createdAt
        timestamp updatedAt
    }

    USER_PROGRESS {
        string userId FK
        string planId FK
        string currentSection
        array completedQuestions FK
        object scores
        number averageScore
        array completedSections FK
        timestamp startedAt
        timestamp lastActivityAt
        timestamp completedAt
    }

    USERS {
        string id PK
        string email
        string name
        string role
        timestamp createdAt
        timestamp lastLoginAt
    }

    %% Relationships
    LEARNING_PATHS ||--o{ SECTIONS : "contains"
    LEARNING_PATHS ||--o{ UNIFIED_QUESTIONS : "has direct questions"
    SECTIONS ||--o{ UNIFIED_QUESTIONS : "contains"
    LEARNING_PLANS ||--o{ SECTIONS : "references"
    USER_PLANS ||--o{ SECTIONS : "references"
    USER_PLANS ||--o{ UNIFIED_QUESTIONS : "references"
    USERS ||--o{ USER_PLANS : "creates"
    USERS ||--o{ USER_PROGRESS : "has progress"
    LEARNING_PLANS ||--o{ USER_PROGRESS : "tracked in"
    USER_PLANS ||--o{ USER_PROGRESS : "tracked in"
    UNIFIED_QUESTIONS ||--o{ USER_PROGRESS : "completed in"
```

## Data Flow Diagram

```mermaid
flowchart TD
    A[Admin: Create Question] --> B[unifiedQuestions Collection]
    B --> C{Category + LearningPath}
    C --> D[Auto-appears in Sections]
    C --> E[Auto-appears in Learning Paths]

    F[Admin: Create Section] --> G[sections Collection]
    G --> H[Filter Questions by Category + LearningPath]
    H --> I[Section Questions Array]

    J[Admin: Create Learning Plan] --> K[learningPlans Collection]
    K --> L[Select Sections by Category + LearningPath]
    L --> M[Plan Sections Array]

    N[User: Create Custom Plan] --> O[userPlans Collection]
    O --> P[Select from Available Sections/Questions]
    P --> Q[User Plan Sections Array]

    R[User: Start Learning] --> S[userProgress Collection]
    S --> T[Track Question Completion]
    S --> U[Track Section Completion]
    S --> V[Track Plan Completion]

    B --> W[Free Style Learning]
    G --> W
    K --> X[Guided Learning]
    O --> X
```

## Collection Relationships Summary

### 1. **Core Content Collections**

- `unifiedQuestions` - Central question repository
- `sections` - Groups related questions
- `learningPaths` - Organizes sections and questions

### 2. **Plan Collections**

- `learningPlans` - Admin-created guided plans
- `userPlans` - User-created custom plans

### 3. **Progress Tracking**

- `userProgress` - Tracks user completion status

### 4. **Linking Strategy**

- **Questions → Sections**: Based on `category` + `learningPath`
- **Sections → Plans**: Direct reference by `sectionId`
- **Questions → Plans**: Can be direct or through sections
- **User Progress**: Tracks completion across all entities

### 5. **Admin Interface Flow**

1. **Questions** (`/admin/content/questions`) → `unifiedQuestions`
2. **Sections** (`/admin/sections`) → `sections` (auto-links questions)
3. **Plans** (`/admin/guided-learning`) → `learningPlans` (selects sections)

### 6. **User Interface Flow**

1. **Free Style**: Browse all questions by category/learning path
2. **Guided Learning**: Follow pre-built or custom plans
3. **Progress**: Tracked in `userProgress` collection

This structure ensures that:

- Questions are centrally managed and automatically categorized
- Sections automatically include relevant questions
- Learning plans can be built from sections or individual questions
- Users can create custom plans mixing different sources
- Progress is tracked consistently across all learning modes



