import React from 'react';

const QrCodeGenerator = () => {
    return (
        <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'var(--color-white)',
            padding: '48px',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
        }}>
            <h2 style={{
                fontSize: '2.5rem',
                marginBottom: '16px',
                color: 'var(--color-text)',
                fontWeight: '800'
            }}>
                二维码生成器
            </h2>
            <p style={{
                color: 'var(--color-text-light)',
                fontSize: '1.1rem',
                marginBottom: '48px'
            }}>
                快速生成个性化二维码
            </p>

            <div style={{
                marginTop: '40px',
                height: '400px',
                background: 'var(--surface-peach)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-light)',
                fontSize: '1.1rem'
            }}>
                工具界面开发中...
            </div>
        </div>
    );
};

export default QrCodeGenerator;
