import React, { useState, useEffect } from 'react';
import type { DashboardStats } from '../services/dashboardService';
import dashboardService from '../services/dashboardService';
import mockDashboardService from '../services/mockDashboardService';

interface StatCard {
    title: string;
    value: string;
}

const StatusCards: React.FC = () => {
    const [stats, setStats] = useState<StatCard[]>([
        { title: 'Total Members', value: '0' },
        { title: 'Total Income', value: '$0' },
        { title: 'Active Levels', value: '0' }
    ]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [usingMockData, setUsingMockData] = useState<boolean>(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            setUsingMockData(false);
            
            // Try real API first
            const data: DashboardStats = await dashboardService.getDashboardStats();
            
            const formattedStats: StatCard[] = [
                { 
                    title: 'Total Members', 
                    value: data.total_members?.toLocaleString() || '0' 
                },
                { 
                    title: 'Total Income', 
                    value: `$${data.total_income?.toLocaleString() || '0'}` 
                },
                { 
                    title: 'Active Levels', 
                    value: data.active_levels?.toString() || '0' 
                }
            ];
            
            setStats(formattedStats);
        } catch (err: any) {
            console.error('Real API failed, falling back to mock data:', err);
            
            // Fall back to mock data
            try {
                const mockData = await mockDashboardService.getDashboardStats();
                const formattedStats: StatCard[] = [
                    { 
                        title: 'Total Members', 
                        value: mockData.total_members?.toLocaleString() || '0' 
                    },
                    { 
                        title: 'Total Income', 
                        value: `$${mockData.total_income?.toLocaleString() || '0'}` 
                    },
                    { 
                        title: 'Active Levels', 
                        value: mockData.active_levels?.toString() || '0' 
                    }
                ];
                
                setStats(formattedStats);
                setUsingMockData(true);
            } catch (mockErr) {
                setError('Failed to load dashboard data');
                setStats([
                    { title: 'Total Members', value: '0' },
                    { title: 'Total Income', value: '$0' },
                    { title: 'Active Levels', value: '0' }
                ]);
            }
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
            {/* Mock Data Warning */}
            {/* {usingMockData && (
                <div className="bg-yellow-900/30 border border-yellow-600/50 text-yellow-300 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-sm">
                        <span>⚠️</span>
                        <span>Using mock data - Backend API is unavailable</span>
                        <button 
                            onClick={fetchDashboardData}
                            className="ml-auto px-2 py-1 bg-yellow-600 text-yellow-100 text-xs rounded hover:bg-yellow-700"
                        >
                            Retry Real API
                        </button>
                    </div>
                </div>
            )} */}

            {/* Error State */}
            {error && !usingMockData && (
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
                        className={`bg-[#121021] text-center rounded-xl p-4 sm:p-6 ${
                            usingMockData ? 'border border-yellow-600/30' : error ? 'border border-red-600/20' : 'border border-green-600/20'
                        }`}
                    >
                        <h3 className="text-xs sm:text-base font-medium mb-2">{stat.title}</h3>
                        <p className="text-base sm:text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusCards;