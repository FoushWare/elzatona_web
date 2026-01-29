# Frontend Task Detail Page - Implementation Guide

> **Target**: `/frontend-tasks/[id]` page implementation  
> **Priority**: High  
> **Estimated Lines**: ~500 (target <500)  
> **Components to Create**: 6

---

## Overview

This guide provides step-by-step implementation details for the Frontend Task Detail page (`/frontend-tasks/[id]`). A simpler model can follow these instructions to implement the feature.

---

## 1. Data Model Reference

### FrontendTask Type (from `@elzatona/types`)

```typescript
interface FrontendTask {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  estimatedTime: number; // minutes
  author: string;
  company?: string;
  requirements: string;
  hints: string[];
  solution: string;
  starterCode: string;
  files: FrontendTaskFile[];
  testCases?: FrontendTaskTestCase[];
  tags: string[];
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}

interface FrontendTaskFile {
  id: string;
  name: string;
  type: "tsx" | "ts" | "css" | "html" | "json" | "js";
  content: string;
  isEntryPoint?: boolean;
}

interface FrontendTaskTestCase {
  id: string;
  description: string;
  input: any;
  expectedOutput: any;
  type: "function" | "component" | "css" | "html";
  timeout?: number;
}
```

---

## 2. Component Architecture (Atomic Design)

### Component Breakdown

| Component | Type | Max Lines | Location |
|-----------|------|-----------|----------|
| `DifficultyBadge` | Atom | 30 | `libs/common-ui/src/atoms/` |
| `TaskMetadata` | Molecule | 80 | `libs/common-ui/src/molecules/` |
| `TaskDescription` | Molecule | 100 | `libs/common-ui/src/molecules/` |
| `CodeEditor` | Organism | 150 | `libs/common-ui/src/organisms/` |
| `TaskSidebar` | Organism | 150 | `libs/common-ui/src/organisms/` |
| `FrontendTaskDetailPage` | Page | 200 | `apps/website/src/app/frontend-tasks/[id]/` |

---

## 3. Implementation Steps

### Step 1: Create DifficultyBadge Atom

**File**: `libs/common-ui/src/atoms/DifficultyBadge.tsx`

```typescript
import React from "react";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";

interface DifficultyBadgeProps {
  difficulty: "easy" | "medium" | "hard";
  className?: string;
}

const difficultyStyles = {
  easy: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  hard: "bg-red-100 text-red-800 border-red-200",
};

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(difficultyStyles[difficulty], "capitalize", className)}
    >
      {difficulty}
    </Badge>
  );
}

export default DifficultyBadge;
```

**Export**: Add to `libs/common-ui/src/index.ts`:
```typescript
export { DifficultyBadge } from "./atoms/DifficultyBadge";
```

---

### Step 2: Create TaskMetadata Molecule

**File**: `libs/common-ui/src/molecules/TaskMetadata.tsx`

```typescript
import React from "react";
import { Clock, User, Building2, Tag } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { DifficultyBadge } from "../atoms/DifficultyBadge";

interface TaskMetadataProps {
  difficulty: "easy" | "medium" | "hard";
  estimatedTime: number;
  author: string;
  company?: string;
  category: string;
  tags: string[];
}

export function TaskMetadata({
  difficulty,
  estimatedTime,
  author,
  company,
  category,
  tags,
}: TaskMetadataProps) {
  return (
    <div className="space-y-4">
      {/* Difficulty and Time */}
      <div className="flex items-center gap-4">
        <DifficultyBadge difficulty={difficulty} />
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{estimatedTime} min</span>
        </div>
      </div>

      {/* Author and Company */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{author}</span>
        </div>
        {company && (
          <div className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            <span>{company}</span>
          </div>
        )}
      </div>

      {/* Category and Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="uppercase text-xs">
          {category}
        </Badge>
        {tags.slice(0, 5).map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default TaskMetadata;
```

**Export**: Add to `libs/common-ui/src/index.ts`:
```typescript
export { TaskMetadata } from "./molecules/TaskMetadata";
```

---

### Step 3: Create TaskDescription Molecule

**File**: `libs/common-ui/src/molecules/TaskDescription.tsx`

```typescript
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

interface TaskDescriptionProps {
  description: string;
  requirements: string;
  hints: string[];
}

export function TaskDescription({
  description,
  requirements,
  hints,
}: TaskDescriptionProps) {
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  const toggleHint = (index: number) => {
    setRevealedHints((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {description}
          </p>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              {requirements}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Hints */}
      {hints.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Hints ({hints.length})
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHints(!showHints)}
              >
                {showHints ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {showHints && (
            <CardContent>
              <div className="space-y-2">
                {hints.map((hint, index) => (
                  <div
                    key={index}
                    className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left"
                      onClick={() => toggleHint(index)}
                    >
                      {revealedHints.includes(index) ? (
                        <span>{hint}</span>
                      ) : (
                        <span className="text-yellow-600">
                          Click to reveal hint #{index + 1}
                        </span>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}

export default TaskDescription;
```

