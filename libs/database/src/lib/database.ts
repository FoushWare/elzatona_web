/* eslint-disable @typescript-eslint/no-explicit-any */
// Database library exports
// This file uses 'any' types for database operations and user data
import { createClient } from "@supabase/supabase-js";

export interface DatabaseConfig {
  url: string;
  anonKey: string;
}

export class DatabaseClient {
  private client: ReturnType<typeof createClient>;

  constructor(config: DatabaseConfig) {
    this.client = createClient(config.url, config.anonKey);
  }

  getClient() {
    return this.client;
  }

  // User operations
  async getUser(id: string) {
    const { data, error } = await this.client
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  async createUser(userData: any) {
    const { data, error } = await this.client
      .from("users")
      .insert(userData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Question operations
  async getQuestions(filters?: Record<string, any>) {
    let query = this.client.from("questions").select("*");

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value as any);
      });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async createQuestion(questionData: any) {
    const { data, error } = await this.client
      .from("questions")
      .insert(questionData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteQuestion(id: string) {
    const { error } = await this.client.from("questions").delete().eq("id", id);

    if (error) throw error;
  }
}

export const createDatabaseClient = (config: DatabaseConfig) => {
  return new DatabaseClient(config);
};
