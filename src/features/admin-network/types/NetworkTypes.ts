export interface NetworkUserType {
  id: number;
  username: string;
  level: number;
  datejoined: string;
  sponsor: string;
  profile: File |string;
  status: string;
}
export interface CountsTypes {
  downline: number;
  active: number;
  blocked: number;
}

export interface StatProps extends CountsTypes {
  isLoading: boolean;
}
