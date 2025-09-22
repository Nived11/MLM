import { useState, useMemo, useRef, useEffect } from "react";

interface SearchableDropdownProps {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  options: string[];
  placeholder: string;
  className?: string;
  style?: React.CSSProperties;
  users?: any[];
  isMultiField?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

const SearchableDropdown = ({
  value,
  onChange,
  options,
  placeholder,
  className,
  style,
  users,
  isMultiField = false,
  isLoading = false,
  error = null,
}: SearchableDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    if (isMultiField && users) {
      if (!searchTerm) {
        return Array.from(
          new Set(users.map((u) => u.sponsorname).filter(Boolean))
        );
      }

      if (searchTerm.includes("@")) {
        return Array.from(
          new Set(
            users
              .filter(
                (u) =>
                  u.email &&
                  u.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((u) => u.email)
          )
        );
      }

      if (/^\d/.test(searchTerm)) {
        return Array.from(
          new Set(
            users
              .filter(
                (u) => u.mobile && u.mobile.toString().includes(searchTerm)
              )
              .map((u) => u.mobile.toString())
          )
        );
      }

      return Array.from(
        new Set(
          users
            .filter(
              (u) =>
                u.sponsorname &&
                u.sponsorname.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((u) => u.sponsorname)
        )
      );
    }

    if (!searchTerm) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, users, isMultiField]);

  const handleSelect = (selectedValue: string) => {
    onChange({ target: { value: selectedValue } });
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={className}
        style={style}
      >
        <span className={value ? "text-white" : "text-gray-400"}>
          {value || placeholder}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black border border-gray-600 rounded-md mt-1 z-50 shadow-lg">
          <div className="p-3 border-b border-gray-600">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                isMultiField ? "Search name, email, mobile..." : "Search..."
              }
              className="w-full bg-gray-800 text-white px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="max-h-48 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-2 text-gray-400 text-sm text-center">
                Loading...
              </div>
            ) : error ? (
              <div className="px-4 py-2 text-red-400 text-sm">{error}</div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={`${option}-${index}`}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 text-white text-sm cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-400 text-sm">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
