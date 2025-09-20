import { useState } from "react";
import type { Payment } from "../types";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import api from "../../../lib/api";
export const usePayments =  () => {
  const [approved, setApproved] = useState<Payment[]>([]);
  const [pending, setPending] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fetchPayments = async  () => {
    try {
      setIsLoading(true);
      const re = await api.get("/payments/");
      const approvedData = re.data.approved.map((data: any, i: number) => ({
        id: i + 1,
        username: data.username,
        level: data.level_name,
        amount: data.amount,
        mode: data.payment_mode,
        transactionId: data.transaction_id,
        status: data.status,
      }));
      const pendingData = re.data.pending.map((data: any, i: number) => ({
        id: i + 1,
        username: data.username,
        level: data.level_name,
        amount: data.amount,
        mode: data.payment_mode,
        transactionId: data.transaction_id,
        status: data.status,
      }));

      setApproved(approvedData);
      setPending(pendingData);
    } catch (error) {
      setError(extractErrorMessages(error));
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, fetchPayments, approved, pending };
};
