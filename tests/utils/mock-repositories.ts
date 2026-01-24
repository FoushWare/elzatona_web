// Lightweight mock repositories for unit tests
// Export a factory that returns repositories with jest.fn stubs or full mock implementations.
import {
  ICategoryRepository,
  Category,
  CategoryInput,
} from "../../libs/database/src/repositories/interfaces/ICategoryRepository";

function createCategoryRepositoryMock(): ICategoryRepository {
  const categories: Category[] = [
    { id: "1", name: "Math", description: "Mathematics" },
    { id: "2", name: "Science", description: "Science desc" },
  ];
  return {
    async getCategoryById(id: string) {
      return categories.find((c) => c.id === id) || null;
    },
    async getAllCategories() {
      return [...categories];
    },
    async createCategory(data: CategoryInput) {
      const newCat: Category = {
        id: (categories.length + 1).toString(),
        ...data,
      };
      categories.push(newCat);
      return newCat;
    },
    async updateCategory(id: string, data: CategoryInput) {
      const idx = categories.findIndex((c) => c.id === id);
      if (idx === -1) throw new Error("Not found");
      categories[idx] = { ...categories[idx], ...data };
      return categories[idx];
    },
    async deleteCategory(id: string) {
      const idx = categories.findIndex((c) => c.id === id);
      if (idx !== -1) categories.splice(idx, 1);
    },
  };
}

