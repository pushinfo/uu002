import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { activities } from "@/lib/mock-data";

export function ActivityTable() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>近期动态</CardTitle>
          <CardDescription>团队在控制台中的最近操作</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-0 pt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>成员</TableHead>
              <TableHead>操作</TableHead>
              <TableHead>对象</TableHead>
              <TableHead>时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={item.actor} />
                    <span className="font-medium">{item.actor}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.action}</TableCell>
                <TableCell>{item.target}</TableCell>
                <TableCell className="text-muted-foreground">{item.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
