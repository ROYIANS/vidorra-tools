import React, { useEffect, useState } from 'react';

const TIPS = [
    "你知道吗？你可以一键复制密码。",
    "Vidorra 的含义是「生活」，或者说「美好生活」。",
    "试试用 JSON 格式化工具整理混乱的 API 响应吧。",
    "用番茄钟计时器休息一下。",
    "设计即可视化的智慧。",
    "使用搜索栏快速找到你需要的工具。",
    "在设置中自定义你的体验。",
    "编码时记得补充水分！",
    "清晰的思维带来干净的代码。",
    "简约即是终极奢华。"
];

const Preloader = ({ visible }) => {
    const [tip, setTip] = useState('');
    const [show, setShow] = useState(visible);

    useEffect(() => {
        if (visible) {
            setShow(true);
            setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
        } else {
            const timer = setTimeout(() => setShow(false), 500); // Wait for fade out
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!show) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'var(--surface-cream)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '60px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            pointerEvents: visible ? 'all' : 'none',
        }}>
            {/* Corner Loading Indicator (Zelda Style) */}
            <div style={{
                position: 'absolute',
                bottom: '60px',
                left: '60px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <div className="zelda-loader-icon" style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid var(--color-text)',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                }}></div>
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--color-text)',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }}>加载中...</span>
            </div>

            {/* Tip Section */}
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                marginBottom: '100px',
                textAlign: 'center',
                animation: 'fadeInUp 0.8s ease-out'
            }}>
                <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '1.2rem',
                    color: 'var(--color-text-light)',
                    marginBottom: '16px',
                    opacity: 0.8
                }}>小贴士</h3>
                <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: 'var(--color-text)',
                    lineHeight: '1.4'
                }}>
                    {tip}
                </p>
            </div>
        </div>
    );
};

export default Preloader;