export function createMockRepositories() {
  function createTopicRepositoryMock() {
    const topics = [
      {
        id: "1",
        name: "Algebra",
        categoryId: "1",
        description: "Algebra desc",
      },
      {
        id: "2",
        name: "Physics",
        categoryId: "2",
        description: "Physics desc",
      },
    ];
    return {
      async getTopicById(id) {
        return topics.find((t) => t.id === id) || null;
      },
      async getAllTopics() {
        return [...topics];
      },
      async createTopic(data) {
        const newTopic = { id: (topics.length + 1).toString(), ...data };
        topics.push(newTopic);
        return newTopic;
      },
      async updateTopic(id, data) {
        const idx = topics.findIndex((t) => t.id === id);
        if (idx === -1) throw new Error("Not found");
        topics[idx] = { ...topics[idx], ...data };
        return topics[idx];
      },
      async deleteTopic(id) {
        const idx = topics.findIndex((t) => t.id === id);
        if (idx !== -1) topics.splice(idx, 1);
      },
    };
  }
  function createSectionRepositoryMock() {
    const sections = [
      {
        id: "1",
        name: "Section 1",
        topicId: "1",
        description: "Section 1 desc",
      },
      {
        id: "2",
        name: "Section 2",
        topicId: "2",
        description: "Section 2 desc",
      },
    ];
    return {
      async getSectionById(id) {
        return sections.find((s) => s.id === id) || null;
      },
      async getAllSections() {
        return [...sections];
      },
      async createSection(data) {
        const newSection = { id: (sections.length + 1).toString(), ...data };
        sections.push(newSection);
        return newSection;
      },
      async updateSection(id, data) {
        const idx = sections.findIndex((s) => s.id === id);
        if (idx === -1) throw new Error("Not found");
        sections[idx] = { ...sections[idx], ...data };
        return sections[idx];
      },
      async deleteSection(id) {
        const idx = sections.findIndex((s) => s.id === id);
        if (idx !== -1) sections.splice(idx, 1);
      },
    };
  }
  function createFlashcardRepositoryMock() {
    const flashcards = [
      { id: "1", question: "Q1", answer: "A1", sectionId: "1" },
      { id: "2", question: "Q2", answer: "A2", sectionId: "2" },
    ];
    return {
      async getFlashcardById(id) {
        return flashcards.find((f) => f.id === id) || null;
      },
      async getAllFlashcards() {
        return [...flashcards];
      },
      async createFlashcard(data) {
        const newFlashcard = {
          id: (flashcards.length + 1).toString(),
          ...data,
        };
        flashcards.push(newFlashcard);
        return newFlashcard;
      },
      async updateFlashcard(id, data) {
        const idx = flashcards.findIndex((f) => f.id === id);
        if (idx === -1) throw new Error("Not found");
        flashcards[idx] = { ...flashcards[idx], ...data };
        return flashcards[idx];
      },
      async deleteFlashcard(id) {
        const idx = flashcards.findIndex((f) => f.id === id);
        if (idx !== -1) flashcards.splice(idx, 1);
      },
    };
  }
  function createProgressRepositoryMock() {
    const progresses = [
      {
        id: "1",
        userId: "u1",
        flashcardId: "1",
        status: "new",
        updatedAt: new Date(),
      },
      {
        id: "2",
        userId: "u2",
        flashcardId: "2",
        status: "reviewed",
        updatedAt: new Date(),
      },
    ];
    return {
      async getProgressById(id) {
        return progresses.find((p) => p.id === id) || null;
      },
      async getAllProgress() {
        return [...progresses];
      },
      async createProgress(data) {
        const newProgress = {
          id: (progresses.length + 1).toString(),
          ...data,
          updatedAt: new Date(),
        };
        progresses.push(newProgress);
        return newProgress;
      },
      async updateProgress(id, data) {
        const idx = progresses.findIndex((p) => p.id === id);
        if (idx === -1) throw new Error("Not found");
        progresses[idx] = {
          ...progresses[idx],
          ...data,
          updatedAt: new Date(),
        };
        return progresses[idx];
      },
      async deleteProgress(id) {
        const idx = progresses.findIndex((p) => p.id === id);
        if (idx !== -1) progresses.splice(idx, 1);
      },
    };
  }
  function createUserRepositoryMock() {
    const users = [
      {
        id: "1",
        email: "user1@example.com",
        name: "User One",
        role: "user",
        active: true,
      },
      {
        id: "2",
        email: "admin@example.com",
        name: "Admin",
        role: "admin",
        active: true,
      },
    ];
    return {
      async create(user) {
        const newUser = {
          id: (users.length + 1).toString(),
          ...user,
          active: true,
        };
        users.push(newUser);
        return newUser;
      },
      async findById(id) {
        return users.find((u) => u.id === id) || null;
      },
      async findByEmail(email) {
        return users.find((u) => u.email === email) || null;
      },
      async findAdminByEmail(email) {
        return (
          users.find((u) => u.email === email && u.role === "admin") || null
        );
      },
      async findAll() {
        return { items: [...users], total: users.length };
      },
      async findByRole(role) {
        const filtered = users.filter((u) => u.role === role);
        return { items: filtered, total: filtered.length };
      },
      async search(query) {
        const filtered = users.filter(
          (u) => u.name.includes(query) || u.email.includes(query),
        );
        return { items: filtered, total: filtered.length };
      },
      async update(id, data) {
        const idx = users.findIndex((u) => u.id === id);
        if (idx === -1) throw new Error("Not found");
        users[idx] = { ...users[idx], ...data };
        return users[idx];
      },
      async updateProgress() {
        return;
      },
      async updatePreferences() {
        return;
      },
      async updateLastLogin(id) {
        const user = users.find((u) => u.id === id);
        if (!user) throw new Error("Not found");
        return user;
      },
      async verifyEmail(id) {
        const user = users.find((u) => u.id === id);
        if (!user) throw new Error("Not found");
        return user;
      },
      async deactivate(id) {
        const user = users.find((u) => u.id === id);
        if (!user) throw new Error("Not found");
        user.active = false;
        return user;
      },
      async activate(id) {
        const user = users.find((u) => u.id === id);
        if (!user) throw new Error("Not found");
        user.active = true;
        return user;
      },
      async delete(id) {
        const idx = users.findIndex((u) => u.id === id);
        if (idx !== -1) users.splice(idx, 1);
      },
      async getProgress() {
        return { completed: 0 };
      },
      async getPreferences() {
        return { theme: "light" };
      },
      async getUserStatistics() {
        return { logins: 0 };
      },
      async count() {
        return users.length;
      },
      async countActive() {
        return users.filter((u) => u.active).length;
      },
      async exists(id) {
        return users.some((u) => u.id === id);
      },
      async emailExists(email) {
        return users.some((u) => u.email === email);
      },
    };
  }
  return {
    categoryRepository: createCategoryRepositoryMock(),
    topicRepository: createTopicRepositoryMock(),
    sectionRepository: createSectionRepositoryMock(),
    flashcardRepository: createFlashcardRepositoryMock(),
    progressRepository: createProgressRepositoryMock(),
    userRepository: createUserRepositoryMock(),
  };
}

export default createMockRepositories;
