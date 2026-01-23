// CommonJS companion for mock-repositories to ensure Jest can resolve imports
const createMockRepositories = () => {
  const userRepository = {
    create: jest.fn(async (data) => ({ id: "1", ...data })),
    getById: jest.fn(async (id) => (id === "1" ? { id: "1", email: "test@example.com" } : null)),
    findByEmail: jest.fn(async (email) => (email === "test@example.com" ? { id: "1", email } : null)),
    emailExists: jest.fn(async (email) => email === "user1@example.com"),
    count: jest.fn(async () => 1),
    countActive: jest.fn(async () => 1),
    findAdminByEmail: jest.fn(async (email) => (email === "admin@example.com" ? { id: "99", email, role: "admin" } : null)),
    findAll: jest.fn(async () => ({ items: [{ id: "1", name: "User", role: "admin" }], total: 1 })),
    findByRole: jest.fn(async (role) => ({ items: [{ id: "1", name: "User", role }], total: 1 })),
    search: jest.fn(async (q) => ({ items: [{ id: "1", name: "User" }], total: 1 })),
    update: jest.fn(async (id, data) => ({ id, ...data })),
    deactivate: jest.fn(async (id) => ({ id, active: false })),
    activate: jest.fn(async (id) => ({ id, active: true })),
    delete: jest.fn(async (id) => true),
    exists: jest.fn(async (id) => id === "1"),
  };

  const topicRepository = {
    getTopicById: jest.fn(async (id) => (id === "1" ? { id: "1", name: "Topic 1" } : null)),
    listTopics: jest.fn(async () => [{ id: "1", name: "Topic 1" }]),
    createTopic: jest.fn(async (data) => ({ id: "1", ...data })),
    updateTopic: jest.fn(async (id, data) => ({ id, ...data })),
    deleteTopic: jest.fn(async (id) => true),
    getAllTopics: jest.fn(async () => [{ id: "1", name: "Topic 1" }]),
  };

  const sectionRepository = {
    getSectionById: jest.fn(async (id) => (id === "1" ? { id: "1", name: "Section 1" } : null)),
    getAllSections: jest.fn(async () => [{ id: "1", name: "Section 1" }]),
    createSection: jest.fn(async (data) => ({ id: "1", ...data })),
    updateSection: jest.fn(async (id, data) => ({ id, ...data })),
    deleteSection: jest.fn(async (id) => true),
  };

  const progressRepository = {
    getProgressById: jest.fn(async (id) => (id === "1" ? { id: "1", status: "new" } : null)),
    getAllProgress: jest.fn(async () => [{ id: "1", status: "new" }]),
    createProgress: jest.fn(async (data) => ({ id: "1", ...data })),
    updateProgress: jest.fn(async (id, data) => ({ id, ...data })),
    deleteProgress: jest.fn(async (id) => true),
  };

  const flashcardRepository = {
    getFlashcardById: jest.fn(async (id) => (id === "1" ? { id: "1", question: "Q1", answer: "A1" } : null)),
    getAllFlashcards: jest.fn(async () => [{ id: "1", question: "Q1", answer: "A1" }]),
    createFlashcard: jest.fn(async (data) => ({ id: "1", ...data })),
    updateFlashcard: jest.fn(async (id, data) => ({ id, ...data })),
    deleteFlashcard: jest.fn(async (id) => true),
  };

  const categoryRepository = {
    getCategoryById: jest.fn(async (id) => (id === "1" ? { id: "1", name: "Math" } : null)),
    getAllCategories: jest.fn(async () => [{ id: "1", name: "Math" }]),
    createCategory: jest.fn(async (data) => ({ id: "1", ...data })),
    updateCategory: jest.fn(async (id, data) => ({ id, ...data })),
    deleteCategory: jest.fn(async (id) => true),
  };

  return {
    userRepository,
    topicRepository,
    sectionRepository,
    progressRepository,
    flashcardRepository,
    categoryRepository,
  };
};

// Support both CommonJS default export and named export consumers
module.exports = createMockRepositories;
module.exports.createMockRepositories = createMockRepositories;
module.exports.default = createMockRepositories;
