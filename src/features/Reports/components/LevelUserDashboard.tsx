import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useLevelUsers } from "../hooks/levelUsers"

interface Props {
  onApply: (filters: {
    start_date: string;
    end_date: string;
    from_user: string;
    status: string;
  }) => void;
}

const LevelUserDashboard = ({ onApply }: Props) => {
  const [showDashboard, setShowDashboard] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fromUser, setFromUser] = useState("");
  const [status, setStatus] = useState("All");

  const { users } = useLevelUsers({});

  const handleApply = () => {
    onApply({
      start_date: startDate,
      end_date: endDate,
      from_user: fromUser,
      status,
    });
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFromUser("");
    setStatus("All");
    onApply({ start_date: "", end_date: "", from_user: "", status: "All" });
  };

  return (
    <>
      {showDashboard ? (
        <div className="rounded-xl p-[1px] bg-gradient-to-b from-[var(--purple-1)] to-[var(--purple-2)] mb-8">
          <div className="rounded-xl bg-black p-6">
            <h2 className="text-lg font-semibold mb-6 inline-block">
              Report Dashboard
            </h2>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 text-sm">From Date :</label>
                <div className="rounded-md p-[1px] w-full max-w-xs lg:max-w-65 bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-black rounded-md px-4 py-2 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">End Date :</label>
                <div className="rounded-md p-[1px] w-full max-w-xs lg:max-w-65 bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-black rounded-md px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">From User :</label>
                <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] max-w-xs lg:max-w-50">
                  <select
                    value={fromUser}
                    onChange={(e) => setFromUser(e.target.value)}
                    className="w-full bg-black rounded-md px-5 py-2 pr-8 text-white text-sm cursor-pointer focus:outline-none appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "calc(100% - 10px) center",
                      backgroundSize: "30px",
                    }}
                  >
                    <option value="">Select a user</option>
                    {Array.from(new Set(users.map((u) => u.username))).map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">Status :</label>
                <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] max-w-xs lg:max-w-50">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-black rounded-md px-5 py-2 pr-8 text-white text-sm cursor-pointer focus:outline-none appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "calc(100% - 10px) center",
                      backgroundSize: "30px",
                    }}
                  >
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-10">
              <button
                onClick={handleApply}
                className="bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] px-4 py-1 text-sm sm:text-base rounded-lg hover:opacity-90 w-auto"
              >
                Apply
              </button>
              <button
                onClick={handleReset}
                className="bg-blue-600  px-4 py-1 text-sm sm:text-base rounded-lg hover:bg-blue-800  w-auto"
              >
                Reset
              </button>
              <button
                className="bg-white text-[var(--purple-1)] border border-[var(--purple-1)] px-4 py-1 text-sm sm:text-base rounded-lg hover:bg-gray-100  w-auto"
                onClick={() => setShowDashboard(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowDashboard(true)}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--purple-1)] to-[var(--blue-2)] hover:opacity-90"
        >
          <SlidersHorizontal size={18} />
        </button>
      )}
    </>
  );
};

export default LevelUserDashboard;
