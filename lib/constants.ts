/**
 * 应用常量定义
 * Application constants
 */

// 应用配置
export const APP_CONFIG = {
  name: '中国女排意大利联赛追踪',
  shortName: 'VB Stats',
  description: 'Serie A1 球员数据追踪系统',
  version: '2.0.0',
} as const;

// 路由路径
export const ROUTES = {
  HOME: '/',
  PLAYERS: '/players',
  PLAYER_DETAIL: (id: string) => `/players/${id}`,
  MATCHES: '/matches',
  MATCH_DETAIL: (id: string) => `/matches/${id}`,
  STATS: '/stats',
} as const;

// 球员数据
export const PLAYERS = {
  ZHUANG_YUSHAN: {
    id: 2,
    name: '庄宇珊',
    enName: 'Zhuang Yushan',
    team: 'San Giovanni',
    position: '接应',
    number: 5,
    height: '1.88m',
  },
  ZHU_TING: {
    id: 1,
    name: '朱婷',
    enName: 'Zhu Ting',
    team: 'Scandicci',
    position: '主攻',
    number: 11,
    height: '1.98m',
  },
} as const;

// 位置信息
export const POSITIONS = {
  OH: '主攻',
  OP: '接应',
  MB: '副攻',
  S: '二传',
  L: '自由人',
} as const;

// 图表配置
export const CHART_COLORS = {
  PRIMARY: '#007AFF',
  SECONDARY: '#5856D6',
  TERTIARY: '#64D2FF',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  DANGER: '#FF3B30',
  GRADIENT_BLUE: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
  GRADIENT_PURPLE: 'linear-gradient(135deg, #5856D6 0%, #AF52DE 100%)',
  GRADIENT_OCEAN: 'linear-gradient(135deg, #0A84FF 0%, #64D2FF 100%)',
} as const;

// 动画时长
export const ANIMATION_DURATION = {
  FAST: 0.15,
  NORMAL: 0.25,
  SLOW: 0.35,
  SLOWER: 0.5,
} as const;

// 缓动函数
export const EASING = {
  STANDARD: [0.4, 0.0, 0.2, 1],
  DECELERATE: [0.0, 0.0, 0.2, 1],
  ACCELERATE: [0.4, 0.0, 1, 1],
  SPRING: [0.175, 0.885, 0.32, 1.275],
} as const;

// 响应式断点
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// 数据刷新间隔
export const REFRESH_INTERVAL = {
  FAST: 30000, // 30s
  NORMAL: 60000, // 1min
  SLOW: 300000, // 5min
} as const;
