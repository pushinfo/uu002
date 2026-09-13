import { Suspense } from "react";
import { UsersManager } from "@/components/users/users-manager";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "用户管理",
};

function UsersFallback() {
  return (
    <div>
      <PageHeader title="用户管理" description="正在加载成员列表…" />
      <Card>
        <CardContent className="space-y-3 pt-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<UsersFallback />}>
      <UsersManager />
    </Suspense>
  );
}
