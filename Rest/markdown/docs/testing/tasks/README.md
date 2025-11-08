# Testing Tasks Directory

This directory contains individual test task files, each representing a specific test scenario broken down into:
- **Manual Testing Steps**: Step-by-step instructions for manual testing
- **Automated Test Checks**: Unit, Integration, and E2E test specifications

## Directory Structure

```
tasks/
├── guided-flow/          # Guided learning flow tests
├── freestyle-flow/       # Freestyle learning flow tests
├── shared-components/    # Shared component tests
└── admin/               # Admin functionality tests
```

## Task File Format

Each task file follows this structure:

```markdown
# Task: [Task Name]

## Overview
Brief description of what this task tests

## Manual Testing Steps
1. Step 1
2. Step 2
...

## Automated Tests

### Unit Tests
- Test ID: Description
  - Assertions: ...

### Integration Tests
- Test ID: Description
  - Assertions: ...

### E2E Tests
- Test ID: Description
  - Steps: ...
```

## Test Execution

Tests are designed to run in parallel for GitHub Actions. Each task file can be executed independently.

## Status Tracking

- ✅ Implemented
- ⏳ Pending
- 🔄 In Progress
- ❌ Failing
- ⏸️ Skipped

