import React, { useState, useEffect } from 'react';
import api from "../../../lib/api";

interface StatCard {
    title: string;
    value: string;
}

interface DashboardResponse {
    total_members: number;
    total_income: number;
    total_active_level_6: number;
    new_users_per_level: any[];
    recent_payments: any[];
    new_user_registrations: any[];
    latest_report: any;
}

const StatusCards: React.FC = () => {
    const [stats, setStats] = useState<StatCard[]>([
        { title: 'Total Members', value: '0' },
        { title: 'Total Income', value: '$0' },
        { title: 'Active Level 6', value: '0' }
    ]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const res = await api.get("/dashboard/");
            const data: DashboardResponse = res.data;
            
            const formattedStats: StatCard[] = [
                { 
                    title: 'Total Members', 
                    value: data.total_members?.toLocaleString() || '0' 
                },
                { 
                    title: 'Total Income', 
                    value: `₹${data.total_income?.toLocaleString() || '0'}` 
                },
                { 
                    title: 'Active Level 6', 
                    value: data.total_active_level_6?.toString() || '0' 
                }
            ];
            
            setStats(formattedStats);
        } catch (err: any) {
            console.error('Failed to fetch dashboard data:', err);
            setError('Failed to load dashboard data');
            
            // Keep default values on error
            setStats([
                { title: 'Total Members', value: '0' },
                { title: 'Total Income', value: '₹0' },
                { title: 'Active Level 6', value: '0' }
            ]);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 sm:gap-6 gap-3">
                {[1, 2, 3].map((index) => (
                    <div key={index} className="bg-[#121021] text-center rounded-xl p-4 sm:p-6">
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-600 rounded mb-2"></div>
                            <div className="h-8 bg-gray-600 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {error && (
                <div className="bg-red-900/30 border border-red-600/50 text-red-300 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-sm">
                        <span>❌</span>
                        <span>{error}</span>
                        <button 
                            onClick={fetchDashboardData}
                            className="ml-auto px-2 py-1 bg-red-600 text-red-100 text-xs rounded hover:bg-red-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 sm:gap-6 gap-3">
                {stats.map((stat, index) => (
                    <div 
                        key={index} 
                        className="bg-[#121021] text-center rounded-xl p-4 sm:p-6 border border-purple-600/20 hover:border-purple-500/30 transition-colors"
                    >
                        <h3 className="text-gray-400 text-xs sm:text-base font-medium mb-2">{stat.title}</h3>
                        <p className="text-white text-base sm:text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusCards;