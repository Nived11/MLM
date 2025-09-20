import { useState, useEffect } from "react";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import api from "../../../lib/api";
import type { NetworkUserType, CountsTypes } from "../types/NetworkTypes";

export const useAdminNetwork = () => {
  const [users, setUsers] = useState<NetworkUserType[]>([]);
  const [counts, setCounts] = useState<CountsTypes>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, _setPageNumber] = useState<number>(1);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/network/", {params: {page:pageNumber}});
      const userData: NetworkUserType[] = response.data.users.map(
        (user: any, i: number) => ({
          id: i + 1,
          username: user.username,
          level: user.level,
          datejoined: user.joindate,
          sponsor: user.sponsor,
          profile: user.profile_image,
          status: user.status,
        })
      );
      const countData: CountsTypes = {
        downline: response.data.counts.total_downline,
        active: response.data.counts.active_count,
        blocked: response.data.counts.blocked_count,
      };
      setCounts(countData);
      setUsers(userData);
    } catch (err) {
      setError(extractErrorMessages(err) || "could not get data");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { users, counts, isLoading, error, refetch: fetchData };
};
