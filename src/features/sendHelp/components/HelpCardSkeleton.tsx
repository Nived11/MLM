import { Skeleton } from "../../../components/ui/skeleton";

export const HelpCardSkeleton = () => {
  return (
    <div className="rounded-[20px] bg-gradient-to-br from-[#1C1332] to-[#2F2061] p-4 w-[367px] flex flex-col gap-4 shadow-lg">
      <div className="flex items-center justify-between">
        <Skeleton className="w-[119px] h-[31px] rounded-[20px] bg-[#2d214a]" />
        <Skeleton className="w-[119px] h-[31px] rounded-[20px] bg-[#2d214a]" />
      </div>

      <div className="flex items-start gap-8">
        <Skeleton className="w-20 h-20 rounded-full bg-[#2d214a]" />
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-[84px] h-[26px] rounded-[20px] bg-[#2d214a]" />
            <Skeleton className="w-[66px] h-[21px] rounded-[20px] bg-[#2d214a]" />
          </div>
          <Skeleton className="w-[115px] h-[24px] rounded-[8px] bg-[#2d214a]" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Skeleton className="w-[195px] h-[42px] rounded-[20px] bg-[#2d214a]" />
        <Skeleton className="w-[35px] h-[35px] rounded-full bg-[#2d214a]" />
      </div>
    </div>
  );
};
