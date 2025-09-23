import React, { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react';
import { useSidebar } from "../../../components/ui/sidebar";
import axios from "axios";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const baseURL = import.meta.env.VITE_API_URL || "";
interface UserCard {
    user_id: string;
    name: string;
    avatar: string;
    amount: string;
    type: 'level-help' | 'refer-help';
    date: string;
    time: string;
}
const SkeletonCard: React.FC = () => {
    return (
        <div className="rounded-3xl p-[1px] bg-gradient-to-l from-purple-1 to-purple-2 animate-pulse">
            <div className="bg-black rounded-3xl p-4 sm:p-8 flex flex-col min-h-[220px]">
                <div className="h-5 w-48 bg-gray-700 rounded mb-6" />
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-700" />
                    <div className="flex-1">
                        <div className="h-5 w-32 bg-gray-700 rounded mb-3" />
                        <div className="h-4 w-20 bg-gray-700 rounded mb-4" />
                        <div className="h-6 w-24 bg-gray-700 rounded" />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="h-4 w-20 bg-gray-700 rounded" />
                    <div className="h-4 w-12 bg-gray-700 rounded" />
                </div>
            </div>
        </div>
    );
};

const EarningUsers: React.FC = () => {
    const { open } = useSidebar();
    const [earnUser, setEarnUser] = useState<UserCard[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchLevels = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("accessToken");

                const res = await axios.get(`${baseURL}/user-latest-report/`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                    },
                });
                const latestReport = res.data.latest_report;
                const cards: UserCard[] = [
                    {
                        user_id: `level-${latestReport.latest_level_user.user_id}`,
                        name: `${latestReport.latest_level_user.first_name} ${latestReport.latest_level_user.last_name}`,
                        amount: latestReport.latest_level_user.amount.toString(),
                        avatar: '',
                        type: 'level-help',
                        date: latestReport.latest_level_user?.time?.split(' ')[0] || 'N/A',
                        time: latestReport.latest_level_user?.time?.split(' ')[1] || 'N/A',
                    },
                    {
                        user_id: `refer-${latestReport.latest_refer_user.user_id}`,
                        name: `${latestReport.latest_refer_user.first_name} ${latestReport.latest_refer_user.last_name}`,
                        amount: latestReport.latest_refer_user.amount.toString(),
                        avatar: '',

                        type: 'refer-help',
                        date: latestReport.latest_refer_user?.time?.split(' ')[0] || 'N/A',
                        time: latestReport.latest_refer_user?.time?.split(' ')[1] || 'N/A',
                    },
                ];

                setEarnUser(cards);
            } catch (err: any) {
                setError(extractErrorMessages(err) || "Failed to fetch earning user");
            } finally {
                setLoading(false);
            }
        };
        fetchLevels();
    }, []);
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className={`gap-4 sm:gap-6 md:gap-6 lg:gap-8 xl:max-w-210
        ${open
                ? "grid md:grid-cols-1 lg:grid-cols-2"
                : "grid grid-cols-1 md:grid-cols-2 lg:max-w-180"
            }`}>
            {loading ? [1, 2].map((i) => <SkeletonCard key={i} />)
                : earnUser.map((user) => (
                    <div
                        key={user.user_id}
                        className="rounded-3xl sm:rounded-4xl p-[1px] bg-gradient-to-l from-purple-1 to-purple-2"
                    >
                        <div
                            className="bg-black rounded-3xl sm:rounded-4xl p-4 sm:p-8 flex flex-col min-h-[220px] sm:min-h-[300px] md:min-h-[200px] lg:min-h-[200px] xl:min-h-[100px]  pb-0"
                        >
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <span className="text-sm md:text-base lg:text-xl  font-bold text-yellow-400">
                                    {user.type === 'level-help'
                                        ? 'Latest Level Help Request'
                                        : 'Latest Refer Help Request'}
                                </span>
                            </div>
                            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row  mb-4 sm:mb-6">
                                <div className="flex flex-col items-center md:mr-0 sm:mr-4 mb-4 sm:mb-0">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        <svg width="50" height="50" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="28" cy="28" r="28" fill="#E5E7EB" />
                                            <path d="M28 30c-5.523 0-10 4.03-10 9v1h20v-1c0-4.97-4.477-9-10-9z" fill="#060606ff" />
                                            <ellipse cx="28" cy="20" rx="7" ry="8" fill="#060606ff" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col justify-center md:flex-col">
                                    <div className={`flex flex-row lg:flex-col xl:flex-row items-center justify-between md:items-start sm:ml-4 mb-2 ${open ? "md:flex-row" : "md:flex-col "}`}>
                                        <p className={`text-white text-base md:text-xl  font-semibold m-0 xl:mb-0 mt-0 text-center sm:text-left ${open ? "md:mb-3" : "md:mb-3"}`}>{user.name}</p>
                                        <span className="bg-yellow-400 text-black font-semibold rounded-full px-4 sm:px-3 py-1 sm:py-1 text-xs sm:text-sm sm:mr-0">Approved</span>
                                    </div>
                                    <div className="flex flex-col items-center md:items-start md:ml-5 lg:items-start xl:items-start">
                                        <div className="flex items-center space-x-2 mt-2 sm:mt-0 ">
                                            <span className="text-xl md:text-xl lg:text-xl xl:text-2xl font-bold text-white">{user.amount}</span>
                                            <DollarSign size={24} className="sm:size-[24px] text-yellow-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-end justify-between gap-8 mb-3 sm:mb-0">
                                <span className="text-gray-400 text-sm sm:text-base">{user.date}</span>
                                <span className="text-gray-400 text-sm sm:text-base">{user.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default EarningUsers;