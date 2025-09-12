import React from "react";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ rows = 5, columns = 8 }) => {
  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx} className="border-b border-gray-800">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <td key={colIdx} className="px-4 py-3">
              <div className="relative overflow-hidden bg-gray-800 rounded h-4">
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    background: "linear-gradient(90deg, rgba(80,80,80,0) 0%, rgba(200,200,200,0.4) 50%, rgba(80,80,80,0) 100%)",
                    transform: "translateX(-100%)",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default SkeletonTable;
