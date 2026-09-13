"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, UserPlus } from "lucide-react";
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
  roleLabels,
  statusLabels,
  users,
  type UserRole,
  type UserStatus,
} from "@/lib/mock-data";

const roleTones = {
  admin: "default",
  editor: "success",
  operator: "warning",
  viewer: "muted",
} as const;

const statusTones = {
  active: "success",
  pending: "warning",
  disabled: "danger",
} as const;

export function UsersManager() {
  const loading = useSimulatedLoading();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [role, setRole] = useState<UserRole | "all">("all");
  const [status, setStatus] = useState<UserStatus | "all">("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return users.filter((user) => {
      const matchesQuery =
        !normalized ||
        user.name.toLowerCase().includes(normalized) ||
        user.email.toLowerCase().includes(normalized) ||
        user.team.toLowerCase().includes(normalized);
      const matchesRole = role === "all" || user.role === role;
      const matchesStatus = status === "all" || user.status === status;
      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [query, role, status]);

  function resetFilters() {
    setQuery("");
    setRole("all");
    setStatus("all");
    router.replace("/users");
  }

  return (
    <div>
      <PageHeader
        title="用户管理"
        description="查看成员、筛选角色状态，并以表格管理账号。当前为前端模拟数据。"
        actions={
          <Button>
            <UserPlus className="size-4" />
            邀请成员
          </Button>
        }
      />

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="按姓名、邮箱或团队搜索"
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={role}
                onChange={(event) => setRole(event.target.value as UserRole | "all")}
                aria-label="按角色筛选"
              >
                <option value="all">全部角色</option>
                {Object.entries(roleLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
              <Select
                value={status}
                onChange={(event) => setStatus(event.target.value as UserStatus | "all")}
                aria-label="按状态筛选"
              >
                <option value="all">全部状态</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3 py-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="没有匹配的用户"
              description="尝试调整搜索关键词，或清空角色 / 状态筛选后再看一次。"
              action={
                <Button variant="secondary" onClick={resetFilters}>
                  清空筛选
                </Button>
              }
            />
          ) : (
            <>
              <p className="mb-3 text-xs text-muted-foreground">
                共 {filtered.length} 位成员
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>用户</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>团队</TableHead>
                    <TableHead>最近活跃</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar name={user.name} />
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge tone={roleTones[user.role]}>{roleLabels[user.role]}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge tone={statusTones[user.status]}>
                          {statusLabels[user.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.team}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.lastActive}
                      </TableCell>
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
