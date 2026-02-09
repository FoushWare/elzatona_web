describe("Auth API (MSW integration)", () => {
  it("should return a mocked user and token on login", async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", password: "x" }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty("user");
    expect(json).toHaveProperty("token");
    expect(json.user.email).toBe("test@example.com");
  });
});
