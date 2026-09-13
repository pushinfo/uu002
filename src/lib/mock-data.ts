export type UserRole = "admin" | "editor" | "operator" | "viewer";
export type UserStatus = "active" | "pending" | "disabled";
export type ResourceType = "article" | "image" | "video";
export type ResourceStatus = "published" | "draft" | "archived";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
  team: string;
};

export type Activity = {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
};

export type Resource = {
  id: string;
  title: string;
  type: ResourceType;
  status: ResourceStatus;
  owner: string;
  updatedAt: string;
  views: number;
};

export type TrafficPoint = {
  date: string;
  visits: number;
  signups: number;
};

export const roleLabels: Record<UserRole, string> = {
  admin: "管理员",
  editor: "编辑",
  operator: "运营",
  viewer: "只读",
};

export const statusLabels: Record<UserStatus, string> = {
  active: "正常",
  pending: "待审核",
  disabled: "已停用",
};

export const resourceTypeLabels: Record<ResourceType, string> = {
  article: "文章",
  image: "图片",
  video: "视频",
};

export const resourceStatusLabels: Record<ResourceStatus, string> = {
  published: "已发布",
  draft: "草稿",
  archived: "已归档",
};

export const kpis = [
  {
    id: "users",
    label: "活跃用户",
    value: 12840,
    delta: 12.4,
    hint: "较上周",
    isPercent: false,
  },
  {
    id: "content",
    label: "新增内容",
    value: 386,
    delta: 8.1,
    hint: "近 7 日",
    isPercent: false,
  },
  {
    id: "conversion",
    label: "转化率",
    value: 4.8,
    delta: -0.6,
    hint: "注册 → 激活",
    isPercent: true,
  },
  {
    id: "health",
    label: "系统健康",
    value: 99.95,
    delta: 0.02,
    hint: "可用性",
    isPercent: true,
  },
] as const;

export const channelBreakdown = [
  { name: "搜索", value: 42, color: "#4f46e5" },
  { name: "直接访问", value: 27, color: "#0d9488" },
  { name: "推荐", value: 18, color: "#d97706" },
  { name: "社交", value: 13, color: "#2563eb" },
];

export const trafficSeries: TrafficPoint[] = [
  { date: "08-31", visits: 1840, signups: 46 },
  { date: "09-01", visits: 1920, signups: 51 },
  { date: "09-02", visits: 1764, signups: 39 },
  { date: "09-03", visits: 2108, signups: 58 },
  { date: "09-04", visits: 2486, signups: 72 },
  { date: "09-05", visits: 2310, signups: 64 },
  { date: "09-06", visits: 1988, signups: 49 },
  { date: "09-07", visits: 2214, signups: 61 },
  { date: "09-08", visits: 2560, signups: 78 },
  { date: "09-09", visits: 2742, signups: 83 },
  { date: "09-10", visits: 2618, signups: 76 },
  { date: "09-11", visits: 2894, signups: 91 },
  { date: "09-12", visits: 3021, signups: 97 },
  { date: "09-13", visits: 3180, signups: 104 },
];

export const users: User[] = [
  {
    id: "u-1001",
    name: "陈默",
    email: "chen.mo@qingshu.dev",
    role: "admin",
    status: "active",
    lastActive: "2 分钟前",
    team: "平台",
  },
  {
    id: "u-1002",
    name: "林晓",
    email: "lin.xiao@qingshu.dev",
    role: "editor",
    status: "active",
    lastActive: "18 分钟前",
    team: "内容",
  },
  {
    id: "u-1003",
    name: "王思远",
    email: "siyuan.wang@qingshu.dev",
    role: "operator",
    status: "active",
    lastActive: "1 小时前",
    team: "增长",
  },
  {
    id: "u-1004",
    name: "赵晴",
    email: "zhao.qing@qingshu.dev",
    role: "editor",
    status: "pending",
    lastActive: "昨天",
    team: "内容",
  },
  {
    id: "u-1005",
    name: "Maya Chen",
    email: "maya.chen@qingshu.dev",
    role: "operator",
    status: "active",
    lastActive: "3 小时前",
    team: "增长",
  },
  {
    id: "u-1006",
    name: "Jordan Lee",
    email: "jordan.lee@qingshu.dev",
    role: "viewer",
    status: "active",
    lastActive: "5 小时前",
    team: "财务",
  },
  {
    id: "u-1007",
    name: "周予安",
    email: "yuan.zhou@qingshu.dev",
    role: "editor",
    status: "disabled",
    lastActive: "12 天前",
    team: "内容",
  },
  {
    id: "u-1008",
    name: "韩雪",
    email: "han.xue@qingshu.dev",
    role: "admin",
    status: "active",
    lastActive: "刚刚",
    team: "平台",
  },
  {
    id: "u-1009",
    name: "Noah Park",
    email: "noah.park@qingshu.dev",
    role: "viewer",
    status: "pending",
    lastActive: "从未登录",
    team: "合作方",
  },
  {
    id: "u-1010",
    name: "苏晚",
    email: "su.wan@qingshu.dev",
    role: "operator",
    status: "active",
    lastActive: "昨天",
    team: "增长",
  },
  {
    id: "u-1011",
    name: "裴嘉树",
    email: "jia.pei@qingshu.dev",
    role: "editor",
    status: "active",
    lastActive: "4 小时前",
    team: "内容",
  },
  {
    id: "u-1012",
    name: "Ava Romero",
    email: "ava.romero@qingshu.dev",
    role: "viewer",
    status: "disabled",
    lastActive: "30 天前",
    team: "合作方",
  },
];

