// import { useEffect, useState } from "react";
// import api from "../../../lib/api";
// import toast from "react-hot-toast";

// export interface AccountData {
//   account_number: string;
//   confirm_account_number: string;
//   ifsc: string;
//   account_holder_name: string;
//   branch: string;
//   upi_number: string;
//   upi_type: string;
//   qr_code?: string;
// }

// export const useAccount = () => {
//   const [account, setAccount] = useState<AccountData | null>(null);
//   const [originalAccount, setOriginalAccount] = useState<AccountData | null>(null); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [qrPreview, setQrPreview] = useState<string | null>(null);
//   const [qrFile, setQrFile] = useState<File | null>(null);
//   const [saving, setSaving] = useState(false);
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const fetchAccount = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get("/account-details/");
//         const formatted: AccountData = {
//           ...response.data,
//           confirm_account_number: response.data.account_number,
//         };

//         setAccount(formatted);
//         setOriginalAccount(formatted); 
//         setQrPreview(response.data.qr_code || null);
//       } catch (err: any) {
//         console.error("Error fetching account:", err);
//         setError("Failed to load account details");
//         toast.error("Failed to load account details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAccount();
//   }, []);

//   const validateForm = (): boolean => {
//     if (!account) return false;
//     const errors: Record<string, string> = {};

//     if (!account.account_number) errors.account_number = "Account number is required";
//     else if (!/^\d+$/.test(account.account_number))
//       errors.account_number = "Account number must be numeric";

//     if (!account.confirm_account_number)
//       errors.confirm_account_number = "Please confirm account number";
//     else if (!/^\d+$/.test(account.confirm_account_number))
//       errors.confirm_account_number = "Confirm account number must be numeric";

//     if (account.account_number !== account.confirm_account_number)
//       errors.confirm_account_number = "Account numbers do not match";

