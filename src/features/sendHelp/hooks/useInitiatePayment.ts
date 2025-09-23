import { useEffect, useState } from "react";
import api from "../../../lib/api"; 

export interface InitiatePaymentResponse {
  payment_method: string;
  message: string;
  user_level_id: number;
  referrer_details: {
    upi_number: string;
    user_id: string;
    full_name: string;
  };
  level_name: string;
  payment_amount: number;
}

export const useInitiatePayment = (levelId?: string | number, trigger = false) => {
  const [data, setData] = useState<InitiatePaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!levelId || !trigger) return;
    const fetchPayment = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("type:",typeof(levelId))
        console.log("Fetching payment for levelId:", levelId);
        const res = await api.post<InitiatePaymentResponse>(
          "/initiate-payment/",
          { user_level_id: levelId,  payment_method: "Manual" }
        );
          console.log("Initiate Payment Response:", res.data);
        setData(res.data);
      } catch (err: any) {
        console.error("Payment API error:", err);
        setError(err?.response?.data?.message || "Failed to initiate payment");
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [levelId, trigger]);

  return { data, loading, error };
};