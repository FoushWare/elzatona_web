# BDD: Problem Solving (User + Admin)

## Scenario: User sees problem list

Given problem questions exist
When user opens /problem-solving
Then list page renders with difficulty and tags

## Scenario: User submits solution

Given problem detail page is open
When user submits answer
Then validation result is shown

## Scenario: Admin opens problem management page

Given authenticated admin user
When admin opens /admin/problem-solving
Then problem list and controls are rendered

## Scenario: Admin data isolation

Given mixed question types exist
When admin loads /admin/problem-solving
Then only type=problem records are shown
