import SkeletonTable from "./SkeletonTable";
import type { LevelUsers } from "../types";

interface Props {
  users: LevelUsers[];
  isLoading: boolean;
  error: string | null;
}

const LevelUserTable = ({ users, isLoading, error }: Props) => {
  return (
    <div className="overflow-x-auto rounded-md border-[1px] border-transparent p-[1px] bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] ">
      <table className="w-full  text-xs sm:text-sm text-white bg-black rounded-md min-w-0  sm:min-w-0">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-4">USERNAME</th>
            <th className="px-2 py-4">FROM NAME</th>
            <th className="px-2 py-4">AMOUNT</th>
            <th className="px-2 py-4">PROOF</th>
            <th className="px-3 py-4">STATUS</th>
            <th className="px-2 py-4 whitespace-nowrap min-w-[120px]">LEVEL</th>
            <th className="px-2 py-4 whitespace-nowrap min-w-[120px]">
              REQUESTED DATE
            </th>
            <th className="px-2 py-4">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonTable rows={5} columns={8} />
          ) : error ? (
            <tr>
              <td colSpan={8} className="text-center py-4 text-red-500">
                {error}
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="text-center py-4 border border-gray-800 rounded-md"
              >
                No Data found
              </td>
            </tr>
          ) : (
            users.map((user, idx) => (
              <tr
                key={idx}
                className="bg-gradient-to-r from-[var(--blue-1)] to-[var(--blue-2)] hover:bg-purple-800 border-b-2 border-black rounded-lg"
              >
                <td className="px-4 py-3 whitespace-nowrap min-w-[120px]">
                  {user.username}
                </td>
                <td className="px-2 py-3 whitespace-nowrap min-w-[120px]">
                  {user.fromuser}
                </td>
                <td className="px-2 py-3 whitespace-nowrap min-w-[120px]">
                  {user.amount}
                </td>
                <td className="px-2 py-3 whitespace-nowrap min-w-[120px]">
                  {user.proof ? (
                    <a
                      href={user.proof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    "without proof"
                  )}
                </td>
                <td className="px-2 py-3 whitespace-nowrap min-w-[120px]">
                  {user.status === "Completed" ? (
                    <span className="px-3 py-1 text-xs font-medium rounded-full border border-gray-400 bg-gradient-to-r from-[var(--purple-2)] to-[var(--purple-1)]">
                      {user.status}
                    </span>
                  ) : (
                    <span className="px-5 py-1 text-xs font-medium rounded-full border border-gray-400 bg-transparent">
                      {user.status}
                    </span>
                  )}
                </td>
                <td className="px-2 py-3 whitespace-nowrap min-w-[120px]">
                  {user.level}
                </td>
                <td className="px-2 py-3 whitespace-nowrap min-w-[120px]">
                  {user.requesteddate}
                </td>
                <td className="px-2 py-3">{user.total}</td>
              </tr>
            ))
          )}
          <tr>
            <th className=" py-[2px]"></th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LevelUserTable;
