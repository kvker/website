# Only U - 智能搜索引擎

## 仪表盘组件重构

### 重构说明

本次重构将原有的自定义 CSS 仪表盘组件改为使用 DaisyUI 组件，主要变化如下：

#### 1. HTML 结构变化

**原有结构：**
```html
<div id="dashboard" class="dashboard collapsed">
  <div id="dashboard-close" class="dashboard__close">×</div>
  <div id="dashboard-circle" class="dashboard__circle">
    <div id="circle-time" class="circle__time">--</div>
  </div>
  <div id="dashboard-content" class="dashboard__container">
    <!-- 内容 -->
  </div>
</div>
```

**新的 DaisyUI 结构：**
```html
<div id="dashboard" class="fixed top-5 left-5 z-50 bg-base-300/90 backdrop-blur-md rounded-2xl p-4 text-base-content shadow-2xl border border-base-content/10 min-w-[196px] transition-all duration-300 ease-in-out collapsed">
  <div id="dashboard-close" class="absolute top-2 right-2 w-5 h-5 bg-base-content/20 rounded-full flex items-center justify-center cursor-pointer text-sm font-bold text-base-content hover:bg-base-content/30 hover:scale-110 transition-all duration-200 z-10">×</div>
  <div id="dashboard-circle" class="absolute inset-0 bg-base-300/90 rounded-full hidden items-center justify-center cursor-pointer transition-all duration-300 ease-in-out backdrop-blur-md shadow-2xl border border-base-content/10">
    <div id="circle-time" class="text-base font-black text-base-content font-mono drop-shadow-lg">--</div>
  </div>
  <div id="dashboard-content" class="flex flex-col gap-3">
    <!-- 内容 -->
  </div>
</div>
```

#### 2. 使用的 DaisyUI 类

- **布局类：** `fixed`, `absolute`, `flex`, `flex-col`, `items-center`, `justify-center`
- **间距类：** `top-5`, `left-5`, `p-4`, `gap-3`, `mr-3`
- **背景类：** `bg-base-300/90`, `bg-base-content/20`, `bg-base-content/5`
- **文字类：** `text-base-content`, `text-2xl`, `text-sm`, `font-black`, `font-mono`
- **边框类：** `rounded-2xl`, `rounded-full`, `border`, `border-base-content/10`
- **效果类：** `backdrop-blur-md`, `shadow-2xl`, `drop-shadow-lg`, `transition-all`
- **状态类：** `hover:bg-base-content/30`, `hover:scale-110`

#### 3. 保留的功能

- ✅ 时间显示（实时更新）
- ✅ 日期和周几显示
- ✅ 天气信息显示
- ✅ 日出日落时间
- ✅ 收起/展开功能
- ✅ 响应式设计
- ✅ 深色/浅色主题适配

#### 4. 优势

1. **更好的主题支持：** 使用 DaisyUI 的语义化颜色类，自动适配深色/浅色主题
2. **更少的自定义 CSS：** 大部分样式都使用 Tailwind/DaisyUI 类
3. **更好的维护性：** 统一的类名规范，易于维护
4. **更好的性能：** 减少了自定义 CSS 文件的大小

#### 5. 自定义 CSS

仅保留了必要的自定义 CSS 来处理：
- 收起状态的尺寸和布局
- 移动端响应式调整

### 使用方法

仪表盘会自动初始化，无需额外配置。JavaScript 功能保持不变，所有交互逻辑都正常工作。

### 浏览器兼容性

- 支持所有现代浏览器
- 需要支持 CSS Grid 和 Flexbox
- 需要支持 backdrop-filter（用于毛玻璃效果）

[English](README.en.md)

一款超级好用的智能搜索引擎, 百度, Google等全收录, 自定义

可以一键打开搜索目标网页的搜索内容，也可以常规搜索