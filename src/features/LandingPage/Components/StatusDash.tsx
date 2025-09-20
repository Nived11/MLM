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

export const baseURL = import.meta.env.VITE_API_URL || "";

interface UserReport {
  username: string;
  level_completed: number;
  total_received: number;
  pending_send_count: number;
  total_amount_generated: number;
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
        setError("Failed to fetch user report");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!report) return null;

  const statsData: StatsCard[] = [
    { icon: <DollarSign />, title: 'Total Income', value: report.total_income },
    { icon: <ArrowDownToLine />, title: 'Send Help', value: report.send_help },
    { icon: <Inbox />, title: 'Receive Help', value: report.receive_help },
    { icon: <ArrowUpToLine />, title: 'Pending Send Count', value: report.pending_send_count },
    { icon: <Clock />, title: 'Processing Receive Count', value: report.pending_receive_count },
    { icon: <Users />, title: 'Referral Count', value: report.referral_count }
  ];

  return (
    <div className="rounded-2xl rounded-br-2xl p-[1px] bg-gradient-to-l from-purple-1 to-purple-2 max-w-280">
      <div className="rounded-2xl rounded-br-2xl bg-black p-3 sm:p-6 lg:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {statsData.map((stat, index) => (
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
