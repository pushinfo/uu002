"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ThemePreference = "light" | "dark";
export type DensityPreference = "comfortable" | "compact";
export type LanguagePreference = "zh-CN" | "en-US";

export type Preferences = {
  displayName: string;
  email: string;
  title: string;
  language: LanguagePreference;
  theme: ThemePreference;
  density: DensityPreference;
  notifyEmail: boolean;
  weeklyDigest: boolean;
};

export const STORAGE_KEY = "qingshu.preferences";
const CHANGE_EVENT = "qingshu-preferences";

export const defaultPreferences: Preferences = {
  displayName: "陈默",
  email: "chen.mo@qingshu.dev",
  title: "平台管理员",
  language: "zh-CN",
  theme: "light",
  density: "comfortable",
  notifyEmail: true,
  weeklyDigest: true,
};

type PreferencesContextValue = {
  preferences: Preferences;
  updatePreferences: (next: Preferences) => void;
  setTheme: (theme: ThemePreference) => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

let cachedRaw: string | null | undefined;
let cachedValue: Preferences = defaultPreferences;

export function parsePreferences(raw: string | null): Preferences {
  if (!raw) return defaultPreferences;
  try {
    return { ...defaultPreferences, ...JSON.parse(raw) } as Preferences;
  } catch {
    return defaultPreferences;
  }
}

function readPreferences(): Preferences {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  cachedValue = parsePreferences(raw);
  return cachedValue;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

export function applyAppearance(preferences: Preferences) {
  document.documentElement.classList.toggle("dark", preferences.theme === "dark");
  document.body.dataset.density = preferences.density;
}

function persist(next: Preferences) {
  const serialized = JSON.stringify(next);
  window.localStorage.setItem(STORAGE_KEY, serialized);
  cachedRaw = serialized;
  cachedValue = next;
  applyAppearance(next);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const preferences = useSyncExternalStore(
    subscribe,
    readPreferences,
    () => defaultPreferences,
  );

  const updatePreferences = useCallback((next: Preferences) => {
    persist(next);
  }, []);

  const setTheme = useCallback((theme: ThemePreference) => {
    persist({ ...readPreferences(), theme });
  }, []);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      preferences,
      updatePreferences,
      setTheme,
    }),
    [preferences, setTheme, updatePreferences],
  );

  useLayoutEffect(() => {
    applyAppearance(preferences);
  }, [preferences]);

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }
  return context;
}
