import { lazy } from 'react';

// 占位组件 - 用于未开发的工具
const ComingSoon = lazy(() => import('./tools/ComingSoon'));

export const tools = [
    // 实用工具
    {
        id: 'password-generator',
        path: '/password-generator',
        name: '随机密码生成器',
        description: '生成安全可靠的随机密码，支持自定义字符集和排除规则',
        category: 'utility',
        badge: 'hot',
        keywords: ['password', 'mima', '密码', 'generator', 'shengcheng', '生成器', 'random', 'suiji', '随机'],
        component: lazy(() => import('./tools/PasswordGenerator'))
    },
    {
        id: 'qrcode',
        path: '/qrcode',
        name: '二维码生成器',
        description: '快速生成个性化二维码，支持自定义颜色和样式',
        category: 'utility',
        badge: 'maintenance',
        keywords: ['qrcode', 'erweima', '二维码', 'shengcheng'],
        component: ComingSoon
    },
    {
        id: 'json-formatter',
        path: '/json-formatter',
        name: 'JSON 格式化',
        description: '美化、压缩、验证 JSON 数据，支持格式转换',
        category: 'utility',
        badge: 'maintenance',
        keywords: ['json', 'format', 'geshi', '格式化', 'meihua', '美化'],
        component: ComingSoon
    },
    {
        id: 'base64',
        path: '/base64',
        name: 'Base64 编解码',
        description: '文本和图片的 Base64 编码解码工具',
        category: 'utility',
        badge: 'maintenance',
        keywords: ['base64', 'encode', 'decode', 'bianma', '编码', 'jiema', '解码'],
        component: ComingSoon
    },
    {
        id: 'timestamp',
        path: '/timestamp',
        name: '时间戳转换器',
        description: 'Unix 时间戳与日期时间相互转换，支持多时区',
        category: 'utility',
        badge: 'maintenance',
        keywords: ['timestamp', 'shijian', '时间', 'unix', 'zhuanhuan', '转换'],
        component: ComingSoon
    },
    {
        id: 'color-converter',
        path: '/color-converter',
        name: '颜色转换工具',
        description: 'HEX、RGB、HSL 颜色格式转换和取色器',
        category: 'utility',
        badge: 'maintenance',
        keywords: ['color', 'yanse', '颜色', 'hex', 'rgb', 'hsl', 'zhuanhuan', '转换'],
        component: ComingSoon
    },
    {
        id: 'text-diff',
        path: '/text-diff',
        name: '文本对比工具',
        description: '快速对比两段文本的差异，高亮显示不同之处',
        category: 'utility',
        badge: 'maintenance',
        keywords: ['diff', 'duibi', '对比', 'text', 'wenben', '文本'],
        component: ComingSoon
    },

    // 设计灵感
    {
        id: 'gradient-generator',
        path: '/gradient-generator',
        name: '渐变生成器',
        description: '一键生成美丽的 CSS 渐变，导出代码',
        category: 'design',
        badge: 'maintenance',
        keywords: ['gradient', 'jianbian', '渐变', 'css', 'color', 'yanse', '颜色'],
        component: ComingSoon
    },
    {
        id: 'lorem-ipsum',
        path: '/lorem-ipsum',
        name: '占位文本生成器',
        description: '生成中文、英文占位文本，支持古诗词模式',
        category: 'design',
        badge: 'maintenance',
        keywords: ['lorem', 'ipsum', 'zhanwei', '占位', 'wenben', '文本', 'placeholder'],
        component: ComingSoon
    },
    {
        id: 'image-compressor',
        path: '/image-compressor',
        name: '图片压缩工具',
        description: '批量压缩图片，保持高质量，支持多种格式',
        category: 'design',
        badge: 'maintenance',
        keywords: ['image', 'tupian', '图片', 'compress', 'yasuo', '压缩'],
        component: ComingSoon
    },
    {
        id: 'svg-editor',
        path: '/svg-editor',
        name: 'SVG 编辑器',
        description: '在线编辑和优化 SVG 图形',
        category: 'design',
        badge: 'maintenance',
        keywords: ['svg', 'editor', 'bianji', '编辑', 'youhua', '优化'],
        component: ComingSoon
    },

    // 开发辅助
    {
        id: 'regex-tester',
        path: '/regex-tester',
        name: '正则表达式测试器',
        description: '实时测试正则表达式，可视化匹配结果',
        category: 'dev',
        badge: 'maintenance',
        keywords: ['regex', 'zhengze', '正则', 'test', 'ceshi', '测试', 'match', 'pipei', '匹配'],
        component: ComingSoon
    },
    {
        id: 'url-encoder',
        path: '/url-encoder',
        name: 'URL 编解码',
        description: 'URL 编码解码，Query 参数解析',
        category: 'dev',
        badge: 'maintenance',
        keywords: ['url', 'encode', 'decode', 'bianma', '编码', 'jiema', '解码'],
        component: ComingSoon
    },
    {
        id: 'markdown-editor',
        path: '/markdown-editor',
        name: 'Markdown 编辑器',
        description: '实时预览的 Markdown 编辑器，支持导出',
        category: 'dev',
        badge: 'maintenance',
        keywords: ['markdown', 'md', 'editor', 'bianji', '编辑器', 'preview', 'yulan', '预览'],
        component: ComingSoon
    },
    {
        id: 'uuid-generator',
        path: '/uuid-generator',
        name: 'UUID 生成器',
        description: '批量生成各种版本的 UUID/GUID',
        category: 'dev',
        badge: 'maintenance',
        keywords: ['uuid', 'guid', 'generator', 'shengcheng', '生成器'],
        component: ComingSoon
    },
    {
        id: 'cron-generator',
        path: '/cron-generator',
        name: 'Cron 表达式生成器',
        description: '可视化生成 Cron 表达式，预览执行时间',
        category: 'dev',
        badge: 'maintenance',
        keywords: ['cron', 'biaodashi', '表达式', 'generator', 'shengcheng', '生成器'],
        component: ComingSoon
    },

    // 摸鱼专区
    {
        id: 'hachimi-code',
        path: '/hachimi-code',
        name: '哈基米密码',
        description: '有趣的文本加密工具，将任何文字转换成"哈基米曼波南北绿豆"组成的密文',
        category: 'fun',
        badge: 'new',
        keywords: ['hachimi', 'hajimi', '哈基米', 'jiami', '加密', 'mima', '密码', 'encode'],
        component: lazy(() => import('./tools/HachimiCode'))
    },
    {
        id: 'mini-game',
        path: '/mini-game',
        name: '摸鱼小游戏',
        description: '2048、贪吃蛇等经典小游戏，带你重温童年',
        category: 'fun',
        badge: 'maintenance',
        keywords: ['game', 'youxi', '游戏', '2048', 'snake', 'moyu', '摸鱼'],
        component: ComingSoon
    },
    {
        id: 'random-decision',
        path: '/random-decision',
        name: '随机决策器',
        description: '转盘抽签、今天吃什么、随机数生成',
        category: 'fun',
        badge: 'maintenance',
        keywords: ['random', 'suiji', '随机', 'decision', 'juece', '决策', 'chouqian', '抽签'],
        component: ComingSoon
    },
    {
        id: 'pomodoro',
        path: '/pomodoro',
        name: '番茄钟',
        description: '专注工作，高效休息，提升时间管理能力',
        category: 'fun',
        badge: 'maintenance',
        keywords: ['pomodoro', 'fanqie', '番茄', 'timer', 'jishi', '计时', 'focus', 'zhuanzhu', '专注'],
        component: ComingSoon
    },
    // Add more tools here
];

export const categories = [
    { id: 'utility', name: '实用工具' },
    { id: 'design', name: '设计灵感' },
    { id: 'dev', name: '开发辅助' },
    { id: 'fun', name: '摸鱼专区' }
];
