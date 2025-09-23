import { useEffect, useState } from "react";
import api from "../../../lib/api";
import type { ReferralUser } from "../type";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const useAllUsers = (page: number, search: string) => {
  const [data, setData] = useState<ReferralUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = `/referrals/list/?page=${page}&page_size=15`;

        if (search) {
          const userIdRegex = /^[A-Z]{2}\d+$/;
          if (userIdRegex.test(search)) {
            url += `&user_id=${search}`;
          } else {
            url += `&email=${search}`;
          }
        }

        const response = await api.get(url);

        setData(response.data.results || []);
        setTotal(response.data.count || 0);
      } catch (err: any) {
        setError(extractErrorMessages(err.message) || "Something went wrong");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search]);

  return { data, loading, error, total };
};
