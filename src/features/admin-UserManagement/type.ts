export interface UserManagement {
  id?: number;
  userId: string;
  username?: string;
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
  level: string;
  status?: string;
  profile_image?: string | File | null;
  [key: string]: any;
}
export interface compactUserManagement {
  id: number;
  userId: string;
  username: string;
  level: string;
  profile: string | File | null;
  status: string;
}

export interface UseEditProfileProps {
  initialUser: UserManagement;
  onClose: () => void;
}

export interface useViewProfileProps {
  initialUser: UserManagement;
  onClose: () => void;
}


