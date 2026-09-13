import { ActivityTable } from "@/components/dashboard/activity-table";
import { ChannelPanel } from "@/components/dashboard/channel-panel";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { TrafficChart } from "@/components/dashboard/traffic-chart";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "概览",
};

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="概览"
        description="今天的运营快照：用户活跃、内容增长与近期操作都集中在这里。"
      />
      <div className="space-y-4">
        <KpiCards />
        <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <TrafficChart />
          <ChannelPanel />
        </div>
        <ActivityTable />
      </div>
    </div>
  );
}
