import {
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  ScrollText,
  Settings,
  Settings2,
  Shield,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export type NavGroup = {
  id: string;
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    id: "platform",
    label: "平台",
    items: [
      {
        href: "/",
        label: "概览",
        description: "关键指标与近期动态",
        icon: LayoutDashboard,
      },
      {
        href: "/users",
        label: "用户管理",
        description: "成员、角色与账号状态",
        icon: Users,
      },
      {
        href: "/roles",
        label: "角色与权限",
        description: "角色列表与权限矩阵",
        icon: Shield,
      },
      {
        href: "/content",
        label: "内容 / 资源",
        description: "文章、媒体与素材库",
        icon: FolderKanban,
      },
    ],
  },
  {
    id: "ops",
    label: "运营",
    items: [
      {
        href: "/orders",
        label: "订单 / 交易",
        description: "订单检索、状态与明细",
        icon: ShoppingBag,
      },
      {
        href: "/inbox",
        label: "消息 / 通知中心",
        description: "站内信与未读提醒",
        icon: ClipboardList,
      },
    ],
  },
  {
    id: "system",
    label: "系统",
    items: [
      {
        href: "/audit",
        label: "日志 / 审计",
        description: "操作记录与来源 IP",
        icon: ScrollText,
      },
      {
        href: "/system",
        label: "系统配置",
        description: "站点、安全与通知开关",
        icon: Settings2,
      },
      {
        href: "/settings",
        label: "设置",
        description: "个人资料与偏好",
        icon: Settings,
      },
    ],
  },
];

export const navItems: NavItem[] = navGroups.flatMap((group) => group.items);

export function getNavItem(pathname: string) {
  if (pathname === "/") return navItems[0];
  return navItems.find((item) => item.href !== "/" && pathname.startsWith(item.href));
}
