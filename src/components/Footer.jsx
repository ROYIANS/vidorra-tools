import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            marginTop: '80px',
            padding: '40px 20px',
            background: 'var(--surface-cream)',
            borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: 'center',
                textAlign: 'center',
            }}>
                {/* Logo 和标题 */}
                <div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: 'var(--color-text)',
                        marginBottom: '8px',
                    }}>
                        VidorraTools
                    </h3>
                    <p style={{
                        fontSize: '0.95rem',
                        color: 'var(--color-text-light)',
                    }}>
                        创意百宝箱 · 有趣实用的在线工具集
                    </p>
                </div>

                {/* 分隔线 */}
                <div style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: '2px',
                    background: 'var(--surface-peach)',
                    borderRadius: 'var(--radius-full)',
                }}></div>

                {/* 链接区域 */}
                <div style={{
                    display: 'flex',
                    gap: '24px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                }}>
                    <a
                        href="https://tools.vidorra.life"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: 'var(--color-text-light)',
                            textDecoration: 'none',
                            transition: 'var(--transition-smooth)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--color-coral)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-light)'}
                    >
                        <i className="ri-home-4-line"></i>
                        官网
                    </a>
                    <a
                        href="mailto:royians@vidorra.life"
                        style={{
                            color: 'var(--color-text-light)',
                            textDecoration: 'none',
                            transition: 'var(--transition-smooth)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--color-coral)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-light)'}
                    >
                        <i className="ri-mail-line"></i>
                        联系我们
                    </a>
                    <a
                        href="https://github.com/ROYIANS"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: 'var(--color-text-light)',
                            textDecoration: 'none',
                            transition: 'var(--transition-smooth)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--color-coral)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-light)'}
                    >
                        <i className="ri-github-line"></i>
                        GitHub
                    </a>
                </div>

                {/* 版权信息 */}
                <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-text-light)',
                    lineHeight: '1.6',
                }}>
                    <p style={{ margin: '4px 0' }}>
                        © {currentYear} Vidorra.life · 版权所有
                    </p>
                    <p style={{ margin: '4px 0' }}>
                        由 ROYIANS 用 <span style={{ color: 'var(--color-rose)' }}>♥</span> 制作
                    </p>
                </div>

                {/* 装饰元素 */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '8px',
                }}>
                    {['coral', 'sunny', 'mint', 'lavender', 'rose'].map((color) => (
                        <div
                            key={color}
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: `var(--color-${color})`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
