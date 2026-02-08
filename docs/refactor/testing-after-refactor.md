## Website (User-Facing)

### General

- [ ] Home page loads and displays content
- [ ] Navigation bar and footer work on all pages
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] 404 page displays for unknown routes
- [ ] Notifications (if any)
- [ ] Contact/support page
- [ ] Integrations (Supabase, Sentry, etc.)

### Authentication

- [ ] User registration
- [ ] User login
- [ ] User logout
- [ ] Password reset

### User Dashboard & Profile

- [ ] Dashboard loads after login
- [ ] User profile view/edit
- [ ] Change password
- [ ] View user-specific data (plans, progress, analytics)

### Guided Learning

- [ ] Guided learning mode selection (`/get-started` → guided)
- [ ] Guided learning plans (1-7 days) display and navigation
- [ ] Guided plan: Card-based structure (Core Tech, Framework, Problem Solving, System Design)
- [ ] Guided plan: Categories, topics, and questions hierarchy
- [ ] Guided plan: Practice flow (start, answer, progress, finish)
- [ ] Guided plan: Progress tracking and persistence
- [ ] Guided plan: Switching between days/plans
- [ ] Guided plan: Reset progress

### Free Style Learning

- [ ] Free style mode selection (`/get-started` → self-directed)
- [ ] Browse practice questions (`/browse-practice-questions`)
- [ ] Free style: Select path/topic and practice questions
- [ ] Free style: Progress tracking and persistence
- [ ] Free style: Add/remove flashcards manually and on wrong answers
- [ ] Free style: Flashcards review and CRUD (`/flashcards`)

### Custom Practice & Roadmap

- [ ] Build custom plan from cart (select questions, set duration/questions/day)
- [ ] Practice custom plan questions; progress persists

### Learning Paths

- [ ] Browse learning paths (`/learning-paths`)
- [ ] Topic selection and navigation
- [ ] Practice questions in learning paths
- [ ] Progress tracking per topic/path

### Problem Solving & Frontend Tasks

- [ ] Browse problem solving tasks (`/problem-solving`)
- [ ] Practice problem solving (run solution, sample tests, custom input)
- [ ] Wrong attempts increment analytics/add to flashcards
- [ ] Browse frontend tasks (`/frontend-tasks`)
- [ ] Practice frontend tasks (coding, preview, save/load code)

### Settings & Notifications

- [ ] Settings page loads and updates user preferences
- [ ] Notifications display and clear as expected

### Visual/UX Checks

- [ ] Navbar items correct for auth state
- [ ] Toasts readable in light/dark
- [ ] Pages have correct padding under navbar
- [ ] Mobile and desktop layouts

---

## Admin

### General

- [ ] Admin login
- [ ] Admin dashboard loads
- [ ] Navigation/menu works
- [ ] Responsive design
- [ ] Logout

### User Management

- [ ] List users (`/admin/users`)
- [ ] Add new user
- [ ] Edit user
- [ ] Delete user

### Content Management

- [ ] Unified content management (`/admin/content-management`)
- [ ] Learning cards CRUD (`/admin/learning-cards`)
- [ ] Card configuration (question counts, time limits, difficulty, topics)
- [ ] Topic management for cards
- [ ] Add/edit/delete categories, topics, questions
- [ ] Assign questions to cards/categories/topics
- [ ] Question management (`/admin/content/questions`)
- [ ] Add/edit/delete questions (with audio, badges, assignments)
- [ ] Add questions to plans and verify guided plan counts update

### Guided Learning Admin

- [ ] Guided plan editor (card-based, assign questions)
- [ ] Add/edit/delete days, categories, topics in plans
- [ ] Plan configuration (question counts per day, cumulative tracking)
- [ ] Analytics dashboard for plans/questions

### Frontend Tasks & Problem Solving Admin

- [ ] Frontend tasks management (`/admin/frontend-tasks`): CRUD, search, filter, bulk ops
- [ ] Problem solving management (`/admin/problem-solving`): CRUD, test case management

### Logs, Analytics, Reports

- [ ] View logs
- [ ] View system stats/analytics
- [ ] Feature reports (`/admin/reports`)

### Other Admin Features

- [ ] Error handling (invalid routes, permissions)
- [ ] Admin role management and permissions
- [ ] Backup & recovery (if implemented)
- [ ] System configuration (learning paths, difficulty, platform settings)

---

## How to Test

1. Start both apps (`npm run dev` in each app directory).
2. Use the checklist above to visit each page and perform each action.
3. For each item, verify:
   - The page loads without errors
   - The UI looks correct
   - The expected data is displayed
   - Actions (add/edit/delete) work as intended
4. If you confirm an item works, tell me and I will mark it as complete in this file.
5. If you find a bug, describe it and I will help you debug/fix it.

---

Add any new features or scenarios to this checklist as needed.
