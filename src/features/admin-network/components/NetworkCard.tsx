import { Skeleton } from "../../../components/ui/skeleton";
import type { StatProps } from "../types/NetworkTypes";

export default function Stats({ downline, active, blocked, isLoading}: StatProps) {
  const stats = [
    { label: "Total Downline", value: downline },
    { label: "Active", value: active },
    { label: "Pending", value: blocked },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-[#141426] rounded-lg p-4 text-center">
          <p className="text-sm text-gray-300">{stat.label}</p>
          <h3 className="text-xl font-bold mt-1">
            {isLoading ? (
              // <span
              //   aria-hidden="true"
              //   className="w-8 h-6 bg-gray-700 animate-pulse rounded-md mx-auto block"
              // />
              <Skeleton className="w-8 h-6 mx-auto rounded-md" />
            ) : (
              stat.value
            )}
          </h3>
        </div>
      ))}
    </div>
  );
}
