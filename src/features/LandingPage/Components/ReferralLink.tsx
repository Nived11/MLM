import React, { useEffect, useState } from "react";
import axios from "axios";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const baseURL = import.meta.env.VITE_API_URL || "";

const ReferralLink: React.FC = () => {
    const [referralId, setReferralId] = useState<string | null>(null);
    const [copiedLink, setCopiedLink] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const referralUrl = referralId
        ? `https://lioclubx.com/referral/${referralId}`
        : "";

    useEffect(() => {
        const fetchReferral = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("accessToken");
                const res = await axios.get<{ referral_id: string }>(
                    `${baseURL}/referral/`,
                    {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : "",
                        },
                    }
                );
                setReferralId(res.data.referral_id);
            } catch (err) {
                setError(extractErrorMessages(err) || "Failed to fetch referral link");
            } finally {
                setLoading(false);
            }
        };

        fetchReferral();
    }, []);

    const handleCopyLink = async () => {
        if (!referralUrl) return;
        try {
            await navigator.clipboard.writeText(referralUrl);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        } catch {
            console.error("Failed to copy link");
        }
    };

    return (
        <div className="rounded-2xl rounded-br-2xl p-[1px] bg-gradient-to-l from-purple-1 to-purple-2 md:h-[320px] lg:h-[352px] xl:h-[320px] 2xl:h-[345px] max-w-full">
            <div className="bg-black rounded-2xl rounded-br-2xl p-4 sm:p-6 h-full">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-8">
                    Referral Link
                </h3>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Buttons stay visible always */}
                <div className="flex flex-row gap-3 sm:gap-2 mb-4 sm:mb-6">
                    <button
                        className="border-2 border-purple-700 text-white text-sm sm:text-base rounded-lg px-3 py-2 w-full"
                        onClick={() => referralUrl && window.open(referralUrl, "_blank")}
                        disabled={!referralUrl}
                    >
                        Open New Tab
                    </button>

                    <button
                        onClick={handleCopyLink}
                        disabled={!referralUrl}
                        className="bg-purple-900 hover:bg-purple-700 disabled:opacity-50 text-white text-sm sm:text-base rounded-lg px-4 py-2 w-full"
                    >
                        {copiedLink ? "Copied!" : "Copy"}
                    </button>
                </div>

                {/* Only the link text shows skeleton */}
                <div className="mb-4 sm:mb-6">
                    <div className="rounded-lg border border-purple-700 px-2 sm:px-4 py-3 sm:py-3">
                        {loading ? (
                            <div className="h-5 w-3/4 bg-gray-700 rounded animate-pulse" />
                        ) : referralUrl ? (
                            <span className="block w-full text-xs sm:text-base text-white break-words">
                                {referralUrl}
                            </span>
                        ) : (
                            <span className="text-gray-400 text-sm">
                                Referral link not available
                            </span>
                        )}
                    </div>
                </div>

                <div className="bg-purple-900 rounded-lg px-2 sm:px-3 lg:px-3 py-2 sm:py-2">
                    <span className="block text-xs sm:text-sm lg:text-base text-white">
                        User first level not filled. Some cases placerent not available to
                        generate rebirth ids.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ReferralLink;


