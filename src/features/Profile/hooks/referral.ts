import { useState, useEffect } from "react";

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
        await new Promise((resolve) => setTimeout(resolve, 500)); // simulate API delay
        setReferral({
          referralLink: "https://lioclubx.com/referral/LX88011",
        });
      } catch {
        setError("Failed to load referral data");
      } finally {
        setLoading(false);
      }
    };

    fetchReferral();
  }, []);

  return { referral, loading, error };
};
