# 71 — Unit Tests Checklist

## Selectors / mappers

- [ ] `computeContentStats`.
- [ ] `filterCards`.
- [ ] `filterPlans`.
- [ ] `topicQuestionsForTopic(topicId)` selector.
- [ ] `planHasQuestion(planId, questionId)` helper.

## Hooks / state helpers

- [ ] Expansion state toggles.
- [ ] Question selection toggles.
- [ ] Select all / deselect all.

## Service layer

- [ ] Fetch methods return normalized shapes.
- [ ] Error mapping returns safe messages.

## Missing parts checklist

- [ ] Add coverage for null/undefined fields that previously caused runtime errors.
