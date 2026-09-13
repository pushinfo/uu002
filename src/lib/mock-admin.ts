export type PermissionKey =
  | "users.read"
  | "users.write"
  | "content.read"
  | "content.write"
  | "orders.read"
  | "orders.write"
  | "roles.write"
  | "audit.read"
  | "system.write";

export type PermissionDef = {
  key: PermissionKey;
  group: string;
  label: string;
};

export type RoleRecord = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  locked?: boolean;
  permissions: PermissionKey[];
};

export type OrderStatus = "pending" | "paid" | "shipped" | "refunded" | "cancelled";

export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: OrderStatus;
  channel: string;
  createdAt: string;
  items: OrderItem[];
  timeline: { label: string; time: string }[];
};

export type AuditAction =
  | "login"
  | "update"
  | "publish"
  | "permission"
  | "export"
  | "delete";

export type AuditEntry = {
  id: string;
  actor: string;
  action: AuditAction;
  summary: string;
  target: string;
  time: string;
  ip: string;
};

export type InboxCategory = "system" | "order" | "review" | "security";

export type InboxMessage = {
  id: string;
  title: string;
  body: string;
  time: string;
  category: InboxCategory;
};

export type SystemConfig = {
  siteName: string;
  publicUrl: string;
  supportEmail: string;
  maintenanceMode: boolean;
  timezone: string;
  sessionHours: number;
  require2fa: boolean;
  allowPasswordLogin: boolean;
  notifyOrders: boolean;
  notifyAudits: boolean;
  webhookUrl: string;
};

export const permissionCatalog: PermissionDef[] = [
  { key: "users.read", group: "用户", label: "查看用户" },
  { key: "users.write", group: "用户", label: "编辑用户" },
  { key: "content.read", group: "内容", label: "查看内容" },
  { key: "content.write", group: "内容", label: "发布 / 编辑内容" },
  { key: "orders.read", group: "订单", label: "查看订单" },
  { key: "orders.write", group: "订单", label: "处理订单 / 退款" },
  { key: "roles.write", group: "权限", label: "管理角色" },
  { key: "audit.read", group: "审计", label: "查看审计日志" },
  { key: "system.write", group: "系统", label: "修改系统配置" },
];

const allPermissions = permissionCatalog.map((item) => item.key);

export const defaultRoles: RoleRecord[] = [
  {
    id: "role-admin",
    name: "超级管理员",
    description: "全部模块的读写权限，不可删除。",
    memberCount: 2,
    locked: true,
    permissions: allPermissions,
  },
  {
    id: "role-editor",
    name: "内容编辑",
    description: "管理内容库，只读查看用户与订单。",
    memberCount: 4,
    permissions: ["users.read", "content.read", "content.write", "orders.read"],
  },
  {
    id: "role-operator",
    name: "运营专员",
    description: "处理订单、查看内容和用户，不能改权限。",
    memberCount: 3,
    permissions: [
      "users.read",
      "content.read",
      "orders.read",
      "orders.write",
      "audit.read",
    ],
  },
  {
    id: "role-viewer",
    name: "只读访客",
    description: "跨模块只读，适合财务或合作方。",
    memberCount: 3,
    permissions: ["users.read", "content.read", "orders.read", "audit.read"],
  },
];

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: "待支付",
  paid: "已支付",
  shipped: "已发货",
  refunded: "已退款",
  cancelled: "已取消",
};

