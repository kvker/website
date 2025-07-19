# 污斑兔的个人网站

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.16+-blue.svg)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1+-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

独立开发者污斑兔的个人网站，包含博客系统、应用展示、作品集等功能。采用现代化的技术栈构建，注重用户体验和性能优化。

## ✨ 功能特性

### 🏠 主页展示
- 个人介绍和技能展示
- 作品集展示
- 技术栈介绍
- 联系方式

### 📝 博客系统
- 基于 Markdown 的文章管理
- 自动解析 Front Matter
- 文章分类和标签
- 分页浏览
- 按发布日期排序
- SEO 优化

### 🛠️ 应用集合
- **TODOS** - 待办任务管理系统
  - 任务创建、编辑、删除
  - 状态管理（完成/未完成）
  - 搜索和分页功能
  - 本地存储，数据安全
- **黑白隐藏图** - 图片合并工具
  - 两张同尺寸图片合成
  - 白背景和黑背景不同视觉效果
  - 支持多种图片格式转换
  - 实时预览和背景切换
  - 一键保存合成结果
- **Only U** - 快捷搜索网站
  - 集合各种常见网站的快捷搜索
  - 支持"内容+网站"格式输入
  - 一键进入对应网站的搜索页面
  - 分类管理：综合、购物、视频、设计、学习、生活、开发者、应用市场
  - 无广告，纯净体验
  - **PWA 支持** - 渐进式 Web 应用
    - Web App Manifest 配置
    - 支持安装到桌面/主屏幕
    - 独立窗口模式运行
    - 快捷方式功能（百度、Google、淘宝、B站）
    - 分享目标支持
    - 响应式图标适配
- **SSML Editor** - 极简的SSML编辑器
  - 支持富文本编辑
  - 添加读音标注、时间间隔、数字模式等功能
  - 可导出标准SSML格式文本
  - 适用于语音合成和TTS应用开发
- **HTML转Markdown工具** - 在线HTML转Markdown转换工具
  - 支持多种HTML标签转换（标题、段落、链接、图片、列表、表格等）
  - 实时转换功能，输入即转换
  - 本地处理，保护隐私和数据安全
  - 支持复制结果和下载文件
  - 响应式设计，支持多设备使用
  - 主题切换功能
- 更多应用开发中...

### 📱 响应式设计
- 适配桌面、平板、手机
- 现代化 UI 设计
- 流畅的交互体验

## 🏗️ 项目结构

```
my-website/
├── public/                 # 静态资源目录
│   ├── apps/              # 应用集合
│   │   ├── index.html     # 应用列表页面
│   │   ├── todos/         # TODOS应用
│   │   ├── merge-pictures/ # 黑白隐藏图应用
│   │   ├── only-u/        # Only U快捷搜索应用
│   │   ├── ssml-editor/   # SSML Editor应用
│   │   └── html2md/       # HTML转Markdown工具
│   ├── blogs/             # 博客文章 (Markdown)
│   │   └── 2025/         # 按年份组织
│   ├── styles/            # 全局样式文件
│   ├── scripts/           # 全局脚本文件
│   ├── images/            # 图片资源
│   └── icons/             # 图标资源
├── views/                 # EJS模板文件
│   ├── partials/         # 公共组件
│   │   ├── header.ejs    # 页面头部
│   │   ├── footer.ejs    # 页面底部
│   │   └── meta.ejs      # Meta信息
│   ├── index.ejs         # 主页模板
│   ├── about.ejs         # 关于页面
│   ├── projects.ejs      # 项目展示
│   ├── uses.ejs          # 工具使用
│   ├── articles.ejs      # 文章列表
│   ├── article.ejs       # 文章详情
│   └── error.ejs         # 错误页面
├── routes/                # 路由文件
│   ├── index.js          # 主页路由
│   ├── articles.js       # 文章路由
│   ├── admin.js          # 管理路由
│   └── users.js          # 用户路由
├── bin/                   # 启动脚本
│   └── www               # 服务器启动文件
├── app.js                 # Express应用主文件
├── package.json           # 项目依赖配置
├── tailwind.config.js     # Tailwind配置
├── vercel.json           # Vercel部署配置
├── Dockerfile            # Docker镜像构建文件
├── docker-compose.yml    # Docker Compose配置
├── healthcheck.js        # 健康检查脚本
└── README.md             # 项目说明文档
```

## 🛠️ 技术栈

### 后端技术
- **Node.js** - JavaScript 运行时环境
- **Express.js** - Web 应用框架
- **EJS** - 模板引擎
- **Gray Matter** - Front Matter 解析
- **Marked** - Markdown 转 HTML

### 前端技术
- **HTML5** - 语义化标记
- **CSS3** - 样式设计
- **JavaScript (ES6+)** - 交互逻辑
- **Tailwind CSS** - 原子化 CSS 框架
- **Alpine.js** - 轻量级响应式框架
- **LocalForage** - 本地存储库

### 开发工具
- **Nodemon** - 开发环境自动重启
- **PostCSS** - CSS 后处理器
- **Autoprefixer** - CSS 前缀自动添加

### 部署平台
- **Vercel** - 云函数部署
- **Docker** - 容器化部署支持

## 🚀 快速开始

### 环境要求
- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器
- Docker (可选，用于容器化部署)

### 安装依赖
```bash
# 克隆项目
git clone https://github.com/your-username/my-website.git
cd my-website

# 安装依赖
npm install
```

### 开发环境
```bash
# 启动开发服务器
npm run dev

# 启动TODOS应用开发模式（包含CSS编译）
npm run dev:todos

# 构建CSS
npm run css

# 构建TODOS应用样式
npm run css:todos

# 构建HTML转Markdown工具样式
npm run css:html2md
```

