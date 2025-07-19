# HTML转Markdown工具 (Alpine.js版本)

一个简单易用的在线HTML转Markdown工具，基于Tailwind CSS、DaisyUI和Alpine.js构建，支持多种HTML标签转换。

## ✨ 功能特性

### 🚀 核心功能
- **HTML转Markdown转换** - 支持多种HTML标签的转换
- **实时转换** - 输入HTML代码后自动转换（防抖处理）
- **本地处理** - 所有转换都在本地完成，保护隐私和数据安全
- **响应式设计** - 支持桌面、平板、手机等多种设备

### 🎨 界面特性
- **现代化UI** - 基于Tailwind CSS和DaisyUI的现代化界面
- **Alpine.js响应式** - 使用Alpine.js实现响应式数据绑定和交互
- **主题切换** - 支持明暗主题切换
- **Toast通知** - 操作反馈和错误提示，带平滑动画
- **键盘快捷键** - 支持Ctrl+Enter转换、Ctrl+S保存

### 📋 操作功能
- **清空输入** - 一键清空输入和输出内容
- **加载示例** - 提供丰富的示例代码
- **复制结果** - 一键复制转换后的Markdown代码
- **下载文件** - 将转换结果保存为.md文件

## 🏗️ 技术栈

### 前端技术
- **HTML5** - 语义化标记
- **CSS3** - 样式设计
- **JavaScript (ES6+)** - 交互逻辑
- **Tailwind CSS** - 原子化CSS框架
- **DaisyUI** - Tailwind CSS组件库
- **Alpine.js** - 轻量级响应式框架

### 核心库
- **html-to-md** - HTML转Markdown转换库

## 🆕 Alpine.js版本新特性

### 响应式数据绑定
- 使用`x-model`实现双向数据绑定
- 自动响应数据变化，无需手动DOM操作
- 更简洁的代码结构和更好的性能

### 事件处理
- 使用`@click`、`@input`等指令处理事件
- 自动绑定和解绑事件监听器
- 更好的内存管理

### 条件渲染
- 使用`x-show`、`x-if`实现条件渲染
- 支持过渡动画效果
- 更流畅的用户体验

### 状态管理
- 集中的状态管理
- 响应式状态更新
- 更好的代码组织

## 📝 支持的HTML标签

| 标签类型 | 支持的标签 | 转换效果 |
|---------|-----------|---------|
| 标题 | h1, h2, h3, h4, h5, h6 | # ## ### #### ##### ###### |
| 段落 | p | 普通文本段落 |
| 链接 | a | [文本](链接) |
| 图片 | img | ![alt](src) |
| 列表 | ul, ol, li | - 或 1. 列表项 |
| 表格 | table, thead, tbody, tr, th, td | Markdown表格格式 |
| 代码 | code, pre | `代码` 或 ```代码块``` |
| 引用 | blockquote | > 引用内容 |
| 强调 | strong, b, em, i | **粗体** 或 *斜体* |
| 删除线 | del, s, strike | ~~删除内容~~ |

## 🚀 使用方法

### 基本使用
1. 在左侧"HTML输入"区域输入HTML代码
2. 点击"转换为Markdown"按钮或等待自动转换
3. 在右侧"Markdown输出"区域查看转换结果
4. 使用"复制"按钮复制结果或"下载"按钮保存文件

### 快捷键
- `Ctrl + Enter` - 手动触发转换
- `Ctrl + S` - 下载Markdown文件

### 示例代码
工具提供了丰富的示例代码，点击"加载示例"按钮即可查看各种HTML标签的转换效果。

## 🎯 开发说明

### 项目结构
```
html2md/
├── index.html          # 主页面 (Alpine.js版本)
├── styles/
│   ├── input.css       # Tailwind CSS输入文件
│   └── main.css        # 编译后的CSS文件
├── js/
│   └── main.js         # Alpine.js主要逻辑
├── libs/
│   └── html-to-md.min.js # HTML转Markdown库
└── README.md           # 说明文档
```

### 构建命令
```bash
# 开发模式（包含CSS编译）
npm run dev:html2md

# 仅编译CSS
npm run css:html2md
```

### Alpine.js核心实现

#### 数据定义
```javascript
Alpine.data('html2md', () => ({
  // 响应式数据
  htmlInput: '',
  markdownOutput: '',
  isConverting: false,
  theme: 'light',
  
  // 方法
  onConvertHtml() {
    // 转换逻辑
  }
}))
```

#### HTML绑定
```html
<textarea x-model="htmlInput" @input="onHtmlInputChange()"></textarea>
<button @click="onConvertHtml()" :disabled="isConverting">
  <span x-text="isConverting ? '转换中...' : '转换为Markdown'"></span>
</button>
```

#### 条件渲染
```html
<div x-show="showSuccessToast" x-transition>
  <span x-text="toastMessage"></span>
</div>
```

## 🔧 配置选项

### html2md库配置
- `ignoreTags` - 忽略的标签（当前为空数组，支持所有标签）

### Alpine.js配置
- 响应式数据绑定
- 事件处理
- 条件渲染
- 过渡动画

### 主题配置
- 支持明暗主题切换
- 主题设置保存在localStorage中
- 默认使用light主题

## 📱 响应式设计

工具采用响应式设计，在不同设备上都有良好的显示效果：

- **桌面端** - 左右分栏布局，充分利用屏幕空间
- **平板端** - 自适应布局，保持良好的可读性
- **手机端** - 上下堆叠布局，便于触摸操作

## 🎨 自定义样式

可以通过修改`styles/input.css`文件来自定义样式：

```css
@import "tailwindcss";
@plugin "daisyui";

/* 自定义样式 */
.custom-class {
  /* 你的自定义样式 */
}
```

## 🔍 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 许可证

MIT License - 详见项目根目录的LICENSE文件

## 👨‍💻 作者

污斑兔 - 独立开发者

## 🔄 版本历史

### v2.0.0 (Alpine.js版本)
- 使用Alpine.js重写所有逻辑
- 响应式数据绑定
- 更好的事件处理
- 平滑的过渡动画
- 更简洁的代码结构

### v1.0.0 (原生JavaScript版本)
- 基础HTML转Markdown功能
- 原生JavaScript实现
- 基础UI和交互

---

**注意**: 这是一个纯前端工具，所有转换都在本地完成，不会向服务器发送任何数据，保护您的隐私安全。 