//     if (!account.ifsc) errors.ifsc = "IFSC code is required";
//     if (!account.account_holder_name) errors.account_holder_name = "Account holder name is required";
//     if (!account.branch) {
//     errors.branch = "Branch name is required";
//     } else if (!/^[A-Za-z\s]+$/.test(account.branch)) {
//     errors.branch = "Branch name must contain only letters";
//     }
//     if (!account.upi_number) errors.upi_number = "UPI number is required";
//     if (!account.upi_type) errors.upi_type = "Select a UPI type";

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const saveAccountChanges = async (): Promise<AccountData | undefined> => {
//     if (!account || !originalAccount) return;

    
//     if (!validateForm()) {
//       toast.error("Please fix the errors before saving");
//       return;
//     }

//     try {
//       setSaving(true);

//       const formData = new FormData();
//       let hasChanges = false;
//       const fields: (keyof AccountData)[] = [
//         "account_number",
//         "ifsc",
//         "account_holder_name",
//         "branch",
//         "upi_number",
//         "upi_type",
//       ];

//       fields.forEach((key) => {
//         if (account[key] !== originalAccount[key]) {
//           formData.append(key, account[key] ?? "");
//           hasChanges = true;
//         }
//       });

//       if (account.confirm_account_number !== originalAccount.confirm_account_number) {
//         formData.append("confirm_account_number", account.confirm_account_number);
//         hasChanges = true;
//       }

//       if (qrFile) {
//         formData.append("qr_code", qrFile);
//         hasChanges = true;
//       }

//       if (!hasChanges) {
//         toast("No changes to save");
//         return;
//       }

//       const response = await api.post("/account-details/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const updated: AccountData = {
//         ...response.data,
//         confirm_account_number: response.data.account_number,
//       };

//       setAccount(updated);
//       setOriginalAccount(updated); 
//       setQrPreview(response.data.qr_code || null);
//       setQrFile(null);

//       toast.success("Account details updated successfully!");
//       return updated;
//     } catch (err: any) {
//       toast.error(err?.response?.data?.error || "Failed to save account details");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setQrFile(file);
//       setQrPreview(URL.createObjectURL(file));
//     }
//   };

//   return {
//     account,
//     setAccount,
//     loading,
//     error,
//     qrPreview,
//     saving,
//     handleFileChange,
//     saveAccountChanges,
//     formErrors, 
//   };
// };
import { useEffect, useState } from "react";
import api from "../../../lib/api";
import toast from "react-hot-toast";
import axios from "axios"; // ✅ Import axios to use axios.isAxiosError

export interface AccountData {
  account_number: string;
  confirm_account_number: string;
  ifsc: string;
  account_holder_name: string;
  branch: string;
  upi_number: string;
  upi_type: string;
  qr_code?: string;
}

export const useAccount = () => {
  const [account, setAccount] = useState<AccountData | null>(null);
  const [originalAccount, setOriginalAccount] = useState<AccountData | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setLoading(true);
        const response = await api.get("/account-details/");
        const formatted: AccountData = {
          ...response.data,
          confirm_account_number: response.data.account_number,
        };

        setAccount(formatted);
        setOriginalAccount(formatted); 
        setQrPreview(response.data.qr_code || null);
      } catch (err: any) {
        console.error("Error fetching account:", err);

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
    };
    fetchAccount();
  }, []);

  const validateForm = (): boolean => {
    if (!account) return false;
    const errors: Record<string, string> = {};

    if (!account.account_number) errors.account_number = "Account number is required";
    else if (!/^\d+$/.test(account.account_number))
      errors.account_number = "Account number must be numeric";

    if (!account.confirm_account_number)
      errors.confirm_account_number = "Please confirm account number";
    else if (!/^\d+$/.test(account.confirm_account_number))
      errors.confirm_account_number = "Confirm account number must be numeric";

    if (account.account_number !== account.confirm_account_number)
      errors.confirm_account_number = "Account numbers do not match";

    if (!account.ifsc) errors.ifsc = "IFSC code is required";
    if (!account.account_holder_name) errors.account_holder_name = "Account holder name is required";
    if (!account.branch) {
      errors.branch = "Branch name is required";
    } else if (!/^[A-Za-z\s]+$/.test(account.branch)) {
      errors.branch = "Branch name must contain only letters";
    }
    if (!account.upi_number) errors.upi_number = "UPI number is required";
    if (!account.upi_type) errors.upi_type = "Select a UPI type";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveAccountChanges = async (): Promise<AccountData | undefined> => {
    if (!account || !originalAccount) return;

    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();
      let hasChanges = false;
      const fields: (keyof AccountData)[] = [
        "account_number",
        "ifsc",
        "account_holder_name",
        "branch",
        "upi_number",
        "upi_type",
      ];

      fields.forEach((key) => {
        if (account[key] !== originalAccount[key]) {
          formData.append(key, account[key] ?? "");
          hasChanges = true;
        }
      });

      if (account.confirm_account_number !== originalAccount.confirm_account_number) {
        formData.append("confirm_account_number", account.confirm_account_number);
        hasChanges = true;
      }

      if (qrFile) {
        formData.append("qr_code", qrFile);
        hasChanges = true;
      }

      if (!hasChanges) {
        toast("No changes to save");
        return;
      }

      const response = await api.post("/account-details/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updated: AccountData = {
        ...response.data,
        confirm_account_number: response.data.account_number,
      };

      setAccount(updated);
      setOriginalAccount(updated); 
      setQrPreview(response.data.qr_code || null);
      setQrFile(null);

      toast.success("Account details updated successfully!");
      return updated;
    } catch (err: any) {
      console.error("Error saving account:", err);

      let message = "Failed to save account details";
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.error) {
          message = err.response.data.error;
        } else if (err.message) {
          message = err.message;
        }
      }

      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setQrFile(file);
      setQrPreview(URL.createObjectURL(file));
    }
  };

  return {
    account,
    setAccount,
    loading,
    error,
    qrPreview,
    saving,
    handleFileChange,
    saveAccountChanges,
    formErrors, 
  };
};
