# Elzatona Web - Project Architecture Diagrams

## 🏗️ System Architecture Overview

```mermaid
graph TB
    subgraph "Nx Monorepo - Elzatona Web"
        direction TB

        subgraph "Applications"
            Website[Website App<br/>Next.js 15<br/>Port 3000]
            Admin[Admin App<br/>Next.js 15<br/>Port 3001]
        end

        subgraph "Shared Libraries"
            SharedComponents[shared-components<br/>UI Components & Forms]
            SharedContexts[shared-contexts<br/>React Contexts]
            SharedHooks[shared-hooks<br/>Custom React Hooks]
            SharedTypes[shared-types<br/>TypeScript Types]
            SharedAtoms[shared-atoms<br/>Jotai State Atoms]
            Database[database<br/>Database Service]
            Auth[auth<br/>Auth Utilities]
            Utils[utils<br/>Utility Functions]
        end

        subgraph "External Services"
            Supabase[(Supabase<br/>PostgreSQL + Auth)]
            GitHub[GitHub<br/>CI/CD]
        end
    end

    Website --> SharedComponents
    Website --> SharedContexts
    Website --> SharedHooks
    Website --> SharedTypes
    Website --> SharedAtoms
    Website --> Database
    Website --> Auth
    Website --> Utils

    Admin --> SharedComponents
    Admin --> SharedContexts
    Admin --> SharedHooks
    Admin --> SharedTypes
    Admin --> Database
    Admin --> Auth

    SharedComponents --> SharedTypes
    SharedHooks --> SharedTypes
    SharedContexts --> SharedTypes
    Database --> Supabase
    Auth --> Supabase

    Website --> Supabase
    Admin --> Supabase

    GitHub -.CI/CD.-> Website
    GitHub -.CI/CD.-> Admin

    style Website fill:#3b82f6,stroke:#1e40af,color:#fff
    style Admin fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style SharedComponents fill:#10b981,stroke:#059669,color:#fff
    style SharedContexts fill:#10b981,stroke:#059669,color:#fff
    style SharedHooks fill:#10b981,stroke:#059669,color:#fff
    style SharedTypes fill:#10b981,stroke:#059669,color:#fff
    style Supabase fill:#3ecf8e,stroke:#24b47e,color:#fff
```

## 📚 Library Dependencies Graph

```mermaid
graph LR
    subgraph "Core Libraries"
        SharedTypes[shared-types<br/>Type Definitions]
    end

    subgraph "Component Layer"
        SharedComponents[shared-components<br/>UI Components]
    end

    subgraph "State Management"
        SharedContexts[shared-contexts<br/>React Contexts]
        SharedAtoms[shared-atoms<br/>Jotai Atoms]
    end

    subgraph "Business Logic"
        SharedHooks[shared-hooks<br/>Custom Hooks]
        Database[database<br/>Data Access]
        Auth[auth<br/>Authentication]
    end

    subgraph "Utilities"
        Utils[utils<br/>Helper Functions]
    end

    SharedComponents --> SharedTypes
    SharedContexts --> SharedTypes
    SharedAtoms --> SharedTypes
    SharedHooks --> SharedTypes
    SharedHooks --> SharedContexts
    SharedHooks --> Database
    Database --> SharedTypes
    Auth --> SharedTypes
    Utils --> SharedTypes

    style SharedTypes fill:#f59e0b,stroke:#d97706,color:#fff
    style SharedComponents fill:#3b82f6,stroke:#1e40af,color:#fff
    style SharedContexts fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style SharedHooks fill:#10b981,stroke:#059669,color:#fff
```

## 🌐 Website Application Structure

