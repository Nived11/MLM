import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useAccount } from "../hooks/account";
import { FormSkeleton } from "./FormSkelton";

export const AccountSettings = () => {
  const {
    account,
    setAccount,
    qrPreview,
    handleFileChange,
    error,
    loading,
    saveAccountChanges,
    saving,
    formErrors, 
  } = useAccount();

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (account) {
      setAccount({ ...account, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    await saveAccountChanges(); 
  };

  if (error) {
    return <div className="text-red-500 text-center p-10">{error}</div>;
  }

  if (loading || !account) {
    return <FormSkeleton fields={7} rows={2} withButton />;
  }

  return (
    <div className="border border-purple-600 rounded-md p-6 bg-black">
      <h3 className="text-lg font-semibold mb-6 text-white">Account Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-gray-400 mb-1">Account Number</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <Input
              name="account_number"
              value={account.account_number}
              onChange={handleChange}
              placeholder="Enter account number"
              className="p-3 bg-black border-0 rounded-md text-white"
            />
          </div>
          {formErrors.account_number && (
            <span className="text-red-500 text-sm">{formErrors.account_number}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-gray-400 mb-1">Confirm Account Number</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <Input
              name="confirm_account_number"
              value={account.confirm_account_number}
              onChange={handleChange}
              placeholder="Confirm account number"
              className="p-3 bg-black border-0 rounded-md text-white"
            />
          </div>
          {formErrors.confirm_account_number && (
            <span className="text-red-500 text-sm">{formErrors.confirm_account_number}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-gray-400 mb-1">IFSC</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <Input
              name="ifsc"
              value={account.ifsc}
              onChange={handleChange}
              placeholder="Enter IFSC"
              className="p-3 bg-black border-0 rounded-md text-white"
            />
          </div>
          {formErrors.ifsc && (
            <span className="text-red-500 text-sm">{formErrors.ifsc}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-gray-400 mb-1">Account Holder Name</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <Input
              name="account_holder_name"
              value={account.account_holder_name}
              onChange={handleChange}
              placeholder="Enter account holder name"
              className="p-3 bg-black border-0 rounded-md text-white"
            />
          </div>
          {formErrors.account_holder_name && (
            <span className="text-red-500 text-sm">{formErrors.account_holder_name}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-gray-400 mb-1">Branch</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <Input
              name="branch"
              value={account.branch}
              onChange={handleChange}
              placeholder="Enter branch"
              className="p-3 bg-black border-0 rounded-md text-white"
            />
          </div>
          {formErrors.branch && (
            <span className="text-red-500 text-sm">{formErrors.branch}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-gray-400 mb-1">UPI Number</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <Input
              name="upi_number"
              value={account.upi_number}
              onChange={handleChange}
              placeholder="Enter UPI number"
              className="p-3 bg-black border-0 rounded-md text-white"
            />
          </div>
          {formErrors.upi_number && (
            <span className="text-red-500 text-sm">{formErrors.upi_number}</span>
          )}
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="text-gray-400 mb-1">UPI Type</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <select
              name="upi_type"
              value={account.upi_type}
              onChange={handleChange}
              className="p-2 bg-black border-0 rounded-md text-white w-full"
            >
              <option value="">Select UPI Method</option>
              <option value="GPay">GPay</option>
              <option value="PhonePe">PhonePe</option>
              <option value="Paytm">Paytm</option>
            </select>
          </div>
          {formErrors.upi_type && (
            <span className="text-red-500 text-sm">{formErrors.upi_type}</span>
          )}
        </div>

        
        <div className="flex flex-col md:col-span-2 space-y-4">
          <label className="text-gray-400">QR Code</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <div className="w-full h-30 rounded-md bg-black flex items-center justify-center">
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

          <div className="flex">
            <label
              htmlFor="fileInput"
              className="px-4 py-2 rounded-md cursor-pointer bg-gradient-to-r from-purple-1 to-purple-2 text-white font-medium text-center"
            >
              Choose File
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
  );
};
