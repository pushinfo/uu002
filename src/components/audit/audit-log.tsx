"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import {
  auditActionLabels,
  auditLogs,
  type AuditAction,
} from "@/lib/mock-admin";

const actionTones = {
  login: "muted",
  update: "default",
  publish: "success",
  permission: "warning",
  export: "default",
  delete: "danger",
} as const;

export function AuditLog() {
  const loading = useSimulatedLoading();
  const [query, setQuery] = useState("");
  const [action, setAction] = useState<AuditAction | "all">("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return auditLogs.filter((entry) => {
      const matchesQuery =
        !normalized ||
        entry.actor.toLowerCase().includes(normalized) ||
        entry.target.toLowerCase().includes(normalized) ||
        entry.ip.includes(normalized) ||
        entry.summary.toLowerCase().includes(normalized);
      const matchesAction = action === "all" || entry.action === action;
      return matchesQuery && matchesAction;
    });
  }, [action, query]);

  return (
    <div>
      <PageHeader
        title="日志 / 审计"
        description="操作者、动作、对象、时间与来源 IP。用于排查权限变更和导出行为。"
      />

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索操作者、对象或 IP"
                className="pl-9"
              />
            </div>
            <Select
              value={action}
              onChange={(event) => setAction(event.target.value as AuditAction | "all")}
              aria-label="按动作筛选"
            >
              <option value="all">全部动作</option>
              {Object.entries(auditActionLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          {loading ? (
            <div className="space-y-3 py-2">
              {Array.from({ length: 7 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="没有匹配的审计记录"
              description="换一个操作者、对象或动作类型后再试。"
              action={
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQuery("");
                    setAction("all");
                  }}
                >
                  清空筛选
                </Button>
              }
            />
          ) : (
            <>
              <p className="mb-3 text-xs text-muted-foreground">
                共 {filtered.length} 条记录
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>操作者</TableHead>
                    <TableHead>动作</TableHead>
                    <TableHead>对象</TableHead>
                    <TableHead>时间</TableHead>
                    <TableHead>IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar name={entry.actor} />
                          <div>
                            <p className="font-medium">{entry.actor}</p>
                            <p className="text-xs text-muted-foreground">{entry.summary}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge tone={actionTones[entry.action]}>
                          {auditActionLabels[entry.action]}
                        </Badge>
                      </TableCell>
                      <TableCell>{entry.target}</TableCell>
                      <TableCell className="text-muted-foreground">{entry.time}</TableCell>
                      <TableCell className="font-mono text-xs">{entry.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
