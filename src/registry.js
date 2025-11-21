import { lazy } from 'react';

// 占位组件 - 用于未开发的工具
const ComingSoon = lazy(() => import('./tools/ComingSoon'));

export const tools = [
    // 生活助手 - Life Assistant
    {
        id: 'life-grid',
        path: '/life-grid',
        name: '人生小格',
        description: '生命可视化，用 400 个方块呈现你的 80 年人生，珍惜每一刻',
        category: 'life',
        badge: 'hot',
        keywords: ['life', 'shengming', '生命', 'grid', 'xiaoge', '小格', 'shijian', '时间', 'rensheng', '人生'],
        component: lazy(() => import('./tools/LifeGrid'))
    },
    {
        id: 'countdown',
        path: '/countdown',
        name: '纪念日倒计时',
        description: '生日、纪念日、考试日期倒计时，记录重要时刻',
        category: 'life',
        badge: 'maintenance',
        keywords: ['countdown', 'daojishi', '倒计时', 'jiniannian', '纪念日', 'shengri', '生日'],
        component: ComingSoon
    },
    {
        id: 'mortgage-calculator',
        path: '/mortgage-calculator',
        name: '房贷计算器',
        description: '等额本息/本金计算，提前还款计算，购房必备',
        category: 'life',
        badge: 'maintenance',
        keywords: ['mortgage', 'fangdai', '房贷', 'calculator', 'jisuan', '计算', 'loan', 'daikuan', '贷款'],
        component: ComingSoon
    },
    {
        id: 'white-noise',
        path: '/white-noise',
        name: '白噪音播放器',
        description: '雨声、森林、咖啡厅等环境音，助你专注放松',
        category: 'life',
        badge: 'maintenance',
        keywords: ['white', 'noise', 'baizaoyin', '白噪音', 'rain', 'yusheng', '雨声', 'focus', 'zhuanzhu', '专注'],
        component: ComingSoon
    },

    // 创意灵感 - Creative Inspiration
    {
        id: 'gradient-wallpaper',
        path: '/gradient-wallpaper',
        name: '渐变壁纸生成器',
        description: '一键生成美丽的渐变壁纸，支持自定义颜色和尺寸',
        category: 'creative',
        badge: 'maintenance',
        keywords: ['gradient', 'jianbian', '渐变', 'wallpaper', 'bizhi', '壁纸', 'color', 'yanse', '颜色'],
        component: ComingSoon
    },
    {
        id: 'meme-generator',
        path: '/meme-generator',
        name: '表情包制作器',
        description: '上传图片添加文字，快速制作个性表情包',
        category: 'creative',
        badge: 'maintenance',
        keywords: ['meme', 'biaoqingbao', '表情包', 'image', 'tupian', '图片', 'text', 'wenzi', '文字'],
        component: ComingSoon
    },
    {
        id: 'image-compressor',
        path: '/image-compressor',
        name: '朋友圈图片压缩',
        description: '批量压缩图片，保持高质量，微信分享更快',
        category: 'creative',
        badge: 'maintenance',
        keywords: ['image', 'tupian', '图片', 'compress', 'yasuo', '压缩', 'wechat', 'weixin', '微信'],
        component: ComingSoon
    },
    {
        id: 'hand-banner',
        path: '/hand-banner',
        name: '手持弹幕',
        description: '全屏滚动字幕，演唱会举牌神器',
        category: 'creative',
        badge: 'maintenance',
        keywords: ['banner', 'danmu', '弹幕', 'shouzhi', '手持', 'concert', 'yanchanghui', '演唱会'],
        component: ComingSoon
    },
    {
        id: 'acrostic-poem',
        path: '/acrostic-poem',
        name: '藏头诗生成器',
        description: '输入名字生成藏头诗，送礼表白新创意',
        category: 'creative',
        badge: 'maintenance',
        keywords: ['acrostic', 'zangtou', '藏头', 'poem', 'shi', '诗', 'poetry', 'shige', '诗歌'],
        component: ComingSoon
    },
    {
        id: 'id-photo',
        path: '/id-photo',
        name: '证件照换底色',
        description: '红蓝白底色一键互换，AI 自动抠图',
        category: 'creative',
        badge: 'maintenance',
        keywords: ['photo', 'zhaopin', '照片', 'id', 'zhengjian', '证件', 'background', 'baise', '背色'],
        component: ComingSoon
    },

    // 实用小工具 - Utilities
    {
        id: 'password-generator',
        path: '/password-generator',
        name: '随机密码生成器',
        description: '生成安全可靠的随机密码，支持自定义字符集和排除规则',
        category: 'utility',
        badge: 'recommend',
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
        keywords: ['qrcode', 'erweima', '二维码', 'shengcheng', '生成'],
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

    // 摸鱼专区 - Fun Zone
    {
        id: 'hachimi-code',
        path: '/hachimi-code',
        name: '南北绿豆',
        description: '一个壳,一个纯粹的壳。将文字转化为"哈基米曼波南北绿豆"的语言实验',
        category: 'fun',
        badge: 'hot',
        keywords: ['hachimi', 'hajimi', '哈基米', 'nanbei', '南北', 'lvdou', '绿豆', 'jiami', '加密', 'zhuanhua', '转化'],
        component: lazy(() => import('./tools/HachimiCode'))
    },
    {
        id: 'fortune-today',
        path: '/fortune-today',
        name: '今日运势',
        description: '塔罗牌占卜风格，趣味预测你的今日运势',
        category: 'fun',
        badge: 'maintenance',
        keywords: ['fortune', 'yunshi', '运势', 'tarot', 'taluo', '塔罗', '占卜', 'zhanbu'],
        component: ComingSoon
    },
    {
        id: 'random-decision',
        path: '/random-decision',
        name: '随机决策器',
        description: '转盘抽签、今天吃什么、选择困难症救星',
        category: 'fun',
        badge: 'maintenance',
        keywords: ['random', 'suiji', '随机', 'decision', 'juece', '决策', 'chouqian', '抽签', 'eat', 'chishenme', '吃什么'],
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
];

export const categories = [
    { id: 'life', name: '生活助手' },
    { id: 'creative', name: '创意灵感' },
    { id: 'utility', name: '实用小工具' },
    { id: 'fun', name: '摸鱼专区' }
];
