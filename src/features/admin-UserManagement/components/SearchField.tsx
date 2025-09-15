import { Search } from "lucide-react";
import { useState } from "react";

const SearchField = () => {
    const [search, setSearch] = useState("");
    return(
        <>
<div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md bg-[#121021] border border-gray-800 focus:outline-none focus:ring-1 focus:ring-purple-700 text-sm sm:text-base"
        />
      </div>
        </>
    )
}
export default SearchField