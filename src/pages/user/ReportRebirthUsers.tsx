import { useState } from "react";
import Meta from "../../components/custom-ui/Meta";
import { Toaster } from "sonner";
import { useRebirthReportusers } from "../../features/Reports/hooks/rebirthReportUser";
import { printUsers } from "../../features/Reports/utils/printdatas";
import { Pagination, RebirthUsersDashboard, Search, Downloadbtn, RebirthTable,} from "../../features/Reports";

const ReportRebirthUsers = () => {
  const [filters, setFilters] = useState({
    email: "",
    user_id: "",
    referred_by_name: "",
    referred_by_id: "",
    mobile: "",
    from_date: "",
    end_date: "",
    status: "",
    limit: 10,
    offset: 0,
  });

  const {
    users,
    alluser,
    isLoading,
    isLoadingAll,
    error,
    errorAll,
    totalCount,
    next,
    previous,
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
          <RebirthUsersDashboard
            users={alluser}
            isLoadingAll={isLoadingAll}
            errorAll={errorAll}
            onApply={(values) =>
              setFilters((prev) => ({ ...prev, ...values, offset: 0 }))
            }
          />

          <div className="rounded-xl p-[1px] bg-gradient-to-b from-[var(--purple-1)] to-[var(--purple-2)]">
            <div className="rounded-xl bg-black p-6">
              <h2 className="text-lg font-semibold mb-4">Rebirth Users</h2>

              <Search
                onSearch={(text) =>
                  setFilters((prev) => ({ ...prev, user_id: text, offset: 0 }))
                }
              />

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

              <RebirthTable users={users} isLoading={isLoading} error={error} />

              <Pagination
                currentPage={filters.offset / filters.limit + 1}
                totalCount={totalCount}
                rowsPerPage={filters.limit}
                next={next}
                previous={previous}
                onPageChange={(page, type, url) => {
                  if (type === "first") {
                    setFilters((prev) => ({ ...prev, offset: 0 }));
                  } else if (type === "last") {
                    const lastOffset =
                      (Math.ceil(totalCount / filters.limit) - 1) *
                      filters.limit;
                    setFilters((prev) => ({ ...prev, offset: lastOffset }));
                  } else if (url) {
                    const params = new URL(url).searchParams;
                    const offset = parseInt(params.get("offset") || "0", 10);
                    const limit = parseInt(
                      params.get("limit") || String(filters.limit),
                      10
                    );
                    setFilters((prev) => ({ ...prev, offset, limit }));
                  } else {
                    setFilters((prev) => ({
                      ...prev,
                      offset: (page - 1) * prev.limit,
                    }));
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportRebirthUsers;
