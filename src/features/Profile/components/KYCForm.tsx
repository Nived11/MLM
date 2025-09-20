import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useKYC } from "../hooks/kyc";
import { FormSkeleton } from "./FormSkelton";

export const KYCForm = () => {
  const {
    kyc,
    handleChange,
    panPreview,
    nomineePreview,
    handleFileChange,
    loading,
    error,
    handleSave,
    saving,
    formErrors,
  } = useKYC();

  const [panFile, setPanFile] = useState<File | null>(null);
  const [nomineeFile, setNomineeFile] = useState<File | null>(null);

  if (error) return <div className="text-red-500 text-center p-10">{error}</div>;
  if (!kyc || loading) return <FormSkeleton fields={7} rows={2} withButton />;

  return (
    <div className="md:col-span-2 border border-purple-600 rounded-md p-6 bg-black">
      <h3 className="text-lg font-semibold mb-6 text-white">KYC Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-gray-400 mb-1">Account Number</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <Input
              name="account_number"
              value={kyc.account_number}
              onChange={handleChange}
              placeholder="Enter account number"
              className="p-3 border-0 bg-black rounded-md text-white"
            />
          </div>
          {formErrors.account_number && (
            <span className="text-red-500 text-sm">{formErrors.account_number}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 mb-1">PAN Number</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <Input
              name="pan_number"
              value={kyc.pan_number}
              onChange={handleChange}
              placeholder="Enter pan number"
              className="p-3 border-0 bg-black rounded-md text-white"
            />
          </div>
          {formErrors.pan_number && (
            <span className="text-red-500 text-sm">{formErrors.pan_number}</span>
          )}
        </div>
        <FileInput
          label="PAN Card Image"
          file={panFile}
          preview={panPreview}
          formError={formErrors.pan_image}
          onFileChange={(file, e) => {
            setPanFile(file);
            handleFileChange(e, "pan");
          }}
          inputId="panInput"
        />
        <div className="flex flex-col">
          <label className="text-gray-400 mb-1">Nominee Name</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <Input
              name="nominee_name"
              value={kyc.nominee_name}
              onChange={handleChange}
              placeholder="Enter nominee name"
              className="p-3 border-0 bg-black rounded-md text-white"
            />
          </div>
          {formErrors.nominee_name && (
            <span className="text-red-500 text-sm">{formErrors.nominee_name}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 mb-1">Nominee ID</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <Input
              name="id_number_nominee"
              value={kyc.id_number_nominee || ""}
              onChange={handleChange}
              placeholder="Enter nominee ID"
              className="p-3 border-0 bg-black rounded-md text-white"
            />
          </div>
          {formErrors.id_number_nominee && (
            <span className="text-red-500 text-sm">{formErrors.id_number_nominee}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-gray-400 mb-1">Nominee Relation</label>
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
            <Input
              name="nominee_relation"
              value={kyc.nominee_relation}
              onChange={handleChange}
              placeholder="Enter nominee relation"
              className="p-3 border-0 bg-black rounded-md text-white"
            />
          </div>
          {formErrors.nominee_relation && (
            <span className="text-red-500 text-sm">{formErrors.nominee_relation}</span>
          )}
        </div>

        <FileInput
          label="Nominee ID Image"
          file={nomineeFile}
          preview={nomineePreview}
          formError={formErrors.id_card_image_nominee}
          onFileChange={(file, e) => {
            setNomineeFile(file);
            handleFileChange(e, "nominee");
          }}
          inputId="nomineeInput"
        />

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


const FileInput = ({
  label,
  file,
  preview,
  formError,
  onFileChange,
  inputId,
}: {
  label: string;
  file: File | null;
  preview: string | null;
  formError?: string;
  onFileChange: (file: File | null, e: React.ChangeEvent<HTMLInputElement>) => void;
  inputId: string;
}) => (
  <div className="flex flex-col md:col-span-2 space-y-4">
    <label className="text-gray-400">{label}</label>
    <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-1 to-purple-2">
      <div className="w-full h-30 rounded-md bg-black flex items-center justify-center">
        {file ? (
          <img src={URL.createObjectURL(file)} alt={`${label} Preview`} className="w-24 h-24 object-contain" />
        ) : preview ? (
          <img src={preview} alt={`${label} Preview`} className="w-24 h-24 object-contain" />
        ) : (
          <span className="text-gray-500">{label} Preview</span>
        )}
      </div>
    </div>
    <div className="flex">
      <label
        htmlFor={inputId}
        className="px-4 py-2 rounded-md cursor-pointer bg-gradient-to-r from-purple-1 to-purple-2 text-white font-medium text-center"
      >
        Choose File
      </label>
      <Input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files?.[0] || null, e)}
      />
    </div>
    {formError && <span className="text-red-500 text-sm">{formError}</span>}
  </div>
);
