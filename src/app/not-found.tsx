import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <EmptyState
      title="页面不存在"
      description="这个地址没有对应的控制台页面。返回概览继续使用。"
      action={
        <Link
          href="/"
          className="inline-flex h-9 items-center rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground"
        >
          回到概览
        </Link>
      }
    />
  );
}
