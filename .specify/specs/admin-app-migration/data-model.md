# Admin/Website App Separation - Data Model

## Overview

This document defines the data structures and relationships relevant to the admin/website app separation migration.

---

## 1. Application Entities

### 1.1 App Configuration

```typescript
interface AppConfig {
  name: "admin" | "website";
  port: number;
  apiBaseUrl: string;
  authStrategy: "jwt" | "session";
  routes: RouteDefinition[];
}

interface RouteDefinition {
  path: string;
  handler: string;
  methods: ("GET" | "POST" | "PUT" | "DELETE")[];
  authentication: "required" | "optional" | "none";
  authorization?: string[]; // Required roles
}
```

### 1.2 Route Migration Entity

```typescript
interface RouteMigration {
  id: string;
  sourcePath: string;  // e.g., "apps/website/src/app/admin/content/"
  targetPath: string;  // e.g., "apps/admin/src/app/admin/content/"
  status: "pending" | "in-progress" | "completed" | "verified";
  priority: "critical" | "high" | "medium" | "low";
  
  // File tracking
  files: MigrationFile[];
  
  // Dependencies
  dependencies: string[];  // Lib dependencies
  localComponents: string[]; // Local component paths
  
  // Metadata
  createdAt: Date;
  completedAt?: Date;
  notes?: string;
}

interface MigrationFile {
  relativePath: string;
  sourceExists: boolean;
  targetExists: boolean;
  action: "copy" | "merge" | "delete" | "skip";
  status: "pending" | "completed";
}
```

### 1.3 Migration Progress Entity

```typescript
interface MigrationProgress {
  totalRoutes: number;
  completedRoutes: number;
  inProgressRoutes: number;
  pendingRoutes: number;
  
  phases: PhaseProgress[];
  
  estimatedCompletionTime: number; // hours
  actualTimeSpent: number; // hours
  
  lastUpdated: Date;
}

interface PhaseProgress {
  phase: number;
  name: string;
  status: "not-started" | "in-progress" | "completed";
  tasks: TaskProgress[];
}

interface TaskProgress {
  id: string;
  title: string;
  status: "not-started" | "in-progress" | "completed" | "blocked";
  assignee?: string;
  estimatedHours: number;
  actualHours?: number;
  blockedBy?: string[];
}
```

---

## 2. Shared Library Entities

### 2.1 Shared Component Registry

```typescript
interface SharedComponent {
  name: string;
  library: string;  // e.g., "@elzatona/common-ui"
  exportPath: string;  // e.g., "components/Button"
  usedInApps: ("admin" | "website")[];
  dependencies: string[];
}
```

### 2.2 Database Repository Entity

```typescript
interface RepositoryUsage {
  repository: string;  // e.g., "QuestionRepository"
  library: string;     // "@elzatona/database"
  usedInRoutes: string[];
  operations: ("create" | "read" | "update" | "delete")[];
}
```

---

## 3. Admin Routes Inventory

### 3.1 Route Status Matrix

| Route Path | Website Status | Admin Status | Migration Action |
|------------|---------------|--------------|-----------------|
| `/admin/content/` | EXISTS | EXISTS | VERIFY & DELETE FROM WEBSITE |
| `/admin/content-management/` | EXISTS | EXISTS | VERIFY & DELETE FROM WEBSITE |
| `/admin/frontend-tasks/` | EXISTS | EXISTS | VERIFY & DELETE FROM WEBSITE |
| `/admin/login/` | EXISTS | EXISTS | VERIFY & DELETE FROM WEBSITE |
| `/admin/problem-solving/` | EXISTS | EXISTS | VERIFY & DELETE FROM WEBSITE |
| `/admin/learning-cards/` | EXISTS | MISSING | COPY TO ADMIN |
| `/admin/logs/` | EXISTS | MISSING | COPY TO ADMIN |
| `/admin/questions/` | EXISTS | MISSING | REDIRECT OR REMOVE |
| `/admin/users/` | EXISTS | MISSING | COPY TO ADMIN |
| `/admin/dashboard/` | MISSING | EXISTS | ALREADY MIGRATED |

---

## 4. State Transitions

### 4.1 Route Migration State Machine

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────┐    ┌─────────────┐    ┌───────────┐          │
│  │ PENDING  │───▶│ IN_PROGRESS │───▶│ COMPLETED │          │
│  └──────────┘    └─────────────┘    └───────────┘          │
│       │                │                   │                │
│       │                │                   ▼                │
│       │                │            ┌───────────┐          │
│       │                └───────────▶│ VERIFIED  │          │
│       │                             └───────────┘          │
│       │                                   │                │
│       │                                   ▼                │
│       │                            ┌───────────┐           │
│       └───────────────────────────▶│  SKIPPED  │           │
│                                    └───────────┘           │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Migration Phase State Machine

