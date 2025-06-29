# Only U 仪表盘功能说明

## 功能概述

Only U 搜索引擎现在在左上角集成了一个原型仪表盘，提供实时的时间、日期、天气和日出日落信息。

## 功能特性

### 1. 实时时间显示
- 显示当前时间（时:分:秒）
- 每秒自动更新
- 24小时制格式

### 2. 日期和周几
- 显示当前日期（年月日）
- 显示当前星期几
- 中文格式显示

### 3. 天气信息
- 显示当前温度
- 显示天气状况描述
- 显示对应天气图标
- 支持多种天气类型（晴天、多云、雨雪等）

### 4. 日出日落时间
- 显示当日日出时间
- 显示当日日落时间
- 根据季节和地理位置自动调整

## 技术实现

### 文件结构
```
public/apps/only-u/
├── index.html          # 主页面（包含仪表盘HTML结构）
├── css/
│   └── app.css         # 样式文件（包含仪表盘样式）
└── js/
    ├── app.js          # 原有应用逻辑
    └── dashboard.js    # 仪表盘功能模块
```

### 样式设计
- 使用BEM命名规范
- 响应式设计，支持移动端
- 毛玻璃效果（backdrop-filter）
- 现代化UI设计

### JavaScript功能
- 模块化设计
- 异步天气API调用
- 地理位置获取
- 实时时间更新

## 配置说明

### 天气API配置
当前使用OpenWeatherMap API获取天气信息，需要：

1. 注册OpenWeatherMap账号
2. 获取API密钥
3. 在 `dashboard.js` 中替换 `your_api_key_here`

```javascript
const apiKey = 'your_actual_api_key_here'
```

### 默认位置设置
如果无法获取用户位置，将使用默认位置（北京）：
- 纬度：39.9042
- 经度：116.4074

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

注意：毛玻璃效果（backdrop-filter）在较老版本的Safari中可能不支持。

## 自定义配置

### 修改位置
在 `dashboard.js` 中修改默认位置：

```javascript
// 使用默认位置（北京）
await this.updateWeather(39.9042, 116.4074)
```

### 修改样式
在 `app.css` 中修改仪表盘样式：

```css
.dashboard {
  /* 修改位置 */
  top: 20px;
  left: 20px;
  
  /* 修改背景色 */
  background: rgba(31, 36, 62, 0.95);
  
  /* 修改圆角 */
  border-radius: 20px;
}
```

### 添加新的天气图标
在 `dashboard.js` 中的 `weatherIcons` 对象中添加：

```javascript
weatherIcons: {
  'clear': '☀️',
  'clouds': '☁️',
  'rain': '🌧️',
  // 添加新的天气类型
  'new_weather': '🌤️'
}
```

## 故障排除

### 天气信息不显示
1. 检查网络连接
2. 确认API密钥是否正确
3. 检查浏览器控制台是否有错误信息

### 位置信息获取失败
1. 确认浏览器允许地理位置权限
2. 检查HTTPS协议（地理位置需要安全连接）

### 样式显示异常
1. 检查CSS文件是否正确加载
2. 确认浏览器支持backdrop-filter属性

## 更新日志

### v1.0.0 (2025-01-01)
- 初始版本发布
- 实现基础时间、日期、天气、日出日落功能
- 响应式设计支持
- 毛玻璃效果UI 