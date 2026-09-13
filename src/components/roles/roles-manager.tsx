"use client";

import { useMemo, useState } from "react";
import { Plus, ShieldPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePersistentState } from "@/lib/persistent-state";
import {
  defaultRoles,
  permissionCatalog,
  type PermissionKey,
  type RoleRecord,
} from "@/lib/mock-admin";
import { cn } from "@/lib/utils";

const ROLES_KEY = "qingshu.roles";

export function RolesManager() {
  const [roles, setRoles] = usePersistentState<RoleRecord[]>(ROLES_KEY, defaultRoles);
  const [selectedId, setSelectedId] = useState(defaultRoles[0].id);
  const [creating, setCreating] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [saved, setSaved] = useState(false);

  const selected = roles.find((role) => role.id === selectedId) ?? roles[0];

  const groupedPermissions = useMemo(() => {
    const groups = new Map<string, typeof permissionCatalog>();
    for (const item of permissionCatalog) {
      const current = groups.get(item.group) ?? [];
      current.push(item);
      groups.set(item.group, current);
    }
    return Array.from(groups.entries());
  }, []);

  function togglePermission(roleId: string, key: PermissionKey) {
    setRoles((current) =>
      current.map((role) => {
        if (role.id !== roleId || role.locked) return role;
        const enabled = role.permissions.includes(key);
        return {
          ...role,
          permissions: enabled
            ? role.permissions.filter((item) => item !== key)
            : [...role.permissions, key],
        };
      }),
    );
    flashSaved();
  }

  function createRole() {
    const name = draftName.trim();
    if (!name) return;
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}-]/gu, "");
    const base = `role-${slug || "custom"}`;
    const id = roles.some((role) => role.id === base)
      ? `${base}-${roles.length + 1}`
      : base;
    const next: RoleRecord = {
      id,
      name,
      description: draftDescription.trim() || "自定义角色",
      memberCount: 0,
      permissions: [],
    };
    setRoles((current) => [...current, next]);
    setSelectedId(next.id);
    setDraftName("");
    setDraftDescription("");
    setCreating(false);
    flashSaved();
  }

  function removeRole(roleId: string) {
    const target = roles.find((role) => role.id === roleId);
    if (!target || target.locked) return;
    const remaining = roles.filter((role) => role.id !== roleId);
    setRoles(remaining);
    setSelectedId(remaining[0]?.id ?? defaultRoles[0].id);
    flashSaved();
  }

  function flashSaved() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div>
      <PageHeader
        title="角色与权限"
        description="用权限矩阵分配模块能力。超级管理员锁定；其余角色可在本机模拟创建和编辑。"
        actions={
          <Button onClick={() => setCreating((open) => !open)}>
            <Plus className="size-4" />
            新建角色
          </Button>
        }
      />

      {creating ? (
        <Card className="mb-4">
          <CardContent className="grid gap-3 pt-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">角色名称</span>
              <Input
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                placeholder="例如：审核专员"
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">说明</span>
              <Input
                value={draftDescription}
                onChange={(event) => setDraftDescription(event.target.value)}
                placeholder="可选"
              />
            </label>
            <div className="flex gap-2">
              <Button onClick={createRole} disabled={!draftName.trim()}>
                <ShieldPlus className="size-4" />
                创建
              </Button>
              <Button variant="secondary" onClick={() => setCreating(false)}>
                取消
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="mb-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setSelectedId(role.id)}
            className={cn(
              "rounded-2xl border border-border bg-card px-4 py-3 text-left shadow-[var(--shadow)] transition-colors",
              selected?.id === role.id && "ring-2 ring-ring/40",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold">{role.name}</p>
              {role.locked ? <Badge>系统</Badge> : <Badge tone="muted">自定义</Badge>}
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {role.description}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">{role.memberCount} 名成员</p>
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">权限矩阵</p>
              <p className="text-xs text-muted-foreground">
                勾选即授予该角色对应能力。当前编辑：{selected?.name ?? "—"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {saved ? <p className="text-sm text-success">已保存到本地</p> : null}
              {selected && !selected.locked ? (
                <Button variant="secondary" onClick={() => removeRole(selected.id)}>
                  删除角色
                </Button>
              ) : null}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-48">权限</TableHead>
                {roles.map((role) => (
                  <TableHead key={role.id} className="text-center">
                    {role.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupedPermissions.map(([group, items]) =>
                items.map((permission, index) => (
                  <TableRow key={permission.key}>
                    <TableCell>
                      {index === 0 ? (
                        <p className="mb-0.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                          {group}
                        </p>
                      ) : null}
                      <p>{permission.label}</p>
                    </TableCell>
                    {roles.map((role) => {
                      const checked = role.permissions.includes(permission.key);
                      return (
                        <TableCell key={role.id} className="text-center">
                          <input
                            type="checkbox"
                            className="size-4 accent-primary"
                            checked={checked}
                            disabled={role.locked}
                            aria-label={`${role.name} · ${permission.label}`}
                            onChange={() => togglePermission(role.id, permission.key)}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )),
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
