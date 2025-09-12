import Pagination from "./Pagination";
import { useState } from "react";
import ReportHeading from "./ReportHeading";
import { useUserJoining } from "../hooks/userJoining";
import SkeletonTable from "./SkeletonTable";
import { SlidersHorizontal } from "lucide-react";

const UserJoining = () => {
  const { users, isLoading, error } = useUserJoining();
  const [showDashboard, setShowDashboard] = useState(true);
  return (
    <>
      <div className="px-4 py-4  text-white">
        <ReportHeading />
        <div className="py-8 text-white">
          {showDashboard ? (
            <div className="rounded-xl p-[1px] bg-gradient-to-b from-[var(--purple-1)] to-[var(--purple-2)] mb-8">
              <div className="rounded-xl bg-black p-6">
                <h2 className="text-lg font-semibold mb-6 inline-block">
                  Report Dashboard
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-2 text-sm">From Date :</label>
                    <div className="rounded-md p-[1px] w-full max-w-xs lg:max-w-65  bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]">
                      <input
                        type="date"
                        className="w-full bg-black rounded-md px-4 py-2 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">End Date :</label>
                    <div className="rounded-md p-[1px] w-full max-w-xs lg:max-w-65 bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]">
                      <input
                        type="date"
                        className="w-full bg-black rounded-md px-3 py-2 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Status :</label>
                    <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] max-w-xs lg:max-w-50">
                      <select
                        className="w-full bg-black rounded-md px-5 py-2 pr-8 text-white text-sm cursor-pointer focus:outline-none appearance-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "calc(100% - 10px) center",
                          backgroundSize: "30px",
                        }}
                      >
                        <option>All</option>
                        <option>Completed</option>
                        <option>Pending</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-10">
                  <button className="bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] px-4 py-1 text-sm sm:text-base rounded-lg hover:opacity-90 w-auto">
                    Apply
                  </button>
                  <button className="bg-blue-600  px-4 py-1 text-sm sm:text-base rounded-lg hover:bg-blue-800  w-auto">
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

          <div className=" rounded-xl p-[1px] bg-gradient-to-b from-[var(--purple-1)] to-[var(--purple-2)]">
            <div className="rounded-xl bg-black p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Joiners</h2>

              <div className="mb-6 p-[1px] w-full max-w-lg sm:max-w-xl lg:max-w-2xl rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-black rounded-md p-2 px-4 text-white focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-4 mb-8">
                <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] flex-1 min-w-[100px] sm:flex-none sm:w-auto">
                  <button className="px-2 sm:px-3 py-1 rounded-md bg-black text-white w-full hover:bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] text-xs sm:text-sm whitespace-nowrap">
                    Copy
                  </button>
                </div>
                <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] flex-1 min-w-[100px] sm:flex-none sm:w-auto">
                  <button className="px-2 sm:px-3 py-1 rounded-md bg-black text-white w-full hover:bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] text-xs sm:text-sm whitespace-nowrap">
                    CSV
                  </button>
                </div>
                <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] flex-1 min-w-[100px] sm:flex-none sm:w-auto">
                  <button className="px-2 sm:px-3 py-1 rounded-md bg-black text-white w-full hover:bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] text-xs sm:text-sm whitespace-nowrap">
                    PDF
                  </button>
                </div>
                <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] flex-1 min-w-[100px] sm:flex-none sm:w-auto ">
                  <button className="px-2 sm:px-3 py-1 rounded-md bg-black text-white w-full hover:bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] text-xs sm:text-sm whitespace-nowrap">
                    Print
                  </button>
                </div>
                <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] flex-1 min-w-[100px] sm:flex-none sm:w-auto">
                  <button className="px-2 sm:px-3 py-1 rounded-md bg-black text-white w-full hover:bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] text-xs sm:text-sm whitespace-nowrap">
                    Excel
                  </button>
                </div>
                <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] flex-1 min-w-[140px] sm:flex-none sm:w-auto">
                  <select
                    className="w-full bg-black rounded-md px-5 pr-8 py-1 text-white text-xs sm:text-sm cursor-pointer focus:outline-none appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "calc(100% - 10px) center",
                      backgroundSize: "20px",
                    }}
                  >
                    <option value="10">Show 10 rows</option>
                    <option value="50">Show 50 rows</option>
                    <option value="100">Show 100 rows</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto rounded-md border-[1px] border-transparent p-[1px] bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] ">
                <table className="w-full  text-xs sm:text-sm text-white bg-black rounded-md min-w-0  sm:min-w-0">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-4">USERNAME</th>
                      <th className="px-2 py-4">FULLNAME</th>
                      <th className="px-2 py-4">EMAIL</th>
                      <th className="px-2 py-4">MOBILE</th>
                      <th className="px-2 py-4 whitespace-nowrap min-w-[120px]">
                        DATE OF JOINING
                      </th>
                      <th className="px-2 py-4 whitespace-nowrap min-w-[120px]">
                        REFERRAL COUNT
                      </th>
                      <th className="px-2 py-4">RANK</th>
                      <th className="px-3 py-4">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <SkeletonTable rows={5} columns={8} />
                    ) : error ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center py-4 text-red-500"
                        >
                          {error}
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center py-4 border border-gray-800 rounded-md"
                        >
                          No Data found
                        </td>
                      </tr>
                    ) : (
                      users.map((user, idx) => (
                        <tr
                          key={idx}
                          className="bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] hover:bg-purple-800 border-b-2 border-black rounded-lg"
                        >
                          <td className="px-4 py-3">{user.username}</td>
                          <td className="px-2 py-3">{user.fullname}</td>
                          <td className="px-2 py-3">{user.email}</td>
                          <td className="px-2 py-3">{user.mobile}</td>
                          <td className="px-2 py-3 whitespace-nowrap">
                            {user.dateOfJoining}
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap">
                            {user.referralCount}
                          </td>
                          <td className="px-2 py-3">{user.rank}</td>
                          <td className="px-2 py-3">
                            {user.status === "Completed" ? (
                              <span className="px-3 py-1 text-xs font-medium rounded-full border border-gray-400 bg-gradient-to-r from-[var(--purple-2)] to-[var(--purple-1)]">
                                {user.status}
                              </span>
                            ) : (
                              <span className="px-5 py-1 text-xs font-medium rounded-full border border-gray-400 bg-transparent">
                                {user.status}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                    <tr>
                      <th className=" py-[2px]"></th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserJoining;
