# Test Design: Admin Content Schema and NotebookLM Seeding

## Scope

Validate schema correctness, transform quality, and seed runtime behavior for admin content entities and relations.

## Test Layers

1. Unit tests

- transform function: NotebookLM output -> seeder schema
- slug normalization and deduplication
- learning mode mapping to metadata/tags

2. Integration tests

- seeder upserts categories/topics
- seeder inserts questions with FK references
- rerun idempotency for lookup entities

3. API/runtime validation

- GET questions endpoint returns seeded records
- admin content pages load seeded counts
- no schema mismatch errors in server logs

## Core Test Scenarios

1. Minimal valid question import

- Input has required fields only
- Expected: one question inserted with defaults

2. Rich question import with resources and code

- Input includes resources and multiline code
- Expected: resources persisted, code newlines preserved

3. Unknown category slug

- Input references unknown cat_slug
- Expected: deterministic failure with clear error

4. Unknown topic slug

- Input references unknown topic_slug
- Expected: deterministic failure with clear error

5. Multi-mode targeting

- Input includes guided/free-style/custom
- Expected: metadata and tags preserved exactly

6. Duplicate category/topic slugs

- Input repeats slugs
- Expected: upsert result has single row per slug

7. Large import batch

- Input with 500+ questions
- Expected: predictable completion and error summary

8. Guided relation assignment

- Post-seed plan_questions insert
- Expected: guided plans return assigned questions

## Manual Verification Checklist

- Open admin questions page and confirm records appear.
- Filter by category and topic and verify counts.
- Open content-management page and confirm category/topic data integrity.
- Verify at least one question for each mode: guided, free-style, custom.

## Exit Criteria

- All integration checks pass on local environment.
- No blocking FK or type errors during seed run.
- Admin pages display seeded data without load-failure toast.
