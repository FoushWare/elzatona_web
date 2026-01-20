/**
 * PostgreSQLProgressRepository
 * Implements IProgressRepository for PostgreSQL
 */

import { IProgressRepository, Progress, ProgressInput } from '../../repositories/interfaces/IProgressRepository';
import { Pool } from 'pg';

export class PostgreSQLProgressRepository implements IProgressRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getProgressById(id: string): Promise<Progress | null> {
    const res = await this.pool.query('SELECT * FROM progress WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  async getAllProgress(): Promise<Progress[]> {
    const res = await this.pool.query('SELECT * FROM progress');
    return res.rows;
  }

  async createProgress(data: ProgressInput): Promise<Progress> {
    const res = await this.pool.query(
      'INSERT INTO progress (user_id, flashcard_id, status) VALUES ($1, $2, $3) RETURNING *',
      [data.userId, data.flashcardId, data.status]
    );
    return res.rows[0];
  }

  async updateProgress(id: string, data: ProgressInput): Promise<Progress> {
    const res = await this.pool.query(
      'UPDATE progress SET user_id = $1, flashcard_id = $2, status = $3 WHERE id = $4 RETURNING *',
      [data.userId, data.flashcardId, data.status, id]
    );
    return res.rows[0];
  }

  async deleteProgress(id: string): Promise<void> {
    await this.pool.query('DELETE FROM progress WHERE id = $1', [id]);
  }
}
