import { useState, useEffect } from "react";
import type { AucReport } from "../types";
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

export const useAucReport = (filters: Filters) => {
  const [users, setUsers] = useState<AucReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

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
      const res = await api.get(`/auc-report/${query ? `?${query}` : ""}`);
      const response = res.data;

      const rawData = Array.isArray(response) ? response : response.data || [];
      const total = Array.isArray(response) ? response.length : response.total || 0;

      const mapped: AucReport[] = rawData.map((r: any) => ({
        fromuser: r.from_user,
        amount: r.amount,
        status: r.status,
        proof: r.proof,
        date: formatDate(r.date),
      }));

      setUsers(mapped);
      setTotalCount(total);
    } catch (err) {
      setError(extractErrorMessages(err) || "Could not fetch AUC Report");
    } finally {
      setIsLoading(false);
    }
  };

  ////////////////// Exports //////////////////
  const exportPDF = async () => {
    try {
      const res = await api.get(`/auc-report/?export=pdf`, { responseType: "blob" });

      downloadFile(res.data, "auc-report.pdf");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  const exportExcel = async () => {
    try {
      const res = await api.get(`/auc-report/?export=xlsx`, { responseType: "blob" });
      downloadFile(res.data, "auc-report.xlsx");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  const exportCSV = async () => {
    try {
      const res = await api.get(`/auc-report/?export=csv`, { responseType: "blob" });
      downloadFile(res.data, "auc-report.csv");
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
  const copyToClipboard = async() => {
    if (!users.length) return toast.error("No data to copy");

    const rows = [
      ["From User", "Amount", "Status", "Proof", "Date"],
      ...users.map((u) => [u.fromuser || "N/A", String(u.amount) || "N/A", u.status || "N/A", u.proof || "N/A", u.date || "N/A"]),
    ];

    const colWidths = rows[0].map((_, i) => Math.max(...rows.map((r) => r[i].length)));
    const formatted = rows
      .map((r) => r.map((c, i) => c.padEnd(colWidths[i] + 2)).join(""))
      .join("\n");

    try {
    await navigator.clipboard.writeText(formatted);
    toast.success("Copied to clipboard!");
  } catch (err) {
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
      ["From User", "Amount", "Status", "Proof", "Date"],
      ...users.map((u) => [u.fromuser, String(u.amount), u.status, u.proof, u.date]),
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
    exportPDF,
    exportExcel,
    exportCSV,
    copyToClipboard,
    getPrintData,
    refetch: fetchUsers,
  };
};
