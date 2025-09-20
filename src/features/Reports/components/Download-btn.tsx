import React from "react";

interface DownloadbtnProps {
  rowsPerPage: number;
  onRowsChange: (limit: number) => void;
   onCopy?: () => void;
  onCSV?: () => void;
  onPDF?: () => void;
  onPrint?: () => void;
  onExcel?: () => void;
}

const Downloadbtn: React.FC<DownloadbtnProps> = ({ rowsPerPage, onRowsChange,onCopy,
  onCSV,
  onPDF,
  onPrint,
  onExcel, }) =>{
  
  return (
    
    <div className="flex flex-wrap gap-2 sm:gap-4 mb-8">
      <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] flex-1 min-w-[100px] sm:flex-none sm:w-auto">
        <button  
        onClick={onCopy}
           className="px-2 sm:px-3 py-1 rounded-md bg-black text-white w-full hover:bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] text-xs sm:text-sm whitespace-nowrap">
          Copy
        </button>
      </div>
      <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] flex-1 min-w-[100px] sm:flex-none sm:w-auto">
        <button
         onClick={onCSV}
        className="px-2 sm:px-3 py-1 rounded-md bg-black text-white w-full hover:bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] text-xs sm:text-sm whitespace-nowrap">
          CSV
        </button>
      </div>
      <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] flex-1 min-w-[100px] sm:flex-none sm:w-auto">
        <button
        onClick={onPDF}
        className="px-2 sm:px-3 py-1 rounded-md bg-black text-white w-full hover:bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] text-xs sm:text-sm whitespace-nowrap">
          PDF
        </button>
      </div>
      <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] flex-1 min-w-[100px] sm:flex-none sm:w-auto ">
        <button 
         onClick={onPrint}
        className="px-2 sm:px-3 py-1 rounded-md bg-black text-white w-full hover:bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] text-xs sm:text-sm whitespace-nowrap">
          Print
        </button>
      </div>
      <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] flex-1 min-w-[100px] sm:flex-none sm:w-auto">
        <button
          onClick={onExcel}
        className="px-2 sm:px-3 py-1 rounded-md bg-black text-white w-full hover:bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] text-xs sm:text-sm whitespace-nowrap">
          Excel
        </button>
      </div>
      <div className="p-[1px] rounded-md bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] flex-1 min-w-[140px] sm:flex-none sm:w-auto">
        <select
         value={rowsPerPage}
        onChange={(e) => onRowsChange(Number(e.target.value))}
          className="w-full bg-black rounded-md px-5 pr-8 py-1 text-white text-xs sm:text-sm cursor-pointer focus:outline-none appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "calc(100% - 10px) center",
            backgroundSize: "20px",
          }}
        >
          <option  value={1}>Show 1 rows</option>
          <option  value={2}>Show 2 rows</option>
          <option  value={100}>Show 100 rows</option>
        </select>
      </div>
    </div>
  );
};

export default Downloadbtn;
