// ProfilePage.tsx
import { useProfile } from "../hooks/profile";
import { useState } from "react";
import ProfileButton from "../components/profilebutton";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function ProfilePage() {
  const {
    editableProfile,
    handleInputChange,
    saveProfileChanges,
    loading,
    error,
    handleFileChange,
    profile_image,
  } = useProfile();

  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!editableProfile) return <p className="text-white">No profile data found</p>;

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!editableProfile.first_name.trim()) errors.first_name = "First name is required";
    if (!editableProfile.last_name.trim()) errors.last_name = "Last name is required";
    if (!editableProfile.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(editableProfile.email)) errors.email = "Email is invalid";
    if (!editableProfile.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\+?\d{10,15}$/.test(editableProfile.phone)) errors.phone = "Phone number is invalid";
    if (!editableProfile.whatsapp.trim()) errors.whatsapp = "WhatsApp number is required";
    else if (!/^\+?\d{10,15}$/.test(editableProfile.phone)) errors.phone = "Phone number is invalid";
    if (!editableProfile.pincode.trim()) errors.pincode = "Pincode is required";
    if (!editableProfile.district.trim()) errors.district = "District is required";
    if (!editableProfile.state.trim()) errors.state = "State is required";
    if (!editableProfile.place.trim()) errors.place = "Place is required";
    if (!editableProfile.address.trim()) errors.address = "Address is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field: keyof typeof editableProfile, value: string) => {
    handleInputChange(field, value);
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      setSaving(true);
      await saveProfileChanges();
      alert("✅ Profile saved successfully!");
    } catch {
      alert("❌ Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Column - Profile Button */}
        <div className="md:col-span-1">
          <ProfileButton />
        </div>

        {/* Right Column - Profile Form */}
        <div className="md:col-span-2">
          <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg w-full">
            <div className="bg-black p-6 rounded-md w-full">
              <h3 className="text-lg font-semibold mb-6 text-white">Bio & Other Informations</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                {/* First Name */}
                <InputField
                  label="First Name"
                  value={editableProfile.first_name}
                  error={formErrors.first_name}
                  onChange={(v) => handleChange("first_name", v)}
                />

                {/* Last Name */}
                <InputField
                  label="Last Name"
                  value={editableProfile.last_name}
                  error={formErrors.last_name}
                  onChange={(v) => handleChange("last_name", v)}
                />

                {/* Email */}
                <InputField
                  label="Email"
                  value={editableProfile.email}
                  error={formErrors.email}
                  onChange={(v) => handleChange("email", v)}
                />

                {/* Phone */}
                <InputField
                  label="Phone Number"
                  value={editableProfile.phone}
                  error={formErrors.phone}
                  onChange={(v) => handleChange("phone", v)}
                />

                {/* WhatsApp */}
                <InputField
                  label="WhatsApp Number"
                  value={editableProfile.whatsapp}
                  error={formErrors.whatsapp}
                  onChange={(v) => handleChange("whatsapp", v)}
                />

                {/* Pincode */}
                <InputField
                  label="Pincode"
                  value={editableProfile.pincode}
                  error={formErrors.pincode}
                  onChange={(v) => handleChange("pincode", v)}
                />

                {/* District */}
                <InputField
                  label="District"
                  value={editableProfile.district}
                  error={formErrors.district}
                  onChange={(v) => handleChange("district", v)}
                />

                {/* State */}
                <InputField
                  label="State"
                  value={editableProfile.state}
                  error={formErrors.state}
                  onChange={(v) => handleChange("state", v)}
                />

                {/* Place */}
                <InputField
                  label="Place"
                  value={editableProfile.place}
                  error={formErrors.place}
                  onChange={(v) => handleChange("place", v)}
                />

                {/* Address */}
                <div className="flex flex-col md:col-span-2">
                  <label className="text-gray-400 mb-1">Address</label>
                  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                    <Input
                      value={editableProfile.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      placeholder="Address"
                      className={`w-full p-3 bg-black rounded-md border ${
                        formErrors.address ? "border-red-500" : "border-gray-700"
                      } focus:outline-none focus:ring-2 focus:ring-purple-1`}
                    />
                  </div>
                  {formErrors.address && <span className="text-red-500 text-sm">{formErrors.address}</span>}
                </div>

                                  {/* Profile Picture Upload */}
                    <div className="flex flex-col md:col-span-2 items-center">
                    {/* Upload Label */}
                    <label
                      htmlFor="formFileInput"
                      className="mt-4 mb-2 w-50 text-center py-2 rounded-md bg-gradient-to-r from-purple-1 to-purple-2 text-white font-semibold cursor-pointer hover:opacity-90 transition"
                    >
                      Profile photo
                    </label>

                    {/* Hidden File Input */}
                    <Input
                      id="formFileInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />

                    {/* Preview Box */}
                    <div className="w-full h-40 p-1 rounded-xl bg-gradient-to-r from-purple-1 to-purple-2 mt-2 flex items-center justify-center shadow-lg">
                      <div className="w-full h-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
                        {profile_image ? (
                          <img
                            src={profile_image}
                            alt="Preview"
                            className="w-30 h-30 object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-gray-400 text-center px-2">No Image Selected</span>
                        )}
                      </div>
                    </div>
                  </div>



                {/* Save Button */}
                <div className="flex justify-center md:col-span-2 mt-6">
                  <Button
                    onClick={handleSave}
                    className="px-6 py-2 bg-gradient-to-r from-purple-1 to-purple-2 text-white rounded-lg shadow-md hover:opacity-90 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable input field component
interface InputFieldProps {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}
const InputField = ({ label, value, error, onChange }: InputFieldProps) => (
  <div className="flex flex-col">
    <label className="text-gray-400 mb-1">{label}</label>
    <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className={`w-full p-3 bg-black rounded-md border ${
          error ? "border-red-500" : "border-gray-700"
        } focus:outline-none focus:ring-2 focus:ring-purple-1`}
      />
    </div>
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);
