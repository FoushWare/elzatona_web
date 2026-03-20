# BDD: Admin Content Schema and NotebookLM Seeding

## Scenario: Build valid seed payload from NotebookLM export

Given an admin has NotebookLM output with resource-derived questions
When the admin maps it to the project seed JSON structure
Then each question includes required fields (title, content, type, difficulty)
And each question references valid category/topic slugs

## Scenario: Seed categories and topics without duplicates

Given categories and topics include stable slugs
When the seeder runs multiple times
Then categories are upserted by category slug
And topics are upserted by topic slug
And no duplicate rows are created for the same slug

## Scenario: Seed questions with optional rich fields

Given a question includes optional code, resources, and metadata
When the question is inserted by the seeder
Then code newlines are preserved
And resources stay in valid array structure
And metadata is persisted as JSON

## Scenario: Cover guided, free-style, and custom learners

Given questions have mode targeting in metadata or tags
When data is loaded in practice flows
Then guided learners can receive plan-assigned questions
And free-style learners can filter by free-style targeted items
And custom learners can assemble mixed targeted sets

## Scenario: Validate seeded data in admin pages

Given seeding finished successfully
When an admin opens questions and content management pages
Then category/topic links are visible
And question counts are non-zero
And no blocking fetch error appears
