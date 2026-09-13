"use client";

import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import {
  defaultPreferences,
  usePreferences,
  type Preferences,
} from "@/providers/preferences-provider";

export function SettingsForm() {
  const { preferences, updatePreferences, setTheme } = usePreferences();
  const [draft, setDraft] = useState<Preferences | null>(null);
  const [saved, setSaved] = useState(false);
  const form = draft ?? preferences;

  function patch(partial: Partial<Preferences>) {
    setDraft({ ...form, ...partial });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    updatePreferences({ ...form, theme: preferences.theme });
    setDraft(null);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  }

  return (
    <div>
      <PageHeader
        title="设置"
        description="更新个人资料与界面偏好。更改会立即写入浏览器本地状态，不会请求后端。"
      />

      <form onSubmit={onSubmit} className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>个人资料</CardTitle>
              <CardDescription>这些信息会显示在侧栏和顶栏。</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">显示名称</span>
              <Input
                value={form.displayName}
                onChange={(event) => patch({ displayName: event.target.value })}
                required
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">邮箱</span>
              <Input
                type="email"
                value={form.email}
                onChange={(event) => patch({ email: event.target.value })}
                required
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">职位</span>
              <Input
                value={form.title}
                onChange={(event) => patch({ title: event.target.value })}
              />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>偏好</CardTitle>
              <CardDescription>外观、语言与通知偏好保存在本机。</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">界面语言</span>
              <Select
                value={form.language}
                onChange={(event) =>
                  patch({ language: event.target.value as Preferences["language"] })
                }
              >
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English</option>
              </Select>
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">主题</span>
              <Select
                value={preferences.theme}
                onChange={(event) =>
                  setTheme(event.target.value as Preferences["theme"])
                }
              >
                <option value="light">浅色</option>
                <option value="dark">深色</option>
              </Select>
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">密度</span>
              <Select
                value={form.density}
                onChange={(event) =>
                  patch({ density: event.target.value as Preferences["density"] })
                }
              >
                <option value="comfortable">舒适</option>
                <option value="compact">紧凑</option>
              </Select>
            </label>
            <label className="flex items-center justify-between gap-3 text-sm">
              <span>邮件通知</span>
              <input
                type="checkbox"
                checked={form.notifyEmail}
                onChange={(event) => patch({ notifyEmail: event.target.checked })}
                className="size-4 accent-primary"
              />
            </label>
            <label className="flex items-center justify-between gap-3 text-sm">
              <span>每周摘要</span>
              <input
                type="checkbox"
                checked={form.weeklyDigest}
                onChange={(event) => patch({ weeklyDigest: event.target.checked })}
                className="size-4 accent-primary"
              />
            </label>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center gap-3 xl:col-span-2">
          <Button type="submit">保存更改</Button>
          <Button type="button" variant="secondary" onClick={() => setDraft(defaultPreferences)}>
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
