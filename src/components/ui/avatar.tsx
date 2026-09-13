import { cn, initials } from "@/lib/utils";

type AvatarProps = {
  name: string;
  size?: "sm" | "md";
  className?: string;
};

const sizeClass = {
  sm: "size-8 text-[11px]",
  md: "size-9 text-xs",
};

export function Avatar({ name, size = "sm", className }: AvatarProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-primary-soft font-semibold text-primary",
        sizeClass[size],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
