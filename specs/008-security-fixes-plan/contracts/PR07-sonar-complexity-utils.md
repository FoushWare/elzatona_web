# PR 7: Reduce Cognitive Complexity in Utility Files (S3776)

**Branch**: `fix/sonar-complexity-utils`
**Priority**: 🟡 MEDIUM
**SonarQube Rule**: S3776

## Files & Fixes

### File 1: markdown-question-parser.ts (Score: 71)

**Path**: `apps/website/src/app/lib/markdown-question-parser.ts` (Line 137)

**Approach**: The parser likely has a giant function that processes markdown in one pass. Decompose into parsing stages:

```typescript
// Extract each stage:
function parseMetadata(content: string): Metadata {
  /* ... */
}
function parseQuestionBlocks(content: string): QuestionBlock[] {
  /* ... */
}
function parseAnswerOptions(block: QuestionBlock): Answer[] {
  /* ... */
}
function validateParsedQuestion(q: ParsedQuestion): ValidationResult {
  /* ... */
}

// Main function becomes a pipeline:
export function parseMarkdownQuestions(content: string) {
  const metadata = parseMetadata(content);
  const blocks = parseQuestionBlocks(content);
  return blocks.map((block) => ({
    ...metadata,
    answers: parseAnswerOptions(block),
  }));
}
```

### File 2: validation.ts (Scores: 51, 16)

**Path**: `apps/website/utilities/validation.ts` (Line 282) AND  
**Path**: `apps/website/src/app/lib/validation.ts` (Line 339)

**Approach**: Extract individual validators into separate functions. Use a validation registry pattern:

```typescript
const validators: Record<string, (value: unknown) => ValidationResult> = {
  email: validateEmail,
  password: validatePassword,
  username: validateUsername,
  // etc.
};

export function validate(field: string, value: unknown): ValidationResult {
  const validator = validators[field];
  if (!validator) return { valid: true };
  return validator(value);
}
```

### File 3: sanitize-server.ts (Score: 16)

**Path**: `apps/website/utilities/sanitize-server.ts` (Line 121)

Minor — one guard clause extraction should bring it under 15.

### File 4: test-env-loader.ts (Score: 26)

**Path**: `apps/website/src/app/lib/test-env-loader.ts` (Line 26)

Extract environment variable loading into separate named functions per source.

### File 5: sync-progress-on-login.ts (Score: 22)

**Path**: `apps/website/src/app/lib/sync-progress-on-login.ts` (Line 36)

Extract sync steps into named functions:

```typescript
async function fetchLocalProgress(): Promise<Progress> {
  /* ... */
}
async function fetchRemoteProgress(): Promise<Progress> {
  /* ... */
}
async function mergeProgress(
  local: Progress,
  remote: Progress,
): Promise<Progress> {
  /* ... */
}
async function saveProgress(merged: Progress): Promise<void> {
  /* ... */
}
```

### File 6: frontend-task-validator.ts (Score: 27)

**Path**: `apps/website/src/app/lib/frontend-task-validator.ts` (Line 264)

Extract validation rules into a lookup table.

### File 7: Test Utils (Scores: 17, 16) — LOW PRIORITY

**Path**: `tests/utils/jest-mock-msw.js` (Line 10)
**Path**: `tests/utils/node-fetch-mock.js` (Line 2)

These are test utilities — fix if time permits. Extract mock setup logic.

## Commit

```bash
git commit -m "refactor(utils): reduce cognitive complexity in utility files (S3776)"
```
