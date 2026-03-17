# BDD: Admin - Content Questions

## Scenario: Load question management page

Given an authenticated admin user
When they open /admin/content/questions
Then they should see stats, filters, and a paginated questions list

## Scenario: Show accurate category counts

Given categories and questions exist
When the page requests /api/categories/question-counts
Then each category should include the correct questionCount

## Scenario: Search questions

Given questions exist
When admin enters a keyword
Then the list should show matching questions only
And pagination metadata should reflect filtered results

## Scenario: Filter by category and topic

Given questions in multiple categories and topics
When admin applies category and topic filters
Then only matching questions are shown

## Scenario: Create question

Given admin opens the create modal
When valid question data is submitted
Then the question is persisted and appears in the list

## Scenario: Update question

Given an existing question
When admin edits and saves changes
Then updated values are shown after refresh

## Scenario: Delete question

Given an existing question
When admin confirms delete
Then the question is removed from the list

## Scenario: Pagination does not loop

Given page size is 10
When admin navigates to page 2
Then the API should be called once for that state
And the UI should not enter repeated fetch cycles
