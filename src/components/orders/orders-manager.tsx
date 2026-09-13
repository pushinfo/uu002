"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
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
  isWithinDays,
  orderStatusLabels,
  orders,
  type Order,
  type OrderStatus,
} from "@/lib/mock-admin";
import { formatYuan } from "@/lib/utils";

const statusTones = {
  pending: "warning",
  paid: "success",
  shipped: "default",
  refunded: "muted",
  cancelled: "danger",
} as const;

type DateRange = "all" | "7d" | "30d";

export function OrdersManager() {
  const loading = useSimulatedLoading();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [range, setRange] = useState<DateRange>("all");
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesQuery =
        !normalized ||
        order.id.toLowerCase().includes(normalized) ||
        order.customer.toLowerCase().includes(normalized) ||
        order.email.toLowerCase().includes(normalized);
      const matchesStatus = status === "all" || order.status === status;
      const matchesRange =
        range === "all" || isWithinDays(order.createdAt, range === "7d" ? 7 : 30);
      return matchesQuery && matchesStatus && matchesRange;
    });
  }, [query, range, status]);

  function resetFilters() {
    setQuery("");
    setStatus("all");
    setRange("all");
  }

  return (
    <div>
      <PageHeader
        title="订单 / 交易"
        description="按单号、客户、状态和时间范围筛选订单。点击行查看明细抽屉。"
      />

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索单号、客户或邮箱"
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={status}
                onChange={(event) => setStatus(event.target.value as OrderStatus | "all")}
                aria-label="按状态筛选"
              >
                <option value="all">全部状态</option>
                {Object.entries(orderStatusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
              <Select
                value={range}
                onChange={(event) => setRange(event.target.value as DateRange)}
                aria-label="按时间筛选"
              >
                <option value="all">全部时间</option>
                <option value="7d">近 7 日</option>
                <option value="30d">近 30 日</option>
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
              title="没有匹配的订单"
              description="换一个单号或客户，或放宽状态 / 时间范围。"
              action={
                <Button variant="secondary" onClick={resetFilters}>
                  清空筛选
                </Button>
              }
            />
          ) : (
            <>
              <p className="mb-3 text-xs text-muted-foreground">
                共 {filtered.length} 笔订单
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>订单</TableHead>
                    <TableHead>客户</TableHead>
                    <TableHead>金额</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>渠道</TableHead>
                    <TableHead>创建时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((order) => (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer"
                      onClick={() => setSelected(order)}
                    >
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar name={order.customer} />
                          <div>
                            <p>{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{formatYuan(order.amount)}</TableCell>
                      <TableCell>
                        <Badge tone={statusTones[order.status]}>
                          {orderStatusLabels[order.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.channel}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.createdAt.replace("T", " ").slice(0, 16)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>

      <Drawer
        open={Boolean(selected)}
        title={selected?.id ?? "订单详情"}
        description={selected ? `${selected.customer} · ${selected.channel}` : undefined}
        onClose={() => setSelected(null)}
      >
        {selected ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <Badge tone={statusTones[selected.status]}>
                {orderStatusLabels[selected.status]}
              </Badge>
              <p className="text-lg font-semibold">{formatYuan(selected.amount)}</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                商品
              </p>
              <ul className="mt-2 space-y-2">
                {selected.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between rounded-xl bg-background px-3 py-2 text-sm"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatYuan(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                履约时间线
              </p>
              <ol className="mt-2 space-y-2">
                {selected.timeline.map((event) => (
                  <li key={event.label} className="text-sm">
                    <span className="font-medium">{event.label}</span>
                    <span className="ml-2 text-muted-foreground">{event.time}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
