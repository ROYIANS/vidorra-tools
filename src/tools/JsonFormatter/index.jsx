import React, { useState } from 'react';
import ScrollArea from '../../components/ui/ScrollArea';
import { useToast, Toast } from '../../components/ui/Toast';

const JsonFormatter = () => {
    const { showToast, open, setOpen, content } = useToast();
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [indentSize, setIndentSize] = useState(2);

    // 美化 JSON
    const formatJson = () => {
        setError('');
        if (!input.trim()) {
            setOutput('');
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, indentSize);
            setOutput(formatted);
            showToast('格式化成功', 'JSON 数据已美化');
        } catch (e) {
            setError(`语法错误: ${e.message}`);
            setOutput('');
            showToast('格式化失败', 'JSON 语法错误');
        }
    };

    // 压缩 JSON
    const compressJson = () => {
        setError('');
        if (!input.trim()) {
            setOutput('');
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const compressed = JSON.stringify(parsed);
            setOutput(compressed);
            showToast('压缩成功', 'JSON 数据已压缩');
        } catch (e) {
            setError(`语法错误: ${e.message}`);
            setOutput('');
            showToast('压缩失败', 'JSON 语法错误');
        }
    };

    // 验证 JSON
    const validateJson = () => {
        setError('');
        if (!input.trim()) {
            setError('请输入 JSON 数据');
            return;
        }

        try {
            JSON.parse(input);
            setError('');
            showToast('验证通过', 'JSON 格式正确');
        } catch (e) {
            setError(`✗ 语法错误: ${e.message}`);
            showToast('验证失败', 'JSON 语法错误');
        }
    };

    // 复制到剪贴板
    const copyToClipboard = (text) => {
        if (text) {
            navigator.clipboard.writeText(text);
            showToast('复制成功', '内容已复制到剪贴板');
        }
    };

    // 清空
    const clearAll = () => {
        setInput('');
        setOutput('');
        setError('');
        showToast('已清空', '所有内容已被清除');
    };

    // 示例 JSON
    const loadExample = () => {
        const example = {
            "name": "VidorraTools",
            "description": "创意百宝箱",
            "version": "1.0.0",
            "tools": [
                "JSON格式化",
                "密码生成器",
                "哈基米密码"
            ],
            "features": {
                "dopamine": true,
                "responsive": true,
                "favorites": true
            }
        };
        setInput(JSON.stringify(example));
        setError('');
        showToast('示例已加载', '已填入示例 JSON 数据');
    };

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '24px',
        }}>
            <Toast open={open} onOpenChange={setOpen} title={content.title} description={content.description} />

            {/* 标题区域 */}
            <div style={{
                textAlign: 'center',
                marginBottom: '40px',
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '12px',
                    color: 'var(--color-text)',
                    fontWeight: '800',
                }}>
                    JSON 格式化工具
                </h1>
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-light)',
                    lineHeight: '1.6',
                }}>
                    美化、压缩、验证 JSON 数据
                </p>
            </div>

            {/* 操作按钮 */}
            <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '24px',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                <button
                    onClick={formatJson}
                    style={{
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontWeight: '600',
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
                    <i className="ri-braces-line" style={{ marginRight: '8px' }}></i>
                    美化格式
                </button>

                <button
                    onClick={compressJson}
                    style={{
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        background: 'var(--color-sunny)',
                        color: 'var(--color-white)',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                        border: 'none',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    <i className="ri-compasses-2-line" style={{ marginRight: '8px' }}></i>
                    压缩
                </button>

                <button
                    onClick={validateJson}
                    style={{
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        background: 'var(--color-mint)',
                        color: 'var(--color-white)',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                        border: 'none',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    <i className="ri-checkbox-circle-line" style={{ marginRight: '8px' }}></i>
                    验证
                </button>

                <button
                    onClick={loadExample}
                    style={{
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        background: 'var(--surface-lavender)',
                        color: 'var(--color-text)',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                        border: 'none',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    <i className="ri-file-text-line" style={{ marginRight: '8px' }}></i>
                    加载示例
                </button>

                <button
                    onClick={clearAll}
                    style={{
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        background: 'var(--surface-rose)',
                        color: 'var(--color-text)',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                        border: 'none',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    <i className="ri-delete-bin-line" style={{ marginRight: '8px' }}></i>
                    清空
                </button>
            </div>

            {/* 缩进大小选择 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                marginBottom: '24px',
            }}>
                <label style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: 'var(--color-text)',
                }}>
                    缩进空格数：
                </label>
                {[2, 4].map(size => (
                    <label
                        key={size}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            color: 'var(--color-text)',
                        }}
                    >
                        <input
                            type="radio"
                            name="indent"
                            value={size}
                            checked={indentSize === size}
                            onChange={() => setIndentSize(size)}
                            style={{ cursor: 'pointer' }}
                        />
                        {size} 空格
                    </label>
                ))}
            </div>

            {/* 错误提示 */}
            {error && (
                <div style={{
                    padding: '16px',
                    marginBottom: '24px',
                    background: 'var(--surface-rose)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text)',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                }}>
                    <i className="ri-error-warning-line" style={{
                        fontSize: '1.5rem',
                        color: 'var(--color-rose)',
                    }}></i>
                    {error}
                </div>
            )}

            {/* 主要内容区域 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                height: '600px', // 固定高度以支持滚动
            }}>
                {/* 输入区域 */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                    }}>
                        <label style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'var(--color-text)',
                        }}>
                            输入 JSON
                        </label>
                        <button
                            onClick={() => copyToClipboard(input)}
                            style={{
                                padding: '6px 12px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                background: 'var(--surface-cream)',
                                color: 'var(--color-text)',
                                borderRadius: 'var(--radius-full)',
                                cursor: 'pointer',
                                transition: 'var(--transition-smooth)',
                                border: 'none',
                            }}
                        >
                            <i className="ri-file-copy-line" style={{ marginRight: '4px' }}></i>
                            复制
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='输入或粘贴 JSON 数据...'
                        style={{
                            width: '100%',
                            height: '100%',
                            padding: '20px',
                            fontSize: '0.9rem',
                            background: 'var(--surface-peach)',
                            color: 'var(--color-text)',
                            borderRadius: 'var(--radius-lg)',
                            resize: 'none',
                            border: 'none',
                            outline: 'none',
                            lineHeight: '1.6',
                            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                        }}
                    />
                </div>

                {/* 输出区域 */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                    }}>
                        <label style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'var(--color-text)',
                        }}>
                            输出结果
                        </label>
                        {output && (
                            <button
                                onClick={() => copyToClipboard(output)}
                                style={{
                                    padding: '6px 12px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    background: 'var(--color-rose)',
                                    color: 'var(--color-white)',
                                    borderRadius: 'var(--radius-full)',
                                    cursor: 'pointer',
                                    transition: 'var(--transition-smooth)',
                                    border: 'none',
                                }}
                            >
                                <i className="ri-file-copy-line" style={{ marginRight: '4px' }}></i>
                                复制
                            </button>
                        )}
                    </div>
                    <ScrollArea style={{
                        flex: 1,
                        background: 'var(--surface-sunny)',
                        borderRadius: 'var(--radius-lg)',
                    }}>
                        <pre
                            style={{
                                padding: '20px',
                                fontSize: '0.9rem',
                                color: 'var(--color-text)',
                                border: 'none',
                                outline: 'none',
                                lineHeight: '1.6',
                                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                margin: 0,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-all',
                            }}
                        >
                            {output || '格式化后的 JSON 将显示在这里...'}
                        </pre>
                    </ScrollArea>
                </div>
            </div>

            {/* 使用说明 */}
            <div style={{
                marginTop: '40px',
                padding: '24px',
                background: 'var(--surface-mint)',
                borderRadius: 'var(--radius-lg)',
            }}>
                <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: 'var(--color-text)',
                    marginBottom: '12px',
                }}>
                    <i className="ri-information-line" style={{ marginRight: '8px' }}></i>
                    使用说明
                </h3>
                <ul style={{
                    fontSize: '0.9rem',
                    color: 'var(--color-text-light)',
                    lineHeight: '2',
                    paddingLeft: '20px',
                    margin: 0,
                }}>
                    <li><strong>美化格式</strong>：将压缩的 JSON 格式化为易读的缩进格式</li>
                    <li><strong>压缩</strong>：移除所有空格和换行，减小 JSON 体积</li>
                    <li><strong>验证</strong>：检查 JSON 语法是否正确</li>
                    <li><strong>加载示例</strong>：加载示例 JSON 数据进行测试</li>
                    <li><strong>缩进空格数</strong>：美化时使用的缩进空格数（2 或 4）</li>
                </ul>
            </div>
        </div>
    );
};

export default JsonFormatter;
