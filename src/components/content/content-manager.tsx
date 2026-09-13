"use client";

import { useMemo, useState } from "react";
import { FileText, Film, ImageIcon, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import {
  resourceStatusLabels,
  resourceTypeLabels,
  resources,
  type ResourceStatus,
  type ResourceType,
} from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

const typeIcons = {
  article: FileText,
  image: ImageIcon,
  video: Film,
};

const statusTones = {
  published: "success",
  draft: "warning",
  archived: "muted",
} as const;

export function ContentManager() {
  const loading = useSimulatedLoading();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ResourceType | "all">("all");
  const [status, setStatus] = useState<ResourceStatus | "all">("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return resources.filter((item) => {
      const matchesQuery =
        !normalized ||
        item.title.toLowerCase().includes(normalized) ||
        item.owner.toLowerCase().includes(normalized);
      const matchesType = type === "all" || item.type === type;
      const matchesStatus = status === "all" || item.status === status;
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [query, type, status]);

  return (
    <div>
      <PageHeader
        title="内容 / 资源"
        description="管理文章、图片和视频素材。筛选结果为空时会展示占位状态。"
        actions={<Button variant="secondary">上传资源</Button>}
      />

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索标题或负责人"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select
            value={type}
            onChange={(event) => setType(event.target.value as ResourceType | "all")}
            aria-label="按类型筛选"
          >
            <option value="all">全部类型</option>
            {Object.entries(resourceTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value as ResourceStatus | "all")}
            aria-label="按发布状态筛选"
          >
            <option value="all">全部状态</option>
            {Object.entries(resourceStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-44 w-full rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="没有找到资源"
          description="当前筛选条件下没有内容。清空关键词或换一组类型 / 状态。"
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("");
                setType("all");
                setStatus("all");
              }}
            >
              重置筛选
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => {
            const Icon = typeIcons[item.type];
            return (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="pt-5">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Icon className="size-4" />
                    </div>
                    <Badge tone={statusTones[item.status]}>
                      {resourceStatusLabels[item.status]}
                    </Badge>
                  </div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {resourceTypeLabels[item.type]} · {item.owner}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatNumber(item.views)} 次浏览</span>
                    <span>{item.updatedAt}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
