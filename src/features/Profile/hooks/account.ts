import { useEffect, useState } from "react";

export interface AccountData {
  accountNumber: string;
  confirmAccountNumber: string;
  ifsc: string;
  accountHolder: string;
  branch: string;
  upiNumber: string;
  upiType: string;
  qrCode?: string;
}

export const useAccount = () => {
  const [account, setAccount] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  // ✅ Dummy account data
  const dummyAccount: AccountData = {
    accountNumber: "123456789012",
    confirmAccountNumber: "123456789012",
    ifsc: "HDFC0001234",
    accountHolder: "John Doe",
    branch: "Mumbai Main Branch",
    upiNumber: "9876543210",
    upiType: "Google Pay",
    qrCode: "https://via.placeholder.com/150", // placeholder QR
  };

  // Simulate fetching from API
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
        setAccount(dummyAccount);
        setQrPreview(dummyAccount.qrCode || null);
      } catch (err) {
        setError("Failed to load account details");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  // Simulate QR upload
  const uploadQrCode = async (file: File) => {
    try {
      setUploading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay

      const fakeUploadedUrl = URL.createObjectURL(file);
      setQrPreview(fakeUploadedUrl);

      if (account) {
        setAccount({ ...account, qrCode: fakeUploadedUrl });
      }
    } catch (err) {
      setError("QR upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setQrPreview(URL.createObjectURL(file)); // instant preview
      uploadQrCode(file); // fake upload
    }
  };

  return {
    account,
    loading,
    error,
    uploading,
    qrPreview,
    handleFileChange,
    setAccount,
  };
};
