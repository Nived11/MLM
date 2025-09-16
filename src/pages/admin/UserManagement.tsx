import { useState } from "react";
import { SearchField, UserCards } from "../../features/admin-UserManagement";
import EditProfile from "../../features/admin-UserManagement/components/EditProfile";
import type { UserManagement as UserType } from "../../features/admin-UserManagement/type";

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [mode, setMode] = useState<"view" | "edit">("view");

  return (
    <div className="px-4 py-4 text-white mb-20 mt-0 lg:mt-18">
      {selectedUser ? (
        <EditProfile user={selectedUser} mode={mode} onClose={() => setSelectedUser(null)} />
      ) : (

        <div>
          <h1 className="text-lg sm:text-xl font-bold mb-4">User Management</h1>

          <SearchField />

          <UserCards
            onEdit={(user) => { setSelectedUser(user); setMode("edit"); }}
            onView={(user) => { setSelectedUser(user); setMode("view"); }}
          />
        </div>
      )}
    </div>
  );
};

export default UserManagement;
