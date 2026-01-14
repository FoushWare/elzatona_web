# Specification: Content Management Decomposition

## Overview

The goal is to dismantle the 2,132-line `ContentManagementPage` in `apps/admin/src/pages/admin/content-management/page.tsx` into a structured, maintainable set of components in `libs/common-ui`.

## Target Component Map

### Organisms (Move to `libs/common-ui/src/admin/content-management`)

#### 1. `LearningCardsManager`

- **Responsibility**: Rendering the grid of learning cards and managing card-level actions (Create/Edit/Delete).
- **Sub-components**: `LearningCardItem`.

#### 2. `PlansManager`

- **Responsibility**: Rendering the list of learning plans and managing plan-level actions.
- **Sub-components**: `PlanItem`, `PlanStructure` (nested view).

#### 3. `HierarchyManager`

- **Responsibility**: Rendering the nested tree of Categories -> Topics -> Questions.
- **Sub-components**: `CategoryItem`, `TopicItem`, `QuestionItem`.

### Molecules (Move to `libs/common-ui/src/admin/content-management/modals`)

#### 1. `PlanCardManagementModal`

- **Responsibility**: Interface to add/remove learning cards from a specific plan.

#### 2. `TopicQuestionsModal`

- **Responsibility**: Bulk-adding questions to a selected plan from a specific topic.

#### 3. `ConfirmDeleteModal`

- **Responsibility**: Standardized deletion confirmation.

## Logic Separation

- **Data Hook**: Move Supabase fetching logic to a custom hook (e.g., `useContentManagementData`) in `libs/hooks`.
- **State management**: Keep high-level UI toggles (expanded states) in the page component, but move granular item logic into the items themselves.

## Implementation Phases

1. **Phase A**: Move existing `StatsSection` and `SearchAndFilters` to `common-ui`.
2. **Phase B**: Extract `LearningCardsManager`.
3. **Phase C**: Extract `PlansManager`.
4. **Phase D**: Extract `HierarchyManager`.
5. **Phase E**: Final Page migration to App Router.
