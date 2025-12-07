// Example Service using Database Abstraction
// v1.0 - Demonstrates how to use the database abstraction layer

import { IDatabaseService } from "./IDatabaseService";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "premium_user" | "admin" | "super_admin";
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  type: "multiple-choice" | "open-ended" | "true-false" | "code";
  category?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  category_id: string;
  question_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// User Service using database abstraction
export class UserService {
  constructor(private database: IDatabaseService) {}

  async getUser(id: string): Promise<User | null> {
    return await this.database.get<User>("users", id);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.database.getAll<User>("users");
  }

  async createUser(userData: Omit<User, "id">): Promise<User> {
    return await this.database.add<User>("users", userData);
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    return await this.database.update<User>("users", id, updates);
  }

  async deleteUser(id: string): Promise<void> {
    return await this.database.delete("users", id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.database.querySingle<User>("users", { email });
  }

  async getUsersByRole(role: User["role"]): Promise<User[]> {
    return await this.database.query<User>("users", { role });
  }

  async getUserCount(): Promise<number> {
    return await this.database.count("users");
  }
}

// Question Service using database abstraction
export class QuestionService {
  constructor(private database: IDatabaseService) {}

  async getQuestion(id: string): Promise<Question | null> {
    return await this.database.get<Question>("questions", id);
  }

  async getAllQuestions(): Promise<Question[]> {
    return await this.database.getAll<Question>("questions");
  }

  async createQuestion(questionData: Omit<Question, "id">): Promise<Question> {
    return await this.database.add<Question>("questions", questionData);
  }

  async updateQuestion(
    id: string,
    updates: Partial<Question>,
  ): Promise<Question> {
    return await this.database.update<Question>("questions", id, updates);
  }

  async deleteQuestion(id: string): Promise<void> {
    return await this.database.delete("questions", id);
  }

  async getQuestionsByCategory(category: string): Promise<Question[]> {
    return await this.database.query<Question>("questions", { category });
  }

  async getQuestionsByDifficulty(
    difficulty: Question["difficulty"],
  ): Promise<Question[]> {
    return await this.database.query<Question>("questions", { difficulty });
  }

  async getActiveQuestions(): Promise<Question[]> {
    return await this.database.query<Question>("questions", {
      is_active: true,
    });
  }

  async getQuestionCount(): Promise<number> {
    return await this.database.count("questions");
  }

  async batchCreateQuestions(
    questions: Omit<Question, "id">[],
  ): Promise<Question[]> {
    return await this.database.batchAdd<Question>("questions", questions);
  }

  async batchUpdateQuestions(
    updates: Array<{ id: string; data: Partial<Question> }>,
  ): Promise<Question[]> {
    return await this.database.batchUpdate<Question>("questions", updates);
  }

  async batchDeleteQuestions(ids: string[]): Promise<void> {
    return await this.database.batchDelete("questions", ids);
  }
}

// Topic Service using database abstraction
export class TopicService {
  constructor(private database: IDatabaseService) {}

  async getTopic(id: string): Promise<Topic | null> {
    return await this.database.get<Topic>("topics", id);
  }

  async getAllTopics(): Promise<Topic[]> {
    return await this.database.getAll<Topic>("topics");
  }

  async createTopic(topicData: Omit<Topic, "id">): Promise<Topic> {
    return await this.database.add<Topic>("topics", topicData);
  }

  async updateTopic(id: string, updates: Partial<Topic>): Promise<Topic> {
    return await this.database.update<Topic>("topics", id, updates);
  }

  async deleteTopic(id: string): Promise<void> {
    return await this.database.delete("topics", id);
  }

  async getTopicsByCategory(categoryId: string): Promise<Topic[]> {
    return await this.database.query<Topic>("topics", {
      category_id: categoryId,
    });
  }

  async getActiveTopics(): Promise<Topic[]> {
    return await this.database.query<Topic>("topics", { is_active: true });
  }

  async getTopicCount(): Promise<number> {
    return await this.database.count("topics");
  }
}

// Service Factory for easy service creation
export class ServiceFactory {
  constructor(private database: IDatabaseService) {}

  createUserService(): UserService {
    return new UserService(this.database);
  }

  createQuestionService(): QuestionService {
    return new QuestionService(this.database);
  }

  createTopicService(): TopicService {
    return new TopicService(this.database);
  }
}
