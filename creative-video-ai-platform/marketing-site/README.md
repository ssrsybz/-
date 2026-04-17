# 创意视频AI平台 - 营销官网

基于 Next.js 16 (App Router) 构建的 SEO 友好营销官网。

## 技术栈

- **框架**: Next.js 16.1.6 (App Router + Turbopack)
- **UI 框架**: React 19.2.3
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **图标**: Lucide React
- **语言**: TypeScript

## 项目结构

```
marketing-site/
├── app/                          # Next.js App Router
│   ├── about/page.tsx           # 关于我们页面
│   ├── features/page.tsx        # 功能介绍页面
│   ├── pricing/page.tsx         # 定价页面
│   ├── layout.tsx               # 全局布局（含 SEO 元数据）
│   ├── page.tsx                 # 首页
│   └── globals.css              # 全局样式
├── components/                   # React 组件
│   ├── AboutPage.tsx            # 关于我们页面内容
│   ├── Button.tsx               # 可复用按钮组件
│   ├── FeaturesPage.tsx         # 功能介绍页面内容
│   ├── Footer.tsx               # 页脚组件
│   ├── Header.tsx               # 导航头部组件
│   ├── HomePage.tsx             # 首页内容
│   └── PricingPage.tsx          # 定价页面内容
└── public/                      # 静态资源
```

## 页面说明

### 首页 (/)
- 产品核心价值主张
- 四大核心功能亮点
- 支持平台展示
- 用户数据统计

### 功能介绍页 (/features)
- 多平台封面适配
- AI 智能创作
- 预览审核流程
- 点击率预测
- 完整工作流程

### 定价页 (/pricing)
- 免费版（永久免费）
- 专业版（¥299/月）
- 年度测试套餐（¥50,000/年，100个封面）
- 常见问题

### 关于我们页 (/about)
- 公司使命与愿景
- 核心价值观
- 团队介绍
- 联系方式

## SEO 优化

- ✅ 使用 Next.js Metadata API 设置页面标题、描述、关键词
- ✅ 结构化数据（JSON-LD）用于搜索引擎理解
- ✅ Open Graph 标签用于社交媒体分享
- ✅ Twitter Card 标签
- ✅ 语义化 HTML 结构
- ✅ 移动端响应式设计

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 运行项目

开发服务器已启动，访问：
- 本地: http://localhost:3000
- 网络: http://192.168.201.37:3000

## 部署建议

### Vercel（推荐）
```bash
npm install -g vercel
vercel
```

### 其他平台
1. 构建项目：`npm run build`
2. 部署 `.next` 文件夹和 `public` 文件夹
3. 配置 Node.js 环境

## 配置修改

### 更新域名
在 `app/layout.tsx` 中修改：
```typescript
metadataBase: new URL('https://yourdomain.com'),
```

### Google 验证
在 `app/layout.tsx` 中修改：
```typescript
verification: {
  google: 'your-google-verification-code',
},
```

### Open Graph 图片
将 OG 图片放置在 `public/og-image.png`

## 产品特色

### 会员积分制
- AI 生成功能采用会员积分制
- 免费版每日 5 次 AI 生成
- 付费版获得更多积分额度

### 年度测试套餐
- 价格：¥50,000/年
- 包含：100 个封面点击率测试
- 服务：真人用户真实点击数据 + 详细分析报告

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## License

MIT
