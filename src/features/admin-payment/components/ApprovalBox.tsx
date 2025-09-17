import { RefreshCw, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";
import React from "react";

interface ApprovalBoxProps {
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    approvedDialog: boolean;
    setApprovedDialog: React.Dispatch<React.SetStateAction<boolean>>;
    declinedDialog: boolean;
    setDeclinedDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApprovalBox: React.FC<ApprovalBoxProps> = ({
    openDialog,
    setOpenDialog,
    approvedDialog,
    setApprovedDialog,
    declinedDialog,
    setDeclinedDialog,
}) => {
    const handleApprove = () => {
        setOpenDialog(false);
        setApprovedDialog(true);
        setTimeout(() => setApprovedDialog(false), 2000);
    };

    const handleDecline = () => {
        setOpenDialog(false);
        setDeclinedDialog(true);
        setTimeout(() => setDeclinedDialog(false), 2000);
    };

    return (
        <>
            {openDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-2">
                    <div className="bg-[#312266] text-center rounded-xl p-5 sm:p-6 w-full max-w-md shadow-lg">
                        <div className="flex justify-center mb-3">
                            <RefreshCw className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="text-white text-base sm:text-lg font-semibold mb-4 sm:mb-5">
                            Pending Payment Approval
                        </h3>

                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
                            <Button
                                onClick={() => setOpenDialog(false)}
                                className="bg-[#D9D9D9] text-gray-700 hover:bg-gray-300 font-medium px-4 sm:px-6 py-2 rounded-lg w-full sm:w-auto">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDecline}
                                className="bg-[#D9D9D9] text-[#EE1515] hover:bg-gray-300 font-medium px-4 sm:px-6 py-2 rounded-lg w-full sm:w-auto">
                                Decline
                            </Button>
                            <Button
                                onClick={handleApprove}
                                className="bg-[#D9D9D9] text-[#6A00D4] hover:bg-gray-300 font-medium px-4 sm:px-6 py-2 rounded-lg w-full sm:w-auto">
                                Approve
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {approvedDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-2">
                    <div className="bg-[#312266] text-center rounded-xl p-4 sm:p-6 w-full max-w-md shadow-lg">
                        <div className="flex justify-center mb-3">
                            <ShieldCheck className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="text-white text-base sm:text-lg font-semibold">
                            Payment Approved
                        </h3>
                    </div>
                </div>
            )}

            {declinedDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-2">
                    <div className="bg-[#312266] text-center rounded-xl p-4 sm:p-6 w-full max-w-md shadow-lg">
                        <div className="flex justify-center mb-3">
                            <XCircle className="text-[#EE1515] w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="text-white text-base sm:text-lg font-semibold">
                            Payment Declined
                        </h3>
                    </div>
                </div>
            )}
        </>
    );
};

export default ApprovalBox;
