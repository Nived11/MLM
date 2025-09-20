export interface AucReport {
  fromuser: string;
  amount: number;
  status: string;
  proof: string;
  date: string;
}
export interface BonusSummary {
  id: number;
  username: string;
  invoice: string;
}
export interface LevelUsers {
  username: string;
  fromname: string;
  amount: number;
  proof: string;
  status: string;
  level: string;
  requesteddate: string;
  total: number;
}
export interface PayoutReport {
  username: string;
  amount: number;
  status: string;
  payoutamount: number;
  transactionfee: number;
  requesteddate: string;
  total: number;
}
export interface RebirthUsers {
  username: string;
  fullname: string;
  sponsorid: string;
  sponsorname: string;
  placementid: string;
  email: string;
  mobile: string;
  dateofjoining: string;
  status: string;
}
export interface SendRequest {
  fromname: string;
  username: string;
  amount: number;
  status: string;
  proof: string;
  level: string;
  requesteddate: string;
}
export interface UserJoining {
  username: string;
  fullname: string;
  email: string;
  mobile: string;
  dateOfJoining: string;
  referralCount: number;
  rank: string;
  status: string;
}
