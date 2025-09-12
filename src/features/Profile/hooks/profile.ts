import { useEffect, useState } from "react";

interface ProfileData {
  id: string;
  level: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  pincode: string;
  district: string;
  state: string;
  place: string;
  address: string;
  profile_image?: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile_image, setProfileImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>("Profile");

  // ✅ Dummy profile data
  const dummyProfile: ProfileData = {
    id: "12345",
    level: "Level 1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    whatsapp: "+91 9876543210",
    pincode: "560001",
    district: "Bangalore Urban",
    state: "Karnataka",
    place: "MG Road",
    address: "123, MG Road, Bangalore",
    profile_image: "https://i.pinimg.com/736x/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg", // placeholder image
  };

  // Simulate fetching from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfile(dummyProfile);
        setProfileImage(dummyProfile.profile_image || null);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Upload simulation
  const uploadProfileImage = async (file: File) => {
    try {
      setUploading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay

      const fakeUploadedUrl = URL.createObjectURL(file); // temporary preview URL
      setProfileImage(fakeUploadedUrl);

      if (profile) {
        setProfile({ ...profile, profile_image: fakeUploadedUrl });
      }
    } catch (err) {
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file)); // instant preview
      uploadProfileImage(file); // fake upload
    }
  };

  const menuItems = ["Profile", "Account", "KYC", "Security", "Referral Link"];

  return {
    profile,
    loading,
    error,
    uploading,
    profile_image,
    handleFileChange,
    menuItems,
    activeMenu,
    setActiveMenu,
  };
};
