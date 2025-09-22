import React, { useState } from "react";
import { Search as SearchIcon, ArrowRight } from "lucide-react";

interface SearchProps {
  onSearch: (text: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-[1px] w-full max-w-lg sm:max-w-xl lg:max-w-2xl rounded-md
         bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search by username"
          className="w-full bg-black rounded-md p-2 pl-10 pr-16 text-white text-sm placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-sm focus:outline-none"
        />
        <SearchIcon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-white text-sm px-1"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="bg-gradient-to-r from-[var(--purple-2)] to-[var(--purple-1)] hover:bg-purple-500 text-white  px-2 py-1 rounded-md"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;