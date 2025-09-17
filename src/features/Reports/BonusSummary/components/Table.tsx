import { useBonusSummary } from "../hooks/bonusSummary";
import SkeletonTable from "../../components/SkeletonTable";
import { Download } from "lucide-react";


const Table = () => {
  const { users, isLoading, error } = useBonusSummary();

  return (
    <div className="overflow-x-auto rounded-md border-[1px] border-transparent p-[1px] bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)] ">
      <table className="w-full  text-xs sm:text-sm text-white bg-black rounded-md min-w-0  sm:min-w-0">
        <thead>
          <tr className="text-left">
            <th className="px-8 py-6 ">#</th>
            <th className="px-2 py-6 whitespace-nowrap min-w-[120px]">
              USERNAME
            </th>
            <th className="px-2 py-6 whitespace-nowrap min-w-[120px]">
              INVOICE
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonTable rows={5} columns={3} />
          ) : error ? (
            <tr>
              <td
                colSpan={8}
                className="text-center py-4 text-red-500"
              >
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
                <td className="px-8 py-5 ">{user.id}</td>
                <td className="px-2 py-5 whitespace-nowrap min-w-[120px]">
                  {user.username}
                </td>
                <td className="px-2 py-5 flex gap-5 items-center">
                  <button
                    onClick={() =>
                      window.open(user.invoice, "_blank")
                    }
                    className="text-white-500 hover:text-gray-300"
                  >
                    See once
                  </button>
                  <a
                    href={user.invoice}
                    download
                    className="text-white hover:text-gray-300"
                  >
                    <Download size={20} />
                  </a>
                </td>
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

export default Table;
