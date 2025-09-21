import { useState } from "react";
import Meta from "../../components/custom-ui/Meta";
import { Toaster } from "sonner";
import { useRebirthReportusers } from "../../features/Reports/hooks/rebirthReportUser";
import { printUsers } from "../../features/Reports/utils/printdatas";
import {
  Pagination,
  RebirthUsersDashboard,
  Search,
  Downloadbtn,
  RebirthTable,
} from "../../features/Reports";

const ReportRebirthUsers = () => {
  const [filters, setFilters] = useState({
    email: "",
    user_id: "",
    referred_by_name: "",
    referred_by_id: "",
    mobile: "",
    from_date: "",
    end_date: "",
    status: "all",
    limit: 10,
    offset: 0,
  });

  const {
    users,
    alluser,
    isLoading,
    error,
    totalCount,
    exportPDF,
    exportExcel,
    copyToClipboard,
    getPrintData,
    exportCSV,
  } = useRebirthReportusers(filters);

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
          {/* Dashboard filters */}
          <RebirthUsersDashboard
          users={alluser}
            onApply={(values) =>
              setFilters((prev) => ({ ...prev, ...values, offset: 0 }))
            }
          />

          {/* Table Section */}
          <div className="rounded-xl p-[1px] bg-gradient-to-b from-[var(--purple-1)] to-[var(--purple-2)]">
            <div className="rounded-xl bg-black p-6">
              <h2 className="text-lg font-semibold mb-4">Rebirth Users</h2>

              {/* Search */}
              <Search
                onSearch={(text) =>
                  setFilters((prev) => ({ ...prev, user_id: text, offset: 0 }))
                }
              />

              {/* Download Options */}
              <Downloadbtn
                rowsPerPage={filters.limit}
                onRowsChange={(limit) =>
                  setFilters((prev) => ({ ...prev, limit, offset: 0 }))
                }
                onCopy={copyToClipboard}
                onPDF={exportPDF}
                onExcel={exportExcel}
                onPrint={() => printUsers(getPrintData())}
                onCSV={exportCSV}
              />

              {/* Table */}
              <RebirthTable
                users={users}
                isLoading={isLoading}
                error={error}
              />

              {/* Pagination */}
              <Pagination
                currentPage={filters.offset / filters.limit + 1}
                totalCount={totalCount}
                rowsPerPage={filters.limit}
                onPageChange={(page) =>
                  setFilters((prev) => ({
                    ...prev,
                    offset: (page - 1) * prev.limit,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportRebirthUsers;
