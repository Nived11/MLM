import React from "react";
import { X, Mail, Phone, CreditCard } from "lucide-react";
import profileImg from "../../../assets/images/profile.png";
import { useFetchReferral } from "../hooks/useFetchReferral";


interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  levelId: number;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isOpen, onClose, levelId }) => {
  const { referral, loading, error } = useFetchReferral(levelId, isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white text-black rounded-2xl shadow-lg w-[360px] sm:w-[400px] relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1C1332] hover:text-[#6A00D4] transition-colors"
        >
          <X size={18} />
        </button>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {referral && !loading && !error && (
          <>
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                <img src={referral.profile_image || profileImg} alt={referral.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <h2 className="text-base font-bold text-center mt-4">
              {referral.name}
            </h2>

            <div className="mt-4 flex flex-col items-center space-y-3 text-[#312266]">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-[#6A00D4]" />
                  <span className="text-sm">{referral.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-[#6A00D4]" />
                  <span className="text-sm">{referral.mobile}</span>
                </div>
              </div>

              {referral.status && (
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-3 h-3 rounded-full ${referral.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                  />
                  <span className="text-sm">{referral.status}</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <CreditCard size={16} className="text-[#6A00D4]" />
                <span className="text-sm">{referral.whatsapp_number}</span>
              </div>
            </div>
          </>
        )}
        {!referral && !loading && !error && (
          <p className="text-center text-gray-500">Referral not found</p>
        )}

      </div>
    </div>
  );
};

export default ProfilePopup;
