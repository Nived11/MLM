import { useState } from "react";
import Meta from "../../components/custom-ui/Meta";
import { useUserJoining } from "../../features/Reports/hooks/userJoining";
import { printUsers } from "../../features/Reports/utils/printdatas";
import { Toaster } from "sonner";
import { Pagination, UserJoiningDashboard, Search, Downloadbtn, UserJoiningTable } from "../../features/Reports";

interface FiltersState {
  email: string;
  user_id: string;
  from_date: string;
  end_date: string;
  status: string;
  limit?: number; 
  page: number;
}


const ReportUserJoining = () => {
  const [filters, setFilters] = useState<FiltersState>({
    email: "",
    user_id: "",
    from_date: "",
    end_date: "",
    status: "all",
    limit: undefined, 
    page: 1,
  });

  const {
    users,
    isLoading,
    error,
    totalCount,
    next,
    previous,
    exportPDF,
    exportExcel,
    copyToClipboard,
    getPrintData,
    exportCSV,
  } = useUserJoining(filters);

  const getCurrentPage = () => {
    if (next && previous) {
      // Extract page from next URL
      const nextUrl = new URL(next);
      const nextPage = parseInt(nextUrl.searchParams.get("page") || "2", 10);
      return nextPage - 1;
    } else if (next && !previous) {
      return 1; // First page
    } else if (!next && previous) {
      // Extract page from previous URL and add 1
      const prevUrl = new URL(previous);
      const prevPage = parseInt(prevUrl.searchParams.get("page") || "1", 10);
      return prevPage + 1;
    }
    return 1;
  };

  const getItemsPerPage = () => {
    // Calculate items per page based on current results
    if (users.length === 0) return 12; // Default backend page size
    
    const currentPage = getCurrentPage();
    if (currentPage === 1 && next) {
      return users.length; // Items on first page
    } else if (!next && previous) {
      // Last page - calculate based on total and previous pages
      const totalPages = Math.ceil(totalCount / users.length);
      return Math.floor(totalCount / totalPages);
    }
    return users.length;
  };

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
              setFilters((prev) => ({ ...prev, ...values, page: 1 }))
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
                      page: 1,
                    };
                  })
                }
              />

              <Downloadbtn
                rowsPerPage={filters.limit || getItemsPerPage()}
                onRowsChange={(limit) => {
                  const newLimit = limit === -1 ? undefined : limit;
                  setFilters((prev) => ({ ...prev, limit: newLimit, page: 1 }));
                }}
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
                currentPage={getCurrentPage()}
                totalCount={totalCount}
                rowsPerPage={getItemsPerPage()}
                next={next}
                previous={previous}
                onPageChange={(page, type, url) => {
                  if (type === "first") {
                    setFilters((prev) => ({ ...prev, page: 1 }));
                  } else if (type === "last") {
                    const totalPages = Math.ceil(totalCount / getItemsPerPage());
                    setFilters((prev) => ({ ...prev, page: totalPages }));
                  } else if (url) {
                    // Extract page from backend URL
                    const params = new URL(url).searchParams;
                    const pageNum = parseInt(params.get("page") || "1", 10);
                    setFilters((prev) => ({ ...prev, page: pageNum }));
                  } else {
                    setFilters((prev) => ({ ...prev, page }));
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

export default ReportUserJoining;