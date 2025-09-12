import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Header from "./header";
import ProfileButton from "./profilebutton";
import { useReferral } from "../hooks/referral";

export default function Referral() {
  const { referral, error } = useReferral();

  //if (loading) return <div className="text-white text-center p-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-10">{error}</div>;
  if (!referral) return null;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <h2 className="text-2xl font-semibold mt-6 mb-4 px-6 text-white">Profile</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 w-full px-6 py-8">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <ProfileButton />           
        </div>

        {/* Right Form */}
        <div className="md:col-span-2 border border-purple-600 rounded-lg p-6 bg-gradient-to-b from-black to-gray-900">
          {/* Title */}
          <h2 className="text-xl font-medium mb-6 text-white">Referral Link</h2>

          <div className="flex flex-col space-y-6">
            {/* Referral Link with Copy Button */}
            <div className="flex flex-col">
              <label className="block text-sm text-gray-300 mb-2">Your Referral Link</label>
              <div className="flex gap-2">
                {/* Input with gradient border */}
                <div className="flex-1 p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg">
                  <Input
                    type="text"
                    value={referral.referralLink}
                    readOnly
                    className="w-full bg-black border-0 rounded-md px-4 py-3 placeholder-gray-400 text-white"
                  />
                </div>
                {/* Copy Button */}
                <Button
                  className="px-4 py-3 rounded-md text-white font-medium bg-gradient-to-r from-purple-1 to-purple-2 hover:opacity-90 transition"
                  onClick={() => {navigator.clipboard.writeText(referral.referralLink);
                    alert("Referral link copied to clipboard!")
                  }}
                  >
                  Copy
                  
                </Button>
              </div>
            </div>

            {/* Open in New Tab Box */}
            <div className="flex flex-col">
              <label className="block text-sm text-gray-300 mb-2">Open in New Tab</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg flex items-center justify-center">
                <Button
                  className="w-full py-3 rounded-md text-white font-medium bg-black hover:bg-gray-800 transition"
                  onClick={() => window.open(referral.referralLink, "_blank")}
                >
                  Open Referral Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
