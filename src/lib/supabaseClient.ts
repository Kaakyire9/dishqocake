import { getSupabaseServerClient as getSupabaseServer } from './supabaseServer';

type QueryResult<T> = { data: T[] | null; error: unknown | null };

// Return a typed subset for a given table. This wraps the dynamic client and provides
// typed select/insert/update/delete helpers.
export function typedFrom<T>(table: string): {
  select(): Promise<QueryResult<T>>;
  insert(rows: T[]): Promise<QueryResult<T>>;
  updateById(id: string, patch: Partial<T>): Promise<QueryResult<T>>;
  deleteById(id: string): Promise<QueryResult<T>>;
  update(patch: Partial<T>): Promise<QueryResult<T>>;
  delete(): Promise<QueryResult<T>>;
} {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return {
      async select(): Promise<QueryResult<T>> {
        return { data: null, error: new Error('Supabase not configured') };
      },
      async insert(_rows: T[]): Promise<QueryResult<T>> {
        void _rows;
        return { data: null, error: new Error('Supabase not configured') };
      },
      async update(_patch: Partial<T>): Promise<QueryResult<T>> {
        void _patch;
        return { data: null, error: new Error('Supabase not configured') };
      },
      async delete(): Promise<QueryResult<T>> {
        return { data: null, error: new Error('Supabase not configured') };
      },
      async updateById(_id: string, _patch: Partial<T>): Promise<QueryResult<T>> {
        void _id; void _patch;
        return { data: null, error: new Error('Supabase not configured') };
      },
      async deleteById(_id: string): Promise<QueryResult<T>> {
        void _id;
        return { data: null, error: new Error('Supabase not configured') };
      },
    };
  }

  // runtime: client is dynamic. Provide a minimal local interface for the
  // subset of methods we call so we avoid `any` and inline eslint disables.
  // A small chainable builder interface modeling the subset of the supabase-js
  // client call-chain shapes we use. Methods that end a chain return a
  // Promise<QueryResult<T>> while intermediate methods return a builder
  // allowing further chaining.
  type FromBuilder = {
    // select may be chained (to .order) or used as the terminal call after
    // insert/update/delete/eq. We model select as returning the builder so
    // callers can chain .order, and we type .order to produce the final
    // Promise<QueryResult<T>>.
    select: (...args: unknown[]) => FromBuilder;
    order: (col: string, opts?: { ascending?: boolean }) => Promise<QueryResult<T>>;
  };

  type InsertResult = { select: () => Promise<QueryResult<T>> };
  type UpdateResult = { eq: (col: string, val: string) => { select: () => Promise<QueryResult<T>> }; select: () => Promise<QueryResult<T>> };
  type DeleteResult = { eq: (col: string, val: string) => { select: () => Promise<QueryResult<T>> }; select: () => Promise<QueryResult<T>> };

  type ClientLike = {
    from: (table: string) => FromBuilder & {
      insert: (rows: T[]) => InsertResult;
      update: (patch: Partial<T>) => UpdateResult;
      delete: () => DeleteResult;
      eq: (col: string, val: string) => { select: () => Promise<QueryResult<T>> };
    };
  };

  const client = supabase as unknown as ClientLike;

  return {
    async select(): Promise<QueryResult<T>> {
      return (client.from(table).select('*').order('created_at', { ascending: false }) as unknown) as Promise<QueryResult<T>>;
    },
    async insert(rows: T[]): Promise<QueryResult<T>> {
      return (client.from(table).insert(rows).select() as unknown) as Promise<QueryResult<T>>;
    },
    // Backwards-compatible update that returns the updated rows (caller may still call .eq after if they expect a builder)
    async updateById(id: string, patch: Partial<T>): Promise<QueryResult<T>> {
      return (client.from(table).update(patch).eq('id', id).select() as unknown) as Promise<QueryResult<T>>;
    },
    async update(patch: Partial<T>): Promise<QueryResult<T>> {
      return (client.from(table).update(patch).select() as unknown) as Promise<QueryResult<T>>;
    },
    async deleteById(id: string): Promise<QueryResult<T>> {
      return (client.from(table).delete().eq('id', id).select() as unknown) as Promise<QueryResult<T>>;
    },
    async delete(): Promise<QueryResult<T>> {
      return (client.from(table).delete().select() as unknown) as Promise<QueryResult<T>>;
    },
  };
}
