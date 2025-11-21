import React, { useState } from 'react';

const HachimiCode = () => {
    const [inputText, setInputText] = useState('');
    const [password, setPassword] = useState('');
    const [outputText, setOutputText] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'

    // 哈基米词组集：16个指定词组对应4位二进制
    const HACHIMI_WORDS = [
        '哈基米',      // 0
        '曼波哈',      // 1
        '曼波波',      // 2
        '哈哈米',      // 3
        '哈基基',      // 4
        '南绿豆',      // 5
        '北绿豆',      // 6
        '南北绿',      // 7
        '南北豆',      // 8
        '哈哈哈',      // 9
        '北南绿',      // 10
        '北南豆',      // 11
        '南北绿豆',    // 12
        '曼曼波',      // 13
        '南豆豆',      // 14
        '北豆豆'       // 15
    ];
    // 扩充标点符号
    const PUNCTUATION_SINGLE = [
        '，', '。', '！', '？', '、', '；', '：',
        '~', '…', '·'
    ];

    const PUNCTUATION_PAIRS = [
        ['「', '」'],
        ['『', '』'],
        ['（', '）'],
        ['【', '】'],
        ['《', '》']
    ];

    const ALL_PUNCTUATION = [
        ...PUNCTUATION_SINGLE,
        ...PUNCTUATION_PAIRS.flat()
    ];

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

    // 编码：将字节转换为哈基米词组（Base16编码方式，4位一组）
    const encodeToHachimi = (bytes) => {
        const result = [];
        let bitBuffer = 0;
        let bitCount = 0;
        let wordCount = 0;
        let openPairIndex = -1; // 记录当前是否有未闭合的成对标点

        for (let i = 0; i < bytes.length; i++) {
            bitBuffer = (bitBuffer << 8) | bytes[i];
            bitCount += 8;

            while (bitCount >= 4) {
                const index = (bitBuffer >> (bitCount - 4)) & 0x0F; // 取4位 (0-15)
                result.push(HACHIMI_WORDS[index]);
                bitCount -= 4;
                wordCount++;

                // 确保至少还有一个词组要生成，才插入标点（不插入到首尾）
                const hasMoreBits = bitCount > 0 || i < bytes.length - 1;
                const isNotFirst = result.length > 1;

                if (isNotFirst && hasMoreBits) {
                    // 如果有未闭合的成对标点，需要在适当时候闭合
                    if (openPairIndex !== -1 && wordCount >= 1 && Math.random() < 0.5) {
                        result.push(PUNCTUATION_PAIRS[openPairIndex][1]);
                        openPairIndex = -1;
                        wordCount = 0;
                    }
                    // 插入新标点
                    else if (wordCount >= 2 && Math.random() < 0.3) {
                        // 随机选择插入单个标点还是开始一个成对标点
                        if (openPairIndex === -1 && Math.random() < 0.3) {
                            // 开始一个成对标点
                            openPairIndex = Math.floor(Math.random() * PUNCTUATION_PAIRS.length);
                            result.push(PUNCTUATION_PAIRS[openPairIndex][0]);
                            wordCount = 0;
                        } else if (openPairIndex === -1) {
                            // 插入单个标点
                            const punctIndex = Math.floor(Math.random() * PUNCTUATION_SINGLE.length);
                            result.push(PUNCTUATION_SINGLE[punctIndex]);
                            wordCount = 0;
                        }
                    }
                }
            }
        }

        // 处理剩余的位（padding）
        if (bitCount > 0) {
            const index = (bitBuffer << (4 - bitCount)) & 0x0F;
            result.push(HACHIMI_WORDS[index]);
        }

        // 如果还有未闭合的成对标点，在最后闭合
        if (openPairIndex !== -1) {
            result.push(PUNCTUATION_PAIRS[openPairIndex][1]);
        }

        return result.join('');
    };

    // 解码：将哈基米词组转换回字节（贪婪匹配，优先长词组）
    const decodeFromHachimi = (text) => {
        // 移除所有标点符号
        let cleanText = text;
        ALL_PUNCTUATION.forEach(punct => {
            cleanText = cleanText.split(punct).join('');
        });

        console.log('清理后文本:', cleanText);

        // 将文本拆分为词组（贪婪匹配：优先匹配长词组）
        const words = [];
        let i = 0;
        while (i < cleanText.length) {
            let matched = false;
            // 从最长词组(4字)到最短(3字)依次匹配
            for (let len = 4; len >= 3; len--) {
                if (i + len > cleanText.length) continue;
                const word = cleanText.substring(i, i + len);
                const index = HACHIMI_WORDS.indexOf(word);
                if (index !== -1) {
                    console.log(`匹配到词组 "${word}" -> 索引 ${index}`);
                    words.push(index);
                    i += len;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                console.warn(`位置 ${i} 无法识别: ${cleanText.substring(i, i + 4)}`);
                i++; // 跳过一个字符继续
            }
        }

        console.log('词组索引数组:', words);

        // 将词组索引转换为字节
        const bytes = [];
        let bitBuffer = 0;
        let bitCount = 0;

        for (const wordIndex of words) {
            bitBuffer = (bitBuffer << 4) | wordIndex; // 每个词组代表4位
            bitCount += 4;

            while (bitCount >= 8) {
                const byte = (bitBuffer >> (bitCount - 8)) & 0xFF;
                bytes.push(byte);
                bitCount -= 8;
            }
        }

        return new Uint8Array(bytes);
    };

    // 加密处理：文本 -> 加密 -> 编码
    const handleEncode = () => {
        if (!inputText.trim()) {
            setOutputText('');
            return;
        }

        try {
            console.log('=== 加密开始 ===');
            console.log('原文:', inputText);

            // 步骤1: 文本转字节
            const textBytes = textToBytes(inputText);
            console.log('字节数组:', textBytes);
            console.log('字节数:', textBytes.length);

            // 步骤2: 派生密钥并加密
            const key = deriveKey(password, textBytes.length);
            const encrypted = xorCrypt(textBytes, key);
            console.log('加密后:', encrypted);

            // 步骤3: 编码为哈基米词组
            const encoded = encodeToHachimi(encrypted);
            console.log('密文:', encoded);
            console.log('=== 加密完成 ===');

            setOutputText(encoded);
        } catch (error) {
            console.error('加密失败:', error);
            setOutputText('加密失败：' + error.message);
        }
    };

    // 解密处理：解码 -> 解密 -> 转文本
    const handleDecode = () => {
        if (!inputText.trim()) {
            setOutputText('');
            return;
        }

        try {
            console.log('=== 解密开始 ===');
            console.log('密文:', inputText);

            // 步骤1: 解码哈基米词组为字节
            const decoded = decodeFromHachimi(inputText);
            console.log('解码后字节数组:', decoded);
            console.log('解码后字节数:', decoded.length);

            // 步骤2: 派生密钥并解密
            const key = deriveKey(password, decoded.length);
            const decrypted = xorCrypt(decoded, key);
            console.log('解密后字节数组:', decrypted);

            // 步骤3: 字节转文本
            const text = bytesToText(decrypted);
            console.log('解密后文本:', text);
            console.log('=== 解密完成 ===');

            setOutputText(text);
        } catch (error) {
            console.error('解密失败:', error);
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
            padding: 'clamp(12px, 3vw, 24px)',
            minHeight: '100vh',
        }}>
            {/* 标题区域 */}
            <div style={{
                textAlign: 'center',
                marginBottom: 'clamp(24px, 5vw, 40px)',
            }}>
                <h1 style={{
                    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                    marginBottom: '12px',
                    color: 'var(--color-text)',
                    fontWeight: 'normal',
                    fontFamily: 'var(--font-artistic)',
                }}>
                    南北绿豆
                </h1>
                <p style={{
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                    color: 'var(--color-text-light)',
                    marginBottom: '16px',
                    fontStyle: 'italic',
                }}>
                    "语言死的那一天，不是它被禁止，而是它变成所有人都能接受的东西。"
                </p>
                <p style={{
                    fontSize: 'clamp(0.85rem, 2.2vw, 0.9rem)',
                    color: 'var(--color-text-light)',
                    lineHeight: '1.8',
                    maxWidth: '680px',
                    margin: '0 auto',
                }}>
                    一个壳，一个纯粹的壳，没有意义，只剩用法。<br />
                    将你的文字转化为「哈基米曼波南北绿豆」的组合，<br />
                    一词即可千变万化，可以压缩人类语言最精华的部分。
                </p>
            </div>

            {/* 模式切换按钮 */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 'clamp(20px, 4vw, 32px)',
                gap: 'clamp(10px, 2.5vw, 12px)',
                flexWrap: 'wrap',
            }}>
                <button
                    onClick={() => setMode('encode')}
                    style={{
                        padding: 'clamp(10px, 2.5vw, 12px) clamp(24px, 6vw, 32px)',
                        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                        fontWeight: '600',
                        background: mode === 'encode' ? 'var(--color-coral)' : 'var(--surface-peach)',
                        color: mode === 'encode' ? 'var(--color-white)' : 'var(--color-text)',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: 'none',
                    }}
                >
                    <i className="ri-translate" style={{ marginRight: '8px' }}></i>
                    转化为南北绿豆
                </button>
                <button
                    onClick={() => setMode('decode')}
                    style={{
                        padding: 'clamp(10px, 2.5vw, 12px) clamp(24px, 6vw, 32px)',
                        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                        fontWeight: '600',
                        background: mode === 'decode' ? 'var(--color-coral)' : 'var(--surface-peach)',
                        color: mode === 'decode' ? 'var(--color-white)' : 'var(--color-text)',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: 'none',
                    }}
                >
                    <i className="ri-book-open-line" style={{ marginRight: '8px' }}></i>
                    还原为文字
                </button>
            </div>

            {/* 主要内容区域 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 'clamp(16px, 3vw, 24px)',
            }}>
                {/* 输入区域 */}
                <div>
                    <label style={{
                        display: 'block',
                        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: 'clamp(10px, 2.5vw, 12px)',
                    }}>
                        {mode === 'encode' ? '你想说的话' : '南北绿豆的组合'}
                    </label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={mode === 'encode' ? '输入你想表达的内容...' : '输入南北绿豆密文...'}
                        style={{
                            width: '100%',
                            minHeight: 'clamp(150px, 25vh, 180px)',
                            padding: 'clamp(16px, 3.5vw, 20px)',
                            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
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
                        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: 'clamp(10px, 2.5vw, 12px)',
                    }}>
                        暗号（可选）
                    </label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="设置一个只有你们知道的暗号..."
                        style={{
                            width: '100%',
                            padding: 'clamp(14px, 3vw, 16px) clamp(16px, 3.5vw, 20px)',
                            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
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
                    gap: 'clamp(10px, 2.5vw, 12px)',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}>
                    <button
                        onClick={handleConvert}
                        style={{
                            padding: 'clamp(14px, 3vw, 16px) clamp(36px, 8vw, 48px)',
                            fontSize: 'clamp(1rem, 2.8vw, 1.1rem)',
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
                        <i className={mode === 'encode' ? 'ri-quill-pen-line' : 'ri-eye-line'} style={{ marginRight: '8px' }}></i>
                        {mode === 'encode' ? '转化' : '破译'}
                    </button>

                    <button
                        onClick={toggleMode}
                        style={{
                            padding: 'clamp(14px, 3vw, 16px) clamp(20px, 5vw, 24px)',
                            fontSize: 'clamp(1rem, 2.8vw, 1.1rem)',
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
                        marginBottom: 'clamp(10px, 2.5vw, 12px)',
                    }}>
                        <label style={{
                            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                            fontWeight: '600',
                            color: 'var(--color-text)',
                        }}>
                            {mode === 'encode' ? '南北绿豆' : '破译后的文字'}
                        </label>
                        {outputText && (
                            <button
                                onClick={copyToClipboard}
                                style={{
                                    padding: 'clamp(8px, 2vw, 10px) clamp(14px, 3.5vw, 16px)',
                                    fontSize: 'clamp(0.85rem, 2.2vw, 0.9rem)',
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
                            minHeight: 'clamp(150px, 25vh, 180px)',
                            padding: 'clamp(16px, 3.5vw, 20px)',
                            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                            background: 'var(--surface-sunny)',
                            color: 'var(--color-text)',
                            borderRadius: 'var(--radius-lg)',
                            lineHeight: '1.8',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        {outputText || (mode === 'encode' ? '南北绿豆绿南北，绿豆南北北绿豆...' : '破译后的文字将显示在这里...')}
                    </div>
                </div>

                {/* 灵感来源 */}
                <div style={{
                    marginTop: 'clamp(16px, 3vw, 24px)',
                    padding: 'clamp(16px, 4vw, 24px)',
                    background: 'var(--surface-lavender)',
                    borderRadius: 'var(--radius-lg)',
                }}>
                    <h3 style={{
                        fontSize: 'clamp(1rem, 2.8vw, 1.1rem)',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        marginBottom: 'clamp(10px, 2.5vw, 12px)',
                    }}>
                        <i className="ri-quill-pen-line" style={{ marginRight: '8px' }}></i>
                        灵感来源
                    </h3>
                    <p style={{
                        fontSize: 'clamp(0.875rem, 2.3vw, 0.95rem)',
                        color: 'var(--color-text-light)',
                        lineHeight: '1.8',
                        marginBottom: '12px',
                    }}>
                        本工具的创意灵感来自于 <strong>@何大壮</strong> 的随笔《南北绿豆》。
                        在他的文章中，他想象了一个语言退化（或者说进化）的未来——所有人都变成哈基米，嘴里只会说南北绿豆。
                    </p>
                    <p style={{
                        fontSize: 'clamp(0.875rem, 2.3vw, 0.95rem)',
                        color: 'var(--color-text-light)',
                        lineHeight: '1.8',
                        marginBottom: '12px',
                    }}>
                        "它是一个壳，一个纯粹的壳，没有意义，只剩用法。"语言变成了符号的符号，
                        可以装任何东西，每个人都选择自己希望看到的答案。
                    </p>
                    <a
                        href="https://v.douyin.com/g80xF8EM_oI/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: 'clamp(0.85rem, 2.2vw, 0.9rem)',
                            color: 'var(--color-coral)',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'opacity 0.3s',
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                        <i className="ri-external-link-line"></i>
                        阅读原文「南北绿豆」
                    </a>
                </div>

                {/* 使用说明 */}
                <div style={{
                    marginTop: 'clamp(16px, 3vw, 24px)',
                    padding: 'clamp(16px, 4vw, 24px)',
                    background: 'var(--surface-rose)',
                    borderRadius: 'var(--radius-lg)',
                }}>
                    <h3 style={{
                        fontSize: 'clamp(1rem, 2.8vw, 1.1rem)',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        marginBottom: 'clamp(10px, 2.5vw, 12px)',
                    }}>
                        <i className="ri-information-line" style={{ marginRight: '8px' }}></i>
                        使用说明
                    </h3>
                    <ul style={{
                        fontSize: 'clamp(0.875rem, 2.3vw, 0.95rem)',
                        color: 'var(--color-text-light)',
                        lineHeight: '2',
                        paddingLeft: 'clamp(16px, 4vw, 20px)',
                        margin: 0,
                    }}>
                        <li>转化后的文本仅由"哈基米曼波南北绿豆"九个字和中文标点组成</li>
                        <li>可以设置暗号增强隐私性，破译时需要相同暗号</li>
                        <li>不设置暗号也可以转化，但别人更容易破译</li>
                        <li>点击 <i className="ri-arrow-left-right-line" style={{ fontSize: '0.9em' }}></i> 按钮可以快速切换模式</li>
                        <li>转化后记得保存好暗号，否则无法破译</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HachimiCode;
