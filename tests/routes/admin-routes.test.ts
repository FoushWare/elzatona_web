import { test, expect } from '@playwright/test';

test.describe('Admin Routes - Complete Admin Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Start at admin homepage
    await page.goto('/admin');
  });

  test('Admin dashboard navigation', async ({ page }) => {
    // Check admin dashboard loads
    await expect(page).toHaveTitle(/Admin Dashboard/);

    // Check admin navigation
    const navItems = [
      'Dashboard',
      'Content Management',
      'Categories & Topics',
      'Questions',
      'Users',
      'Reports',
      'Settings',
    ];

    for (const item of navItems) {
      await expect(page.getByText(item)).toBeVisible();
    }

    // Check dashboard sections
    const sections = [
      'Overview',
      'Quick Actions',
      'Recent Activity',
      'Statistics',
    ];

    for (const section of sections) {
      await expect(page.getByText(section)).toBeVisible();
    }
  });

  test('Content management page', async ({ page }) => {
    // Navigate to content management
    await page.goto('/admin/content');

    // Check page loads
    await expect(page).toHaveTitle(/Content Management/);

    // Check content sections
    const contentSections = ['Learning', 'Practice', 'Interview Prep', 'Media'];

    for (const section of contentSections) {
      await expect(page.getByText(section)).toBeVisible();
    }

    // Check section cards
    const sectionCards = page.locator('[data-testid="content-section-card"]');
    await expect(sectionCards.first()).toBeVisible();
  });

  test('Questions management page', async ({ page }) => {
    // Navigate to questions management
    await page.goto('/admin/content/questions');

    // Check page loads
    await expect(page).toHaveTitle(/Questions Management/);

    // Check question management interface
    const questionManager = page.locator('[data-testid="question-manager"]');
    await expect(questionManager).toBeVisible();

    // Check question table
    const questionTable = page.locator('table');
    await expect(questionTable).toBeVisible();

    // Check table headers
    const headers = [
      'Title',
      'Type',
      'Difficulty',
      'Category',
      'Learning Path',
      'Status',
      'Actions',
    ];

    for (const header of headers) {
      await expect(page.getByText(header)).toBeVisible();
    }
  });

  test('Add new question workflow', async ({ page }) => {
    // Navigate to questions management
    await page.goto('/admin/content/questions');

    // Click add question button
    await page.getByText('Add Question').click();

    // Check add question modal
    const addModal = page.locator('[data-testid="add-question-modal"]');
    await expect(addModal).toBeVisible();

    // Fill question form
    await page.getByLabel('Title').fill('Test Question');
    await page.getByLabel('Content').fill('What is the purpose of testing?');
    await page.getByLabel('Type').selectOption('multiple-choice');
    await page.getByLabel('Difficulty').selectOption('intermediate');
    await page.getByLabel('Category').selectOption('Testing');
    await page.getByLabel('Learning Path').selectOption('JavaScript Deep Dive');

    // Add options
    await page.getByLabel('Option 1').fill('To find bugs');
    await page.getByLabel('Option 2').fill('To ensure quality');
    await page.getByLabel('Option 3').fill('To improve performance');
    await page.getByLabel('Option 4').fill('To reduce costs');

    // Set correct answer
    await page.getByLabel('Correct Answer').selectOption('2');

    // Add explanation
    await page
      .getByLabel('Explanation')
      .fill('Testing ensures software quality and reliability.');

    // Submit question
    await page.getByText('Create Question').click();

    // Check success message
    await expect(page.getByText('Question created successfully')).toBeVisible();

    // Check question appears in table
    await expect(page.getByText('Test Question')).toBeVisible();
  });

  test('Edit question workflow', async ({ page }) => {
    // Navigate to questions management
    await page.goto('/admin/content/questions');

    // Click edit button on first question
    const editButton = page.locator('[data-testid="edit-question"]').first();
    await editButton.click();

    // Check edit modal
    const editModal = page.locator('[data-testid="edit-question-modal"]');
    await expect(editModal).toBeVisible();

    // Update question title
    await page.getByLabel('Title').fill('Updated Test Question');

    // Submit changes
    await page.getByText('Update Question').click();

    // Check success message
    await expect(page.getByText('Question updated successfully')).toBeVisible();

    // Check updated question appears
    await expect(page.getByText('Updated Test Question')).toBeVisible();
  });

  test('Delete question workflow', async ({ page }) => {
    // Navigate to questions management
    await page.goto('/admin/content/questions');

    // Click delete button on first question
    const deleteButton = page
      .locator('[data-testid="delete-question"]')
      .first();
    await deleteButton.click();

    // Check delete confirmation modal
    const deleteModal = page.locator(
      '[data-testid="delete-confirmation-modal"]'
    );
    await expect(deleteModal).toBeVisible();

    // Confirm deletion
    await page.getByText('Confirm Delete').click();

    // Check success message
    await expect(page.getByText('Question deleted successfully')).toBeVisible();
  });

  test('Bulk question import workflow', async ({ page }) => {
    // Navigate to questions management
    await page.goto('/admin/content/questions');

    // Click bulk import button
    await page.getByText('Bulk Import').click();

    // Check bulk import modal
    const bulkModal = page.locator('[data-testid="bulk-import-modal"]');
    await expect(bulkModal).toBeVisible();

    // Switch to markdown mode
    await page.getByText('Markdown').click();

    // Paste markdown content
    const markdownContent = `
###### Question 1
What is React?

**Options:**
A) A JavaScript library for building user interfaces
B) A database management system
C) A server-side framework
D) A testing framework

<details>
<summary>Answer</summary>
A) A JavaScript library for building user interfaces

React is a JavaScript library developed by Facebook for building user interfaces.
</details>
    `;

    await page.getByLabel('Markdown Content').fill(markdownContent);

    // Parse markdown
    await page.getByText('Parse Markdown').click();

    // Check parsing results
    await expect(
      page.getByText('1 questions parsed successfully')
    ).toBeVisible();

    // Save questions
    await page.getByText('Save Questions').click();

    // Check success message
    await expect(page.getByText('Questions saved successfully')).toBeVisible();
  });

  test('Question filtering and search', async ({ page }) => {
    // Navigate to questions management
    await page.goto('/admin/content/questions');

    // Test search functionality
    const searchInput = page.getByPlaceholder('Search questions...');
    await searchInput.fill('React');
    await page.keyboard.press('Enter');

    // Check search results
    const searchResults = page.locator('[data-testid="question-row"]');
    await expect(searchResults.first()).toBeVisible();

    // Test category filter
    await page.getByText('Filter').click();
    await page.getByText('JavaScript').click();
    await page.getByText('Apply Filter').click();

    // Check filtered results
    const filteredResults = page.locator('[data-testid="question-row"]');
    await expect(filteredResults.first()).toBeVisible();

    // Test difficulty filter
    await page.getByText('Filter').click();
    await page.getByText('Intermediate').click();
    await page.getByText('Apply Filter').click();

    // Check filtered results
    await expect(filteredResults.first()).toBeVisible();
  });

  test('Categories and topics management', async ({ page }) => {
    // Navigate to categories and topics
    await page.goto('/admin/enhanced-structure');

    // Check page loads
    await expect(page).toHaveTitle(/Categories & Topics/);

    // Check categories section
    const categoriesSection = page.locator(
      '[data-testid="categories-section"]'
    );
    await expect(categoriesSection).toBeVisible();

    // Check topics section
    const topicsSection = page.locator('[data-testid="topics-section"]');
    await expect(topicsSection).toBeVisible();

    // Check learning paths section
    const learningPathsSection = page.locator(
      '[data-testid="learning-paths-section"]'
    );
    await expect(learningPathsSection).toBeVisible();
  });

  test('Add new category workflow', async ({ page }) => {
    // Navigate to categories and topics
    await page.goto('/admin/enhanced-structure');

    // Click add category button
    await page.getByText('Add Category').click();

    // Check add category modal
    const addModal = page.locator('[data-testid="add-category-modal"]');
    await expect(addModal).toBeVisible();

    // Fill category form
    await page.getByLabel('Name').fill('Mobile Development');
    await page.getByLabel('Description').fill('Mobile app development topics');

    // Submit category
    await page.getByText('Create Category').click();

    // Check success message
    await expect(page.getByText('Category created successfully')).toBeVisible();

    // Check category appears in list
    await expect(page.getByText('Mobile Development')).toBeVisible();
  });

  test('Add new topic workflow', async ({ page }) => {
    // Navigate to categories and topics
    await page.goto('/admin/enhanced-structure');

    // Click add topic button
    await page.getByText('Add Topic').click();

    // Check add topic modal
    const addModal = page.locator('[data-testid="add-topic-modal"]');
    await expect(addModal).toBeVisible();

    // Fill topic form
    await page.getByLabel('Name').fill('React Native');
    await page
      .getByLabel('Description')
      .fill('Cross-platform mobile development with React');
    await page.getByLabel('Category').selectOption('Mobile Development');

    // Submit topic
    await page.getByText('Create Topic').click();

    // Check success message
    await expect(page.getByText('Topic created successfully')).toBeVisible();

    // Check topic appears in list
    await expect(page.getByText('React Native')).toBeVisible();
  });

  test('Add new learning path workflow', async ({ page }) => {
    // Navigate to categories and topics
    await page.goto('/admin/enhanced-structure');

    // Click add learning path button
    await page.getByText('Add Learning Path').click();

    // Check add learning path modal
    const addModal = page.locator('[data-testid="add-learning-path-modal"]');
    await expect(addModal).toBeVisible();

    // Fill learning path form
    await page.getByLabel('Name').fill('Advanced React Patterns');
    await page
      .getByLabel('Description')
      .fill('Learn advanced React patterns and best practices');
    await page.getByLabel('Difficulty').selectOption('advanced');
    await page.getByLabel('Category').selectOption('Frontend Development');

    // Submit learning path
    await page.getByText('Create Learning Path').click();

    // Check success message
    await expect(
      page.getByText('Learning path created successfully')
    ).toBeVisible();

    // Check learning path appears in list
    await expect(page.getByText('Advanced React Patterns')).toBeVisible();
  });

  test('User management page', async ({ page }) => {
    // Navigate to user management
    await page.goto('/admin/users');

    // Check page loads
    await expect(page).toHaveTitle(/User Management/);

    // Check user table
    const userTable = page.locator('table');
    await expect(userTable).toBeVisible();

    // Check table headers
    const headers = [
      'Name',
      'Email',
      'Role',
      'Status',
      'Last Active',
      'Actions',
    ];

    for (const header of headers) {
      await expect(page.getByText(header)).toBeVisible();
    }
  });

  test('Reports page', async ({ page }) => {
    // Navigate to reports
    await page.goto('/admin/reports');

    // Check page loads
    await expect(page).toHaveTitle(/Reports/);

    // Check report sections
    const sections = [
      'User Analytics',
      'Question Statistics',
      'Learning Path Performance',
      'System Metrics',
    ];

    for (const section of sections) {
      await expect(page.getByText(section)).toBeVisible();
    }

    // Check charts
    const charts = page.locator('[data-testid="report-chart"]');
    await expect(charts.first()).toBeVisible();
  });

  test('Admin settings page', async ({ page }) => {
    // Navigate to settings
    await page.goto('/admin/settings');

    // Check page loads
    await expect(page).toHaveTitle(/Settings/);

    // Check settings sections
    const sections = [
      'General Settings',
      'Security Settings',
      'Notification Settings',
      'System Configuration',
    ];

    for (const section of sections) {
      await expect(page.getByText(section)).toBeVisible();
    }
  });

  test('Admin audit logs page', async ({ page }) => {
    // Navigate to audit logs
    await page.goto('/admin/audit-logs');

    // Check page loads
    await expect(page).toHaveTitle(/Audit Logs/);

    // Check audit log table
    const auditTable = page.locator('table');
    await expect(auditTable).toBeVisible();

    // Check table headers
    const headers = ['Timestamp', 'User', 'Action', 'Resource', 'Details'];

    for (const header of headers) {
      await expect(page.getByText(header)).toBeVisible();
    }
  });

  test('Admin guided learning management', async ({ page }) => {
    // Navigate to guided learning management
    await page.goto('/admin/guided-learning');

    // Check page loads
    await expect(page).toHaveTitle(/Guided Learning Management/);

    // Check learning plan templates
    const templates = page.locator('[data-testid="learning-plan-template"]');
    await expect(templates.first()).toBeVisible();

    // Check template actions
    const actions = [
      'Edit Template',
      'Duplicate Template',
      'Delete Template',
      'Preview Template',
    ];

    for (const action of actions) {
      if ((await page.getByText(action).count()) > 0) {
        await expect(page.getByText(action)).toBeVisible();
      }
    }
  });

  test('Admin question statistics', async ({ page }) => {
    // Navigate to questions management
    await page.goto('/admin/content/questions');

    // Check statistics section
    const statsSection = page.locator('[data-testid="question-statistics"]');
    await expect(statsSection).toBeVisible();

    // Check statistics cards
    const statsCards = page.locator('[data-testid="stat-card"]');
    await expect(statsCards.first()).toBeVisible();

    // Check statistics metrics
    const metrics = [
      'Total Questions',
      'Questions by Type',
      'Questions by Difficulty',
      'Questions by Category',
    ];

    for (const metric of metrics) {
      await expect(page.getByText(metric)).toBeVisible();
    }
  });

  test('Admin bulk operations', async ({ page }) => {
    // Navigate to questions management
    await page.goto('/admin/content/questions');

    // Select multiple questions
    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();

    // Check bulk actions appear
    const bulkActions = page.locator('[data-testid="bulk-actions"]');
    await expect(bulkActions).toBeVisible();

    // Check bulk action options
    const actions = [
      'Delete Selected',
      'Change Category',
      'Change Difficulty',
      'Export Selected',
    ];

    for (const action of actions) {
      await expect(page.getByText(action)).toBeVisible();
    }
  });

  test('Admin data export', async ({ page }) => {
    // Navigate to questions management
    await page.goto('/admin/content/questions');

    // Click export button
    await page.getByText('Export').click();

    // Check export options
    const exportOptions = page.locator('[data-testid="export-options"]');
    await expect(exportOptions).toBeVisible();

    // Check export formats
    const formats = ['CSV', 'JSON', 'Excel', 'PDF'];

    for (const format of formats) {
      await expect(page.getByText(format)).toBeVisible();
    }
  });

  test('Admin data import', async ({ page }) => {
    // Navigate to questions management
    await page.goto('/admin/content/questions');

    // Click import button
    await page.getByText('Import').click();

    // Check import modal
    const importModal = page.locator('[data-testid="import-modal"]');
    await expect(importModal).toBeVisible();

    // Check import options
    const importOptions = ['Upload File', 'Paste Data', 'Import from URL'];

    for (const option of importOptions) {
      await expect(page.getByText(option)).toBeVisible();
    }
  });

  test('Admin system health', async ({ page }) => {
    // Navigate to admin dashboard
    await page.goto('/admin');

    // Check system health section
    const healthSection = page.locator('[data-testid="system-health"]');
    await expect(healthSection).toBeVisible();

    // Check health metrics
    const metrics = [
      'Database Status',
      'API Response Time',
      'Memory Usage',
      'Active Users',
    ];

    for (const metric of metrics) {
      await expect(page.getByText(metric)).toBeVisible();
    }
  });

  test('Admin mobile responsiveness', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to admin dashboard
    await page.goto('/admin');

    // Check mobile layout
    const mobileLayout = page.locator('[data-testid="mobile-admin-layout"]');
    await expect(mobileLayout).toBeVisible();

    // Check mobile navigation
    const mobileNav = page.locator('[data-testid="mobile-admin-nav"]');
    await expect(mobileNav).toBeVisible();

    // Test mobile admin navigation
    const menuButton = page.getByRole('button', { name: /menu/i });
    await menuButton.click();

    // Check mobile menu items
    const mobileMenu = page.locator('[data-testid="mobile-admin-menu"]');
    await expect(mobileMenu).toBeVisible();
  });
});
