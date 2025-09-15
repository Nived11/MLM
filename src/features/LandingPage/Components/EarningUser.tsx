import React from 'react';
import { DollarSign } from 'lucide-react';

interface UserCard {
    id: string;
    name: string;
    avatar: string;
    amount: string;
    type: 'level-help' | 'refer-help';
    date: string;
    time: string;
}

const EarningUsers: React.FC = () => {
    const earningUsers: UserCard[] = [
        {
            id: '1',
            name: 'Mary margret Self',
            avatar: '',
            amount: '300',
            type: 'level-help',
            date: '2025-08-30',
            time: '10:29:38'
        },
        {
            id: '2',
            name: 'Shukoor. P.A',
            avatar: '',
            amount: '1000',
            type: 'refer-help',
            date: '2025-08-30',
            time: '10:29:38'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
            {earningUsers.map((user) => (
                <div
                    key={user.id}
                    className="rounded-3xl sm:rounded-4xl p-[1px] bg-gradient-to-l from-purple-1 to-purple-2"
                >
                    <div
                        className="bg-black rounded-3xl sm:rounded-4xl p-4 sm:p-8 flex flex-col min-h-[220px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[355px] xl:min-h-[300px]"
                    >
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <span className="text-sm md:text-base lg:text-xl xl:text-2xl font-bold text-yellow-400">
                                {user.type === 'level-help'
                                    ? 'Latest Level Help Request'
                                    : 'Latest Refer Help Request'}
                            </span>
                        </div>
                        <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row items-center mb-4 sm:mb-6">
                            <div className="flex flex-col items-center mr-0 sm:mr-6 mb-4 sm:mb-0">
                                <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex items-center justify-center">
                                    <svg width="48" height="48" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="28" cy="28" r="28" fill="#E5E7EB" />
                                        <path d="M28 30c-5.523 0-10 4.03-10 9v1h20v-1c0-4.97-4.477-9-10-9z" fill="#A3A3A3" />
                                        <ellipse cx="28" cy="20" rx="7" ry="8" fill="#A3A3A3" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center md:flex-col">
                                <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row items-center mb-2">
                                    <p className="text-white text-base md:text-xl lg:text-2xl  font-semibold m-0 sm:mr-4 mb-0 mt-0 sm:mt-3 text-center sm:text-left">{user.name}</p>
                                    <span className="bg-yellow-400 text-black font-semibold rounded-full px-4 sm:px-6 py-1 sm:py-2 text-xs sm:text-base mt-2 sm:mt-3">Approved</span>
                                </div>
                                <div className="flex flex-col items-center md:items-center lg:items-center xl:items-start">
                                    <div className="flex items-center space-x-2 mt-2 sm:mt-3">
                                        <span className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-white">{user.amount}</span>
                                        <DollarSign size={24} className="sm:size-[28px] text-yellow-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end justify-between gap-8 sm:gap-16">
                            <span className="text-gray-400 text-sm sm:text-lg mt-2">{user.date}</span>
                            <span className="text-gray-400 text-sm sm:text-lg">{user.time}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EarningUsers;