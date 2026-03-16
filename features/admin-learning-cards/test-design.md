# Test Design: Admin - Learning Cards

## Unit Tests

1. Modal form validates required fields.
2. API client handles create/edit/delete success and failure paths.
3. Search/filter helpers return expected subset.

## Integration Tests

1. Page renders list and action controls.
2. Create modal submits and inserts new row.
3. Edit modal updates existing row.
4. Delete confirmation removes selected row.

## E2E Tests

1. Admin visits /admin/learning-cards and sees populated list.
2. Admin can create, edit, and delete card in one session.
3. Validation and server-error messages appear correctly.

