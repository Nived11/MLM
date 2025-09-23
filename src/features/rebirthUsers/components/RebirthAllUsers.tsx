import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import TableSkeleton from "./TableSkeleton";
import Pagination from "./Pagination";
import { useAllUsers } from "../hooks/useAllUsers";

const RebirthAllUsers = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data: users, loading, error, total } = useAllUsers(page, debouncedSearch);

  const totalPages = Math.ceil(total / 15);

  const [tableLoading, setTableLoading] = useState(true);

  useEffect(() => {
    setTableLoading(true);
  }, [page]);

  useEffect(() => {
    if (!loading) {
      setTableLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1); 
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  if (tableLoading) {
    return (
      <div className="bg-background text-foreground flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
        <div className="w-full max-w-[1044px]">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
            Rebirth Users All
          </h2>
          <TableSkeleton rows={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="bg-background text-foreground flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
      <div className="w-full max-w-[1044px]">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Rebirth Users All
        </h2>

        <div className="mb-4 flex justify-end ">
          <input
            type="text"
            placeholder="Search by Username or Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 px-3 py-2 rounded-lg border border-purple-1 focus:outline-none  bg-black   text-white"
          />
        </div>

        <div className="rounded-2xl p-[1px] [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]">
          <div className="rounded-2xl bg-background p-3 sm:p-4 md:p-6 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-white text-sm sm:text-base">
                  <th className="pb-3 pr-3">Username</th>
                  <th className="pb-3 pr-3">Date of Rebirth</th>
                  <th className="pb-3 pr-3">Current Level</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.user_id} className="text-white text-xs sm:text-sm">
                      <td className="py-1.5 pr-3">
                        <div
                          className="w-[130px] sm:w-[150px] h-[34px] sm:h-[36px] rounded-lg p-[1px] 
                          [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]"
                        >
                          <div className="w-full h-full flex items-center justify-center rounded-lg bg-background">
                            {user.user_id}
                          </div>
                        </div>
                      </td>

                      <td className="py-1.5 pr-3">
                        <div
                          className="w-[120px] sm:w-[140px] h-[34px] sm:h-[36px] rounded-lg p-[1px] 
                          [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]"
                        >
                          <div className="w-full h-full flex items-center justify-center rounded-lg bg-background">
                            {new Date(user.joined_date).toLocaleDateString()}
                          </div>
                        </div>
                      </td>

                      <td className="py-1.5 pr-3">
                        <div
                          className="w-[110px] sm:w-[130px] h-[34px] sm:h-[36px] rounded-lg p-[1px] 
                          [background:linear-gradient(180deg,#6A00D4_0%,#5C1053_100%)]"
                        >
                          <div className="w-full h-full flex items-center justify-center rounded-lg bg-background">
                            {user.level}
                          </div>
                        </div>
                      </td>

                      <td className="py-1.5">
                        <Button
                          size="sm"
                          className="w-[100px] sm:w-[120px] h-[34px] sm:h-[36px] rounded-lg 
                          bg-gradient-to-r from-[#6A00D4] to-[#5C1053] text-white text-xs sm:text-sm font-medium"
                        >
                          {user.status}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-white py-4">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RebirthAllUsers;
