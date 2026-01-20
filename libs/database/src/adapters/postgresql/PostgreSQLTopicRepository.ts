/**
 * PostgreSQLTopicRepository
 * Implements ITopicRepository for PostgreSQL
 */

import { ITopicRepository, Topic, TopicInput } from '../../repositories/interfaces/ITopicRepository';
import { Pool } from 'pg';

export class PostgreSQLTopicRepository implements ITopicRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getTopicById(id: string): Promise<Topic | null> {
    const res = await this.pool.query('SELECT * FROM topics WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  async getAllTopics(): Promise<Topic[]> {
    const res = await this.pool.query('SELECT * FROM topics');
    return res.rows;
  }

  async createTopic(data: TopicInput): Promise<Topic> {
    const res = await this.pool.query(
      'INSERT INTO topics (name, category_id, description) VALUES ($1, $2, $3) RETURNING *',
      [data.name, data.categoryId, data.description || null]
    );
    return res.rows[0];
  }

  async updateTopic(id: string, data: TopicInput): Promise<Topic> {
    const res = await this.pool.query(
      'UPDATE topics SET name = $1, category_id = $2, description = $3 WHERE id = $4 RETURNING *',
      [data.name, data.categoryId, data.description || null, id]
    );
    return res.rows[0];
  }

  async deleteTopic(id: string): Promise<void> {
    await this.pool.query('DELETE FROM topics WHERE id = $1', [id]);
  }
}
