/** A single film on someone's watchlist. */
export type WatchlistItem = {
  id: number;
  title: string;
  year: number;
  /** Null when we do not know the runtime. */
  runtimeMinutes: number | null;
  /** 1 to 10. Null when the user has not rated it yet. */
  rating: number | null;
  watched: boolean;
};

/** A summary of everything on a watchlist. */
export type WatchlistStats = {
  total: number;
  watched: number;
  unwatched: number;
  totalRuntimeMinutes: number;
  averageRating: number;
};
