# Resources Button Feature

**Description**  
Add a "Resources" button under "Start Learning Path" to list resources related to each learning path.

**Details**

- Add Resources button to each learning path card in `LearningPathCard` component
- Button navigates to `/learning-paths/[id]/resources` for each specific path
- Implement proper styling with gradient background and hover effects
- Use appropriate icons (📚) for visual consistency
- Ensure proper click event handling and navigation

**E2E Testing**

- Navigate to `/learning-paths` page
- Verify Resources button appears on each learning path card
- Click Resources button and verify navigation to resources page
- Test button styling and hover effects
- Verify proper navigation with different learning path IDs
- Run `npm run test:e2e` and check Cypress/Playwright logs

**Status**  
Completed

**Implementation Notes**

- Added to `src/components/LearningPathCard.tsx`
- Uses `window.location.href` for navigation
- Styled with Tailwind CSS gradient classes
- Includes proper event handling to prevent card toggle
