import { useState, useEffect } from "react";
import type { SendRequest } from "../types";
import api from "../../../lib/api";
import formatDate from "../utils/dateFormat";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import { toast } from "sonner";

interface Filters {
  user_id?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}

export const useSendRequestReport = (filters: Filters) => {
  const [users, setUsers] = useState<SendRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pagination, setPagination] = useState<{ next: string | null; previous: string | null }>({
    next: null,
    previous: null,
  });

  ////////////////// Build query string //////////////////
  const buildQuery = () => {
    const queryParams = Object.entries(filters).reduce((acc, [k, v]) => {
      if (v !== "" && v !== undefined && v !== null) {
        // Only add limit to query if it's specified (not "all")
        if (k === 'limit' && v === -1) {
          // Skip adding limit for "all" option
          return acc;
        }
        acc[k] = String(v);
      }
      return acc;
    }, {} as Record<string, string>);

    return new URLSearchParams(queryParams).toString();
  };

  ////////////////// Fetch Users //////////////////
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const query = buildQuery();
      const res = await api.get(`/send-request-report/${query ? `?${query}` : ""}`);
      const response = res.data;

      const rawData = response.results || [];
      const total = response.count || 0;

      const mapped: SendRequest[] = rawData.map((r: any) => ({
        fromname: r.from_user || "N/A",
        username: r.username || "N/A",
        amount: r.amount || 0,
        status: r.status || "N/A",
        proof: r.payment_method,
        level: r.level || 0,
        requesteddate: formatDate(r.requested_date) || "-",
      }));

      setUsers(mapped);
      setTotalCount(total);
      setPagination({
        next: response.next,
        previous: response.previous,
      });
    } catch (err) {
      setError(extractErrorMessages(err) || "Could not fetch Send Request Report");
    } finally {
      setIsLoading(false);
    }
  };

  ////////////////// Exports //////////////////
  const exportPDF = async () => {
    try {
      const res = await api.get(`/send-request-report/?export=pdf`, { responseType: "blob" });
      downloadFile(res.data, "send-request-report.pdf");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  const exportExcel = async () => {
    try {
      const res = await api.get(`/send-request-report/?export=xlsx`, { responseType: "blob" });
      downloadFile(res.data, "send-request-report.xlsx");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  const exportCSV = async () => {
    try {
      const res = await api.get(`/send-request-report/?export=csv`, { responseType: "blob" });
      downloadFile(res.data, "send-request-report.csv");
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
      ["From Name", "Username", "Amount", "Status", "Proof", "Level", "Date"],
      ...users.map((u) => [
        u.fromname || "N/A",
        u.username || "N/A",
        String(u.amount ?? "0"),
        u.status || "N/A",
        u.proof || "N/A",
        String(u.level ?? "N/A"),
        u.requesteddate || "-",
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
      ["From Name", "Username", "Amount", "Status", "Proof", "Level", "Date"],
      ...users.map((u) => [u.fromname, u.username, String(u.amount), u.status, u.proof, String(u.level), u.requesteddate]),
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
