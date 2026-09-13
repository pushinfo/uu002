"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trafficSeries } from "@/lib/mock-data";

type Range = 7 | 14;

export function TrafficChart() {
  const [range, setRange] = useState<Range>(14);
  const data = useMemo(() => trafficSeries.slice(-range), [range]);

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <CardTitle>访问趋势</CardTitle>
          <CardDescription>近 {range} 日访问量与新注册对照</CardDescription>
        </div>
        <div className="flex rounded-lg border border-border p-0.5">
          {([7, 14] as const).map((value) => (
            <Button
              key={value}
              size="sm"
              variant={range === value ? "default" : "ghost"}
              onClick={() => setRange(value)}
            >
              {value} 日
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "var(--muted)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="visits"
                tick={{ fontSize: 12, fill: "var(--muted)" }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <YAxis
                yAxisId="signups"
                orientation="right"
                tick={{ fontSize: 12, fill: "var(--muted)" }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Area
                yAxisId="visits"
                type="monotone"
                dataKey="visits"
                name="访问"
                stroke="#4f46e5"
                fill="url(#visitsFill)"
                strokeWidth={2}
              />
              <Area
                yAxisId="signups"
                type="monotone"
                dataKey="signups"
                name="注册"
                stroke="#0d9488"
                fill="transparent"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
