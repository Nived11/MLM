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

type LevelItem = { level: string | number; users: number }; // adapt to your API shape

const UserLevelChart: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState<LevelItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLevels = async () => {
      setLoading(true);
      try {
        const res = await api.get("/user-levels/");
        const raw = res.data.data || res.data;

        const formatted: LevelItem[] = Object.entries(raw).map(
          ([level, users]) => ({
            level,
            users: Number(users),
          })
        );

        setLevels(formatted);
      } catch (err) {
        setError("Unable to fetch user levels");
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  // map to chart data (ensure consistent string labels)
  const labels = levels.map((d) => String(d.level));
  const values = levels.map((d) => d.users);

  // optionally set a max that fits your data
  const maxVal = values.length > 0 ? Math.max(20, ...values) : 20;

  const data = {
    labels,
    datasets: [
      {
        label: "Users",
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
      tooltip: { mode: "index" as const, intersect: false },
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
          stepSize: 5,
          callback: function (value: any) {
            return value === 0 ? "0" : value;
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
        ) : values.length === 0 ? (
          <div className="text-gray-400">No data to display</div>
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-gray-400 text-sm sm:ml-4 mr-4">Income</span>
        <div className="w-34 h-2 bg-[#7129DD] rounded" />
      </div>
    </div>
  );
};

export default UserLevelChart;
