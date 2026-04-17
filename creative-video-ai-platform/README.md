<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# TopCover 指尖封面 AI 助手

创意视频封面 AI 平台 — 使用 React + Vite 构建的视频封面设计工具，支持B站热门视频数据实时采集。

## 项目结构

```
creative-video-ai-platform/
├── creative-video-ai-platform/     # 前端应用 (Vite + React, 端口 3000)
│   ├── components/
│   │   ├── HotReproduction.tsx     # 热点复刻 - B站搜索与数据展示
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── CreationView.tsx
│   │   └── ...
│   ├── contexts/
│   ├── vite.config.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── package.json
│
├── server/                         # API 服务器 (Express + WebSocket, 端口 3001)
│   ├── index.js
│   └── package.json
│
├── 浏览器插件/                      # Chrome 扩展 "B站视频采集器"
│   ├── manifest.json               # Manifest V3
│   ├── background.js               # 服务工作者 - 端口自动发现
│   ├── content.js                  # 内容脚本 - 页面数据提取 + 自动搜索
│   ├── popup.html
│   └── popup.js
│
└── 参考案例/
```

## 快速开始

**前提条件：** Node.js 18+

### 1. 安装前端依赖

```bash
cd creative-video-ai-platform
npm install
```

### 2. 安装 API 服务器依赖

```bash
cd server
npm install
```

### 3. 启动 API 服务器

```bash
cd server
npm start
```

服务器启动后显示：

```
====================================
  B站视频采集 API 服务器已启动
  REST API:  http://localhost:3001
  WebSocket: ws://localhost:3001/ws
====================================
```

### 4. 启动前端应用

```bash
cd creative-video-ai-platform
npm run dev
```

前端运行在 `http://localhost:3000`。

### 5. 安装浏览器插件

1. 打开 Chrome，访问 `chrome://extensions`
2. 开启右上角 **开发者模式**
3. 点击 **加载已解压的扩展程序**
4. 选择项目根目录下的 `浏览器插件` 文件夹

## 使用方式

### 方式一：热点复刻自动搜索（推荐）

1. 打开前端应用 `http://localhost:3000`，进入 **热点复刻** 页面
2. 确认右上角连接状态显示 "已连接"（绿点）
3. 在搜索框输入关键词（如 "AI视频"），点击搜索或按回车
4. 系统自动打开B站搜索页面，插件自动采集数据
5. 几秒后搜索结果自动回传并显示在页面中

### 方式二：手动采集

1. 在B站页面（首页或搜索页）点击插件图标
2. 点击 **采集视频数据** 按钮
3. 采集完成后点击 **发送到本地应用**

## 架构与通信流程

```
┌──────────────────────┐   WebSocket    ┌─────────────────────┐
│  前端 React 应用       │ ◄─────────────► │  API 服务器          │
│  localhost:3000       │                │  localhost:3001      │
│  HotReproduction.tsx  │                │  Express + WebSocket │
└──────────────────────┘                └──────────┬──────────┘
                                                   │ ▲
                                           REST    │ │ REST
                                                   ▼ │
                                          ┌────────────────────┐
                                          │  浏览器插件          │
                                          │  content.js         │
                                          │  (B站页面内运行)      │
                                          └────────────────────┘
```

**自动搜索数据流：**

1. 用户在热点复刻搜索框输入关键词 → 点击搜索
2. 前端通过 WebSocket 发送 `{ type: 'search', keyword }` 到 API 服务器
3. 前端同时打开B站搜索页面 `search.bilibili.com/all?keyword=XXX`
4. 插件 content.js 每 3 秒轮询 `GET /api/pending-search`，发现关键词
5. content.js 等待页面加载完成，提取 **图片、标题、播放量、UP主** 等数据
6. content.js 通过 `POST /api/videos` 将数据发送到 API 服务器
7. API 服务器通过 WebSocket 将结果实时推送给前端
8. HotReproduction 组件即时展示搜索结果

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/health` | 健康检查 |
| `GET` | `/api/pending-search` | 获取待处理的搜索关键词 |
| `POST` | `/api/search` | 提交搜索关键词 `{ "keyword": "..." }` |
| `POST` | `/api/videos` | 接收插件采集的视频数据（JSON 数组） |
| `WS` | `/ws` | WebSocket 实时通信 |

## 提取的数据字段

| 字段 | 说明 |
|------|------|
| `title` | 视频标题 |
| `thumbnail` | 封面图片 URL |
| `views` | 播放量 |
| `author` | UP主名称 |
| `duration` | 视频时长 |
| `url` | 视频链接 |
| `keyword` | 搜索关键词 |
| `danmaku` | 弹幕数 |

## 环境变量

在前端应用根目录创建 `.env.local` 文件：

```
GEMINI_API_KEY=your_gemini_api_key_here
```

## 端口说明

| 服务 | 端口 |
|------|------|
| 前端 Vite 开发服务器 | 3000 |
| API 服务器 | 3001 |

插件会自动探测 API 服务器端口（依次尝试 3001 → 3000 → 3002 → 8080），无需手动配置。