```
Phase 0 (Research) ──▶ Phase 1 (Design) ──▶ Phase 2 (Migration)
                                                    │
                                                    ▼
Phase 5 (Docs) ◀── Phase 4 (Testing) ◀── Phase 3 (Cleanup)
```

---

## 5. Validation Rules

### 5.1 Route Migration Validation

```typescript
interface MigrationValidation {
  // Pre-migration checks
  sourceExists: boolean;
  targetPathValid: boolean;
  dependenciesResolved: boolean;
  
  // Post-migration checks
  targetFilesExist: boolean;
  importsValid: boolean;
  buildSucceeds: boolean;
  testsPass: boolean;
  
  // Final checks
  sourceDeleted: boolean;
  noOrphanedCode: boolean;
}
```

### 5.2 Validation Functions

```typescript
function validateMigration(route: RouteMigration): ValidationResult {
  const errors: string[] = [];
  
  // Check source exists
  if (!route.files.some(f => f.sourceExists)) {
    errors.push("Source route does not exist");
  }
  
  // Check all dependencies are in shared libs
  for (const dep of route.dependencies) {
    if (!isSharedLib(dep)) {
      errors.push(`Dependency ${dep} is not in a shared library`);
    }
  }
  
  // Check local components are handled
  for (const comp of route.localComponents) {
    if (!isInSharedLib(comp) && !isInTargetApp(comp)) {
      errors.push(`Local component ${comp} not migrated`);
    }
  }
  
  return { valid: errors.length === 0, errors };
}
```

---

## 6. Relationships

### 6.1 Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐
│    AppConfig    │       │  MigrationProgress │
└────────┬────────┘       └────────┬────────┘
         │                         │
         │ has many               │ has many
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│ RouteDefinition │◀─────▶│ RouteMigration  │
└────────┬────────┘       └────────┬────────┘
         │                         │
         │                         │ has many
         │                         ▼
         │                ┌─────────────────┐
         │                │  MigrationFile  │
         │                └─────────────────┘
         │
         │ uses
         ▼
┌─────────────────┐       ┌─────────────────┐
│ SharedComponent │◀─────▶│ RepositoryUsage │
└─────────────────┘       └─────────────────┘
```

---

## 7. API Endpoints Affected

### 7.1 Admin API Routes in Website App

| Endpoint | Method | Purpose | Migration Status |
|----------|--------|---------|-----------------|
| `/api/admin/create` | POST | Create admin user | DUPLICATE |
| `/api/admin/dashboard-stats` | GET | Dashboard statistics | VERIFY |
| `/api/admin/update-permissions` | POST | Update user perms | VERIFY |
| `/api/admin/questions/*` | ALL | Question CRUD | VERIFY |
| `/api/admin/users/*` | ALL | User management | VERIFY |

### 7.2 Required API Endpoints in Admin App

Each admin route requires corresponding API routes:

```typescript
interface RequiredApiRoutes {
  "/api/admin/auth": ["POST", "DELETE"];  // Login/logout
  "/api/admin/questions": ["GET", "POST", "PUT", "DELETE"];
  "/api/admin/users": ["GET", "POST", "PUT", "DELETE"];
  "/api/admin/learning-cards": ["GET", "POST", "PUT", "DELETE"];
  "/api/admin/logs": ["GET"];
  "/api/admin/stats": ["GET"];
}
```

---

## 8. File Structure After Migration

### 8.1 Target Admin App Structure

```
apps/admin/src/app/
├── admin/
│   ├── content/
│   │   ├── page.tsx
│   │   ├── questions/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── components/
│   ├── content-management/
│   │   ├── page.tsx
│   │   └── hooks/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── frontend-tasks/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── learning-cards/      # NEW - migrated
│   │   ├── page.tsx
│   │   └── components/
│   ├── login/
│   │   └── page.tsx
│   ├── logs/                # NEW - migrated
│   │   └── page.tsx
│   ├── problem-solving/
│   │   └── page.tsx
│   └── users/               # NEW - migrated
│       ├── page.tsx
│       └── components/
├── api/
│   └── admin/
│       ├── auth/
│       ├── questions/
│       ├── users/
│       └── ...
└── layout.tsx
```

### 8.2 Target Website App Structure (Post-Cleanup)

```
apps/website/src/app/
├── page.tsx                 # Home page
├── questions/               # Public question browser
├── learning-cards/          # Public learning cards
├── api/
│   └── public/             # Public APIs only
└── layout.tsx
```

---

**Data Model Version**: 1.0.0  
**Last Updated**: January 30, 2026  
**Status**: COMPLETE
