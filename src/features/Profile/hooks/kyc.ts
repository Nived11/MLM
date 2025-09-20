import { useEffect, useState } from "react";
import api from "../../../lib/api";
import toast from "react-hot-toast";
import axios from "axios";

export interface KYCData {
  account_number: string;
  pan_number: string;
  pan_image?: string | null;
  nominee_name: string;
  id_number_nominee: string;
  id_card_image_nominee?: string | null;
  nominee_relation: string;
}

export const useKYC = () => {
  const [kyc, setKYC] = useState<KYCData | null>(null);
  const [initialData, setInitialData] = useState<KYCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [panPreview, setPanPreview] = useState<string | null>(null);
  const [nomineePreview, setNomineePreview] = useState<string | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [nomineeFile, setNomineeFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/kyc/");
        setKYC(data);
        setInitialData(data);
        setPanPreview(data.pan_image || null);
        setNomineePreview(data.id_card_image_nominee || null);
      } catch (err: any) {
  
        let message = "Failed to load account details";
        if (axios.isAxiosError(err)) {
          if (err.response?.data?.error) {
            message = err.response.data.error;
          } else if (err.message) {
            message = err.message;
          }
        }
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "pan" | "nominee") => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (type === "pan") {
      setPanFile(file);
      setPanPreview(URL.createObjectURL(file));
    } else {
      setNomineeFile(file);
      setNomineePreview(URL.createObjectURL(file));
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!kyc) return;
    setKYC({ ...kyc, [e.target.name]: e.target.value });
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" })); 
  };

  const validateForm = () => {
    if (!kyc) return false;
    const errors: Record<string, string> = {};
    if (!kyc.account_number) {
      errors.account_number = "Account number is required";
    } else if (!/^\d{9,18}$/.test(kyc.account_number)) {
      errors.account_number = "Account number must be 9–18 digits";
    }
    if (!kyc.pan_number) {
      errors.pan_number = "PAN number is required";
    } else if (!/^\d{9,18}$/.test(kyc.pan_number)) {
      errors.pan_number = "Pan number must be 9-18 digits";
    }
    if (!kyc.nominee_name) {
      errors.nominee_name = "Nominee name is required";
    }
    if (!kyc.id_number_nominee) {
      errors.id_number_nominee = "Nominee ID is required";
    }
    if (!kyc.nominee_relation) {
      errors.nominee_relation = "Nominee relation is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const hasChanges = () => {
    if (!kyc || !initialData) return false;
    return (
      kyc.account_number !== initialData.account_number ||
      kyc.pan_number !== initialData.pan_number ||
      kyc.nominee_name !== initialData.nominee_name ||
      kyc.id_number_nominee !== initialData.id_number_nominee ||
      kyc.nominee_relation !== initialData.nominee_relation ||
      panFile !== null ||
      nomineeFile !== null
    );
  };
  
 const handleSave = async () => {
  if (!validateForm() || !kyc) {
    toast.error("Please fix the errors before saving");
    return;
  }

    if (!hasChanges()) {
      toast("No changes detected, nothing to save.");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("account_number", kyc.account_number);
      formData.append("pan_number", kyc.pan_number);
      formData.append("nominee_name", kyc.nominee_name);
      formData.append("id_number_nominee", kyc.id_number_nominee || "");
      formData.append("nominee_relation", kyc.nominee_relation);

      if (panFile) formData.append("pan_image", panFile);
      if (nomineeFile) formData.append("id_card_image_nominee", nomineeFile);

      await api.patch("/kyc/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("KYC details saved successfully!");
      setInitialData({ ...kyc });
      setPanFile(null);
      setNomineeFile(null);
    } catch {
      toast.error("Failed to save KYC details");
    } finally {
      setSaving(false);
    }
  };

  return {
    kyc,
    loading,
    error,
    saving,
    formErrors,
    panPreview,
    nomineePreview,
    handleChange,
    handleFileChange,
    handleSave,
  };
};
