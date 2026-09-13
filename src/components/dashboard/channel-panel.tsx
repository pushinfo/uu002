import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { channelBreakdown } from "@/lib/mock-data";

export function ChannelPanel() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <CardTitle>流量来源</CardTitle>
          <CardDescription>本周渠道占比（模拟数据）</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {channelBreakdown.map((channel) => (
          <div key={channel.name}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span>{channel.name}</span>
              <span className="text-muted-foreground">{channel.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-black/6 dark:bg-white/8">
              <div
                className="h-full rounded-full"
                style={{ width: `${channel.value}%`, backgroundColor: channel.color }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
