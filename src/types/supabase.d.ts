declare module '@supabase/supabase-js' {
  export type QueryResult = { data: unknown[] | null; error: unknown | null };

  export type QueryBuilder = {
    select: (cols?: string) => QueryBuilder;
    insert: (rows: unknown[]) => Promise<QueryResult>;
    update: (patch: unknown) => QueryBuilder & { eq: (col: string, val: unknown) => Promise<QueryResult> };
    delete: () => { eq: (col: string, val: unknown) => Promise<QueryResult> };
    order: (col: string, opts?: { ascending?: boolean }) => QueryBuilder | Promise<QueryResult>;
    eq: (col: string, val: unknown) => QueryBuilder;
    // Make the builder awaitable: calling `await builder` returns a QueryResult.
    then?: (onfulfilled?: (value: QueryResult) => unknown, onrejected?: (reason: unknown) => unknown) => Promise<unknown>;
  };

  export type SupabaseClientLite = {
    from: (table: string) => QueryBuilder;
  };

  export function createClient(url: string, key: string): SupabaseClientLite;
}