### 生产环境
```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 📝 博客系统使用

### 文章格式
博客文章使用 Markdown 格式，支持 Front Matter：

```markdown
---
title: '文章标题'
date: '2025-01-01'
description: '文章描述'
summary: '文章摘要'
keywords: '关键词1,关键词2'
author: '污斑兔'
cover: '封面图片URL'
---

文章内容...
```

### 文章组织
- 按年份组织：`public/blogs/2025/`
- 按月份组织：`public/blogs/2025/01/`
- 按日期组织：`public/blogs/2025/01/01/`

### 访问地址
- 文章列表：`/articles`
- 文章详情：`/articles/2025/01/01/article-slug`

### 文章排序
博客文章按发布日期（Front Matter 中的 `date` 字段）倒序排列，最新发布的文章显示在前面。

## 🎨 应用开发

### TODOS 应用
- **访问地址**：`/apps/todos/`
- **技术栈**：Alpine.js + Tailwind CSS + LocalForage
- **功能**：任务管理、状态切换、搜索、分页

### 黑白隐藏图应用
- **访问地址**：`/apps/merge-pictures/`
- **技术栈**：HTML5, CSS3, JavaScript, Alpine.js
- **功能**：两张同尺寸图片合成，白背景和黑背景不同视觉效果，支持多种图片格式转换，实时预览和背景切换，一键保存合成结果

### Only U 应用
- **访问地址**：`/apps/only-u/`
- **技术栈**：HTML5, CSS3, JavaScript
- **功能**：集合各种常见网站的快捷搜索，支持"内容+网站"格式输入，一键进入对应网站的搜索页面，分类管理，无广告，纯净体验
- **新增功能**：
  - **左上角原型仪表盘**：显示实时时间、日期、天气信息和日出日落时间，支持地理位置获取和响应式设计
  - **白噪音播放功能**：点击播放按钮即可播放白噪音，支持随机循环播放多个音频文件，提供城市繁华街道白噪音和超纯净室内白噪音两种选择
- **PWA 功能**：
  - **Web App Manifest**：`/apps/only-u/app.webmanifest`
  - **应用名称**：Only U - 智能搜索引擎
  - **显示模式**：独立窗口模式 (standalone)
  - **主题色彩**：#1f243e (深蓝色)
  - **图标支持**：多种尺寸适配 (72x72 到 512x512)
  - **快捷方式**：百度、Google、淘宝、B站快速访问
  - **分享功能**：支持分享到其他应用
  - **安装提示**：支持添加到主屏幕/桌面
  - **测试页面**：`/apps/only-u/test-manifest.html` 用于验证PWA功能
  - **SEO 优化**：
    - **结构化数据**：`/apps/only-u/schema.json` - Schema.org 结构化数据
    - **应用类型**：WebApplication
    - **搜索动作**：支持搜索引擎直接搜索功能
    - **评分评论**：包含用户评分和评论信息
    - **功能列表**：详细的功能特性描述
    - **无障碍支持**：完整的无障碍功能配置
    - **测试页面**：`/apps/only-u/test-schema.html` 用于验证SEO功能

### SSML Editor 应用
- **访问地址**：`/apps/ssml-editor/`
- **技术栈**：HTML5, CSS3, JavaScript
- **功能**：极简的SSML编辑器，支持富文本编辑，添加读音标注、时间间隔、数字模式等功能，可导出标准SSML格式文本，适用于语音合成和TTS应用开发

### HTML转Markdown工具
- **访问地址**：`/apps/html2md/`
- **技术栈**：HTML5, CSS3, JavaScript, Tailwind CSS, DaisyUI
- **功能**：在线HTML转Markdown转换工具，支持多种HTML标签转换，实时转换功能，本地处理保护隐私，支持复制结果和下载文件，响应式设计，主题切换功能

### 添加新应用
1. 在 `public/apps/` 下创建新应用目录
2. 在 `public/apps/index.html` 中添加应用卡片
3. 更新应用列表和描述

## 🌐 部署

### Vercel 部署
项目已配置 Vercel 部署，支持自动部署：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Docker 部署
```bash
# 构建镜像
docker build -t my-website .

# 运行容器
docker run -p 3000:3000 my-website
```

### Docker Compose 部署
```bash
# 生产环境部署
docker-compose up -d

# 开发环境部署
docker-compose --profile dev up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 传统部署
```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start app.js --name "my-website"
```

## 🔧 配置说明

### 环境变量
创建 `.env` 文件（可选）：
```env
NODE_ENV=production
PORT=3000
```

### Tailwind CSS 配置
修改 `tailwind.config.js` 自定义样式：
```javascript
module.exports = {
  content: ['./views/**/*.ejs', './public/**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b'
      }
    }
  }
}
```

## 📊 性能优化

### 已实现的优化
- 静态资源压缩
- 图片懒加载
- CSS/JS 文件合并
- 浏览器缓存策略
- SEO 优化

### 进一步优化建议
- 使用 CDN 加速
- 启用 Gzip 压缩
- 实现 Service Worker
- 添加性能监控

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发规范
- 遵循项目的命名规范
- 使用 2 个空格缩进
- 提交信息使用中文
- 新功能需要添加测试

### 代码风格
- 变量：小驼峰命名
- 常量：大写加下划线
- 函数：on开头的驼峰命名
- CSS类：BEM命名方式

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 📞 联系方式

- **开发者**：污斑兔
- **邮箱**zweizhao@foxmail.com
- **GitHub**：[@kvker](https://github.com/kvker)

## 🙏 致谢

感谢以下开源项目的支持：
- [Express.js](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Alpine.js](https://alpinejs.dev/)
- [Marked](https://marked.js.org/)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！