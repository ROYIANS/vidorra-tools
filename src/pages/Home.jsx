import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Match from 'pinyin-match';
import { tools, categories } from '../registry';
import ToolBadge from '../components/ToolBadge';
import FavoriteButton from '../components/FavoriteButton';
import Footer from '../components/Footer';
import { getFavorites } from '../utils/favorites';

// Helper functions defined outside component to avoid recreation
const getToolIcon = (toolId) => {
    const iconMap = {
        // Utility
        'password-generator': 'ri-key-2-line',
        'qrcode': 'ri-qr-code-line',
        'json-formatter': 'ri-braces-line',
        'base64': 'ri-file-code-line',
        'timestamp': 'ri-time-line',
        'color-converter': 'ri-palette-line',
        'text-diff': 'ri-file-copy-2-line',
        // Design
        'gradient-generator': 'ri-contrast-2-line',
        'lorem-ipsum': 'ri-text',
        'image-compressor': 'ri-image-line',
        'svg-editor': 'ri-shape-line',
        // Dev
        'regex-tester': 'ri-search-2-line',
        'url-encoder': 'ri-links-line',
        'markdown-editor': 'ri-markdown-line',
        'uuid-generator': 'ri-fingerprint-line',
        'cron-generator': 'ri-calendar-schedule-line',
        // Fun
        'hachimi-code': 'ri-lock-password-line',
        'mini-game': 'ri-gamepad-line',
        'random-decision': 'ri-dice-line',
        'pomodoro': 'ri-timer-line',
    };
    return iconMap[toolId] || 'ri-tools-line';
};

const getCategoryColor = (category) => {
    const colorMap = {
        'utility': 'coral',
        'design': 'lavender',
        'dev': 'mint',
        'fun': 'sunny',
    };
    return colorMap[category] || 'coral';
};

