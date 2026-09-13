"use client";

import { X } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DrawerProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
};

export function Drawer({ open, title, description, onClose, children }: DrawerProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        aria-label="关闭详情"
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border bg-card shadow-[var(--shadow)] transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold">{title}</h2>
            {description ? (
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <Button variant="ghost" size="icon" aria-label="关闭" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </aside>
    </div>
  );
}
