# Elzatona Web - Complete Project Flow Diagram

## 🎯 Complete System Flow: Admin & Website (Guided, Free-Style, Custom Roadmap)

### 📸 Diagram Images

- **PNG Version**: [project-flow-diagram.png](./project-flow-diagram.png) (299KB)
- **SVG Version**: [project-flow-diagram.svg](./project-flow-diagram.svg) (192KB - Recommended for documentation)

![Project Flow Diagram](./project-flow-diagram.png)

### 📝 Mermaid Source

```mermaid
flowchart TB
    Start([User/Admin Starts])

    %% Authentication Decision
    Start --> AuthCheck{Authenticated?}
    AuthCheck -->|No| SignIn[Sign In / Sign Up]
    AuthCheck -->|Yes| UserType{User Type?}
    SignIn --> UserType

    %% Admin Flow
    UserType -->|Admin| AdminLogin[Admin Login Page]
    AdminLogin --> AdminDashboard[Admin Dashboard]

    subgraph AdminFlow["🔧 Admin Management System"]
        direction TB
        AdminDashboard --> AdminGuidedLearning[Guided Learning<br/>Plan Management]
        AdminDashboard --> AdminQuestions[Questions Management]
        AdminDashboard --> AdminSections[Sections Management]
        AdminDashboard --> AdminCards[Learning Cards<br/>Management]
        AdminDashboard --> AdminFrontendTasks[Frontend Tasks<br/>Management]
        AdminDashboard --> AdminProblemSolving[Problem Solving<br/>Management]

        AdminGuidedLearning --> CreatePlan[Create/Edit Plans<br/>1-7 Days]
        CreatePlan --> ConfigureCards[Configure Learning Cards<br/>per Plan]
        ConfigureCards --> SetQuestionCounts[Set Question Counts<br/>per Section/Card]
        SetQuestionCounts --> AssignQuestions[Assign Questions<br/>to Plans]
        AssignQuestions --> SavePlan[Save Plan<br/>to Database]

        AdminQuestions --> CRUDQuestions[Create/Edit/Delete<br/>Questions]
        CRUDQuestions --> AssignToTopics[Assign to Topics<br/>& Categories]
        AssignToTopics --> SetDifficulty[Set Difficulty<br/>& Metadata]

        AdminSections --> CRUDSections[Manage Sections<br/>HTML, CSS, JS, etc.]
        CRUDSections --> ManageTopics[Manage Topics<br/>within Sections]

        AdminCards --> CRUDCards[Manage Learning Cards<br/>Core Tech, Framework, etc.]
        CRUDCards --> ConfigureCardSettings[Configure Card Settings<br/>Time Limits, Difficulty]
    end

    SavePlan --> SupabaseDB[(Supabase Database)]
    CRUDQuestions --> SupabaseDB
    CRUDSections --> SupabaseDB
    CRUDCards --> SupabaseDB

    %% Website User Flow
    UserType -->|User| HomePage[Home Page]
    HomePage --> GetStarted[Get Started Page]

    GetStarted --> LearningChoice{Learning<br/>Preference?}

    %% Guided Learning Flow
    LearningChoice -->|I need guidance| GuidedAuth{Authenticated?}
    GuidedAuth -->|No| GuidedSignIn[Sign In Popup]
    GuidedAuth -->|Yes| GuidedLearning[Guided Learning Page]
    GuidedSignIn --> GuidedLearning

    subgraph GuidedFlow["📚 Guided Learning Flow"]
        direction TB
        GuidedLearning --> SelectPlan[Select Plan<br/>1-7 Days]
        SelectPlan --> ViewPlanDetails[View Plan Details<br/>Cards & Questions]
        ViewPlanDetails --> StartGuidedPractice[Start Guided Practice]

        StartGuidedPractice --> PracticeCard1[Practice Card 1<br/>Core Technologies]
        StartGuidedPractice --> PracticeCard2[Practice Card 2<br/>Framework Questions]
        StartGuidedPractice --> PracticeCard3[Practice Card 3<br/>Problem Solving]
        StartGuidedPractice --> PracticeCard4[Practice Card 4<br/>System Design]

        PracticeCard1 --> AnswerQuestions[Answer Questions]
        PracticeCard2 --> AnswerQuestions
        PracticeCard3 --> AnswerQuestions
        PracticeCard4 --> AnswerQuestions

        AnswerQuestions --> TrackProgress[Track Progress]
        TrackProgress --> CompletePlan[Complete Plan]
        CompletePlan --> ViewResults[View Results<br/>& Analytics]
    end

    %% Free-Style Learning Flow
    LearningChoice -->|I'm self-directed| BrowsePractice[Browse Practice<br/>Questions Page]

    subgraph FreeStyleFlow["🎯 Free-Style Learning Flow"]
        direction TB
        BrowsePractice --> PracticeOption{Practice<br/>Option?}

        PracticeOption -->|Interview Questions| LearningPaths[Learning Paths<br/>Practice Mode]
        PracticeOption -->|Frontend Tasks| FrontendTasks[Frontend Tasks<br/>Practice Mode]
        PracticeOption -->|Problem Solving| ProblemSolving[Problem Solving<br/>Practice Mode]
        PracticeOption -->|Create Custom Roadmap| CustomRoadmapBuilder[Custom Roadmap<br/>Builder]

        LearningPaths --> FreeStylePractice[Free Style Practice<br/>Session]
        FrontendTasks --> FreeStylePractice
        ProblemSolving --> FreeStylePractice

        FreeStylePractice --> SelectTopics[Select Topics<br/>Freely]
        SelectTopics --> PracticeQuestions[Practice Questions<br/>at Own Pace]
        PracticeQuestions --> SaveProgress[Save Progress]
    end

    %% Custom Roadmap Flow
    subgraph CustomRoadmapFlow["🗺️ Custom Roadmap Flow"]
        direction TB
        CustomRoadmapBuilder --> SelectCards[Select Learning Cards<br/>Core Tech, Framework, etc.]
        SelectCards --> SelectCategories[Select Categories<br/>within Cards]
        SelectCategories --> SelectTopics[Select Topics<br/>within Categories]
        SelectTopics --> SelectQuestions[Select Questions<br/>3-5 or All per Topic]

        SelectQuestions --> SetDuration[Set Duration<br/>1-N Days]
        SetDuration --> ReviewPlan[Review Custom Plan<br/>Summary]
        ReviewPlan --> SaveCustomPlan[Save Custom Plan<br/>to My Plans]

        SaveCustomPlan --> MyPlans[My Plans Page]
        MyPlans --> ViewSavedPlans[View Saved Plans]
        ViewSavedPlans --> EditPlan[Edit Plan]
        ViewSavedPlans --> StartCustomPlan[Start Custom Plan]
        EditPlan --> CustomRoadmapBuilder
        StartCustomPlan --> CustomPractice[Practice Custom Plan<br/>Questions]
    end

    %% Data Flow
    GuidedLearning --> FetchPlans[Fetch Plans<br/>from Database]
    SelectPlan --> FetchQuestions[Fetch Questions<br/>for Plan]
    CustomRoadmapBuilder --> FetchAllContent[Fetch All Cards<br/>Categories & Topics]

    FetchPlans --> SupabaseDB
    FetchQuestions --> SupabaseDB
    FetchAllContent --> SupabaseDB
    SaveCustomPlan --> SupabaseDB
    SaveProgress --> SupabaseDB
    TrackProgress --> SupabaseDB

    %% Styling
    classDef adminStyle fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:#fff
    classDef guidedStyle fill:#3b82f6,stroke:#1e40af,stroke-width:2px,color:#fff
    classDef freeStyleStyle fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    classDef customRoadmapStyle fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    classDef databaseStyle fill:#3ecf8e,stroke:#24b47e,stroke-width:3px,color:#fff

    class AdminLogin,AdminDashboard,AdminGuidedLearning,AdminQuestions,AdminSections,AdminCards,CreatePlan,ConfigureCards,SetQuestionCounts,AssignQuestions,SavePlan,CRUDQuestions,CRUDSections,CRUDCards adminStyle
    class GuidedLearning,SelectPlan,ViewPlanDetails,StartGuidedPractice,PracticeCard1,PracticeCard2,PracticeCard3,PracticeCard4,AnswerQuestions,TrackProgress,CompletePlan,ViewResults guidedStyle
    class BrowsePractice,LearningPaths,FrontendTasks,ProblemSolving,FreeStylePractice,SelectTopics,PracticeQuestions,SaveProgress freeStyleStyle
    class CustomRoadmapBuilder,SelectCards,SelectCategories,SelectTopics,SelectQuestions,SetDuration,ReviewPlan,SaveCustomPlan,MyPlans,ViewSavedPlans,EditPlan,StartCustomPlan,CustomPractice customRoadmapStyle
    class SupabaseDB databaseStyle
```

