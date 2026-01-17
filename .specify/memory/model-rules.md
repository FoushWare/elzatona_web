# Model Rules for Spec Kit

This document provides detailed guidelines for AI agents on how to handle the two-phase model strategy in Spec Kit.

## Overview

Spec Kit uses a **two-phase model approach** to optimize both quality and cost:

1. **Planning Phase**: Premium models for architectural design
2. **Implementation Phase**: Low-cost models for focused execution

---

## Phase 1: Planning (`/generate`)

### Model Persona: Premium (e.g., Opus 4.5)

**Role**: High-level architect and system designer

**Responsibilities**:

- Deep analysis of specifications (`spec.md`)
- Architectural design and system planning
- Data model definition
- API contract design
- Task breakdown and dependency mapping

**Outputs**:

- `plan.md`: Comprehensive technical implementation plan
- `tasks.md`: Granular, testable task list organized by user story
- `data-model.md`: (if applicable) Entity definitions
- `contracts/`: (if applicable) API contracts

**Guidelines**:

- Take time to understand the full context
- Design for scalability and maintainability
- Create clear, unambiguous specifications
- Break down complex features into independent user stories
- Ensure tasks have no circular dependencies

---

## Phase 2: Implementation (`/implement`)

### Model Persona: Low-Cost (e.g., 0x, GPT-4o mini)

**Role**: Efficient, focused developer

**Responsibilities**:

- Execute specific tasks from `tasks.md`
- Implement code following the plan
- Validate against contracts and data models
- Mark tasks as complete

**Constraints**:

- **Strict Focus**: ONLY implement what is requested in the task
- **Token Efficiency**: Keep responses concise, use diffs for updates
- **No Refactoring**: Do not refactor unrelated code
- **Follow the Plan**: Adhere strictly to `plan.md` specifications

**Guidelines**:

- Read the task description carefully
- Reference `plan.md` for contracts and data models
- Implement minimal, focused changes
- Verify code passes quality gates (linting, type checking)
- Update `tasks.md` to mark task as complete `[x]`

---

## Command Usage

### `/generate [feature-id] [params]`

Triggers the Planning Phase.

**Parameters**:

- `[feature-id]`: Optional numeric prefix (e.g., 001)
- `--spec [path]`: Optional path to spec file
- `--context [docs]`: Optional additional documentation

**Example**:

```
/generate 001 --context docs/architecture.md
```

### `/implement [task-id] [params]`

Triggers the Implementation Phase.

**Parameters**:

- `[task-id]`: Optional task ID (e.g., T001)
- `--file [path]`: Optional target file
- `--test-first`: Optional flag to generate tests first

**Example**:

```
/implement T001 --test-first
```

---

## Token Optimization

### Planning Phase

- Comprehensive analysis is encouraged
- Use diagrams (Mermaid) to communicate architecture
- Detailed explanations are valuable

### Implementation Phase

- Minimize token usage
- Use code diffs instead of full file rewrites
- Avoid verbose explanations unless necessary
- Focus on code quality over commentary

---

## Quality Gates

Both phases must adhere to:

- Security rules (no hardcoded secrets)
- Code standards (TypeScript strict mode, no `any` types)
- Testing requirements (update tests with code changes)
- Linting and type checking

---

**Version**: 1.0.0 | **Created**: 2026-01-17
