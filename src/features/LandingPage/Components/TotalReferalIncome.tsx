import React, { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";
import axios from "axios";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const baseURL = import.meta.env.VITE_API_URL || "";

interface PaymentInfo {
    total_amount_received: number;
    balance_left: number;
}

const TotalReferralIncome: React.FC = () => {
    const [data, setData] = useState<PaymentInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPaymentInfo = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("accessToken");

                const res = await axios.get<PaymentInfo>(`${baseURL}/user-report/total-payment-info/`,
                    {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : undefined,
                        },
                    }
                );
                setData(res.data);
            } catch (err) {
                setError(extractErrorMessages(err) || "Failed to fetch payment info");
            } finally {
                setLoading(false);
            }
        };
        fetchPaymentInfo();
    }, []);

    return (
        <div className="flex items-center gap-4">
            <DollarSign size={24} className="text-yellow-400" />

            {loading ? (
                <div className="h-6 w-24 bg-gray-500 rounded animate-pulse"></div>
            ) : error ? (
                <span className="text-red-500">{error}</span>
            ) : (
                <span className="text-2xl font-bold text-white">
                    {data ? data.total_amount_received.toLocaleString() : 0}
                </span>
            )}
        </div>
    );
};

export default TotalReferralIncome;