const ToolCard = ({ tool, size = 'normal' }) => {
    const color = getCategoryColor(tool.category);
    const isLarge = size === 'large';

    return (
        <Link to={tool.path} style={{ textDecoration: 'none', height: '100%' }}>
            <div style={{
                position: 'relative',
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-md)',
                padding: isLarge ? '32px' : '24px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'var(--transition-smooth)',
                cursor: 'pointer',
                border: '1px solid transparent',
            }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = `var(--color-${color})`;
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'transparent';
                }}
            >
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: isLarge ? '24px' : '16px',
                    }}>
                        <div style={{
                            width: isLarge ? '64px' : '48px',
                            height: isLarge ? '64px' : '48px',
                            borderRadius: 'var(--radius-sm)',
                            background: `var(--surface-${color})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: isLarge ? '32px' : '24px',
                            color: `var(--color-${color})`,
                            transition: 'var(--transition-smooth)'
                        }}>
                            <i className={getToolIcon(tool.id)}></i>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {tool.badge && <ToolBadge type={tool.badge} />}
                            <FavoriteButton toolId={tool.id} style={{ position: 'static' }} />
                        </div>
                    </div>

                    <h3 style={{
                        fontSize: isLarge ? '1.5rem' : '1.1rem',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        marginBottom: '8px',
                        fontFamily: 'var(--font-sans)',
                        letterSpacing: '-0.02em',
                    }}>
                        {tool.name}
                    </h3>
                    <p style={{
                        fontSize: isLarge ? '1rem' : '0.85rem',
                        color: 'var(--color-text-light)',
                        lineHeight: '1.6',
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: isLarge ? 3 : 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontFamily: 'var(--font-sans)',
                    }}>
                        {tool.description}
                    </p>
                </div>

                {isLarge && (
                    <div style={{
                        marginTop: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        color: `var(--color-${color})`,
                        fontWeight: '600',
                        fontSize: '0.9rem',
                    }}>
                        立即使用 <i className="ri-arrow-right-line" style={{ marginLeft: '4px' }}></i>
                    </div>
                )}
            </div>
        </Link>
    );
};

const Home = () => {
    const [search, setSearch] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [isStuck, setIsStuck] = useState(false);

    // Sticky Nav Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            const stickyNav = document.querySelector('.sticky-nav-container');
            if (stickyNav) {
                const rect = stickyNav.getBoundingClientRect();
                setIsStuck(rect.top <= 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll Spy Logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Extract category ID from section ID (cat-xxx)
                        const catId = entry.target.id.replace('cat-', '');
                        setActiveCategory(catId);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px', // Trigger when section is near top
                threshold: 0
            }
        );

        categories.forEach((cat) => {
            const el = document.getElementById(`cat-${cat.id}`);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Load Favorites
    useEffect(() => {
        setFavorites(getFavorites());
        const handleFavoritesChange = () => setFavorites(getFavorites());
        window.addEventListener('favoritesChanged', handleFavoritesChange);
        return () => window.removeEventListener('favoritesChanged', handleFavoritesChange);
    }, []);

    const favoriteTools = useMemo(() => tools.filter(tool => favorites.includes(tool.id)), [favorites]);
    const hotTools = useMemo(() => tools.filter(tool => tool.badge === 'hot'), []);

    const toolsByCategory = useMemo(() => {
        const grouped = {};
        categories.forEach(cat => {
            grouped[cat.id] = tools.filter(t => t.category === cat.id);
        });
        return grouped;
    }, []);

    const searchResults = useMemo(() => {
        if (!search) return null;
        return tools.filter(tool =>
            Match.match(tool.name, search) ||
            (tool.keywords && tool.keywords.some(k => Match.match(k, search)))
        );
    }, [search]);

    return (
        <>
            <div style={{
                minHeight: '100vh',
                padding: '40px 20px',
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                {/* Header Section */}
                <header style={{
                    textAlign: 'center',
                    marginBottom: '80px',
                    padding: '60px 0',
                    position: 'relative',
                }}>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 8vw, 5rem)',
                        fontWeight: '800',
                        color: 'var(--color-text)',
                        letterSpacing: '-0.03em',
                        lineHeight: '1',
                        marginBottom: '16px',
                        fontFamily: 'var(--font-sans)',
                    }}>
                        VidorraTools
                    </h1>
                    <p style={{
                        fontSize: '1.5rem',
                        color: 'var(--color-text-light)',
                        fontFamily: 'var(--font-artistic)',
                        fontWeight: 'normal',
                        marginBottom: '48px',
                    }}>
                        创意与实用的完美融合
                    </p>

                    {/* Search Bar */}
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}>
                        <input
                            type="text"
                            placeholder="搜索工具..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '20px 32px',
                                paddingLeft: '64px',
                                fontSize: '1.1rem',
                                border: '2px solid transparent',
                                borderRadius: 'var(--radius-full)',
                                background: 'var(--color-white)',
                                outline: 'none',
                                color: 'var(--color-text)',
                                fontWeight: '500',
                                transition: 'var(--transition-smooth)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
                                fontFamily: 'var(--font-mono)',
                            }}
                            onFocus={e => {
                                e.target.style.borderColor = 'var(--color-text)';
                                e.target.style.boxShadow = '0 12px 48px rgba(0,0,0,0.1)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'transparent';
                                e.target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.05)';
                            }}
                        />
                        <i className="ri-search-2-line" style={{
                            position: 'absolute',
                            left: '24px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '1.4rem',
                            color: 'var(--color-text-light)'
                        }}></i>
                    </div>
                </header>

                {/* Content Area */}
                {search ? (
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: 'var(--color-text)',
                            marginBottom: '32px',
                            fontFamily: 'var(--font-sans)',
                        }}>
                            搜索结果
                        </h2>
                        {searchResults.length > 0 ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '24px'
                            }}>
                                {searchResults.map(tool => <ToolCard key={tool.id} tool={tool} />)}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-light)' }}>
                                未找到与 "{search}" 匹配的工具
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>

                        {/* Bento Grid for Favorites & Hot */}
                        {(favoriteTools.length > 0 || hotTools.length > 0) && (
                            <>
                                {/* Favorites Section */}
                                {favoriteTools.length > 0 && (
                                    <section>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            marginBottom: '24px'
                                        }}>
                                            <h2 style={{
                                                fontSize: '2rem',
                                                fontWeight: 'normal',
                                                color: 'var(--color-text)',
                                                fontFamily: 'var(--font-artistic)',
                                            }}>我的收藏</h2>
                                            <div style={{ flex: 1, height: '1px', background: 'var(--color-text)', opacity: 0.1 }}></div>
                                        </div>
                                        <div className="bento-grid">
                                            {favoriteTools.map(tool => (
                                                <ToolCard key={tool.id} tool={tool} />
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Hot Tools Section */}
                                {hotTools.length > 0 && (
                                    <section>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            marginBottom: '24px'
                                        }}>
                                            <h2 style={{
                                                fontSize: '2rem',
                                                fontWeight: 'normal',
                                                color: 'var(--color-text)',
                                                fontFamily: 'var(--font-artistic)',
                                            }}>热门推荐</h2>
                                            <div style={{ flex: 1, height: '1px', background: 'var(--color-text)', opacity: 0.1 }}></div>
                                        </div>
                                        <div className="bento-grid">
                                            {hotTools.map((tool, index) => (
                                                <div key={tool.id} className={index === 0 ? 'bento-item-featured' : ''}>
                                                    <ToolCard tool={tool} size={index === 0 ? 'large' : 'normal'} />
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </>
                        )}

                        {/* Sticky Navigation */}
                        <div className={`sticky-nav-container ${isStuck ? 'stuck' : ''}`}>
                            <button
                                className={`nav-pill ${activeCategory === 'all' ? 'active' : ''}`}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    setActiveCategory('all');
                                }}
                            >
                                全部
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`nav-pill ${activeCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => {
                                        const el = document.getElementById(`cat-${cat.id}`);
                                        if (el) {
                                            const offset = 140; // Match scroll-margin-top
                                            const elementPosition = el.getBoundingClientRect().top;
                                            const offsetPosition = elementPosition + window.pageYOffset - offset;
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: "smooth"
                                            });
                                            setActiveCategory(cat.id);
                                        }
                                    }}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Categories Stream */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                            {categories.map((cat, index) => {
                                const catTools = toolsByCategory[cat.id];
                                if (!catTools || catTools.length === 0) return null;

                                return (
                                    <section key={cat.id} id={`cat-${cat.id}`} className="category-section">
                                        <div className="category-header">
                                            <h2 style={{
                                                fontSize: '3rem',
                                                fontWeight: 'normal',
                                                color: `var(--color-${getCategoryColor(cat.id)})`,
                                                lineHeight: '1',
                                                marginBottom: '16px',
                                                fontFamily: 'var(--font-artistic)',
                                                opacity: 0.8,
                                            }}>
                                                {cat.name}
                                            </h2>
                                            <p style={{
                                                fontSize: '1.1rem',
                                                color: 'var(--color-text-light)',
                                                fontFamily: 'var(--font-sans)',
                                                fontWeight: '300',
                                            }}>
                                                探索{cat.name}分类工具
                                            </p>
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                                            gap: '24px',
                                        }}>
                                            {catTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Home;
