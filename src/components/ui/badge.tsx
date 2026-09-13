import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      tone: {
        default: "bg-primary-soft text-primary",
        success: "bg-success/12 text-success",
        warning: "bg-warning/12 text-warning",
        danger: "bg-danger/12 text-danger",
        muted: "bg-black/5 text-muted-foreground dark:bg-white/8",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
