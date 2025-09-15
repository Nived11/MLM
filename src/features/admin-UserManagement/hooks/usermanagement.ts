import { useState, useEffect } from "react";
import type { UserManagement } from "../type";
import { dummyData } from "../data/Dummydata";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const userManagement = () => {
  const [users, setUsers] = useState<UserManagement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const fetchUsers = async () => {
   
    try {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 2000));
      setUsers(dummyData);
    } catch (err) {
      setError(extractErrorMessages(err)|| "could not get data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, error, refetch: fetchUsers };
};
