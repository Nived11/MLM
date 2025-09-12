export type Status = "Pending" | "Completed";

export interface UserJoining {
  username: string;
  fullname: string;
  email: string;
  mobile: string;
  dateOfJoining: string;
  referralCount: number;
  rank: string;
  status: Status;
}

export interface SendRequest{
    fromname:string;
    username:string;
    amount:number;
    status:Status;
    proof:string;
    level:string;
    requesteddate:string;
}

export interface AucReport{
    fromuser:string;
    amount:number;
    status:Status;
    proof:string;
    date:string;
}

export interface PayoutReport{
    username:string;
    amount:number;
    status:Status;
    payoutamount:number;
    transactionfee:number;
    requesteddate:string;
    total:number;
}


export interface BonusSummary {
  id: number;
  username: string;
  invoice: string;
}

export interface LevelUsers{
  username:string;
  formname:string;
  amount:number;
  proof:string;
  status:string;
  level:string;
  requesteddate:string;
  total:number;
}

export interface RebirthUsers{
  username:string;
  fullname:string;
  sponsorname:string;
  placementid:string;
  email:string;
  mobile:string;
  dateofjoining:string;
  status:string
}