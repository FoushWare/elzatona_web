/**
 * PostgreSQLTopicRepository
 * Implements ITopicRepository for PostgreSQL
 */

import {
  ITopicRepository,
  Topic,
  TopicInput,
} from "../../repositories/interfaces/ITopicRepository";
import {
  BasePostgreSQLAdapter,
  PostgreSQLConfig,
} from "./BasePostgreSQLAdapter";

export class PostgreSQLTopicRepository
  extends BasePostgreSQLAdapter
  implements ITopicRepository
{
  constructor(config: PostgreSQLConfig) {
    super(config);
  }

  async getTopicById(id: string): Promise<Topic | null> {
    const { data, error } = await this.client
      .from("topics")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data || null;
  }

  async getAllTopics(): Promise<Topic[]> {
    const { data, error } = await this.client.from("topics").select("*");
    if (error) throw error;
    return data || [];
  }

  async createTopic(data: TopicInput): Promise<Topic> {
    const { data: created, error } = await this.client
      .from("topics")
      .insert([
        {
          name: data.name,
          category_id: data.categoryId,
          description: data.description || null,
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return created;
  }

  async updateTopic(id: string, data: TopicInput): Promise<Topic> {
    const { data: updated, error } = await this.client
      .from("topics")
      .update({
        name: data.name,
        category_id: data.categoryId,
        description: data.description || null,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return updated;
  }

  async deleteTopic(id: string): Promise<void> {
    const { error } = await this.client.from("topics").delete().eq("id", id);
    if (error) throw error;
  }
}
