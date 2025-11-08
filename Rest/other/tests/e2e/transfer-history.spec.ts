// v1.0
import { test, expect } from '@playwright/test';

test('transfer history: sync local guided progress to DB endpoint if available', async ({
  request,
}) => {
  const planId = 'test-plan-e2e';
  const progress = {
    completedQuestions: ['q1'],
    lastUpdated: new Date().toISOString(),
  };
  const res = await request.post('/api/progress/guided-learning/sync', {
    data: { planId, progress },
  });
  test.skip(
    res.status() === 404,
    'Sync endpoint not available in this environment'
  );
  expect(res.ok()).toBeTruthy();
});
