/**
 * ICategoryRepository
 * Interface for category repository abstraction
 */

export interface ICategoryRepository {
  getCategoryById(id: string): Promise<Category | null>;
  getAllCategories(): Promise<Category[]>;
  createCategory(data: CategoryInput): Promise<Category>;
  updateCategory(id: string, data: CategoryInput): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface CategoryInput {
  name: string;
  description?: string;
}
