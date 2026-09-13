import { Activity, FilePlus2, HeartPulse, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { kpis } from "@/lib/mock-data";
import { formatNumber, formatPercent } from "@/lib/utils";

const icons = {
  users: Users,
  content: FilePlus2,
  conversion: Activity,
  health: HeartPulse,
};

export function KpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = icons[kpi.id];
        const up = kpi.delta >= 0;
        return (
          <Card key={kpi.id}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">
                    {kpi.isPercent
                      ? formatPercent(kpi.value, kpi.id === "health" ? 2 : 1)
                      : formatNumber(kpi.value)}
                  </p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="size-4" />
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                <span className={up ? "font-medium text-success" : "font-medium text-danger"}>
                  {up ? "+" : ""}
                  {kpi.delta}
                  {kpi.isPercent ? "pp" : "%"}
                </span>{" "}
                {kpi.hint}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
