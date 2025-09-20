import { useState, useEffect } from "react";
import api from "../../../lib/api";
import axios from "axios";
import toast from "react-hot-toast";

export interface ReferralData {
  referralLink: string;
}

export const useReferral = () => {
  const [referral, setReferral] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        setLoading(true);
        const response = await api.get("/referral/"); 
        const referralId = response.data.referral_id;
        const fullLink = `https://lioclubx.com/referral/${referralId}`;
        setReferral({ referralLink: fullLink });
      } catch (err : any) {
       let message = "Failed to load account details";
        if (axios.isAxiosError(err)) {
          if (err.response?.data?.error) {
            message = err.response.data.error;
          } else if (err.message) {
            message = err.message;
          }
        }
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchReferral();
  }, []);

  return { referral, loading, error };
};