export const orders: Order[] = [
  {
    id: "QS-240913-018",
    customer: "林晓",
    email: "lin.xiao@qingshu.dev",
    amount: 1280,
    status: "paid",
    channel: "官网",
    createdAt: "2026-09-13T09:18:00",
    items: [
      { name: "专业版席位 · 年付", quantity: 1, price: 980 },
      { name: "加急开通", quantity: 1, price: 300 },
    ],
    timeline: [
      { label: "创建订单", time: "09-13 09:18" },
      { label: "支付成功", time: "09-13 09:21" },
    ],
  },
  {
    id: "QS-240913-017",
    customer: "王思远",
    email: "siyuan.wang@qingshu.dev",
    amount: 2460,
    status: "shipped",
    channel: "企业合同",
    createdAt: "2026-09-13T08:02:00",
    items: [{ name: "增长投放服务包", quantity: 2, price: 1230 }],
    timeline: [
      { label: "创建订单", time: "09-13 08:02" },
      { label: "支付成功", time: "09-13 08:10" },
      { label: "已发货", time: "09-13 10:40" },
    ],
  },
  {
    id: "QS-240912-044",
    customer: "Maya Chen",
    email: "maya.chen@qingshu.dev",
    amount: 680,
    status: "pending",
    channel: "官网",
    createdAt: "2026-09-12T21:36:00",
    items: [{ name: "素材加购包", quantity: 1, price: 680 }],
    timeline: [{ label: "创建订单", time: "09-12 21:36" }],
  },
  {
    id: "QS-240912-031",
    customer: "赵晴",
    email: "zhao.qing@qingshu.dev",
    amount: 198,
    status: "cancelled",
    channel: "活动页",
    createdAt: "2026-09-12T16:12:00",
    items: [{ name: "单篇加急审核", quantity: 1, price: 198 }],
    timeline: [
      { label: "创建订单", time: "09-12 16:12" },
      { label: "用户取消", time: "09-12 16:40" },
    ],
  },
  {
    id: "QS-240911-088",
    customer: "Jordan Lee",
    email: "jordan.lee@qingshu.dev",
    amount: 5600,
    status: "paid",
    channel: "企业合同",
    createdAt: "2026-09-11T11:05:00",
    items: [{ name: "团队席位 × 10", quantity: 1, price: 5600 }],
    timeline: [
      { label: "创建订单", time: "09-11 11:05" },
      { label: "对公到账", time: "09-11 17:22" },
    ],
  },
  {
    id: "QS-240910-015",
    customer: "苏晚",
    email: "su.wan@qingshu.dev",
    amount: 890,
    status: "refunded",
    channel: "官网",
    createdAt: "2026-09-10T14:48:00",
    items: [{ name: "视频转码加油包", quantity: 1, price: 890 }],
    timeline: [
      { label: "创建订单", time: "09-10 14:48" },
      { label: "支付成功", time: "09-10 14:49" },
      { label: "全额退款", time: "09-11 09:03" },
    ],
  },
  {
    id: "QS-240908-072",
    customer: "裴嘉树",
    email: "jia.pei@qingshu.dev",
    amount: 320,
    status: "shipped",
    channel: "活动页",
    createdAt: "2026-09-08T19:27:00",
    items: [{ name: "品牌主视觉授权", quantity: 1, price: 320 }],
    timeline: [
      { label: "创建订单", time: "09-08 19:27" },
      { label: "支付成功", time: "09-08 19:29" },
      { label: "已交付", time: "09-09 10:12" },
    ],
  },
  {
    id: "QS-240905-009",
    customer: "Noah Park",
    email: "noah.park@qingshu.dev",
    amount: 1490,
    status: "pending",
    channel: "合作方",
    createdAt: "2026-09-05T10:14:00",
    items: [{ name: "只读席位 × 5", quantity: 1, price: 1490 }],
    timeline: [{ label: "创建订单", time: "09-05 10:14" }],
  },
  {
    id: "QS-240903-121",
    customer: "韩雪",
    email: "han.xue@qingshu.dev",
    amount: 9800,
    status: "paid",
    channel: "企业合同",
    createdAt: "2026-09-03T09:00:00",
    items: [{ name: "年度企业套餐", quantity: 1, price: 9800 }],
    timeline: [
      { label: "创建订单", time: "09-03 09:00" },
      { label: "合同回签", time: "09-03 15:40" },
      { label: "支付成功", time: "09-04 11:18" },
    ],
  },
  {
    id: "QS-240828-054",
    customer: "Ava Romero",
    email: "ava.romero@qingshu.dev",
    amount: 260,
    status: "cancelled",
    channel: "官网",
    createdAt: "2026-08-28T13:55:00",
    items: [{ name: "试用延期", quantity: 1, price: 260 }],
    timeline: [
      { label: "创建订单", time: "08-28 13:55" },
      { label: "超时关闭", time: "08-29 13:55" },
    ],
  },
];

export const auditActionLabels: Record<AuditAction, string> = {
  login: "登录",
  update: "更新",
  publish: "发布",
  permission: "权限",
  export: "导出",
  delete: "删除",
};

