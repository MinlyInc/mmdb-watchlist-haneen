import { describe, expect, it } from "vitest";
import { add, markWatched, remove, stats, unwatched } from "./watchlist.ts";
import type { WatchlistItem } from "./types.ts";

function film(overrides: Partial<WatchlistItem> = {}): WatchlistItem {
  return {
    id: 1,
    title: "Arrival",
    year: 2016,
    runtimeMinutes: 116,
    rating: 8,
    watched: false,
    ...overrides,
  };
}

describe("add", () => {
  it("puts a film on an empty list", () => {
    expect(add([], film())).toHaveLength(1);
  });

  it("ignores a film that is already on the list", () => {
    const list = [film({ id: 1 })];
    expect(add(list, film({ id: 1 }))).toHaveLength(1);
  });

  it("does not modify the list it was given", () => {
    const list = [film({ id: 1 })];
    add(list, film({ id: 2 }));
    expect(list).toHaveLength(1);
  });
});

describe("remove", () => {
  it("takes a film off the list", () => {
    const list = [film({ id: 1 }), film({ id: 2 })];
    expect(remove(list, 1).map((f) => f.id)).toEqual([2]);
  });

  it("does nothing when the film is not there", () => {
    const list = [film({ id: 1 })];
    expect(remove(list, 99)).toHaveLength(1);
  });
});

describe("markWatched", () => {
  it("marks the right film", () => {
    const list = [film({ id: 1 }), film({ id: 2 })];
    const after = markWatched(list, 2);
    expect(after.find((f) => f.id === 2)?.watched).toBe(true);
    expect(after.find((f) => f.id === 1)?.watched).toBe(false);
  });
});

describe("unwatched", () => {
  it("returns only the films still to watch", () => {
    const list = [
      film({ id: 1, watched: true }),
      film({ id: 2, watched: false }),
      film({ id: 3, watched: false }),
    ];
    expect(unwatched(list).map((f) => f.id)).toEqual([2, 3]);
  });
});

describe("stats", () => {
  it("counts what is on the list", () => {
    const list = [
      film({ id: 1, watched: true }),
      film({ id: 2, watched: false }),
      film({ id: 3, watched: false }),
    ];
    const result = stats(list);
    expect(result.total).toBe(3);
    expect(result.watched).toBe(1);
    expect(result.unwatched).toBe(2);
  });

  it("adds up the runtime", () => {
    const list = [
      film({ id: 1, runtimeMinutes: 116 }),
      film({ id: 2, runtimeMinutes: 90 }),
    ];
    expect(stats(list).totalRuntimeMinutes).toBe(206);
  });

  it("averages the ratings", () => {
    const list = [
      film({ id: 1, rating: 8 }),
      film({ id: 2, rating: 6 }),
      film({ id: 3, rating: null }),
    ];
    expect(stats(list).averageRating).toBeCloseTo(4.67);
  });
});
