// src/components/UserLevelChart.tsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import api from "../../../lib/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type LevelItem = { level: number; count: number };

interface DashboardResponse {
  total_members: number;
  total_income: number;
  total_active_level_6: number;
  new_users_per_level: LevelItem[];
  recent_payments: any[];
  new_user_registrations: any[];
  latest_report: any;
}

const UserLevelChart: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState<LevelItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLevels = async () => {
      setLoading(true);
      try {
        // Changed endpoint to match your actual API
        const res = await api.get("/dashboard/");
        const data: DashboardResponse = res.data;

        // Extract new_users_per_level from the response
        const levelsData = data.new_users_per_level || [];
        setLevels(levelsData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Unable to fetch user levels");
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  // map to chart data
  const labels = levels.map((d) => `Level ${d.level}`);
  const values = levels.map((d) => d.count);

  // Set a reasonable max value
  const maxVal = values.length > 0 ? Math.max(5, Math.max(...values) + 2) : 5;

  const data = {
    labels,
    datasets: [
      {
        label: "New Users",
        data: values,
        backgroundColor: "#7129DD",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { 
        mode: "index" as const, 
        intersect: false,
        callbacks: {
          label: function(context: any) {
            return `New Users: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9ca3af" },
        border: { display: false },
      },
      y: {
        grid: { color: "#FFFFFF17" },
        ticks: {
          color: "#9ca3af",
          stepSize: 1,
          callback: function (value: any) {
            return Number.isInteger(value) ? value : null;
          },
        },
        border: { display: false },
        beginAtZero: true,
        max: maxVal,
      },
    },
  };

  return (
    <div className="bg-[#121021] rounded-xl sm:p-6 p-4 shadow-md">
      <h3 className="text-white text-lg font-semibold mb-6">
        New Users by Level
      </h3>

      <div className="sm:h-60 h-40 mb-6 sm:mr-10 sm:mt-10 sm:ml-4">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Loading...
          </div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : values.length === 0 || values.every(v => v === 0) ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No new users data to display
          </div>
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-gray-400 text-sm sm:ml-4 mr-4">New Users</span>
        <div className="w-34 h-2 bg-[#7129DD] rounded" />
      </div>
    </div>
  );
};

export default UserLevelChart;