export const auditLogs: AuditEntry[] = [
  {
    id: "log-3012",
    actor: "韩雪",
    action: "permission",
    summary: "调整了角色权限",
    target: "运营组 · 只读策略",
    time: "2026-09-13 10:04",
    ip: "203.0.113.18",
  },
  {
    id: "log-3011",
    actor: "林晓",
    action: "publish",
    summary: "发布了文章",
    target: "九月运营节奏说明",
    time: "2026-09-13 09:12",
    ip: "203.0.113.42",
  },
  {
    id: "log-3010",
    actor: "王思远",
    action: "update",
    summary: "更新了活动素材",
    target: "秋季增长投放包",
    time: "2026-09-13 08:40",
    ip: "198.51.100.23",
  },
  {
    id: "log-3009",
    actor: "陈默",
    action: "login",
    summary: "登录控制台",
    target: "青枢控制台",
    time: "2026-09-13 08:01",
    ip: "203.0.113.18",
  },
  {
    id: "log-3008",
    actor: "赵晴",
    action: "update",
    summary: "提交了审核",
    target: "新用户引导文案",
    time: "2026-09-12 21:18",
    ip: "198.51.100.77",
  },
  {
    id: "log-3007",
    actor: "Maya Chen",
    action: "delete",
    summary: "归档了资源",
    target: "Q2 活动回顾视频",
    time: "2026-09-12 18:20",
    ip: "203.0.113.90",
  },
  {
    id: "log-3006",
    actor: "Jordan Lee",
    action: "export",
    summary: "导出了订单明细",
    target: "2026-09 对账表",
    time: "2026-09-12 15:06",
    ip: "198.51.100.10",
  },
  {
    id: "log-3005",
    actor: "苏晚",
    action: "update",
    summary: "修改了系统通知开关",
    target: "订单到账提醒",
    time: "2026-09-11 16:44",
    ip: "203.0.113.61",
  },
  {
    id: "log-3004",
    actor: "裴嘉树",
    action: "publish",
    summary: "上传了插画资源",
    target: "控制台空状态插画",
    time: "2026-09-11 11:02",
    ip: "203.0.113.42",
  },
  {
    id: "log-3003",
    actor: "Noah Park",
    action: "login",
    summary: "登录失败（待审核账号）",
    target: "青枢控制台",
    time: "2026-09-10 09:33",
    ip: "198.51.100.4",
  },
  {
    id: "log-3002",
    actor: "陈默",
    action: "permission",
    summary: "邀请了成员",
    target: "Noah Park",
    time: "2026-09-09 17:20",
    ip: "203.0.113.18",
  },
  {
    id: "log-3001",
    actor: "韩雪",
    action: "export",
    summary: "导出了审计日志",
    target: "近 30 日审计",
    time: "2026-09-08 10:15",
    ip: "203.0.113.18",
  },
];

export const inboxCategoryLabels: Record<InboxCategory, string> = {
  system: "系统",
  order: "订单",
  review: "审核",
  security: "安全",
};

export const inboxMessages: InboxMessage[] = [
  {
    id: "msg-1",
    title: "2 个账号待审核",
    body: "赵晴、Noah Park 等待管理员确认后才能登录。",
    time: "12 分钟前",
    category: "review",
  },
  {
    id: "msg-2",
    title: "订单 QS-240913-018 已支付",
    body: "林晓完成了专业版年付，金额 ¥1,280.00。",
    time: "40 分钟前",
    category: "order",
  },
  {
    id: "msg-3",
    title: "内容审核队列",
    body: "「新用户引导文案」已提交，请编辑组复核。",
    time: "2 小时前",
    category: "review",
  },
  {
    id: "msg-4",
    title: "异常登录提醒",
    body: "Noah Park 从 198.51.100.4 尝试登录未通过的账号。",
    time: "昨天 09:33",
    category: "security",
  },
  {
    id: "msg-5",
    title: "周报已生成",
    body: "上周活跃用户较前一周上升 12.4%，可在概览查看。",
    time: "昨天",
    category: "system",
  },
  {
    id: "msg-6",
    title: "退款已完成",
    body: "订单 QS-240910-015 已全额退回苏晚的原支付渠道。",
    time: "09-11 09:03",
    category: "order",
  },
  {
    id: "msg-7",
    title: "维护窗口通知",
    body: "计划于周日 02:00–03:00 进行只读切换，可在系统配置中关闭。",
    time: "09-10",
    category: "system",
  },
];

export const defaultSystemConfig: SystemConfig = {
  siteName: "青枢控制台",
  publicUrl: "https://console.qingshu.dev",
  supportEmail: "support@qingshu.dev",
  maintenanceMode: false,
  timezone: "Asia/Shanghai",
  sessionHours: 12,
  require2fa: true,
  allowPasswordLogin: true,
  notifyOrders: true,
  notifyAudits: false,
  webhookUrl: "https://hooks.qingshu.dev/ops",
};

export function isWithinDays(isoDate: string, days: number, now = new Date()) {
  const created = new Date(isoDate);
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - days);
  return created.getTime() >= cutoff.getTime();
}
