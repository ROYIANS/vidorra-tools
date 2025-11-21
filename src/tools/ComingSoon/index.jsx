import React from 'react';
import { useLocation } from 'react-router-dom';
import { tools } from '../../registry';

const ComingSoon = () => {
    const location = useLocation();

    // 根据当前路径找到对应的工具信息
    const currentTool = tools.find(tool => tool.path === location.pathname);

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: 'clamp(16px, 4vw, 24px)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }}>
            {/* 建造中图标 */}
            <div style={{
                width: 'clamp(90px, 20vw, 120px)',
                height: 'clamp(90px, 20vw, 120px)',
                borderRadius: '50%',
                background: 'var(--surface-sunny)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'clamp(24px, 5vw, 32px)',
                animation: 'pulse 2s infinite',
            }}>
                <i className="ri-tools-line" style={{
                    fontSize: 'clamp(45px, 10vw, 60px)',
                    color: 'var(--color-sunny)',
                }}></i>
            </div>

            {/* 标题 */}
            <h1 style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 'normal',
                color: 'var(--color-text)',
                marginBottom: 'clamp(12px, 3vw, 16px)',
                fontFamily: 'var(--font-artistic)',
            }}>
                {currentTool ? currentTool.name : '工具'}
            </h1>

            {/* 副标题 */}
            <p style={{
                fontSize: 'clamp(1.05rem, 3vw, 1.2rem)',
                color: 'var(--color-text-light)',
                marginBottom: 'clamp(10px, 2.5vw, 12px)',
                fontWeight: '600',
            }}>
                正在建造中...
            </p>

            {/* 描述 */}
            {currentTool && (
                <p style={{
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                    color: 'var(--color-text-light)',
                    marginBottom: 'clamp(30px, 6vw, 40px)',
                    lineHeight: '1.8',
                    maxWidth: '500px',
                    padding: '0 clamp(12px, 3vw, 16px)',
                }}>
                    {currentTool.description}
                </p>
            )}

            {/* 提示信息 */}
            <div style={{
                background: 'var(--surface-mint)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(20px, 4vw, 24px) clamp(24px, 5vw, 32px)',
                maxWidth: '600px',
                width: '100%',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(10px, 2.5vw, 12px)',
                    marginBottom: 'clamp(10px, 2.5vw, 12px)',
                }}>
                    <i className="ri-lightbulb-line" style={{
                        fontSize: 'clamp(20px, 5vw, 24px)',
                        color: 'var(--color-mint)',
                    }}></i>
                    <h3 style={{
                        fontSize: 'clamp(1rem, 2.8vw, 1.1rem)',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        margin: 0,
                    }}>
                        开发进行中
                    </h3>
                </div>
                <p style={{
                    fontSize: 'clamp(0.875rem, 2.3vw, 0.95rem)',
                    color: 'var(--color-text-light)',
                    lineHeight: '1.6',
                    margin: 0,
                }}>
                    这个工具正在紧张开发中，敬请期待！如果你有任何建议或想法，欢迎通过页面底部的联系方式告诉我们。
                </p>
            </div>

            {/* 动画样式 */}
            <style>
                {`
                    @keyframes pulse {
                        0%, 100% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.05);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ComingSoon;
