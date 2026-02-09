import { createMockRepositories } from "../../../../../tests/utils/mock-repositories";

describe("IUserRepository", () => {
  const { userRepository } = createMockRepositories();

  it("create user", async () => {
    const user = await userRepository.create({
      email: "new@example.com",
      name: "New User",
    });
    expect(user.id).toBeDefined();
    expect(user.email).toBe("new@example.com");
  });

  it("findById returns user", async () => {
    const user = await userRepository.findById("1");
    expect(user).toBeTruthy();
    expect(user?.id).toBe("1");
  });

  it("findByEmail returns user", async () => {
    const user = await userRepository.findByEmail("user1@example.com");
    expect(user).toBeTruthy();
    expect(user?.email).toBe("user1@example.com");
  });

  it("findAdminByEmail returns admin", async () => {
    const admin = await userRepository.findAdminByEmail("admin@example.com");
    expect(admin).toBeTruthy();
    expect(admin?.role).toBe("admin");
  });

  it("findAll returns all users", async () => {
    const result = await userRepository.findAll();
    expect(result.items.length).toBeGreaterThan(0);
  });

  it("findByRole returns filtered users", async () => {
    const result = await userRepository.findByRole("admin");
    expect(result.items.every((u) => u.role === "admin")).toBe(true);
  });

  it("search returns matching users", async () => {
    const result = await userRepository.search("User");
    expect(result.items.length).toBeGreaterThan(0);
  });

  it("update user", async () => {
    const updated = await userRepository.update("1", { name: "Updated Name" });
    expect(updated.name).toBe("Updated Name");
  });

  it("deactivate user", async () => {
    const user = await userRepository.deactivate("1");
    expect(user.active).toBe(false);
  });

  it("activate user", async () => {
    const user = await userRepository.activate("1");
    expect(user.active).toBe(true);
  });

  it("delete user", async () => {
    await userRepository.delete("2");
    const user = await userRepository.findById("2");
    expect(user).toBeNull();
  });

  it("exists returns true for existing user", async () => {
    const exists = await userRepository.exists("1");
    expect(exists).toBe(true);
  });

  it("emailExists returns true for existing email", async () => {
    const exists = await userRepository.emailExists("user1@example.com");
    expect(exists).toBe(true);
  });

  it("count returns total users", async () => {
    const count = await userRepository.count();
    expect(count).toBeGreaterThan(0);
  });

  it("countActive returns active users", async () => {
    const count = await userRepository.countActive();
    expect(count).toBeGreaterThan(0);
  });
});
