# Feature BDD: Authentication

## Overview

This document outlines the behavioral scenarios for Authentication using Gherkin syntax. These scenarios serve as the source of truth for automated E2E tests.

---

## Scenarios

### Scenario: Successful Login

**Given** the user is on the Login page
**And** they have a valid registered account with email "user@example.com" and password "SecurePass123!"
**When** they enter "user@example.com" in the email field
**And** they enter "SecurePass123!" in the password field
**And** they click the "Login" button
**Then** they should be redirected to the Dashboard
**And** they should see a "Welcome back" notification
**And** their session should be persisted across page refreshes

### Scenario: Logout Flow

**Given** the user is logged into their account
**When** they click the "Logout" button in the navigation bar
**Then** their session should be terminated
**And** they should be redirected to the Home page
**And** they should not be able to access the Dashboard via direct URL

### Scenario: Invalid Credentials

**Given** the user is on the Login page
**When** they enter an unregistered email "unknown@example.com"
**And** they enter any password
**And** they click the "Login" button
**Then** they should see an error message "Invalid email or password"
**And** they should remain on the Login page

### Scenario: Protected Route Redirect

**Given** a user is not logged in
**When** they attempt to visit the "/dashboard" URL directly
**Then** they should be redirected to the Login page
**And** after successful login, they should be taken back to "/dashboard" (Post-login redirect)
