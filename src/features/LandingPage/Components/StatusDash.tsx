import React, { useEffect, useState } from 'react';
import {
  DollarSign,
  ArrowDownToLine,
  ArrowUpToLine,
  Inbox,
  Clock,
  Users
} from 'lucide-react';
import axios from 'axios';
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const baseURL = import.meta.env.VITE_API_URL || "";

interface UserReport {
  pending_send_count: number;
  pending_receive_count: number;
  total_income: number;
  send_help: number;
  receive_help: number;
  referral_count: number;
}

interface StatsCard {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}
const SkeletonCard: React.FC = () => (
  <div className="relative bg-black rounded-tl-2xl rounded-br-2xl border border-yellow-300 p-3 sm:p-5 lg:p-8 min-h-[100px] sm:min-h-[150px] max-w-80 flex flex-col justify-between animate-pulse">
    <div className="h-5 w-16 bg-gray-700 rounded" />
    <div className="mt-4 sm:mt-6 flex justify-between items-center">
      <div className="h-4 w-20 bg-gray-700 rounded" />
      <div className="w-6 h-6 bg-gray-700 rounded-full" />
    </div>
  </div>
);
const StatsDashboard: React.FC = () => {
  const [report, setReport] = useState<UserReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get<UserReport>(`${baseURL}/user-report/user-report/`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined
          }
        });
        setReport(res.data);
      } catch (err) {
        setError(extractErrorMessages(err) || "Failed to fetch user report");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  const statsData: StatsCard[] = report ? [
    { icon: <DollarSign />, title: 'Total Income', value: report.total_income },
    { icon: <ArrowDownToLine />, title: 'Send Help', value: report.send_help },
    { icon: <Inbox />, title: 'Receive Help', value: report.receive_help },
    { icon: <ArrowUpToLine />, title: 'Pending Send Count', value: report.pending_send_count },
    { icon: <Clock />, title: 'Processing Receive Count', value: report.pending_receive_count },
    { icon: <Users />, title: 'Referral Count', value: report.referral_count }
  ] : [];

  return (
    <div className="rounded-2xl rounded-br-2xl p-[1px] bg-gradient-to-l from-purple-1 to-purple-2 max-w-280">
      <div className="rounded-2xl rounded-br-2xl bg-black p-3 sm:p-6 lg:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : statsData.map((stat, index) => (
              <div
                key={index}
                className="relative bg-black rounded-tl-2xl rounded-br-2xl border border-yellow-300 
                         p-3 sm:p-5 lg:p-8 min-h-[100px] sm:min-h-[150px] max-w-80 
                         flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <span className="text-sm xs:text-base sm:text-lg font-bold text-white">
                    {stat.value}
                  </span>
                </div>

                <div className="mt-2 sm:mt-6 lg:mt-8 flex justify-between items-center">
                  <span className="text-[10px] xs:text-xs sm:text-lg font-semibold text-white block">
                    {stat.title}
                  </span>
                  <span className="flex-shrink-0">
                    <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-yellow-400">
                      {stat.icon}
                    </div>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