**Export**: Add to `libs/common-ui/src/index.ts`:
```typescript
export { TaskDescription } from "./molecules/TaskDescription";
```

---

### Step 4: Create TaskSidebar Organism

**File**: `libs/common-ui/src/organisms/TaskSidebar.tsx`

```typescript
import React from "react";
import { Play, RotateCcw, Eye, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import type { FrontendTaskFile } from "@elzatona/types";

interface TaskSidebarProps {
  files: FrontendTaskFile[];
  activeFileId: string;
  onFileSelect: (fileId: string) => void;
  onRun: () => void;
  onReset: () => void;
  onShowSolution: () => void;
  isRunning?: boolean;
}

export function TaskSidebar({
  files,
  activeFileId,
  onFileSelect,
  onRun,
  onReset,
  onShowSolution,
  isRunning = false,
}: TaskSidebarProps) {
  const getFileIcon = (type: string) => {
    const icons: Record<string, string> = {
      tsx: "⚛️",
      ts: "📘",
      js: "📙",
      css: "🎨",
      html: "📄",
      json: "📋",
    };
    return icons[type] || "📄";
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-4 space-y-2">
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={onRun}
            disabled={isRunning}
          >
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>
          <Button variant="outline" className="w-full" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Code
          </Button>
          <Button variant="ghost" className="w-full" onClick={onShowSolution}>
            <Eye className="h-4 w-4 mr-2" />
            Show Solution
          </Button>
        </CardContent>
      </Card>

      {/* File Explorer */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Files</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-1">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => onFileSelect(file.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                  activeFileId === file.id
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{getFileIcon(file.type)}</span>
                <span className="truncate">{file.name}</span>
                {file.isEntryPoint && (
                  <span className="ml-auto text-xs text-green-600">entry</span>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TaskSidebar;
```

**Export**: Add to `libs/common-ui/src/index.ts`:
```typescript
export { TaskSidebar } from "./organisms/TaskSidebar";
```

---

### Step 5: Create CodeEditor Organism (Wrapper)

**File**: `libs/common-ui/src/organisms/TaskCodeEditor.tsx`

```typescript
"use client";

import React, { useState, useCallback } from "react";
import { Card } from "../components/ui/card";
import type { FrontendTaskFile } from "@elzatona/types";

interface TaskCodeEditorProps {
  files: FrontendTaskFile[];
  activeFileId: string;
  onFileChange: (fileId: string, content: string) => void;
}

export function TaskCodeEditor({
  files,
  activeFileId,
  onFileChange,
}: TaskCodeEditorProps) {
  const activeFile = files.find((f) => f.id === activeFileId);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onFileChange(activeFileId, e.target.value);
    },
    [activeFileId, onFileChange]
  );

  if (!activeFile) {
    return (
      <Card className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a file to edit</p>
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-hidden">
      {/* File Tab */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b">
        <span className="text-sm font-medium">{activeFile.name}</span>
        <span className="text-xs text-gray-500 uppercase">{activeFile.type}</span>
      </div>
      
      {/* Editor Area */}
      <textarea
        value={activeFile.content}
        onChange={handleChange}
        className="w-full h-[calc(100%-40px)] p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 resize-none focus:outline-none"
        spellCheck={false}
      />
    </Card>
  );
}

export default TaskCodeEditor;
```

**Note**: For production, replace `<textarea>` with Monaco Editor or CodeMirror:
```typescript
// Future enhancement: Use @monaco-editor/react
// import Editor from "@monaco-editor/react";
```

**Export**: Add to `libs/common-ui/src/index.ts`:
```typescript
export { TaskCodeEditor } from "./organisms/TaskCodeEditor";
```

---

### Step 6: Create the Page Component

**File**: `apps/website/src/app/frontend-tasks/[id]/page.tsx`

