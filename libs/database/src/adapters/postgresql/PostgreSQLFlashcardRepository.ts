/**
 * PostgreSQLFlashcardRepository
 * Implements IFlashcardRepository for PostgreSQL
 */

import { IFlashcardRepository, Flashcard, FlashcardInput } from '../../repositories/interfaces/IFlashcardRepository';
import { Pool } from 'pg';

export class PostgreSQLFlashcardRepository implements IFlashcardRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getFlashcardById(id: string): Promise<Flashcard | null> {
    const res = await this.pool.query('SELECT * FROM flashcards WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  async getAllFlashcards(): Promise<Flashcard[]> {
    const res = await this.pool.query('SELECT * FROM flashcards');
    return res.rows;
  }

  async createFlashcard(data: FlashcardInput): Promise<Flashcard> {
    const res = await this.pool.query(
      'INSERT INTO flashcards (question, answer, section_id) VALUES ($1, $2, $3) RETURNING *',
      [data.question, data.answer, data.sectionId]
    );
    return res.rows[0];
  }

  async updateFlashcard(id: string, data: FlashcardInput): Promise<Flashcard> {
    const res = await this.pool.query(
      'UPDATE flashcards SET question = $1, answer = $2, section_id = $3 WHERE id = $4 RETURNING *',
      [data.question, data.answer, data.sectionId, id]
    );
    return res.rows[0];
  }

  async deleteFlashcard(id: string): Promise<void> {
    await this.pool.query('DELETE FROM flashcards WHERE id = $1', [id]);
  }
}
