import { userManagement } from "../hooks/usermanagement";
import SkeletonUserCard from "./UserCardSkeleton";

const UserCards = () => {
  const { users, isLoading, error } = userManagement();

  if (isLoading) {
    return <SkeletonUserCard count={4} />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500 text-sm sm:text-base">{error}</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-400 text-sm sm:text-base">No users found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div key={user.id}>
            {/* Laptop & Tablet View */}
            <div
              className="hidden sm:flex bg-[#1a1730] rounded-lg p-3 sm:p-4 lg:px-4 lg:py-8 
              flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 shadow-md 
              text-xs sm:text-sm lg:text-base"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div
                  className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-blue-500 
                  flex items-center justify-center font-bold text-white 
                  text-sm sm:text-base lg:text-lg"
                >
                  {user.username.charAt(0)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
                <div className="flex flex-col gap-2 sm:gap-4 lg:gap-5">
                  <p
                    className="font-semibold uppercase whitespace-nowrap truncate 
                    text-sm sm:text-base lg:text-sm md:text-xs"
                  >
                    {user.username}
                  </p>
                  <span className="text-sm sm:text-base lg:text-sm md:text-xs">
                    {user.level}
                  </span>
                </div>

                <div className="flex flex-col gap-2 sm:gap-4 lg:gap-5">
                  <p className="text-sm sm:text-base lg:text-sm md:text-xs">
                    {user.userId}
                  </p>
                  {user.status === "Active" ? (
                    <span
                      className="px-5 py-1 text-sm sm:text-base lg:text-sm md:text-xs rounded-full 
                      text-white bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] w-fit whitespace-nowrap"
                    >
                      {user.status}
                    </span>
                  ) : (
                    <span
                      className="px-4 py-1 text-sm sm:text-base lg:text-sm md:text-xs rounded-full 
                      text-white border border-purple-500 w-fit whitespace-nowrap"
                    >
                      {user.status}
                    </span>
                  )}
                </div>

                <div className="flex items-end gap-2 sm:gap-4 lg:gap-5">
                  <button
                    className="px-2 sm:px-3 lg:text-sm py-0.5 sm:py-1 md:text-xs 
                    rounded-full border border-purple-500 text-white 
                    hover:bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]  hover:border-purple-600 whitespace-nowrap"
                  >
                    VIEW PROFILE
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2 sm:ml-2 lg:ml-4">
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-400 text-black px-2 sm:px-3 lg:text-sm md:text-xs md:px-4 lg:px-5 
                    py-1 sm:py-1 rounded-md font-semibold hover:bg-yellow-500 uppercase whitespace-nowrap"
                  >
                    Edit
                  </button>
                  <button
                    className="bg-yellow-400 text-black px-2 sm:px-3 lg:text-sm md:text-xs md:px-4 lg:px-5 
                    py-1 sm:py-1 rounded-md font-semibold hover:bg-yellow-500 uppercase whitespace-nowrap"
                  >
                    Block
                  </button>
                </div>
                <button
                  className="bg-yellow-400 text-black px-3 sm:px-4 lg:text-sm md:text-xs md:px-3 lg:px-5 
                  py-1 sm:py-1.5 rounded-md font-semibold hover:bg-yellow-500 uppercase 
                  self-end sm:self-auto whitespace-nowrap"
                >
                  Reset Password
                </button>
              </div>
            </div>

            {/* Mobile View */}
            <div className="py-6 sm:hidden bg-[#1a1730] rounded-lg p-3 flex flex-col gap-3 shadow-md text-xs">
              {/* Top Row */}
              <div className="flex items-start gap-5 ">
                {/* Profile Icon */}
                <div
                  className="w-15 h-12 rounded-full bg-blue-500 flex items-center justify-center 
                  font-bold text-white text-sm"
                >
                  {user.username.charAt(0)}
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-4 w-full">
                  {/* First row → Name + User ID + Status */}
                  <div className="flex items-center justify-between text-sm flex-wrap">
                    {/* Left content */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <p className="font-semibold uppercase truncate whitespace-nowrap">
                        {user.username}
                      </p>
                      <span className="text-sm">{user.userId}</span>
                    </div>

                    {/* Right content (Status) */}
                    {user.status === "Active" ? (
                      <span
                        className="px-2 py-0.5 text-xs rounded-full text-white 
                                    bg-gradient-to-r from-[#6A00D4] to-[#6C1161]"
                      >
                        {user.status}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-xs rounded-full text-white border border-purple-500">
                        {user.status}
                      </span>
                    )}
                  </div>

                  {/* Row 2: Level & View Profile */}
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm">{user.level}</span>
                    <button
                      className="px-2 py-1 text-xs rounded-full border border-purple-500 
                      text-white hover:bg-purple-600 hover:border-purple-600"
                    >
                      VIEW PROFILE
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Action Buttons */}
              <div className="flex gap-2 justify-between mt-2 ">
                <button
                  className="bg-yellow-400 text-black px-3 py-1 text-sm rounded-md 
                  font-semibold hover:bg-yellow-500 uppercase"
                >
                  Edit
                </button>
                <button
                  className="bg-yellow-400 text-black px-3 py-1 text-sm rounded-md 
                  font-semibold hover:bg-yellow-500 uppercase"
                >
                  Block
                </button>
                <button
                  className="bg-yellow-400 text-black px-2 py-1 text-sm rounded-md 
                  font-semibold hover:bg-yellow-500 uppercase whitespace-nowrap"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4 mt-8">
        <button className="bg-[var(--purple-1)]  px-3 sm:px-5 lg:px-10 py-2 sm:py-2 rounded-lg hover:bg-[var(--blue-2)] whitespace-nowrap">
          Export CSV
        </button>
        <button className="bg-[var(--purple-1)] px-3 sm:px-5 lg:px-10 py-2 sm:py-2 rounded-lg hover:bg-[var(--blue-2)] whitespace-nowrap">
          Export PDF
        </button>
      </div>
    </>
  );
};

export default UserCards;
