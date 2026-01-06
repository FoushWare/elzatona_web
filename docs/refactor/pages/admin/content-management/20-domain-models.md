# 20 — Domain Models & Contracts

## Entities (expected)

- Learning Cards
- Learning Plans
- Categories
- Topics
- Questions
- Relations:
  - PlanCards
  - PlanQuestions

## Restore tasks

- [ ] Restore types/interfaces used by the page.
- [ ] Restore any enum-like constants (card types, statuses).

## Refactor tasks

- [ ] Separate:
  - Domain types (UI-independent)
  - DTOs (API payload shape)
  - View models (UI-ready)
- [ ] Add runtime guards only where needed (avoid over-validating).

## TDD tasks

- [ ] Unit test pure mapping functions (DTO -> view model).

## Test suite tasks

- [ ] Maintain fixtures aligned with these models.

## Missing parts checklist

- [ ] Any fields removed during Sonar/security fixes?
- [ ] Any nullable fields that must be handled safely?
