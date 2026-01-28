// Lightweight mock repositories for unit tests
// Export a factory that returns repositories with jest.fn stubs or full mock implementations.
import {
  ICategoryRepository,
  Category,
  CategoryInput,
} from "../../libs/database/src/repositories/interfaces/ICategoryRepository";
import {
  ITopicRepository,
  Topic,
  TopicInput,
} from "../../libs/database/src/repositories/interfaces/ITopicRepository";
import {
  ISectionRepository,
  Section,
  SectionInput,
} from "../../libs/database/src/repositories/interfaces/ISectionRepository";
import {
  IFlashcardRepository,
  Flashcard,
  FlashcardInput,
} from "../../libs/database/src/repositories/interfaces/IFlashcardRepository";
import {
  IProgressRepository,
  Progress,
  ProgressInput,
} from "../../libs/database/src/repositories/interfaces/IProgressRepository";
import { IUserRepository } from "../../libs/database/src/repositories/interfaces/IUserRepository";
import {
  User,
  CreateUserDTO,
  UpdateUserDTO,
  QueryOptions,
  PaginatedResult,
  UserProgress,
  UserPreferences,
  UserStatistics,
} from "../../libs/database/src/repositories/types/index";
import { UserRole } from "../../libs/database/src/repositories/types/user";

function createCategoryRepositoryMock(): ICategoryRepository {
  const categories: Category[] = [
    { id: "1", name: "Math", description: "Mathematics" },
    { id: "2", name: "Science", description: "Science desc" },
  ];
  return {
    async getCategoryById(id: string): Promise<Category | null> {
      return categories.find((c) => c.id === id) || null;
    },
    async getAllCategories(): Promise<Category[]> {
      return [...categories];
    },
    async createCategory(data: CategoryInput): Promise<Category> {
      const newCat: Category = {
        id: (categories.length + 1).toString(),
        ...data,
      };
      categories.push(newCat);
      return newCat;
    },
    async updateCategory(id: string, data: CategoryInput): Promise<Category> {
      const idx = categories.findIndex((c) => c.id === id);
      if (idx === -1) throw new Error("Not found");
      categories[idx] = { ...categories[idx], ...data };
      return categories[idx];
    },
    async deleteCategory(id: string): Promise<void> {
      const idx = categories.findIndex((c) => c.id === id);
      if (idx !== -1) categories.splice(idx, 1);
    },
  };
}

function createTopicRepositoryMock(): ITopicRepository {
  const topics: Topic[] = [
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
    async getTopicById(id: string): Promise<Topic | null> {
      return topics.find((t) => t.id === id) || null;
    },
    async getAllTopics(): Promise<Topic[]> {
      return [...topics];
    },
    async createTopic(data: TopicInput): Promise<Topic> {
      const newTopic: Topic = { id: (topics.length + 1).toString(), ...data };
      topics.push(newTopic);
      return newTopic;
    },
    async updateTopic(id: string, data: TopicInput): Promise<Topic> {
      const idx = topics.findIndex((t) => t.id === id);
      if (idx === -1) throw new Error("Not found");
      topics[idx] = { ...topics[idx], ...data };
      return topics[idx];
    },
    async deleteTopic(id: string): Promise<void> {
      const idx = topics.findIndex((t) => t.id === id);
      if (idx !== -1) topics.splice(idx, 1);
    },
  };
}

function createSectionRepositoryMock(): ISectionRepository {
  const sections: Section[] = [
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
    async getSectionById(id: string): Promise<Section | null> {
      return sections.find((s) => s.id === id) || null;
    },
    async getAllSections(): Promise<Section[]> {
      return [...sections];
    },
    async createSection(data: SectionInput): Promise<Section> {
      const newSection: Section = {
        id: (sections.length + 1).toString(),
        ...data,
      };
      sections.push(newSection);
      return newSection;
    },
    async updateSection(id: string, data: SectionInput): Promise<Section> {
      const idx = sections.findIndex((s) => s.id === id);
      if (idx === -1) throw new Error("Not found");
      sections[idx] = { ...sections[idx], ...data };
      return sections[idx];
    },
    async deleteSection(id: string): Promise<void> {
      const idx = sections.findIndex((s) => s.id === id);
      if (idx !== -1) sections.splice(idx, 1);
    },
  };
}

function createFlashcardRepositoryMock(): IFlashcardRepository {
  const flashcards: Flashcard[] = [
    { id: "1", question: "Q1", answer: "A1", sectionId: "1" },
    { id: "2", question: "Q2", answer: "A2", sectionId: "2" },
  ];
  return {
    async getFlashcardById(id: string): Promise<Flashcard | null> {
      return flashcards.find((f) => f.id === id) || null;
    },
    async getAllFlashcards(): Promise<Flashcard[]> {
      return [...flashcards];
    },
    async createFlashcard(data: FlashcardInput): Promise<Flashcard> {
      const newFlashcard: Flashcard = {
        id: (flashcards.length + 1).toString(),
        ...data,
      };
      flashcards.push(newFlashcard);
      return newFlashcard;
    },
    async updateFlashcard(
      id: string,
      data: FlashcardInput,
    ): Promise<Flashcard> {
      const idx = flashcards.findIndex((f) => f.id === id);
      if (idx === -1) throw new Error("Not found");
      flashcards[idx] = { ...flashcards[idx], ...data };
      return flashcards[idx];
    },
    async deleteFlashcard(id: string): Promise<void> {
      const idx = flashcards.findIndex((f) => f.id === id);
      if (idx !== -1) flashcards.splice(idx, 1);
    },
  };
}

