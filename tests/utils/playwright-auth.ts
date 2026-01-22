import { chromium } from "playwright";
import fs from "fs-extra";
import path from "path";

type Options = {
  loginUrl: string;
  email: string;
  password: string;
  outputPath?: string;
  headless?: boolean;
};

export async function generateStorageState({
  loginUrl,
  email,
  password,
  outputPath = "tests/.auth/website.json",
  headless = true,
}: Options) {
  const browser = await chromium.launch({ headless });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(loginUrl);

  // Basic form interactions — adapt selectors per app
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');

  // Wait for navigation / authenticated page
  await page.waitForLoadState("networkidle");

  // Ensure output dir exists and write storage state
  await fs.ensureDir(path.dirname(outputPath));
  await context.storageState({ path: outputPath });

  await browser.close();
  return outputPath;
}

export default generateStorageState;
