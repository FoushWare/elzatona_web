/**
 * PostgreSQLSectionRepository
 * Implements ISectionRepository for PostgreSQL
 */

import {
  ISectionRepository,
  Section,
  SectionInput,
} from "../../repositories/interfaces/ISectionRepository";
import {
  BasePostgreSQLAdapter,
  PostgreSQLConfig,
} from "./BasePostgreSQLAdapter";

export class PostgreSQLSectionRepository
  extends BasePostgreSQLAdapter
  implements ISectionRepository
{
  constructor(config: PostgreSQLConfig) {
    super(config);
  }

  async getSectionById(id: string): Promise<Section | null> {
    const { data, error } = await this.client
      .from("sections")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data || null;
  }

  async getAllSections(): Promise<Section[]> {
    const { data, error } = await this.client.from("sections").select("*");
    if (error) throw error;
    return data || [];
  }

  async createSection(data: SectionInput): Promise<Section> {
    const { data: created, error } = await this.client
      .from("sections")
      .insert([
        {
          name: data.name,
          topic_id: data.topicId,
          description: data.description || null,
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return created;
  }

  async updateSection(id: string, data: SectionInput): Promise<Section> {
    const { data: updated, error } = await this.client
      .from("sections")
      .update({
        name: data.name,
        topic_id: data.topicId,
        description: data.description || null,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return updated;
  }

  async deleteSection(id: string): Promise<void> {
    const { error } = await this.client.from("sections").delete().eq("id", id);
    if (error) throw error;
  }
}
