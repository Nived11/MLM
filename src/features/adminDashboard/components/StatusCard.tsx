import React from 'react';

interface StatCard {
    title: string;
    value: string;
}

const StatusCards: React.FC = () => {
    const stats: StatCard[] = [
        { title: 'Total Members', value: '1,234' },
        { title: 'Total Income', value: '$12,345' },
        { title: 'Active Levels', value: '6' }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 sm:gap-6 gap-3 ">
            {stats.map((stat, index) => (
                <div key={index} className="bg-[#121021] text-center rounded-xl p-4 sm:p-6 ">
                    <h3 className="text-xs sm:text-base font-medium mb-2">{stat.title}</h3>
                    <p className={`text-base sm:text-2xl font-bold `}>{stat.value}</p>
                </div>
            ))
            }
        </div >
    );
};

export default StatusCards;