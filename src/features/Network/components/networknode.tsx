import { useState } from "react";
import type { Member } from "../hooks/network";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Props {
  member: Member;
}

export default function NetworkNode({ member }: Props) {
  const [expanded, setExpanded] = useState(member.level === 1);
  const children = member.children ?? [];
  const hasChildren = children.length > 0;

  return (
    <div className="ml-4 border-l border-purple-700 pl-4 min-w-[200px] md:min-w-0">
      <div className="flex items-center space-x-3 mb-2 flex-shrink-0">
        {hasChildren ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-purple-400 hover:text-purple-200"
          >
            {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
        ) : (
          <span className="w-4" />
        )}

        {/* Gradient background for the member box */}
        <div className="px-3 py-1 bg-gradient-to-r from-purple-1 to-purple-2 text-white rounded-md text-sm font-medium whitespace-nowrap">
          {member.position ? `${member.position} - ${member.name}` : member.name}
        </div>

        <div className="px-2 py-1 bg-black border border-purple-700 rounded text-xs text-gray-300">
          Level {member.level}
        </div>
      </div>

      {expanded && hasChildren && (
        <div className="ml-6 space-y-2 flex flex-col md:flex-row flex-wrap bg-black p-2 rounded-md">
          {children.map((child) => (
            <NetworkNode key={child.id} member={child} />
          ))}
        </div>
      )}
    </div>
  );
}
