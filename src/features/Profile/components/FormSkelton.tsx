import { Skeleton } from "../../../components/ui/skeleton";

interface FormSkeletonProps {
  fields?: number;      
  withButton?: boolean; 
  rows?: number;        
}

export const FormSkeleton = ({
  fields = 4,
  withButton = true,
  rows = 2,
}: FormSkeletonProps) => {
  return (
    <div className="border border-purple-600 rounded-md p-6 bg-black">
      <h3 className="text-lg font-semibold mb-6 text-white">Loading...</h3>

      <div className={`grid grid-cols-1 md:grid-cols-${rows} gap-6`}>
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-full" />
          </div>
        ))}

        {withButton && (
          <div className="flex justify-center md:col-span-2 mt-4">
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};
