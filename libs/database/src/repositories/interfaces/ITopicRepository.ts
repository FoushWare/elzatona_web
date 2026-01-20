/**
 * ITopicRepository
 * Interface for topic repository abstraction
 */

export interface ITopicRepository {
  getTopicById(id: string): Promise<Topic | null>;
  getAllTopics(): Promise<Topic[]>;
  createTopic(data: TopicInput): Promise<Topic>;
  updateTopic(id: string, data: TopicInput): Promise<Topic>;
  deleteTopic(id: string): Promise<void>;
}

export interface Topic {
  id: string;
  name: string;
  categoryId: string;
  description?: string;
}

export interface TopicInput {
  name: string;
  categoryId: string;
  description?: string;
}
