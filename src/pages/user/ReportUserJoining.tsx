import { useState } from "react";
import Meta from "../../components/custom-ui/Meta";
import { useUserJoining } from "../../features/Reports/hooks/userJoining";
import { printUsers } from "../../features/Reports/utils/printdatas";
import { Toaster } from "sonner";
import { Pagination, UserJoiningDashboard, Search, Downloadbtn, UserJoiningTable, } from "../../features/Reports";

const ReportUserJoining = () => {
  const [filters, setFilters] = useState({
    email: "",
    user_id: "",
    start_date: "",
    end_date: "",
    status: "all",
    limit: 1,
    offset: 0,
  });

  const { users, isLoading, error, totalCount, exportPDF, exportExcel, copyToClipboard, getPrintData, exportCSV } = useUserJoining(filters);

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        expand
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid var(--blue-2)",
            borderRadius: "8px",
            fontSize: "14px",
            padding: "10px 10px",
            width: "200px",
          },
          className: "shadow-lg",
          duration: 1000,
        }}
      />
      <div className="px-4 py-4 text-white mb-8">
        <Meta page="Report" />
        <h1 className="text-2xl font-bold">Report</h1>
        <div className="py-8 text-white">
          <UserJoiningDashboard
            onApply={(values) =>
              setFilters((prev) => ({ ...prev, ...values, offset: 0 }))
            }
          />

          <div className="rounded-xl p-[1px] bg-gradient-to-b from-[var(--purple-1)] to-[var(--purple-2)]">
            <div className="rounded-xl bg-black p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Joiners</h2>

              <Search
                onSearch={(text) =>
                  setFilters((prev) => {
                    const isEmail = text.includes("@");
                    return {
                      ...prev,
                      email: isEmail ? text : "",
                      user_id: !isEmail ? text : "",
                      offset: 0,
                    };
                  })
                }
              />

              <Downloadbtn
                rowsPerPage={filters.limit}
                onRowsChange={(limit) => setFilters((prev) => ({ ...prev, limit, offset: 0 }))}
                onCopy={copyToClipboard}
                onPDF={exportPDF}
                onExcel={exportExcel}
                onPrint={() => printUsers(getPrintData())}
                onCSV={exportCSV}
              />

              <UserJoiningTable
                users={users}
                isLoading={isLoading}
                error={error}
              />

              <Pagination
                currentPage={filters.offset / filters.limit + 1}
                totalCount={totalCount}
                rowsPerPage={filters.limit}
                onPageChange={(page) =>
                  setFilters((prev) => ({ ...prev, offset: (page - 1) * prev.limit, }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportUserJoining;
