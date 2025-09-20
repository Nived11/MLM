import { useState, useEffect } from "react";
import api from "../../../lib/api";
import toast from "react-hot-toast";
import axios from "axios";

export interface ProfileData {
  user_id: string;
  level: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  whatsapp_number: string;
  pincode: string;
  district: string;
  state: string;
  place: string;
  address: string;
  profile_image?: string;
}

interface UseProfileReturn {
  editableProfile: ProfileData | null;
  handleInputChange: (field: keyof ProfileData, value: string) => void;
  saveProfileChanges: () => Promise<void>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  error: string | null;
  profile_image: string | null;
  formErrors: Record<string, string>;
}

export const useProfile = (): UseProfileReturn => {
  const [editableProfile, setEditableProfile] = useState<ProfileData | null>(null);
  const [profile_image, setProfileImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [changes, setChanges] = useState<Partial<ProfileData>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get("/profile/");
        setEditableProfile(response.data);
        setProfileImage(response.data.profile_image || null);
      } catch (err : any) {
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
    fetchProfile();
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditableProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
    setChanges((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" })); 
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setProfileImage(URL.createObjectURL(selectedFile));
  };

  const validateForm = (): boolean => {
    if (!editableProfile) return false;
    const errors: Record<string, string> = {};

    if (!editableProfile.first_name.trim()) errors.first_name = "First name is required";
    if (!editableProfile.last_name.trim()) errors.last_name = "Last name is required";
    if (!editableProfile.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(editableProfile.email))
      errors.email = "Invalid email address";
    if (!editableProfile.mobile.trim()) errors.mobile = "Phone number is required";
    else if (!/^\+?\d{10}$/.test(editableProfile.mobile))
      errors.mobile = "Invalid phone number";
    if (!editableProfile.whatsapp_number.trim()) errors.whatsapp_number = "WhatsApp number is required";
    else if (!/^\+?\d{10}$/.test(editableProfile.whatsapp_number))
      errors.whatsapp_number = "Invalid WhatsApp number";
    if (!editableProfile.pincode.trim()) errors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(editableProfile.pincode)) errors.pincode = "Invalid pincode";
    if (!editableProfile.district.trim()) errors.district = "District is required";
    if (!editableProfile.state.trim()) errors.state = "State is required";
    if (!editableProfile.place.trim()) errors.place = "Place is required";
    if (!editableProfile.address.trim()) errors.address = "Address is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveProfileChanges = async () => {
    if (!editableProfile) return;
    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }
    if (Object.keys(changes).length === 0 && !file) {
      toast("No changes detected, nothing to save.");
      return;
    }

    try {
      const formData = new FormData();
      for (const key in changes) {
      const value = changes[key as keyof ProfileData];
      if (value !== undefined && value !== null) {
        formData.append(key, value);
        }
      }
      if (file) formData.append("profile_image", file);

      const response = await api.patch("/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditableProfile(response.data);
      setChanges({});
      setFile(null);
      setProfileImage(response.data.profile_image || profile_image);
      toast.success("Profile saved successfully!");
    } catch (err) {
      toast.error("Failed to save profile!");
    }
  };

  return {
    editableProfile,
    handleInputChange,
    saveProfileChanges,
    handleFileChange,
    loading,
    error,
    profile_image,
    formErrors,
  };
};
