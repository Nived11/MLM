import { useState } from "react";
import { SearchField } from "../../features/admin-UserManagement";
import EditProfile from "../../features/admin-UserManagement/components/EditProfile";
import UserPage from "../../features/admin-UserManagement/components/UserPage";

const UserManagement = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [mode, setMode] = useState<"view" | "edit">("view");

  const handleClose = () => {
    setSelectedUserId(null);
    setMode("view");
  };

  return (
    <div className="px-4 py-4 text-white mb-20 lg:mt-18">
      {selectedUserId ? (
        <EditProfile
          userId={selectedUserId}
          mode={mode}
          onClose={handleClose}
        />
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl font-bold mb-5">
            User Management
          </h1>

          <SearchField />

          <UserPage
            onEdit={(user) => {
              setSelectedUserId(user.userId);
              setMode("edit");
            }}
            onView={(user) => {
              setSelectedUserId(user.userId);
              setMode("view");
            }}
          />
        </>
      )}
    </div>
  );
};

export default UserManagement;
