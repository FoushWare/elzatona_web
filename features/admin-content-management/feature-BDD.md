# BDD: Admin - Content Management

## Scenario: Page loads core datasets

Given an authenticated admin
When they open /admin/content-management
Then cards, plans, categories, topics, and questions should load
And no blocking error banner should be shown

## Scenario: Search and filter content

Given content records exist
When admin enters a search term or card-type filter
Then visible cards and plans should match the filter

## Scenario: Open topic questions modal

Given a plan and topic are visible
When admin opens topic questions modal
Then topic questions can be selected and prepared for assignment

## Scenario: Delete learning card

Given an existing learning card
When admin confirms delete action
Then the card is removed and data is refreshed

## Scenario: Handle repository failures

Given a repository call fails
When content-management page initializes
Then a user-friendly error state is shown with refresh option

## Scenario: Load from internal API routes

Given content management page loads
When cards, categories, topics, questions, and plans are requested
Then requests are made to internal admin API endpoints
And page does not depend on direct browser Supabase access for initial data

## Scenario: Partial data fetch failure is non-blocking

Given at least one dataset endpoint fails
When content-management page initializes
Then available datasets are still rendered
And a non-blocking warning toast is shown instead of full-page failure
