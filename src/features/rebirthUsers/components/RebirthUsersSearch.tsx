import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useSearchRebirth } from "../hooks/useSearchRebirth";
import { useNavigate } from "react-router-dom";
import { searchSchema } from "../validation/searchSchema";

const RebirthUsersSearch = () => {
  const [query, setQuery] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const { users, loading, error, fetchUsers } = useSearchRebirth();
  const navigate = useNavigate();

  const handleSearch = () => {
    try {
      searchSchema.parse(query.trim());
      setValidationError(null);
      fetchUsers(query.trim());
    } catch (err: any) {
      setValidationError(err.errors?.[0]?.message || "Invalid input");
    }
  };

  return (
    <div className="bg-background text-foreground flex items-center justify-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-[1044px]">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">
          Rebirth Users
        </h2>

        <div className="rounded-2xl p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
          <div className="rounded-2xl bg-background p-4 sm:p-6 md:p-8">
            <h3 className="font-medium text-lg sm:text-xl mb-2">
              Search Rebirth Users
            </h3>
            <p className="text-xs sm:text-sm text-white font-light mb-4 sm:mb-6">
              Users who have completed all levels and are re-entered at the starting level.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center mb-4 sm:mb-5 w-full">
              <div className="w-full sm:max-w-[400px]">
                <div className="rounded-lg p-[1px] w-full h-[36px] sm:h-[40px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
                  <Input
                    placeholder="Search by email, name, or user ID"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full h-full rounded-lg bg-background text-white text-xs sm:text-sm font-light border-0 focus-visible:ring-ring/50 focus-visible:ring-2"
                  />
                </div>
                {validationError && (
                  <p className="text-red-500 text-xs mt-1">{validationError}</p>
                )}
              </div>

              <Button
                onClick={handleSearch}
                className="w-full sm:w-[120px] h-[36px] sm:h-[40px] rounded-lg bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-xs sm:text-sm font-semibold"
              >
                Search
              </Button>
            </div>

            <div className="flex justify-center mb-3">
              <Button
                onClick={() => navigate("/rebirth-users/all-users")}
                className="w-full sm:w-[200px] h-[36px] sm:h-[40px] rounded-lg bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-xs sm:text-sm font-semibold"
              >
                View all rebirth users
              </Button>
            </div>

            {loading && <p className="text-white">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && users.length === 0 && query.trim() && (
              <p className="text-gray-400">No users found.</p>
            )}

            {users.length > 0 && (
              <div className="mt-3 text-white text-sm">
                {users.map((user) => (
                  <div
                    key={user.user_id}
                    className="border-b border-gray-700 py-1.5"
                  >
                    <p>
                      <strong>
                        {user.first_name} {user.last_name}
                      </strong>{" "}
                      | {user.email} | {user.user_id}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RebirthUsersSearch;
