import React, { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '../utils/favorites';

const FavoriteButton = ({ toolId, style = {} }) => {
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        setFavorited(isFavorite(toolId));
    }, [toolId]);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newState = toggleFavorite(toolId);
        setFavorited(newState);

        // 触发自定义事件，通知其他组件收藏状态变化
        window.dispatchEvent(new CustomEvent('favoritesChanged'));
    };

    return (
        <button
            onClick={handleClick}
            style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: favorited ? 'var(--color-rose)' : 'var(--surface-cream)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                color: favorited ? 'var(--color-white)' : 'var(--color-text-light)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 10,
                ...style,
            }}
            onMouseEnter={(e) => {
                if (!favorited) {
                    e.target.style.background = 'var(--surface-rose)';
                    e.target.style.color = 'var(--color-rose)';
                }
                e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
                if (!favorited) {
                    e.target.style.background = 'var(--surface-cream)';
                    e.target.style.color = 'var(--color-text-light)';
                }
                e.target.style.transform = 'scale(1)';
            }}
            title={favorited ? '取消收藏' : '添加收藏'}
        >
            <i className={favorited ? 'ri-star-fill' : 'ri-star-line'}></i>
        </button>
    );
};

export default FavoriteButton;
