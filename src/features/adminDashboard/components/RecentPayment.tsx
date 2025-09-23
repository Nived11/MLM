import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import api from "../../../lib/api";

interface Payment {
    id: string;
    name: string;
    amount: number;
    date: string;
    status: 'paid' | 'pending';
    user_id?: string;
}

interface DashboardResponse {
    total_members: number;
    total_income: number;
    total_active_level_6: number;
    new_users_per_level: any[];
    recent_payments: Payment[];
    new_user_registrations: any[];
    latest_report: any;
}

const RecentPayments: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                const res = await api.get("/dashboard/");
                const data: DashboardResponse = res.data;
                
                // Extract recent_payments from the response
                const paymentsData = data.recent_payments || [];
                setPayments(paymentsData);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError("Unable to fetch recent payments");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    return (
        <div className="bg-[#121021] rounded-xl p-4 sm:p-6">
            <h3 className="text-white text-lg font-semibold mb-6">Recent Payments</h3>
            
            {loading ? (
                <div className="flex items-center justify-center py-8 text-gray-400">
                    Loading...
                </div>
            ) : error ? (
                <div className="text-red-400 py-4">{error}</div>
            ) : payments.length === 0 ? (
                <div className="flex items-center justify-center py-8 text-gray-400">
                    No recent payments 
                </div>
            ) : (
                <div className="space-y-4 sm:pl-2">
                    {payments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                                    <User size={18} className="text-black" />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm sm:text-lg">{payment.name}</p>
                                    <p className="text-gray-400 text-sm">{formatDate(payment.date)}</p>
                                    {payment.amount && (
                                        <p className="text-purple-400 text-xs">{formatAmount(payment.amount)}</p>
                                    )}
                                </div>
                            </div>
                            <span className={`py-1 sm:py-2 rounded-full text-xs font-medium ${
                                payment.status === 'paid'
                                    ? 'bg-purple-700 text-white sm:px-9 px-5'
                                    : 'text-white border border-purple-900 sm:px-6 px-2'
                            }`}>
                                {payment.status === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentPayments;