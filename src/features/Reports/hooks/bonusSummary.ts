import { useState, useEffect } from "react";
import type { BonusSummary } from "../types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import api from "../../../lib/api";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import { toast } from "sonner";

interface Filters {
  search?: string;
  from_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}

export const useBonusSummary = (filters: Filters = {}) => {
  const [users, setUsers] = useState<BonusSummary[]>([]);
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
      const res = await api.get(`/bonus-summary/${query ? `?${query}` : ""}`);
      const response = res.data;

      const rawData = response.results || [];
      const total = response.count || 0;

      const mapped: BonusSummary[] = rawData.map((r: any) => ({
        id: r.id,
        username: r.username,
      }));

      setUsers(mapped);
      setTotalCount(total);
      setPagination({
        next: response.next,
        previous: response.previous,
      });
    } catch (err) {
      setError(extractErrorMessages(err) || "Could not fetch Bonus Summary");
    } finally {
      setIsLoading(false);
    }
  };

  ////////////////// Download / Open Single Invoice //////////////////

  const handleInvoicePDF = async (record_id: number, type: "download" | "view" = "download") => {
    try {
      const res = await api.get(`/bonus-summary/?export=pdf&record_id=${record_id}`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      if (type === "view") {
        window.open(url, "_blank");
      } else {
        downloadFile(blob, `bonus-summary-${record_id}.pdf`);
      }
    } catch (err) {
      console.error("Invoice PDF failed:", err);
      toast.error(extractErrorMessages(err) || "Failed to fetch invoice PDF");
    }
  };



  ////////////////// Exports //////////////////
  const downloadFile = (data: Blob, filename: string) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const exportPDF = () => {
    if (!users.length) return toast.error("No data to export");

    const doc = new jsPDF();
    const rows = users.map((u, idx) => [idx + 1, u.username || "N/A", u.invoice || "N/A"]);

    autoTable(doc, {
      head: [["#", "Username", "Invoice"]],
      body: rows,
    });
    doc.save("bonus-summary.pdf");
  };

  const exportExcel = () => {
    if (!users.length) return toast.error("No data to export");

    const wsData = [
      ["#", "Username", "Invoice"],
      ...users.map((u, idx) => [idx + 1, u.username || "N/A", u.invoice || "N/A"]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BonusSummary");
    XLSX.writeFile(wb, "bonus-summary.xlsx");
  };

  const exportCSV = () => {
    if (!users.length) return toast.error("No data to export");

    const rows = [
      ["#", "Username", "Invoice"],
      ...users.map((u, idx) => [String(idx + 1), u.username || "N/A", u.invoice || "N/A"]),
    ];

    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    downloadFile(blob, "bonus-summary.csv");
  };


  ////////////////// Copy //////////////////
  const copyToClipboard = async () => {
    if (!users.length) return toast.error("No data to copy");

    const rows = [
      ["#", "Username", "Invoice"],
      ...users.map((u, idx) => [String(idx + 1) || "N/A", u.username || "N/A", u.invoice || "N/A"]),
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
      ["#", "Username", "Invoice"],
      ...users.map((u, idx) => [String(idx + 1), u.username || "N/A", u.invoice || "N/A"]),
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
    handleInvoicePDF,
  };
};
