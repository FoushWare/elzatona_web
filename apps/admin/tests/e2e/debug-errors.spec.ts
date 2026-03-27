import { test, expect } from "@playwright/test";
import { setupAdminMocks } from "./support/mocks";

test("Capture browser errors", async ({ page }) => {
  await setupAdminMocks(page);
  
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log(`[BROWSER ERROR] ${msg.text()}`);
    }
  });
  
  page.on("pageerror", (err) => {
    console.log(`[RUNTIME ERROR] ${err.message}`);
  });

  await page.goto("/admin/content-management");
  
  // Try to trigger the modal
  const planStructure = page.locator('[data-testid="plans-manager-content"]');
  const planHeader = planStructure.getByText(/Foundations Plan/i).first();
  await planHeader.click();
  
  const categoryHeader = planStructure.locator('.cursor-pointer').filter({ hasText: /HTML Basics/ }).first();
  await categoryHeader.click();
  
  const addQuestionsBtn = planStructure.getByRole("button", { name: /Add Existing Questions/i }).first();
  await addQuestionsBtn.click();
  
  // Wait a bit for the error to appear
  await page.waitForTimeout(2000);
});
