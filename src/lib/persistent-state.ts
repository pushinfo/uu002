"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

const EVENT_PREFIX = "qingshu-store:";

type CacheEntry = {
  raw: string | null | undefined;
  value: unknown;
};

const cacheByKey = new Map<string, CacheEntry>();

function mergeStored<T>(fallback: T, parsed: unknown): T {
  if (Array.isArray(fallback)) {
    return (Array.isArray(parsed) ? parsed : fallback) as T;
  }
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    return { ...fallback, ...parsed } as T;
  }
  return fallback;
}

function readStore<T>(key: string, fallback: T): T {
  const raw = window.localStorage.getItem(key);
  const cached = cacheByKey.get(key);
  if (cached && cached.raw === raw) {
    return cached.value as T;
  }

  let value = fallback;
  if (raw) {
    try {
      value = mergeStored(fallback, JSON.parse(raw));
    } catch {
      value = fallback;
    }
  }

  cacheByKey.set(key, { raw, value });
  return value;
}

export function usePersistentState<T>(key: string, fallback: T) {
  const fallbackRef = useRef(fallback);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener(EVENT_PREFIX + key, onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener(EVENT_PREFIX + key, onStoreChange);
      };
    },
    [key],
  );

  const getSnapshot = useCallback(
    () => readStore(key, fallbackRef.current),
    [key],
  );

  const getServerSnapshot = useCallback(() => fallbackRef.current, []);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (previous: T) => T)(readStore(key, fallbackRef.current))
          : next;
      const serialized = JSON.stringify(resolved);
      window.localStorage.setItem(key, serialized);
      cacheByKey.set(key, { raw: serialized, value: resolved });
      window.dispatchEvent(new Event(EVENT_PREFIX + key));
    },
    [key],
  );

  return [value, setValue] as const;
}
