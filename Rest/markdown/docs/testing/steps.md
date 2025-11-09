Manual testing resources
Documentation

1.Manual Testing Workflow (Rest/markdown/docs/testing/MANUAL_TESTING_WORKFLOW.md)

- Step-by-step manual testing process
- Terminal setup for parallel testing
- Integration with automated tests

2.Test Execution Guide (Rest/markdown/docs/testing/TEST_EXECUTION_GUIDE.md)

- How to run unit, integration, and E2E tests
- Task-specific commands
- Troubleshooting tips

3.Quick Reference (Rest/markdown/docs/testing/QUICK_REFERENCE.md)

- Quick command lookup
- All test commands in one place

4.Test Tasks (Rest/markdown/docs/testing/tasks/)
- 21 test tasks with manual steps
- Each task includes manual testing instructions


## Quick commands

```
# Start dev server
npm run dev

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Update snapshots (when UI changes)
npm run test:unit -- --updateSnapshot

```


### When you find issues
1- Note what's not working or what needs adjustment
2- Tell me which test/task needs updating
3- I'll update the tests accordingly

## Test task index
Check `Rest/markdown/docs/testing/tasks/TASK_INDEX.md` for all 21 tasks and their status.
Ready to help update tests when needed. Share what you find during manual testing.
