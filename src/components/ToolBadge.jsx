import React from 'react';

const badgeConfig = {
    hot: { color: '#FF6B6B', icon: 'ri-fire-fill', label: '热门' },
    new: { color: '#6BCF7F', icon: 'ri-sparkling-fill', label: '上新' },
    recommend: { color: '#FF9F1C', icon: 'ri-thumb-up-fill', label: '推荐' },
    maintenance: { color: '#C77DFF', icon: 'ri-tools-fill', label: '维护' }
};

const ToolBadge = ({ type }) => {
    const config = badgeConfig[type];
    if (!config) return null;

    return (
        <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-full)',
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--color-text)',
            zIndex: 10
        }}>
            <i className={config.icon} style={{ fontSize: '14px', color: config.color }}></i>
            <span>{config.label}</span>
        </div>
    );
};

export default ToolBadge;
