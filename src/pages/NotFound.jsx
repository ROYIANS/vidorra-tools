import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
        }}>
            {/* 404 大标题 */}
            <div style={{
                fontSize: '8rem',
                fontWeight: '900',
                color: 'var(--color-coral)',
                lineHeight: '1',
                marginBottom: '24px',
                textShadow: '0 4px 0 var(--surface-coral)',
            }}>
                404
            </div>

            {/* 标题 */}
            <h1 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: 'var(--color-text)',
                marginBottom: '16px',
            }}>
                页面走丢了
            </h1>

            {/* 描述 */}
            <p style={{
                fontSize: '1.1rem',
                color: 'var(--color-text-light)',
                marginBottom: '40px',
                lineHeight: '1.8',
                maxWidth: '500px',
            }}>
                抱歉，你访问的页面不存在或已被移除。
            </p>

            {/* 返回按钮 */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <button style={{
                    padding: '16px 48px',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    background: 'var(--color-coral)',
                    color: 'var(--color-white)',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    border: 'none',
                }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    <i className="ri-home-4-line" style={{ marginRight: '8px' }}></i>
                    返回首页
                </button>
            </Link>

            {/* 装饰元素 */}
            <div style={{
                marginTop: '60px',
                display: 'flex',
                gap: '16px',
            }}>
                {['coral', 'sunny', 'mint', 'lavender', 'rose'].map((color, index) => (
                    <div
                        key={color}
                        style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: `var(--color-${color})`,
                            animation: `bounce 1s infinite ${index * 0.1}s`,
                        }}
                    />
                ))}
            </div>

            {/* 动画 */}
            <style>
                {`
                    @keyframes bounce {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-10px);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default NotFound;
