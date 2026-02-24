# Features

This directory documents each product feature of **Elzatona** — its purpose, user flow, code locations, APIs, and test scenarios.

Use these docs when:

- Picking up a feature to work on
- Writing or updating tests
- Reviewing a PR that touches a feature

---

## Feature Index

| Feature                                                     | Description                           | Owner Area                                    |
| ----------------------------------------------------------- | ------------------------------------- | --------------------------------------------- |
| [Authentication](./authentication.md)                       | Login, logout, session management     | `apps/website`, `libs/auth`                   |
| [Guided Practice](./guided-practice.md)                     | Guided learning plans & sections      | `apps/website/src/app/guided-practice`        |
| [Flashcards](./flashcards.md)                               | Flashcard review & spaced repetition  | `apps/website/src/app/flashcards`             |
| [Learning Paths](./learning-paths.md)                       | Structured learning paths             | `apps/website/src/app/learning-paths`         |
| [Custom Roadmap](./custom-roadmap.md)                       | User-defined custom roadmaps          | `apps/website/src/app/custom-roadmap`         |
| [Free-Style Practice](./free-style-practice.md)             | Unstructured practice mode            | `apps/website/src/app/free-style`             |
| [Problem Solving](./problem-solving.md)                     | Algorithmic problem-solving questions | `apps/website/src/app/problem-solving`        |
| [Frontend Tasks](./frontend-tasks.md)                       | Frontend coding challenges            | `apps/website/src/app/frontend-tasks`         |
| [Dashboard](./dashboard.md)                                 | User progress and stats dashboard     | `apps/website/src/app/dashboard`              |
| [Settings](./settings.md)                                   | User account & preference settings    | `apps/website/src/app/settings`               |
| [Admin – Content Management](./admin-content-management.md) | Admin CRUD for content                | `apps/admin/src/app/admin/content-management` |
| [Admin – Learning Cards](./admin-learning-cards.md)         | Admin learning card management        | `apps/admin/src/app/admin/learning-cards`     |
| [Admin – Users](./admin-users.md)                           | Admin user management                 | `apps/admin/src/app/admin/users`              |

---

## How to Add a New Feature Doc

1. Copy the template structure from any existing file in this directory.
2. Fill in **Overview**, **User Flow**, **Key Files**, **API Endpoints**, and **Test Scenarios**.
3. Add a row to the table above.
4. Link it from `README.md` in the repo root under the **Features** section.
