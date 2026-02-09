# Manual testing guide — develop after database abstraction

Purpose

- Validate every page and core flow after the database abstraction PR is merged into `develop`.
- Catch regressions early before continuing with the refactor plan.

Start from develop (required)

1. Update `develop` locally:

```bash
git fetch origin
git checkout develop
git pull origin develop
```

2. Create a testing branch from `develop`:

```bash
git checkout -b manual/test-develop-after-db-abstraction
```

3. (Optional) Push the branch to run CI on your test branch:

```bash
git push -u origin manual/test-develop-after-db-abstraction
```

Local setup

- Ensure Node >= 20 and npm >= 10.
- Ensure `.env.local` contains safe test credentials.
- Start any required local services (DB/Supabase) before running the app.

Install dependencies

```bash
rm -rf node_modules apps/website/node_modules
npm install
```

Build & run

```bash
npm run build
npm run start
```

Dev mode (interactive testing)

```bash
npm run dev
```

Automated checks to run locally

- `npm run lint`
- `npm run type-check`
- `npm run build:check`
- `npm run test:unit`
- `npm run test:e2e` (or targeted e2e suites)

Manual test checklist (website)

- Home: `/`
- Auth: `/auth`, `/auth/callback`
- Dashboard: `/dashboard`
- Settings: `/settings`
- Get Started: `/get-started`
- Learning Paths: `/learning-paths`, `/learning-paths/[id]`, `/learning-paths/[id]/sections/[sectionId]`
- Learning Mode: `/learning-mode`
- Guided Practice: `/guided-practice`, `/guided-practice-minimal`, `/guided-practice-simple`
- Free Style: `/free-style`, `/free-style/cart`, `/free-style/path/[pathId]`, `/free-style-practice`
- Browse Practice Questions: `/browse-practice-questions`
- Questions: `/questions`
- Categories & Topics: `/categories-topics`
- Custom Practice: `/custom-practice/[planId]`
- Custom Roadmap: `/custom-roadmap`
- My Plans: `/my-plans`
- Problem Solving: `/problem-solving`, `/problem-solving/[id]`
- Frontend Tasks: `/frontend-tasks`, `/frontend-tasks/[id]`
- Flashcards: `/flashcards`
- Test Notifications: `/test-notifications`
- Test Supabase: `/test-supabase`
- Admin (website app): `/admin`, `/admin/login`, `/admin/users`, `/admin/content-management`, `/admin/content/questions`, `/admin/questions`, `/admin/questions/unified`, `/admin/learning-cards`, `/admin/frontend-tasks`, `/admin/problem-solving`

Manual test checklist (admin app)

- Root: `/` (admin app root)
- Admin Landing: `/admin`
- Admin Login: `/admin/login`
- Admin Dashboard: `/admin/dashboard`
- Content Management: `/admin/content-management`
- Content Questions: `/admin/content/questions`
- Learning Cards: `/admin/learning-cards`
- Frontend Tasks: `/admin/frontend-tasks`
- Problem Solving: `/admin/problem-solving`

Core flows to validate

- Sign up / login / logout
- Session persistence across refresh
- Create/update/delete content or questions
- Progress saving (database abstraction endpoints)
- Search, filters, pagination
- Uploads (if used)
- Error handling (404, empty states, auth gates)

Recording issues
For each failure capture:

- Page + route
- Steps to reproduce
- Expected vs actual
- Console errors / network failures
- Screenshots
- Severity (Blocker/High/Medium/Low)

After testing

- Create issues for each failure with reproduction steps.
- Fix blockers before proceeding with the refactor plan.
- Re-run the checklist after fixes.
