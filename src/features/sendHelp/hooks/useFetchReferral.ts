
import { useState, useEffect } from "react";
import api from "../../../lib/api";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import type { Referral } from "../type";


export const useFetchReferral = (levelId: number | string, enabled: boolean) => {
  const [referral, setReferral] = useState<Referral | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !levelId) return; 

    const fetchReferral = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/user-levels/${levelId}/referrer_details/`);
        console.log("Referral fetched:", response.data);
        setReferral(response.data);
      } catch (err: any) {
        setError(
          extractErrorMessages(err) ||
            "Failed to fetch profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReferral();
  }, [levelId, enabled]);

  return { referral, loading, error };
};
