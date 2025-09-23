import { Skeleton } from "../../../components/ui/skeleton"

interface TableSkeletonProps {
  rows?: number
}

const TableSkeleton = ({ rows = 5 }: TableSkeletonProps) => {
  return (
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
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i} className="text-white text-xs sm:text-sm">
                <td className="py-1.5 pr-3">
                  <Skeleton className="w-[130px] sm:w-[150px] h-[34px] sm:h-[36px] rounded-lg" />
                </td>
                <td className="py-1.5 pr-3">
                  <Skeleton className="w-[120px] sm:w-[140px] h-[34px] sm:h-[36px] rounded-lg" />
                </td>
                <td className="py-1.5 pr-3">
                  <Skeleton className="w-[110px] sm:w-[130px] h-[34px] sm:h-[36px] rounded-lg" />
                </td>
                <td className="py-1.5">
                  <Skeleton className="w-[100px] sm:w-[120px] h-[34px] sm:h-[36px] rounded-lg" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableSkeleton
