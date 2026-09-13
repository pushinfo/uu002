"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/providers/preferences-provider";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { preferences } = usePreferences();

  return (
    <div
      className={cn(
        "min-h-screen bg-background",
        preferences.theme === "dark" && "dark",
      )}
    >
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/5 lg:block">
        <Sidebar />
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          aria-label="关闭导航"
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 w-72 max-w-[84vw] transition-transform duration-200",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </aside>
      </div>

      <div className="lg:pl-64">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="mx-auto w-full max-w-[1360px] px-4 py-6 lg:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
