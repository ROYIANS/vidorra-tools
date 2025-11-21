import React, { useState } from 'react';

const HachimiCode = () => {
    const [inputText, setInputText] = useState('');
    const [password, setPassword] = useState('');
    const [outputText, setOutputText] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'

    // 哈基米字符集：8个字符对应3位二进制
    const HACHIMI_CHARS = ['哈', '基', '米', '曼', '波', '南', '北', '绿', '豆'];
    const PUNCTUATION = ['，', '。', '、', '！', '？', '；', '：'];

    // 将文本转换为字节数组
    const textToBytes = (text) => {
        const encoder = new TextEncoder();
        return encoder.encode(text);
    };

    // 将字节数组转换为文本
    const bytesToText = (bytes) => {
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    };

    // 简单的密钥派生函数
    const deriveKey = (password, length) => {
        if (!password) return new Uint8Array(length);
        const bytes = textToBytes(password);
        const key = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            key[i] = bytes[i % bytes.length];
        }
        return key;
    };

    // XOR 加密/解密
    const xorCrypt = (data, key) => {
        if (key.length === 0) return data;
        const result = new Uint8Array(data.length);
        for (let i = 0; i < data.length; i++) {
            result[i] = data[i] ^ key[i % key.length];
        }
        return result;
    };

    // 编码：将字节转换为哈基米字符
    const encodeToHachimi = (bytes) => {
        let result = '';
        let bitBuffer = 0;
        let bitCount = 0;
        let charCount = 0;

        for (let i = 0; i < bytes.length; i++) {
            bitBuffer = (bitBuffer << 8) | bytes[i];
            bitCount += 8;

            while (bitCount >= 3) {
                const index = (bitBuffer >> (bitCount - 3)) & 0x07;
                result += HACHIMI_CHARS[index];
                bitCount -= 3;
                charCount++;

                // 每隔 8-12 个字符随机插入标点
                if (charCount >= 8 && Math.random() < 0.3) {
                    const punctIndex = Math.floor(Math.random() * PUNCTUATION.length);
                    result += PUNCTUATION[punctIndex];
                    charCount = 0;
                }
            }
        }

        // 处理剩余的位
        if (bitCount > 0) {
            const index = (bitBuffer << (3 - bitCount)) & 0x07;
            result += HACHIMI_CHARS[index];
        }

        // 确保不以标点开头
        while (PUNCTUATION.includes(result[0])) {
            result = result.substring(1);
        }

        // 在末尾添加长度标记（使用特定模式）
        const lengthMarker = HACHIMI_CHARS[bytes.length % 8];
        result += lengthMarker;

        return result;
    };

    // 解码：将哈基米字符转换回字节
    const decodeFromHachimi = (text) => {
        // 移除所有标点符号
        let cleanText = text;
        PUNCTUATION.forEach(punct => {
            cleanText = cleanText.split(punct).join('');
        });

        // 移除长度标记（最后一个字符）
        if (cleanText.length > 0) {
            cleanText = cleanText.substring(0, cleanText.length - 1);
        }

        const bytes = [];
        let bitBuffer = 0;
        let bitCount = 0;

        for (let i = 0; i < cleanText.length; i++) {
            const char = cleanText[i];
            const index = HACHIMI_CHARS.indexOf(char);

            if (index === -1) continue; // 跳过无法识别的字符

            bitBuffer = (bitBuffer << 3) | index;
            bitCount += 3;

            while (bitCount >= 8) {
                const byte = (bitBuffer >> (bitCount - 8)) & 0xFF;
                bytes.push(byte);
                bitCount -= 8;
            }
        }

        return new Uint8Array(bytes);
    };

    // 加密处理
    const handleEncode = () => {
        if (!inputText.trim()) {
            setOutputText('');
            return;
        }

        try {
            const bytes = textToBytes(inputText);
            const key = deriveKey(password, bytes.length);
            const encrypted = xorCrypt(bytes, key);
            const encoded = encodeToHachimi(encrypted);
            setOutputText(encoded);
        } catch (error) {
            setOutputText('加密失败：' + error.message);
        }
    };

    // 解密处理
    const handleDecode = () => {
        if (!inputText.trim()) {
            setOutputText('');
            return;
        }

        try {
            const decoded = decodeFromHachimi(inputText);
            const key = deriveKey(password, decoded.length);
            const decrypted = xorCrypt(decoded, key);
            const text = bytesToText(decrypted);
            setOutputText(text);
        } catch (error) {
            setOutputText('解密失败：可能是密文格式错误或口令不正确');
        }
    };

    // 转换按钮点击
    const handleConvert = () => {
        if (mode === 'encode') {
            handleEncode();
        } else {
            handleDecode();
        }
    };

    // 切换模式
    const toggleMode = () => {
        setMode(mode === 'encode' ? 'decode' : 'encode');
        setInputText(outputText);
        setOutputText(inputText);
    };

    // 复制到剪贴板
    const copyToClipboard = () => {
        if (outputText) {
            navigator.clipboard.writeText(outputText);
        }
    };

    return (
        <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '24px',
        }}>
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
                    哈基米密码
                </h1>
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-light)',
                    marginBottom: '8px',
                }}>
                    Hachimi Code
                </p>
                <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--color-text-light)',
                    lineHeight: '1.6',
                }}>
                    将任何文字转换成由"哈基米曼波南北绿豆"组成的趣味密文
                </p>
            </div>

            {/* 模式切换按钮 */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '32px',
                gap: '12px',
            }}>
                <button
                    onClick={() => setMode('encode')}
                    style={{
                        padding: '12px 32px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        background: mode === 'encode' ? 'var(--color-coral)' : 'var(--surface-peach)',
                        color: mode === 'encode' ? 'var(--color-white)' : 'var(--color-text)',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: 'none',
                    }}
                >
                    <i className="ri-lock-line" style={{ marginRight: '8px' }}></i>
                    加密
                </button>
                <button
                    onClick={() => setMode('decode')}
                    style={{
                        padding: '12px 32px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        background: mode === 'decode' ? 'var(--color-coral)' : 'var(--surface-peach)',
                        color: mode === 'decode' ? 'var(--color-white)' : 'var(--color-text)',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: 'none',
                    }}
                >
                    <i className="ri-lock-unlock-line" style={{ marginRight: '8px' }}></i>
                    解密
                </button>
            </div>

            {/* 主要内容区域 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '24px',
            }}>
                {/* 输入区域 */}
                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: '12px',
                    }}>
                        {mode === 'encode' ? '原文' : '密文'}
                    </label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={mode === 'encode' ? '输入要加密的文字...' : '输入要解密的哈基米密文...'}
                        style={{
                            width: '100%',
                            minHeight: '180px',
                            padding: '20px',
                            fontSize: '1rem',
                            background: 'var(--surface-peach)',
                            color: 'var(--color-text)',
                            borderRadius: 'var(--radius-lg)',
                            resize: 'vertical',
                            border: 'none',
                            outline: 'none',
                            lineHeight: '1.8',
                            fontFamily: 'inherit',
                        }}
                    />
                </div>

                {/* 口令输入 */}
                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: '12px',
                    }}>
                        口令（可选）
                    </label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="输入加密口令，留空则使用默认加密"
                        style={{
                            width: '100%',
                            padding: '16px 20px',
                            fontSize: '1rem',
                            background: 'var(--surface-mint)',
                            color: 'var(--color-text)',
                            borderRadius: 'var(--radius-lg)',
                            border: 'none',
                            outline: 'none',
                        }}
                    />
                </div>

                {/* 操作按钮 */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'center',
                }}>
                    <button
                        onClick={handleConvert}
                        style={{
                            padding: '16px 48px',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            background: 'var(--color-sunny)',
                            color: 'var(--color-white)',
                            borderRadius: 'var(--radius-full)',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: 'none',
                            transform: 'scale(1)',
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        <i className={mode === 'encode' ? 'ri-shield-keyhole-line' : 'ri-key-line'} style={{ marginRight: '8px' }}></i>
                        {mode === 'encode' ? '生成密文' : '解密原文'}
                    </button>

                    <button
                        onClick={toggleMode}
                        style={{
                            padding: '16px 24px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            background: 'var(--surface-lavender)',
                            color: 'var(--color-text)',
                            borderRadius: 'var(--radius-full)',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: 'none',
                        }}
                    >
                        <i className="ri-arrow-left-right-line"></i>
                    </button>
                </div>

                {/* 输出区域 */}
                <div>
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
                            {mode === 'encode' ? '密文' : '原文'}
                        </label>
                        {outputText && (
                            <button
                                onClick={copyToClipboard}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    background: 'var(--color-rose)',
                                    color: 'var(--color-white)',
                                    borderRadius: 'var(--radius-full)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: 'none',
                                }}
                            >
                                <i className="ri-file-copy-line" style={{ marginRight: '6px' }}></i>
                                复制
                            </button>
                        )}
                    </div>
                    <div
                        style={{
                            width: '100%',
                            minHeight: '180px',
                            padding: '20px',
                            fontSize: '1rem',
                            background: 'var(--surface-sunny)',
                            color: 'var(--color-text)',
                            borderRadius: 'var(--radius-lg)',
                            lineHeight: '1.8',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        {outputText || (mode === 'encode' ? '加密后的哈基米密文将显示在这里...' : '解密后的原文将显示在这里...')}
                    </div>
                </div>

                {/* 使用说明 */}
                <div style={{
                    marginTop: '24px',
                    padding: '24px',
                    background: 'var(--surface-rose)',
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
                        fontSize: '0.95rem',
                        color: 'var(--color-text-light)',
                        lineHeight: '2',
                        paddingLeft: '20px',
                    }}>
                        <li>密文仅由"哈基米曼波南北绿豆"九个字和中文标点组成</li>
                        <li>可以设置口令增强安全性，解密时需要相同口令</li>
                        <li>不设置口令也可以加密，但安全性较低</li>
                        <li>点击切换按钮可以快速在加密和解密模式间切换</li>
                        <li>加密后记得保存好口令，否则无法解密</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HachimiCode;
