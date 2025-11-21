import { lazy } from 'react';

export const tools = [
    {
        id: 'qrcode',
        path: '/qrcode',
        name: '二维码生成器',
        description: '快速生成个性化二维码，支持自定义颜色和样式',
        category: 'utility',
        badge: 'hot',
        keywords: ['qrcode', 'erweima', '二维码', 'shengcheng'],
        component: lazy(() => import('./tools/QrCodeGenerator'))
    },
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
    // Add more tools here
];

export const categories = [
    { id: 'utility', name: '实用工具' },
    { id: 'design', name: '设计灵感' },
    { id: 'dev', name: '开发辅助' },
    { id: 'fun', name: '摸鱼专区' }
];
