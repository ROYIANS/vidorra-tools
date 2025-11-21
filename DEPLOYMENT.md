# 部署说明

## 问题描述

React Router 使用的是 HTML5 History API 进行客户端路由。当用户直接访问 `https://tools.vidorra.life/hachimi-code` 时，服务器会尝试查找 `/hachimi-code` 这个实际文件，但它不存在，所以返回 404。

## 解决方案

### 方案一：配置 OpenResty/Nginx（推荐）

1. 在你的 OpenResty/Nginx 配置文件中添加以下配置：

```nginx
server {
    listen 80;
    server_name tools.vidorra.life;

    root /path/to/your/dist;  # 修改为你的实际路径
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

2. 重新加载 Nginx 配置：
```bash
nginx -t  # 测试配置
nginx -s reload  # 重新加载
```

### 方案二：使用 Hash 路由（备选方案）

如果无法修改服务器配置，可以改用 Hash 路由。

修改 `src/App.jsx`：

```jsx
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <HashRouter>  {/* 改为 HashRouter */}
      <Routes>
        {/* ... */}
      </Routes>
    </HashRouter>
  );
}
```

这样 URL 会变成：
- 首页：`https://tools.vidorra.life/#/`
- 工具页：`https://tools.vidorra.life/#/hachimi-code`

**注意**：Hash 路由的缺点是 URL 中会有 `#` 符号，不够美观，但无需服务器配置。

### 方案三：使用完整的 OpenResty 配置

参考项目根目录下的 `nginx.conf.example` 文件，这是一个包含性能优化的完整配置。

## 推荐做法

1. **首选方案一**：配置 Nginx 的 `try_files` 指令，这是标准做法，URL 也最美观
2. **备选方案二**：如果无法修改服务器配置，使用 Hash 路由

## 部署步骤

1. 构建项目：
```bash
npm run build
```

2. 将 `dist` 目录的内容上传到服务器

3. 配置 Nginx（使用上述方案一的配置）

4. 重启 Nginx

5. 测试直接访问：`https://tools.vidorra.life/hachimi-code`

## 验证

访问以下 URL 确认配置成功：
- https://tools.vidorra.life/
- https://tools.vidorra.life/hachimi-code
- https://tools.vidorra.life/qrcode

所有页面都应该正常显示，而不是 404。
