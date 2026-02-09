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
];

export default handlers;
