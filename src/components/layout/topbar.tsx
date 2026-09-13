"use client";

import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { getNavItem } from "@/lib/nav";
import { useInbox } from "@/providers/inbox-provider";
import { usePreferences } from "@/providers/preferences-provider";

type TopbarProps = {
  onMenuClick: () => void;
};

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const current = getNavItem(pathname);
  const { preferences, setTheme } = usePreferences();
  const { messages, unreadCount, isRead, markRead } = useInbox();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [query, setQuery] = useState("");

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const next = query.trim();
    router.push(next ? `/users?q=${encodeURIComponent(next)}` : "/users");
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="打开导航"
        onClick={onMenuClick}
      >
        <Menu className="size-4" />
      </Button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">
          {current?.label ?? "青枢"}
        </p>
        <p className="hidden truncate text-xs text-muted-foreground sm:block">
          {current?.description ?? "运营管理控制台"}
        </p>
      </div>

      <form onSubmit={onSearch} className="relative hidden w-72 md:block">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索用户、邮箱…"
          className="pl-9"
          aria-label="搜索用户"
        />
      </form>

      <Button
        variant="ghost"
        size="icon"
        aria-label={preferences.theme === "dark" ? "切换到浅色" : "切换到深色"}
        onClick={() =>
          setTheme(preferences.theme === "dark" ? "light" : "dark")
        }
      >
        {preferences.theme === "dark" ? (
          <Sun className="size-4" />
        ) : (
          <Moon className="size-4" />
        )}
      </Button>

      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          aria-label="通知"
          onClick={() => setOpenNotifications((open) => !open)}
        >
          <Bell className="size-4" />
          {unreadCount > 0 ? (
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
          ) : null}
        </Button>
        {openNotifications ? (
          <div className="absolute top-11 right-0 z-30 w-80 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow)]">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-sm font-semibold">通知</p>
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setOpenNotifications(false)}
              >
                关闭
              </button>
            </div>
            <div className="space-y-2">
              {messages.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="w-full rounded-xl bg-background px-3 py-2.5 text-left"
                  onClick={() => {
                    markRead(item.id);
                    setOpenNotifications(false);
                    router.push("/inbox");
                  }}
                >
                  <p className="text-sm font-medium">
                    {!isRead(item.id) ? (
                      <span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary" />
                    ) : null}
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.body}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{item.time}</p>
                </button>
              ))}
            </div>
            <Link
              href="/inbox"
              onClick={() => setOpenNotifications(false)}
              className="mt-2 block px-1 pt-1 text-xs font-medium text-primary"
            >
              打开通知中心
            </Link>
          </div>
        ) : null}
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <Avatar name={preferences.displayName} size="md" />
      </div>
    </header>
  );
}
