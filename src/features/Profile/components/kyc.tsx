import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Header from "./header";
import ProfileButton from "./profilebutton";
import { useKYC } from "../hooks/kyc";

export default function KYCForm() {
  const { kyc, setKYC, panPreview, nomineePreview, handleFileChange, loading, error } = useKYC();
  const [panFile, setPanFile] = useState<File | null>(null);
  const [nomineeFile, setNomineeFile] = useState<File | null>(null);

  if (loading) return <div className="text-white text-center p-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-10">{error}</div>;
  if (!kyc) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKYC({ ...kyc, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <h2 className="text-2xl font-semibold mt-6 mb-4 px-6 text-white">Profile</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 w-full px-6 py-8">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <ProfileButton />
        </div>

        {/* Right Form */}
        <div className="md:col-span-2 border border-purple-600 rounded-md p-6 bg-black">
          <h2 className="text-xl font-medium mb-6 text-white">KYC Details</h2>

          {/* Account Number / PAN */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Account Number</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  type="text"
                  name="accountNumber"
                  value={kyc.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  className="p-3 bg-black border-0 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">PAN Number</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  type="text"
                  name="panNumber"
                  value={kyc.panNumber}
                  onChange={handleChange}
                  placeholder="Enter PAN number"
                  className="p-2 bg-black border-0 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* PAN Card Image */}
          <div className="flex flex-col mb-6">
            <label className="text-gray-400 mb-1">PAN Card Image</label>
            <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
              <div className="w-full h-30 rounded-md bg-black flex items-center justify-center">
                {panFile ? (
                  <img src={URL.createObjectURL(panFile)} alt="PAN Preview" className="w-24 h-24 object-contain" />
                ) : panPreview ? (
                  <img src={panPreview} alt="PAN Preview" className="w-24 h-24 object-contain" />
                ) : (
                  <span className="text-gray-500">PAN Preview</span>
                )}
              </div>
            </div>
            <div className="mt-3">
              <label className="px-4 py-2 rounded-md cursor-pointer bg-gradient-to-r from-purple-1 to-purple-2 text-white font-medium">
                {panFile ? panFile.name : "Choose File"}
                <Input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setPanFile(e.target.files?.[0] || null);
                    handleFileChange(e, "pan");
                  }}
                />
              </label>
            </div>
          </div>

          {/* Nominee Verification */}
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-300 mb-2">Nominee Verification</div>
            <div className="h-[2px] bg-gradient-to-r from-purple-1 to-purple-2" />
          </div>

          {/* Nominee Details */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Nominee Name</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  type="text"
                  name="nomineeName"
                  value={kyc.nomineeName}
                  onChange={handleChange}
                  placeholder="Enter nominee name"
                  className="p-3 bg-black border-0 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">ID Number</label>
              <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
                <Input
                  type="text"
                  name="nomineeID"
                  value={kyc.nomineeID}
                  onChange={handleChange}
                  placeholder="Enter ID number"
                  className="p-3 bg-black border-0 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="text-gray-400 mb-1">Nominee Relation</label>
            <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2 w-2/3">
              <Input
                type="text"
                name="nomineeRelation"
                value={kyc.nomineeRelation}
                onChange={handleChange}
                placeholder="Enter relation"
                className="p-3 bg-black border-0 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Nominee ID Image */}
          <div className="flex flex-col mb-8">
            <label className="text-gray-400 mb-1">ID Card Image (Nominee)</label>
            <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
              <div className="w-full h-30 rounded-md bg-black flex items-center justify-center">
                {nomineeFile ? (
                  <img src={URL.createObjectURL(nomineeFile)} alt="Nominee Preview" className="w-24 h-24 object-contain" />
                ) : nomineePreview ? (
                  <img src={nomineePreview} alt="Nominee Preview" className="w-24 h-24 object-contain" />
                ) : (
                  <span className="text-gray-500">Nominee ID Preview</span>
                )}
              </div>
            </div>
            <div className="mt-3">
              <label className="px-4 py-2 rounded-md cursor-pointer bg-gradient-to-r from-purple-1 to-purple-2 text-white font-medium">
                {nomineeFile ? nomineeFile.name : "Choose File"}
                <Input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setNomineeFile(e.target.files?.[0] || null);
                    handleFileChange(e, "nominee");
                  }}
                />
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button className="px-8 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-purple-1 to-purple-2 hover:opacity-90 transition">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
