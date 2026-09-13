import {
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
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
    href: "/content",
    label: "内容 / 资源",
    description: "文章、媒体与素材库",
    icon: FolderKanban,
  },
  {
    href: "/settings",
    label: "设置",
    description: "个人资料与偏好",
    icon: Settings,
  },
];

export function getNavItem(pathname: string) {
  if (pathname === "/") return navItems[0];
  return navItems.find((item) => item.href !== "/" && pathname.startsWith(item.href));
}
