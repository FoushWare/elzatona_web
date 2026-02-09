/**
 * PostgreSQLFlashcardRepository
 * Implements IFlashcardRepository for PostgreSQL
 */

import {
  IFlashcardRepository,
  Flashcard,
  FlashcardInput,
} from "../../repositories/interfaces/IFlashcardRepository";
import {
  BasePostgreSQLAdapter,
  PostgreSQLConfig,
} from "./BasePostgreSQLAdapter";

export class PostgreSQLFlashcardRepository
  extends BasePostgreSQLAdapter
  implements IFlashcardRepository
{
  constructor(config: PostgreSQLConfig) {
    super(config);
  }

  async getFlashcardById(id: string): Promise<Flashcard | null> {
    const { data, error } = await this.client
      .from("flashcards")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data || null;
  }

  async getAllFlashcards(): Promise<Flashcard[]> {
    const { data, error } = await this.client.from("flashcards").select("*");
    if (error) throw error;
    return data || [];
  }

  async createFlashcard(data: FlashcardInput): Promise<Flashcard> {
    const { data: created, error } = await this.client
      .from("flashcards")
      .insert([
        {
          question: data.question,
          answer: data.answer,
          section_id: data.sectionId,
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return created;
  }

  async updateFlashcard(id: string, data: FlashcardInput): Promise<Flashcard> {
    const { data: updated, error } = await this.client
      .from("flashcards")
      .update({
        question: data.question,
        answer: data.answer,
        section_id: data.sectionId,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return updated;
  }

  async deleteFlashcard(id: string): Promise<void> {
    const { error } = await this.client
      .from("flashcards")
      .delete()
      .eq("id", id);
    if (error) throw error;
  }
}
