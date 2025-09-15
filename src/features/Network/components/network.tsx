import Header from "../../Profile/components/header";
import { useNetwork } from "../hooks/network";
import NetworkNode from "../components/networknode";

export default function NetworkPage() {
  const { members, loading } = useNetwork();

  if (loading)
    return <div className="text-white text-center p-10">Loading...</div>;

  const rootMember = members.length > 0 ? members[0] : null;

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-10 py-6 sm:py-8">
      <Header />
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Network</h2>

      {/* 🔄 Make this outer box scrollable horizontally */}
      <div className="w-full overflow-x-auto">
        {/* Wrapper to limit width & apply border */}
        <div className="inline-block min-w-[300px] p-1 rounded-2xl bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg">
          <div className="bg-black rounded-2xl p-6">
            <h3 className="text-lg sm:text-xl font-medium mb-6">Hierarchical View</h3>

            {rootMember ? (
              <NetworkNode member={rootMember} />
            ) : (
              <div className="text-gray-400">No network members found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
