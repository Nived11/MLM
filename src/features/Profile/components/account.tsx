import { useState } from "react";
import { Input } from "../../../components/ui/input";
import ProfileButton from "./profilebutton";
import { Button } from "../../../components/ui/button";
import { useAccount } from "../hooks/account";

export default function AccountSettings() {
  const { account, setAccount, qrPreview, handleFileChange, error } = useAccount();

  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (account) {
      setAccount({ ...account, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
  const errors: Record<string, string> = {};

  // Account Number validations
  if (!account?.accountNumber) {
    errors.accountNumber = "Account number is required";
  } else if (!/^\d+$/.test(account.accountNumber)) {
    errors.accountNumber = "Account number must be numeric";
  }

  if (!account?.confirmAccountNumber) {
    errors.confirmAccountNumber = "Please confirm account number";
  } else if (!/^\d+$/.test(account.confirmAccountNumber)) {
    errors.confirmAccountNumber = "Confirm account number must be numeric";
  }

  if (
    account?.accountNumber &&
    account?.confirmAccountNumber &&
    account.accountNumber !== account.confirmAccountNumber
  ) {
    errors.confirmAccountNumber = "Account numbers do not match";
  }

  // Other required fields
  if (!account?.ifsc) errors.ifsc = "IFSC code is required";
  if (!account?.accountHolder) errors.accountHolder = "Account holder name is required";
  if (!account?.branch) errors.branch = "Branch name is required";
  if (!account?.upiNumber) errors.upiNumber = "UPI number is required";
  if (!account?.upiType) errors.upiType = "Select a UPI type";

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};


  const handleSave = async () => {
    if (!validateForm()) return; // stop save if validation fails
    setSaving(true);
    setTimeout(() => {
      alert("✅ Account details saved successfully!");
      setSaving(false);
    }, 1000);
  };

  if (error) {
    return <div className="text-red-500 text-center p-10">{error}</div>;
  }

  if (!account) return null;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Sidebar */}
        <div className="md:col-span-1 flex justify-center md:block">
          <ProfileButton/> {/* Adjusted profile icon size */}
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
                  className="p-3 border-0 bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {formErrors.accountNumber && <span className="text-red-500 text-sm">{formErrors.accountNumber}</span>}
            </div>

            {/* Confirm Account Number */}
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Confirm Account Number</label>
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
              {formErrors.confirmAccountNumber && <span className="text-red-500 text-sm">{formErrors.confirmAccountNumber}</span>}
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
              {formErrors.ifsc && <span className="text-red-500 text-sm">{formErrors.ifsc}</span>}
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
              {formErrors.accountHolder && <span className="text-red-500 text-sm">{formErrors.accountHolder}</span>}
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
              {formErrors.branch && <span className="text-red-500 text-sm">{formErrors.branch}</span>}
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
              {formErrors.upiNumber && <span className="text-red-500 text-sm">{formErrors.upiNumber}</span>}
            </div>

            {/* UPI Type Dropdown */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-400 mb-1">UPI Type</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <select
                  name="upiType"
                  value={account.upiType}
                  onChange={handleChange}
                  className="p-3 bg-black border-0 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                >
                  <option value="" className="text-sm">Select UPI Method</option>
                  <option value="GPay">GPay</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Paytm">Paytm</option>
                </select>
              </div>
              {formErrors.upiType && <span className="text-red-500 text-sm">{formErrors.upiType}</span>}
            </div>

            {/* QR Code Upload */}
            <div className="flex flex-col md:col-span-2 space-y-4">
              <label className="text-gray-400">QR Code</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <div className="w-full h-40 rounded-md bg-black flex items-center justify-center">
                  {file ? (
                    <img src={URL.createObjectURL(file)} alt="QR Preview" className="w-24 h-24 object-contain" />
                  ) : qrPreview ? (
                    <img src={qrPreview} alt="QR Preview" className="w-24 h-24 object-contain" />
                  ) : (
                    <span className="text-gray-500">QR Code Preview</span>
                  )}
                </div>
              </div>

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
