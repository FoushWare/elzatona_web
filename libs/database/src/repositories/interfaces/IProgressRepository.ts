/**
 * IProgressRepository
 * Interface for progress repository abstraction
 */

export interface IProgressRepository {
  getProgressById(id: string): Promise<Progress | null>;
  getAllProgress(): Promise<Progress[]>;
  createProgress(data: ProgressInput): Promise<Progress>;
  updateProgress(id: string, data: ProgressInput): Promise<Progress>;
  deleteProgress(id: string): Promise<void>;
}

export interface Progress {
  id: string;
  userId: string;
  flashcardId: string;
  status: string;
  updatedAt: Date;
}

export interface ProgressInput {
  userId: string;
  flashcardId: string;
  status: string;
}
