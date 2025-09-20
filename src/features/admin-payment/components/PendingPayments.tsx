import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import ApprovalBox from "./ApprovalBox";
import { usePayments } from "../hooks/usePayments";
import { Skeleton } from "../../../components/ui/skeleton";
import type { Payment } from "../types";

const PendingPayments = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [approvedDialog, setApprovedDialog] = useState(false);
  const [declinedDialog, setDeclinedDialog] = useState(false);

  const { isLoading, error, fetchPayments, pending } = usePayments();

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
            {error || "Failed to load pending payments."}
          </td>
        </tr>
      );
    }

    if (pending.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="py-6 text-center text-gray-400">
            No pending payments found.
          </td>
        </tr>
      );
    }

    return pending.map((p: Payment) => (
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
          <div className="w-[98px] h-[30px] p-[2px] rounded-[41px] bg-gradient-to-r from-[#6E07CF] to-[#6C1161] inline-flex items-center justify-center">
            <Button
              onClick={() => setOpenDialog(true)}
              className="w-full h-full rounded-[41px] bg-[#121021] flex items-center justify-center text-xs font-light text-white hover:bg-[#121021] hover:text-white"
            >
              {p.status}
            </Button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="bg-background text-foreground p-4 sm:p-6 rounded-2xl relative">
      <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-4 sm:mb-6">
        Pending Payment Approvals
      </h2>

      <div className="overflow-x-auto rounded-2xl bg-[#0E0B1A] p-4">
        <table className="w-full text-sm sm:text-base text-white border-collapse">
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

      <ApprovalBox
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        approvedDialog={approvedDialog}
        setApprovedDialog={setApprovedDialog}
        declinedDialog={declinedDialog}
        setDeclinedDialog={setDeclinedDialog}
      />
    </div>
  );
};

export default PendingPayments;