export const activities: Activity[] = [
  {
    id: "a-1",
    actor: "林晓",
    action: "发布了文章",
    target: "九月运营节奏说明",
    time: "8 分钟前",
  },
  {
    id: "a-2",
    actor: "韩雪",
    action: "邀请了成员",
    target: "Noah Park",
    time: "26 分钟前",
  },
  {
    id: "a-3",
    actor: "王思远",
    action: "更新了活动素材",
    target: "秋季增长投放包",
    time: "1 小时前",
  },
  {
    id: "a-4",
    actor: "赵晴",
    action: "提交了审核",
    target: "新用户引导文案",
    time: "2 小时前",
  },
  {
    id: "a-5",
    actor: "Maya Chen",
    action: "归档了资源",
    target: "Q2 活动回顾视频",
    time: "昨天 18:20",
  },
  {
    id: "a-6",
    actor: "陈默",
    action: "调整了角色权限",
    target: "运营组 · 只读策略",
    time: "昨天 11:04",
  },
];

export const resources: Resource[] = [
  {
    id: "r-2001",
    title: "九月运营节奏说明",
    type: "article",
    status: "published",
    owner: "林晓",
    updatedAt: "今天 09:12",
    views: 1284,
  },
  {
    id: "r-2002",
    title: "秋季增长投放包",
    type: "image",
    status: "published",
    owner: "王思远",
    updatedAt: "今天 08:40",
    views: 642,
  },
  {
    id: "r-2003",
    title: "新用户引导文案",
    type: "article",
    status: "draft",
    owner: "赵晴",
    updatedAt: "昨天 21:18",
    views: 36,
  },
  {
    id: "r-2004",
    title: "控制台空状态插画",
    type: "image",
    status: "published",
    owner: "裴嘉树",
    updatedAt: "昨天 16:02",
    views: 219,
  },
  {
    id: "r-2005",
    title: "Q2 活动回顾视频",
    type: "video",
    status: "archived",
    owner: "Maya Chen",
    updatedAt: "09-08",
    views: 3104,
  },
  {
    id: "r-2006",
    title: "权限模型一页纸",
    type: "article",
    status: "published",
    owner: "陈默",
    updatedAt: "09-07",
    views: 876,
  },
  {
    id: "r-2007",
    title: "品牌主视觉循环片",
    type: "video",
    status: "draft",
    owner: "苏晚",
    updatedAt: "09-06",
    views: 12,
  },
  {
    id: "r-2008",
    title: "帮助中心封面组",
    type: "image",
    status: "published",
    owner: "林晓",
    updatedAt: "09-05",
    views: 498,
  },
];

export const notifications = [
  {
    id: "n-1",
    title: "2 个账号待审核",
    body: "赵晴、Noah Park 等待管理员确认。",
    time: "12 分钟前",
  },
  {
    id: "n-2",
    title: "内容审核队列",
    body: "「新用户引导文案」已提交。",
    time: "2 小时前",
  },
  {
    id: "n-3",
    title: "周报已生成",
    body: "上周活跃用户较前一周上升 12.4%。",
    time: "昨天",
  },
];
