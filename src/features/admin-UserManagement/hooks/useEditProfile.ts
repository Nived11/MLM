import { useState } from "react";
import type { UserManagement } from "../type";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";
import api from "../../../lib/api";

export const useEditProfile = ({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<UserManagement>(
    {} as UserManagement
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [loadingValues, setLoadingValues] = useState<boolean>(false);

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
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value as any);
      });
      await api.put(`/admin/users/${userId}/`, payload);
      onClose();
      return true;
    } catch (err) {
      setError(extractErrorMessages(err) || "error saving data");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleValues = async (id: string): Promise<void> => {
    try {
      setLoadingValues(true);
      const response = await api.get(`/admin/users/${id}`);
      const updatedData: UserManagement = {
        userId: response.data.user_id ?? "",
        first_name: response.data.first_name ?? "",
        last_name: response.data.last_name ?? "",
        email: response.data.email ?? "",
        phone: response.data.mobile ?? "",
        whatsapp: response.data.whatsapp_number ?? "",
        pincode: response.data.pincode ?? "",
        district: response.data.profile.district ?? "",
        state: response.data.profile.state ?? "",
        place: response.data.profile.place ?? "",
        address: response.data.profile.address ?? "",
        level: response.data.level ?? "",
        status: response.data.is_active ? "Active" : "Blocked",
        profile_image: response.data.profile.profile_image ?? "",
      };
      setFormData(updatedData);
      setProfileImagePreview(
        updatedData.profile_image &&
          typeof updatedData.profile_image === "string"
          ? updatedData.profile_image
          : null
      );
    } catch (err) {
      setError(extractErrorMessages(err) || "error fetching data");
    } finally {
      setLoadingValues(false);
    }
  };

  return {
    formData,
    formErrors,
    profileImagePreview,
    saving,
    loadingValues,
    handleChange,
    handleFileChange,
    handleSave,
    handleValues,
    error,
  };
};
