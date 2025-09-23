import { useState, useEffect } from "react";
import type { RebirthUsers } from "../types";
import api from "../../../lib/api";
import formatDate from "../utils/dateFormat";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import { toast } from "sonner";

interface Filters {
  email?: string;
  user_id?: string;
  referred_by_name?: string;
  referred_by_id?: string;
  mobile?: string;
  from_date?: string;
  end_date?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export const useRebirthReportusers = (filters: Filters) => {
  const [users, setUsers] = useState<RebirthUsers[]>([]);
  const [alluser, setAlluser] = useState<RebirthUsers[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingAll, setIsLoadingAll] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorAll, setErrorAll] = useState<string | null>(null);
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

  ////////////////// Fetch Filtered Users //////////////////
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const query = buildQuery();
      const res = await api.get(`/referrals/list/${query ? `?${query}` : ""}`);
      const response = res.data;
      const rawData = response.results || [];
      const total = response.count || 0;

      const mapped: RebirthUsers[] = rawData.map((r: any) => ({
        username: r.user_id,
        fullname: `${r.first_name} ${r.last_name}`,
        sponsorid: r.referred_by_id,
        sponsorname: r.referred_by_name,
        placementid: r.placement_id || "_",
        email: r.email,
        mobile: r.mobile,
        dateofjoining: formatDate(r.joined_date),
        status: r.status,
      }));
      setUsers(mapped);
      setTotalCount(total);
      setPagination({
        next: response.next,
        previous: response.previous,
      });
    } catch (err) {
      setError(extractErrorMessages(err) || "Could not fetch users");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [JSON.stringify(filters)]);

  ////////////////// Fetch All Users //////////////////

  const fetchAllUsers = async () => {
    try {
      setIsLoadingAll(true);
      setErrorAll(null);
      const res = await api.get(`/referrals/list/`);
      const response = res.data;
      const rawData = response.results || [];
      const mapped: RebirthUsers[] = rawData.map((r: any) => ({
        username: r.user_id,
        fullname: `${r.first_name} ${r.last_name}`,
        sponsorid: r.referred_by_id,
        sponsorname: r.referred_by_name,
        placementid: r.placement_id || "_",
        email: r.email,
        mobile: r.mobile,
        dateofjoining: formatDate(r.joined_date),
        status: r.status,
      }));
      setAlluser(mapped);
    } catch (err) {
      setErrorAll(extractErrorMessages(err) || "something went wrong");
    } finally {
      setIsLoadingAll(false);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  ////////////////// Exports //////////////////
  const exportPDF = async () => {
    try {
      const res = await api.get(`/referrals/export/?export=pdf`, { responseType: "blob" });
      downloadFile(res.data, "rebirth-users.pdf");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  const exportExcel = async () => {
    try {
      const res = await api.get(`/referrals/export/?export=xlsx`, { responseType: "blob" });
      downloadFile(res.data, "rebirth-users.xlsx");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  const exportCSV = async () => {
    try {
      const res = await api.get(`/referrals/export/?export=csv`, { responseType: "blob" });
      downloadFile(res.data, "rebirth-users.csv");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

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
      ["Username", "Fullname", "SponsorName", "PlacementID", "Email", "Mobile", "DateOfJoining", "Status"],
      ...users.map((u) => [
        u.username || "N/A",
        u.fullname || "N/A",
        u.sponsorname || "N/A",
        u.placementid || "N/A",
        u.email || "N/A",
        u.mobile || "N/A",
        u.dateofjoining || "N/A",
        u.status || "N/A",
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
      ["Username", "Fullname", "SponsorName", "PlacementID", "Email", "Mobile", "DateOfJoining", "Status"],
      ...users.map((u) => [
        u.username,
        u.fullname,
        u.sponsorname,
        u.placementid,
        u.email,
        u.mobile,
        u.dateofjoining,
        u.status,
      ]),
    ];
  };



  return {
    users,
    alluser,
    isLoading,
    isLoadingAll,
    error,
    errorAll,
    totalCount,
    next: pagination.next,
    previous: pagination.previous,
    exportPDF,
    exportExcel,
    exportCSV,
    copyToClipboard,
    getPrintData,
  };
};
