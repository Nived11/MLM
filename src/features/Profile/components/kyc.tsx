import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import ProfileButton from "./profilebutton";
import { useKYC } from "../hooks/kyc";

export default function KYCForm() {
  const { kyc, setKYC, panPreview, nomineePreview, handleFileChange, loading, error } = useKYC();
  const [panFile, setPanFile] = useState<File | null>(null);
  const [nomineeFile, setNomineeFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (loading) return <div className="text-white text-center p-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-10">{error}</div>;
  if (!kyc) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKYC({ ...kyc, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!kyc.accountNumber) errors.accountNumber = "Account number is required";
    if (!kyc.panNumber) errors.panNumber = "PAN number is required";
    if (!panFile && !panPreview) errors.panCardImage = "PAN card image is required";
    if (!kyc.nomineeName) errors.nomineeName = "Nominee name is required";
    if (!kyc.nomineeID) errors.nomineeID = "Nominee ID is required";
    if (!kyc.nomineeRelation) errors.nomineeRelation = "Nominee relation is required";
    if (!nomineeFile && !nomineePreview) errors.nomineeIDImage = "Nominee ID image is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    setSaving(true);
    setTimeout(() => {
      alert("✅ KYC details saved successfully!");
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Sidebar */}
        <div className="md:col-span-1 flex justify-center md:block">
          <ProfileButton />
        </div>

        {/* Right Form */}
        <div className="md:col-span-2 border border-purple-600 rounded-md p-6 bg-black">
          <h3 className="text-lg font-semibold mb-6 text-white">KYC Details</h3>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Number */}
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Account Number</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  name="accountNumber"
                  type="text"
                  value={kyc.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  className="p-3 border-0 bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {formErrors.accountNumber && <span className="text-red-500 text-sm">{formErrors.accountNumber}</span>}
            </div>

            {/* PAN Number */}
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">PAN Number</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  name="panNumber"
                  type="text"
                  value={kyc.panNumber}
                  onChange={handleChange}
                  placeholder="Enter PAN number"
                  className="p-3 border-0 bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {formErrors.panNumber && <span className="text-red-500 text-sm">{formErrors.panNumber}</span>}
            </div>

            {/* PAN Card Image */}
            <div className="flex flex-col md:col-span-2 space-y-4">
              <label className="text-gray-400">PAN Card Image</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <div className="w-full h-40 rounded-md bg-black flex items-center justify-center">
                  {panFile ? (
                    <img src={URL.createObjectURL(panFile)} alt="PAN Preview" className="w-24 h-24 object-contain" />
                  ) : panPreview ? (
                    <img src={panPreview} alt="PAN Preview" className="w-24 h-24 object-contain" />
                  ) : (
                    <span className="text-gray-500">PAN Preview</span>
                  )}
                </div>
              </div>
              <div className="flex">
                <label
                  htmlFor="panInput"
                  className="px-4 py-2 rounded-md cursor-pointer bg-gradient-to-r from-purple-1 to-purple-2 text-white font-medium text-center"
                >
                  Choose File
                </label>
                <Input
                  id="panInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setPanFile(e.target.files?.[0] || null);
                    handleFileChange(e, "pan");
                  }}
                />
              </div>
              {formErrors.panCardImage && <span className="text-red-500 text-sm">{formErrors.panCardImage}</span>}
            </div>

            {/* Nominee Name */}
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Nominee Name</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  name="nomineeName"
                  type="text"
                  value={kyc.nomineeName}
                  onChange={handleChange}
                  placeholder="Enter nominee name"
                  className="p-3 border-0 bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {formErrors.nomineeName && <span className="text-red-500 text-sm">{formErrors.nomineeName}</span>}
            </div>

            {/* Nominee ID */}
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Nominee ID</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  name="nomineeID"
                  type="text"
                  value={kyc.nomineeID}
                  onChange={handleChange}
                  placeholder="Enter nominee ID"
                  className="p-3 border-0 bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {formErrors.nomineeID && <span className="text-red-500 text-sm">{formErrors.nomineeID}</span>}
            </div>

            {/* Nominee Relation */}
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Nominee Relation</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  name="nomineeRelation"
                  type="text"
                  value={kyc.nomineeRelation}
                  onChange={handleChange}
                  placeholder="Enter relation"
                  className="p-3 border-0 bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {formErrors.nomineeRelation && <span className="text-red-500 text-sm">{formErrors.nomineeRelation}</span>}
            </div>

            {/* Nominee ID Image */}
            <div className="flex flex-col md:col-span-2 space-y-4">
              <label className="text-gray-400">Nominee ID Image</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <div className="w-full h-40 rounded-md bg-black flex items-center justify-center">
                  {nomineeFile ? (
                    <img src={URL.createObjectURL(nomineeFile)} alt="Nominee Preview" className="w-24 h-24 object-contain" />
                  ) : nomineePreview ? (
                    <img src={nomineePreview} alt="Nominee Preview" className="w-24 h-24 object-contain" />
                  ) : (
                    <span className="text-gray-500">Nominee ID Preview</span>
                  )}
                </div>
              </div>
              <div className="flex">
                <label
                  htmlFor="nomineeInput"
                  className="px-4 py-2 rounded-md cursor-pointer bg-gradient-to-r from-purple-1 to-purple-2 text-white font-medium text-center"
                >
                  Choose File
                </label>
                <Input
                  id="nomineeInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setNomineeFile(e.target.files?.[0] || null);
                    handleFileChange(e, "nominee");
                  }}
                />
              </div>
              {formErrors.nomineeIDImage && <span className="text-red-500 text-sm">{formErrors.nomineeIDImage}</span>}
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
