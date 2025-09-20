import { useEffect, useState } from "react";
import { useUserManagement } from "../hooks/useUserManagement";
import { useToggleBlock } from "../hooks/useToggleBlock";
import SkeletonUserCard from "./UserCardSkeleton";
import UserCard from "./UserCard";
import type { compactUserManagement } from "../type";
import { useDownloads } from "../hooks/useDownloads";

interface UserCardsProps {
  onEdit: (user: compactUserManagement) => void;
  onView: (user: compactUserManagement) => void;
}

const UserPage = ({ onEdit, onView }: UserCardsProps) => {
  const { compactUser: fetchedUsers, isLoading, error } = useUserManagement();
  const { handleToggle } = useToggleBlock();
  const [users, setUsers] = useState<compactUserManagement[]>([]);
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());
  const {
    downloadPDFLoading,
    downloadCSVLoading,
    downloadError,
    fetchPdf,
    fetchCsv,
  } = useDownloads();

  useEffect(() => {
    if (fetchedUsers) setUsers(fetchedUsers);
  }, [fetchedUsers]);

  const handleBlockClick = async (user: compactUserManagement) => {
    setLoadingIds((prev) => new Set(prev).add(user.id));
    await handleToggle(user);
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
          : u
      )
    );
    setLoadingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(user.id);
      return newSet;
    });
  };

  if (isLoading) return <SkeletonUserCard count={4} />;

  if (error)
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500 text-sm sm:text-base">{error}</p>
      </div>
    );

  if (!users || users.length === 0)
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-400 text-sm sm:text-base">No users found.</p>
      </div>
    );

  return (
    <>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={onEdit}
            onView={onView}
            onBlock={handleBlockClick}
            blockBtnLoading={loadingIds.has(user.id)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4 mt-8">
        <button
          className="bg-[var(--purple-1)] px-3 sm:px-5 lg:px-10 py-2 rounded-lg hover:bg-[var(--blue-2)]"
          onClick={fetchCsv}
          disabled={downloadCSVLoading}
        >
          {downloadCSVLoading ? "Downloading..." : "Export CSV"}
        </button>
        <button
          className="bg-[var(--purple-1)] px-3 sm:px-5 lg:px-10 py-2 rounded-lg hover:bg-[var(--blue-2)]"
          onClick={fetchPdf}
          disabled={downloadPDFLoading}
        >
          {downloadPDFLoading ? "Downloading..." : "Export PDF"}
        </button>
        {downloadError && (
          <p className="text-red-500 text-sm mt-2">{downloadError}</p>
        )}
      </div>
    </>
  );
};

export default UserPage;
