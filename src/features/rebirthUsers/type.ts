export interface ReferralUser {
  user_id: string
  first_name: string
  last_name: string
  email: string
  mobile: string
  level: number
  status: string
  joined_date: string
  direct_count: number
  total_count: number
  percentage: string
  district: string | null
  state: string | null
  address: string | null
  place: string | null
  pincode: string
  whatsapp_number: string
  profile_image: string | null
}


export interface RebirthUser {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  level: number;
  status: string;
  joined_date: string;
  direct_count: number;
  total_count: number;
  percentage: string;
  district: string | null;
  state: string | null;
  address: string | null;
  place: string | null;
  pincode: string;
  whatsapp_number: string;
  profile_image: string | null;
}