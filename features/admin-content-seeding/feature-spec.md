# Feature: Admin Content Schema and NotebookLM Seeding

## Overview

This feature defines a stable data model and import workflow for admin content:

- Questions
- Learning cards
- Topics
- Categories
- Learning plans
- Plan-question and topic-question relations

It is designed to let NotebookLM output structured content that can be transformed into project seed data safely and repeatably.

The schema supports these learner modes:

- guided
- free-style
- custom

## User Flow

1. Admin gathers study resources in NotebookLM.
2. NotebookLM exports structured question payloads.
3. Admin maps the export into seeding JSON format.
4. Seeder upserts categories and topics.
5. Seeder inserts questions linked to category/topic.
6. Admin validates data in admin content pages.

## Source of Truth Files

| Path                                                                        | Purpose                                                  |
| --------------------------------------------------------------------------- | -------------------------------------------------------- |
| `docs/database/questions-schema.md`                                         | Questions table shape and JSON fields                    |
| `libs/utilities/src/lib/api/questions-handler.ts`                           | Accepted question payload fields and normalization rules |
| `libs/database/src/adapters/postgresql/PostgreSQLQuestionRepository.ts`     | Question repository mapping                              |
| `libs/database/src/adapters/postgresql/PostgreSQLLearningCardRepository.ts` | Learning card repository mapping                         |
| `libs/database/src/adapters/postgresql/PostgreSQLPlanRepository.ts`         | Learning plan repository mapping                         |
| `apps/website/src/app/lib/network/routes/plans/[id]/questions/route.ts`     | plan_questions relation behavior                         |
| `apps/website/src/app/lib/network/routes/topics/[id]/questions/route.ts`    | questions_topics relation behavior                       |
| `apps/website/src/app/lib/network/routes/cards/[id]/categories/route.ts`    | card_categories relation behavior                        |
| `tools/seed/seed-all.mjs`                                                   | Existing seed runner                                     |

## Core Tables and Relations

- categories (1) -> (N) topics
- categories (1) -> (N) questions via questions.category_id
- topics (1) -> (N) questions via questions.topic_id
- learning_cards (1) -> (N) questions via questions.learning_card_id (optional)
- learning_plans (N) <-> (N) questions via plan_questions
- topics (N) <-> (N) questions via questions_topics
- learning_cards (N) <-> (N) categories via card_categories

## Required Question Fields for Seeding

- title
- content
- type
- difficulty
- cat_slug (mapped to categories.id)
- topic_slug (mapped to topics.id)

## Optional Question Fields

- points
- options
- correct_answer
- explanation
- hints
- tags
- resources
- metadata
- code

## Learning Mode Coverage

Questions should include learning mode targeting through one of these patterns:

1. `metadata.learning_modes: ["guided", "free-style", "custom"]`
2. `tags` including `guided`, `free-style`, `custom`
3. plan_questions assignment for guided mode

## Acceptance Scenarios

1. NotebookLM export can be transformed to seeding JSON without manual DB edits.
2. Category/topic lookups are deterministic using slugs.
3. Inserted questions render in admin questions and content-management pages.
4. Guided mode questions can be assigned to plans through plan_questions.
5. Free-style and custom questions are discoverable through tags/metadata.
6. Re-seeding does not duplicate categories/topics when slug conflicts are present.
