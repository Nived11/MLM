import React, { useEffect, useState } from 'react';
import api from "../../../lib/api";

interface NewUser {
    user_id: string;
    username: string;
    levels_done: number;
}

interface DashboardResponse {
    total_members: number;
    total_income: number;
    total_active_level_6: number;
    new_users_per_level: any[];
    recent_payments: any[];
    new_user_registrations: NewUser[];
    latest_report: any;
}

const NewUserRegistrations: React.FC = () => {
    const [newUsers, setNewUsers] = useState<NewUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewUsers = async () => {
            setLoading(true);
            try {
                const res = await api.get("/dashboard/");
                const data: DashboardResponse = res.data;
                
                // Extract new_user_registrations from the response
                const usersData = data.new_user_registrations || [];
                setNewUsers(usersData);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError("Unable to fetch new user registrations");
            } finally {
                setLoading(false);
            }
        };

        fetchNewUsers();
    }, []);

    const getLevelDisplay = (levelsDone: number) => {
        if (levelsDone === 0) {
            return "GETTING STARTED";
        }
        return `LEVEL ${levelsDone}`;
    };

    const getLevelColor = (levelsDone: number) => {
        if (levelsDone === 0) {
            return "text-orange-400";
        }
        return "text-green-400";
    };

    return (
        <div className="bg-[#121021] rounded-xl sm:p-6 p-4">
            <h3 className="text-white text-lg font-semibold mb-6">New User Registrations</h3>

            {loading ? (
                <div className="flex items-center justify-center py-8 text-gray-400">
                    Loading...
                </div>
            ) : error ? (
                <div className="text-red-400 py-4">{error}</div>
            ) : newUsers.length === 0 ? (
                <div className="flex items-center justify-center py-8 text-gray-400">
                    No new user registrations to display
                </div>
            ) : (
                <div className="space-y-4">
                    {newUsers.map((user, index) => (
                        <div key={user.user_id}>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-white font-medium text-md sm:text-lg">
                                        {user.username}
                                    </span>
                                    <span className="text-gray-500 text-xs sm:text-sm">
                                        ID: {user.user_id}
                                    </span>
                                </div>
                                <span className={`text-sm sm:text-lg font-medium ${getLevelColor(user.levels_done)}`}>
                                    {getLevelDisplay(user.levels_done)}
                                </span>
                            </div>
                            {index < newUsers.length - 1 && (
                                <hr className='mt-2 sm:mt-4 border border-[#FFFFFF17]' />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewUserRegistrations;