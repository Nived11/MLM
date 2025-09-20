import { useState, useEffect } from "react";
import type { compactUserManagement } from "../type";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import api from "../../../lib/api";

export const useUserManagement = () => {
  const [compactUser, setCompactUser] = useState<compactUserManagement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompactUsers = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("admin/users/compact/");
      const userData: compactUserManagement[] = res.data.map(
        (user: any, i: number) => ({
          id: i + 1,
          userId: user.user_id,
          username: user.username,
          level: user.level,
          profile: user.profile_image,
          status: user.status,
        })
      );
      setCompactUser(userData);
    } catch (err) {
      setError(extractErrorMessages(err) || "could not get data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompactUsers();
  }, []);

  return { compactUser, isLoading, error, refetch: fetchCompactUsers };
};
