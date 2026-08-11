import type { WatchlistItem, WatchlistStats } from "./types.ts";

/**
 * Adds a film to the watchlist.
 * A film already on the list is ignored, so adding twice is harmless.
 */
export function add(list: WatchlistItem[], item: WatchlistItem): WatchlistItem[] {
  if (list.some((existing) => existing.id === item.id)) {
    return list;
  }
  return [...list, item];
}

/** Removes a film from the watchlist. Removing something absent is harmless. */
export function remove(list: WatchlistItem[], id: number): WatchlistItem[] {
  return list.filter((item) => item.id !== id);
}

/** Marks a film as watched. */
export function markWatched(list: WatchlistItem[], id: number): WatchlistItem[] {
  return list.map((item) => (item.id === id ? { ...item, watched: true } : item));
}

/** The films still to watch, best rated first. */
export function unwatched(list: WatchlistItem[]): WatchlistItem[] {
  return list
    .filter((item) => !item.watched)
}

/** Summarises a watchlist: how much is on it, how long it would take, how good it is. */
export function stats(data: WatchlistItem[]): WatchlistStats {
  let runtime = 0;
  let ratingSum = 0;
  let ratedCount = 0;

  for (const item of data) {
    if (typeof item.runtimeMinutes === "number"){
      runtime+= item.runtimeMinutes;
    }
    if (typeof item.rating === "number"){
      ratingSum += item.rating;
      ratedCount ++;
    }
  }
  const averageRating = ratedCount>0? ratingSum/ratedCount:0;

  return {
    total: data.length,
    watched: data.filter((item) => item.watched).length,
    unwatched: data.filter((item) => !item.watched).length,
    totalRuntimeMinutes: runtime,
    averageRating: averageRating,
  };
}
/** Removes all watched films from the list */
export function clearWatched (list: WatchlistItem[]): WatchlistItem[]{
  return list.filter((item)=> !item.watched);
}