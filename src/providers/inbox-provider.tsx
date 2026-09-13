"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { inboxMessages, type InboxMessage } from "@/lib/mock-admin";
import { usePersistentState } from "@/lib/persistent-state";

type InboxState = {
  readIds: string[];
};

const STORAGE_KEY = "qingshu.inbox";
const defaultState: InboxState = { readIds: [] };

type InboxContextValue = {
  messages: InboxMessage[];
  unreadCount: number;
  isRead: (id: string) => boolean;
  markRead: (id: string) => void;
  markAllRead: () => void;
};

const InboxContext = createContext<InboxContextValue | null>(null);

export function InboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = usePersistentState<InboxState>(STORAGE_KEY, defaultState);

  const isRead = useCallback(
    (id: string) => state.readIds.includes(id),
    [state.readIds],
  );

  const markRead = useCallback(
    (id: string) => {
      setState((current) =>
        current.readIds.includes(id)
          ? current
          : { readIds: [...current.readIds, id] },
      );
    },
    [setState],
  );

  const markAllRead = useCallback(() => {
    setState({ readIds: inboxMessages.map((item) => item.id) });
  }, [setState]);

  const value = useMemo<InboxContextValue>(
    () => ({
      messages: inboxMessages,
      unreadCount: inboxMessages.filter((item) => !state.readIds.includes(item.id))
        .length,
      isRead,
      markRead,
      markAllRead,
    }),
    [isRead, markAllRead, markRead, state.readIds],
  );

  return <InboxContext.Provider value={value}>{children}</InboxContext.Provider>;
}

export function useInbox() {
  const context = useContext(InboxContext);
  if (!context) {
    throw new Error("useInbox must be used within InboxProvider");
  }
  return context;
}
