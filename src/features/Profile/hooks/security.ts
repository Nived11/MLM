import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import api from "../../../lib/api";

export type ChangePasswordResult = {
  changePassword: (
    oldPassword: string,
    newPassword: string,
    reEnterPassword: string
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: string | null;
  reset: () => void;
};


const isValidPassword = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
  return regex.test(password);
};

export const useChangePassword = (): ChangePasswordResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(null);
  }, []);

  const changePassword = useCallback(
    async (oldPassword: string, newPassword: string, reEnterPassword: string) => {
      
      if (!oldPassword || !newPassword || !reEnterPassword) {
        toast.error("Please fill all fields");
        setError("Please fill all fields");
        return;
      }

      if (newPassword !== reEnterPassword) {
        toast.error("New password and confirmation do not match");
        setError("New password and confirmation do not match");
        return;
      }

      if (!isValidPassword(newPassword)) {
        const message =
          "Password must be at least 8 characters long and include a lowercase letter, a number, and a special character.";
        toast.error(message);
        setError(message);
        return;
      }

      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const token = localStorage.getItem("accessToken");

        await api.post("/change-password/",
          {
            old_password: oldPassword,
            new_password: newPassword,
            re_enter_password: reEnterPassword,
          },
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setSuccess("Password changed successfully");
        toast.success("Password changed successfully!");
      } catch (err: any) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to change password";

        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { changePassword, loading, error, success, reset };
};
