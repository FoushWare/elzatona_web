# BDD: Admin - Learning Cards

## Scenario: Open learning cards page
Given authenticated admin user
When they open /admin/learning-cards
Then list view with action controls is visible

## Scenario: Create card
Given admin opens New Card modal
When valid front/back/category/topic values are submitted
Then a new learning card is persisted and listed

## Scenario: Edit card
Given existing card in list
When admin edits and saves
Then updates are visible immediately

## Scenario: Delete card
Given existing card in list
When admin confirms deletion
Then card is removed and total count updates

## Scenario: Validation errors
Given missing required fields
When submit is clicked
Then submission is blocked with validation feedback