## 📊 Flow Summary

### 🔧 Admin Flow

1. **Admin Login** → Dashboard
2. **Content Management**:
   - Create/Edit Guided Learning Plans (1-7 days)
   - Manage Questions, Sections, Topics
   - Configure Learning Cards
   - Set question counts and distributions
3. **Data Persistence** → All changes saved to Supabase Database

### 📚 Guided Learning Flow

1. **User Selection** → "I need guidance" → Sign In
2. **Plan Selection** → Choose from 1-7 day plans
3. **Practice** → Four learning cards:
   - Core Technologies (HTML, CSS, JS, TS)
   - Framework Questions (React, Next.js, etc.)
   - Problem Solving
   - System Design
4. **Progress Tracking** → Real-time progress saved to database

### 🎯 Free-Style Learning Flow

1. **User Selection** → "I'm self-directed" → Browse Practice Questions
2. **Practice Options**:
   - Interview Questions (Learning Paths)
   - Frontend Tasks
   - Problem Solving
   - Create Custom Roadmap
3. **Flexible Practice** → Select topics and practice at own pace

### 🗺️ Custom Roadmap Flow

1. **Roadmap Builder** → Select Cards → Categories → Topics → Questions
2. **Configuration** → Set duration (1-N days), select 3-5 or all questions per topic
3. **Save & Manage** → Save to "My Plans", view/edit/start saved plans
4. **Practice** → Follow custom plan with selected questions

## 🔄 Key Features

- **Admin**: Full CRUD operations for all content types
- **Guided**: Structured 1-7 day plans with cumulative questions
- **Free-Style**: Flexible topic selection and practice
- **Custom Roadmap**: User-created personalized learning paths
- **Progress Tracking**: All modes track and save user progress
- **Database**: Centralized Supabase storage for all data
