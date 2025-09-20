
import { useEffect, useState } from "react";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import api from "../../../lib/api";
import type { HelpLevel } from "../type";

export const useFetchLevels = () => {
  const [levels, setLevels] = useState<HelpLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        const res = await api.get("/user-levels/");
        console.log("levels:", res.data);

        setLevels(res.data.results || []);
      } catch (err: any) {
        setError(extractErrorMessages(err) || "Could not fetch levels");
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  return { levels, loading, error };
};
