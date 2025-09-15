import React from 'react';

interface LevelData {
    level: number;
    count: number;
    percent: number;
}

const LevelUserCount: React.FC = () => {
    const levelData: LevelData[] = [
        { level: 1, count: 0, percent: 0 },
        { level: 2, count: 0, percent: 0 },
        { level: 3, count: 0, percent: 0 },
        { level: 4, count: 0, percent: 0 },
        { level: 5, count: 0, percent: 0 },
        { level: 6, count: 0, percent: 0 }
    ];

    return (
        <div className="rounded-2xl rounded-br-2xl p-[1px] bg-gradient-to-l from-purple-1 to-purple-2 ">
            <div className="rounded-2xl rounded-br-2xl bg-black p-8 ">
                <div>
                    {levelData.map((level, idx) => (
                        <React.Fragment key={level.level}>
                            <div className="flex items-center justify-between py-4">
                                <span className="text-white text-lg font-medium">Level {level.level}</span>
                                <div className='items-end justify-between '>
                                    <span className="text-white text-lg font-bold mr-5">{level.count}</span>
                                    <span className="text-white text-lg font-bold">{`${level.percent} %`}</span>
                                </div>
                            </div>
                            {idx < levelData.length && (
                                <div className="p-[2px] rounded-2xl bg-gradient-to-l from-purple-1 to-purple-2"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LevelUserCount;