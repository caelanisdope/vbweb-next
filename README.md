# 🏐 中国女排意大利联赛数据追踪系统 v2.0

> 基于 Next.js 14 + TypeScript + Tailwind CSS 的现代化排球数据追踪平台  
> 采用苹果设计风格，提供流畅的用户体验

---

## ✨ 特性

### 🎨 设计特色
- **苹果设计风格**：完整的苹果设计系统，包含颜色、字体、动画等
- **流畅动画**：使用 Framer Motion 实现丝滑的过渡效果
- **毛玻璃效果**：现代化的毛玻璃卡片设计
- **响应式布局**：完美适配手机、平板、桌面端

### 📊 功能模块
- **球员信息展示**：详细的球员资料和统计数据
- **比赛数据追踪**：完整的比赛记录和技术统计
- **数据可视化**：ECharts 图表展示得分趋势
- **智能数据洞察**：自动生成数据分析和洞察
- **球员筛选**：快速切换查看不同球员数据
- **赛季统计**：官方赛季统计数据展示

### ⚡ 技术优势
- **Next.js 14**：App Router + Server Components
- **TypeScript**：完整的类型安全
- **性能优化**：图片优化、代码分割、懒加载
- **SEO 友好**：服务端渲染，搜索引擎优化
- **可维护性**：组件化架构，易于扩展

---

## 🚀 快速开始

### 环境要求

- Node.js 18.17 或更高版本
- npm 或 yarn

### 安装

```bash
# 克隆项目
git clone <repository-url>
cd vbweb-next

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
# 构建
npm run build

# 启动生产服务器
npm start
```

---

## 📁 项目结构

```
vbweb-next/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   └── ...                  # 其他页面
│
├── components/              # React组件
│   ├── ui/                 # UI基础组件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Loading.tsx
│   ├── layout/             # 布局组件
│   │   └── Header.tsx
│   ├── features/           # 功能组件
│   │   ├── PlayerCard.tsx
│   │   ├── MatchCard.tsx
│   │   ├── StatsChart.tsx
│   │   ├── PlayerFilter.tsx
│   │   └── SeasonOverview.tsx
│   └── shared/             # 共享组件
│
├── lib/                     # 工具库
│   ├── types.ts            # TypeScript类型定义
│   ├── constants.ts        # 常量
│   ├── utils.ts            # 工具函数
│   └── api.ts              # API客户端
│
├── styles/                  # 样式文件
│   └── globals.css         # 全局样式（苹果风格）
│
├── public/                  # 静态资源
│   └── data/               # 数据文件
│       ├── data.json
│       └── official_season_stats.json
│
└── config/                  # 配置文件
```

---

## 🎨 设计系统

### 颜色体系

```typescript
// 主色调
primary: '#007AFF'      // Apple Blue
secondary: '#5856D6'    // Apple Indigo

// 灰度系统
gray-50: '#F5F5F7'
gray-100: '#E8E8ED'
...
gray-900: '#1D1D1F'

// 语义色
success: '#34C759'      // Apple Green
warning: '#FF9500'      // Apple Orange
error: '#FF3B30'        // Apple Red
```

### 字体系统

```css
font-family: -apple-system, BlinkMacSystemFont, 
             'SF Pro Display', 'SF Pro Text', sans-serif;
```

### 动画曲线

```typescript
EASING = {
  STANDARD: [0.4, 0.0, 0.2, 1],    // 标准缓动
  DECELERATE: [0.0, 0.0, 0.2, 1],  // 减速
  ACCELERATE: [0.4, 0.0, 1, 1],    // 加速
  SPRING: [0.175, 0.885, 0.32, 1.275]  // 弹性
}
```

---

## 📊 数据格式

### 球员数据 (Player)

```typescript
interface Player {
  id: number;
  name: string;          // 中文名
  enName: string;        // 英文名
  team: string;          // 所属球队
  position: string;      // 位置
  number?: number;       // 球衣号码
  height?: string;       // 身高
}
```

### 比赛数据 (Match)

```typescript
interface Match {
  id: string;
  date: string;          // 比赛日期
  round: string;         // 轮次
  playerName: string;    // 球员姓名
  homeTeam: string;      // 主队
  awayTeam: string;      // 客队
  homeScore: number;     // 主队比分
  awayScore: number;     // 客队比分
  playerStats: PlayerStats;  // 球员统计
}
```

---

## 🔧 技术栈

### 核心框架
- **Next.js 14**：React框架
- **React 18**：UI库
- **TypeScript 5**：类型系统

### UI & 样式
- **Tailwind CSS 3**：原子化CSS
- **Framer Motion**：动画库
- **Lucide React**：图标库

### 数据可视化
- **ECharts 5**：图表库
- **echarts-for-react**：React封装

### 工具库
- **date-fns**：日期处理
- **clsx**：类名合并
- **zustand**：状态管理（可选）

---

## 📝 开发指南

### 添加新组件

1. 在 `components/` 目录下创建组件文件
2. 使用 TypeScript 定义 props 类型
3. 遵循苹果设计系统的样式规范
4. 使用 Framer Motion 添加动画

```tsx
// components/ui/MyComponent.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  children: React.ReactNode;
  className?: string;
}

export function MyComponent({ children, className }: MyComponentProps) {
  return (
    <motion.div
      className={cn('base-styles', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
```

### 更新数据

1. 将新的 PDF 文件放入原项目的 `pdfs/` 文件夹
2. 运行解析脚本：`cd ../vbweb && python3 src/pdf_parser.py`
3. 复制生成的 `data.json` 到 Next.js 项目：
   ```bash
   cp ../vbweb/data.json public/data/
   ```
4. 刷新浏览器查看最新数据

### 自定义主题色

在 `tailwind.config.ts` 中修改颜色配置：

```typescript
colors: {
  apple: {
    blue: '#YOUR_COLOR',  // 修改主色调
    // ...
  }
}
```

---

## 🚀 部署

### Vercel（推荐）

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 自动部署完成

### 自定义服务器

```bash
# 构建
npm run build

# 启动
npm start
```

---

## 📈 性能优化

### 已实现
- ✅ 图片自动优化（Next.js Image）
- ✅ 代码分割和懒加载
- ✅ 字体优化
- ✅ CSS精简（Tailwind CSS）
- ✅ 服务端渲染

### 性能指标
- Lighthouse 分数：90+
- 首屏加载：< 2s
- TTI (Time to Interactive)：< 3.5s

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证

MIT License

---

## 📞 联系方式

如有问题或建议，欢迎联系。

**Made with ❤️ for Volleyball Fans**
