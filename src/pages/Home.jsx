import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Match from 'pinyin-match';
import { tools, categories } from '../registry';
import ToolBadge from '../components/ToolBadge';
import Footer from '../components/Footer';

const Home = () => {
    const [search, setSearch] = useState('');

    // Group tools by category
    const toolsByCategory = useMemo(() => {
        const grouped = {};
        categories.forEach(cat => {
            grouped[cat.id] = tools.filter(t => t.category === cat.id);
        });
        return grouped;
    }, []);

    // Filter for search results
    const searchResults = useMemo(() => {
        if (!search) return null;
        return tools.filter(tool =>
            Match.match(tool.name, search) ||
            (tool.keywords && tool.keywords.some(k => Match.match(k, search)))
        );
    }, [search]);

    // 根据工具ID获取对应的图标
    const getToolIcon = (toolId) => {
        const iconMap = {
            'qrcode': 'ri-qr-code-line',
            'hachimi-code': 'ri-lock-password-line',
        };
        return iconMap[toolId] || 'ri-tools-line';
    };

    // 根据分类获取对应的颜色
    const getCategoryColor = (category) => {
        const colorMap = {
            'utility': 'coral',
            'design': 'lavender',
            'dev': 'mint',
            'fun': 'sunny',
        };
        return colorMap[category] || 'coral';
    };

    const ToolCard = ({ tool }) => {
        const color = getCategoryColor(tool.category);
        return (
            <Link to={tool.path} style={{ textDecoration: 'none' }}>
                <div style={{
                    position: 'relative',
                    background: 'var(--color-white)',
                    borderRadius: 'var(--radius-md)',
                    padding: '32px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    transition: 'var(--transition-smooth)',
                    cursor: 'pointer'
                }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.background = 'var(--surface-peach)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.background = 'var(--color-white)';
                    }}
                >
                    <ToolBadge type={tool.badge} />

                    <div style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: 'var(--radius-sm)',
                        background: `var(--surface-${color})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        color: `var(--color-${color})`,
                        flexShrink: 0,
                        transition: 'var(--transition-smooth)'
                    }}>
                        <i className={getToolIcon(tool.id)}></i>
                    </div>

                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            fontSize: '1.3rem',
                            fontWeight: '800',
                            marginBottom: '8px',
                            color: 'var(--color-text)'
                        }}>
                            {tool.name}
                        </h3>
                        <p style={{
                            fontSize: '0.95rem',
                            color: 'var(--color-text-light)',
                            lineHeight: '1.6',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {tool.description}
                        </p>
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <>
            <div style={{
                minHeight: '100vh',
                padding: '60px 20px',
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '80px'
            }}>
                {/* Header Section */}
            <header style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: '900',
                    color: 'var(--color-text)',
                    letterSpacing: '-1.5px',
                    lineHeight: '1.1'
                }}>
                    VidorraTools
                    <span style={{
                        display: 'block',
                        fontSize: '1.2rem',
                        fontWeight: '500',
                        marginTop: '16px',
                        color: 'var(--color-text-light)',
                        letterSpacing: '2px'
                    }}>
                        创意百宝箱
                    </span>
                </h1>

                {/* Search Bar */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '500px'
                }}>
                    <input
                        type="text"
                        placeholder="搜索工具..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '24px 32px',
                            paddingLeft: '64px',
                            fontSize: '1.1rem',
                            border: 'none',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--surface-cream)',
                            outline: 'none',
                            color: 'var(--color-text)',
                            fontWeight: '600',
                            transition: 'var(--transition-smooth)'
                        }}
                        onFocus={e => e.target.style.background = 'var(--color-white)'}
                        onBlur={e => e.target.style.background = 'var(--surface-cream)'}
                    />
                    <i className="ri-search-2-line" style={{
                        position: 'absolute',
                        left: '28px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1.4rem',
                        color: 'var(--color-text-light)'
                    }}></i>
                </div>
            </header>

            {/* Content Area */}
            {search ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-light)' }}>搜索结果</h2>
                    {searchResults.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '24px'
                        }}>
                            {searchResults.map(tool => <ToolCard key={tool.id} tool={tool} />)}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>
                            未找到相关工具
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                    {categories.map(cat => {
                        const catTools = toolsByCategory[cat.id];
                        if (!catTools || catTools.length === 0) return null;

                        return (
                            <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <h2 style={{
                                        fontSize: '2rem',
                                        fontWeight: '800',
                                        color: 'var(--color-text)'
                                    }}>
                                        {cat.name}
                                    </h2>
                                    <div style={{
                                        flex: 1,
                                        height: '2px',
                                        background: 'var(--surface-peach)',
                                        borderRadius: '2px'
                                    }}></div>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: '24px'
                                }}>
                                    {catTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            </div>
            <Footer />
        </>
    );
};

export default Home;
