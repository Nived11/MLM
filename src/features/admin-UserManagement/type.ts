export interface UserManagement {
  id: number;
  username: string;
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
