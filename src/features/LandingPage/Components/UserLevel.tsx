import React, { useEffect, useState } from 'react';
import dolar from "../../../assets/images/dolar.png";
import axios from "axios";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const baseURL = import.meta.env.VITE_API_URL || "";
interface UserLevelData {
    level_name: string;
    target: string;
    received: string;
    balance: string;
    received_percent: number;
    balance_percent: number;
}
const SkeletonCard: React.FC = () => (
    <div className="flex-shrink-0 bg-gradient-to-br to-blue-2 from-blue-1 rounded-2xl sm:rounded-3xl p-4 sm:p-8 relative shadow-lg snap-center w-[220px] sm:w-[260px] md:w-[320px] animate-pulse">
        <div className="h-8 w-8 bg-white/40 rounded-full mb-6" />
        <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="h-5 w-12 bg-white/30 rounded" />
            <div className="h-5 w-12 bg-white/30 rounded" />
            <div className="h-5 w-12 bg-white/30 rounded" />
        </div>
        <div className="h-2 w-full bg-white/20 rounded-full mb-3" />
        <div className="h-2 w-2/3 bg-white/20 rounded-full mb-3" />
        <div className="space-y-2 mt-6">
            <div className="h-3 w-3/4 bg-white/30 rounded" />
            <div className="h-3 w-2/3 bg-white/30 rounded" />
            <div className="h-3 w-1/2 bg-white/30 rounded" />
        </div>
    </div>
);

const UserLevel: React.FC = () => {

    const [userLevels, setUserLevels] = useState<UserLevelData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchLevels = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("accessToken");

                const res = await axios.get(`${baseURL}/user-levels/financial/`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                    },
                });
                setUserLevels(res.data);
            } catch (err: any) {
                setError(extractErrorMessages(err) || "Failed to fetch user levels");
            } finally {
                setLoading(false);
            }
        };
        fetchLevels();
    }, []);

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="w-full max-w-8xl">
            <div
                className="flex space-x-6 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
                style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {loading
                    ? Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)
                    : userLevels.map((user, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 bg-gradient-to-br to-blue-2 from-blue-1 rounded-2xl sm:rounded-3xl p-4 sm:p-8 pb-3 sm:pb-5 pt-4 sm:pt-7 relative shadow-lg snap-center w-[220px] sm:w-[260px] md:w-[320px] lg:w-1/3 min-w-[220px] sm:min-w-[260px] md:min-w-[320px] max-w-[340px]"
                        >
                            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
                            <div className="flex flex-col items-start mb-6">
                                <svg
                                    width="40"
                                    height="10"
                                    viewBox="0 0 68 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-1 sm:ml-1 md:ml-2 lg:ml-1 mb-[-4px] sm:mb-[-6px] w-10 sm:w-12 lg:w-14 h-3 sm:h-4 lg:h-5"
                                    style={{ display: 'block' }}
                                >
                                    <path d="M0.639765 16.3439C28.9322 -12.3919 57.6962 6.97664 67.0217 16.3479" stroke="url(#paint0_linear_44_199)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_44_199" x1="1.45135" y1="7.32896" x2="67.3" y2="13.2571" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#6A00D4" />
                                            <stop offset="1" stopColor="#6C1161" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white flex flex-col items-center justify-center shadow-lg relative" style={{ boxShadow: '0 7px 6px 5px #3A287D , 0 0 0 0 #fff' }}>
                                    <span className="text-lg sm:text-xl font-semibold text-black leading-none">{idx + 1}</span>
                                    <span className="text-black text-[10px] sm:text-xs font-normal tracking-widest mt-1">LEVEL</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-15 mb-4 sm:mb-6">
                                <div className="flex flex-col items-start">
                                    <span className="text-purple-200 text-xs sm:text-sm lg:text-lg  font-normal mt-1 mb-2">Receive</span>
                                    <span className="text-white text-base sm:text-lg font-bold">{user.received.split('.')[0]}</span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-purple-200 text-xs sm:text-sm lg:text-lg font-normal mt-1 mb-2">Target</span>
                                    <span className="text-white text-base sm:text-lg font-bold">{user.target.split('.')[0]}</span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-purple-200 text-xs sm:text-sm lg:text-lg  font-normal mt-1 mb-2">Balance</span>
                                    <span className="text-white text-base sm:text-lg font-bold">{user.balance.split('.')[0]}</span>
                                </div>
                            </div>
                            <div className="mb-2 sm:mb-4 space-y-4 sm:space-y-7 overflow-hidden max-w-full">
                                <div className="w-full max-w-full p-[2px] sm:w-65 sm:max-w-[300px] sm:p-[3px] rounded-full bg-gradient-to-r from-purple-600 via-pink-400 to-yellow-400" />
                                <div className="w-2/3 max-w-full p-[2px] sm:w-45 sm:max-w-[200px] sm:p-[3px] rounded-full bg-gradient-to-r from-purple-600 to-gray-400" />
                            </div>
                            <div className="flex flex-row sm:flex-row items-end justify-between mt-4 sm:mt-8 mb-1 sm:mb-2 gap-4 sm:gap-0">
                                <div className="flex flex-col space-y-2 sm:space-y-4 text-xs sm:text-base">
                                    <div className="flex items-center space-x-2 sm:space-x-4">
                                        <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full inline-block" style={{ background: 'linear-gradient(90deg, #8b35dbff 0%, #FED934 100%)' }}></span>
                                        <span className="text-white font-normal w-10 sm:w-15">Target</span>
                                        <span className="text-white font-normal ml-1 sm:ml-2">100%</span>
                                    </div>
                                    <div className="flex items-center space-x-2 sm:space-x-4">
                                        <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-purple-500 to-gray-400 inline-block"></span>
                                        <span className="text-white font-normal w-10 sm:w-15">Receive</span>
                                        <span className="text-white font-normal ml-1 sm:ml-2">{user.received_percent}%</span>
                                    </div>
                                    <div className="flex items-center space-x-2 sm:space-x-4">
                                        <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400 inline-block"></span>
                                        <span className="text-white font-normal w-10 sm:w-15">Balance</span>
                                        <span className="text-white font-normal ml-1 sm:ml-2">{user.balance_percent}%</span>
                                    </div>
                                </div>
                                <div className="flex-1 flex justify-end">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg relative">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            className="text-white absolute w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                                            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v9m-7-7h14" />
                                        </svg>
                                        <img
                                            src={dolar}
                                            alt="Background Money"
                                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-purple-900 rounded-full absolute"
                                            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default UserLevel;