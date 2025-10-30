// v1.0
import { test, expect } from '@playwright/test';

const widths = [320, 360, 390, 414, 540, 768, 1024, 1280, 1440, 1920];

for (const w of widths) {
  test(`home responsive @${w}px`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto('/');
    await expect(page).toHaveTitle(
      /Elzatona|Master Frontend Development Interviews/i
    );
  });
}
