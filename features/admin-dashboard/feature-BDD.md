# BDD Scenarios: Admin Dashboard

## Feature: Admin Dashboard

As an **Admin User**, I want to see an overview of the platform's statistics so that I can monitor content growth and user activity.

---

### Scenario 1: Successful Dashboard Statistics Load

**Given** an authenticated admin user is on the "/admin/dashboard" page
**When** the dashboard page loads
**Then** the "Total Questions" card should display the correct number from the `questions` table
**And** the "Learning Cards" card should display the correct number from the `learning_cards` table
**And** the "Learning Plans" card should display the correct number from the `plan_cards` table
**And** all other statistic cards should show their respective database counts

---

### Scenario 2: Error Handling for Failed Statistics API

**Given** an authenticated admin user is on the "/admin/dashboard" page
**When** the `GET /api/admin/dashboard-stats` request fails with a 500 error
**Then** the user should see an error message "Failed to fetch dashboard statistics"
**And** the dashboard statistics cards should show a fallback error state or "0"

---

### Scenario 3: Real-time Data Consistency

**Given** an authenticated admin user is on the "/admin/dashboard" page
**And** the current question count is 100
**When** the user or a system process adds a new question to the `questions` table
**And** the user refreshes the dashboard page
**Then** the "Total Questions" card should now display 101