```mermaid
graph TB
    subgraph "Website App - Next.js 15"
        direction TB

        subgraph "Public Pages"
            Home[Home Page]
            Auth[Auth Page]
            Dashboard[Dashboard]
            GetStarted[Get Started]
        end

        subgraph "Learning Features"
            GuidedLearning[Guided Learning<br/>1-7 Day Plans]
            FreeStyle[Free Style Learning]
            CustomRoadmap[Custom Roadmap<br/>Builder]
            MyPlans[My Plans]
            BrowseQuestions[Browse Practice<br/>Questions]
        end

        subgraph "Practice Modes"
            GuidedPractice[Guided Practice]
            FreeStylePractice[Free Style Practice]
            FrontendTasks[Frontend Tasks]
            ProblemSolving[Problem Solving]
            Flashcards[Flashcards]
        end

        subgraph "API Routes"
            APIQuestions[Questions API]
            APICards[Cards API]
            APIPlans[Plans API]
            APIProgress[Progress API]
            APIAuth[Auth API]
        end

        subgraph "Components"
            Navbar[Navbar]
            DashboardComp[Dashboard Component]
            ContentMgmt[Content Management]
        end
    end

    Home --> Dashboard
    Auth --> Dashboard
    Dashboard --> GetStarted
    GetStarted --> GuidedLearning
    GetStarted --> BrowseQuestions
    BrowseQuestions --> CustomRoadmap
    CustomRoadmap --> MyPlans
    GuidedLearning --> GuidedPractice
    FreeStyle --> FreeStylePractice
    BrowseQuestions --> FrontendTasks
    BrowseQuestions --> ProblemSolving

    GuidedPractice --> APIQuestions
    FreeStylePractice --> APIQuestions
    FrontendTasks --> APIQuestions
    ProblemSolving --> APIQuestions
    Flashcards --> APICards
    MyPlans --> APIPlans
    Dashboard --> APIProgress

    style GuidedLearning fill:#3b82f6,stroke:#1e40af,color:#fff
    style CustomRoadmap fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style MyPlans fill:#10b981,stroke:#059669,color:#fff
```

## 🔐 Admin Application Structure

```mermaid
graph TB
    subgraph "Admin App - Next.js 15"
        direction TB

        subgraph "Admin Pages"
            AdminLogin[Admin Login]
            AdminDashboard[Admin Dashboard]
            ContentManagement[Content Management]
            QuestionsManagement[Questions Management]
            FrontendTasks[Frontend Tasks]
            ProblemSolving[Problem Solving]
            UsersManagement[Users Management]
            Logs[System Logs]
        end

        subgraph "Admin API"
            AdminAPI[Admin API Routes]
            QuestionsAPI[Questions API]
            CardsAPI[Cards API]
            TopicsAPI[Topics API]
        end

        subgraph "Admin Components"
            AdminNavbar[Admin Navbar]
            AdminForms[Admin Forms]
            BulkOperations[Bulk Operations]
        end
    end

    AdminLogin --> AdminDashboard
    AdminDashboard --> ContentManagement
    AdminDashboard --> QuestionsManagement
    AdminDashboard --> FrontendTasks
    AdminDashboard --> ProblemSolving
    AdminDashboard --> UsersManagement
    AdminDashboard --> Logs

    ContentManagement --> AdminAPI
    QuestionsManagement --> QuestionsAPI
    FrontendTasks --> AdminAPI
    ProblemSolving --> AdminAPI

    style AdminDashboard fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style ContentManagement fill:#10b981,stroke:#059669,color:#fff
```

## 🔄 Data Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Website
    participant SharedHooks
    participant Database
    participant Supabase

    User->>Website: Access Page
    Website->>SharedHooks: useAuth()
    SharedHooks->>Database: getSession()
    Database->>Supabase: auth.getSession()
    Supabase-->>Database: Session Data
    Database-->>SharedHooks: User Session
    SharedHooks-->>Website: Auth State

    User->>Website: Select Learning Plan
    Website->>SharedHooks: useLearningPlans()
    SharedHooks->>Database: fetchPlans()
    Database->>Supabase: SELECT from plans
    Supabase-->>Database: Plans Data
    Database-->>SharedHooks: Plans Array
    SharedHooks-->>Website: Plans List

    User->>Website: Start Practice
    Website->>SharedHooks: useQuestions()
    SharedHooks->>Database: fetchQuestions()
    Database->>Supabase: SELECT from questions
    Supabase-->>Database: Questions Data
    Database-->>Website: Questions Array

    User->>Website: Submit Answer
    Website->>Database: saveProgress()
    Database->>Supabase: INSERT/UPDATE progress
    Supabase-->>Database: Success
    Database-->>Website: Progress Saved
```

## 🎯 Feature Modules

```mermaid
mindmap
  root((Elzatona Web))
    Guided Learning
      1-7 Day Plans
      Section-based Learning
      Progress Tracking
      Plan Templates
    Free Style Learning
      Custom Roadmap Builder
      Topic Selection
      Question Selection
      My Plans Management
    Practice Modes
      Guided Practice
      Free Style Practice
      Frontend Tasks
      Problem Solving
      Flashcards
    Content Management
      Questions CRUD
      Cards Management
      Topics & Categories
      Plans Configuration
    User Management
      Authentication
      User Profiles
      Progress Analytics
      Preferences
    Admin System
      Content Management
      User Administration
      System Logs
      Bulk Operations
