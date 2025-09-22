import { useState, useEffect } from "react";
import type { PayoutReport } from "../types";
import api from "../../../lib/api";
import formatDate from "../utils/dateFormat";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import { toast } from "sonner";

interface Filters {
  search?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}

export const usePayoutReport = (filters: Filters) => {
  const [users, setUsers] = useState<PayoutReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pagination, setPagination] = useState<{
    next: string | null;
    previous: string | null;
  }>({
    next: null,
    previous: null,
  });

  ////////////////// Build query string //////////////////
  const buildQuery = () => {
    return new URLSearchParams(
      Object.entries(filters).reduce((acc, [k, v]) => {
        if (v !== "" && v !== undefined && v !== null) {
          acc[k] = String(v);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();
  };

  ////////////////// Fetch Users //////////////////
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const query = buildQuery();
      const res = await api.get(`/payment-report/${query ? `?${query}` : ""}`);
      const response = res.data;

      const rawData = response.results || [];
      const total = response.count || 0;

      const mapped: PayoutReport[] = rawData.map((r: any) => ({
        username: r.username,
        amount: Number(r.amount),
        status: r.status,
        payoutamount: Number(r.payout_amount),
        transactionfee: Number(r.transaction_fee),
        requesteddate: formatDate(r.requested_date),
        total: Number(r.total),
      }));

      setUsers(mapped);
      setTotalCount(total);
      setPagination({
        next: response.next,
        previous: response.previous,
      });
    } catch (err) {
      setError(extractErrorMessages(err) || "Could not fetch Payout Report");
    } finally {
      setIsLoading(false);
    }
  };

  ////////////////// Exports //////////////////
  const exportPDF = async () => {
    try {
      const res = await api.get(`/payment-report/?export=pdf`, { responseType: "blob" });
      downloadFile(res.data, "payout-report.pdf");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  const exportExcel = async () => {
    try {
      const res = await api.get(`/payment-report/?export=xlsx`, { responseType: "blob" });
      downloadFile(res.data, "payout-report.xlsx");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  const exportCSV = async () => {
    try {
      const res = await api.get(`/payment-report/?export=csv`, { responseType: "blob" });
      downloadFile(res.data, "payout-report.csv");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  ////////////////// File Downloader //////////////////
  const downloadFile = (data: Blob, filename: string) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  ////////////////// Copy //////////////////
  const copyToClipboard = async () => {
    if (!users.length) return toast.error("No data to copy");

    const rows = [
      ["Username", "Amount", "Status", "Payout Amount", "Transaction Fee", "Requested Date", "Total"],
      ...users.map((u) => [
        u.username || "N/A",
        u.amount.toFixed(2) || "N/A",
        u.status || "N/A",
        u.payoutamount.toFixed(2) || "N/A",
        u.transactionfee.toFixed(2) || "N/A",
        u.requesteddate || "N/A",
        u.total.toFixed(2) || "N/A",
      ]),
    ];

    const colWidths = rows[0].map((_, i) => Math.max(...rows.map((r) => r[i].length)));
    const formatted = rows
      .map((r) => r.map((c, i) => c.padEnd(colWidths[i] + 2)).join(""))
      .join("\n");

    try {
      await navigator.clipboard.writeText(formatted);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  ////////////////// Print //////////////////
  const getPrintData = () => {
    if (!users.length) {
      toast.error("No data to print");
      return null;
    }
    return [
      ["Username", "Amount", "Status", "Payout Amount", "Transaction Fee", "Requested Date", "Total"],
      ...users.map((u) => [
        u.username,
        u.amount.toFixed(2),
        u.status,
        u.payoutamount.toFixed(2),
        u.transactionfee.toFixed(2),
        u.requesteddate,
        u.total.toFixed(2),
      ]),
    ];
  };

  useEffect(() => {
    fetchUsers();
  }, [JSON.stringify(filters)]);

  return {
    users,
    isLoading,
    error,
    totalCount,
    next: pagination.next,
    previous: pagination.previous,
    exportPDF,
    exportExcel,
    exportCSV,
    copyToClipboard,
    getPrintData,
    refetch: fetchUsers,
  };
};
