# VidorraTools - 创意百宝箱 🎨

> 有趣实用的在线工具集，多巴胺配色设计，极致交互体验

[![Website](https://img.shields.io/badge/Website-tools.vidorra.life-FF6B9D?style=flat-square)](https://tools.vidorra.life)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Rolldown-646CFF?style=flat-square&logo=vite)](https://vite.dev)

## 🌟 项目简介

VidorraTools 是一个汇集各种有趣、实用、高颜值在线工具的百宝箱。采用"多巴胺设计"理念，用温暖活泼的色彩和流畅的交互，让使用工具变成一种享受。

**在线访问：** [https://tools.vidorra.life](https://tools.vidorra.life)

## ✨ 设计特色

- **多巴胺配色** - 珊瑚、阳光、薄荷、薰衣草等温暖色调
- **无边框设计** - 拒绝卡片堆砌，无阴影无渐变
- **圆润边角** - Organic border radius，柔和自然
- **流畅动画** - 0.3s cubic-bezier 过渡，丝滑体验
- **响应式布局** - 完美适配各种设备

## 🛠️ 已实现工具

### 摸鱼专区 🎮
- **哈基米密码** - 有趣的文本加密工具，将任何文字转换成"哈基米曼波南北绿豆"组成的密文

### 实用工具 🔧
- **二维码生成器** - 开发中...

## 🚀 技术栈

- **框架：** React 19.2.0
- **构建工具：** Vite (Rolldown)
- **路由：** React Router 7.9.6
- **图标：** RemixIcon 4.7.0
- **搜索：** pinyin-match（支持拼音搜索）
- **代码规范：** ESLint 9

## 📦 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
vidorra.tools/
├── src/
│   ├── components/        # 可复用组件
│   │   ├── Footer.jsx     # 统一页脚
│   │   └── ToolBadge.jsx  # 工具徽章
│   ├── config/            # 配置文件
│   │   └── theme.css      # 多巴胺色彩系统
│   ├── pages/             # 页面组件
│   │   └── Home.jsx       # 首页
│   ├── tools/             # 工具实现
│   │   ├── HachimiCode/   # 哈基米密码
│   │   └── QrCodeGenerator/  # 二维码生成器
│   ├── App.jsx            # 主应用组件
│   ├── registry.js        # 工具注册中心
│   └── main.jsx           # 应用入口
├── public/                # 静态资源
├── DEPLOYMENT.md          # 部署文档
├── nginx.conf.example     # Nginx 配置示例
└── ui.guide.md            # UI 设计规范

```

## 🎯 添加新工具

1. 在 `src/tools/` 目录下创建新工具文件夹
2. 实现工具组件（参考现有工具）
3. 在 `src/registry.js` 中注册工具
4. 遵循 `ui.guide.md` 中的设计规范

示例：

```javascript
// src/registry.js
{
    id: 'your-tool',
    path: '/your-tool',
    name: '工具名称',
    description: '工具描述',
    category: 'utility', // utility | design | dev | fun
    badge: 'new',        // hot | new | recommend | maintenance
    keywords: ['关键词', 'guanjianzi'],
    component: lazy(() => import('./tools/YourTool'))
}
```

## 📝 部署说明

项目使用 React Router 的 BrowserRouter，需要服务器端配置支持。

### OpenResty/Nginx 配置

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

详细部署说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🎨 设计规范

完整的 UI 设计规范请查看 [ui.guide.md](./ui.guide.md)

### 色彩系统

| 颜色 | 变量名 | 用途 |
|------|--------|------|
| 珊瑚色 | `--color-coral` | 实用工具 |
| 阳光色 | `--color-sunny` | 摸鱼专区 |
| 薄荷色 | `--color-mint` | 开发辅助 |
| 薰衣草色 | `--color-lavender` | 设计灵感 |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

**ROYIANS**
- 邮箱：royians@vidorra.life
- GitHub：[@ROYIANS](https://github.com/ROYIANS)

---

Made with ♥ by ROYIANS | Powered by React & Vite