function createProgressRepositoryMock(): IProgressRepository {
  const progresses: Progress[] = [
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
    async getProgressById(id: string): Promise<Progress | null> {
      return progresses.find((p) => p.id === id) || null;
    },
    async getAllProgress(): Promise<Progress[]> {
      return [...progresses];
    },
    async createProgress(data: ProgressInput): Promise<Progress> {
      const newProgress: Progress = {
        id: (progresses.length + 1).toString(),
        ...data,
        updatedAt: new Date(),
      };
      progresses.push(newProgress);
      return newProgress;
    },
    async updateProgress(id: string, data: ProgressInput): Promise<Progress> {
      const idx = progresses.findIndex((p) => p.id === id);
      if (idx === -1) throw new Error("Not found");
      progresses[idx] = {
        ...progresses[idx],
        ...data,
        updatedAt: new Date(),
      };
      return progresses[idx];
    },
    async deleteProgress(id: string): Promise<void> {
      const idx = progresses.findIndex((p) => p.id === id);
      if (idx !== -1) progresses.splice(idx, 1);
    },
  };
}

function createUserRepositoryMock(): IUserRepository {
  const users: User[] = [
    {
      id: "1",
      email: "user1@example.com",
      displayName: "User One",
      role: UserRole.STUDENT,
      isActive: true,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      email: "admin@example.com",
      displayName: "Admin",
      role: UserRole.ADMIN,
      isActive: true,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  return {
    async create(user: CreateUserDTO): Promise<User> {
      const newUser: User = {
        id: (users.length + 1).toString(),
        ...user,
        role: user.role || UserRole.STUDENT,
        isActive: true,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser);
      return newUser;
    },
    async findById(id: string): Promise<User | null> {
      return users.find((u) => u.id === id) || null;
    },
    async findByEmail(email: string): Promise<User | null> {
      return users.find((u) => u.email === email) || null;
    },
    async findAdminByEmail(email: string): Promise<any | null> {
      return (
        users.find((u) => u.email === email && u.role === UserRole.ADMIN) ||
        null
      );
    },
    async findAll(options?: QueryOptions): Promise<PaginatedResult<User>> {
      return {
        data: [...users],
        items: [...users],
        meta: {
          total: users.length,
          limit: options?.limit || users.length,
          offset: options?.offset || 0,
          hasMore: false,
        },
      };
    },
    async findByRole(
      role: string,
      options?: QueryOptions,
    ): Promise<PaginatedResult<User>> {
      const filtered = users.filter((u) => u.role === role);
      return {
        data: filtered,
        items: filtered,
        meta: {
          total: filtered.length,
          limit: options?.limit || filtered.length,
          offset: options?.offset || 0,
          hasMore: false,
        },
      };
    },
    async search(
      query: string,
      options?: QueryOptions,
    ): Promise<PaginatedResult<User>> {
      const filtered = users.filter(
        (u) => u.displayName?.includes(query) || u.email.includes(query),
      );
      return {
        data: filtered,
        items: filtered,
        meta: {
          total: filtered.length,
          limit: options?.limit || filtered.length,
          offset: options?.offset || 0,
          hasMore: false,
        },
      };
    },
    async update(id: string, data: UpdateUserDTO): Promise<User> {
      const idx = users.findIndex((u) => u.id === id);
      if (idx === -1) throw new Error("Not found");
      users[idx] = { ...users[idx], ...data, updatedAt: new Date() };
      return users[idx];
    },
    async updateProgress(
      userId: string,
      progress: UserProgress,
    ): Promise<void> {
      return;
    },
    async updatePreferences(
      userId: string,
      preferences: UserPreferences,
    ): Promise<void> {
      return;
    },
    async updateLastLogin(id: string): Promise<User> {
      const user = users.find((u) => u.id === id);
      if (!user) throw new Error("Not found");
      return user;
    },
    async verifyEmail(id: string): Promise<User> {
      const user = users.find((u) => u.id === id);
      if (!user) throw new Error("Not found");
      return user;
    },
    async deactivate(id: string): Promise<User> {
      const idx = users.findIndex((u) => u.id === id);
      if (idx === -1) throw new Error("Not found");
      users[idx] = { ...users[idx], isActive: false, updatedAt: new Date() };
      return users[idx];
    },
    async activate(id: string): Promise<User> {
      const idx = users.findIndex((u) => u.id === id);
      if (idx === -1) throw new Error("Not found");
      users[idx] = { ...users[idx], isActive: true, updatedAt: new Date() };
      return users[idx];
    },
    async delete(id: string): Promise<void> {
      const idx = users.findIndex((u) => u.id === id);
      if (idx !== -1) users.splice(idx, 1);
    },
    async getProgress(userId: string): Promise<UserProgress> {
      return {
        userId,
        totalQuestionsAttempted: 0,
        totalQuestionsCorrect: 0,
        totalPoints: 0,
        currentStreak: 0,
        longestStreak: 0,
        completedPlans: [],
        inProgressPlans: [],
        masteredTopics: [],
        weakTopics: [],
        lastActivityAt: new Date(),
      } as UserProgress;
    },
    async getPreferences(userId: string): Promise<UserPreferences> {
      return { theme: "light" };
    },
    async getUserStatistics(userId: string): Promise<UserStatistics> {
      return { logins: 0 };
    },
    async count(): Promise<number> {
      return users.length;
    },
    async countActive(): Promise<number> {
      return users.filter((u) => u.isActive).length;
    },
    async exists(id: string): Promise<boolean> {
      return users.some((u) => u.id === id);
    },
    async emailExists(email: string): Promise<boolean> {
      return users.some((u) => u.email === email);
    },
  };
}

export function createMockRepositories() {
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
