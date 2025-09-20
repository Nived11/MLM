import { useState, useEffect } from "react";
import type { LevelUsers } from "../types";
import api from "../../../lib/api";
import formatDate from "../utils/dateFormat";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import { toast } from "sonner";

interface Filters {
  search?: string;
  username?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}

export const useLevelUsers = (filters: Filters) => {
  const [users, setUsers] = useState<LevelUsers[]>([]);
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
      const res = await api.get(`/level-users-report/${query ? `?${query}` : ""}`);
      const response = res.data;

      const rawData = Array.isArray(response) ? response : response.data || [];
      const total = Array.isArray(response) ? response.length : response.total || 0;

      const mapped: LevelUsers[] = rawData.map((r: any) => ({
        username: r.username,
        fromname: r.from_name,
        amount: r.amount,
        proof: r.proof,
        status: r.status,
        level: r.level,
        requesteddate: formatDate(r.requested_date),
        total: r.total,
      }));

      setUsers(mapped);
      setTotalCount(total);
    } catch (err) {
      setError(extractErrorMessages(err) || "Could not fetch Level Users report");
    } finally {
      setIsLoading(false);
    }
  };

  ////////////////// Exports //////////////////
  const exportPDF = async () => {
    try {
      const res = await api.get(`/level-users-report/?export=pdf`, { responseType: "blob" });
      downloadFile(res.data, "level-users.pdf");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  const exportExcel = async () => {
    try {
      const res = await api.get(`/level-users-report/?export=xlsx`, { responseType: "blob" });
      downloadFile(res.data, "level-users.xlsx");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  const exportCSV = async () => {
    try {
      const res = await api.get(`/level-users-report/?export=csv`, { responseType: "blob" });
      downloadFile(res.data, "level-users.csv");
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
      ["Username", "Form Name", "Amount", "Proof", "Status", "Level", "Requested Date", "Total"],
      ...users.map((u) => [
        u.username  || "N/A",
        u.fromname  || "N/A",
        String(u.amount)  || "N/A",
        u.proof || "N/A",
        u.status  || "N/A",
        u.level || "N/A",
        u.requesteddate || "-",
        String(u.total) || "N/A",
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
      ["Username", "Form Name", "Amount", "Proof", "Status", "Level", "Requested Date", "Total"],
      ...users.map((u) => [
        u.username,
        u.fromname,
        String(u.amount),
        u.proof,
        u.status,
        u.level,
        u.requesteddate,
        String(u.total),
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
    exportPDF,
    exportExcel,
    exportCSV,
    copyToClipboard,
    getPrintData,
    refetch: fetchUsers,
  };
};
