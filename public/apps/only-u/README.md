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
<div id="dashboard" class="fixed top-5 left-5 z-50 bg-base-300/90 backdrop-blur-md rounded-2xl p-4 text-base-content shadow-2xl border border-base-content/10 min-w-[196px] transition-all duration-300 ease-in-out dashboard collapsed">
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

## 搜索界面美化

### 美化说明

本次美化将搜索框和按钮进行了全面升级，使用了现代化的设计风格：

#### 1. 搜索框组件

**原有结构：**
```html
<section class="search">
  <input id="main_input" autofocus="autofocus" placeholder="例:秋裤 淘宝" onkeydown="app.keydownMainInput(event)">
  <button onclick="app.clickSearchButton(event)">GO</button>
</section>
```

**新的美化结构：**
```html
<section class="search">
  <div class="join w-full max-w-4xl">
    <input 
      id="main_input" 
      autofocus="autofocus" 
      placeholder="例:秋裤 淘宝" 
      onkeydown="app.keydownMainInput(event)"
      class="input input-bordered join-item w-full text-lg focus:input-primary focus:outline-none"
    >
    <button 
      onclick="app.clickSearchButton(event)"
      class="btn btn-primary join-item px-8 text-lg font-bold hover:btn-secondary transition-all duration-200"
    >
      GO
    </button>
  </div>
</section>
```

#### 2. 设计特色

- **毛玻璃效果：** 使用 `backdrop-filter: blur(10px)` 创建现代化毛玻璃效果
- **渐变背景：** 使用紫色渐变背景，营造科技感
- **圆角设计：** 统一的圆角设计，更加现代化
- **悬停动画：** 按钮悬停时有上浮和阴影效果
- **响应式设计：** 在移动端自动调整尺寸和间距

#### 3. 使用的 DaisyUI 组件

- **Join 组件：** 将输入框和按钮组合成一个整体
- **Input 组件：** 美化的输入框，支持焦点状态
- **Button 组件：** 现代化的按钮设计
- **Circle Button：** 圆形的全屏按钮

#### 4. 视觉效果

- **Logo 动画：** 页面加载时 Logo 有淡入动画
- **按钮交互：** 悬停时有缩放和阴影效果
- **输入框焦点：** 聚焦时有蓝色边框和背景变化
- **深色主题：** 自动适配系统深色主题

#### 5. 无障碍访问

- 添加了 `aria-label` 属性
- 保持了键盘导航功能
- 支持屏幕阅读器

### 使用方法

搜索界面会自动初始化，无需额外配置。所有原有的 JavaScript 功能保持不变。

### 浏览器兼容性

- 支持所有现代浏览器
- 需要支持 CSS Grid 和 Flexbox
- 需要支持 backdrop-filter（用于毛玻璃效果）
- Safari 9+ 支持（添加了 -webkit-backdrop-filter）

[English](README.en.md)

一款超级好用的智能搜索引擎, 百度, Google等全收录, 自定义

可以一键打开搜索目标网页的搜索内容，也可以常规搜索