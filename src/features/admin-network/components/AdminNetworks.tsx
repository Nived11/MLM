import { useState } from "react";
import Header from "../../Profile/components/header";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router-dom";
import { useAdminNetwork } from "../hooks/useAdminNetwork";
import NetworkCard from "./NetworkCard";
import { Skeleton } from "../../../components/ui/skeleton";
import placeholderImage from "../../../assets/images/profile.png";


const AdminNetwork = () => {
  const { users, isLoading, error } = useAdminNetwork();

  // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Pending"
  >("All");
  const [levelFilter, setLevelFilter] = useState<number | "All">("All");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  if (!users) return null;

  // filter logic
  const filteredData = users.filter((user) => {
    const matchesName = user.username
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ? true : user.status === statusFilter;
    const matchesLevel =
      levelFilter === "All" ? true : user.level === (levelFilter as number);
    return matchesName && matchesStatus && matchesLevel;
  });

  // pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Export CSV
  const handleExportCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "network.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Network Report", 14, 10);

    const tableData = filteredData.map((u) => [
      u.username,
      `Level ${u.level}`,
      u.datejoined,
      u.sponsor,
      u.status,
    ]);

    autoTable(doc, {
      head: [["Username", "Level", "Date Joined", "Sponsor", "Status"]],
      body: tableData,
    });

    doc.save("network.pdf");
  };

  return (
    <div>
      <Header />
      <h1 className="text-2xl sm:text-3xl font-bold mb-5">Network</h1>

      {/* Stats Cards */}
      <NetworkCard
        downline={filteredData.length}
        active={filteredData.filter((u) => u.status === "Active").length}
        blocked={filteredData.filter((u) => u.status === "Pending").length}
        isLoading={isLoading}
      />

      <div className="p-4 sm:p-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:space-x-3 gap-3 mb-6">
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-purple-1 to-purple-2 w-full sm:w-1/3">
            <Input
              type="text"
              placeholder="Search by Username"
              className="bg-black px-4 py-2 rounded-lg w-full border-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="bg-white/10 px-4 py-2 rounded-lg text-white w-full sm:w-auto"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "All" | "Active" | "Pending")
            }
          >
            <option value="All" className="text-black">
              All Status
            </option>
            <option value="Active" className="text-black">
              Active
            </option>
            <option value="Pending" className="text-black">
              Pending
            </option>
          </select>

          <select
            className="bg-white/10 px-4 py-2 rounded-lg w-full sm:w-auto"
            value={levelFilter}
            onChange={(e) => {
              const val = e.target.value;
              setLevelFilter(val === "All" ? "All" : parseInt(val));
            }}
          >
            <option value="All" className="text-black">
              View by level
            </option>
            {[...new Set(users.map((u) => u.level))].map((lvl) => (
              <option key={lvl} value={lvl} className="text-black">
                Level {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}

        {error && <p className="text-red-500">Error: {error}</p>}

        {!error && (
          <>
            <div className="p-[1px] rounded-2xl bg-gradient-to-r from-purple-1  to-purple-2 mb-4">
              <div className="overflow-x-auto sm:overflow-visible rounded-2xl">
                <table className="min-w-full bg-black rounded-2xl text-sm sm:text-base">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-700">
                        Profile
                      </th>
                      <th className="py-2 px-4 border-b border-gray-700">
                        Username
                      </th>
                      <th className="py-2 px-4 border-b border-gray-700">
                        Level
                      </th>
                      <th className="py-2 px-4 border-b border-gray-700">
                        Date Joined
                      </th>
                      <th className="py-2 px-4 border-b border-gray-700">
                        Sponsor
                      </th>
                      <th className="py-2 px-4 border-b border-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading
                      ? Array.from({ length: 12 }).map((_, idx) => (
                          <tr key={idx} className="text-white text-center">
                            <td className="py-2 px-4 border-b border-gray-700">
                              <Skeleton className="w-10 h-10 rounded-full mx-auto" />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-700">
                              <Skeleton className="h-8 w-24 rounded-md mx-auto" />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-700">
                              <Skeleton className="h-8 w-16 rounded-md mx-auto" />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-700">
                              <Skeleton className="h-8 w-24 rounded-md mx-auto" />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-700">
                              <Skeleton className="h-8 w-20 rounded-md mx-auto" />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-700">
                              <Skeleton className="h-8 w-20 rounded-md mx-auto" />
                            </td>
                          </tr>
                        ))
                      : paginatedData.map((user) => (
                          <tr key={user.id} className="text-white text-center">
                            <td className="py-2 px-4 border-b flex justify-center items-center border-gray-700">
                              <img
                                src={
                                  user.profile instanceof File
                                    ? URL.createObjectURL(user.profile)
                                    : user.profile || placeholderImage
                                }
                                alt={user.username || "User"}
                                className="w-10 h-10 rounded-full"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    placeholderImage;
                                }}
                              />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-700">
                              <Link
                                to={`/networks/hierarchical-view`}
                                className="text-purple-400 hover:underline hover:text-purple-300 transition"
                              >
                                {user.username}
                              </Link>
                            </td>
                            <td className="py-2 px-4 border-b border-gray-700">
                              Level {user.level}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-700">
                              {user.datejoined}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-700">
                              {user.sponsor}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-700">
                              <Button className="bg-gradient-to-r from-purple-1 to-purple-2 rounded-full w-30">
                                {user.status}
                              </Button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-2 mt-4">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="bg-gradient-to-r from-purple-1 to-purple-2 rounded-full w-20"
              >
                Prev
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="bg-gradient-to-r from-purple-1 to-purple-2 rounded-full w-20"
              >
                Next
              </Button>
            </div>
            {/* Export Buttons */}
            <div className="flex space-x-3 mt-6">
              <Button
                onClick={handleExportCSV}
                className="bg-gradient-to-r from-purple-1 to-purple-2 w-40 h-13"
              >
                Export CSV
              </Button>
              <Button
                onClick={handleExportPDF}
                className="bg-gradient-to-r from-purple-1 to-purple-2 w-40 h-13"
              >
                Export PDF
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminNetwork;
