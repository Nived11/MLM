import React from "react";
import { X, Mail, Phone, CreditCard } from "lucide-react";
import profileImg from "../../../assets/images/profile.png";

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  phone: string;
  altPhone?: string;
  status?: "Active" | "Inactive";
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({
  isOpen,
  onClose,
  name,
  email,
  phone,
  altPhone,
  status = "Active",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#FFFFFF] text-[#000000] rounded-2xl shadow-lg w-[360px] sm:w-[400px] relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1C1332] hover:text-[#6A00D4] transition-colors">
          <X size={18} />
        </button>
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#908f8a] flex items-center justify-center overflow-hidden border-4 border-[#FFFFFF] shadow-md">
            <img
              src={profileImg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h2 className="text-base font-bold text-center mt-4">{name}</h2>

        <div className="mt-4 flex flex-col items-center space-y-3 text-[#312266]">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Mail size={16} className="text-[#6A00D4]" />
              <span className="text-sm">{email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} className="text-[#6A00D4]" />
              <span className="text-sm">{phone}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`w-3 h-3 rounded-full ${
                status === "Active" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm">{status}</span>
          </div>
          {altPhone && (
            <div className="flex items-center space-x-2">
              <CreditCard size={16} className="text-[#6A00D4]" />
              <span className="text-sm">{altPhone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
