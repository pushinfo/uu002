"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { inboxCategoryLabels, type InboxCategory } from "@/lib/mock-admin";
import { cn } from "@/lib/utils";
import { useInbox } from "@/providers/inbox-provider";

const categoryTones = {
  system: "muted",
  order: "success",
  review: "warning",
  security: "danger",
} as const;

export function InboxCenter() {
  const { messages, unreadCount, isRead, markRead, markAllRead } = useInbox();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [activeId, setActiveId] = useState(messages[0]?.id ?? "");

  const visible = useMemo(
    () =>
      messages.filter((item) => (filter === "all" ? true : !isRead(item.id))),
    [filter, isRead, messages],
  );

  const active = visible.find((item) => item.id === activeId) ?? visible[0];

  return (
    <div>
      <PageHeader
        title="消息 / 通知中心"
        description="站内信按未读过滤。标记已读会写入本地状态，侧栏徽标同步更新。"
        actions={
          <Button variant="secondary" onClick={markAllRead} disabled={unreadCount === 0}>
            全部标为已读
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={filter === "all" ? "default" : "secondary"}
          onClick={() => setFilter("all")}
        >
          全部
        </Button>
        <Button
          size="sm"
          variant={filter === "unread" ? "default" : "secondary"}
          onClick={() => setFilter("unread")}
        >
          未读{unreadCount > 0 ? ` · ${unreadCount}` : ""}
        </Button>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          title={filter === "unread" ? "没有未读消息" : "收件箱是空的"}
          description="新的审核、订单和安全事件会显示在这里。"
          action={
            filter === "unread" ? (
              <Button variant="secondary" onClick={() => setFilter("all")}>
                查看全部
              </Button>
            ) : null
          }
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)]">
          <Card>
            <CardContent className="divide-y divide-border px-0 pt-2">
              {visible.map((item) => {
                const unread = !isRead(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveId(item.id);
                      markRead(item.id);
                    }}
                    className={cn(
                      "flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]",
                      active?.id === item.id && "bg-primary-soft/50",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1.5 size-2 shrink-0 rounded-full",
                        unread ? "bg-primary" : "bg-transparent",
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className={cn("truncate text-sm", unread && "font-semibold")}>
                          {item.title}
                        </p>
                        <span className="shrink-0 text-[11px] text-muted-foreground">
                          {item.time}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5">
              {active ? (
                <div>
                  <Badge tone={categoryTones[active.category as InboxCategory]}>
                    {inboxCategoryLabels[active.category]}
                  </Badge>
                  <h2 className="mt-3 text-lg font-semibold">{active.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{active.time}</p>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {active.body}
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
