// Minimal type definitions for User repository mock
export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  active?: boolean;
}
export interface CreateUserDTO {
  email: string;
  name: string;
  role?: string;
}
export interface UpdateUserDTO {
  email?: string;
  name?: string;
  role?: string;
  active?: boolean;
}
export interface UserProgress {
  completed: number;
}
export interface UserPreferences {
  theme: string;
}
export interface UserStatistics {
  logins: number;
}
export interface QueryOptions {
  page?: number;
  pageSize?: number;
}
export interface PaginatedResult<T> {
  items: T[];
  total: number;
}
