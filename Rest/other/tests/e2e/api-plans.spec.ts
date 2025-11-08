// v1.0
import { test, expect } from '@playwright/test';

test('GET /api/plans returns 200', async ({ request }) => {
  const res = await request.get('/api/plans');
  expect(res.status()).toBe(200);
  const json = await res.json();
  expect(json).toBeTruthy();
});
