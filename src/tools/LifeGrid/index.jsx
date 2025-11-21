import React, { useState, useEffect, useMemo, useRef } from 'react';
import Slider from '../../components/ui/Slider';
import DatePicker from '../../components/ui/DatePicker';
import './LifeGrid.css';

const LifeGrid = () => {
    // 状态管理
    const [birthDate, setBirthDate] = useState('');
    const [lifeExpectancy, setLifeExpectancy] = useState(80);
    const [workStartAge, setWorkStartAge] = useState(22);
    const [retireAge, setRetireAge] = useState(65);
    const [childBirthAge, setChildBirthAge] = useState(28);
    const [childLeaveAge, setChildLeaveAge] = useState(18);
    const [parentsCurrentAge, setParentsCurrentAge] = useState(55); // 父母当前年龄
    const [parentsLifeExpectancy, setParentsLifeExpectancy] = useState(80); // 父母预期寿命
    const [showConfig, setShowConfig] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date()); // 当前时间，用于实时更新

    const gridRef = useRef(null);

    // 实时更新时间（每秒更新一次）
    useEffect(() => {
        if (!birthDate) return;

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, [birthDate]);

    // 计算当前年龄
    const currentAge = useMemo(() => {
        if (!birthDate) return 0;
        const birth = new Date(birthDate);
        const age = (currentTime - birth) / (1000 * 60 * 60 * 24 * 365.25);
        return Math.max(0, age);
    }, [birthDate, currentTime]);

    // 生成 400 个方块的数据 (20x20) - 连续的时间线逻辑
    const gridData = useMemo(() => {
        const blocks = [];
        const totalBlocks = 400;
        const yearsPerBlock = lifeExpectancy / totalBlocks;

        // 计算各个时间段的方块索引
        const currentBlockIndex = Math.floor(currentAge / yearsPerBlock);

        // 计算未来的时间分配（总共占余生的格子数）
        const futureBlocks = totalBlocks - currentBlockIndex - 1;
        const remainingYears = lifeExpectancy - currentAge;

        // 计算每种类型占用的格子数
        // 睡眠：余生的 33%（8小时/24小时）
        const sleepBlockCount = Math.floor(futureBlocks * 0.33);

        // 工作：从当前年龄到退休年龄的工作时间（每天8小时，即33%）
        const workYears = Math.max(0, retireAge - Math.max(currentAge, workStartAge));
        const workBlockCount = Math.floor((workYears / remainingYears) * futureBlocks * 0.33);

        // 退休：退休后的时间
        const retiredYears = Math.max(0, lifeExpectancy - retireAge);
        const retiredBlockCount = Math.floor((retiredYears / remainingYears) * futureBlocks * 0.15);

        // 陪伴孩子：只有在孩子出生后且未满18岁的时间段内才计算
        let childBlockCount = 0;
        if (currentAge < childBirthAge + childLeaveAge) {
            // 孩子陪伴的起始年龄（如果还没生，就从生孩子开始；如果已经生了，就从现在开始）
            const childStartAge = Math.max(currentAge, childBirthAge);
            // 孩子陪伴的结束年龄（孩子18岁离开）
            const childEndAge = childBirthAge + childLeaveAge;
            // 实际能陪伴孩子的年数
            const childYears = Math.max(0, Math.min(childEndAge, lifeExpectancy) - childStartAge);
            // 每天5小时陪伴 = 约20%的时间
            childBlockCount = Math.floor((childYears / remainingYears) * futureBlocks * 0.2);
        }

        // 陪伴父母：根据父母剩余寿命计算，每月1天 = 约3%
        const parentsRemainingYears = Math.max(0, parentsLifeExpectancy - parentsCurrentAge);
        const parentsYears = Math.min(parentsRemainingYears, remainingYears);
        const parentsBlockCount = Math.floor((parentsYears / remainingYears) * futureBlocks * 0.03);

        for (let i = 0; i < totalBlocks; i++) {
            const blockAge = i * yearsPerBlock;
            let type = 'free';
            let label = '自由时间';

            // 1. 已度过的时间（薄荷绿）
            if (i < currentBlockIndex) {
                type = 'lived';
                label = '已度过';
            }
            // 2. 当前方块（闪烁）
            else if (i === currentBlockIndex) {
                type = 'current';
                label = '现在';
            }
            // 3. 未来时间 - 按顺序连续分配
            else {
                const futureIndex = i - currentBlockIndex - 1;

                // 按照优先级顺序连续分配
                if (futureIndex < sleepBlockCount) {
                    // 睡眠时间（浅蓝色）
                    type = 'sleep';
                    label = '睡眠';
                }
                else if (futureIndex < sleepBlockCount + workBlockCount) {
                    // 工作时间（咖啡色）- 只在工作年龄段
                    if (blockAge >= workStartAge && blockAge < retireAge) {
                        type = 'work';
                        label = '工作';
                    } else {
                        type = 'free';
                        label = '自由时间';
                    }
                }
                else if (futureIndex < sleepBlockCount + workBlockCount + childBlockCount) {
                    // 陪伴孩子时间（桃色）- 只在孩子18岁前
                    if (blockAge >= childBirthAge && blockAge < childBirthAge + childLeaveAge) {
                        type = 'child';
                        label = '陪伴孩子';
                    } else {
                        type = 'free';
                        label = '自由时间';
                    }
                }
                else if (futureIndex < sleepBlockCount + workBlockCount + childBlockCount + parentsBlockCount) {
                    // 陪伴父母时间（玫瑰色）- 未来30年内
                    if (blockAge < currentAge + 30) {
                        type = 'parents';
                        label = '陪伴父母';
                    } else {
                        type = 'free';
                        label = '自由时间';
                    }
                }
                else if (futureIndex < sleepBlockCount + workBlockCount + childBlockCount + parentsBlockCount + retiredBlockCount) {
                    // 退休时间（橙色）- 只在退休后
                    if (blockAge >= retireAge) {
                        type = 'retired';
                        label = '退休生活';
                    } else {
                        type = 'free';
                        label = '自由时间';
                    }
                }
                else {
                    // 自由时间（灰色）
                    type = 'free';
                    label = '自由时间';
                }
            }

            blocks.push({
                id: i,
                age: blockAge,
                type,
                label,
            });
        }

        return blocks;
    }, [birthDate, currentAge, lifeExpectancy, workStartAge, retireAge, childBirthAge, childLeaveAge, parentsCurrentAge, parentsLifeExpectancy]);

    // 计算统计数据
    const stats = useMemo(() => {
        const lived = gridData.filter(b => b.type === 'lived').length;
        const sleep = gridData.filter(b => b.type === 'sleep').length;
        const work = gridData.filter(b => b.type === 'work').length;
        const child = gridData.filter(b => b.type === 'child').length;
        const parents = gridData.filter(b => b.type === 'parents').length;
        const retired = gridData.filter(b => b.type === 'retired').length;
        const free = gridData.filter(b => b.type === 'free').length;
        const total = 400;

        return {
            lived: { count: lived, percent: (lived / total * 100).toFixed(1) },
            sleep: { count: sleep, percent: (sleep / total * 100).toFixed(1) },
            work: { count: work, percent: (work / total * 100).toFixed(1) },
            child: { count: child, percent: (child / total * 100).toFixed(1) },
            parents: { count: parents, percent: (parents / total * 100).toFixed(1) },
            retired: { count: retired, percent: (retired / total * 100).toFixed(1) },
            free: { count: free, percent: (free / total * 100).toFixed(1) },
        };
    }, [gridData]);

    // 计算已过去和剩余的时间详细数据
    const timeDetails = useMemo(() => {
        if (!birthDate) return null;

        const birth = new Date(birthDate);
        const lifeExpectancyMs = lifeExpectancy * 365.25 * 24 * 60 * 60 * 1000;
        const expectedDeathDate = new Date(birth.getTime() + lifeExpectancyMs);

        // 已过去的时间
        const passedMs = currentTime - birth;
        const passedYears = passedMs / (1000 * 60 * 60 * 24 * 365.25);
        const passedMonths = passedYears * 12;
        const passedDays = passedMs / (1000 * 60 * 60 * 24);
        const passedHours = passedMs / (1000 * 60 * 60);
        const passedMinutes = passedMs / (1000 * 60);
        const passedSeconds = passedMs / 1000;

        // 剩余的时间
        const remainingMs = expectedDeathDate - currentTime;
        const remainingYears = remainingMs / (1000 * 60 * 60 * 24 * 365.25);
        const remainingMonths = remainingYears * 12;
        const remainingDays = remainingMs / (1000 * 60 * 60 * 24);
        const remainingHours = remainingMs / (1000 * 60 * 60);
        const remainingMinutes = remainingMs / (1000 * 60);
        const remainingSeconds = remainingMs / 1000;

        return {
            passed: {
                years: passedYears.toFixed(1),
                months: passedMonths.toFixed(1),
                days: passedDays.toFixed(1),
                hours: passedHours.toFixed(1),
                minutes: passedMinutes.toFixed(1),
                seconds: passedSeconds.toFixed(1),
            },
            remaining: {
                years: Math.max(0, remainingYears).toFixed(1),
                months: Math.max(0, remainingMonths).toFixed(1),
                days: Math.max(0, remainingDays).toFixed(1),
                hours: Math.max(0, remainingHours).toFixed(1),
                minutes: Math.max(0, remainingMinutes).toFixed(1),
                seconds: Math.max(0, remainingSeconds).toFixed(1),
            },
        };
    }, [birthDate, lifeExpectancy, currentTime]);

    // 截图保存功能
    const handleSaveImage = async () => {
        if (!gridRef.current) return;

        try {
            // 使用 html2canvas 库
            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(gridRef.current, {
                backgroundColor: '#FFF5F0',
                scale: 2,
            });

            // 转换为图片并下载
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `人生小格_${new Date().toISOString().split('T')[0]}.png`;
                link.click();
                URL.revokeObjectURL(url);
            });
        } catch (error) {
            console.error('保存图片失败:', error);
            alert('保存图片失败，请重试');
        }
    };

    return (
        <div className="life-grid-container">
            {/* 标题 */}
            <div className="life-grid-header">
                <h1 className="life-grid-title">人生小格</h1>
                <p className="life-grid-subtitle">
                    假设你的寿命是 {lifeExpectancy} 岁，这是你的人生 400 个方块
                </p>
            </div>

            {/* 输入配置区域 */}
            <div className="life-grid-config">
                <div className="config-main">
                    <div className="config-input-group">
                        <label className="config-label">你的生日</label>
                        <DatePicker
                            value={birthDate}
                            onChange={setBirthDate}
                            placeholder="点击选择你的生日"
                            maxDate={new Date()}
                        />
                    </div>

                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className="config-toggle-btn"
                    >
                        {showConfig ? '收起设置' : '高级设置'}
                    </button>
                </div>

                {/* 高级设置 */}
                {showConfig && (
                    <div className="config-advanced">
                        <div className="config-slider-group">
                            <label className="config-slider-label">
                                预期寿命: {lifeExpectancy} 岁
                            </label>
                            <Slider
                                value={[lifeExpectancy]}
                                onValueChange={(value) => setLifeExpectancy(value[0])}
                                min={60}
                                max={100}
                                step={1}
                            />
                        </div>
                        <div className="config-slider-group">
                            <label className="config-slider-label">
                                开始工作年龄: {workStartAge} 岁
                            </label>
                            <Slider
                                value={[workStartAge]}
                                onValueChange={(value) => setWorkStartAge(value[0])}
                                min={18}
                                max={30}
                                step={1}
                            />
                        </div>
                        <div className="config-slider-group">
                            <label className="config-slider-label">
                                退休年龄: {retireAge} 岁
                            </label>
                            <Slider
                                value={[retireAge]}
                                onValueChange={(value) => setRetireAge(value[0])}
                                min={50}
                                max={70}
                                step={1}
                            />
                        </div>
                        <div className="config-slider-group">
                            <label className="config-slider-label">
                                生孩子年龄: {childBirthAge} 岁
                            </label>
                            <Slider
                                value={[childBirthAge]}
                                onValueChange={(value) => setChildBirthAge(value[0])}
                                min={20}
                                max={40}
                                step={1}
                            />
                        </div>
                        <div className="config-slider-group">
                            <label className="config-slider-label">
                                父母当前年龄: {parentsCurrentAge} 岁
                            </label>
                            <Slider
                                value={[parentsCurrentAge]}
                                onValueChange={(value) => setParentsCurrentAge(value[0])}
                                min={40}
                                max={90}
                                step={1}
                            />
                        </div>
                        <div className="config-slider-group">
                            <label className="config-slider-label">
                                父母预期寿命: {parentsLifeExpectancy} 岁
                            </label>
                            <Slider
                                value={[parentsLifeExpectancy]}
                                onValueChange={(value) => setParentsLifeExpectancy(value[0])}
                                min={60}
                                max={100}
                                step={1}
                            />
                        </div>
                    </div>
                )}
            </div>

            {birthDate && (
                <div ref={gridRef}>
                    {/* 当前年龄展示 */}
                    <div className="life-grid-age-display">
                        <div className="age-number">{currentAge.toFixed(1)} 岁</div>
                        <div className="age-text">
                            你已经走过了 {stats.lived.percent}% 的人生
                        </div>
                    </div>

                    {/* 时间详细统计 */}
                    {timeDetails && (
                        <div className="time-details-container">
                            <div className="time-details-section">
                                <h3 className="time-details-title">你已经走过的生命</h3>
                                <div className="time-details-grid">
                                    <div className="time-item">
                                        <div className="time-value">{timeDetails.passed.years}</div>
                                        <div className="time-label">年</div>
                                    </div>
                                    <div className="time-item">
                                        <div className="time-value">{timeDetails.passed.months}</div>
                                        <div className="time-label">月</div>
                                    </div>
                                    <div className="time-item">
                                        <div className="time-value">{timeDetails.passed.days}</div>
                                        <div className="time-label">天</div>
                                    </div>
                                    <div className="time-item">
                                        <div className="time-value">{timeDetails.passed.hours}</div>
                                        <div className="time-label">时</div>
                                    </div>
                                    <div className="time-item">
                                        <div className="time-value">{timeDetails.passed.minutes}</div>
                                        <div className="time-label">分</div>
                                    </div>
                                    <div className="time-item">
                                        <div className="time-value">{timeDetails.passed.seconds}</div>
                                        <div className="time-label">秒</div>
                                    </div>
                                </div>
                            </div>

                            <div className="time-details-section">
                                <h3 className="time-details-title">剩下的时间</h3>
                                <div className="time-details-grid">
                                    <div className="time-item">
                                        <div className="time-value">{timeDetails.remaining.years}</div>
                                        <div className="time-label">年</div>
                                    </div>
                                    <div className="time-item">
                                        <div className="time-value">{timeDetails.remaining.months}</div>
                                        <div className="time-label">月</div>
                                    </div>
                                    <div className="time-item">
                                        <div className="time-value">{timeDetails.remaining.days}</div>
                                        <div className="time-label">天</div>
                                    </div>
                                    <div className="time-item">
                                        <div className="time-value">{timeDetails.remaining.hours}</div>
                                        <div className="time-label">时</div>
                                    </div>
                                    <div className="time-item">
                                        <div className="time-value">{timeDetails.remaining.minutes}</div>
                                        <div className="time-label">分</div>
                                    </div>
                                    <div className="time-item">
                                        <div className="time-value">{timeDetails.remaining.seconds}</div>
                                        <div className="time-label">秒</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 人生方格网格 */}
                    <div className="life-grid-main">
                        <div className="grid-container">
                            {gridData.map((block) => (
                                <div
                                    key={block.id}
                                    title={`${block.age.toFixed(1)} 岁 - ${block.label}`}
                                    className={`grid-block grid-block-${block.type}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 图例说明 */}
                    <div className="life-grid-legend">
                        <h3 className="legend-title">图例说明</h3>
                        <div className="legend-items">
                            <div className="legend-item">
                                <div className="legend-color legend-color-lived" />
                                <span>已度过的生命</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color legend-color-current" />
                                <span>当前时刻</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color legend-color-sleep" />
                                <span>睡眠时间 (8小时/天)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color legend-color-work" />
                                <span>工作时间 (8小时/天)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color legend-color-retired" />
                                <span>退休后的时光</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color legend-color-child" />
                                <span>陪伴孩子 (5小时/天, 18年)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color legend-color-parents" />
                                <span>陪伴父母 (1天/月)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color legend-color-free" />
                                <span>自由支配的时间</span>
                            </div>
                        </div>
                    </div>

                    {/* 统计数据 */}
                    <div className="life-grid-stats">
                        <h3 className="stats-title">时间分配统计</h3>
                        <div className="stats-items">
                            {[
                                { key: 'lived', label: '已度过' },
                                { key: 'sleep', label: '睡眠' },
                                { key: 'work', label: '工作' },
                                { key: 'child', label: '陪伴孩子' },
                                { key: 'parents', label: '陪伴父母' },
                                { key: 'retired', label: '退休' },
                                { key: 'free', label: '自由' },
                            ].map(({ key, label }) => (
                                <div key={key} className="stats-item">
                                    <div className={`stats-percent stats-percent-${key}`}>
                                        {stats[key].percent}%
                                    </div>
                                    <div className="stats-label">{label}</div>
                                    <div className="stats-count">{stats[key].count} 格</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 感悟文字 */}
                    <div className="life-grid-quote">
                        <p>
                            "人生不过百年，方块不过四百。<br />
                            珍惜每一格，珍惜每一刻。"
                        </p>
                    </div>
                </div>
            )}

            {birthDate && (
                <div className="life-grid-actions">
                    <button onClick={handleSaveImage} className="action-btn action-btn-save">
                        <i className="ri-download-line"></i>
                        保存为图片
                    </button>
                </div>
            )}

            {!birthDate && (
                <div className="life-grid-empty">
                    请输入你的生日，开始你的人生可视化之旅
                </div>
            )}
        </div>
    );
};

export default LifeGrid;
