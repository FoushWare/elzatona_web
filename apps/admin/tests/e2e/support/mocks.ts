import { Page, test } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

// Function to get worker-specific state file to avoid crosstalk in parallel testing
function getMockStateFile() {
  const workerIndex = process.env.TEST_WORKER_INDEX || "0";
  const stateFile = path.join("/tmp", `e2e-mock-state-${workerIndex}.json`);
  return { workerIndex, stateFile };
}

function getMockState() {
  const { stateFile } = getMockStateFile();
  try {
    if (fs.existsSync(stateFile)) {
      return JSON.parse(fs.readFileSync(stateFile, "utf-8"));
    }
  } catch (_e) {
    // Ignore error
  }
  return { createdQuestions: [] };
}

function saveMockState(state: any) {
  const { workerIndex, stateFile } = getMockStateFile();
  try {
    fs.writeFileSync(stateFile, JSON.stringify(state), "utf-8");
    console.log(`[Mock] 💾 Saved state to ${stateFile} for worker ${workerIndex}`);
  } catch (_e) {
    // Ignore error
  }
}

/**
 * Sets up E2E mocks for Admin Content Management
 * This bypasses the need for a live Supabase instance during UI/UX tests
 */
export async function setupAdminMocks(page: Page) {
  // Ensure the state file exists for this worker
  const { stateFile } = getMockStateFile();
  if (!fs.existsSync(stateFile)) {
    saveMockState({ createdQuestions: [] });
  }

  // --- CATCH-ALL SAFETY NETS (Register FIRST so specific ones can override) ---
  
  // Catch-all for ANY /api/ endpoint that isn't specifically handled below
  await page.route(/\/api\/.*/, async (route) => {
    const url = route.request().url();
    console.log(`[Mock] 🛡️ Catch-all intercepting unhandled API: ${url}`);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: [], message: "Mocked by catch-all" }),
    });
  });

  // Mock Direct Supabase PostgREST API calls (catch-all for supabase.co)
  await page.route(/\/rest\/v1\/.*/, async (route) => {
    const url = route.request().url();
    console.log(`[Mock] 🛡️ Intercepting Supabase REST (generic): ${url}`);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]), // Default to empty array for DB queries
    });
  });

  // --- SPECIFIC API MOCKS (Register LAST to take precedence) ---

  // Mock Auth API
  await page.route("**/api/admin/auth", async (route) => {
    if (route.request().method() === "POST") {
      console.log(`[Mock] 🔐 Intercepting login request`);
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
    } else {
      await route.continue();
    }
  });

  // Mock Questions (Unified API) with stateful CRUD support
  await page.route(/\/api\/questions\/unified(\?.*)?$/, async (route) => {
    const method = route.request().method();
    const url = new URL(route.request().url());
    
    // Response for GET
    if (method === "GET") {
      const query = url.searchParams.get("query") || "";
      const pageNum = parseInt(url.searchParams.get("page") || "1", 10);
      const pageSize = parseInt(url.searchParams.get("pageSize") || "20", 10); // Standard page size for admin UI
      
      const state = getMockState();
      
      console.log(`[Mock] Intercepted [GET] questions request (query: "${query}", state count: ${state.createdQuestions.length})`);
      
      // Base mock questions
      const baseQuestions = Array.from({ length: 25 }).map((_, i) => ({
        id: `q-${i + 1}`,
        title: i === 0 ? "What is an article tag?" : `Question ${i + 1} for E2E testing`,
        type: i % 2 === 0 ? "single_choice" : "multiple_choice",
        topic_id: "topic-1",
        learning_card_id: "card-1",
        difficulty: "beginner",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      // Combine base with statefully-created ones (prepended)
      // This ensures new questions appear on Page 1
      const allQuestions = [...state.createdQuestions, ...baseQuestions];

      // Filter by query if provided
      const filteredQuestions = query 
        ? allQuestions.filter(q => q.title.toLowerCase().includes(query.toLowerCase()))
        : allQuestions;

      // Paginate
      const start = (pageNum - 1) * pageSize;
      const paginatedQuestions = filteredQuestions.slice(start, start + pageSize);

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: paginatedQuestions,
          pagination: {
            totalCount: filteredQuestions.length,
            page: pageNum,
            pageSize: pageSize,
            totalPages: Math.ceil(filteredQuestions.length / pageSize),
          }
        }),
      });
      return;
    }

    // Response for POST (Create)
    if (method === "POST") {
      const body = await route.request().postDataJSON().catch(() => ({}));
      const newQuestion = {
        id: `new-q-${Date.now()}`,
        title: body.title || "New Question",
        type: body.type || "single_choice",
        topic_id: body.topic_id || "topic-1",
        learning_card_id: body.learning_card_id || "card-1",
        difficulty: body.difficulty || "beginner",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Save state
      const state = getMockState();
      state.createdQuestions.unshift(newQuestion);
      saveMockState(state);
      console.log(`[Mock] 💾 Saved state for worker: ${newQuestion.title}`);
      
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            success: 1,
            failed: 0,
            results: [newQuestion],
            errors: []
          }
        }),
      });
      return;
    }

    // Response for PUT (Update)
    if (method === "PUT") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { success: true }
        }),
      });
      return;
    }

    // Response for DELETE
    if (method === "DELETE") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: { success: true }
        }),
      });
      return;
    }

    // Fallback
    await route.continue();
  });

  // Mock Learning Cards - loosened regex
  await page.route(/\/api\/cards/, async (route) => {
    console.log(`[Mock] Intercepting cards request: ${route.request().url()}`);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: [{ id: "card-1", title: "Core Technologies", is_active: true }],
      }),
    });
  });

  // Mock Categories - loosened regex and added question-counts
  await page.route(/\/api\/categories/, async (route) => {
    const url = route.request().url();
    console.log(`[Mock] Intercepting categories request: ${url}`);
    
    if (url.includes("question-counts")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: [{ category_id: "cat-1", count: 25 }]
        })
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: [{ id: "cat-1", name: "HTML Basics", learning_card_id: "card-1", is_active: true }],
      }),
    });
  });

  // Mock Topics - loosened regex
  await page.route(/\/api\/topics/, async (route) => {
    console.log(`[Mock] Intercepting topics request: ${route.request().url()}`);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: [{ id: "topic-1", name: "Semantic HTML", category_id: "cat-1", is_active: true }],
      }),
    });
  });

  // Mock Learning Plans
  await page.route(/\/api\/plans(\?.*)?$/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: [{ id: "plan-1", name: "Foundations Plan", is_active: true }],
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
        stats: { totalQuestions: 150, totalPlans: 12, totalCards: 4 },
      }),
    });
  });

  // Mock Specific Plan Questions relationship
  await page.route("**/*.supabase.co/rest/v1/plan_questions*", async (route) => {
    if (route.request().method() === "POST") {
      await route.fulfill({ status: 201, body: JSON.stringify({ success: true }) });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([{ plan_id: "plan-1", question_id: "q-1" }]),
    });
  });
}
