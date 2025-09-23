import { useState } from "react";
import api from "../../../lib/api";

interface ManualPaymentResponse {
  message: string;
  payment_token: string;
  payment_data: {
    id: number;
    payment_token: string;
    level_name: string;
    user_id: string;
    username: string;
    user_email: string;
    amount: string;
    status: string;
    payment_proof_url: string;
  };
}

export const useManualPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadPayment = async (formData: FormData): Promise<ManualPaymentResponse> => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<ManualPaymentResponse>(
        "/manual-payment/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Manual Payment Response:", res.data);
      return res.data;
    } catch (err: any) {
       console.error(" Manual Payment Error:", err);
      setError(err?.response?.data?.message || "Upload failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadPayment, loading, error };
};