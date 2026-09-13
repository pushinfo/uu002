"use client";

import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import { defaultSystemConfig, type SystemConfig } from "@/lib/mock-admin";
import { usePersistentState } from "@/lib/persistent-state";

const STORAGE_KEY = "qingshu.system-config";

export function SystemConfigForm() {
  const [config, setConfig] = usePersistentState<SystemConfig>(
    STORAGE_KEY,
    defaultSystemConfig,
  );
  const [draft, setDraft] = useState<SystemConfig | null>(null);
  const [saved, setSaved] = useState(false);
  const form = draft ?? config;

  function patch(partial: Partial<SystemConfig>) {
    setDraft({ ...form, ...partial });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setConfig(form);
    setDraft(null);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  }

  return (
    <div>
      <PageHeader
        title="系统配置"
        description="站点信息、安全策略与通知投递。保存后写入浏览器 localStorage，不请求后端。"
      />

      <form onSubmit={onSubmit} className="grid gap-4">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>站点</CardTitle>
              <CardDescription>对外展示名称、入口与维护开关。</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">站点名称</span>
              <Input
                value={form.siteName}
                onChange={(event) => patch({ siteName: event.target.value })}
                required
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">公开地址</span>
              <Input
                value={form.publicUrl}
                onChange={(event) => patch({ publicUrl: event.target.value })}
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">支持邮箱</span>
              <Input
                type="email"
                value={form.supportEmail}
                onChange={(event) => patch({ supportEmail: event.target.value })}
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">时区</span>
              <Select
                value={form.timezone}
                onChange={(event) => patch({ timezone: event.target.value })}
              >
                <option value="Asia/Shanghai">Asia/Shanghai</option>
                <option value="UTC">UTC</option>
                <option value="America/Los_Angeles">America/Los_Angeles</option>
              </Select>
            </label>
            <label className="flex items-center justify-between gap-3 text-sm md:col-span-2">
              <span>维护模式（前台只读提示）</span>
              <input
                type="checkbox"
                className="size-4 accent-primary"
                checked={form.maintenanceMode}
                onChange={(event) => patch({ maintenanceMode: event.target.checked })}
              />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>安全</CardTitle>
              <CardDescription>会话时长与登录策略，仅作控制台演示。</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">会话有效期（小时）</span>
              <Input
                type="number"
                min={1}
                max={72}
                value={form.sessionHours}
                onChange={(event) =>
                  patch({ sessionHours: Number(event.target.value) || 1 })
                }
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-sm md:col-span-2">
              <span>管理员强制二次验证</span>
              <input
                type="checkbox"
                className="size-4 accent-primary"
                checked={form.require2fa}
                onChange={(event) => patch({ require2fa: event.target.checked })}
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-sm md:col-span-2">
              <span>允许密码登录</span>
              <input
                type="checkbox"
                className="size-4 accent-primary"
                checked={form.allowPasswordLogin}
                onChange={(event) => patch({ allowPasswordLogin: event.target.checked })}
              />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>通知</CardTitle>
              <CardDescription>订单与审计事件的投递开关。</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">Webhook</span>
              <Input
                value={form.webhookUrl}
                onChange={(event) => patch({ webhookUrl: event.target.value })}
                placeholder="https://"
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-sm">
              <span>订单状态变更通知</span>
              <input
                type="checkbox"
                className="size-4 accent-primary"
                checked={form.notifyOrders}
                onChange={(event) => patch({ notifyOrders: event.target.checked })}
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-sm">
              <span>敏感审计事件通知</span>
              <input
                type="checkbox"
                className="size-4 accent-primary"
                checked={form.notifyAudits}
                onChange={(event) => patch({ notifyAudits: event.target.checked })}
              />
            </label>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit">保存配置</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setDraft(defaultSystemConfig)}
          >
            恢复默认
          </Button>
          {saved ? (
            <p className="inline-flex items-center gap-1.5 text-sm text-success">
              <Check className="size-4" />
              已保存到本地
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
