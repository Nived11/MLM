import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TbListSearch } from "react-icons/tb";
import {
  PaymentsApproved,
  PendingPayments,
  useDownloads,
} from "../../features/admin-payment";
import { Button } from "../../components/ui/button";

const Payment = () => {
  const [dateRange, setDateRange] = useState("");
  const { downloadPDFLoading, downloadCSVLoading, downloadError, fetchPdf, fetchCsv } = useDownloads();

  return (
    <div className="bg-background px-4 py-4 text-white mb-20 mt-0 lg:mt-18">
      <h2 className="text-2xl sm:text-3xl font-bold mb-5">Payments</h2>

      <div
        className="flex items-center w-full rounded-2xl bg-[#0E0B1A] px-4 py-2 shadow-sm border border-[#1c1a29] mb-4
                focus-within:ring focus-within:ring-purple-700 focus-within:border-purple-700 transition"
      >
        <TbListSearch className="text-gray-300 w-5 h-5" />
        <input
          type="text"
          placeholder="Search payments..."
          className="ml-2 w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="appearance-none w-full rounded-xl bg-[#0E0B1A] text-white border border-[#1c1a29] px-4 py-3 text-sm pr-10 focus:outline-none"
          >
            <option value="">Date Range</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="appearance-none w-full rounded-xl bg-[#0E0B1A] text-white border border-[#1c1a29] px-4 py-3 text-sm pr-10 focus:outline-none"
          >
            <option value="">Status</option>
            <option value="paid">Pending</option>
            <option value="pending">Approved</option>
            <option value="failed">Declined</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div> */}
      </div>

      <PendingPayments />
      <PaymentsApproved />
      <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4 mt-8">
        <Button
          className="bg-[var(--purple-1)]  px-3 sm:px-5 lg:px-10 py-2 sm:py-2 rounded-lg hover:bg-[var(--blue-2)] whitespace-nowrap"
          onClick={fetchCsv}
          disabled={downloadCSVLoading}
        >
          {downloadCSVLoading ? "Downloading..." : "Export CSV"}
        </Button>
        <Button
          className="bg-[var(--purple-1)] px-3 sm:px-5 lg:px-10 py-2 sm:py-2 rounded-lg hover:bg-[var(--blue-2)] whitespace-nowrap"
          onClick={fetchPdf}
          disabled={downloadPDFLoading}
        >
          {downloadPDFLoading ? "Downloading..." : "Export PDF"}
        </Button>
        {downloadError && (
          <p className="text-red-500 text-sm mt-2">{downloadError}</p>
        )}
      </div>
    </div>
  );
};

export default Payment;
