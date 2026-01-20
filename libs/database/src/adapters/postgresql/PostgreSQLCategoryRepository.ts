/**
 * PostgreSQLCategoryRepository
 * Implements ICategoryRepository for PostgreSQL
 */

import {
  ICategoryRepository,
  Category,
  CategoryInput,
} from "../../repositories/interfaces/ICategoryRepository";
import { Pool } from "pg";

export class PostgreSQLCategoryRepository implements ICategoryRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getCategoryById(id: string): Promise<Category | null> {
    const res = await this.pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [id],
    );
    return res.rows[0] || null;
  }

  async getAllCategories(): Promise<Category[]> {
    const res = await this.pool.query("SELECT * FROM categories");
    return res.rows;
  }

  async createCategory(data: CategoryInput): Promise<Category> {
    const res = await this.pool.query(
      "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
      [data.name, data.description || null],
    );
    return res.rows[0];
  }

  async updateCategory(id: string, data: CategoryInput): Promise<Category> {
    const res = await this.pool.query(
      "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [data.name, data.description || null, id],
    );
    return res.rows[0];
  }

  async deleteCategory(id: string): Promise<void> {
    await this.pool.query("DELETE FROM categories WHERE id = $1", [id]);
  }
}
