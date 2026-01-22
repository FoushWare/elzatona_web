/**
 * PostgreSQLProgressRepository
 * Implements IProgressRepository for PostgreSQL
 */

import {
  IProgressRepository,
  Progress,
  ProgressInput,
} from "../../repositories/interfaces/IProgressRepository";
import {
  BasePostgreSQLAdapter,
  PostgreSQLConfig,
} from "./BasePostgreSQLAdapter";

export class PostgreSQLProgressRepository
  extends BasePostgreSQLAdapter
  implements IProgressRepository
{
  constructor(config: PostgreSQLConfig) {
    super(config);
  }

  async getProgressById(id: string): Promise<Progress | null> {
    const { data, error } = await this.client
      .from("progress")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data || null;
  }

  async getAllProgress(): Promise<Progress[]> {
    const { data, error } = await this.client.from("progress").select("*");
    if (error) throw error;
    return data || [];
  }

  async createProgress(data: ProgressInput): Promise<Progress> {
    const { data: created, error } = await this.client
      .from("progress")
      .insert([
        {
          user_id: data.userId,
          flashcard_id: data.flashcardId,
          status: data.status,
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return created;
  }

  async updateProgress(id: string, data: ProgressInput): Promise<Progress> {
    const { data: updated, error } = await this.client
      .from("progress")
      .update({
        user_id: data.userId,
        flashcard_id: data.flashcardId,
        status: data.status,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return updated;
  }

  async deleteProgress(id: string): Promise<void> {
    const { error } = await this.client.from("progress").delete().eq("id", id);
    if (error) throw error;
  }
}
