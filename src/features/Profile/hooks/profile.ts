// // hooks/profile.ts
// import { useEffect, useState } from "react";

// export interface ProfileData {
//   id: string;
//   level: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   whatsapp: string;
//   pincode: string;
//   district: string;
//   state: string;
//   place: string;
//   address: string;
//   profile_image?: string;
// }

// export const useProfile = () => {
//   const [profile, setProfile] = useState<ProfileData | null>(null);
//   const [editableProfile, setEditableProfile] = useState<ProfileData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [profile_image, setProfileImage] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [activeMenu, setActiveMenu] = useState("Profile");

//   // your dummy data
//   const dummyProfile: ProfileData = {
//     id: "12345",
//     level: "Level 1",
//     first_name: "John",
//     last_name: "Doe",
//     email: "john.doe@example.com",
//     phone: "+91 9876543210",
//     whatsapp: "+91 9876543210",
//     pincode: "560001",
//     district: "Bangalore Urban",
//     state: "Karnataka",
//     place: "MG Road",
//     address: "123, MG Road, Bangalore",
//     profile_image:"https://i.pinimg.com/736x/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg",
//   };

//   // ✅ load from localStorage first, otherwise dummy
//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem("profile");
//       if (saved) {
//         const parsed = JSON.parse(saved) as ProfileData;
//         setProfile(parsed);
//         setEditableProfile(parsed);
//         setProfileImage(parsed.profile_image || null);
//         console.log(parsed);
//       } else {
//         setProfile(dummyProfile);
//         setEditableProfile(dummyProfile);
//         setProfileImage(dummyProfile.profile_image || null);
//       }
//     } catch (err) {
//       setError("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleInputChange = (field: keyof ProfileData, value: string) => {
//     if (editableProfile) {
//       setEditableProfile({ ...editableProfile, [field]: value });
//     }
//   };

//   const uploadProfileImage = async (file: File) => {
//     try {
//       setUploading(true);
//       const previewUrl = URL.createObjectURL(file);
//       setProfileImage(previewUrl);
//       if (editableProfile) {
//         const updated = { ...editableProfile, profile_image: previewUrl };
//         setEditableProfile(updated);
//       }
//     } catch {
//       setError("Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       uploadProfileImage(e.target.files[0]);
//     }
//   };

//   // ✅ save & persist changes
//   const saveProfileChanges = async () => {
//     if (editableProfile) {
//       setProfile(editableProfile);
//       setProfileImage(editableProfile.profile_image || null);
//       localStorage.setItem("profile", JSON.stringify(editableProfile));
//     }
//   };

//   const menuItems = ["Profile", "Account", "KYC", "Security", "Referral Link"];

//   return {
//     profile,
//     editableProfile,
//     loading,
//     error,
//     uploading,
//     profile_image,
//     handleInputChange,
//     handleFileChange,
//     menuItems,
//     activeMenu,
//     setActiveMenu,
//     setEditableProfile,
//     saveProfileChanges,
//   };
// };

// hooks/profile.ts
import { useEffect, useState } from "react";

export interface ProfileData {
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
  profile_image?: string; // can be blob or URL
}

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editableProfile, setEditableProfile] = useState<ProfileData | null>(null);
  const [profile_image, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    profile_image:
      "https://i.pinimg.com/736x/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg",
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile");
      if (saved) {
        const parsed = JSON.parse(saved) as ProfileData;
        setProfile(parsed);
        setEditableProfile(parsed);
        setProfileImage(parsed.profile_image || null);
      } else {
        setProfile(dummyProfile);
        setEditableProfile(dummyProfile);
        setProfileImage(dummyProfile.profile_image || null);
      }
    } catch {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    if (editableProfile) {
      setEditableProfile({ ...editableProfile, [field]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl); // instant preview
      setEditableProfile(prev =>
        prev ? { ...prev, profile_image: previewUrl } : prev
      );
    }
  };

  const saveProfileChanges = async () => {
    if (editableProfile) {
      setProfile(editableProfile);
      setProfileImage(editableProfile.profile_image || null);
      localStorage.setItem("profile", JSON.stringify(editableProfile));
    }
  };

  const menuItems = ["Profile", "Account", "KYC", "Security", "Referral Link"];

  return {
    profile,
    editableProfile,
    profile_image,
    loading,
    error,
    handleInputChange,
    handleFileChange,
    saveProfileChanges,
    menuItems,
  };
};
