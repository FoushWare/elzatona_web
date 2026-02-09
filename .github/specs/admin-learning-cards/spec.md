# Feature Specification: Learning Cards Admin

**Feature Branch**: `feature/admin-learning-cards`
**Created**: 2026-01-17
**Status**: Draft
**Input**: Standardizing and refactoring the Learning Cards management interface into the App Router.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Create and Manage Learning Cards (Priority: P1)

As an admin, I want to create, edit, and delete Learning Cards so that I can organize top-level content areas (e.g., Core Technologies, Frameworks).

**Why this priority**: Learning Cards are the root of the content hierarchy. Without them, categories and topics cannot be organized.

**Independent Test**: Can create a card with a title, description, color, and icon, and see it appear in the grid. Can delete the card and confirm it's removed.

**Acceptance Scenarios**:

1. **Given** I am on the Learning Cards Admin page, **When** I click "Create Card", **Then** a modal opens with fields for title, description, color, and icon.
2. **Given** I have filled in valid card details, **When** I click "Save", **Then** the card is persisted to Supabase and the UI updates.
3. **Given** an existing card, **When** I click "Edit", **Then** I can modify its properties and see changes reflected.

---

### User Story 2 - Nest Categories and Topics (Priority: P1)

As an admin, I want to view and manage the hierarchy of Categories and Topics within each Learning Card.

**Why this priority**: The primary value of the Learning Cards interface is its hierarchical view of content.

**Independent Test**: Can expand a card to see its categories and expand a category to see its topics.

**Acceptance Scenarios**:

1. **Given** a card with categories, **When** I toggle the expand icon, **Then** the list of categories is displayed.
2. **Given** a category with topics, **When** I toggle the expand icon, **Then** the list of topics is displayed.

---

### User Story 3 - Visual Consistency with Content Management (Priority: P2)

As an admin, I want the Learning Cards manager to be visually consistent with the main Content Management page.

**Why this priority**: Ensures a seamless experience for admins moving between different management tools.

**Independent Test**: UI matches the look and feel of `/admin/content-management`.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST support CRUD operations for `learning_cards` table in Supabase.
- **FR-002**: System MUST display nested Categories for each Card.
- **FR-003**: System MUST display nested Topics for each Category.
- **FR-004**: System MUST allow editing Card metadata (title, description, color, icon, order).
- **FR-005**: System MUST validate that titles and slugs are unique where required.

### Key Entities

- **Learning Card**: Top-level entity containing metadata and grouping categories.
- **Category**: Belongs to a Learning Card.
- **Topic**: Belongs to a Category.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Page load time for the Learning Cards list in under 800ms.
- **SC-002**: 100% data consistency between the UI and the database after mutations.
- **SC-003**: ZERO "any" types in the new implementation.
- **SC-004**: Unit test coverage for the `LearningCardsManager` logic ≥ 90%.
