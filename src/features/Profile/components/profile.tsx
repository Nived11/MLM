import { useProfile } from "../hooks/profile";
import { useState } from "react";
import ProfileButton from "../components/profilebutton";
import Header from "../components/header";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function ProfilePage() {
  const { profile, handleFileChange, loading, error } = useProfile();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p className="text-white">No profile data found</p>;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      handleFileChange(e); // update in your hook
    }
  };

  // Dummy save handler (simulate backend update)
  const handleSave = async () => {
    try {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
      alert("✅ Profile saved successfully!");
    } catch (err) {
      alert("❌ Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Header />
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <ProfileButton />
        </div>

        {/* Right Form */}
        <div className="md:col-span-2">
          {/* Outer gradient border */}
          <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg w-full">
            {/* Inner black card */}
            <div className="bg-black p-6 rounded-md w-full">
              <h3 className="text-lg font-semibold mb-6 text-white">
                Bio & Other Informations
              </h3>

              {/* Profile Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                {/* First Name */}
                <div className="flex flex-col">
                  <label className="text-gray-400 mb-1">First Name</label>
                  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                    <Input
                      value={profile.first_name}
                      placeholder="First Name"
                      className="w-full border-0 p-3 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1"
                      readOnly
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="flex flex-col">
                  <label className="text-gray-400 mb-1">Last Name</label>
                  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                    <Input
                      value={profile.last_name}
                      placeholder="Last Name"
                      className="w-full border-0 p-3 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1"
                      readOnly
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-gray-400 mb-1">Email Address</label>
                  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                    <Input
                      value={profile.email}
                      placeholder="Email Address"
                      className="w-full border-0 p-3 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1"
                      readOnly
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <label className="text-gray-400 mb-1">Phone Number</label>
                  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                    <Input
                      value={profile.phone}
                      placeholder="Phone Number"
                      className="w-full border-0 p-3 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1"
                      readOnly
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col">
                  <label className="text-gray-400 mb-1">WhatsApp Number</label>
                  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                    <Input
                      value={profile.whatsapp}
                      placeholder="WhatsApp Number"
                      className="w-full border-0 p-3 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1"
                      readOnly
                    />
                  </div>
                </div>

                {/* Pincode */}
                <div className="flex flex-col">
                  <label className="text-gray-400 mb-1">Pincode</label>
                  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                    <Input
                      value={profile.pincode}
                      placeholder="Pincode"
                      className="w-full border-0 p-3 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1"
                      readOnly
                    />
                  </div>
                </div>

                {/* District */}
                <div className="flex flex-col">
                  <label className="text-gray-400 mb-1">District</label>
                  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                    <Input
                      value={profile.district}
                      placeholder="District"
                      className="w-full  border-0 p-3 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1"
                      readOnly
                    />
                  </div>
                </div>

                {/* State */}
                <div className="flex flex-col">
                  <label className="text-gray-400 mb-1">State</label>
                  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                    <Input
                      value={profile.state}
                      placeholder="State"
                      className="w-full border-0 p-3 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1"
                      readOnly
                    />
                  </div>
                </div>

                {/* Place */}
                <div className="flex flex-col md:col-span-2">
                  <label className="text-gray-400 mb-1">Place</label>
                  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                    <Input
                      value={profile.place}
                      placeholder="Place"
                      className="w-full border-0 p-3 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1"
                      readOnly
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col md:col-span-2">
                  <label className="text-gray-400 mb-1">Address</label>
                  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                    <textarea
                      value={profile.address}
                      placeholder="Address"
                      className="w-full border-0 p-3 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-1"
                      readOnly
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div className="flex flex-col md:col-span-2">
                  <label
                    htmlFor="formFileInput"
                    className="mt-4 p-2 text-center rounded-md bg-gradient-to-r from-purple-1 to-purple-2 cursor-pointer"
                  >
                    {selectedFile ? selectedFile.name : "Upload Profile Picture"}
                  </label>
                  <Input
                    id="formFileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onFileChange}
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-cent md:col-span-2 mt-6">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
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
