import React from 'react';

const QrCodeGenerator = () => {
    return (
        <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'var(--color-white)',
            padding: 'clamp(24px, 5vw, 48px)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            minHeight: '100vh'
        }}>
            <h2 style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                marginBottom: 'clamp(12px, 3vw, 16px)',
                color: 'var(--color-text)',
                fontWeight: '800'
            }}>
                二维码生成器
            </h2>
            <p style={{
                color: 'var(--color-text-light)',
                fontSize: 'clamp(0.95rem, 2.8vw, 1.1rem)',
                marginBottom: 'clamp(32px, 6vw, 48px)'
            }}>
                快速生成个性化二维码
            </p>

            <div style={{
                marginTop: 'clamp(24px, 5vw, 40px)',
                height: 'clamp(250px, 50vh, 400px)',
                background: 'var(--surface-peach)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-light)',
                fontSize: 'clamp(0.95rem, 2.8vw, 1.1rem)'
            }}>
                工具界面开发中...
            </div>
        </div>
    );
};

export default QrCodeGenerator;
