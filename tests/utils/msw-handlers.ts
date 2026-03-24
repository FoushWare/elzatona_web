import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as { email?: string };
    const email = body?.email || "test@example.com";
    return HttpResponse.json(
      { user: { id: "test-user", email }, token: "fake-token" },
      { status: 200 },
    );
  }),

  http.get("/api/user", () =>
    HttpResponse.json(
      {
        id: "test-user",
        email: "test@example.com",
        name: "Test User",
      },
      { status: 200 },
    ),
  ),

  // Admin Problem Solving
  http.get("http://localhost:3000/api/admin/problem-solving", () =>
    HttpResponse.json(
      {
        success: true,
        data: [
          {
            id: "1",
            title: "Test Task",
            description: "Test description",
            difficulty: "easy",
            category: "algorithms",
            problem: "Test problem",
            solution: "Test solution",
            examples: [{ input: "test", output: "result" }],
            tags: ["array", "sorting"],
          },
        ],
      },
      { status: 200 },
    ),
  ),

  // Admin Frontend Tasks
  http.get("http://localhost:3000/api/admin/frontend-tasks", () =>
    HttpResponse.json(
      {
        success: true,
        data: [
          {
            id: "1",
            title: "Test Task",
            description: "Test description",
            difficulty: "easy",
            category: "components",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        pagination: { totalCount: 1, totalPages: 1 },
      },
      { status: 200 },
    ),
  ),

  // Admin Learning Cards
  http.get("http://localhost:3000/api/cards", () =>
    HttpResponse.json(
      {
        success: true,
        data: [
          {
            id: "1",
            title: "Test Card",
            category: "test",
            topic: "test",
            question: "test",
          },
        ],
      },
      { status: 200 },
    ),
  ),
];

export default handlers;
