import { User2 as UserIcon, PieChart as PieIcon } from "lucide-react";
import React, { useEffect, useState } from 'react';
// import chart from "../../../assets/images/chart.png";
import profile from "../../../assets/images/profile.png";
import axios from "axios";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const baseURL = import.meta.env.VITE_API_URL || "";
interface LinkedUser {
    user_id: string;
    username: string;
}
interface UserActivityData {
    level_name: string;
    status: string;
    linked_user: LinkedUser;
    payment_status: string;
}
interface UserInfoResponse {
    username: string;
    user_id: string;
    levels_data: UserActivityData[];
}
const UserActivity: React.FC = () => {

    const [userLevels, setUserLevels] = useState<UserActivityData[]>([]);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchLevels = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("accessToken");

                const res = await axios.get<UserInfoResponse>(`${baseURL}/user-levels/user_info/`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                    },
                });
                setUserLevels(Array.isArray(res.data.levels_data) ? res.data.levels_data : []);
                setUserId(res.data.user_id);
                setUsername(res.data.username);
            } catch (err: any) {
                setError(extractErrorMessages(err) || "Failed to fetch user Activity");
            } finally {
                setLoading(false);
            }
        };
        fetchLevels();
    }, []);

    if (loading) {
        return (
            <div className="bg-gradient-to-br to-blue-2 from-blue-1 rounded-3xl p-4 sm:p-6 flex flex-col gap-10 mb-5 max-w-270 animate-pulse">
                <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-12 lg:gap-18 pl-2 pt-4 sm:pl-5">
                    <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
                        <div className="w-12 h-12 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full bg-gray-500 mb-6 sm:mb-10 lg:mb-13" />
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gray-500 rounded-full" />
                            <div className="h-6 w-24 bg-gray-500 rounded" />
                            <div className="h-6 w-32 bg-gray-500 rounded" />
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex items-center gap-2 sm:gap-8 lg:gap-9 ml-2 sm:ml-6">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-500 rounded-full" />
                        <div className="h-6 w-40 bg-gray-500 rounded" />
                    </div>

                    <div className="pl-10 pr-5 sm:pl-6 md:pl-20 lg:pl-30 lg:pb-6 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 w-full">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <div key={idx} className="flex items-center justify-between xl:justify-start xl:gap-10 w-full">
                                <div className="h-4 w-16 bg-gray-500 rounded" />
                                <div className="h-6 w-24 bg-gray-500 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="bg-gradient-to-br to-blue-2 from-blue-1 rounded-3xl p-4 sm:p-6 flex flex-col gap-10  mb-5 max-w-270 ">
            <div className="flex flex-col w-full">
                <div className="flex flex-col sm:flex-row items-start  gap-6 sm:gap-12 lg:gap-18 pl-2 pt-4 sm:pl-5">
                    <div className="flex flex-col items-center  sm:items-start w-full sm:w-auto">
                        <div className="w-12 h-12 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 mb-6 sm:mb-10 lg:mb-13">
                            <img
                                src={profile}
                                alt="profile image"
                                className="w-15 h-15 sm:w-20 sm:h-20 lg:w-22 lg:h-22 object-cover"
                            />
                        </div>
                        <div className="flex flex-col items-center  sm:flex-row gap-1 sm:gap-6 lg:gap-8">
                            <UserIcon className="text-white w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                            <span className="text-white text-base sm:text-xl lg:text-2xl font-semibold">{userId || "--"}</span>
                            <span className="text-white text-base sm:text-xl lg:text-2xl font-semibold">
                                {username || "--"}
                            </span>
                        </div>
                    </div>

                    {/* <div className="flex-1 flex justify-center sm:justify-start items-center sm:mt-o">
                        <img
                            src={chart}
                            alt="Graph Chart"
                            className="w-full  max-w-[180px] sm:max-w-[320px] lg:max-w-[460px] ml-10 object-contain"
                        />
                    </div> */}
                </div>
            </div>

            <div className="w-full">
                <div className="flex items-center gap-2 sm:gap-8 lg:gap-9 ml-2 sm:ml-6">
                    <PieIcon className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                    <span className="text-white text-base sm:text-xl lg:text-2xl font-semibold">
                        Level Requests
                    </span>
                </div>
                {userLevels.filter(req => req.linked_user.user_id).length === 0 ? (
                    <p className="text-white mt-4 ml-6">No level requests found.</p>
                ) : (
                    <div className="pl-10 pr-5 sm:pl-6 md:pl-20 lg:pl-30 lg:pb-6 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 w-full">
                        {userLevels
                            .filter(req => req.linked_user.user_id)
                            .map((req) => {
                                const isPaid = req.payment_status?.toLowerCase() === "paid";

                                return (
                                    <div
                                        key={`${req.linked_user.user_id}-${req.level_name}`}
                                        className="flex items-center justify-between xl:justify-start xl:gap-10 w-full"
                                    >
                                        <span className="text-white text-xs sm:text-base lg:text-lg font-light sm:mr-6 w-10">
                                            {req.linked_user.user_id}
                                        </span>

                                        {isPaid ? (
                                            <span className="rounded-full  px-3 sm:px-5 lg:px-6 py-1 sm:py-2 text-xs sm:text-sm lg:text-base font-light bg-gradient-to-l from-purple-2 to-purple-1 text-white text-center min-w-[100px] sm:min-w-[120px] lg:min-w-[140px] ">
                                                Approved
                                            </span>
                                        ) : (
                                            <span className="rounded-full px-3 sm:px-5 lg:px-6 py-1 sm:py-2 text-xs sm:text-sm lg:text-base font-light border border-purple-500 text-white text-center min-w-[100px] sm:min-w-[120px] lg:min-w-[140px] ">
                                                Processing
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                )}

            </div>
        </div>
    );
};

export default UserActivity;


