import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useReferral } from "../hooks/referral";
import { FormSkeleton } from "./FormSkelton";

export const Referral = () => {
  const { referral, error } = useReferral();
  const [copied, setCopied] = useState(false);

  if (error) {
    return <div className="text-red-500 text-center p-10">{error}</div>;
  }

  if (!referral) {
    return <FormSkeleton fields={2} rows={1} withButton={false} />;
  }

  const handleCopy = () => {
    if (!referral?.referralLink) return; // ✅ safety check
    navigator.clipboard.writeText(referral.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="md:col-span-2">
      <div className="p-[1px] rounded-lg bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg">
        <div className="rounded-lg p-6 bg-black">
          {/* Title */}
          <h2 className="text-xl font-medium mb-6">Referral Link</h2>

          <div className="flex flex-col space-y-6">
            {/* Referral Link with Copy Button */}
            <div className="flex flex-col">
              <label className="block text-sm text-gray-300 mb-2">
                Your Referral Link
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Input with gradient border */}
                <div className="flex-1 p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg">
                  <Input
                    type="text"
                    value={referral?.referralLink || "N/A"} // ✅ fallback text
                    readOnly
                    className="w-full bg-black border-0 rounded-md px-4 py-3 placeholder-gray-400 text-white text-sm sm:text-base"
                  />
                </div>
                {/* Copy Button */}
                <Button
                  className="px-4 py-3 rounded-md text-white font-medium bg-gradient-to-r from-purple-1 to-purple-2 hover:opacity-90 transition w-full sm:w-auto"
                  onClick={handleCopy}
                  disabled={!referral?.referralLink} // ✅ disable if missing
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>

            {/* Open in New Tab Box */}
            <div className="flex flex-col">
              <label className="block text-sm text-gray-300 mb-2">
                Open in New Tab
              </label>
              <Button
                className="w-50 py-3 text-white font-medium bg-black hover:bg-gray-800 transition p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg flex items-center justify-center"
                onClick={() =>
                  referral?.referralLink &&
                  window.open(referral.referralLink, "_blank")
                }
                disabled={!referral?.referralLink} // ✅ disable if missing
              >
                Open Referral Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
