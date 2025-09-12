import { useEffect, useState } from "react";

export interface KYCData {
  accountNumber: string;
  panNumber: string;
  panCardImage?: string;
  nomineeName: string;
  nomineeID: string;
  nomineeRelation: string;
  nomineeIDImage?: string;
}

export const useKYC = () => {
  const [kyc, setKYC] = useState<KYCData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [panPreview, setPanPreview] = useState<string | null>(null);
  const [nomineePreview, setNomineePreview] = useState<string | null>(null);

  // Dummy data
  const dummyKYC: KYCData = {
    accountNumber: "123456789012",
    panNumber: "ABCDE1234F",
    panCardImage: "https://via.placeholder.com/150",
    nomineeName: "Jane Doe",
    nomineeID: "ID123456",
    nomineeRelation: "Spouse",
    nomineeIDImage: "https://via.placeholder.com/150",
  };

  useEffect(() => {
    const fetchKYC = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setKYC(dummyKYC);
        setPanPreview(dummyKYC.panCardImage || null);
        setNomineePreview(dummyKYC.nomineeIDImage || null);
      } catch {
        setError("Failed to load KYC details");
      } finally {
        setLoading(false);
      }
    };

    fetchKYC();
  }, []);

  const uploadFile = async (file: File, type: "pan" | "nominee") => {
    try {
      setUploading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const preview = URL.createObjectURL(file);
      if (type === "pan") setPanPreview(preview);
      else setNomineePreview(preview);

      if (kyc) {
        setKYC({
          ...kyc,
          panCardImage: type === "pan" ? preview : kyc.panCardImage,
          nomineeIDImage: type === "nominee" ? preview : kyc.nomineeIDImage,
        });
      }
    } catch {
      setError("File upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "pan" | "nominee") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadFile(file, type);
    }
  };

  return {
    kyc,
    setKYC,
    loading,
    error,
    uploading,
    panPreview,
    nomineePreview,
    handleFileChange,
  };
};
