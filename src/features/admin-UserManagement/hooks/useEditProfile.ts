import { useState } from "react";
import type { UserManagement } from "../type";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

interface UseEditProfileProps {
  initialUser: UserManagement;
  onClose: () => void;
}

export const useEditProfile = ({
  initialUser,
  onClose,
}: UseEditProfileProps) => {
  const [formData, setFormData] = useState<UserManagement>(initialUser);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    typeof initialUser.profile_image === "string"
      ? initialUser.profile_image
      : null
  );

  const handleChange = (field: keyof UserManagement, value: string) => {
    setFormData({ ...formData, [field]: value });
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    setProfileImagePreview(URL.createObjectURL(file));
    setFormData({ ...formData, profile_image: file });
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    const requiredFields: (keyof UserManagement)[] = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "whatsapp",
      "pincode",
      "district",
      "state",
      "place",
      "address",
      "level",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]?.toString().trim()) {
        errors[field] = `${String(field).replace("_", " ")} is required`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async (): Promise<boolean> => {
    if (!validate()) return false;
    try {
      setSaving(true);
      await new Promise((res) => setTimeout(res, 2000));
      onClose();
      return true;
    } catch (err) {
      setError(extractErrorMessages(err) || "error saving data");
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    formErrors,
    profileImagePreview,
    saving,
    handleChange,
    handleFileChange,
    handleSave,
    error,
  };
};
