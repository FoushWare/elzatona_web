# TDD: Admin - Learning Cards

## Components and Data Flow

- Route: /admin/learning-cards
- UI layer uses modal-based create/edit and confirmation-based delete
- Data access uses admin API routes and repository-backed adapters

## Core Contracts

- Create payload includes content fields and classification fields
- Update payload supports partial edits by id
- Delete operation is id-based and returns success status
- Initial data load uses internal admin API endpoints and supports partial-success payload handling

## Non-Functional Requirements

- Fast list rendering for medium datasets
- Error feedback for failed API requests
- Strict typing for card payloads and modal forms
- Network failure tolerance for initial page load (`TypeError: Failed to fetch`)

## Technical Acceptance

1. CRUD operations maintain list consistency without manual refresh.
2. Search/filter state is preserved while opening and closing modals.
3. Error responses do not lose unsaved user input in open forms.
4. Initial data loading does not rely on direct browser Supabase calls.
