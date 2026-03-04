import { test, expect } from "@playwright/test";

test.describe("Admin Authentication", () => {
    test.beforeEach(async ({ page }) => {
        // Mock auth API
        await page.route("**/api/admin/auth", async (route) => {
            const request = route.request();
            if (request.method() === "POST") {
                const body = await request.postDataJSON();
                if (body.email === "test-admin@example.com" && body.password === "correct-password") {
                    await route.fulfill({
                        status: 200,
                        contentType: "application/json",
                        body: JSON.stringify({
                            success: true,
                            admin: { id: "test-admin-id", email: "test-admin@example.com" }
                        }),
                    });
                } else {
                    await route.fulfill({
                        status: 401,
                        contentType: "application/json",
                        body: JSON.stringify({ success: false, error: "Invalid credentials" }),
                    });
                }
            }
        });

        // Mock Supabase PostgREST for admin_users check
        await page.route("**/*.supabase.co/rest/v1/admin_users*", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    id: "test-admin-id",
                    email: "test-admin@example.com",
                    role: "admin",
                    name: "Test Admin"
                }),
            });
        });
    });

    test("successful login flow", async ({ page }) => {
        await page.goto("/admin/login");

        // Check if we are on login page
        await expect(page.locator("h1")).toContainText("Admin Login");

        // Fill credentials
        await page.fill('input[type="email"]', "test-admin@example.com");
        await page.fill('input[type="password"]', "correct-password");

        await page.click('button[type="submit"]');

        // Should redirect to dashboard
        await expect(page).toHaveURL(/\/admin\/dashboard/);
        await expect(page.locator("h1")).toContainText("Admin Dashboard");
    });

    test("failed login shows error", async ({ page }) => {
        await page.goto("/admin/login");

        await page.fill('input[type="email"]', "wrong@example.com");
        await page.fill('input[type="password"]', "wrongpassword");

        await page.click('button[type="submit"]');

        // Should show error message (sonner toast or inline error)
        // Adjust selector based on actual implementation
        await expect(page.getByText(/Invalid/)).toBeVisible();
    });

    test("protected routes redirect to login", async ({ page }) => {
        await page.goto("/admin/dashboard");

        // Should be redirected back to login if not authenticated
        await expect(page).toHaveURL(/\/admin\/login/);
    });
});