```

## 🗄️ Database Schema Overview

```mermaid
erDiagram
    users ||--o{ plans : creates
    users ||--o{ progress : has
    users ||--o{ flashcards : creates

    plans ||--o{ plan_questions : contains
    plans ||--o{ sections : has

    cards ||--o{ categories : contains
    categories ||--o{ topics : contains
    topics ||--o{ questions : has

    questions ||--o{ plan_questions : used_in
    questions ||--o{ flashcards : converted_to

    users {
        string id PK
        string email
        string name
        timestamp created_at
    }

    plans {
        string id PK
        string user_id FK
        string name
        integer duration_days
        json configuration
    }

    questions {
        string id PK
        string topic_id FK
        string title
        text content
        string type
        string difficulty
        json options
    }

    cards {
        string id PK
        string name
        string slug
        string type
    }

    categories {
        string id PK
        string card_id FK
        string name
        string slug
    }

    topics {
        string id PK
        string category_id FK
        string name
        string slug
    }

    progress {
        string id PK
        string user_id FK
        string question_id FK
        boolean completed
        integer score
    }
```

## 🚀 Technology Stack

```mermaid
graph TB
    subgraph "Frontend"
        NextJS[Next.js 15]
        React[React 18]
        TypeScript[TypeScript]
        Tailwind[Tailwind CSS]
        RadixUI[Radix UI]
    end

    subgraph "State Management"
        Jotai[Jotai Atoms]
        ReactContext[React Context]
        TanStackQuery[TanStack Query]
    end

    subgraph "Backend"
        SupabaseDB[Supabase PostgreSQL]
        SupabaseAuth[Supabase Auth]
        NextAPIRoutes[Next.js API Routes]
    end

    subgraph "Build & Tools"
        Nx[Nx Monorepo]
        Vite[Vite]
        Webpack[Webpack]
        ESLint[ESLint]
        Prettier[Prettier]
    end

    subgraph "CI/CD"
        GitHubActions[GitHub Actions]
        Husky[Husky Hooks]
    end

    NextJS --> React
    NextJS --> TypeScript
    NextJS --> Tailwind
    React --> RadixUI
    React --> Jotai
    React --> ReactContext
    React --> TanStackQuery
    NextJS --> NextAPIRoutes
    NextAPIRoutes --> SupabaseDB
    NextAPIRoutes --> SupabaseAuth
    Nx --> NextJS
    Nx --> Vite
    GitHubActions --> Nx
    Husky --> GitHubActions

    style NextJS fill:#000,stroke:#fff,color:#fff
    style React fill:#61dafb,stroke:#20232a,color:#20232a
    style TypeScript fill:#3178c6,stroke:#fff,color:#fff
    style SupabaseDB fill:#3ecf8e,stroke:#24b47e,color:#fff
```

## 📦 Component Hierarchy

```mermaid
graph TD
    App[App Layout]
    App --> Navbar[Navbar Component]
    App --> MainContent[Main Content]

    MainContent --> Dashboard[Dashboard Page]
    MainContent --> GuidedLearning[Guided Learning Page]
    MainContent --> CustomRoadmap[Custom Roadmap Page]
    MainContent --> PracticePages[Practice Pages]

    Dashboard --> EnhancedDashboard[Enhanced Dashboard]
    EnhancedDashboard --> StatsCards[Stats Cards]
    EnhancedDashboard --> ActivityFeed[Activity Feed]
    EnhancedDashboard --> QuickActions[Quick Actions]

    CustomRoadmap --> PlanSummary[Plan Summary]
    CustomRoadmap --> CardSelector[Card Selector]
    CustomRoadmap --> QuestionReview[Question Review]

    PracticePages --> QuestionDisplay[Question Display]
    PracticePages --> AnswerInput[Answer Input]
    PracticePages --> ProgressTracker[Progress Tracker]

    Navbar --> UserMenu[User Menu]
    Navbar --> NavigationLinks[Navigation Links]

    style App fill:#3b82f6,stroke:#1e40af,color:#fff
    style Dashboard fill:#10b981,stroke:#059669,color:#fff
    style CustomRoadmap fill:#8b5cf6,stroke:#6d28d9,color:#fff
```
