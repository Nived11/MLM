import placeholderImage from "../../../assets/images/profile.png";
import type { compactUserManagement } from "../type";

interface UserCardProps {
  user: compactUserManagement;
  onEdit: (user: compactUserManagement) => void;
  onView: (user: compactUserManagement) => void;
  onBlock: (user: compactUserManagement) => void;
  blockBtnLoading: boolean;
}

const UserCard = ({
  user,
  onEdit,
  onView,
  onBlock,
  blockBtnLoading,
}: UserCardProps) => {
  const getProfileSrc = (profile: File | string | null): string =>
    profile instanceof File
      ? URL.createObjectURL(profile)
      : profile || placeholderImage;

  return (
    <div className="bg-[#1a1730] rounded-lg shadow-md">
      {/* -------------------- Desktop/Tablet -------------------- */}
      <div className="hidden sm:flex p-4 lg:px-6 lg:py-8 gap-4 sm:gap-5 items-center">
        {/* Profile Image */}
        <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full overflow-hidden bg-gray-700">
          <img
            src={getProfileSrc(user.profile)}
            alt={user.username || "User"}
            className="w-full h-full object-cover"
            onError={(e) =>
              ((e.currentTarget as HTMLImageElement).src = placeholderImage)
            }
          />
        </div>

        {/* Details */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-semibold uppercase truncate text-sm sm:text-base lg:text-sm md:text-xs">
              {user.username}
            </p>
            <span className="text-sm sm:text-base lg:text-sm md:text-xs">
              Level {user.level}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <p className="text-sm sm:text-base lg:text-sm md:text-xs truncate">
              {user.userId}
            </p>
            <span
              className={`px-3 py-1 text-sm sm:text-base lg:text-sm md:text-xs rounded-full text-white ml-auto min-w-[70px] text-center ${
                user.status === "Active"
                  ? "bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]"
                  : "border border-purple-500"
              }`}
            >
              {user.status}
            </span>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={() => onView(user)}
              className="px-2 sm:px-3 lg:text-sm py-0.5 sm:py-1 md:text-xs rounded-full border border-purple-500 text-white hover:bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]"
            >
              VIEW PROFILE
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:ml-2 lg:ml-4">
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(user)}
              className="bg-yellow-400 text-black px-3 py-1 text-sm rounded-md font-semibold hover:bg-yellow-500 uppercase"
            >
              Edit
            </button>
            <button
              onClick={() => onBlock(user)}
              className="bg-yellow-400 text-black px-3 py-1 text-sm rounded-md font-semibold hover:bg-yellow-500 uppercase min-w-[120px] text-center"
            >
              {blockBtnLoading
                ? "Processing"
                : user.status === "Active"
                ? "Block"
                : "Activate"}
            </button>
          </div>
          <button className="bg-yellow-400 text-black px-3 py-1 text-sm rounded-md font-semibold hover:bg-yellow-500 uppercase self-end sm:self-auto">
            Reset Password
          </button>
        </div>
      </div>

      {/* -------------------- Mobile -------------------- */}
      <div className="sm:hidden p-3 flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">
            <img
              src={getProfileSrc(user.profile)}
              alt={user.username || "User"}
              className="w-full h-full object-cover"
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src = placeholderImage)
              }
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between flex-wrap items-center">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold uppercase truncate">
                  {user.userId}
                </p>
                <span className="text-sm">{user.username}</span>
              </div>
              <span
                className={`px-3 py-2 text-xs rounded-full text-white ${
                  user.status === "Active"
                    ? "bg-gradient-to-r from-[#6A00D4] to-[#6C1161]"
                    : "border border-purple-500"
                }`}
              >
                {user.status}
              </span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <span className="text-sm">Level {user.level}</span>
              <button
                onClick={() => onView(user)}
                className="px-2 py-1 text-xs rounded-full border border-purple-500 text-white hover:bg-purple-600 hover:border-purple-600"
              >
                VIEW PROFILE
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-between mt-2">
          <button
            onClick={() => onEdit(user)}
            className="bg-yellow-400 text-black px-3 py-1 text-sm rounded-md font-semibold hover:bg-yellow-500 uppercase"
          >
            Edit
          </button>
          <button
            onClick={() => onBlock(user)}
            className="bg-yellow-400 text-black px-3 py-1 text-sm rounded-md font-semibold hover:bg-yellow-500 min-w-[120px] uppercase"
          >
            {blockBtnLoading
              ? "Processing"
              : user.status === "Active"
              ? "Block"
              : "Activate"}
          </button>
          <button className="bg-yellow-400 text-black px-2 py-1 text-sm rounded-md font-semibold hover:bg-yellow-500 uppercase whitespace-nowrap">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
