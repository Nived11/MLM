import { useState, useEffect } from "react";
import type { UserJoining } from "../types";
import api from "../../../lib/api";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import formatDate from "../utils/dateFormat";
import { toast } from "sonner";

interface Filters {
  email?: string;
  user_id?: string;
  from_date?: string;
  end_date?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export const useUserJoining = (filters: Filters) => {
  const [users, setUsers] = useState<UserJoining[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);


  ////////////// Build query string from filters///////////////////

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

  ////////////////////// FETCH USERS /////////////////////

  const fetchUsers = async () => {
    try {
      setIsLoading(true);

      const query = buildQuery();
      const res = await api.get(`/referrals/list/${query ? `?${query}` : ""}`);

      const response = res.data;

      // Handle both cases: array OR { data, total }
      const rawData = Array.isArray(response) ? response : response.data || [];
      const total = Array.isArray(response) ? response.length : response.total || 0;

      const mappedData: UserJoining[] = rawData.map((u: any) => ({
        username: u.user_id,
        fullname: `${u.first_name} ${u.last_name}`,
        email: u.email,
        mobile: u.mobile,
        dateOfJoining: formatDate(u.joined_date),
        referralCount: u.direct_count,
        rank: u.level,
        status: u.status,
      }));

      setUsers(mappedData);
      setTotalCount(total);
    } catch (err) {
      setError(extractErrorMessages(err) || "Could not fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////// PDF & EXCEL EXPORT /////////////////////
  const exportPDF = async () => {
    try {
      // const query = buildQuery();
      const res = await api.get(`/referrals/list/?export=pdf`, {
        responseType: "blob",
      });
      console.log("pdf",res.data)
      downloadFile(res.data, "user-joining.pdf");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };

  const exportExcel = async () => {
    try {
      // const query = buildQuery();
      const res = await api.get(`/referrals/list/?export=xlsx`, {
        responseType: "blob",
      });
      console.log("excel",res.data)
      
      downloadFile(res.data, "user-joining.xlsx");
    } catch (err) {
      toast.error(extractErrorMessages(err));
    }
  };
  ///////////////////// CSV EXPORT /////////////////////
const exportCSV = async () => {
  try {
    // const query = buildQuery();
    const res = await api.get(`/referrals/list/?export=csv`, {
      responseType: "blob",
    });
    console.log("csv",res.data);
    
    downloadFile(res.data, "user-joining.csv");
  } catch (err) {
    toast.error(extractErrorMessages(err));
  }
};

  // shared file download helper
  const downloadFile = (data: Blob, filename: string) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };


  //////////////////// COPY TO CLIPBOARD ///////////////////////////

  const copyToClipboard = async () => {
  if (!users.length) return toast.error("No data to copy");

  const rows = [
    ["Username", "Fullname", "Email", "Mobile", "DateOfJoining", "ReferralCount", "Rank", "Status"],
    ...users.map(u => [
      u.username || "N/A",
      u.fullname || "N/A",
      u.email || "N/A",
      u.mobile || "N/A",
      u.dateOfJoining || "-",
      String(u.referralCount ?? "0"),
      u.rank || "N/A",
      u.status || "N/A",
    ]),
  ];

  const colWidths = rows[0].map((_, i) =>
    Math.max(...rows.map(r => String(r[i]).length))
  );

  const formatted = rows
    .map(r => r.map((c, i) => String(c).padEnd(colWidths[i] + 2)).join(""))
    .join("\n");

  try {
    await navigator.clipboard.writeText(formatted);
    toast.success("Copied to clipboard!");
  } catch (err) {
    console.error("Clipboard copy failed:", err);
    toast.error("Failed to copy to clipboard");
  }
};

  //////////////////// PRINT DATA /////////////////////
  const getPrintData = () => {
    if (!users.length) {
      toast.error("No data to print");
      return null;
    }
    return [
      ["Username", "Fullname", "Email", "Mobile", "DateOfJoining", "ReferralCount", "Rank", "Status"],
      ...users.map((u) => [u.username, u.fullname, u.email, u.mobile, u.dateOfJoining, String(u.referralCount), u.rank, u.status,]),
    ];
  };

  useEffect(() => {
    fetchUsers();
  }, [JSON.stringify(filters)]);

  return { users, isLoading, error, totalCount, exportPDF, exportExcel, copyToClipboard, getPrintData,exportCSV };
};
