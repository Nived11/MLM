import { Button } from "../../../components/ui/button";
import { useChangePassword } from "../hooks/security";
import { useState } from "react";
import { FormSkeleton } from "./FormSkelton";
import { Input } from "../../../components/ui/input";
import { Eye, EyeOff } from "lucide-react";


export const SecuritySettings = () => {
  const { changePassword, loading } = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

   if (loading){
      return <FormSkeleton fields={3} rows={2} withButton />;
   }

  const handleSave = async () => {
   await changePassword(currentPassword, newPassword, confirmPassword);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="md:col-span-2 border border-purple-600 rounded-md p-6 bg-black">
      <h3 className="text-lg font-semibold mb-6 text-white">Security</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Password */}
        <PasswordInput
          label="Current Password"
          value={currentPassword}
          onChange={setCurrentPassword}
          show={showCurrent}
          setShow={setShowCurrent}
        />

        {/* New Password */}
        <PasswordInput
          label="New Password"
          value={newPassword}
          onChange={setNewPassword}
          show={showNew}
          setShow={setShowNew}
        />

        {/* Confirm Password */}
        <PasswordInput
          label="Confirm New Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          show={showConfirm}
          setShow={setShowConfirm}
        />

        {/* Save Button */}
        <div className="flex flex-col items-center md:col-span-2 mt-6 gap-3">
          <Button
            onClick={handleSave}
            className="px-8 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-purple-1 to-purple-2 hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Reusable Password Input Component
interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  setShow: (v: boolean) => void;
}

const PasswordInput = ({
  label,
  value,
  onChange,
  show,
  setShow,
}: PasswordInputProps) => (
  <div className="flex flex-col md:col-span-2 relative">
    <label className="block text-sm text-gray-300 mb-2">{label}</label>
    <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2 relative">
      <Input
        placeholder={`Enter ${label.toLowerCase()}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border-0 rounded-md px-4 py-3 placeholder-gray-400 text-white pr-10"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);
