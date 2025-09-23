import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import gpayImg from "../../../assets/images/gpay.png";
import { IoLogoWhatsapp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "./ProfilePopup";
import { useFetchReferral } from "../hooks/useFetchReferral";

interface SendHelpCardProps {
  levelId: number;
  amount: number;
  status: "Pending" | "Not Paid";
  gpay?: boolean;
  level?: string;      
  levelName?: string;  
}

const SendHelpCard = ({
  levelId,
  amount,
  status,
  gpay = true,
  level,
  levelName,
}: SendHelpCardProps) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { referral, loading } = useFetchReferral(levelId, true);

  const handleWhatsAppClick = () => {
    if (!referral?.whatsapp_number) {
      setAlertMessage("Referrer contact not available");
      return;
    }

    const message = `Hello, I’m interested in supporting you for ${levelName} with amount ₹${amount}.`;
    const whatsappUrl = `https://wa.me/${referral.whatsapp_number}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div className="rounded-[20px] bg-gradient-to-br from-[#1C1332] to-[#2F2061] p-4 w-[367px] flex flex-col gap-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="w-[119px] h-[31px] flex items-center justify-center rounded-[20px] text-base font-light bg-gradient-to-r from-[#6A00D4] to-[#5C1053]">
            Active
          </div>
          <div className="w-[119px] h-[31px] rounded-[20px] bg-gradient-to-r from-[#6E07CF] to-[#6C1161] p-[2px]">
            <div className="flex items-center justify-center w-full h-full rounded-[20px] bg-gradient-to-r from-[#1C1332] to-[#2F2061] text-sm font-light text-white">
              {status}
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold">{levelName || `Level ${level}`}</h3>

        <div className="flex items-center gap-3">
          <div className="w-[84px] h-[26px] rounded-[20px] p-[1px] bg-gradient-to-r from-[#6E07CF] to-[#FFFFFF]">
            <div className="w-full h-full flex items-center justify-center rounded-[20px] bg-gradient-to-r from-[#1C1332] to-[#2F2061] text-white text-sm font-semibold">
              {amount}
            </div>
          </div>
          {gpay && (
            <div className="w-[66px] h-[21px] flex items-center gap-1 rounded-[20px] bg-white px-2">
              <img src={gpayImg} alt="GPay" className="w-4 h-4" />
              <span className="text-xs font-light text-[#4275BC]">G Pay</span>
            </div>
          )}
          <button
            onClick={() =>
              navigate("/send-help/payment", { state: { levelId } })
            }
            disabled={status === "Pending"}
            className={`w-[115px] h-[24px] rounded-[8px] ${
              status === "Pending"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white text-[#6A00D4]"
            } shadow-[0px_4px_4px_0px_#FFFFFF40] text-xs font-normal flex items-center justify-center`}
          >
            Pay Now
          </button>
        </div>

        <div className="flex items-center justify-between mt-7">
          <Button
            onClick={() => setIsProfileOpen(true)}
            className="w-[195px] h-[42px] rounded-[20px] p-[2px] bg-gradient-to-r from-[#6E07CF] to-[#FFFFFF] flex items-center justify-between"
          >
            <div className="w-full h-full flex items-center justify-between px-4 rounded-[20px] bg-gradient-to-r from-[#1C1332] to-[#2F2061] text-white text-sm font-light">
              View Profile
              <ArrowRight size={16} />
            </div>
          </Button>
          <button
            className="flex items-center justify-center disabled:opacity-50"
            onClick={handleWhatsAppClick}
            disabled={loading}
          >
            <IoLogoWhatsapp size={35} className="text-white" />
          </button>
        </div>
      </div>

      <ProfilePopup
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        levelId={levelId}
      />

      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/25 z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-6 w-[300px] text-center">
            <p className="text-sm mb-4">{alertMessage}</p>
            <Button
              onClick={() => setAlertMessage(null)}
              className="w-full bg-[#6A00D4] text-white rounded-lg"
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SendHelpCard;