```typescript
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Code } from "lucide-react";
import type { FrontendTask, FrontendTaskFile } from "@elzatona/types";
import {
  Button,
  TaskMetadata,
  TaskDescription,
  TaskSidebar,
  TaskCodeEditor,
  useToast,
} from "@elzatona/common-ui";

export default function FrontendTaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  
  const [task, setTask] = useState<FrontendTask | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState<FrontendTaskFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Fetch task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/frontend-tasks/${params.id}`);
        const data = await response.json();

        if (data.success && data.data) {
          setTask(data.data);
          setFiles(data.data.files || []);
          // Set first file as active
          if (data.data.files?.length > 0) {
            setActiveFileId(data.data.files[0].id);
          }
        } else {
          throw new Error(data.error || "Task not found");
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        showError("Error", "Failed to load task");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchTask();
    }
  }, [params.id, showError]);

  // Handle file content change
  const handleFileChange = useCallback((fileId: string, content: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, content } : f))
    );
  }, []);

  // Handle run code
  const handleRun = async () => {
    setIsRunning(true);
    try {
      // TODO: Implement code execution logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showSuccess("Success", "Code executed successfully!");
    } catch (error) {
      showError("Error", "Failed to run code");
    } finally {
      setIsRunning(false);
    }
  };

  // Handle reset code
  const handleReset = () => {
    if (task) {
      setFiles(task.files || []);
      showSuccess("Reset", "Code reset to original");
    }
  };

  // Handle show solution
  const handleShowSolution = () => {
    setShowSolution(!showSolution);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Task not found</p>
        <Button onClick={() => router.push("/frontend-tasks")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tasks
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Code className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {task.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Description */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <TaskMetadata
              difficulty={task.difficulty}
              estimatedTime={task.estimatedTime}
              author={task.author}
              company={task.company}
              category={task.category}
              tags={task.tags}
            />
            <TaskDescription
              description={task.description}
              requirements={task.requirements}
              hints={task.hints}
            />
          </div>

          {/* Center Panel - Code Editor */}
          <div className="col-span-12 lg:col-span-5 h-[600px]">
            <TaskCodeEditor
              files={showSolution ? [{ id: "solution", name: "solution.tsx", type: "tsx", content: task.solution }] : files}
              activeFileId={showSolution ? "solution" : activeFileId}
              onFileChange={handleFileChange}
            />
          </div>

          {/* Right Panel - Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <TaskSidebar
              files={files}
              activeFileId={activeFileId}
              onFileSelect={setActiveFileId}
              onRun={handleRun}
              onReset={handleReset}
              onShowSolution={handleShowSolution}
              isRunning={isRunning}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### Step 7: Create API Route (if not exists)

**File**: `apps/website/src/app/api/frontend-tasks/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@elzatona/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDatabase();
    const repository = db.getFrontendTaskRepository();
    const task = await repository.findById(params.id);

    if (!task) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    console.error("Error fetching frontend task:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## 4. Export Updates

### Update `libs/common-ui/src/index.ts`

Add these exports at the appropriate locations:

```typescript
// Atoms
export { DifficultyBadge } from "./atoms/DifficultyBadge";

// Molecules
export { TaskMetadata } from "./molecules/TaskMetadata";
export { TaskDescription } from "./molecules/TaskDescription";

// Organisms
export { TaskSidebar } from "./organisms/TaskSidebar";
export { TaskCodeEditor } from "./organisms/TaskCodeEditor";
```

---

## 5. Quality Checklist

Before merging, verify:

- [ ] All components are under their line limits
- [ ] No `any` types (except where inherited from FrontendTaskTestCase)
- [ ] All props are properly typed
- [ ] Components follow atomic design pattern
- [ ] Imports are organized per manifest standards
- [ ] Dark mode support included
- [ ] Responsive design (mobile-first)
- [ ] Accessibility attributes present
- [ ] Error states handled
- [ ] Loading states handled

---

## 6. Testing Requirements

### Unit Tests to Create

1. `DifficultyBadge.test.tsx` - Test all difficulty variants
2. `TaskMetadata.test.tsx` - Test with/without optional props
3. `TaskDescription.test.tsx` - Test hint reveal logic
4. `TaskSidebar.test.tsx` - Test file selection and actions
5. `TaskCodeEditor.test.tsx` - Test file switching and editing

### Integration Tests

1. Page loads task data correctly
2. File editing updates state
3. Reset restores original content
4. Solution toggle works

---

## 7. File Creation Order

Execute in this order:

1. `libs/common-ui/src/atoms/DifficultyBadge.tsx`
2. `libs/common-ui/src/molecules/TaskMetadata.tsx`
3. `libs/common-ui/src/molecules/TaskDescription.tsx`
4. `libs/common-ui/src/organisms/TaskSidebar.tsx`
5. `libs/common-ui/src/organisms/TaskCodeEditor.tsx`
6. Update `libs/common-ui/src/index.ts` with exports
7. `apps/website/src/app/api/frontend-tasks/[id]/route.ts`
8. `apps/website/src/app/frontend-tasks/[id]/page.tsx`

---

## 8. Commands to Run After Implementation

```bash
# Format code
npm run format

# Lint check
npm run lint

# Type check
npm run type-check

# Run tests
npm run test -- --testPathPattern="frontend-task"

# Build to verify
npm run build
```

---

**End of Implementation Guide**
