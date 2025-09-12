import { useState } from "react";
import { Input } from "../../../components/ui/input";
import ProfileButton from "./profilebutton";
import Header from "../components/header";
import { Button } from "../../../components/ui/button";
import { useAccount } from "../hooks/account";

export default function AccountSettings() {
  const { account, setAccount, qrPreview, handleFileChange, error } =
    useAccount();

  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (account) {
      setAccount({ ...account, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
       // simulate backend call
      alert("✅ Account details saved successfully!");
    } catch (err) {
      alert("❌ Failed to save account details");
    } finally {
      setSaving(false);
    }
  };

  // if (loading) {
  //   return <div className="text-white text-center p-10">Loading...</div>;
  // }

  if (error) {
    return <div className="text-red-500 text-center p-10">{error}</div>;
  }

  if (!account) return null;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Header />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <ProfileButton />
        </div>

        {/* Right Form */}
        <div className="md:col-span-2 border border-purple-600 rounded-md p-6 bg-black">
          <h3 className="text-lg font-semibold mb-6 text-white">
            Account Settings
          </h3>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Number */}
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Account Number</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
              <Input
                name="accountNumber"
                type="text"
                value={account.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
                className="p-3 border-0 bg-black  rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            </div>

            {/* Confirm Account Number */}
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">
                Confirm Account Number
              </label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
              <Input
                name="confirmAccountNumber"
                type="text"
                value={account.confirmAccountNumber}
                onChange={handleChange}
                placeholder="Re-Enter account number"
                className="p-3 bg-black border-0 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            </div>

            {/* IFSC */}
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">IFSC</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
              <Input
                name="ifsc"
                type="text"
                value={account.ifsc}
                onChange={handleChange}
                placeholder="Enter IFSC code"
                className="p-3 bg-black border-0 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            </div>

            {/* Account Holder Name */}
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Account Holder Name</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
              <Input
                name="accountHolder"
                type="text"
                value={account.accountHolder}
                onChange={handleChange}
                placeholder="Enter account holder name"
                className="p-3 bg-black border-0 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            </div>

            {/* Branch */}
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Branch</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
              <Input
                name="branch"
                type="text"
                value={account.branch}
                onChange={handleChange}
                placeholder="Enter branch"
                className="p-3 bg-black border-0 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            </div>

            {/* UPI Number */}
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">UPI Number</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
              <Input
                name="upiNumber"
                type="text"
                value={account.upiNumber}
                onChange={handleChange}
                placeholder="Enter UPI number"
                className="p-3 bg-black border-0 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            </div>

            {/* UPI Type */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-400 mb-1">UPI Type</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
              <Input
                name="upiType"
                type="text"
                value={account.upiType}
                onChange={handleChange}
                placeholder="G Pay"
                className="p-3 bg-black border-0 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            </div>

            {/* QR Code Upload */}
           <div className="flex flex-col md:col-span-2 space-y-4">
            <label className="text-gray-400">QR Code</label>

                  {/* Gradient border */}
                  <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                    {/* Inner box with solid background */}
                    <div className="w-full h-40 rounded-md bg-black flex items-center justify-center">
                      {file ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="QR Preview"
                          className="w-24 h-24 object-contain"
                        />
                      ) : qrPreview ? (
                        <img
                          src={qrPreview}
                          alt="QR Preview"
                          className="w-24 h-24 object-contain"
                        />
                      ) : (
                        <span className="text-gray-500">QR Code Preview</span>
                      )}
                    </div>
                  </div>



              {/* Choose File Button */}
              <div className="flex">
                <label
                  htmlFor="fileInput"
                  className="px-4 py-2 rounded-md cursor-pointer bg-gradient-to-r from-purple-1 to-purple-2 text-white font-medium text-center"
                >
                  {file ? file.name : "Choose File"}
                </label>
                <Input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files?.[0] || null);
                    handleFileChange(e);
                  }}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center md:col-span-2 mt-4">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-purple-1 to-purple-2 hover:opacity-90 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
