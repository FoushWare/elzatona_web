# BDD: Frontend Tasks (User + Admin)

## Scenario: User views frontend tasks list

Given tasks exist
When user opens /frontend-tasks
Then task cards with difficulty and status are shown

## Scenario: User submits task solution

Given a task detail page
When user runs and submits code
Then evaluation result is shown with pass/fail feedback

## Scenario: Admin opens frontend tasks management page

Given authenticated admin
When admin opens /admin/frontend-tasks
Then management table loads with existing frontend task questions

## Scenario: Empty data state in admin

Given no frontend-task questions exist
When admin opens /admin/frontend-tasks
Then a clear empty-state message is shown without page crash
