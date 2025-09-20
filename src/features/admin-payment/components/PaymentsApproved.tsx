import { useEffect } from "react";
import { usePayments } from "../hooks/usePayments";
import type { Payment } from "../types";
import { Skeleton } from "../../../components/ui/skeleton";

const PaymentsApproved = () => {
  const { isLoading, error, fetchPayments, approved } = usePayments();

  useEffect(() => {
    fetchPayments();
  }, []);

  const renderRows = () => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <tr
          key={index}
          className="border-b border-[#1c1a29] text-xs text-center"
        >
          <td className="py-3 px-2 sm:px-4">
            <Skeleton className="h-4 w-24 rounded mx-auto" />
          </td>
          <td className="py-3 px-2 sm:px-4">
            <Skeleton className="h-4 w-16 rounded mx-auto" />
          </td>
          <td className="py-3 px-2 sm:px-4">
            <Skeleton className="h-4 w-20 rounded mx-auto" />
          </td>
          <td className="py-3 px-2 sm:px-4">
            <Skeleton className="h-4 w-20 rounded mx-auto" />
          </td>
          <td className="py-3 px-2 sm:px-4">
            <Skeleton className="h-4 w-28 rounded mx-auto" />
          </td>
          <td className="py-3 px-2 sm:px-4">
            <Skeleton className="h-[30px] w-[98px] rounded-[41px] mx-auto" />
          </td>
        </tr>
      ));
    }

    if (error) {
      return (
        <tr>
          <td colSpan={6} className="py-6 text-center text-red-500">
            {error || "Failed to load approved payments."}
          </td>
        </tr>
      );
    }

    if (approved.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="py-6 text-center text-gray-400">
            No approved payments found.
          </td>
        </tr>
      );
    }

    return approved.map((p: Payment) => (
      <tr
        key={p.id || p.transactionId}
        className="border-b border-[#1c1a29] text-xs last:border-none text-center"
      >
        <td className="py-3 px-2 sm:px-4">{p.username}</td>
        <td className="py-3 px-2 sm:px-4">{p.level}</td>
        <td className="py-3 px-2 sm:px-4">{p.amount}</td>
        <td className="py-3 px-2 sm:px-4">{p.mode}</td>
        <td className="py-3 px-2 sm:px-4">{p.transactionId}</td>
        <td className="py-3 px-2 sm:px-4">
          <div className="inline-flex items-center justify-center px-4 py-1 text-xs font-light text-white w-[98px] h-[30px] rounded-[41px] bg-gradient-to-r from-[#6A00D4] to-[#5C1053]">
            {p.status === "paid" ? "Paid" : "Unpaid"}
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="bg-background text-foreground p-4 sm:p-6 rounded-2xl">
      <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-4 sm:mb-6">
        Payments Approved
      </h2>

      <div className="overflow-x-auto rounded-2xl bg-[#0E0B1A] p-4">
        <table className="w-full text-sm sm:text-base text-white">
          <thead className="uppercase text-sm font-normal text-white border-b border-[#1c1a29]">
            <tr className="text-center">
              <th className="pb-3 px-2 sm:px-4">Username</th>
              <th className="pb-3 px-2 sm:px-4">Level</th>
              <th className="pb-3 px-2 sm:px-4">Amount</th>
              <th className="pb-3 px-2 sm:px-4">Payment Mode</th>
              <th className="pb-3 px-2 sm:px-4">Transaction ID</th>
              <th className="pb-3 px-2 sm:px-4">Status</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsApproved;
