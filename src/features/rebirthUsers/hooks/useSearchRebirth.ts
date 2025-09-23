import { useState } from "react"; 
import api from "../../../lib/api";
import type { RebirthUser } from "../type";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const useSearchRebirth = () => {
  const [users, setUsers] = useState<RebirthUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      let res;

      const userIdRegex = /^[A-Z]{2}\d+$/; 
      if (userIdRegex.test(query)) {
        res = await api.get(`/referrals/list/?user_id=${query}`);
      } else {
        res = await api.get(`/referrals/list/?email=${query}`);
      }

      setUsers(res.data.results || []);
    } catch (err: any) {
      setError(extractErrorMessages(err.message) || "Something went wrong");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, fetchUsers };
};
