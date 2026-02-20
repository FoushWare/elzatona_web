# PR 5: Reduce Cognitive Complexity in API Routes (S3776)

**Branch**: `fix/sonar-complexity-api-routes`
**Priority**: 🟡 HIGH
**SonarQube Rule**: S3776 — Cognitive Complexity exceeds 15
**Estimated Time**: 3 hours (largest PR)

## Strategy

For each file, apply these refactoring patterns in order:

1. **Guard Clauses**: Replace nested `if-else` with early `return`
2. **Extract Method**: Move logic blocks into named helper functions
3. **Lookup Tables**: Replace `switch`/`if-else` chains with object maps
4. **Decompose Conditional**: Name complex boolean expressions

## Files (ordered by severity)

### 🔴 File 1: unified/route.ts (Score: 246 → target ≤15)

**Path**: `apps/website/src/app/lib/network/routes/questions/unified/route.ts`
**Functions**: Lines 310 (246!), 1207 (74), 184 (20), 43 (24)

This is the **worst offender**. The function at L310 has Cognitive Complexity of 246 — it needs to be decomposed into ~15-20 helper functions.

**Approach**:

1. Read the entire file to understand the overall structure
2. Identify the main function at L310 — it's likely a massive route handler
3. Extract each logical section into a named async function:
   - `validateRequest(req)` → input validation
   - `parseQueryParams(url)` → parameter extraction
   - `fetchQuestions(params)` → database query
   - `transformResponse(data)` → response formatting
   - `handlePagination(data, params)` → pagination logic
   - etc.
4. The main function should become a simple pipeline calling these helpers
5. Each helper should have Cognitive Complexity ≤ 15

### 🔴 File 2: unified/[id]/route.ts (Score: 82)

**Path**: `apps/website/src/app/lib/network/routes/questions/unified/[id]/route.ts`
**Function**: Line 68

Same approach as File 1 but smaller. Extract validation, fetching, and transformation into helpers.

### 🟡 File 3: plan-details/[planId]/route.ts (Scores: 41, 38, 16)

**Path**: `apps/website/src/app/lib/network/routes/guided-learning/plan-details/[planId]/route.ts`
**Functions**: Lines 6, 1207, 674

Extract plan detail processing stages into helpers.

### 🟡 File 4: plans/route.ts (Score: 48)

**Path**: `apps/website/src/app/lib/network/routes/guided-learning/plans/route.ts`
**Function**: Line 11

### 🟡 File 5: hierarchy/route.ts (Score: 38)

**Path**: `apps/website/src/app/lib/network/routes/plans/[id]/hierarchy/route.ts`
**Function**: Line 17

### 🟡 File 6: questions/route.ts (Scores: 37, 17)

**Path**: `apps/website/src/app/lib/network/routes/questions/route.ts`
**Functions**: Lines 5, 297

### 🟢 File 7: dashboard/stats/route.ts (Scores: 31, 29)

**Path**: `apps/website/src/app/lib/network/routes/dashboard/stats/route.ts`
**Functions**: Lines 12, 113

### 🟢 File 8: Other API routes (Scores: 16-22)

- `check-project/route.ts` L19 (22)
- `progress/save/route.ts` L37 (21)
- `progress/guided-learning/sync/route.ts` L21 (17)
- `topics/[id]/route.ts` L50 (16)

These only need minor refactoring — 1-2 guard clauses or one extracted helper each.

## Refactoring Example Template

```typescript
// BEFORE (Cognitive Complexity: 30+):
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const param1 = url.searchParams.get("param1");
  if (param1) {
    const data = await fetchData(param1);
    if (data) {
      if (data.type === "A") {
        // 20 lines of processing...
      } else if (data.type === "B") {
        // 20 lines of processing...
      } else {
        // 10 lines...
      }
    } else {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ error: "Missing param" }, { status: 400 });
  }
}

// AFTER (Cognitive Complexity: ~5):
function validateParams(url: URL) {
  const param1 = url.searchParams.get("param1");
  if (!param1) return { error: "Missing param", status: 400 };
  return { param1 };
}

const typeHandlers: Record<string, (data: Data) => Response> = {
  A: processTypeA,
  B: processTypeB,
};

function processTypeA(data: Data): ResponseData {
  /* ... */
}
function processTypeB(data: Data): ResponseData {
  /* ... */
}

export async function GET(req: NextRequest) {
  const params = validateParams(new URL(req.url));
  if ("error" in params)
    return NextResponse.json(params, { status: params.status });

  const data = await fetchData(params.param1);
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const handler = typeHandlers[data.type];
  if (!handler)
    return NextResponse.json({ error: "Unknown type" }, { status: 400 });

  return NextResponse.json(handler(data));
}
```

## Verification

```bash
npx nx run website:build
npx nx run website:test  # if tests exist for these routes
```

## Commit Strategy

Due to size, split into multiple commits within the same PR:

```bash
git commit -m "refactor(api): decompose unified/route.ts — reduce CC from 246 to ≤15"
git commit -m "refactor(api): decompose unified/[id]/route.ts — reduce CC from 82 to ≤15"
git commit -m "refactor(api): decompose plan-details route — reduce CC from 41 to ≤15"
git commit -m "refactor(api): reduce CC in remaining API routes"
```
