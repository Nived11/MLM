import React, { useState } from 'react';

const ReferralLink: React.FC = () => {
    const [copiedLink, setCopiedLink] = useState(false);
    const referralUrl = 'https://lioclubx.com/referral/LX88011';

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(referralUrl);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        } catch (err) {
            console.error('Failed to copy link');
        }
    };

    return (
        <div className="rounded-2xl rounded-br-2xl p-[1px] bg-gradient-to-l from-purple-1 to-purple-2 md:h-[320px] lg:h-[352px] xl:h-[320px] 2xl:h-[345px] max-w-full">
            <div className="bg-black rounded-2xl rounded-br-2xl p-4 sm:p-6 h-full">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-8">Referral Link</h3>
                <div className="flex flex-row gap-3 sm:gap-2 mb-4 sm:mb-6 ">
                    <button
                        className="border-2 border-purple-700 text-white font-normal text-sm sm:text-base
                                   rounded-lg px-3 sm:px-3 py-2 transition-colors w-full "
                        onClick={() => window.open(referralUrl, "_blank")}
                    >
                        Open New Tab
                    </button>
                    <button
                        onClick={handleCopyLink}
                        className="bg-purple-900 hover:bg-purple-700 text-white font-normal text-sm sm:text-base rounded-lg px-4 sm:px-3 py-2 transition-colors w-full"
                    >
                        {copiedLink ? "Copied!" : "Copy"}
                    </button>
                </div>

                <div className="mb-4 sm:mb-6 ">
                    <div className="rounded-lg border border-purple-700 px-2 sm:px-4 py-3 sm:py-3">
                        <span className="block w-full text-xs sm:text-base text-white select-all 
                       break-words overflow-hidden">{referralUrl}</span>
                    </div>
                </div>
                <div>
                    <div className="bg-purple-900 rounded-lg  px-2 sm:px-3 lg:px-3 py-2 sm:py-2 ">
                        <span className="block text-xs sm:text-sm lg:text-base text-white ">
                            User first level not filled. Some cases placerent not available to generate rebirth ids.
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReferralLink;
