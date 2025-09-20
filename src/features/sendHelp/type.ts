export interface HelpLevel {
  id: number;
  level_name: string;
  amount: string;
  status: string;
  pay_enabled: boolean;
  linked_user_id: string | null;
  balance: string;
  received: string;
}

export interface Referral {
  user_id: string;
  username: string;
  name: string;
  email: string;
  mobile: string;
  whatsapp_number: string;
  profile_image?: string;
  status?: "Active" | "Inactive";
}
