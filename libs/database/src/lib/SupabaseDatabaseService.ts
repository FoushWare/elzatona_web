// Supabase Database Service Implementation
// v1.0 - Supabase PostgreSQL implementation of IDatabaseService

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  IDatabaseService,
  DatabaseConfig,
  QueryOptions,
  DatabaseResult,
  BatchResult,
} from './IDatabaseService';

export class SupabaseDatabaseService implements IDatabaseService {
  private client: SupabaseClient;
  private serviceRoleClient?: SupabaseClient;

  constructor(config: DatabaseConfig) {
    this.client = createClient(config.url, config.key);

    if (config.serviceRoleKey) {
      this.serviceRoleClient = createClient(config.url, config.serviceRoleKey);
    }
  }

  async get<T>(table: string, id: string): Promise<T | null> {
    try {
      const { data, error } = await this.client
        .from(table)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No rows found
        }
        throw error;
      }

      return data as T;
    } catch (error) {
      console.error('Supabase get error:', error);
      throw error;
    }
  }

  async getAll<T>(table: string, filters?: Record<string, any>): Promise<T[]> {
    try {
      let query = this.client.from(table).select('*');

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (
            typeof value === 'object' &&
            value &&
            'operator' in value &&
            'value' in value
          ) {
            // Handle advanced filters with operators
            const filterValue = value as { operator: string; value: any };
            (query as any)[filterValue.operator](key, filterValue.value);
          } else {
            query = query.eq(key, value);
          }
        });
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data as T[]) || [];
    } catch (error) {
      console.error('Supabase getAll error:', error);
      throw error;
    }
  }

  async add<T>(table: string, data: Omit<T, 'id'>): Promise<T> {
    try {
      const { data: result, error } = await this.client
        .from(table)
        .insert({
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return result as T;
    } catch (error) {
      console.error('Supabase add error:', error);
      throw error;
    }
  }

  async update<T>(table: string, id: string, data: Partial<T>): Promise<T> {
    try {
      const { data: result, error } = await this.client
        .from(table)
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result as T;
    } catch (error) {
      console.error('Supabase update error:', error);
      throw error;
    }
  }

  async delete(table: string, id: string): Promise<void> {
    try {
      const { error } = await this.client.from(table).delete().eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Supabase delete error:', error);
      throw error;
    }
  }

  async query<T>(table: string, filters: Record<string, any>): Promise<T[]> {
    try {
      let query = this.client.from(table).select('*');

      Object.entries(filters).forEach(([key, value]) => {
        if (
          typeof value === 'object' &&
          value &&
          'operator' in value &&
          'value' in value
        ) {
          // Handle advanced filters with operators
          const filterValue = value as { operator: string; value: any };
          (query as any)[filterValue.operator](key, filterValue.value);
        } else {
          query = query.eq(key, value);
        }
      });

      const { data, error } = await query;

      if (error) throw error;
      return (data as T[]) || [];
    } catch (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
  }

  async querySingle<T>(
    table: string,
    filters: Record<string, any>
  ): Promise<T | null> {
    try {
      let query = this.client.from(table).select('*').limit(1);

      Object.entries(filters).forEach(([key, value]) => {
        if (
          typeof value === 'object' &&
          value &&
          'operator' in value &&
          'value' in value
        ) {
          // Handle advanced filters with operators
          const filterValue = value as { operator: string; value: any };
          (query as any)[filterValue.operator](key, filterValue.value);
        } else {
          query = query.eq(key, value);
        }
      });

      const { data, error } = await query;

      if (error) throw error;
      return data && data.length > 0 ? (data[0] as T) : null;
    } catch (error) {
      console.error('Supabase querySingle error:', error);
      throw error;
    }
  }

  async batchAdd<T>(table: string, data: Omit<T, 'id'>[]): Promise<T[]> {
    try {
      const { data: result, error } = await this.client
        .from(table)
        .insert(
          data.map(item => ({
            ...item,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }))
        )
        .select();

      if (error) throw error;
      return result as T[];
    } catch (error) {
      console.error('Supabase batchAdd error:', error);
      throw error;
    }
  }

  async batchUpdate<T>(
    table: string,
    updates: Array<{ id: string; data: Partial<T> }>
  ): Promise<T[]> {
    try {
      const results: T[] = [];

      // Supabase doesn't have native batch update, so we'll do individual updates
      for (const { id, data } of updates) {
        const result = await this.update<T>(table, id, data);
        results.push(result);
      }

      return results;
    } catch (error) {
      console.error('Supabase batchUpdate error:', error);
      throw error;
    }
  }

  async batchDelete(table: string, ids: string[]): Promise<void> {
    try {
      const { error } = await this.client.from(table).delete().in('id', ids);

      if (error) throw error;
    } catch (error) {
      console.error('Supabase batchDelete error:', error);
      throw error;
    }
  }

  async count(table: string, filters?: Record<string, any>): Promise<number> {
    try {
      let query = this.client
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (
            typeof value === 'object' &&
            value &&
            'operator' in value &&
            'value' in value
          ) {
            // Handle advanced filters with operators
            const filterValue = value as { operator: string; value: any };
            (query as any)[filterValue.operator](key, filterValue.value);
          } else {
            query = query.eq(key, value);
          }
        });
      }

      const { count, error } = await query;

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Supabase count error:', error);
      throw error;
    }
  }

  async exists(table: string, id: string): Promise<boolean> {
    try {
      const { data, error } = await this.client
        .from(table)
        .select('id')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return false; // No rows found
        }
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error('Supabase exists error:', error);
      throw error;
    }
  }

  async transaction<T>(
    callback: (service: IDatabaseService) => Promise<T>
  ): Promise<T> {
    try {
      // Supabase doesn't have explicit transaction support in the client library
      // In a real implementation, you might need to use RPC functions or handle this differently
      console.warn(
        'Supabase transaction support is limited. Consider using RPC functions for complex transactions.'
      );
      return await callback(this);
    } catch (error) {
      console.error('Supabase transaction error:', error);
      throw error;
    }
  }

  // Supabase-specific methods
  getClient(): SupabaseClient {
    return this.client;
  }

  getServiceRoleClient(): SupabaseClient | undefined {
    return this.serviceRoleClient;
  }

  // Real-time subscriptions
  subscribe<T>(
    table: string,
    callback: (payload: any) => void,
    filters?: Record<string, any>
  ) {
    let subscription = this.client
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
          filter: filters
            ? Object.keys(filters)
                .map(key => `${key}=eq.${filters[key]}`)
                .join(',')
            : undefined,
        },
        callback
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }
}
