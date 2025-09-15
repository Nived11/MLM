import React from "react";

interface SkeletonUserCardProps {
  count?: number; // number of skeleton cards
}

const SkeletonUserCard: React.FC<SkeletonUserCardProps> = ({ count = 3 }) => {
  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .shimmer {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: linear-gradient(
              90deg,
              rgba(50, 50, 50, 0) 0%,
              rgba(150, 150, 150, 0.4) 50%,
              rgba(50, 50, 50, 0) 100%
            );
            transform: translateX(-100%);
            animation: shimmer 1.5s infinite;
          }
        `}
      </style>

      <div className="flex flex-col gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx}>
            {/* Laptop & Tablet View */}
            <div
              className="hidden sm:flex bg-[#1a1730] rounded-lg p-3 sm:p-4 lg:px-4 lg:py-8 
                flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 shadow-md"
            >
              {/* Avatar skeleton */}
              <div className="flex-shrink-0 relative overflow-hidden rounded-full bg-gray-800 w-10 h-10 lg:w-16 lg:h-16">
                <div className="shimmer"></div>
              </div>

              {/* Content skeleton */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
                <div className="flex flex-col gap-2 sm:gap-4 lg:gap-5">
                  <div className="relative overflow-hidden bg-gray-800 rounded h-5 w-24">
                    <div className="shimmer"></div>
                  </div>
                  <div className="relative overflow-hidden bg-gray-800 rounded h-4 w-16">
                    <div className="shimmer"></div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:gap-4 lg:gap-5">
                  <div className="relative overflow-hidden bg-gray-800 rounded h-5 w-20">
                    <div className="shimmer"></div>
                  </div>
                  <div className="relative overflow-hidden bg-gray-800 rounded h-6 w-16">
                    <div className="shimmer"></div>
                  </div>
                </div>

                <div className="flex items-end gap-2 sm:gap-4 lg:gap-5">
                  <div className="relative overflow-hidden bg-gray-800 rounded-full h-6 w-20">
                    <div className="shimmer"></div>
                  </div>
                </div>
              </div>

              {/* Action buttons skeleton */}
              <div className="flex flex-col gap-2 sm:ml-2 lg:ml-4">
                <div className="flex gap-2">
                  <div className="relative overflow-hidden bg-gray-800 rounded h-8 w-16">
                    <div className="shimmer"></div>
                  </div>
                  <div className="relative overflow-hidden bg-gray-800 rounded h-8 w-16">
                    <div className="shimmer"></div>
                  </div>
                </div>
                <div className="relative overflow-hidden bg-gray-800 rounded h-8 w-35">
                  <div className="shimmer"></div>
                </div>
              </div>
            </div>

            {/* Mobile View Skeleton */}
            <div className="py-6 sm:hidden bg-[#1a1730] rounded-lg p-3 flex flex-col gap-3 shadow-md">
              {/* Top Row */}
              <div className="flex items-start gap-5">
                {/* Profile Icon */}
                <div className="relative overflow-hidden rounded-full bg-gray-800 w-12 h-12">
                  <div className="shimmer"></div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="relative overflow-hidden bg-gray-800 rounded h-5 w-20">
                      <div className="shimmer"></div>
                    </div>
                    <div className="relative overflow-hidden bg-gray-800 rounded h-4 w-16">
                      <div className="shimmer"></div>
                    </div>
                    <div className="relative overflow-hidden bg-gray-800 rounded-full ml-6 h-5 w-14">
                      <div className="shimmer"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <div className="relative overflow-hidden bg-gray-800 rounded h-4 w-12">
                      <div className="shimmer"></div>
                    </div>
                    <div className="relative overflow-hidden bg-gray-800 rounded-full h-6 w-20">
                      <div className="shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Buttons */}
              <div className="flex gap-2 justify-between mt-2">
                <div className="relative overflow-hidden bg-gray-800 rounded h-8 w-16">
                  <div className="shimmer"></div>
                </div>
                <div className="relative overflow-hidden bg-gray-800 rounded h-8 w-16">
                  <div className="shimmer"></div>
                </div>
                <div className="relative overflow-hidden bg-gray-800 rounded h-8 w-16">
                  <div className="shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkeletonUserCard;
