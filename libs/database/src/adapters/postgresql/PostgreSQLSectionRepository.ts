/**
 * PostgreSQLSectionRepository
 * Implements ISectionRepository for PostgreSQL
 */

import { ISectionRepository, Section, SectionInput } from '../../repositories/interfaces/ISectionRepository';
import { Pool } from 'pg';

export class PostgreSQLSectionRepository implements ISectionRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getSectionById(id: string): Promise<Section | null> {
    const res = await this.pool.query('SELECT * FROM sections WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  async getAllSections(): Promise<Section[]> {
    const res = await this.pool.query('SELECT * FROM sections');
    return res.rows;
  }

  async createSection(data: SectionInput): Promise<Section> {
    const res = await this.pool.query(
      'INSERT INTO sections (name, topic_id, description) VALUES ($1, $2, $3) RETURNING *',
      [data.name, data.topicId, data.description || null]
    );
    return res.rows[0];
  }

  async updateSection(id: string, data: SectionInput): Promise<Section> {
    const res = await this.pool.query(
      'UPDATE sections SET name = $1, topic_id = $2, description = $3 WHERE id = $4 RETURNING *',
      [data.name, data.topicId, data.description || null, id]
    );
    return res.rows[0];
  }

  async deleteSection(id: string): Promise<void> {
    await this.pool.query('DELETE FROM sections WHERE id = $1', [id]);
  }
}
