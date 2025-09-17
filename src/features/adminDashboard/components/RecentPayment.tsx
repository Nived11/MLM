import React from 'react';
import { User } from 'lucide-react';

interface Payment {
    id: string;
    name: string;
    date: string;
    status: 'paid' | 'pending';
}

const RecentPayments: React.FC = () => {
    const payments: Payment[] = [
        { id: '1', name: 'Anrawan', date: 'December 9, 2024', status: 'paid' },
        { id: '2', name: 'Steve', date: 'December 9, 2024', status: 'pending' },
        { id: '3', name: 'Dhalarika', date: 'December 9, 2024', status: 'paid' },
        { id: '4', name: 'Anvar', date: 'December 9, 2024', status: 'pending' },
        { id: '5', name: 'Lakshmi', date: 'December 9, 2024', status: 'paid' }
    ];

    return (
        <div className="bg-[#121021] rounded-xl p-4 sm:p-6">
            <h3 className="text-white text-lg font-semibold mb-6">Recent Payments</h3>

            <div className="space-y-4 sm:pl-2">
                {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                                <User size={18} className="text-black" />
                            </div>
                            <div>
                                <p className="text-white font-medium text-sm sm:text-lg">{payment.name}</p>
                                <p className="text-gray-400 text-sm">{payment.date}</p>
                            </div>
                        </div>
                        <span className={`py-1 sm:py-2 rounded-full text-xs  font-medium ${payment.status === 'paid'
                            ? 'bg-purple-700 text-white sm:px-9 px-5'
                            : 'text-white border border-purple-900 sm:px-6 px-2'
                            }`}>
                            {payment.status === 'paid' ? 'Paid' : 'Pending'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentPayments;