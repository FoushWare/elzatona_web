- Picking up a feature to work on
- Writing or updating tests (BDD/TDD)
- Reviewing a PR that touches a feature

## Structure per Feature

Each feature directory contains four key documents:

1. **`feature-spec.md`**: Business requirements, overview, and user flows.
2. **`feature-BDD.md`**: Behavior-Driven Development scenarios (Given/When/Then).
3. **`feature-TDD.md`**: Technical Design Document (APIs, DB, Architecture).
4. **`test-design.md`**: Detailed test strategy and mapping to automated tests.

---

## Feature Index

| Feature                                                                  | Description                           | Owner Area                                    |
| ------------------------------------------------------------------------ | ------------------------------------- | --------------------------------------------- |
| [Authentication](./authentication/feature-spec.md)                       | Login, logout, session management     | `apps/website`, `libs/auth`                   |
| [Guided Practice](./guided-practice/feature-spec.md)                     | Guided learning plans & sections      | `apps/website/src/app/guided-practice`        |
| [Flashcards](./flashcards/feature-spec.md)                               | Flashcard review & spaced repetition  | `apps/website/src/app/flashcards`             |
| [Learning Paths](./learning-paths/feature-spec.md)                       | Structured learning paths             | `apps/website/src/app/learning-paths`         |
| [Custom Roadmap](./custom-roadmap/feature-spec.md)                       | User-defined custom roadmaps          | `apps/website/src/app/custom-roadmap`         |
| [Free-Style Practice](./free-style-practice/feature-spec.md)             | Unstructured practice mode            | `apps/website/src/app/free-style`             |
| [Problem Solving](./problem-solving/feature-spec.md)                     | Algorithmic problem-solving questions | `apps/website/src/app/problem-solving`        |
| [Frontend Tasks](./frontend-tasks/feature-spec.md)                       | Frontend coding challenges            | `apps/website/src/app/frontend-tasks`         |
| [Dashboard](./dashboard/feature-spec.md)                                 | User progress and stats dashboard     | `apps/website/src/app/dashboard`              |
| [Settings](./settings/feature-spec.md)                                   | User account & preference settings    | `apps/website/src/app/settings`               |
| [Admin – Content Management](./admin-content-management/feature-spec.md) | Admin CRUD for content                | `apps/admin/src/app/admin/content-management` |
| [Admin – Learning Cards](./admin-learning-cards/feature-spec.md)         | Admin learning card management        | `apps/admin/src/app/admin/learning-cards`     |
| [Admin – Users](./admin-users/feature-spec.md)                           | Admin user management                 | `apps/admin/src/app/admin/users`              |

---

## How to Add a New Feature Doc

1. Copy the template structure from any existing file in this directory.
2. Fill in **Overview**, **User Flow**, **Key Files**, **API Endpoints**, and **Test Scenarios**.
3. Add a row to the table above.
4. Link it from `README.md` in the repo root under the **Features** section.
