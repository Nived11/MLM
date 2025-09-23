import React, { useEffect, useState } from 'react';
import axios from "axios";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const baseURL = import.meta.env.VITE_API_URL || "";
interface LevelData {
    level_name: number;
    completed_count: number;
    percentage: number;
}
const SkeletonRow: React.FC = () => (
    <div className="flex items-center justify-between py-4 animate-pulse">
        <div className="h-5 w-24 bg-gray-700 rounded" />
        <div className="flex gap-5">
            <div className="h-5 w-8 bg-gray-700 rounded" />
            <div className="h-5 w-12 bg-gray-700 rounded" />
        </div>
    </div>
);

const LevelUserCount: React.FC = () => {

    const [userLevelData, setUserLevelData] = useState<LevelData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchLevels = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("accessToken");
                const res = await axios.get(`${baseURL}/level-completion/completion-stats/`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                    },
                });
                const data = Array.isArray(res.data) ? res.data : [];
                setUserLevelData(data);
            } catch (err: any) {
                setError(extractErrorMessages(err) || "Failed to fetch level user count");

            } finally {
                setLoading(false);
            }
        };
        fetchLevels();
    }, []);

    if (error) return <div className="text-red-500">{error}</div>;

    const levels: LevelData[] = Array.from({ length: 6 }, (_, i) => {
        const levelNumber = i + 1;
        const found = userLevelData.find((lvl) => lvl.level_name === levelNumber);
        return {
            level_name: levelNumber,
            completed_count: found?.completed_count ?? 0,
            percentage: found?.percentage ?? 0,
        };
    });
    return (
        <div className="rounded-2xl rounded-br-2xl p-[1px] bg-gradient-to-l from-purple-1 to-purple-2 ">
            <div className="rounded-2xl rounded-br-2xl bg-black p-8 ">
                <div>

                    {loading
                        ? Array.from({ length: 6 }).map((_, idx) => (
                            <React.Fragment key={idx}>
                                <SkeletonRow />
                                {idx < 5 && (
                                    <div className="p-[2px] rounded-2xl bg-gradient-to-l from-purple-1 to-purple-2" />
                                )}
                            </React.Fragment>
                        ))
                        : levels.map((userLevel, idx) => (
                            <React.Fragment key={userLevel.level_name}>
                                <div className="flex items-center justify-between py-4">
                                    <span className="text-white text-lg font-medium">Level {userLevel.level_name}</span>
                                    <div className='items-end justify-between '>
                                        <span className="text-white text-lg font-bold mr-5">{userLevel.completed_count}</span>
                                        <span className="text-white text-lg font-bold">{`${userLevel.percentage} %`}</span>
                                    </div>
                                </div>
                                {idx < levels.length && (
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