import { rest } from "msw";

export const handlers = [
  rest.post("/api/auth/login", async (req, res, ctx) => {
    const body = await req.json();
    const email = body?.email || "test@example.com";
    return res(
      ctx.status(200),
      ctx.json({ user: { id: "test-user", email }, token: "fake-token" }),
    );
  }),

  rest.get("/api/user", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        id: "test-user",
        email: "test@example.com",
        name: "Test User",
      }),
    ),
  ),

  // Admin Problem Solving
  rest.get("http://localhost:3000/api/admin/problem-solving", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
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
      }),
    ),
  ),

  // Admin Frontend Tasks
  rest.get("http://localhost:3000/api/admin/frontend-tasks", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
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
      }),
    ),
  ),

  // Admin Learning Cards
  rest.get("http://localhost:3000/api/cards", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
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
      }),
    ),
  ),
];

export default handlers;
