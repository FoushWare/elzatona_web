/**
 * PostgreSQLCategoryRepository
 * Implements ICategoryRepository for PostgreSQL
 */

import {
  ICategoryRepository,
  Category,
  CategoryInput,
} from "../../repositories/interfaces/ICategoryRepository";
import {
  BasePostgreSQLAdapter,
  PostgreSQLConfig,
} from "./BasePostgreSQLAdapter";

export class PostgreSQLCategoryRepository
  extends BasePostgreSQLAdapter
  implements ICategoryRepository
{
  constructor(config: PostgreSQLConfig) {
    super(config);
  }

  async getCategoryById(id: string): Promise<Category | null> {
    const { data, error } = await this.client
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data || null;
  }

  async getAllCategories(): Promise<Category[]> {
    const { data, error } = await this.client.from("categories").select("*");
    if (error) throw error;
    return data || [];
  }

  async createCategory(data: CategoryInput): Promise<Category> {
    const { data: created, error } = await this.client
      .from("categories")
      .insert([{ name: data.name, description: data.description || null }])
      .select()
      .single();
    if (error) throw error;
    return created;
  }

  async updateCategory(id: string, data: CategoryInput): Promise<Category> {
    const { data: updated, error } = await this.client
      .from("categories")
      .update({ name: data.name, description: data.description || null })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return updated;
  }

  async deleteCategory(id: string): Promise<void> {
    const { error } = await this.client
      .from("categories")
      .delete()
      .eq("id", id);
    if (error) throw error;
  }
}
