import React, { useState, useEffect } from 'react';
import Slider from '../../components/ui/Slider';
import Switch from '../../components/ui/Switch';
import { useToast, Toast } from '../../components/ui/Toast';

const PasswordGenerator = () => {
    const { showToast, open, setOpen, content } = useToast();

    // 字符集配置
    const [charSets, setCharSets] = useState({
        lowercase: true,
        uppercase: true,
        numbers: true,
        special: true,
    });

    // 自定义特殊字符
    const [specialChars, setSpecialChars] = useState('!@#$%^&*');

    // 排除字符
    const [excludeChars, setExcludeChars] = useState('iIl1o0O');

    // 密码配置
    const [passwordLength, setPasswordLength] = useState(16);
    const [passwordCount, setPasswordCount] = useState(1);

    // 生成的密码
    const [passwords, setPasswords] = useState([]);

    // 历史记录（存储在 localStorage）
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    // 加载历史记录
    useEffect(() => {
        const savedHistory = localStorage.getItem('passwordHistory');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error('Failed to load history:', e);
            }
        }
    }, []);

    // 保存历史记录
    const saveToHistory = (newPasswords) => {
        const timestamp = new Date().toLocaleString('zh-CN');
        const historyItem = {
            id: Date.now(),
            timestamp,
            passwords: newPasswords,
            config: {
                length: passwordLength,
                count: passwordCount,
                charSets: { ...charSets },
                specialChars,
                excludeChars,
            }
        };

        const newHistory = [historyItem, ...history].slice(0, 50); // 最多保存50条
        setHistory(newHistory);
        localStorage.setItem('passwordHistory', JSON.stringify(newHistory));
    };

    // 清空历史记录
    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('passwordHistory');
        showToast('历史记录已清空', '所有保存的密码记录已被移除');
    };

    // 生成密码
    const generatePasswords = () => {
        if (!charSets.lowercase && !charSets.uppercase && !charSets.numbers && !charSets.special) {
            showToast('错误', '请至少选择一种字符类型');
            return;
        }

        // 构建字符池
        let charPool = '';
        if (charSets.lowercase) charPool += 'abcdefghijklmnopqrstuvwxyz';
        if (charSets.uppercase) charPool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (charSets.numbers) charPool += '0123456789';
        if (charSets.special) charPool += specialChars;

        // 移除排除的字符
        if (excludeChars) {
            const excludeSet = new Set(excludeChars.split(''));
            charPool = charPool.split('').filter(c => !excludeSet.has(c)).join('');
        }

        if (charPool.length === 0) {
            showToast('错误', '字符池为空，请调整配置');
            return;
        }

        // 生成多个密码
        const newPasswords = [];
        for (let i = 0; i < passwordCount; i++) {
            let password = '';
            for (let j = 0; j < passwordLength; j++) {
                const randomIndex = Math.floor(Math.random() * charPool.length);
                password += charPool[randomIndex];
            }
            newPasswords.push(password);
        }

        setPasswords(newPasswords);
        saveToHistory(newPasswords);
        showToast('生成成功', `已生成 ${passwordCount} 个新密码`);
    };

    // 复制到剪贴板
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        showToast('复制成功', '密码已复制到剪贴板');
    };

    // 复制所有密码
    const copyAllPasswords = () => {
        if (passwords.length > 0) {
            navigator.clipboard.writeText(passwords.join('\n'));
            showToast('复制成功', '所有密码已复制到剪贴板');
        }
    };

    // 从历史记录恢复配置
    const restoreFromHistory = (item) => {
        setPasswordLength(item.config.length);
        setPasswordCount(item.config.count);
        setCharSets(item.config.charSets);
        setSpecialChars(item.config.specialChars);
        setExcludeChars(item.config.excludeChars);
        setPasswords(item.passwords);
        setShowHistory(false);
        showToast('配置已恢复', '已加载历史记录中的配置');
    };

    return (
        <div style={{
            maxWidth: '1000px',
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
                    fontWeight: 'normal',
                    fontFamily: 'var(--font-artistic)',
                }}>
                    随机密码生成器
                </h1>
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-light)',
                    lineHeight: '1.6',
                }}>
                    生成安全可靠的随机密码，支持自定义字符集和排除规则
                </p>
            </div>

            {/* 配置区域 */}
            <div style={{
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                marginBottom: '24px',
            }}>
                {/* 字符类型选择 */}
                <div style={{ marginBottom: '32px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: '16px',
                    }}>
                        字符类型
                    </label>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                    }}>
                        {[
                            { key: 'lowercase', label: '小写字母 (a-z)', color: 'coral' },
                            { key: 'uppercase', label: '大写字母 (A-Z)', color: 'sunny' },
                            { key: 'numbers', label: '数字 (0-9)', color: 'mint' },
                            { key: 'special', label: '特殊字符', color: 'lavender' },
                        ].map(item => (
                            <div
                                key={item.key}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px',
                                    background: charSets[item.key] ? `var(--surface-${item.color})` : 'var(--surface-cream)',
                                    borderRadius: 'var(--radius-md)',
                                    transition: 'var(--transition-smooth)',
                                }}
                            >
                                <span style={{
                                    fontWeight: '600',
                                    color: 'var(--color-text)',
                                }}>{item.label}</span>
                                <Switch
                                    checked={charSets[item.key]}
                                    onCheckedChange={(checked) => setCharSets({ ...charSets, [item.key]: checked })}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 自定义特殊字符 */}
                <div style={{ marginBottom: '32px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: '12px',
                    }}>
                        自定义特殊字符
                    </label>
                    <input
                        type="text"
                        value={specialChars}
                        onChange={(e) => setSpecialChars(e.target.value)}
                        placeholder="输入特殊字符，如：!@#$%^&*"
                        disabled={!charSets.special}
                        style={{
                            width: '100%',
                            padding: '16px',
                            fontSize: '1rem',
                            background: charSets.special ? 'var(--surface-lavender)' : 'var(--surface-cream)',
                            color: 'var(--color-text)',
                            borderRadius: 'var(--radius-md)',
                            border: 'none',
                            outline: 'none',
                            fontFamily: 'var(--font-mono)',
                            transition: 'var(--transition-smooth)',
                        }}
                    />
                </div>

                {/* 排除字符 */}
                <div style={{ marginBottom: '32px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: '12px',
                    }}>
                        排除字符（避免混淆的字符）
                    </label>
                    <input
                        type="text"
                        value={excludeChars}
                        onChange={(e) => setExcludeChars(e.target.value)}
                        placeholder="输入要排除的字符，如：iIl1o0O"
                        style={{
                            width: '100%',
                            padding: '16px',
                            fontSize: '1rem',
                            background: 'var(--surface-rose)',
                            color: 'var(--color-text)',
                            borderRadius: 'var(--radius-md)',
                            border: 'none',
                            outline: 'none',
                            fontFamily: 'var(--font-mono)',
                        }}
                    />
                </div>

                {/* 密码长度和数量 */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '32px',
                }}>
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '12px',
                        }}>
                            <label style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: 'var(--color-text)',
                            }}>
                                密码长度
                            </label>
                            <span style={{
                                fontWeight: '700',
                                color: 'var(--color-coral)',
                            }}>{passwordLength}</span>
                        </div>
                        <Slider
                            value={[passwordLength]}
                            onValueChange={(val) => setPasswordLength(val[0])}
                            min={8}
                            max={99}
                            step={1}
                        />
                    </div>

                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '12px',
                        }}>
                            <label style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: 'var(--color-text)',
                            }}>
                                生成数量
                            </label>
                            <span style={{
                                fontWeight: '700',
                                color: 'var(--color-coral)',
                            }}>{passwordCount}</span>
                        </div>
                        <Slider
                            value={[passwordCount]}
                            onValueChange={(val) => setPasswordCount(val[0])}
                            min={1}
                            max={20}
                            step={1}
                        />
                    </div>
                </div>
            </div>

            {/* 操作按钮 */}
            <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '24px',
                flexWrap: 'wrap',
            }}>
                <button
                    onClick={generatePasswords}
                    style={{
                        padding: '16px 48px',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        background: 'var(--color-coral)',
                        color: 'var(--color-white)',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                        border: 'none',
                        flex: '1',
                        minWidth: '200px',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    <i className="ri-refresh-line" style={{ marginRight: '8px' }}></i>
                    生成密码
                </button>

                {passwords.length > 0 && (
                    <button
                        onClick={copyAllPasswords}
                        style={{
                            padding: '16px 32px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            background: 'var(--color-sunny)',
                            color: 'var(--color-white)',
                            borderRadius: 'var(--radius-full)',
                            cursor: 'pointer',
                            transition: 'var(--transition-smooth)',
                            border: 'none',
                        }}
                    >
                        <i className="ri-file-copy-line" style={{ marginRight: '8px' }}></i>
                        复制全部
                    </button>
                )}

                <button
                    onClick={() => setShowHistory(!showHistory)}
                    style={{
                        padding: '16px 32px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        background: 'var(--surface-mint)',
                        color: 'var(--color-text)',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)',
                        border: 'none',
                    }}
                >
                    <i className="ri-history-line" style={{ marginRight: '8px' }}></i>
                    {showHistory ? '隐藏历史' : '查看历史'}
                </button>
            </div>

            {/* 生成的密码列表 */}
            {passwords.length > 0 && (
                <div style={{
                    background: 'var(--color-white)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    marginBottom: '24px',
                }}>
                    <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        marginBottom: '16px',
                    }}>
                        生成的密码
                    </h3>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}>
                        {passwords.map((pwd, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '16px',
                                    background: 'var(--surface-peach)',
                                    borderRadius: 'var(--radius-md)',
                                }}
                            >
                                <span style={{
                                    flex: '1',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '1.1rem',
                                    color: 'var(--color-text)',
                                    wordBreak: 'break-all',
                                }}>
                                    {pwd}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(pwd)}
                                    style={{
                                        padding: '8px 16px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        background: 'var(--color-coral)',
                                        color: 'var(--color-white)',
                                        borderRadius: 'var(--radius-full)',
                                        cursor: 'pointer',
                                        transition: 'var(--transition-smooth)',
                                        border: 'none',
                                        flexShrink: 0,
                                    }}
                                >
                                    <i className="ri-file-copy-line"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 历史记录 */}
            {showHistory && (
                <div style={{
                    background: 'var(--color-white)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                    }}>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            color: 'var(--color-text)',
                        }}>
                            历史记录
                        </h3>
                        {history.length > 0 && (
                            <button
                                onClick={clearHistory}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    background: 'var(--color-rose)',
                                    color: 'var(--color-white)',
                                    borderRadius: 'var(--radius-full)',
                                    cursor: 'pointer',
                                    transition: 'var(--transition-smooth)',
                                    border: 'none',
                                }}
                            >
                                <i className="ri-delete-bin-line" style={{ marginRight: '6px' }}></i>
                                清空历史
                            </button>
                        )}
                    </div>

                    {history.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px',
                            color: 'var(--color-text-light)',
                        }}>
                            暂无历史记录
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                        }}>
                            {history.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        padding: '16px',
                                        background: 'var(--surface-cream)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        transition: 'var(--transition-smooth)',
                                    }}
                                    onClick={() => restoreFromHistory(item)}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-mint)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface-cream)'}
                                >
                                    <div style={{
                                        fontSize: '0.85rem',
                                        color: 'var(--color-text-light)',
                                        marginBottom: '8px',
                                    }}>
                                        {item.timestamp}
                                    </div>
                                    <div style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--color-text)',
                                        marginBottom: '8px',
                                    }}>
                                        长度: {item.config.length} | 数量: {item.config.count}
                                    </div>
                                    <div style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.9rem',
                                        color: 'var(--color-text-light)',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {item.passwords.join(' | ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PasswordGenerator;
