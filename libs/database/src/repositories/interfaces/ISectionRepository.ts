/**
 * ISectionRepository
 * Interface for section repository abstraction
 */

export interface ISectionRepository {
  getSectionById(id: string): Promise<Section | null>;
  getAllSections(): Promise<Section[]>;
  createSection(data: SectionInput): Promise<Section>;
  updateSection(id: string, data: SectionInput): Promise<Section>;
  deleteSection(id: string): Promise<void>;
}

export interface Section {
  id: string;
  name: string;
  topicId: string;
  description?: string;
}

export interface SectionInput {
  name: string;
  topicId: string;
  description?: string;
}
