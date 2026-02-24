# Feature: Flashcards

## Overview

Flashcards allow users to review key concepts using a digital card-flip interface. Cards can be browsed by category/topic, marked as known or unknown, and studied in a looped session. This supports spaced-repetition learning patterns.

---

## User Flow

1. User navigates to `/flashcards`.
2. User selects a category or topic to filter cards.
3. A card deck is presented — front side shown first (question/term).
4. User clicks to flip the card and see the back (answer/explanation).
5. User marks the card as **Known** or **Needs Review**.
6. Session continues through all cards in the deck.
7. At the end, a session summary shows known vs. needs-review counts.
8. User can restart the session or return to the category list.

---

## Key Files

| File                                       | Purpose                                      |
| ------------------------------------------ | -------------------------------------------- |
| `apps/website/src/app/flashcards/`         | Flashcard main page and session UI           |
| `apps/website/src/app/api/flashcards/`     | API routes for flashcard data                |
| `libs/hooks/`                              | `useFlashcards` hook (if present)            |
| `libs/types/`                              | `FlashCard`, `LearningCard` type definitions |
| `apps/admin/src/app/admin/learning-cards/` | Admin UI to manage flashcard content         |

---

## API Endpoints

| Method | Route                      | Description                                                |
| ------ | -------------------------- | ---------------------------------------------------------- |
| `GET`  | `/api/flashcards`          | Get all flashcards (optionally filtered by topic/category) |
| `GET`  | `/api/flashcards/[id]`     | Get a specific flashcard                                   |
| `POST` | `/api/flashcards/progress` | Save known/unknown state for a card                        |

Full Swagger docs: `http://localhost:3000/api-docs` → Flashcards section.

---

## Test Scenarios

### Happy Path

1. **Card list loads** — `/flashcards` shows all available decks grouped by category.
2. **Card flip** — Clicking a card reveals the back side with the answer.
3. **Mark as known** — Marking a card as Known moves to the next card.
4. **Mark as needs review** — Card is flagged and re-queued at end of session.
5. **Session complete** — After last card, summary screen shows known/unknown breakdown.
6. **Restart session** — Clicking restart reshuffles and begins a new session.

### Edge Cases

7. **Empty deck** — If no cards exist for a topic, show an empty state (not an error).
8. **Single card deck** — Session ends immediately after one card.
9. **Rapid flipping** — Quickly flipping the same card multiple times doesn't cause UI glitch.
10. **Category filter** — Filtering by category shows only relevant cards.

### Error States

11. **API failure on load** — Error state shown with retry button, no raw error in console.
12. **Failed progress save** — Toast notification on failure; session can continue without crashing.
13. **Unauthenticated access** — Redirected to `/auth/login`.
