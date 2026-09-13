"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { usePreferences } from "@/providers/preferences-provider";

type SidebarProps = {
  onNavigate?: () => void;
};

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { preferences } = usePreferences();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Sparkles className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-sidebar-strong">青枢</p>
          <p className="text-[11px] tracking-wide text-sidebar-foreground/80">
            管理控制台
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="px-3 pb-2 text-[11px] font-medium tracking-[0.16em] text-sidebar-foreground/60 uppercase">
          平台
        </p>
        {navItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-strong shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                  : "hover:bg-white/4 hover:text-sidebar-strong",
              )}
            >
              <Icon className={cn("size-4", active && "text-primary")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/8 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent px-3 py-2.5">
          <Avatar name={preferences.displayName} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-sidebar-strong">
              {preferences.displayName}
            </p>
            <p className="truncate text-xs text-sidebar-foreground">
              {preferences.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
