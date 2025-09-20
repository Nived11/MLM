import React, { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearch: (text: string) => void;
  delay?: number;
}

const Search: React.FC<SearchProps> = ({ onSearch, delay = 500 }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query.trim());
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay, onSearch]);

  return (
    <div
      className="mb-6 p-[1px] w-full max-w-lg sm:max-w-xl lg:max-w-2xl rounded-md 
        bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search by username"
          className="w-full bg-black rounded-md p-2 pl-10 pr-4 text-white placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base focus:outline-none"
        />
        <SearchIcon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default Search;
