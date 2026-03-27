import { Page } from "@playwright/test";

/**
 * Sets up E2E mocks for Admin Content Management
 * This bypasses the need for a live Supabase instance during UI/UX tests
 */
export async function setupAdminMocks(page: Page) {
  // Mock Auth API
  await page.route("**/api/admin/auth", async (route) => {
    if (route.request().method() === "POST") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          admin: {
            id: "e2e-test-admin-id",
            email: "test-admin@example.com",
            name: "E2E Test Admin",
            role: "admin",
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
          },
        }),
      });
    }
  });

  // Mock Learning Cards
  await page.route(/\/api\/cards(\?.*)?$/, async (route) => {
    console.log(`[Mock] Intercepted cards request: ${route.request().url()}`);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: [
          {
            id: "card-1",
            title: "Core Technologies",
            description: "HTML, CSS, JavaScript, TypeScript",
            color: "#3B82F6",
            icon: "Layers",
            order_index: 0,
            is_active: true,
          },
          {
            id: "card-2",
            title: "Framework Questions",
            description: "React, Next.js, Vue",
            color: "#10B981",
            icon: "Layers",
            order_index: 1,
            is_active: true,
          },
        ],
      }),
    });
  });

  // Mock Categories
  await page.route(/\/api\/categories(\?.*)?$/, async (route) => {
    console.log(`[Mock] Intercepted categories request: ${route.request().url()}`);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: [
          {
            id: "cat-1",
            name: "HTML Basics",
            learning_card_id: "card-1",
            order_index: 0,
            is_active: true,
          },
        ],
      }),
    });
  });

  // Mock Topics
  await page.route(/\/api\/topics(\?.*)?$/, async (route) => {
    console.log(`[Mock] Intercepted topics request: ${route.request().url()}`);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: [
          {
            id: "topic-1",
            name: "Semantic HTML",
            category_id: "cat-1",
            order_index: 0,
            is_active: true,
          },
        ],
      }),
    });
  });

  // Mock Questions
  await page.route(/\/api\/questions\/unified(\?.*)?$/, async (route) => {
    console.log(`[Mock] Intercepted questions request: ${route.request().url()}`);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: [
          {
            id: "q-1",
            title: "What is an article tag?",
            type: "single_choice",
            topic_id: "topic-1",
            learning_card_id: "card-1",
            difficulty: "beginner",
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      }),
    });
  });

  // Mock Learning Plans
  await page.route(/\/api\/plans(\?.*)?$/, async (route) => {
    console.log(`[Mock] Intercepted plans request: ${route.request().url()}`);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: [
          {
            id: "plan-1",
            name: "Foundations Plan",
            description: "Basic path",
            estimated_duration: 30,
            is_public: true,
            is_active: true,
            created_at: new Date().toISOString(),
          },
        ],
      }),
    });
  });

  // Mock Dashboard Stats
  await page.route(/\/api\/admin\/dashboard-stats(\?.*)?$/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        stats: {
          totalQuestions: 125,
          totalPlans: 12,
          totalCards: 4,
          activeUsers: 45,
        },
      }),
    });
  });

  // Mock Direct Supabase REST API calls
  await page.route(/\/rest\/v1\/.*/, async (route) => {
    const url = route.request().url();
    console.log(`[Mock] Intercepted Supabase REST: ${url}`);
    
    // Check if it's a POST/INSERT to plan_questions
    if (route.request().method() === "POST" && url.includes("plan_questions")) {
      await route.fulfill({ status: 201, body: JSON.stringify({ success: true }) });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]), // Default to empty array for DB queries
    });
  });
}
