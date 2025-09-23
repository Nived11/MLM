import { useProfile } from "../hooks/profile";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { FormSkeleton } from "./FormSkelton";

export const ProfilePage = () => {
  const {
    editableProfile,
    handleInputChange,
    saveProfileChanges,
    handleFileChange,
    loading,
    error,
    profile_image,
    formErrors,
  } = useProfile();

  const [saving, setSaving] = useState(false);
  if (error) return <p className="text-red-500">{error}</p>;
  if (!editableProfile || loading) return <FormSkeleton fields={7} rows={2} withButton />;

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveProfileChanges();
      window.location.reload();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="md:col-span-2">
      <div className="p-[1px] rounded-lg bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg">
        <div className="rounded-lg p-6 bg-black">
          <h3 className="text-lg font-semibold mb-6 text-white">Bio & Other Informations</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            <InputField
              label="First Name"
              value={editableProfile.first_name || ""}
              error={formErrors.first_name}
              onChange={(v) => handleInputChange("first_name", v)}
            />
            <InputField
              label="Last Name"
              value={editableProfile.last_name || ""}
              error={formErrors.last_name}
              onChange={(v) => handleInputChange("last_name", v)}
            />
            <InputField
              label="Email"
              value={editableProfile.email || ""}
              error={formErrors.email}
              onChange={(v) => handleInputChange("email", v)}
            />
            <InputField
              label="Phone Number"
              value={editableProfile.mobile || ""}
              error={formErrors.mobile}
              onChange={(v) => handleInputChange("mobile", v)}
            />
            <InputField
              label="WhatsApp Number"
              value={editableProfile.whatsapp_number || ""}
              error={formErrors.whatsapp_number}
              onChange={(v) => handleInputChange("whatsapp_number", v)}
            />
            <InputField
              label="Pincode"
              value={editableProfile.pincode || ""}
              error={formErrors.pincode}
              onChange={(v) => handleInputChange("pincode", v)}
            />
            <InputField
              label="District"
              value={editableProfile.district || ""}
              error={formErrors.district}
              onChange={(v) => handleInputChange("district", v)}
            />
            <InputField
              label="State"
              value={editableProfile.state || ""}
              error={formErrors.state}
              onChange={(v) => handleInputChange("state", v)}
            />
            <InputField
              label="Place"
              value={editableProfile.place || ""}
              error={formErrors.place}
              onChange={(v) => handleInputChange("place", v)}
            />
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-400 mb-1">Address</label>
              <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  value={editableProfile.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Address"
                  className={`w-full p-3 bg-black rounded-md border ${
                    formErrors.address ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:ring-2 focus:ring-purple-1`}
                />
              </div>
              {formErrors.address && (
                <span className="text-red-500 text-sm mt-1">{formErrors.address}</span>
              )}
            </div>

            <div className="flex flex-col md:col-span-2 space-y-4 ">
              
              <Input
                id="formFileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2 w-full h-40 flex items-center justify-center">
                <div className="w-full h-full bg-black rounded-md overflow-hidden flex items-center justify-center">
                  {profile_image ? (
                    <img
                      src={profile_image}
                      alt="Preview"
                      className="w-30 h-30 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-400 text-center px-2">No Image Selected</span>
                  )}
                </div>
              </div>
              <label
                htmlFor="formFileInput"
                className="mt-4 mb-2 w-40 text-center py-2 rounded-md bg-gradient-to-r from-purple-1 to-purple-2 text-white cursor-pointer hover:opacity-90 transition"
              >
                Choose Profile Photo
              </label>
            </div>

            <div className="flex justify-center md:col-span-2 mt-6">
              <Button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-purple-1 to-purple-2 text-white rounded-lg shadow-md hover:opacity-90 disabled:opacity-50"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}
const InputField = ({ label, value, error, onChange }: InputFieldProps) => (
  <div className="flex flex-col">
    <label className="text-gray-400 mb-1">{label}</label>
    <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className={`w-full p-3 bg-black rounded-md border ${
          error ? "border-red-500" : "border-gray-700"
        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
      />
    </div>
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
);
