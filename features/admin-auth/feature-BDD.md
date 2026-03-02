# BDD Scenarios: Admin Authentication

## Feature: Admin Authentication

As an **Admin User**, I want to securely log into the Elzatona Admin app so that I can manage content and view site statistics.

---

### Scenario 1: Successful Admin Login

**Given** an admin user with email "admin@elzatona.com" and password "password123" exists in the `admin_users` table
**And** the user has the role "super_admin"
**And** the user is on the "/admin/login" page
**When** the user enters their email and password
**And** clicks the "Sign In" button
**Then** the user should be redirected to the "/admin/dashboard" page
**And** the user's session should be active

---

### Scenario 2: Persistent Session on Page Refresh

**Given** an admin user is successfully logged in and on the "/admin/dashboard" page
**When** the user refreshes the browser page
**Then** the user should remain on the "/admin/dashboard" page
**And** should NOT be redirected to the login page

---

### Scenario 3: Failed Login with Invalid Credentials

**Given** an admin user is on the "/admin/login" page
**When** the user enters an invalid email or password
**And** clicks the "Sign In" button
**Then** the user should see an error message "Invalid email or password"
**And** the user should remain on the "/admin/login" page

---

### Scenario 4: Unauthorized Access to Admin Routes

**Given** an unauthenticated visitor pokušava access "/admin/dashboard" directly
**When** the visitor navigates to the URL
**Then** the visitor should be redirected to the "/admin/login" page
**And** upon successful login, the user should be redirected back to "/admin/dashboard"

---

### Scenario 5: Successful Logout

**Given** an admin user is logged in
**When** the user clicks the "Logout" button in the navigation bar
**Then** the session should be cleared
**And** the user should be redirected to the "/admin/login" page
