import {  SearchField,  UserCards} from "../../features/admin-UserManagement";

const UserManagement = () => {
  return (
    <div className="px-4 py-4 text-white mb-10 mt-0 lg:mt-20">
      <h1 className="text-lg sm:text-xl font-bold mb-4">User Management</h1>

      <SearchField />

      <UserCards />

    </div>
  );
};

export default UserManagement;
