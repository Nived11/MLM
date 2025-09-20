import { useEffect, useRef } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useEditProfile } from "../hooks/useEditProfile";
import type { UserManagement } from "../type";
import { ArrowLeft, Pencil } from "lucide-react";
import placeholderImage from "../../../assets/images/profile.png";
import InputField from "./InputField";

interface EditProfileProps {
  userId: string;
  mode: "view" | "edit";
  onClose: () => void;
}

export default function EditProfile({
  userId,
  mode,
  onClose,
}: EditProfileProps) {
  const formTopRef = useRef<HTMLDivElement>(null);

  const {
    formData,
    formErrors,
    profileImagePreview,
    error,
    saving,
    loadingValues,
    handleValues,
    handleChange,
    handleFileChange,
    handleSave,
  } = useEditProfile({ userId, onClose });

  const fields: (keyof UserManagement)[] = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "whatsapp",
    "pincode",
    "district",
    "state",
    "place",
  ];

  useEffect(() => {
    handleValues(userId);
  }, [userId]);

  const handleSaveClick = async () => {
    const success = await handleSave();
    if (!success && formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={formTopRef}>
      <button
        onClick={onClose}
        className="flex items-center text-2xl font-semibold mb-6 gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft size={20} />
        {mode === "edit" ? "Edit Profile" : "View Profile"}
      </button>

      {loadingValues ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-solid" />
        </div>
      ) : (
        <div className="bg-gradient-to-b from-[var(--purple-1)] to-[var(--purple-2)] p-[2px] rounded-xl shadow-lg mx-auto">
          <div className="bg-black rounded-lg px-4 py-6 flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex flex-col items-center md:w-1/3 relative">
              <div className="relative">
                <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-purple-2 flex items-center justify-center">
                  <img
                    src={profileImagePreview || placeholderImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        placeholderImage;
                    }}
                  />
                </div>

                {mode === "edit" && (
                  <label className="absolute bottom-1 right-1 bg-purple-1 p-2 rounded-full cursor-pointer hover:opacity-80 flex items-center justify-center">
                    <Pencil size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files && handleFileChange(e.target.files[0])
                      }
                    />
                  </label>
                )}
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold">{formData.username}</h3>
                <p className="text-gray-400">Level {formData.level}</p>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {error && (
                <div className="md:col-span-2 border border-red-500 rounded-lg text-red-500 p-3 mb-2 text-center">
                  {error}
                </div>
              )}

              {fields.map((field) => (
                <InputField
                  key={field}
                  label={String(field).replace("_", " ").toUpperCase()}
                  value={formData[field] as string}
                  error={formErrors[field]}
                  disabled={mode === "view" || saving}
                  onChange={(v) => handleChange(field, v)}
                />
              ))}

              <div className="flex flex-col md:col-span-2">
                <label className="text-gray-400 mb-1">Address</label>
                <div
                  className={`p-[1px] rounded-md ${
                    formErrors.address
                      ? "border border-red-500"
                      : mode === "view" || saving
                      ? "border border-violet-600"
                      : "bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]"
                  }`}
                >
                  <Input
                    value={formData.address as string}
                    onChange={(e) => handleChange("address", e.target.value)}
                    disabled={mode === "view" || saving}
                    placeholder="Address"
                    className={`w-full p-3 bg-black rounded-md border ${
                      formErrors.address ? "border-red-500" : "border-gray-700"
                    } focus:outline-none focus:ring-2 focus:ring-purple-1 disabled:opacity-50`}
                  />
                </div>
                {formErrors.address && (
                  <span className="text-red-500 text-sm">
                    {formErrors.address}
                  </span>
                )}
              </div>

              <div className="flex gap-4 mt-4 md:col-span-2">
                {mode === "edit" && (
                  <Button
                    onClick={handleSaveClick}
                    disabled={saving}
                    className="px-6 py-2 bg-gradient-to-r from-purple-1 to-purple-2 text-white rounded-lg shadow-md hover:opacity-90 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                )}
                <Button
                  onClick={onClose}
                  disabled={saving}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:opacity-80 disabled:opacity-50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
